const TMDB_KEY = "8d191d1ca09c949e7d17584104978004"; // THAY BẰNG API KEY TMDB

const TMDB_POPULAR_API =
  `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_KEY}&language=vi-VN&page=1`;

const TMDB_SEARCH_API =
  `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_KEY}&language=vi-VN&query=`;

const TMDB_IMAGE = "https://image.tmdb.org/t/p/w500";

window.onload = loadFilms;

async function loadFilms() {
    try {
        document.getElementById('movieList').innerHTML = "Đang tải phim...";

        const res = await fetch(TMDB_POPULAR_API);

        if (!res.ok) {
            throw new Error("Lỗi API: " + res.status);
        }

        const data = await res.json();
        renderFilms(data.results);

    } catch (err) {
        document.getElementById('movieList').innerHTML =
            "Không tải được phim.";
        console.error(err);
    }
}

async function timKiemPhim() {
    let key = document.getElementById('searchInput').value.trim();

    if (!key) return alert("Nhập tên phim!");

    document.getElementById('movieList').innerHTML = "Đang tìm kiếm...";

    try {
        const res = await fetch(TMDB_SEARCH_API + encodeURIComponent(key));

        if (!res.ok) throw new Error("Lỗi API");

        const data = await res.json();

        if (data.results.length === 0) {
            document.getElementById('movieList').innerHTML = "Không tìm thấy phim.";
            return;
        }

        renderFilms(data.results);

    } catch (err) {
        document.getElementById('movieList').innerHTML =
            "Lỗi khi tìm kiếm. Kiểm tra API key.";
        console.error(err);
    }
}

function renderFilms(films) {
    const html = films.map(m => `
        <div class="movie-card">
            <img src="${TMDB_IMAGE + m.poster_path}" />
            <h3>${m.title}</h3>
            <p><strong>Năm:</strong> ${m.release_date?.slice(0,4)}</p>
            <p><strong>Điểm:</strong> ${m.vote_average}</p>
            <p>${m.overview}</p>
        </div>
    `).join("");

    document.getElementById("movieList").innerHTML = html;
}
