// netlify/functions/bienso.js
exports.handler = async (event) => {
  try {
    const qs = event.queryStringParameters || {};
    const plate = (qs.bienso || qs.plate || "").trim();

    if (!plate) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Thiếu tham số ?bienso=" }),
      };
    }

    // dữ liệu mẫu
    const mock = {
      "30A-12345": {
        province: "Hà Nội",
        type: "Ô tô",
        registered: "2019-05-10",
        note: "Xe dịch vụ"
      },
      "51F-98765": {
        province: "TP HCM",
        type: "Xe máy",
        registered: "2021-03-01",
        note: ""
      }
    };

    const info = mock[plate.toUpperCase()] || {
      province: null,
      type: null,
      registered: null,
      note: "Không tìm thấy thông tin (mock data)"
    };

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: plate, info }, null, 2)
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Lỗi máy chủ", detail: err.message })
    };
  }
};
