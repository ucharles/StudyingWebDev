import React, { useState } from "react";
import "./NewGoal.css";

const NewGoal = (props: {
  onAddGoal: (arg0: { id: string; text: string }) => void;
}) => {
  const [enteredText, setEnteredText] = useState("");

  const addGoalHandler = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    const newGoal = {
      id: Math.random().toString(),
      text: enteredText,
    };
    if (enteredText !== "") {
      props.onAddGoal(newGoal);
    }
    setEnteredText("");
  };

  const textChangeHandler = (event: { target: { value: string } }) => {
    setEnteredText(event.target.value);
  };

  return (
    <form className="new-goal" onSubmit={addGoalHandler}>
      <input type="text" value={enteredText} onChange={textChangeHandler} />
      <button type="submit">Add Goal</button>
    </form>
  );
};
export default NewGoal;
