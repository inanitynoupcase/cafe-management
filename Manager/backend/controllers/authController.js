const TaiKhoan_NhanVien = require("../models/TaiKhoan_NhanVien");
const NhanVien = require("../models/NhanVien");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

let refreshTokens = [];
const authController = {
  //REGISTER
  registerUser: async (req, res) => {
    try {
      const user = await TaiKhoan_NhanVien.findOne({
        where: {
          ID_NhanVien: req.body.ID_NhanVien,
        },
      });
      const user1 = await NhanVien.findOne({
        where: {
          ID_NhanVien: req.body.ID_NhanVien,
        },
      });
      if (!user1) {
        return res.status(404).json("Vui lòng kiểm tra lại mã Nhân Viên");
      }
      if (user)
        return res
          .status(409)
          .json("ID này đã tồn tại tài khoản, vui lòng đăng nhập");
      else {
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(req.body.MatKhau, salt);
        const autoRole = "3";
        //Create new user
        const newUser = await TaiKhoan_NhanVien.create({
          TenTaiKhoan: req.body.TenTaiKhoan,
          MatKhau: hashed,
          ID_NhanVien: req.body.ID_NhanVien,
          ID_ChucVu: autoRole,
        });

        return res.status(200).json(newUser);
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  generateAccessToken: (user) => {
    return jwt.sign(
      { id: user.ID_TaiKhoan, roleID: user.ID_ChucVu },
      process.env.JWT_ACCESS_KEY,
      { expiresIn: "20s" }
    );
  },

  generateRefreshToken: (user) => {
    return jwt.sign(
      { id: user.ID_TaiKhoan, roleID: user.ID_ChucVu },
      process.env.JWT_REFRESH_KEY,
      { expiresIn: "365d" }
    );
  },

  generateAccessTokenInRequestRefreshToken: (user) => {
    return jwt.sign(
      { id: user.id, roleID: user.roleID },
      process.env.JWT_ACCESS_KEY,
      { expiresIn: "20s" }
    );
  },

  generateRefreshTokeInRequestRefreshToken: (user) => {
    return jwt.sign(
      { id: user.id, roleID: user.roleID },
      process.env.JWT_REFRESH_KEY,
      { expiresIn: "365d" }
    );
  },
  //lOGIN
  loginUser: async (req, res) => {
    try {
      const user = await TaiKhoan_NhanVien.findOne({
        where: {
          TenTaiKhoan: req.body.TenTaiKhoan,
        },
      });
      if (!user) return res.status(404).json("Tài Khoản Không Chính Xác");
      const validPassword = await bcrypt.compare(
        req.body.MatKhau,
        user.MatKhau
      );
      if (!validPassword) {
        return res.status(404).json("Mật Khẩu Không Chính Xác");
      }
      if (user && validPassword) {
        const user1 = await NhanVien.findOne({
          where: { ID_NhanVien: user.ID_NhanVien },
        });
        const HoTenNV = user1.HoTen;
        const NgaySinhNV = user1.NgaySinh;
        const GioiTinhNV = user1.GioiTinh;
        const DiaChiNV = user1.DiaChi;
        const SDTNV = user1.SDT;
        const EmailNV = user1.Email;
        const CCCDNV = user1.CCCD;
        const accessToken = authController.generateAccessToken(user);
        const refreshToken = authController.generateRefreshToken(user);
        refreshTokens.push(refreshToken);
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: false,
          path: "/",
          sameSite: "strict",
        });
        const { MatKhau, ...others } = user.toJSON();
        return res.status(200).json({
          ...others,
          HoTenNV,
          NgaySinhNV,
          GioiTinhNV,
          DiaChiNV,
          SDTNV,
          EmailNV,
          CCCDNV,
          accessToken,
          refreshToken,
        });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  requestRefreshToken: async (req, res) => {
    //Take refresh token from user
    const refreshToken = req.cookies.refreshToken;
    console.log("Cookie refreshToken: ", refreshToken);
    //Send error if token is not valid
    if (!refreshToken) {
      console.log("refreshToken:", refreshToken);
      return res.status(401).json("You're not authenticated");
    }
    if (!refreshTokens.includes(refreshToken)) {
      console.log("Mảng refreshTokens: ", refreshTokens);
      console.log(refreshTokens.includes(refreshToken));
      return res.status(403).json("Refresh token is not valid");
    }
    jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
      if (err) {
        console.log(err);
      }
      // refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
      //create new access token, refresh token and send to user
      const newAccessToken =
        authController.generateAccessTokenInRequestRefreshToken(user);
      const newRefreshToken =
        authController.generateRefreshTokeInRequestRefreshToken(user);
      refreshTokens.push(newRefreshToken);

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite: "strict",
      });
      return res.status(200).json({
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      });
    });
  },
  //HTTPONLY COOKIE FOR REFRESH TOKEN, REDUX STORE (LOCAL STORAGE) FOR ACCESS TOKEN

  changePassword: async (req, res) => {
    try {
      // Lấy thông tin tài khoản của người dùng từ token
      const user = await TaiKhoan_NhanVien.findOne({
        where: {
          ID_NhanVien: req.body.ID_NhanVien,
        },
      });
      if (!user) {
        return res.status(400).json("Không tìm thấy nhân viên này");
      }
      // Kiểm tra mật khẩu cũ
      const validPassword = await bcrypt.compare(
        req.body.oldPassword,
        user.MatKhau
      );
      if (!validPassword) {
        return res.status(400).json("Mật khẩu cũ không chính xác");
      }

      // Mã hóa mật khẩu mới
      const salt = await bcrypt.genSalt(10);
      const hashedNewPassword = await bcrypt.hash(req.body.newPassword, salt);

      // Cập nhật mật khẩu mới vào cơ sở dữ liệu
      await TaiKhoan_NhanVien.update(
        { MatKhau: hashedNewPassword },
        { where: { ID_TaiKhoan: user.ID_TaiKhoan } }
      );

      return res.status(200).json("Đổi mật khẩu thành công");
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  //LOG OUT
  logOut: async (req, res) => {
    //Clear cookies when user logs out
    refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
    res.clearCookie("refreshToken");
    return res.status(200).json("Logged out successfully!");
  },
};

module.exports = authController;
