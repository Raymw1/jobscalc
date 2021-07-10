let Profile = require("../model/Profile");
module.exports = {
  async index(req, res) {
    return res.render("profile", { profile: await Profile.get() });
  },
  async update(req, res) {
    const data = req.body;
    const activeWeeks = 52 - data["vacation-per-year"];
    const weeksPerMonth = activeWeeks / 12;
    const hoursPerWeek = data["hours-per-day"] * data["days-per-week"];
    const hoursPerMonth = hoursPerWeek * weeksPerMonth;
    const valueHour = data["monthly-budget"] / hoursPerMonth;
    const profile = await Profile.get();
    await Profile.update({
      ...profile,
      ...data,
      "value-hour": valueHour,
    });
    return res.redirect("/profile");
  },
};
