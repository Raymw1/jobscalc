const Database = require("./config");

module.exports = {
  inserting: {
    async insertingProfile() {
      const db = await Database();
      await db.run(`INSERT INTO profile 
          (name, avatar, monthly_budget, days_per_week, hours_per_day, vacation_per_year, value_hour)
          VALUES ("Rayan Wilbert", "https://github.com/raymw1.png", 3000, 5, 5, 4, 75)
          ;`);
      await db.close();
    },
    async insertingJob(data) {
      const db = await Database();
      await db.run(`INSERT INTO jobs 
          (name, daily_hours, total_hours, created_at, profile_id)
          VALUES ("${data.name}", ${data["daily-hours"]}, ${data["total-hours"]}, ${data.created_at}, 
          ${data.profile_id})
          ;`);
      await db.close();
    }
  },
  updating: {
    async updateProfile(data) {
      const db = await Database();
      await db.run(`UPDATE profile SET
          name = "${data.name}", avatar = "${data.avatar}", monthly_budget = ${data["monthly-budget"]}, 
          days_per_week = ${data["days-per-week"]},hours_per_day = ${data["hours-per-day"]}, 
          vacation_per_year = ${data["vacation-per-year"]}, value_hour = ${data["value-hour"]}
          ;`);
      await db.close();
    },
    // async updateJob(data) {
    //   const db = await Database();
    //   await db.run(`UPDATE profile SET
    //       name = "${data.name}", avatar = "${data.avatar}", monthly_budget = ${data["monthly-budget"]}, 
    //       days_per_week = ${data["days-per-week"]},hours_per_day = ${data["hours-per-day"]}, 
    //       vacation_per_year = ${data["vacation-per-year"]}, value_hour = ${data["value-hour"]}
    //       ;`);
    //   await db.close();
    // }
  }
};

// a.insertingProfile();
