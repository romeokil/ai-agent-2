import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();

// CORS options
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: "true",
};
app.use(express.json());
app.use(cors(corsOptions));

// Endpoint: POST /weather-agent
app.post("/weather-agent", async (req, res) => {
  try {
    const { location, date } = req.body;

    // Prompt payload for model
    const promptPayload = {
      model: "llama-3.1-8b-instruct",
      messages: [
        { role: "system", content: "You are a weather and activity assistant." },
        {
          role: "user",
          content: `
Date: ${date || "today"}
Location: ${location}

Provide weather details and activities in **strict JSON format**:
{
  "weather": { 
    "temp": "", 
    "condition": "", 
    "humidity": "", 
    "wind_speed": "", 
    "sunrise": "", 
    "sunset": "" 
  },
  "air_quality": { 
    "aqi": "", 
    "pm2_5": "", 
    "pm10": "" 
  },
  "best_time_to_visit": "", 
  "nearbyCities": [ 
    { "name": "", "distance_km": "" } 
  ],
  "activities": [ 
    { "name": "", "type": "", "best_time": "" } 
  ],
  "restaurants": [ 
    { "name": "", "cuisine": "", "rating": "", "maps_link": "" } 
  ],
  "emergency": { 
    "nearest_hospital": "", 
    "contact_number": "" 
  },
  "travel_tips": [ 
    "Carry an umbrella", 
    "Wear light clothes" 
  ]
}


✅ Rules:
- At least 3 nearby cities
- At least 3 activity suggestions
- Output only valid JSON.
          `,
        },
      ],
    };

    // Call Pollinations API
    const response = await fetch("https://text.pollinations.ai/openai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(promptPayload),
    });

    const text = await response.text();
    const data = JSON.parse(text);

    if (!data) {
      return res.status(400).json({ error: "No response from AI." });
    }

    // Extract model response
    const rawContent = data?.choices?.[0]?.message?.content;

    let weatherPlan;
    try {
      weatherPlan = JSON.parse(rawContent); 
      console.log("weatherPlan",weatherPlan)// Try to parse JSON
    } catch (err) {
      console.error("JSON parsing error:", err);
      weatherPlan = { raw: rawContent }; // fallback raw
    }

    res.json(weatherPlan);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Something went wrong!" });
  }
});

// Start server
app.listen(5000, () =>
  console.log("✅ AI Weather Agent running at http://localhost:5000")
);
