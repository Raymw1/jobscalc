let data = [
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
];

module.exports = {
  create(newJob) {
    data.push(newJob);
  },
  get() {
    return data;
  },
  update(newJob) {
    data = newJob;
  },
  delete(jobId) {
    data = data.filter((job) => Number(job.id) !== Number(jobId)); // Return when condition is FALSE
  }
};
