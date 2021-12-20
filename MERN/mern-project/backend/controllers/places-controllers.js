const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const { v4: uuid } = require("uuid");

const getCoordsForAddress = require("../util/location");

let DUMMY_PLACES = [
  {
    id: "p1",
    title: "emsss",
    description: "sdfsf",
    location: { lat: 40.7484474, lng: -73.9871516 },
    address: "addresss!!!",
    creator: "u1",
  },
];

const getPlacesById = (req, res, next) => {
  const placeId = req.params.pid;
  const places = DUMMY_PLACES.find((p) => {
    return p.id === placeId;
  });

  // 예외처리... 에러메시지를 출력하는 데, 코드적으론 어느쪽이 더 가독성이 좋은가?
  // return? if else?
  if (!places || places.length === 0) {
    throw new HttpError("Could not find a place for the privided id", 404); // will be trigger: error handling middleware
    // throw로 처리할 경우 다음 처리가 취소됨. next()는 취소되지 않아서 return이 필요함.
  }
  res.json({ place }); // => {place} => {place: place}
};

const getPlacesByUserId = (req, res, next) => {
  const userId = req.params.uid;
  const userPlaces = DUMMY_PLACES.find((p) => {
    return p.creator === userId;
  });

  if (!userPlaces || userPlaces.length === 0) {
    return next(
      new HttpError("Could not find places for the privided id", 404)
    ); // will be trigger: error handling middleware
    // throw로 처리할 경우 다음 처리가 취소됨. next()는 취소되지 않아서 return이 필요함.
  }
  res.json({ userPlaces }); // => {place} => {place: place}
};

const getPlaces = (req, res, next) => {
  res.json({ DUMMY_PLACES }); // => {place} => {place: place}
};

const createPlace = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // 비동기 코드는 throw가 올바르게 작동하지 않는다. next를 사용할 것.
    // throw new HttpError("invalid input passed, plz check your data", 422);
    return next(
      new HttpError("invalid input passed, plz check your data", 422)
    );
  }

  const { title, description, address, creator } = req.body;

  let coordinates;
  try {
    coordinates = await getCoordsForAddress(address);
  } catch (error) {
    console.log(error);
    return next(error);
  }

  // const title = req.body.title;
  const createdPlace = {
    id: uuid(),
    title,
    description,
    location: coordinates,
    address,
    creator,
  };

  DUMMY_PLACES.push(createdPlace);

  res.status(201).json(createdPlace);
};

const updatePlaceById = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    throw new HttpError("invalid input passed, plz check your data", 422);
  }

  const { title, description } = req.body;
  const placeId = req.params.pid;

  // 업데이트할 객체의 내용을 복사.
  const updatedPlace = { ...DUMMY_PLACES.find((p) => p.id === placeId) };
  // 왜 인덱스를 따로 두지? 아.. 지금 하드코드된 json 객체라 그런가.
  const placeIndex = DUMMY_PLACES.findIndex((p) => p.id === placeId);
  updatedPlace.title = title;
  updatedPlace.description = description;

  DUMMY_PLACES[placeIndex] = updatedPlace;

  res.status(200).json({ place: updatedPlace });
};

const deletePlace = (req, res, next) => {
  const placeId = req.params.pid;
  if (!DUMMY_PLACES.find((p) => p.id === placeId)) {
    throw new HttpError("Could not find a place for that id.", 404);
  }
  DUMMY_PLACES = DUMMY_PLACES.filter((p) => p.id !== placeId);
  res.status(200).json({ message: "deleted place." });
};

// module.exports = { getPlaceById, getPlaceByUserId };

exports.getPlaces = getPlaces;
exports.getPlacesById = getPlacesById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlaceById = updatePlaceById;
exports.deletePlace = deletePlace;

// 해당 함수에 대한 포인터를 export함.
