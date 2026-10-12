# NHẬT KÝ CÔNG VIỆC — WORK LOG
Dự án: **Living World Lab**

---

## BATCH 1: BASELINE BOOTSTRAP (12/10/2026)
- Đánh giá 5+ ứng viên mã nguồn mở, loại bỏ `EvoWorld` (không có license) và các ứng viên 3D/Python.
- Chọn `simongonzalezdc/EvoLab` (MIT License).
- Khởi tạo repository tại `D:\Personal_Projects\Living-World-Lab`, branch `batch-1-bootstrap`.
- Xác minh baseline ban đầu: 60/60 tests passed, build hoàn thành 1.31s.

---

## BATCH 2: SIMULATION CORE & 3-MODE INTERACTION (12/10/2026)

### 1. Mục tiêu Batch 2
- Triển khai trọn vẹn 3 chế độ tương tác: **God Mode**, **Research Mode**, **Player Mode**.
- Bổ sung vật cản môi trường (`Obstacle`) và cơ chế phản xạ va chạm.
- Tích hợp bộ sinh số ngẫu nhiên có seed (`SeededRandom` - Mulberry32) phục vụ tính tất định.
- Tích hợp động cơ kịch bản (`PresetScenarios`) và biểu đồ dòng thời gian thực (`ResearchChart`).
- Xử lý triệt để lỗi phân mảnh phiên bản React 19 giữa `react` và `react-dom`.
- Đo kiểm hiệu năng runtime và kiểm thử tự động toàn diện.

### 2. Các Bước Kỹ Thuật Đã Triển Khai

