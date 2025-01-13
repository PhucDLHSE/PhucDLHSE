# Mobile Shop

## Mô tả Dự án

Dự án này là hệ thống quản lý cho một trang thương mại điện tử bán các sản phẩm điện tử như điện thoại, laptop, đồng hồ, và phụ kiện,... Hệ thống bao gồm các chức năng quản lý sản phẩm, danh mục, thương hiệu, người dùng, và hiển thị báo cáo doanh thu.

## Tính năng chính

### 1. Chức năng chính của Admin
- **Quản lý sản phẩm**:
  - Tạo, chỉnh sửa, xóa sản phẩm.
  - Hiển thị danh sách sản phẩm.
- **Quản lý danh mục**:
  - Tạo, chỉnh sửa, xóa danh mục.
  - Hiển thị danh sách danh mục.
- **Quản lý thương hiệu**:
  - Tạo, chỉnh sửa, xóa thương hiệu.
  - Hiển thị danh sách thương hiệu.
- **Quản lý người dùng**:
  - Tạo, chỉnh sửa, xóa tài khoản.
  - Hiển thị danh sách tài khoản.
  - Chặn/Mở chặn tài khoản người dùng.
- **Quản lý đơn hàng**:
  - Xem, cập nhật trạng thái đơn hàng.
  - Quản lý danh sách tất cả đơn hàng.  
- **Dashboard**:
  - Hiển thị báo cáo doanh thu từng tháng.
  - Hiển thị biểu đồ loại sản phẩm bán chạy.
- **404 Page**:
  - Trang thông báo "404 Not Found" khi truy cập vào các chức năng không tồn tại.

### 2. Chức năng chính của Người dùng
- **Đăng nhập**:
  - Người dùng nhập email và mật khẩu để đăng nhập.
- **Đăng ký**:
  - Người dùng có thể tạo tài khoản mới với thông tin đầy đủ (Họ tên, số điện thoại, ngày sinh, Email, Mật khẩu).
  - Hiển thị thông báo khi đăng ký thành công hoặc thất bại.
- **Xem sản phẩm**:
  - Xem tất cả sản phẩm đang được bán ở Trang chủ.
  - Xem chi tiết sản phẩm.
- **Thêm vào giỏ hàng**:
  - Thêm sản phẩm vào giỏ hàng và tương tác với giỏ hàng.
- **Tìm kiếm sản phẩm**:
  - Người dùng có thể tìm kiếm sản phẩm muốn mua bằng cách nhập trên thanh tìm kiếm.
- **Đặt hàng**:
  - Kiểm tra lại thông tin đặt hàng.
  - Chọn địa chỉ giao hàng và phương thức thanh toán.
  - Xem hóa đơn sau khi đặt hàng thành công.

## Công nghệ sử dụng
- **Frontend**:
  - HTML, CSS, JavaScript.
  - Thư viện Bootstrap (v5.0) để thiết kế giao diện.
  - Thư viện Font Awesome cho icon.
- **Backend**:
  - Node.js với Express.js để xử lý API.
  - MongoDB làm cơ sở dữ liệu.

## Cài đặt và Chạy dự án

### 1. Yêu cầu hệ thống
- Node.js (v14 trở lên).
- MongoDB (cục bộ hoặc từ dịch vụ đám mây như MongoDB Atlas).
- Postman Agent (https://www.postman.com/downloads)

### 2. Cài đặt dự án
```bash
Cài đặt chung
npm install -g nodemon
npm install -g http-server
```

#### Clone repository
```bash
https://github.com/PhucDLHSE/MobileShop.git
```

#### Cài đặt các thư viện
```bash 
Cài đặt phần Backend
cd BE
npm install

Cài đặt phần Fontend
cd fe
npm install
```

#### Cấu hình file `.env`
Tạo file `.env` trong thư mục BE và thêm các biến môi trường sau:
```env
MONGO_URI=mongodb://localhost:27017/your-database-name
JWT_SECRET=your-secret-key
```

#### Chạy server
```bash
npm run start
```
### 3. Truy cập ứng dụng
- Truy cập Trang chủ: [http://localhost:5000/index.html](http://localhost:5000/index.html)
- Truy cập trang Login: [http://localhost:5000/login.html](http://localhost:5000/login.html)

## Ghi chú
- Để tạo tài khoản Admin, vui lòng truy cập Postman https://www.postman.com/
- Sử dụng API 
```bash
POST: http://localhost:5000/api/auth/register
    Content-Type: application/json
    {
        "fullName": "",
        "phoneNumber": "",
        "dateOfBirth": "yyyy-mm-dd",
        "email": "",
        "password": "",
        "role": "Admin"
    }
```

- Các chức năng mở rộng như Thanh toán VNPay, Momo,... sẽ được cập nhật sau.

## Đóng góp
Nếu bạn muốn đóng góp vào dự án này, vui lòng tạo một pull request hoặc mở một issue mới.

## Giấy phép
Dự án này được phát hành bởi Đặng Lê Hoàng Phúc.
Email: danglehoangphuc2003@gmail.com
