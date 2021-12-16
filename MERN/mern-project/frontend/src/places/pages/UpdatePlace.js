import React, { useEffect, useState } from "react";
// URL에서 ID를 가져올 것이기 때문에 useParams 사용.
import { useParams } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
  VALIDATOR_MAXLENGTH,
} from "../../shared/util/validators";

import { useForm } from "../../shared/hooks/form-hook";

import "./PlaceForm.css";

const DUMMY_PLACES = [
  {
    id: "233",
    title: "helloworld",
    description: "beautiful!",
    address: "xx xxx xxxx",
    creator: "123",
    location: {
      lat: 40.7484405,
      lng: -73.9878584,
    },
    imageUrl:
      "data:image/png;base64,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",
  },
  {
    id: "234",
    title: "Crystarium",
    description: "beautiful!",
    address: "xx xxx xxxx",
    creator: "124",
    location: {
      lat: 40.7484405,
      lng: -73.9878584,
    },
    imageUrl:
      "https://www.siliconera.com/wp-content/uploads/2021/05/Final-Fantasy-XIV-Artwork-Exhibition.jpg",
  },
];

const UpdatePlace = () => {
  const [isLoading, setIsLoading] = useState(true);
  const placeId = useParams().placeId;
  // Hook은 함수의 최상위에서 call 해야함.
  // Fetch를 Hook보다 일찍할 순 없음..
  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  // hook을 call하고, dummy를 가져옴
  const identifiedPlace = DUMMY_PLACES.find((p) => p.id === placeId);

  useEffect(() => {
    if (identifiedPlace) {
      setFormData(
        {
          title: {
            value: identifiedPlace.title,
            isValid: true,
          },
          description: {
            value: identifiedPlace.description,
            isValid: true,
          },
        },
        true
      );
    }

    setIsLoading(false);
  }, [setFormData, identifiedPlace]);

  const placeUpdateSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  if (!identifiedPlace) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find place!</h2>
        </Card>
      </div>
    );
  }
  if (isLoading) {
    return (
      <div className="center">
        <h2>Loading...</h2>
      </div>
    );
  }
  return (
    <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
        onInput={inputHandler}
        initialValue={formState.inputs.title.value}
        initialIsValid={formState.inputs.title.isValid}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid Description at least 5 characters."
        onInput={inputHandler}
        initialValue={formState.inputs.description.value}
        initialIsValid={formState.inputs.description.isValid}
      />
      <Button type="submit" disabled={!formState.isValid}>
        UPDATE PLACE
      </Button>
    </form>
  );
};

export default UpdatePlace;
