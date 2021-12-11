import React, { useState } from "react";
import "./NewGoal.css";

const NewGoal = (props: {
  onAddGoal: (arg0: { id: string; text: string }) => void;
}) => {
  const addGoalHandler = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    const newGoal = {
      id: Math.random().toString(),
      text: "hello world",
    };
    props.onAddGoal(newGoal);
  };
  return (
    <form className="new-goal" onSubmit={addGoalHandler}>
      <input type="text" />
      <button type="submit">Add Goal</button>
    </form>
  );
};
export default NewGoal;
