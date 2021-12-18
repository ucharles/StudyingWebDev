const express = require("express");

// Router() ... HTTP 메소드에 의해 필터링된, 미들웨어를 등록할 수 있는 특별한 객체를 제공.
const router = express.Router();

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "emsss",
    description: "sdfsf",
    location: { lat: 40.7484474, lng: -73.9871516 },
    address: "addresss!!!",
    creator: "u1",
  },
];

router.get("/:pid", (req, res, next) => {
  const placeId = req.params.pid;
  const place = DUMMY_PLACES.find((p) => {
    return p.id === placeId;
  });
  res.json({ place }); // => {place} => {place: place}
});

module.exports = router;
// router를 export 할 수 있다!
// export한 router를 app.js에 등록해서 관리.
