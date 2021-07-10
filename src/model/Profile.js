const Database = require("../db/config");
const editDb = require("../db/edit");

module.exports = {
  async get() {
    const db = await Database();
    let data = await db.get(`SELECT * FROM profile;`);
    await db.close();
    return {
      name: data.name,
      avatar: data.avatar,
      "monthly-budget": data.monthly_budget,
      "days-per-week": data.days_per_week,
      "hours-per-day": data.hours_per_day,
      "vacation-per-year": data.vacation_per_year,
      "value-hour": data.value_hour,
    };
  },
  async update(newData) {
    editDb.updating.updateProfile(newData);
  },
};
