import React, { useState } from "react";

const ConfigUpdater = () => {
  const [configId, setConfigId] = useState("");
  const [remark, setRemark] = useState("");
  const [updateResult, setUpdateResult] = useState(null);
  const URL = process.env.REACT_APP_BASE_URL;
  const updateConfig = async () => {
    try {
      const response = await fetch(`${URL}/api/configurations/${configId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ remark }),
      });
      if (!response.ok) {
        window.alert("Config ID not found");
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setUpdateResult(data);
      window.alert("Remark updated successfully!");
    } catch (error) {
      console.error("Error updating configuration:", error);
    }
    setConfigId("");
    setRemark("");
  };

  return (
    <div className="mt-10">
      <h2 className="text-4xl border border-gray-300 bg-gray-100 p-3">
        Update Configuration Remark
      </h2>
      <label>
        <span className="text-xl">Config ID:</span>
        <input
          type="text"
          value={configId}
          onChange={(e) => setConfigId(e.target.value)}
          className="h-10 w-80 p-4 m-3 bg-gray-200 rounded-md"
          placeholder="Configuration ID"
        />
      </label>
      <br />
      <label className="text-center flex justify-center">
        <span className="text-xl text-center">Remark:</span>
        <textarea
          value={remark}
          onChange={(e) => setRemark(e.target.value)}
          className="bg-gray-200 w-80 h-20 rounded-md ml-4 p-2"
          placeholder="Enter Remark..."
        />
      </label>
      <br />
      <button
        onClick={updateConfig}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-all duration-300 dark:bg-gray-700 w-60 ml-20"
      >
        Submit
      </button>

      {updateResult && updateResult.message && (
        <div className="mt-4 mx-auto text-center w-96">
          <p className="text-lg font-semibold border bg-gray-100">
            Updated Remark : {updateResult.remark}
          </p>
        </div>
      )}
    </div>
  );
};

export default ConfigUpdater;
