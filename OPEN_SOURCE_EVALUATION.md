# BÁO CÁO ĐÁNH GIÁ MÃ NGUỒN MỞ — OPEN-SOURCE CANDIDATE AUDIT
Dự án: **Living World Lab**  
Thời điểm thực hiện: **Tháng 10/2026**  
Mục tiêu: Đánh giá thực nghiệm các kho mã nguồn mở về mô phỏng sinh thái / artificial life nhằm chọn nền tảng tối ưu để bootstrap MVP 7 ngày, tránh xây lại từ đầu.

---

## 1. Tiêu chí & Trọng số Đánh giá

| Tiêu chí | Trọng số | Mô tả |
| :--- | :---: | :--- |
| **1. Mức độ phù hợp với Living World Lab** | **30%** | Mô phỏng sinh thái 2D trực quan, hỗ trợ 3 chế độ (God, Research, Player), local-first, không backend/GPU bắt buộc. |
| **2. Mức độ hoàn thiện & Chạy thực tế** | **20%** | Cài đặt sạch, build không lỗi, test pass, runtime mượt mà trên môi trường máy hiện tại. |
| **3. Khả năng tái sử dụng & Tiết kiệm thời gian** | **20%** | Tái sử dụng được core simulation, rendering, di truyền, UI điều khiển, cây phả hệ, lưu trữ. |
| **4. Chất lượng kiến trúc, Test & Mở rộng** | **15%** | Phân tầng rõ ràng, code sạch (TypeScript), có unit test tự động, dễ tích hợp thêm tính năng. |
| **5. License & Provenance (Điều kiện tiên quyết)** | **15%** | **Cổng kiểm soát bắt buộc (Gatekeeper)**: Phải có LICENSE chuẩn mở (MIT, ISC, Apache-2.0). Nếu không có license hoặc không rõ quyền sở hữu -> **LOẠI NGAY LẬP TỨC**. |

---

## 2. Bảng Tổng hợp & Chấm điểm Ứng viên

| Ứng viên | License (Gatekeeper) | Phù hợp (30%) | Hoàn thiện (20%) | Tái sử dụng (20%) | Kiến trúc (15%) | License (15%) | Điểm Tổng /10 | Kết luận |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :--- |
| **simongonzalezdc/EvoLab** | **MIT (PASS)** | **9.5** | **9.5** | **9.0** | **9.0** | **10.0** | **9.40** | **ĐƯỢC CHỌN (Nền tảng tối ưu)** |
| **ozone81/EvoWorld** | **KHÔNG CÓ (FAIL)** | 7.5 | 6.0 | 0.0 | 7.0 | 0.0 | **LOẠI** | **Bị loại do vi phạm License Gatekeeper** |
| **lnguyen503/ai-world** | MIT (PASS) | 5.0 | 8.5 | 5.5 | 6.0 | 10.0 | **6.70** | Loại: 3D WebGL Three.js, neural TTS nặng, lệch scope 2D |
| **bariszorlu35/Evolvarium** | MIT (PASS) | 6.5 | 7.0 | 6.0 | 6.5 | 10.0 | **7.05** | Loại: Cần Python runtime/numpy, kiến trúc phân mảnh |
| **Chakazul/Lenia** | MIT (PASS) | 3.0 | 8.0 | 2.0 | 7.0 | 10.0 | **5.45** | Loại: Cellular automata toán học, không phải agent-based |
| *yuuretsu/evolution-of-artificial-life* | ISC (PASS) | 7.5 | 7.5 | 7.0 | 7.5 | 10.0 | **7.80** | Dự phòng: UI phức tạp, thiếu phân chia 3 chế độ tương tác |

---

## 3. Đánh giá Chi tiết Từng Ứng viên

### 3.1. simongonzalezdc/EvoLab (ỨNG VIÊN ĐƯỢC CHỌN)
- **Kho lưu trữ:** https://github.com/simongonzalezdc/EvoLab
- **License thực tế:** **MIT License** (Copyright 2025 EvoLab Contributors). Hoàn toàn tự do sử dụng, chỉnh sửa, tích hợp cho dự án cá nhân và thương mại.
- **Công nghệ cốt lõi:** TypeScript, React 19, PixiJS 8.5 (Canvas 2D), Matter.js (Physics 2D), D3.js (Phylogenetic tree), Dexie (IndexedDB local storage), Tone.js (Audio), Vite 8, Vitest.
- **Kết quả kiểm thử thực tế (Audited trên máy):**
  - Cài đặt: 
pm install thành công 237 packages trong 11s.
  - Unit Tests: 
pm test chạy Vitest với **12 test files, 60/60 tests PASSED (100%)** trong 2.42s (GameStateManager, Genome, Resource, TraitSystem, MutationEngine, Cell, SaveSystem, CombatSystem, MatingSystem...).
  - Build: 
pm run build (	sc && vite build) hoàn thành sạch trong 1.31s với zero lỗi TypeScript.
  - Runtime: Đã khởi chạy ite preview và kiểm tra qua browser subagent tại http://localhost:4173/: Canvas 2D render mượt mà, HUD hiển thị trực quan, các panel tương tác nhạy bén.
