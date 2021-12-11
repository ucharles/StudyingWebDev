import GoalList from "./components/GoalList/GoalList";
import NewGoal from "./components/NewGoal/NewGoal";
import React, { useState } from "react";
import "./App.css";

const App = () => {
  // return React.createElement("h1", {}, "HI, Hello, annyong");

  const [courseGoals, setCourseGoals] = useState([
    { id: "cg1", text: "finished!" },
    { id: "cg2", text: "i want to be backend engineer!" },
    { id: "cg3", text: "i can do it!" },
    { id: "cg4", text: "hello world!" },
    { id: "cg5", text: "good for you" },
    { id: "cg6", text: "everything be fine!" },
  ]);

  const addNewGoalHandler = (newGoal: { id: string; text: string }) => {
    setCourseGoals(courseGoals.concat(newGoal));
  };

  return (
    <div className="a-goals">
      <h1>Welcome to React</h1>
      <NewGoal onAddGoal={addNewGoalHandler} />
      <GoalList goals={courseGoals} />
    </div>
  );
};

export default App;
