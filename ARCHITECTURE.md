# KIẾN TRÚC HỆ THỐNG — SYSTEM ARCHITECTURE
Dự án: **Living World Lab**  
Nền tảng cơ sở: **Forked/Bootstrapped từ EvoLab (MIT License)**

---

## 1. Sơ đồ Khối Tổng thể (High-level Architecture)

`
+-------------------------------------------------------------------------+
|                              LIVING WORLD LAB                           |
+-------------------------------------------------------------------------+
                                     |
    +--------------------------------+--------------------------------+
    |                                |                                |
    v                                v                                v
[ GOD MODE ]                 [ RESEARCH MODE ]                [ PLAYER MODE ]
- Spawner & Eraser Brush     - D3 Phylogenetic Tree           - WASD Direct Control
- World Levers (Speed, Temp) - Realtime Metrics & Population  - Tracking Camera
- Trait Editor (55+ Traits)  - Generation Mutation Reports    - AutoPilot Mode
- Biome Generator Settings   - IndexedDB History & Snapshots  - Energy (ATP) Survival
    |                                |                                |
    +--------------------------------+--------------------------------+
                                     |
                                     v
+-------------------------------------------------------------------------+
|                           CORE SIMULATION LAYER                         |
+-------------------------------------------------------------------------+
| - GameLoop: requestAnimationFrame loop với TimeControl (0.5x - 5x)     |
| - EntityManager: Quản lý Cells, Resources (Glucose), AI Competitors    |
| - Genetics Engine: Genome, TraitSystem, MutationEngine, MatingSystem   |
| - Physics 2D: Matter.js (Velocity, Drag, Collision, Boundaries)        |
| - Environment Engine: BiomeGenerator (12 Biomes), DayNightCycle        |
+-------------------------------------------------------------------------+
                                     |
                                     v
+-------------------------------------------------------------------------+
|                          RENDERING & STORAGE                            |
+-------------------------------------------------------------------------+
| - PixiJS 8.5 Canvas 2D: CellRenderer, BiomeRenderer, ParticleSystem    |
| - Dexie (IndexedDB): SaveSystem, Lưu trữ kịch bản & Lịch sử thế hệ      |
+-------------------------------------------------------------------------+
`

---

## 2. Cấu trúc Thư mục Mã nguồn Hiện tại

