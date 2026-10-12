# 🧬 LIVING WORLD LAB

**Living World Lab** là một ứng dụng web mô phỏng thế giới sống nhân tạo (Artificial Life Sandbox & Laboratory), kết hợp giữa nghiên cứu sinh thái học và trải nghiệm tương tác trực quan 2D thời gian thực ngay trong trình duyệt.

> **Ghi nhận Nguồn gốc & Bản quyền (Attribution & Provenance):**  
> Dự án được phát triển và nâng cấp dựa trên mã nguồn mở **[EvoLab](https://github.com/simongonzalezdc/EvoLab)** của tác giả Simon Gonzalez và các cộng tác viên, phát hành theo giấy phép **MIT License**. Toàn bộ các quyền sở hữu ban đầu và điều khoản bản quyền MIT được tôn trọng và giữ nguyên vẹn trong tệp [LICENSE](LICENSE).

---

## 🎯 Ba Chế độ Trải nghiệm Cốt lõi (Unified Simulation State)

Living World Lab tích hợp 3 góc nhìn tương tác trên cùng một hệ thống mô phỏng sống động thông qua thanh điều hướng đỉnh **ModeSelectorBar**:

### 1. 🛠️ God Mode (Chế độ Kiến tạo & Can thiệp)
- **Thanh công cụ cọ vẽ (God Tools Palette):** Nhấp chuột trực tiếp lên hồ vi sinh Canvas để tạo hoặc xóa thực thể:
  - `+Herbivore`: Thả sinh vật ăn cỏ tốc độ cao.
  - `+Carnivore`: Thả thú săn mồi hung dữ.
  - `+Omnivore`: Thả sinh vật ăn tạp có khả năng thích nghi cao.
  - `+Food`: Thả cụm hạt năng lượng glucose.
  - `+Rock`: Đặt rạn đá chướng ngại vật cố định với cơ chế nảy va chạm.
  - `Erase`: Xóa bỏ tức thì bất kỳ sinh vật hoặc rạn đá nào được click.
- **Tác vụ can thiệp toàn cục:**
  - `[+50 Food]`: Bổ sung thức ăn khẩn cấp cho hệ sinh thái.
  - `[Clear Rocks]`: Dọn sạch toàn bộ rạn đá cản trở.
  - `[⏭️ Step 1 Tick]`: Nhích từng tick mô phỏng khi đang tạm dừng (Pause) để phân tích chi tiết.

### 2. 📊 Research Mode (Chế độ Nghiên cứu & Trực quan hóa Dữ liệu)
- **Biểu đồ Dòng thời gian Thực (Population Timeline):** Biểu đồ Canvas 2D vẽ biến thiên số lượng theo từng loài (Herbivore, Carnivore, Omnivore, Total) và sinh khối thức ăn từ dữ liệu thực tế của mô phỏng (lấy mẫu thời gian thực, không dùng số liệu giả).
- **Xuất Dữ liệu Nghiên cứu (`[📥 Export CSV]`):** Xuất toàn bộ chuỗi mẫu số liệu thời gian thực (Time, Herbivores, Carnivores, Omnivores, Total, Food, AvgATP) ra tệp `.csv` để nghiên cứu sâu trong Excel/Python/R.
- **Động cơ Kịch bản (Preset Scenarios):** 3 kịch bản sinh thái khởi đầu có seed xác định:
  1. *Thriving Garden* (#1337) — Cân bằng sinh thái dồi dào, điều kiện sống lý tưởng.
  2. *Resource Scarcity Crisis* (#2026) — Hạn hán, cạn kiệt thức ăn, áp lực đào thải sinh tồn cực mạnh.
  3. *Apex Predator Outbreak* (#9999) — Mật độ thú săn mồi cao, dao động quần thể kịch tính.
- **Tính tất định (Mulberry32 PRNG):** Sử dụng bộ sinh số ngẫu nhiên có seed độc lập, kiểm chứng 1,000 simulation ticks trace đồng nhất 100%.

### 3. 🔬 Player Mode (Chế độ Trải nghiệm Sinh vật)
- **Chọn & Khóa Tiêu điểm (Focus Tracking):** Click chuột vào bất kỳ sinh vật nào trong hồ để camera tự động bám theo (Auto-tracking), kèm vòng hào quang phát sáng nhận diện.
- **Bảng Tra cứu Sinh học (Inspector Card):** Hiển thị trực tiếp năng lượng ATP, thanh sức khỏe, tuổi thọ, tốc độ, tầm nhìn, kích thước và mức trao đổi chất.
- **Tương tác Cứu trợ Trực tiếp:**
  - `[⚡ Feed (+50 ATP)]`: Tiếp tế năng lượng tức thời cho sinh vật được theo dõi.
  - `[🍎 Drop Food]`: Thả cụm glucose ngay trước hướng bơi của sinh vật.
- **Hủy chọn An toàn (Safe Deselect):** Khi sinh vật theo dõi qua đời hoặc bị xóa, hệ thống tự động giải phóng tiêu điểm an toàn, hiển thị thông báo toast và không gây lỗi bộ nhớ.

---

## 📖 Hướng Dẫn Nhanh & Phím Tắt (User Guide & Hotkeys)

Nhấp vào nút **`[❓ Guide]`** trên thanh điều hướng đỉnh để mở bảng hướng dẫn nhanh tích hợp:

| Phím tắt | Chức năng |
| :--- | :--- |
| **Space** | Tạm dừng (Pause) / Tiếp tục (Resume) mô phỏng |
| **W, A, S, D** | Điều khiển di chuyển trực tiếp tế bào người chơi (khi bật chế độ Player Cell) |
| **+ / -** | Phóng to (Zoom In) / Thu nhỏ (Zoom Out) tầm nhìn thế giới |
| **0** | Đưa độ phóng đại camera về mức chuẩn ban đầu (Reset Zoom) |
| **1, 2, 3, 4, 5** | Chuyển đổi nhạc nền môi trường tương ứng với các sinh thái |
| **Shift + ?** | Bật/tắt bảng danh sách toàn bộ phím tắt bàn phím |

---

## 🛠️ Công Nghệ Sử Dụng & Kết Quả Kiểm Thử (Tech Stack & Quality Gate)

- **Frontend Core:** TypeScript, React 19.2.7 (đồng bộ `react` và `react-dom`), Vite 8
- **Đồ họa 2D & Vật lý:** PixiJS 8.5 (Canvas 2D), Matter.js (Physics 2D) + Custom Obstacle Collision Resolver
- **Trực quan hóa Dữ liệu:** Canvas 2D Real-time Sparkline + D3.js (Phylogenetic Tree)
- **Âm thanh & Lưu trữ:** Web Audio API + Dexie (IndexedDB)
- **Kiểm thử tự động (Unit Tests):** Vitest — **74/74 tests passed (100%)** trong 4.18s
- **Kiểm tra kiểu dữ liệu (Type-Check):** TypeScript (`tsc --noEmit`) — **0 errors**
- **Kiểm tra chất lượng mã (Linting):** ESLint — **0 errors**
- **Đóng gói phát hành (Production Build):** `tsc && vite build` — Hoàn thành sạch sẽ trong **1.44s**
- **Hiệu năng Thực tế (Benchmark):** Duy trì ổn định **58.5 – 60.0 FPS** trên máy phổ thông với ~230 thực thể đồng thời (32 tế bào sống + 200 thức ăn + rạn đá).

---

## 🚀 Hướng Dẫn Cài Đặt & Khởi Chạy

### Yêu cầu Môi trường
- **Node.js:** Phiên bản 18.0.0 trở lên (khuyến nghị Node 20+)
- **Trình quản lý gói:** npm hoặc pnpm
- **Trình duyệt:** Bất kỳ trình duyệt hiện đại nào hỗ trợ HTML5 Canvas (Chrome, Edge, Firefox, Safari)

### Các lệnh thực thi
```bash
# 1. Cài đặt các gói phụ thuộc
npm install

# 2. Chạy toàn bộ 74 bài kiểm thử tự động
npm test -- --run

# 3. Kiểm tra kiểu dữ liệu TypeScript
npm run type-check

# 4. Kiểm tra lint mã nguồn
npm run lint

# 5. Khởi chạy máy chủ phát triển (Dev Server)
npm run dev
# Truy cập tại: http://localhost:5173/

# 6. Đóng gói sản phẩm phát hành và chạy bản dựng preview
npm run build
npm run preview
# Truy cập tại: http://localhost:4173/
```

---

## ⚠️ Giới Hạn Hiện Tại & Những Tính Năng Cố Ý Chưa Triển Khai (Known Limitations & Scope Boundaries)

Để đảm bảo MVP gọn gàng, hoạt động ổn định và giữ vững hiệu năng 60 FPS trong đợt bàn giao này:

1. **Không sử dụng Mạng Nơ-ron Sâu (No Deep Neural Networks / Heavy AI):** Hệ thống hành vi AI của sinh vật sử dụng FSM (Finite State Machine) và tìm đường cục bộ tối ưu hóa năng lượng, không nhúng TensorFlow/PyTorch nặng nề vào trình duyệt.
2. **Không dựng hình 3D / WebGL (2D Canvas First):** Giữ phong cách hiển thị Canvas 2D vi sinh học để đảm bảo chạy mượt trên mọi cấu hình thiết bị mà không đòi hỏi GPU rời.
3. **Không tích hợp Backend / Cloud / Multiplayer:** Toàn bộ trạng thái thế giới hoạt động theo triết lý Local-First, lưu trữ kịch bản vào IndexedDB nội bộ máy người dùng.
4. **Không phát triển cơ chế RPG / Combat / Nhiệm vụ phức tạp:** Tập trung vào mô phỏng sinh thái học tự nhiên, quy luật chọn lọc và cạnh tranh tài nguyên thay vì yếu tố cày cuốc hay kho đồ game RPG.
5. **Giới hạn số lượng cá thể (Population Cap):** Cấu hình `MAX_POPULATION` được giới hạn để tránh hiện tượng bùng nổ dân số vô hạn làm cạn kiệt tài nguyên bộ nhớ trình duyệt.

---

## 📂 Danh Mục Tài Liệu Kỹ Thuật

- [PROJECT_BRIEF.md](PROJECT_BRIEF.md): Mục tiêu sản phẩm, phạm vi 3 chế độ và ranh giới phát triển.
- [OPEN_SOURCE_EVALUATION.md](OPEN_SOURCE_EVALUATION.md): Báo cáo đánh giá chi tiết 5+ ứng viên mã nguồn mở và kết quả thẩm định bản quyền.
- [ARCHITECTURE.md](ARCHITECTURE.md): Sơ đồ kiến trúc hệ thống, luồng tương tác canvas và mô hình xử lý va chạm.
- [WORK_LOG.md](WORK_LOG.md): Nhật ký chi tiết tiến độ Batch 1, Batch 2 và Batch 3, bằng chứng kiểm thử và thông số benchmark.
