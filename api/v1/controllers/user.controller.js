const md5 = require("md5");
const User = require("../models/user.model");
const ForgotPassword = require("../models/forgot-password.model");

const generateHelper = require("../../../helpers/generate.helper");
const sendMailHelper = require("../../../helpers/sendMail.helper");

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
      token: generateHelper.generateRandomString(30),
    });

    await user.save();

    const token = user.token;
    res.cookie("token", token);

    res.json({
      code: 200,
      message: "Tạo tài khoản thành công",
      token: token,
    });
  }
};

// [POST] api/v1/users/login
module.exports.login = async (req, res) => {
  console.log(req.body);
  const email = req.body.email;
  const password = req.body.password;

  const user = await User.findOne({
    email: email,
    deleted: false,
  });

  if (!user) {
    res.json({
      code: 400,
      message: "Email không tồn tại!",
    });
    return;
  }

  if (md5(password) !== user.password) {
    res.json({
      code: 400,
      message: "Sai mật khẩu",
    });
    return;
  }

  const token = user.token;
  res.cookie("token", token);

  res.json({
    code: 200,
    message: "Đăng nhập thành công",
    token: token,
  });
};

// [POST] api/v1/users/password/forgot
module.exports.forgotPassword = async (req, res) => {
  const email = req.body.email;

  const user = await User.findOne({
    email: email,
    deleted: false,
  });

  if (!user) {
    res.json({
      code: 400,
      message: "Email không tồn tại",
    });
    return;
  }

  const otp = generateHelper.generateRandomNumber(8);

  const timeExpire = 5;

  // Lưu data vào database
  const objectForgotPassword = {
    email: email,
    otp: otp,
    expireAt: Date.now() + timeExpire * 60 * 1000,
  };

  const forgotPassword = new ForgotPassword(objectForgotPassword);
  await forgotPassword.save();

  // Gửi OTP qua email của user
  const subject = "Mã OTP xác minh lấy lại mật khẩu";
  const html = `
    Mã OTP lấy lại mật khẩu của bạn là <b>${otp}</b> (Sử dụng trong ${timespire} phút).
    Vui lòng không chia sẻ mã OTP này với bất kì ai
  `;

  sendMailHelper.sendMail(email, subject, html);

  res.json({
    code: 200,
    message: "Đã gửi mã OTP qua email",
  });
};

// [POST] api/v1/users/password/otp
module.exports.verifyOTP = async (req, res) => {
  const email = req.body.email;
  const otp = req.body.otp;

  const result = await ForgotPassword.findOne({
    email: email,
    otp: otp,
    deleted: true,
  });

  if (!result) {
    res.json({
      code: 400,
      message: "Mã OTP không hợp lệ.",
    });
    return;
  }

  const user = await User.findOne({
    email: email,
  });

  const token = user.token;
  res.cookie("token", token);

  res.json({
    code: 200,
    message: "Xác thực thành công",
    token: token,
  });
};

// [POST] api/v1/users/password/reset
module.exports.resetPassword = async (req, res) => {
  const token = req.body.token;
  const password = req.body.password;

  const user = await User.findOne({
    email: email,
  });

  if (md5(password) === user.password) {
    res.json({
      code: 400,
      message: "Vui lòng nhập mật khẩu mới khác mật khẩu cũ",
    });
    return;
  }

  await User.updateOne(
    {
      token: token,
    },
    {
      password: md5(password),
    }
  );

  res.json({
    code: 200,
    message: "Đổi mật khẩu thành công",
  });
};

// [GET] api/v1/users/details
module.exports.details = async (req, res) => {
  res.json({
    code: 200,
    message: "Thành công",
    data: req.user,
  });
};
