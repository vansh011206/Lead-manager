const fs = require('fs');
const path = require('path');

const envPath = "c:\\Users\\Vanshaj sharma\\Desktop\\Forgeweb\\Lead-manager\\.env";

let apiKey = "";
try {
  const envContent = fs.readFileSync(envPath, 'utf8');
  const match = envContent.match(/GEMINI_API_KEY=["']?([^"'\r\n]+)/);
  if (match) {
    apiKey = match[1];
  }
} catch (e) {
  console.error("Error reading env:", e);
}

if (!apiKey) {
  console.error("GEMINI_API_KEY not found in .env file!");
  process.exit(1);
}

async function testGemini() {
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${apiKey}`;
  
  const payload = {
    contents: [
      {
        parts: [
          {
            text: "Hello! Reply with a single sentence in Hindi containing the words 'फोर्ज वेब' and 'ऑटोमेशन'."
          }
        ]
      }
    ],
    generationConfig: {
      temperature: 0.2
    }
  };

  console.log("Sending test request to Gemini API (gemini-3.5-flash)...");
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload)
    });

    console.log("Response status:", response.status, response.statusText);
    
    const data = await response.json();
    if (!response.ok) {
      console.error("Gemini API Error details:", JSON.stringify(data, null, 2));
      return;
    }

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    console.log("\n--- Success! Gemini Response ---");
    console.log(text);
    console.log("--------------------------------\n");
  } catch (error) {
    console.error("Network/Fetch error:", error);
  }
}

testGemini();
