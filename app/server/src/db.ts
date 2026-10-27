// The one SQLite file (app/data.db): the job queue + logs (jobs.ts) and the agent queue, sessions, messages and
// approvals (agent.ts). Nothing in it is pipeline state: the repo's files stay the record.
import Database from "better-sqlite3";
import { DB_FILE } from "./config.js";

export const db = new Database(DB_FILE);
db.pragma("journal_mode = WAL");
export const now = () => new Date().toISOString();
