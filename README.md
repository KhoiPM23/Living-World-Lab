# 🧬 LIVING WORLD LAB

**Living World Lab** là một ứng dụng web mô phỏng thế giới sống nhân tạo (Artificial Life Sandbox), kết hợp giữa nghiên cứu khoa học hệ sinh thái và trải nghiệm tương tác trực quan 2D ngay trong trình duyệt.

> **Ghi nhận Nguồn gốc & Bản quyền (Attribution & Provenance):**  
> Dự án được phát triển và nâng cấp dựa trên mã nguồn mở **[EvoLab](https://github.com/simongonzalezdc/EvoLab)** của tác giả Simon Gonzalez và các cộng tác viên, phát hành theo giấy phép **MIT License**. Toàn bộ các quyền sở hữu ban đầu và điều khoản bản quyền MIT được giữ nguyên vẹn trong tệp [LICENSE](LICENSE).

---

## 🎯 Ba Chế độ Trải nghiệm Cốt lõi (Đã Hoàn Thành trong Batch 2)

Living World Lab tích hợp 3 cách tiếp cận trên cùng một thế giới mô phỏng thống nhất thông qua thanh điều hướng **ModeSelectorBar**:

1. **🛠️ God Mode (Chế độ Kiến tạo & Can thiệp):**
   - **Thanh công cụ cọ vẽ (Palette):** Click trực tiếp vào Canvas để tạo hoặc xóa thực thể:
     - `+Herbivore` (Sinh vật ăn cỏ tốc độ cao)
     - `+Carnivore` (Thú săn mồi hung dữ)
     - `+Omnivore` (Sinh vật ăn tạp thích nghi tốt)
     - `+Food` (Thả cụm thức ăn glucose)
     - `+Rock` (Đặt rạn đá chướng ngại vật)
     - `Erase` (Xóa bỏ bất kỳ sinh vật hoặc rạn đá nào được click)
   - **Tác vụ can thiệp toàn cục:** Bổ sung +50 thức ăn tức thời, quét sạch toàn bộ rạn đá, bước từng tick mô phỏng (`⏭️ Step 1 Tick`) khi đang tạm dừng.

2. **📊 Research Mode (Chế độ Nghiên cứu & Dữ liệu Thật):**
   - **Biểu đồ Dòng thời gian Thực (Population Timeline):** Đồ thị Canvas 2D vẽ biến thiên số lượng theo loài và sinh khối thức ăn từ dữ liệu thực tế của mô phỏng (không dùng số liệu giả).
   - **Động cơ Kịch bản (Preset Scenarios):** 3 kịch bản khởi đầu chuyên sâu:
     1. *Thriving Garden* (#1337) — Cân bằng sinh thái dồi dào, điều kiện lý tưởng.
     2. *Resource Scarcity Crisis* (#2026) — Hạn hán, cạn kiệt thức ăn, áp lực đào thải cực mạnh.
     3. *Apex Predator Outbreak* (#9999) — Mật độ thú săn mồi cao, dao động quần thể kịch tính.
   - **Hiển thị Seed & Cấu hình:** Xem và tái lập các chuỗi mô phỏng thông qua bộ sinh số ngẫu nhiên có seed (Mulberry32 PRNG).

3. **🔬 Player Mode (Chế độ Trải nghiệm Sinh vật):**
   - **Chọn & Khóa Tiêu điểm:** Click vào bất kỳ sinh vật nào trong hồ để camera tự động bám theo (Auto-tracking), kèm vòng hào quang đánh dấu.
   - **Bảng Tra cứu Sinh học (Inspector Card):** Hiển thị trực tiếp mức năng lượng ATP, thanh sức khỏe, tuổi thọ, tốc độ, tầm nhìn và độ trao đổi chất.
   - **Tương tác Cứu trợ Trực tiếp:**
     - `[⚡ Feed (+50 ATP)]`: Tiếp tế năng lượng tức thời cho sinh vật.
     - `[🍎 Drop Food]`: Thả cụm glucose ngay trước hướng di chuyển của sinh vật.
   - **Hủy chọn An toàn (Safe Deselect):** Khi sinh vật được theo dõi qua đời hoặc bị xóa, hệ thống tự động giải phóng tiêu điểm một cách an toàn.

---

## 🛠️ Công nghệ Sử dụng & Hiệu Năng Thực Tế

- **Ngôn ngữ & Nền tảng:** TypeScript, React 19.2.7, Vite 8
- **Đồ họa 2D & Vật lý:** PixiJS 8.5 (Canvas 2D), Matter.js (Physics) + Custom Obstacle Collision
- **Tính tất định:** Mulberry32 Seeded PRNG (Kiểm chứng trace 1,000 ticks)
- **Trực quan hóa Dữ liệu:** Canvas 2D Real-time Sparkline + D3.js (Phylogenetic Tree)
- **Kiểm thử tự động:** Vitest (**74/74 unit tests passed** — 100%)
- **Hiệu năng Thực nghiệm (Benchmark):** Duy trì ổn định **58.5 – 60.0 FPS** trên máy Windows phổ thông với ~230 thực thể đồng thời (32 tế bào + 200 thức ăn + rạn đá).

---

## 🚀 Hướng dẫn Cài đặt & Chạy Thực tế

```bash
# 1. Cài đặt dependencies
npm install

# 2. Chạy toàn bộ 74 bài test tự động
npm test -- --run

# 3. Khởi chạy môi trường phát triển (Dev Server)
npm run dev

# 4. Xây dựng bản phát hành và chạy preview
npm run build
npm run preview
```

Truy cập ứng dụng tại `http://localhost:4173/` hoặc `http://localhost:5173/`.

---

## 📂 Tài liệu Dự án

- [PROJECT_BRIEF.md](PROJECT_BRIEF.md): Mục tiêu sản phẩm, phạm vi 3 chế độ và giới hạn phát triển.
- [OPEN_SOURCE_EVALUATION.md](OPEN_SOURCE_EVALUATION.md): Báo cáo đánh giá chi tiết 5+ ứng viên mã nguồn mở và kết quả audit.
- [ARCHITECTURE.md](ARCHITECTURE.md): Sơ đồ kiến trúc hệ thống, luồng tương tác canvas và các điểm mở rộng kỹ thuật.
- [WORK_LOG.md](WORK_LOG.md): Nhật ký chi tiết tiến độ Batch 1 và Batch 2, bằng chứng kiểm thử và thông số benchmark.