- **Mức độ đáp ứng 3 Chế độ của Living World Lab:**
  - **Player Mode (Sẵn có 95%):** Điều khiển trực tiếp tế bào bằng phím WASD, lực đẩy mượt mà, camera tracking bám theo tế bào, tự động chuyển AutoPilot khi người chơi muốn quan sát tự do.
  - **God Mode (Sẵn có 85%):** Tùy biến thông số môi trường ban đầu, thiết lập kích thước quần thể cạnh tranh (Herbivore, Carnivore, Omnivore), TimeControl (Pause, 0.5x, 1x, 2x, 5x), Trait Editor với hơn 55 gen phân chia 7 nhóm.
  - **Research Mode (Sẵn có 90%):** D3 Phylogenetic Tree hiển thị cây tiến hóa phả hệ, Generation Reports báo cáo đột biến từng thế hệ, 12 vùng sinh cảnh Perlin noise với các thông số nhiệt độ/độc tính/pH, hệ thống Save/Load IndexedDB hoàn chỉnh.
- **Rủi ro & Điểm cần theo dõi:**
  - Bundle size có chunk đồ họa vendor lớn (~558KB). Cần dọn bớt asset âm thanh nếu muốn tải siêu nhẹ.
  - Một số file tài liệu mang tính chất AI-generated do upstream sử dụng Claude/Agents (cần dọn dẹp các tài liệu dư thừa).

---

### 3.2. ozone81/EvoWorld
- **Kho lưu trữ:** https://github.com/ozone81/EvoWorld
- **License thực tế:** **KHÔNG CÓ LICENSE** (Không có file LICENSE, trường license trong package.json để trống).
- **Phân tích pháp lý:** Theo quy định bản quyền quốc tế và Điều khoản GitHub, mã nguồn không có license được mặc định là "All Rights Reserved" của tác giả. Sao chép vào repo cá nhân vi phạm pháp lý và vi phạm trực tiếp quy tắc gatekeeper của dự án.
- **Kỹ thuật:** Monorepo pnpm (pnpm-workspace.yaml), chia tách CLI và Web, chạy mô phỏng fixed-timestep tất định. Chỉ có duy nhất 1 commit ban đầu.
- **Kết luận:** **LOẠI BỎ do vi phạm tiêu chí bản quyền bắt buộc.**

---

### 3.3. lnguyen503/ai-world
- **Kho lưu trữ:** https://github.com/lnguyen503/ai-world
- **License thực tế:** MIT License.
- **Công nghệ cốt lõi:** Three.js (3D WebGL), TypeScript, Vite, kokoro-js (mô hình Text-to-Speech 80MB+ chạy trong browser).
- **Đánh giá kiến trúc & mức độ phù hợp:**
  - Dự án hướng tới sở thú 3D hoạt hình cel-shading với sinh vật có tai, mắt, đuôi và giọng đọc TTS.
  - Vi phạm yêu cầu phong cách của Living World Lab: yêu cầu thế giới 2D trực quan + dashboard khoa học, không GPU 3D nặng và không kéo các mô hình AI/TTS thừa thãi vào trình duyệt.
- **Kết luận:** **LOẠI BỎ.**

---

### 3.4. bariszorlu35/Evolvarium
- **Kho lưu trữ:** https://github.com/bariszorlu35/Evolvarium
- **License thực tế:** MIT License.
- **Công nghệ cốt lõi:** Python (
umpy, web/server.py, ReinLife/), Next.js 16, React 19, Tailwind v4.
- **Đánh giá kiến trúc:**
  - Mô phỏng mạng nơ-ron ăn cỏ - ăn thịt (herbivore - carnivore).
  - Phụ thuộc vào môi trường Python backend nếu muốn tận dụng trọn vẹn bộ não tiến hóa, không tối ưu cho kiến trúc local-first tĩnh chạy hoàn toàn trên client.
- **Kết luận:** **LOẠI BỎ.**

---

### 3.5. Chakazul/Lenia
- **Kho lưu trữ:** https://github.com/Chakazul/Lenia
- **License thực tế:** MIT License.
- **Công nghệ cốt lõi:** Toán học Continuous Cellular Automata, FFT Convolution, Python / JavaScript thuần.
- **Đánh giá kiến trúc:**
  - Lenia mô phỏng các cấu trúc "soliton" toán học liên tục trên lưới ô cờ.
  - Không phải là mô phỏng sinh thái dựa trên cá thể (Agent-based modeling: ăn, di chuyển, năng lượng, sinh sản cá thể). Hoàn toàn không thể tái sử dụng cho 3 chế độ God/Research/Player.
- **Kết luận:** **LOẠI BỎ.**

---

## 4. Quyết định Chọn Nền tảng & Kế hoạch Tiếp theo

**Quyết định cuối cùng:** Chọn **simongonzalezdc/EvoLab** làm nền tảng khởi đầu cho **Living World Lab**.

**Lý do cốt lõi:**
1. Đáp ứng 100% tiêu chí pháp lý (MIT License).
2. Mã nguồn TypeScript hiện đại, sạch, có 60 unit tests tự động đã được kiểm chứng chạy đạt 100%.
3. Đã có sẵn gần như toàn bộ nền tảng cốt lõi cho cả 3 chế độ (Player WASD/AutoPilot, God Trait Editor/TimeControl, Research D3 Tree/Reports).
4. Giúp tiết kiệm từ 70% đến 80% thời gian xây dựng boilerplate trong tuần đầu tiên, cho phép tập trung tinh chỉnh trải nghiệm người dùng trong 7 ngày tới.
