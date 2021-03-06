const express = require("express");
const { check } = require("express-validator");

const usersControllers = require("../controllers/users-controllers");
const fileUpload = require("../middleware/file-upload");

// Router() ... HTTP 메소드에 의해 필터링된, 미들웨어를 등록할 수 있는 특별한 객체를 제공.
const router = express.Router();

// 라우터 순서 주의!
router.get("/", usersControllers.getUsers);

router.post("/login", usersControllers.login);

// 변수마다 유효성검사 메시지를 따로 보고 싶을땐 어떡하나??
router.post(
  "/signup",
  fileUpload.single("image"),
  [
    check("username").trim().not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  usersControllers.signup
);

module.exports = router;
// router를 export 할 수 있다!
// export한 router를 app.js에 등록해서 관리.
