const Database = require("./config");

const initDb = {
  async init() {
    const db = await Database();
    await db.exec(`CREATE TABLE IF NOT EXISTS profile (
            id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, name TEXT, avatar TEXT, 
            monthly_budget INTEGER, days_per_week INTEGER, 
            hours_per_day INTEGER, vacation_per_year INTEGER, 
            value_hour INTEGER
        );`);
    await db.exec(`CREATE TABLE IF NOT EXISTS jobs (
            id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, 
            daily_hours INTEGER NOT NULL, total_hours INTEGER NOT NULL, created_at DATETIME, 
            profile_id INTEGER NOT NULL, FOREIGN KEY (profile_id) REFERENCES profile(id)
        );`);
    await db.close();
  },
};

initDb.init();
