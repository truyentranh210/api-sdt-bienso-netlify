// =============================================
// 🏠 HOME FUNCTION — HIỂN THỊ TOÀN BỘ CHỨC NĂNG API (JSON)
// =============================================

exports.handler = async () => {
  const endpoints = {
    "/home": "Hiển thị toàn bộ hướng dẫn sử dụng API",
    "/sdt?=0123456789": "Kiểm tra hoặc truy xuất thông tin số điện thoại (qua AbstractAPI)"
  };

  const usage = {
    sdt: {
      method: "GET",
      example: "/sdt?sdt=0987654321",
      note: "Kiểm tra số điện thoại bằng API thật của AbstractAPI (trả về quốc gia, định dạng, vùng...)."
    },
    home: {
      method: "GET",
      example: "/home",
      note: "Hiển thị danh sách API đang hoạt động và hướng dẫn sử dụng."
    }
  };

  const response = {
    project: "📞 API Check Số Điện Thoại",
    author: "truyentranh210",
    version: "1.0.0",
    updated: new Date().toISOString(),
    description:
      "API demo chạy trên Netlify Functions, sử dụng AbstractAPI để kiểm tra số điện thoại và cung cấp hướng dẫn.",
    endpoints,
    usage
  };

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(response, null, 2)
  };
};
