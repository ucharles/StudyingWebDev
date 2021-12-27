const express = require("express");
const { check } = require("express-validator");

const placesControllers = require("../controllers/places-controllers");
const fileUpload = require("../middleware/file-upload");

// Router() ... HTTP 메소드에 의해 필터링된, 미들웨어를 등록할 수 있는 특별한 객체를 제공.
const router = express.Router();

// 라우터 순서 주의!
router.get("/user/:uid", placesControllers.getPlacesByUserId);

router.get("/:pid", placesControllers.getPlacesById);

router.get("/", placesControllers.getPlaces);

router.patch(
  "/:pid",
  [
    check("title").trim().not().isEmpty(),
    check("description").trim().isLength({ min: 5 }),
  ],
  placesControllers.updatePlaceById
);

router.post(
  "/",
  fileUpload.single("image"),
  [
    check("title").trim().not().isEmpty(),
    check("description").trim().isLength({ min: 5 }),
    check("address").trim().not().isEmpty(),
  ],
  placesControllers.createPlace
);

router.delete("/:pid", placesControllers.deletePlace);

module.exports = router;
// router를 export 할 수 있다!
// export한 router를 app.js에 등록해서 관리.
