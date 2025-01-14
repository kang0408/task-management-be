const md5 = require("md5");
const User = require("../models/user.model");

// [POST] api/v1/users/register
module.exports.register = async (req, res) => {
  console.log(req.body);
  req.body.password = md5(req.body.password);

  const existEmail = await User.findOne({
    email: req.body.email,
    deleted: false,
  });

  // Có thể lưu tạm vào database, cần xác thực email thì mới active, gửi mã OTP về email để xác thực
  // Học thêm validate cho api
  if (existEmail) {
    res.json({
      code: 400,
      message: "Email đã tồn tại tại!",
    });
  } else {
    const user = new User({
      fullName: req.body.fullName,
      email: req.body.email,
      password: req.body.password,
    });

    user.save();

    const token = user.token;
    res.cookie("token", token);

    res.json({
      code: 200,
      message: "Tạo tài khoản thành công",
      token: token,
    });
  }
};
