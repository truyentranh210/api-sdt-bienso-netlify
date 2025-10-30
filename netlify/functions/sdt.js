// netlify/functions/sdt.js
exports.handler = async (event) => {
  try {
    const qs = event.queryStringParameters || {};
    const phone = (qs.sdt || qs.phone || "").trim();

    if (!phone) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Thiếu tham số ?sdt=" }),
      };
    }

    // Gọi AbstractAPI (API thật)
    const API_KEY = "cfe09d3ce83048c4b641e01c1130410a"; // ⚠️ có thể thay bằng process.env.PHONE_API_KEY
    const url = `https://phoneintelligence.abstractapi.com/v1/?api_key=${API_KEY}&phone=${encodeURIComponent(phone)}`;

    const resp = await fetch(url);
    if (!resp.ok) {
      return {
        statusCode: resp.status,
        body: JSON.stringify({ error: "Lỗi khi gọi Abstract API", status: resp.status }),
      };
    }

    const data = await resp.json();

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data, null, 2), // giữ format đẹp
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Lỗi máy chủ", detail: err.message }),
    };
  }
};
