const Database = require("../db/config");
const editDb = require("../db/edit");

module.exports = {
  async create(newJob) {
    await editDb.inserting.insertingJob(newJob);
  },
  async get() {
    const db = await Database();
    const jobs = await db.all(`SELECT * FROM jobs;`);
    await db.close();
    return jobs.map((job) => ({
      id: job.id,
      name: job.name,
      "daily-hours": job.daily_hours,
      "total-hours": job.total_hours,
      created_at: job.created_at
    }));
  },
  update(newJob) {
    data = newJob;
  },
  async delete(jobId) {
    const db = await Database();
    const jobs = await db.all(`DELETE FROM jobs WHERE id = ${Number(jobId)};`);
    await db.close();
    // jobs = jobs.filter((job) => Number(job.id) !== Number(jobId)); // Return when condition is FALSE
  },
};
