import React, { useState } from "react";

const ConfigFetcher = () => {
  const [configId, setConfigId] = useState("");
  const [configData, setConfigData] = useState(null);
  const URL = process.env.REACT_APP_BASE_URL;
  const fetchData = async () => {
    try {
      const response = await fetch(`${URL}/api/configurations/${configId}`);
      const { data, remark, config_id } = await response.json();
      console.log(data);
      if (response.ok) {
        setConfigData({
          data,
          remark,
          config_id,
        });
      } else {
        window.alert(`Failed to fetch configuration with ID ${configId}`);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setConfigId("");
  };

  return (
    <div className="mt-10">
      <h2 className="text-4xl border border-gray-300 bg-gray-100 p-3">
        Fetch Configuration Data
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
      <button
        onClick={fetchData}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-all duration-300 dark:bg-gray-700"
      >
        Submit
      </button>

      {configData && (
        <div className="w-80 text-center mx-auto">
          <h3 className="text-lg font-bold">Configuration Data</h3>
          <div className="grid grid-cols-3 gap-2 mt-4 mx-auto">
            {configData.data.map((row, rowIndex) =>
              row.map((value, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className="border rounded-sm px-4 py-2 bg-gray-100"
                >
                  {value}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ConfigFetcher;
