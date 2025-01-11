const Task = require("../models/task.model");
const paginationHelper = require("../../../helpers/pagination.helper");

// [GET] api/v1/tasks
module.exports.tasks = async (req, res) => {
  const find = {
    deleted: false,
  };

  if (req.query.status) {
    find.status = req.query.status;
  }

  // Pagination
  const countTasks = await Task.countDocuments(find);
  const objectPagination = paginationHelper(
    {
      currentPage: 1,
      limitedPage: 4,
    },
    countTasks,
    req.query
  );
  // End Pagination

  // Sort
  const sort = {};

  if (req.query.sortKey) {
    if (req.query.sortValue) sort[req.query.sortKey] = req.query.sortValue;
    else sort[req.query.sortKey] = "asc";
  }
  // End Sort

  const tasks = await Task.find(find)
    .sort(sort)
    .limit(objectPagination.limitedPage)
    .skip(objectPagination.skipPage);

  res.json(tasks);
};

// [GET] api/v1/tasks/details/:id
module.exports.detailsTask = async (req, res) => {
  const id = req.params.id;
  const tasks = await Task.findOne({
    _id: id,
    deleted: false,
  });

  res.json(tasks);
};
