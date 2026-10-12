# 🧬 LIVING WORLD LAB

**Living World Lab** là một ứng dụng web mô phỏng thế giới sống nhân tạo (Artificial Life Sandbox), kết hợp giữa nghiên cứu khoa học hệ sinh thái và trải nghiệm tương tác trực quan 2D ngay trong trình duyệt.

> **Ghi nhận Nguồn gốc & Bản quyền (Attribution & Provenance):**  
> Dự án được phát triển và nâng cấp dựa trên mã nguồn mở **[EvoLab](https://github.com/simongonzalezdc/EvoLab)** của tác giả Simon Gonzalez và các cộng tác viên, phát hành theo giấy phép **MIT License**. Toàn bộ các quyền sở hữu ban đầu và điều khoản bản quyền MIT được giữ nguyên vẹn trong tệp [LICENSE](LICENSE).

---

## 🎯 Ba Chế độ Trải nghiệm Cốt lõi

Living World Lab tích hợp 3 cách tiếp cận trên cùng một thế giới mô phỏng thống nhất:

1. **God Mode (Chế độ Kiến tạo):**
   - Can thiệp vào thế giới: thêm sinh vật, thả nguồn thức ăn glucose, điều chỉnh điều kiện môi trường.
   - Kiểm soát thời gian mô phỏng: Tạm dừng, 0.5x, 1x, 2x, 5x.
   - Chỉnh sửa và can thiệp bộ gen (hơn 55+ tính trạng phân chia thành 7 nhóm tính chất sinh học).

2. **Research Mode (Chế độ Nghiên cứu):**
   - Theo dõi biểu đồ số lượng quần thể thời gian thực giữa các loài cạnh tranh (Herbivore, Carnivore, Omnivore).
   - Khám phá Cây phả hệ tiến hóa (Phylogenetic Tree) xây dựng trên D3.js.
   - Đọc báo cáo đột biến và phân hóa thế hệ (Generation Mutation Reports).
   - Quản lý và lưu trữ dữ liệu mô phỏng cục bộ với IndexedDB (Dexie).

3. **Player Mode (Chế độ Trải nghiệm Sinh vật):**
   - Chọn và theo dõi một cá thể bất kỳ với Camera tracking mượt mà.
   - Trực tiếp điều khiển chuyển động bằng phím WASD hoặc bật chế độ tự hành AutoPilot.
   - Quản lý sinh tồn: thu nạp năng lượng ATP, né tránh kẻ săn mồi, thu thập hợp chất để sinh sản.

---

## 🛠️ Công nghệ Sử dụng

- **Ngôn ngữ & Nền tảng:** TypeScript, React 19, Vite
- **Đồ họa 2D & Vật lý:** PixiJS 8.5 (Canvas 2D), Matter.js (Physics)
- **Trực quan hóa Dữ liệu:** D3.js (Cây tiến hóa & Biểu đồ)
- **Âm thanh & Lưu trữ:** Tone.js, Dexie (IndexedDB)
- **Kiểm thử tự động:** Vitest (60 tests passed)

---

## 🚀 Hướng dẫn Cài đặt & Chạy Thực tế

### 1. Yêu cầu Môi trường
- Node.js >= 18.x (Đã kiểm chứng trên Node v22.16.0)
- npm >= 9.x (Đã kiểm chứng trên npm 10.9.2)

### 2. Cài đặt Dependencies
`ash
npm install
`

### 3. Chạy Kiểm thử Tự động (Unit Tests)
`ash
npm test -- --run
`
*Kết quả kiểm chứng: 12 test files, 60/60 tests PASSED.*

### 4. Khởi chạy Môi trường Phát triển (Development Server)
`ash
npm run dev
`
Truy cập ứng dụng tại http://localhost:5173/.

### 5. Xây dựng Bản phát hành (Production Build)
`ash
npm run build
npm run preview
`

---

## 📂 Tài liệu Dự án

- [PROJECT_BRIEF.md](PROJECT_BRIEF.md): Mục tiêu sản phẩm, phạm vi 3 chế độ và giới hạn phát triển.
- [OPEN_SOURCE_EVALUATION.md](OPEN_SOURCE_EVALUATION.md): Báo cáo đánh giá chi tiết 5+ ứng viên mã nguồn mở và kết quả audit.
- [ARCHITECTURE.md](ARCHITECTURE.md): Sơ đồ kiến trúc hệ thống và các điểm mở rộng kỹ thuật.
- [WORK_LOG.md](WORK_LOG.md): Nhật ký các lệnh đã thực thi, bằng chứng runtime và các mốc hoàn thành.
