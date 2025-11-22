# 🎬 MovieHub - Website Xem Phim Online

Một website xem phim đơn giản được xây dựng bằng HTML, CSS và JavaScript thuần túy, sử dụng API của The Movie Database (TMDB).

## ✨ Tính năng

- 🔍 Tìm kiếm phim theo tên
- 📱 Giao diện responsive, đẹp mắt
- 🎭 Hiển thị danh sách phim nổi bật
- 📋 Chi tiết thông tin phim (poster, năm phát hành, đánh giá, thể loại, tóm tắt)
- ⚡ Tải nhanh với API miễn phí
- 🎨 Hiệu ứng hover và animation mượt mà

## 🚀 Cách sử dụng

### Bước 1: Lấy API Key

1. Truy cập [The Movie Database (TMDB)](https://www.themoviedb.org/)
2. Đăng ký tài khoản miễn phí
3. Vào phần **API** trong settings
4. Tạo API key mới
5. Copy API key của bạn

### Bước 2: Cấu hình API

1. Mở file `script.js`
2. Tìm dòng: `const API_KEY = 'YOUR_API_KEY_HERE';`
3. Thay thế `YOUR_API_KEY_HERE` bằng API key thực của bạn

```javascript
const API_KEY = 'abc123def456ghi789'; // Thay bằng API key của bạn
```

### Bước 3: Chạy website

1. Mở file `index.html` trong trình duyệt web
2. Hoặc sử dụng Live Server extension trong VS Code
3. Website sẽ tự động tải danh sách phim nổi bật

## 📁 Cấu trúc dự án

```
MovieHub/
├── index.html          # File HTML chính
├── style.css           # File CSS styling
├── script.js           # File JavaScript logic
└── README.md           # File hướng dẫn này
```

## 🛠️ Công nghệ sử dụng

- **HTML5**: Cấu trúc trang web
- **CSS3**: Styling và responsive design
- **JavaScript ES6+**: Logic xử lý và gọi API
- **TMDB API**: Nguồn dữ liệu phim miễn phí

## 📚 Giải thích code

### HTML Structure
- `header`: Chứa logo và thanh tìm kiếm
- `main`: Nội dung chính với danh sách phim
- `modal`: Popup hiển thị chi tiết phim
- `footer`: Thông tin cuối trang

### CSS Features
- **Grid Layout**: Hiển thị phim dạng lưới responsive
- **Flexbox**: Căn chỉnh các phần tử
- **Gradient Background**: Nền gradient đẹp mắt
- **Hover Effects**: Hiệu ứng khi di chuột
- **Modal Animation**: Animation cho popup

### JavaScript Functions
- `loadFeaturedMovies()`: Tải danh sách phim nổi bật
- `handleSearch()`: Xử lý tìm kiếm phim
- `displayMovies()`: Hiển thị danh sách phim
- `showMovieDetails()`: Hiển thị chi tiết phim
- `createMovieCard()`: Tạo card phim

## 🔧 API Endpoints sử dụng

1. **Phim nổi bật**: `/movie/popular`
2. **Tìm kiếm phim**: `/search/movie`
3. **Chi tiết phim**: `/movie/{movie_id}`
4. **Hình ảnh**: `https://image.tmdb.org/t/p/w500`

## 🎯 Cách hoạt động của API

### 1. Fetch API
```javascript
const response = await fetch(`${API_BASE_URL}/movie/popular?api_key=${API_KEY}`);
const data = await response.json();
```

### 2. Xử lý dữ liệu
```javascript
const movies = data.results.map(movie => ({
    id: movie.id,
    title: movie.title,
    poster: movie.poster_path,
    year: movie.release_date,
    rating: movie.vote_average
}));
```

### 3. Hiển thị UI
```javascript
const moviesHTML = movies.map(movie => createMovieCard(movie)).join('');
container.innerHTML = moviesHTML;
```

## 🚨 Lưu ý quan trọng

- **API Key**: Không chia sẻ API key của bạn công khai
- **Rate Limit**: TMDB giới hạn 1000 requests/ngày cho tài khoản miễn phí
- **CORS**: API này hỗ trợ CORS nên có thể gọi trực tiếp từ browser
- **Error Handling**: Code đã có xử lý lỗi cơ bản

## 🔄 Cải tiến có thể thêm

- [ ] Phân trang cho danh sách phim
- [ ] Lọc phim theo thể loại
- [ ] Sắp xếp theo đánh giá/năm
- [ ] Lưu phim yêu thích vào localStorage
- [ ] Dark/Light mode toggle
- [ ] Thêm trailer YouTube
- [ ] Đánh giá phim của người dùng

## 📞 Hỗ trợ

Nếu gặp vấn đề:
1. Kiểm tra API key có đúng không
2. Kiểm tra kết nối internet
3. Mở Developer Tools (F12) để xem lỗi console
4. Đảm bảo file HTML, CSS, JS ở cùng thư mục

## 📄 License

Dự án này chỉ dành cho mục đích học tập. Vui lòng tuân thủ điều khoản sử dụng của TMDB API.

---

**Chúc bạn học tập vui vẻ! 🎉**
