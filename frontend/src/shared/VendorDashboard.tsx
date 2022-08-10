import { AccountId } from "@hashgraph/sdk";
import React, { useState } from "react";

function VendorDashboard() {
  const [address, setAddress] = useState(
    AccountId.fromString(
      process.env.REACT_APP_CONSUMER_ACCOUNT_ID!
    ).toSolidityAddress()
  );

  return (
    <div className="consumer-dashboard">
      <h1 className="text-3xl font-bold underline">My Vendor Dashboard</h1>
      <div className="mt-6">
        <label
          htmlFor="first_name"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Consumer Address
        </label>
        <input
          type="text"
          id="first_name"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
      </div>
      <button
        className="btn btn-blue mt-6"
        onClick={() => console.log("get the score for " + address)}
      >
        Consult score
      </button>
    </div>
  );
}

export default VendorDashboard;
