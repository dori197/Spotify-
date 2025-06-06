let token;
document.addEventListener("DOMContentLoaded", function () {
  initialApp();
});

async function initialApp() {
  token = await getSpotifyToken();
  if (token) {
    const response = await getPopularTrack();
    displayTrack(response.tracks.items);
  }
}

async function displayTrack(data) {
  console.log(data);
  data.forEach((item) => {
    // tạo biến thay thếthế
    const imageUrl = item.album.images[0].url;
    const name = item.name;
    const artistName = item.artists.map(item => item.name).join(" - ");
    // tạo ra thẻ div
    const element = document.createElement("div");
    // gắn class cho thẻ div
    element.className = "track-card";
    // gắn nội dung cho thẻ div
    element.innerHTML = 
    `<div class="track-card-container">
      <img src="${imageUrl}">
      <h3>${name}</h3>
      <p>${artistName}</p>
    </div>`;
    // gắn thẻ div đó vào track-sectionsection
    const trackSection = document.getElementById("track-section");
    trackSection.appendChild(element);
  });
}

async function getPopularTrack() {
  try {
    const response = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        q: "Bruno Mars",
        type: "track",
        market: "VN",
        limit: 30,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
}

async function getSpotifyToken() {
  try {
    const credentials = btoa(
      `${SPOTIFY_CONFIG.CLIENT_ID}:${SPOTIFY_CONFIG.CLIENT_SECRET}`
    );
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      "grant_type=client_credentials",
      {
        headers: {
          Authorization: `Basic ${credentials}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return response.data.access_token;
  } catch (error) {
    console.error("Error getting token:", error);
    return null;
  }
}