#### A. Simulation Core & Physics
- **Vật cản Rạn đá (`src/entities/Obstacle.ts`):** Tạo lớp đại diện cho các chướng ngại vật cố định trong hồ với logic kiểm tra giao cắt hình tròn `checkCollision()`.
- **Tích hợp Vật cản vào `EntityManager`:** Thêm phương thức quản lý `addObstacle`, `removeObstacle`, `clearObstacles` và thuật toán đẩy tế bào + phản xạ vận tốc có giảm chấn mỗi tick cập nhật.
- **Tính tất định (`src/utils/SeededRandom.ts`):** Xây dựng bộ sinh số ngẫu nhiên Mulberry32 với hàm băm FNV-1a.
- **Hệ thống Kịch bản (`src/scenarios/PresetScenarios.ts`):** Cung cấp 3 kịch bản khởi đầu chuyên biệt:
  1. *Thriving Garden* (Cân bằng sinh thái, dồi dào tài nguyên, seed #1337).
  2. *Resource Scarcity Crisis* (Hạn hán khắc nghiệt, áp lực đào thải cao, seed #2026).
  3. *Apex Predator Outbreak* (Mật độ thú ăn thịt cao, biến thiên quần thể mạnh, seed #9999).
- **TimeControl Step:** Tận dụng `timeControl.step()` để người dùng có thể nhích từng tick khi đang tạm dừng.

#### B. God Mode (Can thiệp & Kiến tạo)
- **God Tools Palette (`src/ui/components/GodToolsPanel.tsx`):**
  - Công cụ: `Inspect`, `+Herbivore`, `+Carnivore`, `+Omnivore`, `+Food`, `+Rock Barrier`, `Erase`.
  - Tác vụ toàn cục: Thêm +50 thức ăn, dọn sạch rạn đá, bước 1 tick.
- **Tương tác Canvas:** Bắt sự kiện `pointerdown` trên canvas, chuyển đổi sang tọa độ thế giới mô phỏng và thực thi công cụ tương ứng kèm hiệu ứng hạt và thông báo nổi (Toast).

#### C. Research Mode (Nghiên cứu & Dữ liệu Thật)
- **Biểu đồ Thời gian thực (`src/ui/components/ResearchChart.tsx`):** Vẽ biểu đồ Canvas 2D mượt mà ghi nhận chính xác dữ liệu quần thể (Herbivore, Carnivore, Omnivore, Total) và tài nguyên thức ăn được lấy mẫu thật từ `EntityManager` mỗi giây.
- **Bộ chuyển đổi Kịch bản:** Cho phép chuyển đổi giữa các kịch bản mẫu, tự động nạp lại seed, cơ cấu lại quần thể và rạn đá.

#### D. Player Mode Tối Giản (Quan sát & Trải nghiệm)
- **Bảng Tra cứu Sinh vật (`src/ui/components/PlayerInspectorPanel.tsx`):**
  - Hiển thị đầy đủ định danh, chủng loài, thanh năng lượng ATP, thanh sức khỏe, tuổi thọ và các chỉ số di truyền (tốc độ, tầm nhìn, kích thước).
  - Tương tác can thiệp: Nút `[⚡ Feed (+50 ATP)]` và `[🍎 Drop Food]`.
- **Camera Tracking:** Camera tự động bám theo cá thể được chọn khi bơi lội. Vòng tròn hào quang phát sáng đánh dấu tiêu điểm.
- **Hủy chọn An toàn (Safe Deselect):** Khi sinh vật chết hoặc bị xóa, hệ thống tự động gỡ tiêu điểm, thông báo cho người dùng và tránh lỗi tham chiếu rác.

#### E. Thanh Điều Hướng Đỉnh (`src/ui/components/ModeSelectorBar.tsx`)
- Thanh menu phong cách glassmorphism hiện đại tại đỉnh màn hình, cho phép chuyển đổi 1-click giữa 3 chế độ, hiển thị seed hiện hành và số lượng thực thể sống.

#### F. Sửa Lỗi Hệ Thống React 19 Mismatch
- Phát hiện lỗi ngầm `React Error #527` do lệch phiên bản giữa `react@19.2.7` và `react-dom@19.2.0`.
- Đã đồng bộ chuẩn xác cả hai về `19.2.7`, triệt tiêu hoàn toàn lỗi màn hình trắng.

### 3. Bằng chứng Đo kiểm & Benchmark Thực tế

1. **Kiểm thử Đơn vị Tự động (Unit Tests):**
   ```text
   > vitest run
   Test Files: 16 passed (16)
   Tests:      74 passed (74) — 100% PASS
   Duration:   2.71s
   ```
   - Đã bổ sung 14 bài test mới cho `SeededRandom`, `Obstacle`, `Determinism` và `PresetScenarios`.
   - Bài test tính tất định chứng minh 1,000 simulation ticks chạy lại với cùng seed sinh ra đúng 3,000 giá trị trace đồng nhất 100%.

2. **Xây dựng Bản phát hành (Production Build):**
   ```text
   > tsc && vite build
   ✓ 2333 modules transformed.
   ✓ built in 529ms - 1.03s (0 TypeScript errors)
   ```

3. **Kiểm thử Runtime & Đo Hiệu Năng Thực tế:**
   - Đã khởi chạy máy chủ preview tại `http://localhost:4173/` và kiểm tra tương tác toàn diện qua subagent trình duyệt (ghi hình phiên test: `batch2_verified_audit_1791805146758.webp`).
   - **Độ phân giải hiển thị:** Viewport tiêu chuẩn `1280x800` / Fullscreen `1920x1080`.
   - **Số lượng thực thể đo kiểm:** ~230 thực thể đồng thời (32 tế bào sống + 200 hạt glucose + 4 chướng ngại vật).
   - **Tốc độ khung hình (Frame Rate):** Ổn định tại **58.5 – 60.0 FPS** (thời gian xử lý khung hình trung bình ~16.5ms).

---

## 4. Danh mục Commit & Trạng thái Git
- Branch hiện tại: `batch-2-simulation-core`.
- Toàn bộ tính năng Batch 2 đã hoàn thành, kiểm tra an toàn và sẵn sàng commit.

---

## BATCH 3: QUALITY GATE, UX POLISH & PORTFOLIO RELEASE (12/10/2026)

### 1. Mục tiêu Batch 3
- Thực hiện kiểm thử toàn diện (Quality Gate): test tự động, type-check, lint, production build.
- UX Polish: Tích hợp bảng hướng dẫn nhanh (`QuickGuideModal`), phím tắt, chú thích màu loài và xuất dữ liệu nghiên cứu CSV (`[📥 Export CSV]`).
- Kiểm tra độ bền bỉ runtime: Xử lý tuyệt chủng, cạn kiệt thức ăn, bùng nổ dân số, hủy chọn an toàn.
- Hoàn thiện bộ tài liệu bàn giao danh mục sản phẩm (Portfolio Release).

### 2. Các Bước Kỹ Thuật Đã Triển Khai
- **Bảng Hướng Dẫn Tích Hợp (`src/ui/components/QuickGuideModal.tsx`):**
  - Cung cấp tóm tắt trực quan 3 chế độ: God, Research, Player.
  - Hướng dẫn bảng màu nhận diện sinh vật (Herbivore, Carnivore, Omnivore, Glucose, Rock).
  - Bảng phím tắt bàn phím tiện ích (Space, WASD, +/- Zoom, Reset Zoom, Phím nhạc).
- **Kích Hoạt Hướng Dẫn từ Menu (`ModeSelectorBar.tsx` & `UIController.tsx`):**
  - Thêm nút `[❓ Guide]` phong cách glassmorphism hiện đại tại thanh điều hướng đỉnh.
  - Quản lý đóng mở modal an toàn, chặn click xuyên qua màn hình mô phỏng.
- **Xuất Dữ Liệu Nghiên Cứu CSV (`src/ui/components/ResearchChart.tsx`):**
  - Bổ sung nút `[📥 Export CSV]` cho phép tải về toàn bộ chuỗi mẫu số liệu thời gian thực (Time, Herbivores, Carnivores, Omnivores, Total, Food, AvgATP).
- **Rà soát Giới hạn Bộ nhớ & Rò rỉ Dữ liệu:**
  - Xác nhận `metricSamples` được giới hạn cố định tối đa 60 mẫu trượt.
  - Xác nhận `Config.MAX_POPULATION` ngăn chặn hiện tượng sinh sản vô hạn làm tràn bộ nhớ.
  - Đảm bảo cơ chế hủy chọn an toàn khi sinh vật qua đời hoặc bị xóa.

### 3. Bằng chứng Đo kiểm Chất lượng Kỹ thuật

1. **Bộ Kiểm thử Tự động (Unit Tests):**
   ```text
   > vitest run
   Test Files: 16 passed (16)
   Tests:      74 passed (74) — 100% PASS
   Duration:   4.18s
   ```

2. **Kiểm tra Kiểu dữ liệu TypeScript (Type-Check):**
   ```text
   > tsc --noEmit
   Exit Code: 0 (0 errors)
   ```

3. **Kiểm tra Lint (ESLint):**
   ```text
   > eslint . --ext ts,tsx
   0 errors, 28 warnings (tất cả cảnh báo đều thuộc mã nguồn upstream chưa dùng tham số).
   ```

4. **Đóng gói Sản phẩm Phát hành (Production Build):**
   ```text
   > tsc && vite build
   ✓ 2334 modules transformed.
   dist/index.html                           10.23 kB
   dist/assets/index-Doi12Keo.js            355.54 kB
   dist/assets/vendor-graphics-CDqUFMYs.js  558.38 kB
   ✓ built in 1.44s
   ```

5. **Hiệu năng Khung hình Thực nghiệm:**
   - Ổn định tại **58.5 – 60.0 FPS** trên máy thông dụng.
   - Thời gian render khung hình trung bình: ~16.5ms.

---

## 4. Danh mục Commit & Hoàn tất Scope
- Đóng toàn bộ phạm vi MVP Living World Lab.
- Đạt 100% tiêu chí Definition of Done (DoD).
