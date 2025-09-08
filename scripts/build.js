// @ts-check

import { exists, exec, getFiles } from "./utils.js";
import { createFxmanifest } from "@communityox/fx-utils";

const isWatchMode = process.argv.includes("--watch");
const hasWeb = await exists("./web");

const dropLabels = ["$BROWSER"];
if (!isWatchMode) dropLabels.push("$DEV");

const webFiles = await getFiles("dist/web");

await createFxmanifest({
  files: webFiles,
  dependencies: ["/server:13068", "/onesync"],
  metadata: {
    loadscreen: "dist/web/index.html",
    loadscreen_manual_shutdown: "yes",
    node_version: "22",
  },
});

if (hasWeb) {
  const buildCmd = isWatchMode ? "vite build --watch" : "vite build";
  await exec(`cd ./web && ${buildCmd}`);
}
