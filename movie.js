// ========================== API
const TMDB_KEY = "8d191d1ca09c949e7d17584104978004";
const TMDB_IMAGE = "https://image.tmdb.org/t/p/w500";
const TMDB_POPULAR_API = `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_KEY}&language=vi-VN&page=`;
const TMDB_SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_KEY}&language=vi-VN&query=`;

// ========================== Load phim
window.onload = loadFilms;

async function loadFilms() {
    try {
        document.getElementById('movieList').innerHTML = "Đang tải phim...";
        let allMovies = [];
        for (let page=1; page<=3; page++){
            const res = await fetch(TMDB_POPULAR_API + page);
            if(!res.ok) throw new Error(res.status);
            const data = await res.json();
            allMovies = allMovies.concat(data.results);
        }
        renderFilms(allMovies);
    } catch(err){
        console.error(err);
        document.getElementById('movieList').innerHTML = "Không thể tải phim.";
    }
}

// ========================== Tìm kiếm
async function timKiemPhim(){
    let key = document.getElementById('searchInput').value.trim();
    if(!key) return alert("Nhập tên phim!");
    document.getElementById('movieList').innerHTML = "Đang tìm kiếm...";
    try{
        let allMovies=[];
        for(let page=1; page<=3; page++){
            const res = await fetch(`${TMDB_SEARCH_API}${encodeURIComponent(key)}&page=${page}`);
            if(!res.ok) throw new Error(res.status);
            const data = await res.json();
            if(data.results.length===0) break;
            allMovies = allMovies.concat(data.results);
        }
        if(allMovies.length===0) document.getElementById('movieList').innerHTML="Không tìm thấy phim.";
        else renderFilms(allMovies);
    } catch(err){
        console.error(err);
        document.getElementById('movieList').innerHTML="Lỗi khi tìm kiếm.";
    }
}

// ========================== Lọc thể loại
async function locTheoTheLoai(genreId){
    if(!genreId) { loadFilms(); return; }
    document.getElementById('movieList').innerHTML="Đang lọc...";
    try{
        let allMovies=[];
        for(let page=1; page<=3; page++){
            const res = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_KEY}&language=vi-VN&with_genres=${genreId}&page=${page}`);
            if(!res.ok) throw new Error(res.status);
            const data = await res.json();
            allMovies = allMovies.concat(data.results);
        }
        renderFilms(allMovies);
    }catch(err){
        console.error(err);
        document.getElementById('movieList').innerHTML="Không thể lọc theo thể loại.";
    }
}

// ========================== Render phim
function renderFilms(films){
    if(!films || films.length===0){
        document.getElementById('movieList').innerHTML="Không có phim để hiển thị.";
        return;
    }
    const html = films.map(m => `
        <div class="movie-card">
            <img src="${m.poster_path ? TMDB_IMAGE+m.poster_path : 'no_image.jpg'}" alt="${m.title}"/>
            <h3>${m.title}</h3>
            <p><strong>Năm:</strong> ${m.release_date?m.release_date.slice(0,4):"?"}</p>
            <p><strong>Điểm:</strong> ${m.vote_average}</p>
            <p>${m.overview||"Không có mô tả."}</p>
        </div>
    `).join('');
    document.getElementById('movieList').innerHTML = html;
}
