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
        console.log(item.id);
        const imageUrl = item.album.images[0].url;
        const name = item.name;
        const artistName = item.artists.map((item) => item.name).join(" - ");
        // tạo ra thẻ div
        const element = document.createElement("div");
        // gắn class cho thẻ div
        element.className = "track-card";
        // gắn nội dung cho thẻ div
        element.innerHTML = `<div class="track-card-container">
          <img src="${imageUrl}">
          <h3>${name}</h3>
          <p>${truncateText(artistName, 30)}</p>
        </div>`;
        // thêm event listener để phát nhạc
        element.addEventListener("click", () => {
          playTrack(item.id,name,artistName);
        });
        // gắn thẻ div đó vào track-sectionsection
        const trackSection = document.getElementById("track-section");
        trackSection.appendChild(element);
      });
    }

    function playTrack(id,name,artistName) {
      const iframe = document.getElementById("iframe");
      iframe.src = `https://open.spotify.com/embed/track/${id}?utm_source=generator&theme=0`;
      const modals = document.getElementById("modals");
      modals.style.display = "block";
      const modalsName = document.getElementById("modals-name");
      modalsName.innerHTML = name;
    }

    function handleClose() {
      const modals = document.getElementById("modals");
      modals.style.display = "none";
    }

    function truncateText(text, number) {
      return text.length > number ? text.slice(0,number) + "..." : text;
    }

    async function getPopularTrack() {
      try {
        const response = await axios.get("https://api.spotify.com/v1/search", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            q: "Central Cee",
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
