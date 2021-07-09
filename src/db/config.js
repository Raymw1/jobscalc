const sqlite3 = require("sqlite3");
const { open } = require("sqlite"); // Get open() from sqlite   // Instead of sqlite.open()

module.exports = () => {
  open({
    filename: "./database.sqlite",
    driver: sqlite3.Database,
  });
};

