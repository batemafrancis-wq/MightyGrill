import { Client } from "pg";
import dotenv from "dotenv";
dotenv.config();

const url = process.env.DATABASE_URL;
const client = new Client({ connectionString: url });
try {
  await client.connect();
  const res = await client.query("SELECT 1");
  console.log("DB connection OK", res.rows);
  await client.end();
} catch (e) {
  console.log("DB error:", e.message);
}
process.exit(0);
