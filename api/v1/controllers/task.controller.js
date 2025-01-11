const Task = require("../models/task.model");

// [GET] api/v1/tasks
module.exports.tasks = async (req, res) => {
  const find = {
    deleted: false,
  };

  if (req.query.status) {
    find.status = req.query.status;
  }

  const tasks = await Task.find(find);

  console.log(tasks);
  res.json(tasks);
};

// [GET] api/v1/tasks/details/:id
module.exports.detailsTask = async (req, res) => {
  const id = req.params.id;
  const tasks = await Task.findOne({
    _id: id,
    deleted: false,
  });

  console.log(tasks);
  res.json(tasks);
};
