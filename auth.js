// Hàm hiển thị thông báo
function hienThiThongBao(noiDung) {
    let thongBao = document.getElementById('thongbao');
    thongBao.innerHTML = noiDung;
}

// ======================= ĐĂNG KÝ =======================
function dangKy() { 
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    let confirmPassword = document.getElementById('confirm-password').value;
    
    if (!username || !password || !confirmPassword) {
        hienThiThongBao('Vui lòng điền đầy đủ thông tin!');
        return;
    } 
    
    if (password !== confirmPassword) {
        hienThiThongBao('Mật khẩu không khớp!');
        return;
    }

    // Lấy user từ localStorage
    let users = JSON.parse(localStorage.getItem('users') || '[]');

    // Kiểm tra trùng tên
    if (users.some(u => u.username === username)) {
        hienThiThongBao('Tên đăng nhập đã tồn tại!');
        return;
    }

    // Thêm user mới (mặc định role = user)
    users.push({ username, password, role: "user" });

    // Lưu vào localStorage
    localStorage.setItem('users', JSON.stringify(users));
    
    hienThiThongBao('Đăng ký thành công! Hãy chuyển sang trang đăng nhập.');
}



// ======================= DANH SÁCH TÀI KHOẢN HỆ THỐNG =======================
const defaultUsers = [
    { username: 'admin', password: 'admin123', role: 'admin' },
    { username: 'user1', password: 'user123', role: 'user' }
];


// ======================= ĐĂNG NHẬP =======================
function dangNhap() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const thongbao = document.getElementById('thongbao');

    // Lấy tài khoản người dùng đăng ký
    let storedUsers = JSON.parse(localStorage.getItem('users') || '[]');

    // Gộp tài khoản hệ thống + tài khoản đăng ký
    let allUsers = [...defaultUsers, ...storedUsers];

    // Tìm tài khoản hợp lệ
    const user = allUsers.find(u => u.username === username && u.password === password);

    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));

        thongbao.style.color = 'green';
        thongbao.textContent = 'Đăng nhập thành công!';

        // Chuyển trang theo role
        if (user.role === 'admin') {
            window.location.href = "admin.html";
        } else {
            window.location.href = "index.html";
        }

    } else {
        thongbao.style.color = 'red';
        thongbao.textContent = 'Tên đăng nhập hoặc mật khẩu không đúng!';
    }
}
