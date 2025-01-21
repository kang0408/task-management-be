const Task = require("../models/task.model");
const paginationHelper = require("../../../helpers/pagination.helper");
const searchHelper = require("../../../helpers/search.helper");

// [GET] api/v1/tasks
module.exports.tasks = async (req, res) => {
  const find = {
    $or: [{ createdBy: req.user.id }, { listUser: req.user.id }],
    deleted: false,
  };

  // Status
  if (req.query.status) {
    find.status = req.query.status;
  }

  // Search
  const objectKeyword = searchHelper(req.query);

  if (objectKeyword.regex) {
    find.title = objectKeyword.regex;
  }
  // End Search

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

// [PATCH] api/v1/tasks/change-status/:id
module.exports.changeStatus = async (req, res) => {
  try {
    const id = req.params.id;
    const status = req.body.status;

    await Task.updateOne(
      {
        _id: id,
      },
      {
        status: status,
      }
    );

    res.json({
      code: 200,
      message: "Cập nhật trạng thái thành công!",
    });
  } catch (error) {
    res.json({
      code: 400,
      message: "Không tồn tại!",
    });
  }
};

// [PATCH] api/v1/tasks/change-multi
module.exports.changeMulti = async (req, res) => {
  try {
    const { ids, key, value } = req.body;

    switch (key) {
      case "status":
        await Task.updateMany(
          {
            _id: { $in: ids },
          },
          {
            status: value,
          }
        );
        res.json({
          code: 200,
          message: "Cập nhật trạng thái thành công!",
        });
        break;
      case "delete":
        // await Task.deleteMany({ _id: { $in: ids } });
        await Task.updateMany(
          {
            _id: { $in: ids },
          },
          { deleted: true, deletedAt: new Date() }
        );
        res.json({
          code: 200,
          message: "Xóa thành công!",
        });
        break;
      default:
        res.json({
          code: 400,
          message: "Không tồn tại!",
        });
        break;
    }
  } catch (error) {
    res.json({
      code: 400,
      message: "Không tồn tại!",
    });
  }
};

// [POST] api/v1/tasks/create
module.exports.createTask = async (req, res) => {
  try {
    req.body.createdBy = req.user.id;
    const newTask = new Task(req.body);
    const data = await newTask.save();

    res.json({
      code: 200,
      message: "Tạo thành công!",
      data: data,
    });
  } catch (error) {
    res.json({
      code: 400,
      message: "Lỗi!",
    });
  }
};

// [PATCH] api/v1/tasks/edit/:id
module.exports.editTask = async (req, res) => {
  try {
    const id = req.params.id;

    await Task.updateOne({ _id: id }, req.body);

    res.json({
      code: 200,
      message: "Chỉnh sửa thành công!",
    });
  } catch (error) {
    res.json({
      code: 400,
      message: "Lỗi!",
    });
  }
};

// [DELETE] api/v1/tasks/delete/:id
module.exports.deleteTask = async (req, res) => {
  try {
    const id = req.params.id;

    await Task.deleteOne({ _id: id });
    // await Task.updateOne(
    //   { _id: id },
    //   {
    //     deleted: true,
    //     deletedAt: new Date(),
    //   }
    // );

    res.json({
      code: 200,
      message: "Xóa thành công!",
    });
  } catch (error) {
    res.json({
      code: 400,
      message: "Lỗi!",
    });
  }
};
