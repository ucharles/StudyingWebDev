const fs = require("fs");

const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");

const getCoordsForAddress = require("../util/location");
const Place = require("../models/place-model");
const User = require("../models/user-model");
const mongoose = require("mongoose");

const getPlacesById = async (req, res, next) => {
  const placeId = req.params.pid;

  // try문 안에선 const를 정의하면 안됨..
  let place;
  try {
    place = await Place.findById(placeId).exec();
  } catch (err) {
    const error = new HttpError(
      "something went wrong, could not find a place.",
      500
    );
    return next(error);
  }

  // 예외처리... 에러메시지를 출력하는 데, 코드적으론 어느쪽이 더 가독성이 좋은가?
  // return? if else?
  if (!place || place.length === 0) {
    const error = new HttpError(
      "Could not find a place for the privided id",
      404
    ); // will be trigger: error handling middleware
    // throw로 처리할 경우 다음 처리가 취소됨. next()는 취소되지 않아서 return이 필요함.
    return next(error);
  }
  res.json({ place: place.toObject({ getters: true }) }); // => {place} => {place: place}
  // 언더바가 사라진 id가 추가됨..
  // res.json(places);
};

const getPlacesByUserId = async (req, res, next) => {
  const userId = req.params.uid;

  // let userPlaces;
  let userWithPlaces;
  try {
    userWithPlaces = await User.findById(userId).populate("places").exec();
    // 찾으려는 오브젝트를 할당해야함!
  } catch (err) {
    const error = new HttpError("fetching places failed...", 500);
    return next(error);
  }

  // if(!place || place.length === 0)
  if (!userWithPlaces || userWithPlaces.places.length === 0) {
    return next(
      new HttpError("Could not find places for the privided id", 404)
    ); // will be trigger: error handling middleware
    // throw로 처리할 경우 다음 처리가 취소됨. next()는 취소되지 않아서 return이 필요함.
  }
  res.json({
    places: userWithPlaces.places.map((place) =>
      place.toObject({ getters: true })
    ),
  }); // => {place} => {place: place}
};

const getPlaces = async (req, res, next) => {
  let places;
  try {
    places = await Place.find().exec();
  } catch (err) {
    const error = new HttpError("could not found places", 500);
    return next(error);
  }
  res.json({
    places: places.map((place) => place.toObject({ getters: true })),
  }); // => {place} => {place: place}
};

const createPlace = async (req, res, next) => {
  console.log(req.body);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new HttpError(
      "Invalid inputs passed, please check your data.",
      422
    );
    return next(error);
  }

  const { title, description, address, creator } = req.body;

  let coordinates;
  try {
    coordinates = await getCoordsForAddress(address);
  } catch (error) {
    return next(error);
  }

  const createdPlace = new Place({
    title,
    description,
    address,
    location: coordinates,
    image: req.file.path,
    creator,
  });

  let user;
  try {
    user = await User.findById(creator);
  } catch (err) {
    const error = new HttpError("Creating place failed, please try again", 500);
    return next(error);
  }

  if (!user) {
    const error = new HttpError("Could not find user for provided id", 404);
    return next(error);
  }

  console.log(user);

  // 로컬 DB 사용, 강의 내용대로 따라하면... 에러가 뜸
  // Transaction numbers are only allowed on a replica set member or mongos
  // 로컬 DB면 트랜잭션이 필요 없다는데...? Mongo atlas 쓸때만 필요한가..?
  try {
    const sess = await mongoose.startSession();
    await sess.withTransaction(async () => {
      await createdPlace.save({ session: sess });
      user.places.push(createdPlace);
      await user.save({ session: sess });
    });
    sess.endSession();
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "Creating place failed, please try again.",
      500
    );
    return next(error);
  }

  res.status(201).json({ place: createdPlace });
};

const updatePlaceById = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { title, description } = req.body;
  const placeId = req.params.pid;

  let place;
  try {
    place = await Place.findById(placeId).exec();
  } catch (err) {
    const error = new HttpError(
      "something went wrong, could not update a place.",
      500
    );
    return next(error);
  }

  place.title = title;
  place.description = description;

  try {
    await place.save();
  } catch (err) {
    const error = new HttpError(
      "something went wrong, could not update a place.",
      500
    );
    return next(error);
  }

  res.status(200).json({ place: place.toObject({ getters: true }) });
};

const deletePlace = async (req, res, next) => {
  const placeId = req.params.pid;
  let place;
  try {
    // populate: 컬렉션 간 연결(ref)이 있는 경우에만 사용 가능
    place = await Place.findById(placeId).populate("creator").exec();
  } catch (err) {
    const error = new HttpError("cant not found place by id", 500);
    return next(error);
  }

  if (!place) {
    const error = new HttpError("Could not find place for this id.", 404);
    return next(error);
  }

  const imagePath = place.image;

  try {
    const sess = await mongoose.startSession();
    await sess.withTransaction(async () => {
      await place.remove({ session: sess });
      // place -> place의 creator -> creator에 연결된 user의 places -> 제거
      place.creator.places.pull(place);
      await place.creator.save({ session: sess });
    });
    sess.endSession();
  } catch (err) {
    const error = new HttpError(
      "cant not found place by id, cant delete place.",
      500
    );
    return next(error);
  }

  // 이미지 삭제
  fs.unlink(imagePath, (err) => {
    err === null ? console.log("delete image: " + imagePath) : console.log(err);
  });
  res.status(200).json({ message: "Deleted place." });
};

// module.exports = { getPlaceById, getPlaceByUserId };

exports.getPlaces = getPlaces;
exports.getPlacesById = getPlacesById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlaceById = updatePlaceById;
exports.deletePlace = deletePlace;

// 해당 함수에 대한 포인터를 export함.
