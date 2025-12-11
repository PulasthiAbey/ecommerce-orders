import { Router } from "express";
import { runSeed } from "../seed/runSeed";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const result = await runSeed();
    res.json({ status: "ok", ...result });
  } catch (err) {
    res.status(500).json({ error: "Seed failed", details: err });
  }
});

export default router;
