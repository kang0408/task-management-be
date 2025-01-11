const taskRoutes = require("./task.routes");

module.exports = (app) => {
  app.use("/tasks", taskRoutes);
};
