import * as fs from "fs";

SetConvarReplicated('sv_showBusySpinnerOnLoadingScreen', '0')

function readFile(filePath: string): string | null {
  try {
    return fs.readFileSync(filePath, "utf-8");
  } catch (err) {
    console.error(`[readFile] Failed to read file: ${filePath}`, err);
    return null;
  }
}

on("playerConnecting", async (username: string, _: any, deferrals: any) => {
  const steamID = GetPlayerIdentifier(source.toString(), 0);

  const playerData = readFile("../txData/default/data/playersDB.json");
  if (!playerData) {
    console.error("[playerConnecting] Could not load playersDB.json");
    return;
  }

  try {
    const players = JSON.parse(playerData);
    let playtime: number | undefined;

    for (const player of players.players) {
      if (player.ids.includes(steamID)) {
        playtime = player.playTime;
        break;
      }
    }

    if (!playtime) {
      console.warn(
        `[playerConnecting] Playtime not found for player: ${username}`
      );
    }

    const days = Math.floor(playtime / (24 * 60)); // 1 day = 24 hours * 60 minutes
    const remainingHours = Math.floor((playtime % (24 * 60)) / 60);
    const remainingMinutes = playtime % 60;

    const playtimeStr = `${days}d ${remainingHours}h ${remainingMinutes}m`;

    const profileData = {
      profile: {
        username: username,
        playtime: playtimeStr,
      },
    };
    deferrals.handover(profileData);
  } catch (err) {
    console.error("[playerConnecting] Failed to parse playersDB.json", err);
  }
});
