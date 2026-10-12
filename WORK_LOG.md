# NHẬT KÝ CÔNG VIỆC — WORK LOG (BATCH 1)
Dự án: **Living World Lab**  
Thời gian thực hiện: **12/10/2026**

---

## 1. Mục tiêu Batch 1
- Kiểm tra môi trường phát triển cục bộ và quyền hạn GitHub.
- Nghiên cứu, chạy thử và thẩm định bản quyền 5+ ứng viên mã nguồn mở.
- Quyết định nền tảng tối ưu, bootstrap repository tại D:\Personal_Projects\Living-World-Lab.
- Xác minh baseline chạy được (build sạch, test pass 100%, runtime kiểm chứng).
- Thiết lập hệ thống tài liệu chuẩn bị cho Batch 2.

---

## 2. Các Bước Đã Thực Hiện & Lệnh Kiểm Tra

### Bước 1: Kiểm tra Môi trường & Quyền hạn
- **Lệnh thực hiện:**
  `powershell
  node -v; npm -v; git --version; gh --version
  git config --get user.name; git config --get user.email
  `
- **Kết quả:**
  - Node.js: 22.16.0
  - npm: 10.9.2
  - Git: 2.51.0.windows.1
  - GitHub CLI (gh): Chưa cài đặt trong PATH.
  - Git User: KhoiPM23 (phanminhkhoi23@gmail.com).
  - Trạng thái Workspace đích: D:\Personal_Projects\Living-World-Lab ban đầu chưa tồn tại (sạch sẽ, không có nguy cơ ghi đè).

### Bước 2: Nghiên cứu, Audit & Thẩm định Bản quyền Ứng viên
- Đã tải về thư mục scratch và kiểm tra chi tiết:
  1. simongonzalezdc/EvoLab: MIT License (Hợp lệ). Có 12 test files, 60 tests. Stack React 19 + PixiJS 8.5 + Matter.js + D3 + Dexie.
  2. ozone81/EvoWorld: **Không có LICENSE**. Bị loại theo tiêu chí Gatekeeper bản quyền.
  3. lnguyen503/ai-world: MIT License. Tuy nhiên là 3D WebGL Three.js + Kokoro-js (TTS 80MB+), không phù hợp định hướng 2D.
  4. ariszorlu35/Evolvarium: MIT License. Phụ thuộc Python backend/numpy.
  5. Chakazul/Lenia: MIT License. Mô hình Cellular Automata toán học, không phải agent-based.
  6. yuuretsu/evolution-of-artificial-life: ISC License. Kiến trúc effector/styled-components phức tạp.

### Bước 3: Xác minh Kiểm thử & Runtime Nền tảng Được Chọn (EvoLab)
- **Lệnh thực hiện:**
  `ash
  npm install
  npm test -- --run
  npm run build
  npx vite preview --port 4173
  `
- **Kết quả:**
  - 
pm test: **60/60 tests PASSED** (100%) trong 2.42s trên 12 test suites.
  - 
pm run build: Hoàn thành trong **1.31s**, zero lỗi TypeScript.
  - Browser Runtime: Khởi chạy browser subagent kiểm tra tại http://localhost:4173/, xác nhận Canvas 2D render bình thường, HUD và các điều khiển hoạt động chính xác.

### Bước 4: Bootstrap Repository tại Workspace Mục Tiêu
- **Lệnh thực hiện:**
  `ash
  git clone https://github.com/simongonzalezdc/EvoLab.git "D:\Personal_Projects\Living-World-Lab"
  cd "D:\Personal_Projects\Living-World-Lab"
  git remote rename origin upstream
  git checkout -b batch-1-bootstrap
  npm install
  npm test -- --run
  npm run build
  `
- **Kết quả:**
  - Repository được thiết lập tại D:\Personal_Projects\Living-World-Lab.
  - Remote upstream trỏ về https://github.com/simongonzalezdc/EvoLab.git để bảo toàn quan hệ nguồn gốc.
  - Branch làm việc hiện tại: atch-1-bootstrap.
  - Toàn bộ test và build trên thư mục chính thức đều đạt kết quả tuyệt đối.

### Bước 5: Soạn thảo Tài liệu Dự án
- Đã tạo:
  - PROJECT_BRIEF.md: Tôn chỉ, 3 chế độ tương tác và phạm vi dự án.
  - OPEN_SOURCE_EVALUATION.md: Báo cáo chi tiết bảng điểm và lý do loại/chọn ứng viên.
  - ARCHITECTURE.md: Sơ đồ khối và phân tích cấu trúc mã nguồn.
  - WORK_LOG.md: Ghi chép chi tiết toàn bộ tiến trình.
  - README.md: Hướng dẫn vận hành và ghi nhận bản quyền upstream.

---

## 3. Vấn đề Hiện tại & Rủi ro Cần Theo dõi
1. **GitHub CLI & Remote cá nhân:** Do môi trường chưa cài gh CLI và chưa cấu hình token cá nhân tự động, repository hiện đã sẵn sàng 100% ở local với Git branch atch-1-bootstrap. Khi user tạo repository trống KhoiPM23/Living-World-Lab trên GitHub, ta chỉ cần gắn origin và push lên.
2. **Kích thước Bundle:** Chunk vendor đồ họa đang ở mức ~558KB do chứa PixiJS. Sẽ tối ưu hóa code-splitting ở các batch sau nếu cần thiết.
3. **Các tài liệu dư thừa từ Upstream:** Upstream có một số file báo cáo giai đoạn trước đó (ví dụ PHASES_3_5_COMPLETION_SUMMARY.md), sẽ được dọn dẹp có chủ đích trong Batch 2 để giữ repo tinh gọn.
