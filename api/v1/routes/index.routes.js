const systemConfig = require("../../../config/system");

const taskRoutes = require("./task.routes");

module.exports = (app) => {
  const PATH_VERSION = systemConfig.prefixVersion;

  app.use(PATH_VERSION + "/tasks", taskRoutes);
};
