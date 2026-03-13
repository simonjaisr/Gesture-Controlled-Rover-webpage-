const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());

const PORT = 5000;

const CHANNEL_ID = "3242460";
const READ_API_KEY = "IPED4PFMCFICGF5H";

app.get("/api/sensor", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.thingspeak.com/channels/${CHANNEL_ID}/feeds.json?api_key=${READ_API_KEY}&results=20`
    );

    res.json(response.data.feeds);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

app.listen(PORT, () => {
  console.log("Server running on port 5000");
});