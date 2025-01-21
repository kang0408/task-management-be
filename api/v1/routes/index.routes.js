const systemConfig = require("../../../config/system");

const taskRoutes = require("./task.routes");
const userRoutes = require("./user.routes");

const authMiddleware = require("../middlewares/auth.middleware");

module.exports = (app) => {
  const PATH_VERSION = systemConfig.prefixVersion;

  app.use(PATH_VERSION + "/tasks", authMiddleware.requestAuth, taskRoutes);
  app.use(PATH_VERSION + "/users", userRoutes);
};
