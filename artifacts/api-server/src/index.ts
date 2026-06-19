import express from "express";
import { pool } from "@workspace/db";

const app = express();
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("infamousbot API server is running\n");
});

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.get("/db", async (_req, res) => {
  try {
    const result = await pool.query("SELECT 1 AS ok");
    res.json({ db: "ok", rows: result.rows });
  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : String(error),
    });
  }
});

const port = Number(process.env.PORT ?? 5000);
app.listen(port, () => {
  console.log(`API server listening on http://localhost:${port}`);
});
