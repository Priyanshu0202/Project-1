import React, { useState } from "react";

const ConfigCreator = () => {
  const [configId, setConfigId] = useState("");
  const [twoDArrayInput, setTwoDArrayInput] = useState("");
  const [remark, setRemark] = useState("");
  const [createResult, setCreateResult] = useState(null);
  const URL = process.env.REACT_APP_BASE_URL;
  // Function to parse the input string into a 2D array
  const parseTwoDArray = (inputString) => {
    return inputString.split("\n").map((row) => row.split(",").map(Number));
  };

  const createConfiguration = async () => {
    try {
      const response = await fetch(`${URL}/api/configurations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          config_id: configId,
          data: parseTwoDArray(twoDArrayInput),
          remark: remark,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      setCreateResult(result);

      window.alert("Data Added Successfully");
      setConfigId("");
      setTwoDArrayInput("");
      setRemark("");
    } catch (error) {
      console.error("Error creating configuration:", error);
    }
  };

  return (
    <div className="mt-10">
      <h2 className="text-4xl border border-gray-300 bg-gray-100 p-3">
        Create Configuration
      </h2>
      <label className="block mt-4">
        <span className="text-xl">Config ID:</span>
        <input
          type="text"
          value={configId}
          onChange={(e) => setConfigId(e.target.value)}
          className="h-10 w-80 p-4 m-3 bg-gray-200 rounded-md"
          placeholder="Configuration ID"
        />
      </label>
      <label className="flex justify-center text-center mt-4">
        <span className="text-xl mt-5">2D Array:</span>
        <textarea
          value={twoDArrayInput}
          onChange={(e) => setTwoDArrayInput(e.target.value)}
          className="h-32 w-80 p-4 m-3 bg-gray-200 rounded-md"
          placeholder="Enter 2D Array (e.g., 1,2,3\n4,5,6\n7,8,9)"
        />
      </label>
      <label className="block mt-4">
        <span className="text-xl">Remark:</span>
        <input
          type="text"
          value={remark}
          onChange={(e) => setRemark(e.target.value)}
          className="h-10 w-80 p-4 m-3 bg-gray-200 rounded-md"
          placeholder="Remark"
        />
      </label>
      <button
        onClick={createConfiguration}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-all duration-300 dark:bg-gray-700 w-60 ml-20"
      >
        Create Configuration
      </button>
    </div>
  );
};

export default ConfigCreator;
