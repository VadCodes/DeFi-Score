import React from "react";
import "./ConsumerDashboard.css";

function ConsumerDashboard() {
  return (
    <div className="consumer-dashboard">
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
      <div className="mt-6 consult-history">
        <ul className="list-disc list-inside text-slate-700 bg-white rounded-xl shadow-lg ring-1 ring-slate-900/5 p-4 pl-8 dark:bg-slate-800 dark:ring-0 dark:highlight-white/5 dark:text-slate-400">
          {[
            "BankA (0xasgbondmoiemfoseifmosem123456)",
            "BankB (0xasgbondmoiemfoseifmosem123452)",
          ].map((address) => (
            <li>{address}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ConsumerDashboard;
