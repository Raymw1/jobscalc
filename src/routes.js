const express = require("express");
const routes = express.Router();

const Profile = {
  data: {
    name: "Rayan",
    avatar: "https://github.com/raymw1.png",
    "monthly-budget": 3000,
    "days-per-week": 5,
    "hours-per-day": 8,
    "vacation-per-year": 4,
    "value-hour": 18.75
  },
  controllers: {
    index(req, res) {
      return res.render("profile", { profile: Profile.data });
    },
    update(req, res) {
      const data = req.body;
      const activeWeeks = 52 - data["vacation-per-year"];
      const weeksPerMonth = activeWeeks / 12;
      const hoursPerWeek = data["hours-per-day"] * data["days-per-week"];
      const hoursPerMonth = hoursPerWeek * weeksPerMonth;
      data["value-hour"] = data["monthly-budget"] / hoursPerMonth;
      Profile.data = data;
      return res.redirect("/profile");
    }
  }
};

const Job = {
  data: [
    {
      id: 1,
      name: "Pizzaria Guloso",
      "daily-hours": 2,
      "total-hours": 60,
      created_at: Date.now(), // TODAY DATE
    },
    {
      id: 2,
      name: "OneTwo Project",
      "daily-hours": 3,
      "total-hours": 3,
      created_at: Date.now(), // TODAY DATE
    },
  ],
  controllers: {
    index(req, res) {
      const updatedJobs = Job.data.map((job) => {
        const remaining = Job.services.remainingDays(job);
        const status = remaining <= 0 ? "done" : "progress";
        return {
          ...job,
          remaining,
          status,
          budget: Job.services.calculateBudget(job, Profile.data['value-hour'])
        };
      });
      return res.render("index", { jobs: updatedJobs });
    },
    create(req, res) {
      const lastId = Job.data[Job.data.length - 1]?.id || 0;
      Job.data.push({
        id: lastId + 1,
        name: req.body.name,
        "daily-hours": req.body["daily-hours"],
        "total-hours": req.body["total-hours"],
        created_at: Date.now(), // TODAY DATE
      });
      return res.redirect("/");
    },
    show(req, res) {
      const jobId = req.params.id;
      const job = Job.data.find(job => job.id == jobId);
      if (!job) {
          return res.send("Job not found!");
      }
      job.budget = Job.services.calculateBudget(job, Profile.data['value-hour']);
      return res.render("job-edit", { job });
    },
    update(req, res) {
      const jobId = req.params.id;
      const job = Job.data.find(job => job.id == jobId);
      if (!job) {
          return res.send("Job not found!");
      }
      const updatedJob = {
        ...job,
        name: req.body.name,
        "total-hours": req.body['total-hours'],
        "daily-hours": req.body['daily-hours']
      }
      Job.data = Job.data.map(job => {
          if (Number(job.id) === Number(jobId)) {
              job = updatedJob;
          }
          return job
      })
      return res.redirect("/job/" + jobId);
    }
  },
  services: {
    remainingDays(job) {
      const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed();
      const createdDate = new Date(job.created_at);
      const dueDay = createdDate.getDate() + Number(remainingDays);
      const dueDateInMs = createdDate.setDate(dueDay);
      const timeDiffInMs = dueDateInMs - Date.now();
      const timeDiff = Math.floor(timeDiffInMs / (3600000 * 24));
      return timeDiff;
    },
    calculateBudget(job, valueHour) {
        return (valueHour * job['total-hours']).toFixed(2).replace(".", ",");
    }
  }
};

routes.get("/", Job.controllers.index);
routes.get("/job", (req, res) => res.render("job"));
routes.post("/job", Job.controllers.create);
routes.get("/job/:id", Job.controllers.show);
routes.post("/job/:id", Job.controllers.update);
routes.get("/profile", Profile.controllers.index);
routes.post("/profile", Profile.controllers.update);

module.exports = routes;
