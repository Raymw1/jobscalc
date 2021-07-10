const Job = require("../model/Job");
const Profile = require("../model/Profile");
const JobUtils = require("../utils/jobUtils");

module.exports = {
  async index(req, res) {
    const jobs = await Job.get();
    const profile = await Profile.get();
    let hoursOfWork = 0;
    let freeHours = 0;
    let statusCount = {
      progress: 0,
      done: 0,
      total: jobs.length
    };
    const updatedJobs = jobs.map((job) => {
      const remaining = JobUtils.remainingDays(job);
      const status = remaining <= 0 ? "done" : "progress";
      statusCount[status] += 1;
      hoursOfWork += status == 'progress' ? Number(job["daily-hours"]) : 0;
      return {
        ...job,
        remaining,
        status,
        budget: JobUtils.calculateBudget(job, profile["value-hour"])
      };
    });
    freeHours = Number(profile["hours-per-day"]) - Number(hoursOfWork)
    return res.render("index", { jobs: updatedJobs, profile, statusCount, freeHours });
  }
};
