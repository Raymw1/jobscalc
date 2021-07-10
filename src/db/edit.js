const Database = require("./config");

const a = {
  async insertingProfile() {
    const db = await Database();
    await db.run(`INSERT INTO profile 
        (name, avatar, monthly_budget, days_per_week, hours_per_day, vacation_per_year, value_hour)
        VALUES ("Rayan Wilbert", "https://github.com/raymw1.png", 3000, 5, 5, 4, 75)
        ;`);
    await db.close();
  },
  async insertingJob() {
    const db = await Database();
    await db.run(`INSERT INTO jobs 
        (name, daily_hours, total_hours, created_at, profile_id)
        VALUES ("Pozzaria Guloso", 2, 1, 1617514376018, 2)
        ;`);
    await db.close();
  }
};

a.insertingProfile();
