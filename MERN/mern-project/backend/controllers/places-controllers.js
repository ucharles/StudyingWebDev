const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");

const getCoordsForAddress = require("../util/location");
const Place = require("../models/place-model");

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

  let userPlaces;
  try {
    userPlaces = await Place.find({ creator: userId }).exec();
    // 찾으려는 오브젝트를 할당해야함!
  } catch (err) {
    const error = new HttpError("fetching places failed...", 500);
    return next(error);
  }

  if (!userPlaces || userPlaces.length === 0) {
    return next(
      new HttpError("Could not find places for the privided id", 404)
    ); // will be trigger: error handling middleware
    // throw로 처리할 경우 다음 처리가 취소됨. next()는 취소되지 않아서 return이 필요함.
  }
  res.json({
    places: userPlaces.map((place) => place.toObject({ getters: true })),
  }); // => {place} => {place: place}
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
  const createdPlace = new Place({
    title,
    description,
    address,
    location: coordinates,
    image: "https://en.wikipedia.org/wiki/File:Place_des_Jacobins.jpeg",
    creator,
  });

  try {
    await createdPlace.save();
  } catch (err) {
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
    console.log(errors);
    throw new HttpError("invalid input passed, plz check your data", 422);
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
    place = await Place.findById(placeId);
  } catch (err) {
    const error = new HttpError("cant not found place by id", 500);
    return next(error);
  }

  try {
    await place.remove();
  } catch (err) {
    const error = new HttpError(
      "cant not found place by id, cant delete place.",
      500
    );
    return next(error);
  }

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
