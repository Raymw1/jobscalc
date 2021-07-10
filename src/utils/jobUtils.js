module.exports = {
  remainingDays(job) {
    const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed();
    const createdDate = new Date(job.created_at);
    const dueDay = createdDate.getDate() + Number(remainingDays);
    const dueDateInMs = createdDate.setDate(dueDay);
    const timeDiffInMs = dueDateInMs - Date.now();
    const timeDiff = Math.ceil(timeDiffInMs / (3600000 * 24));
    return timeDiff;
  },
  calculateBudget(job, valueHour) {
    return (valueHour * job["total-hours"]).toFixed(2).replace(".", ",");
  },
};
