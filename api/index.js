export default async function handler(req, res) {
  const AUTH_KEY = "lital_secret_key"; 
  const providedKey = req.headers["x-api-key"];

  if (providedKey !== AUTH_KEY) {
    return res.status(403).json({ error: "Unauthorized" });
  }

  const TARGET_URL = "https://script.google.com/macros/s/AKfycbzXPkzAlepBXAFlLgBx4cFrXzZdhDcii_n2rpK7iFn-9ow3yaXMikILIKRGqLLMbxJDtw/exec";

  try {
    const response = await fetch(TARGET_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error("Proxy error:", error);
    return res.status(500).json({ error: "Proxy failed", details: error.message });
  }
}
