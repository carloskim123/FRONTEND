import React from "react";
import { User } from "../../../utils/constants";

export function Greeting() {
  const currentTime = new Date();
  const hours = currentTime.getHours();
  let greetingMessage = "";

  if (hours >= 5 && hours < 12) {
    greetingMessage = `Good morning, ${User.username} 👋🏾`;
  } else if (hours >= 12 && hours < 18) {
    greetingMessage = `Good afternoon, ${User.username} 👋🏾`;
  } else {
    greetingMessage = `Good evening, ${User.username} 👋🏾`;
  }

  return (
    <div>
      <h2 className="text-4xl font-semibold text-gray-800 mb-12">
        {greetingMessage}
      </h2>
    </div>
  );
}