`	ext
src/
├── core/                        # Quản lý vòng đời và điều phối trò chơi
│   ├── GameLoop.ts              # Vòng lặp chính, điều phối updates và render
│   ├── GameStateManager.ts      # Quản lý trạng thái: RUNNING, PAUSED, GAME_OVER
│   ├── TimeControl.ts           # Điều khiển tốc độ (Pause, 0.5x, 1x, 2x, 5x)
│   ├── AutoPilot.ts             # Bộ tự hành AI cho cá thể người chơi
│   ├── CameraController.ts      # Quản lý camera pan/zoom/follow
│   ├── Config.ts                # Toàn bộ tham số cấu hình hệ thống
│   ├── InputHandler.ts          # Xử lý sự kiện bàn phím và chuột
│   ├── PerformanceMonitor.ts    # Đo FPS, số draw calls và bộ nhớ
│   └── PlayerSpeciesManager.ts  # Quản lý định danh giống loài người chơi
│
├── entities/                    # Thực thể trong thế giới mô phỏng
│   ├── Cell.ts                  # Cá thể sống: Năng lượng ATP, vị trí, sức khỏe, gen
│   ├── EntityManager.ts         # Quản lý vòng đời spawn, update, hủy cá thể
│   ├── Resource.ts              # Nguồn thức ăn glucose và khoáng chất
│   └── CombatSystem.ts          # Va chạm gây sát thương và săn mồi
│
├── genetics/                    # Cơ chế di truyền và tiến hóa
│   ├── Genome.ts                # Mã gen và lưu trữ giá trị tính trạng
│   ├── TraitSystem.ts           # Hệ thống 55+ traits phân chia 7 nhóm sinh học
│   ├── MutationEngine.ts        # Cơ chế đột biến khi sinh sản (xác suất & biên độ)
│   ├── MatingSystem.ts          # Cơ chế giao phối và sinh sản
│   └── TraitSynergies.ts        # Tương hỗ giữa các gen (kích thước vs tốc độ)
│
├── environment/                 # Môi trường và sinh cảnh
│   ├── BiomeGenerator.ts        # Sinh 12 vùng sinh cảnh ngẫu nhiên bằng Perlin noise
│   ├── DayNightCycle.ts         # Chu kỳ ngày đêm ảnh hưởng đến quang hợp/nhiệt độ
│   └── AtmosphericSystem.ts     # Áp suất, nồng độ oxy và độc tính môi trường
│
├── ai/                          # Trí tuệ nhân tạo của các loài cạnh tranh
│   ├── AIBehavior.ts            # FSM hành vi: Thức ăn, Trốn chạy, Săn mồi, Bầy đàn
│   ├── PopulationManager.ts     # Điều tiết số lượng cá thể tối đa các loài
│   └── EcosystemRegulator.ts    # Cân bằng sinh thái tự nhiên
│
├── rendering/                   # Tầng hiển thị đồ họa 2D
│   ├── PixiApp.ts               # Khởi tạo PixiJS Application & Viewport
│   ├── CellRenderer.ts          # Vẽ sinh vật, mắt, gai, vây và trường nhìn
│   ├── BiomeRenderer.ts         # Vẽ nền hồ và các hiệu ứng vùng sinh thái
│   └── ParticleSystem.ts        # Hiệu ứng bong bóng nước, hạt thức ăn, máu
│
├── ui/                          # Giao diện người dùng (React 19)
│   ├── UIController.tsx         # Điều phối hiển thị các bảng panel
│   ├── MiniMap.ts               # Bản đồ thu nhỏ góc màn hình
│   └── components/
│       ├── TraitEditor.tsx      # Bảng chỉnh sửa gen tiến hóa
│       ├── PhylogeneticTreePanel.tsx # Cây tiến hóa phả hệ D3
│       ├── GenerationReport.tsx # Báo cáo thống kê sau mỗi thế hệ
│       ├── GameSetupPanel.tsx   # Cấu hình thiết lập thế giới ban đầu
│       ├── SaveLoadPanel.tsx    # Lưu và tải trạng thái qua IndexedDB
│       ├── SettingsPanel.tsx    # Cài đặt âm thanh, đồ họa và hiển thị
│       └── TutorialPanel.tsx    # Hướng dẫn thao tác
│
└── data/                        # Lưu trữ dữ liệu
    ├── SaveSystem.ts            # Giao tiếp IndexedDB thông qua Dexie
    └── HistoryTracker.ts        # Ghi nhận lịch sử biến thiên quần thể
`

---

## 3. Điểm Mở rộng cho Living World Lab (Batch 2 & 3)

1. **Bộ chuyển đổi Chế độ Đồng nhất (Unified Mode Switcher):**
   - Bổ sung thanh công cụ trên cùng với 3 nút chuyển chế độ rõ ràng: [God Mode], [Research Mode], [Player Mode].
   - Chế độ chọn sẽ đồng bộ camera và mở các panel tương ứng một cách mượt mà.

2. **Hệ thống Can thiệp Cọ vẽ (God Mode Brush System):**
   - Bổ sung thanh công cụ cọ vẽ: [Thả Thức Ăn], [Thả Sinh Vật], [Tạo Đá Cản], [Xóa Thực Thể].
   - Xử lý click trực tiếp vào Canvas để tạo hoặc xóa thực thể tại tọa độ chuột.

3. **Tối ưu hóa Bảng điều khiển Nghiên cứu (Research Dashboard):**
   - Đưa biểu đồ biến thiên số lượng quần thể thời gian thực ra màn hình chính dạng widget góc.
   - Thêm 2 kịch bản mẫu (Presets): "Vườn sinh thái dồi dào" (Abundant Garden) và "Thử thách khan hiếm" (Resource Scarcity).

4. **Nâng cấp Trải nghiệm Player Mode:**
   - Cho phép click vào bất kỳ sinh vật nào trong thế giới để chuyển tiêu điểm người chơi sang cá thể đó.
   - Bổ sung nút can thiệp tức thời ("Tiếp tế Năng lượng" / +50 ATP) cho cá thể đang theo dõi.
