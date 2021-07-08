let Profile = require("../model/Profile");
module.exports = {
  index(req, res) {
    return res.render("profile", { profile: Profile.get() });
  },
  update(req, res) {
    const data = req.body;
    const activeWeeks = 52 - data["vacation-per-year"];
    const weeksPerMonth = activeWeeks / 12;
    const hoursPerWeek = data["hours-per-day"] * data["days-per-week"];
    const hoursPerMonth = hoursPerWeek * weeksPerMonth;
    const valueHour= data["monthly-budget"] / hoursPerMonth;
    Profile.update({
        ...Profile.get(),
        ...data,
        "value-hour": valueHour
    })
    return res.redirect("/profile");
  },
};

