let playerSpawned = false;

on("playerSpawned", () => {
  if (!playerSpawned) {
    SendLoadingScreenMessage(
      JSON.stringify({
        fullyLoaded: true,
      })
    );
    Wait(5000);
    ShutdownLoadingScreenNui();
    playerSpawned = true;
  }
});
