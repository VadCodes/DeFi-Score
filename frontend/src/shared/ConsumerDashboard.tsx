import React from "react";
import "./ConsumerDashboard.css";

function ConsumerDashboard() {
  return (
    <>
      <h1 className="text-3xl font-bold underline">
        My Credit Score Dashboard
      </h1>
      <p className="mt-6">
        By clicking opting-in, you allow trusted vendors to have access to your
        credit score. You will be able to track who consults your score.
      </p>
      <button
        className="btn btn-blue mt-6"
        onClick={() => console.log("I'm in!")}
      >
        Opt-In
      </button>
    </>
  );
}

export default ConsumerDashboard;
