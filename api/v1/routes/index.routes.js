const systemConfig = require("../../../config/system");

const taskRoutes = require("./task.routes");
const userRoutes = require("./user.routes");

module.exports = (app) => {
  const PATH_VERSION = systemConfig.prefixVersion;

  app.use(PATH_VERSION + "/tasks", taskRoutes);
  app.use(PATH_VERSION + "/users", userRoutes);
};
