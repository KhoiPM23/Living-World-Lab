# PROJECT BRIEF — LIVING WORLD LAB

## 1. Tổng quan Dự án
- **Tên dự án:** Living World Lab
- **Mục tiêu:** Xây dựng một ứng dụng web mô phỏng thế giới sống nhân tạo (Artificial Life Sandbox), phục vụ nghiên cứu mô phỏng hệ sinh thái và tương tác trực quan trong trình duyệt.
- **Tiêu chuẩn vận hành:** Local-first, chi phí thấp, 100% chạy trên trình duyệt web, không phụ thuộc backend, không bắt buộc GPU rời hay API cloud/AI bên ngoài.
- **Thời gian thực hiện MVP:** 7 ngày phát triển tập trung (Batch 1: Đánh giá mã nguồn mở & Thiết lập baseline).

---

## 2. Ba Chế độ Tương tác (Cùng chung 1 Simulation Engine)

1. **God Mode (Chế độ Kiến tạo / Can thiệp):**
   - Thêm/xóa/can thiệp trực tiếp vào các thực thể (tế bào/sinh vật, tài nguyên, chướng ngại vật).
   - Tinh chỉnh tham số toàn cục: tốc độ thời gian (0.5x, 1x, 2x, 5x, pause), nhiệt độ, độc tính, mật độ tài nguyên môi trường.
   - Thiết lập và tùy biến cấu hình quần thể cạnh tranh ban đầu (Herbivore, Carnivore, Omnivore).

2. **Research Mode (Chế độ Nghiên cứu / Quan sát Khoa học):**
   - Theo dõi chỉ số hệ sinh thái thời gian thực: số lượng cá thể theo loài, tỉ lệ sống sót, năng lượng ATP trung bình, mức tích lũy DNA.
   - Trực quan hóa tiến hóa bằng dữ liệu: Cây phả hệ tiến hóa (Phylogenetic Tree D3), Báo cáo đột biến từng thế hệ (Generation Reports).
   - Phân tích tương thích sinh thái giữa 12 vùng sinh cảnh (Biomes) và khả năng thích nghi của bộ gen (55+ Traits).
   - Lưu trữ và phục hồi dữ liệu mô phỏng cục bộ qua IndexedDB (Save/Load system).

3. **Player Mode (Chế độ Trải nghiệm Sinh vật):**
   - Chọn một cá thể bất kỳ để theo dõi chuyên sâu: camera bám sát (Tracking Camera), hiển thị vòng hào quang tiêu điểm.
   - Điều khiển di chuyển trực tiếp (WASD physics) hoặc chuyển đổi sang chế độ AI tự hành (AutoPilot).
   - Quản lý sinh tồn cá thể: nạp năng lượng ATP từ glucose, né tránh kẻ săn mồi, thu thập hợp chất để sinh sản và tiến hóa qua bộ chỉnh sửa gen (Trait Editor).

---

## 3. Phong cách & Giới hạn Dự án

- **Phong cách thị giác:** Thế giới 2D trực quan sinh động (PixiJS Canvas), vi mô sinh học kết hợp bảng điều khiển và biểu đồ phong cách phòng lab khoa học (Dark Sci-Fi / Lab Minimalist).
- **Giới hạn phạm vi (Scope Boundaries):**
  - Không biến thành game RPG, không cơ chế chiến đấu theo lượt, không quản lý kho đồ phức tạp.
  - Không xây dựng mạng nơ-ron sâu (Deep Neural Networks) hay mô hình AI phức tạp làm nặng trình duyệt khi chưa có bằng chứng cần thiết.
  - Không yêu cầu cơ sở dữ liệu từ xa, tài khoản đăng nhập, mạng multiplayer hay WebGL 3D.
  - Mọi tính năng phải có khả năng kiểm thử tự động (Unit Test / Vitest) và đo kiểm hiệu năng runtime (60 FPS baseline).

---

## 4. Kế hoạch Lộ trình (Vertical Slice)
- **Batch 1 (Hoàn thành):** Đánh giá 5+ mã nguồn mở, thẩm định bản quyền, lựa chọn nền tảng EvoLab, clone/bootstrap repository, xác minh test suite (60/60 pass) và build sạch (1.31s).
- **Batch 2:** Tinh chỉnh UI/HUD để thống nhất 3 chế độ tương tác (God / Research / Player Mode switcher), tối ưu luồng can thiệp God-mode và tinh giản các tính năng dư thừa.
- **Batch 3:** Bổ sung kịch bản thử nghiệm mẫu (Scenarios), cải tiến đồ thị phân tích Research Mode, hoàn thiện tài liệu hướng dẫn và portfolio.
