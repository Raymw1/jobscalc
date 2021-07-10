const Job = require("../model/Job");
const Profile = require("../model/Profile");
const JobUtils = require("../utils/jobUtils");

module.exports = {
  async create(req, res) {
    const profile = await Profile.get();
    await Job.create({
      name: req.body.name,
      "daily-hours": req.body["daily-hours"],
      "total-hours": req.body["total-hours"],
      created_at: Date.now(), // TODAY DATE
      profile_id: profile.id
    });
    return res.redirect("/");
  },
  async show(req, res) {
    const jobs = await Job.get();
    const profile = await Profile.get();
    const jobId = req.params.id;
    const job = jobs.find((job) => job.id == jobId);
    if (!job) {
      return res.send("Job not found!");
    }
    job.budget = JobUtils.calculateBudget(job, profile["value-hour"]);
    return res.render("job-edit", { job });
  },
  async update(req, res) {
    const jobs = await Job.get();
    const jobId = req.params.id;
    const job = jobs.find((job) => job.id == jobId);
    if (!job) {
      return res.send("Job not found!");
    }
    const updatedJob = {
      ...job,
      name: req.body.name,
      "total-hours": req.body["total-hours"],
      "daily-hours": req.body["daily-hours"],
    };
    const updatedJobs = jobs.map((job) => {
      if (Number(job.id) === Number(jobId)) {
        job = updatedJob;
      }
      return job;
    });
    Job.update(updatedJobs);
    return res.redirect("/job/" + jobId);
  },
  delete(req, res) {
    const jobId = req.params.id;
    Job.delete(jobId);
    return res.redirect("/");
  },
};
