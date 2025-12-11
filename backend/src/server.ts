import app from "./app";
import { initDb } from "./config/db";
import { syncModels } from "./models";

const PORT = Number(process.env.PORT || 3001);

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED_REJECTION 💥", err);
});

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT_EXCEPTION 💥", err);
});

async function start() {
  try {
    await initDb();
    await syncModels();
  } catch (err) {
    console.error("Startup DB error (continuing without DB)", err);
  }

  app.listen(PORT, () => {
    console.log(`🚀 Backend listening on port ${PORT}`);
  });
}

start().catch((err) => {
  console.error("Failed to start server", err);
});
