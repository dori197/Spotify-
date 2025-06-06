// Tự động detect URL hiện tại
function getCurrentURL() {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  // Fallback URLs cho các trường hợp phổ biến
  return "http://127.0.0.1:5500";
}

// Spotify API Configuration
const SPOTIFY_CONFIG = {
  // Client ID từ Spotify Developer Dashboard
  CLIENT_ID: "80683f52b00343eabd986f4294a4f47f",
  // Client Secret - CHÚ Ý: Trong production không nên để Client Secret ở frontend
  // Đây chỉ là demo, trong thực tế nên sử dụng backend để xử lý
  CLIENT_SECRET: "9180e92dd2f54f46bfe920bc5110c9f0",

  // Redirect URI - Tự động detect URL hiện tại
  get REDIRECT_URI() {
    return getCurrentURL();
  },
};

console.log(`
🎵 SPORTIFY WEB PLAYER
📝 Cấu hình:
- Client ID: ${SPOTIFY_CONFIG.CLIENT_ID ? "✅" : "❌"}
- Client Secret: ${SPOTIFY_CONFIG.CLIENT_SECRET ? "✅" : "❌"}
- Redirect URI: ${SPOTIFY_CONFIG.REDIRECT_URI}

`);
