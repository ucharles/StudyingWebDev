import React from "react";
import "./GoalList.css";

const GoalList = (props: { goals: { id: string; text: string }[] }) => {
  return (
    <ul className="a-list">
      {props.goals.map((goal) => {
        return (
          <div>
            <li key={goal.id}>
              {goal.text}
              <button>X</button>
            </li>
          </div>
        );
      })}
    </ul>
  );
};
export default GoalList;
