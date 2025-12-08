export default async function handler(req, res) {
  const AUTH_KEY = "lital_secret_key";
  const providedKey = req.headers["x-api-key"];

  if (providedKey !== AUTH_KEY) {
    return res.status(403).json({ error: "Unauthorized" });
  }

  const TARGET_URL =
    "https://script.google.com/macros/s/AKfycbyBS1QhrC-658Bb5hi2JT2CvpwxoViHr69NqCx-2sVipsV27A4msh_kTbDCpwEBIZ-UgA/exec";

  try {
    const response = await fetch(TARGET_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();

    // שולח ללקוח את הפלט מה־Apps Script בלבד — ללא שום הדפסות debug
    return res.status(200).json(data);
  } catch (error) {
    // הדפסת שגיאה רק אם זה מצב פיתוח
    if (process.env.NODE_ENV !== "production") {
      console.error("Proxy error:", error);
    }

    // מחזיר הודעה תמציתית בלבד
    return res.status(500).json({ error: "Proxy failed" });
  }
}
