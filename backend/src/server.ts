import app from "./app";
import { initDb } from "./config/db";
import { syncModels } from "./models";

const PORT = Number(process.env.PORT || 3001);

async function start() {
  await initDb();
  await syncModels();

  app.listen(PORT, () => {
    console.log(`🚀 Backend listening on http://localhost:${PORT}`);
  });
}

start().catch((err) => {
  console.error("Failed to start server", err);
});
