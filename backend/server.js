const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const configuration = require("./models/configModel");
const port = process.env.PORT || 8080;
require("dotenv").config();
app.use(cors());
app.use(bodyParser.json());

app.post("/api/configurations", async (req, res) => {
  const { config_id, data, remark } = req.body;

  try {
    // Check if a configuration with the given config_id already exists
    const existingConfig = await configuration?.findOne({ config_id });
    if (existingConfig) {
      return res
        .status(400)
        .json({ error: "Configuration with the same ID already exists" });
    }

    // Create a new Configuration document
    const newConfig = new configuration({
      config_id,
      data,
      remark,
    });
    // Save the new configuration to the database
    await newConfig.save();

    res.json({ message: "Configuration added successfully" });
  } catch (error) {
    console.error("Error adding configuration to MongoDB:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/configurations/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const Configuration = await configuration.findOne({ config_id: id });

    if (Configuration) {
      res.json({
        data: Configuration?.data,
        remark: Configuration?.remark,
        config_id: id,
      });
    } else {
      res.status(404).json({ error: "Configuration not found" });
    }
  } catch (error) {
    console.error("Error retrieving data from MongoDB:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.put("/api/configurations/:id", async (req, res) => {
  const { id } = req.params;
  const { remark } = req.body;

  try {
    // Check if the configuration with the given config_id exists
    const existingConfig = await configuration.findOne({ config_id: id });

    if (!existingConfig) {
      return res.status(404).json({ error: "Configuration not found" });
    }

    // Update the remark if the configuration exists
    const result = await configuration.updateOne(
      { config_id: id },
      { $set: { remark } }
    );
    res.json({ message: "Remark updated successfully", remark: remark });
  } catch (error) {
    console.error("Error updating data in MongoDB:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connected to mongoDB");
    app.listen(8080, () => {
      console.log("server is running on port:8080");
    });
  })
  .catch((error) => {
    console.log(error);
  });
