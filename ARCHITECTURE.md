# KIẾN TRÚC HỆ THỐNG — SYSTEM ARCHITECTURE
Dự án: **Living World Lab**  
Nền tảng cơ sở: **Forked/Bootstrapped từ EvoLab (MIT License)**  
Cập nhật Batch 2: **Simulation Core, 3-Mode Interaction & Real-time Analytics**

---

## 1. Sơ đồ Khối Tổng thể (Batch 2 Architecture)

```
+-----------------------------------------------------------------------------------------+
|                                    LIVING WORLD LAB                                     |
+-----------------------------------------------------------------------------------------+
                                             |
                   [ ModeSelectorBar: God | Research | Player | Scenarios ]
                                             |
         +-----------------------------------+-----------------------------------+
         |                                   |                                   |
         v                                   v                                   v
   [ GOD MODE ]                       [ RESEARCH MODE ]                   [ PLAYER MODE ]
- GodToolsPanel:                     - ResearchChart:                    - PlayerInspectorPanel:
  * Spawn Herbivore/Carnivore/Omni     * Real-time Canvas 2D timeline      * Live Vital Signs (ATP, HP, Age)
  * Drop Food (+Glucose)               * 100% real sampled simulation data * DNA Trait Specs (Speed, Senses)
  * Place Obstacle (+Rock Barrier)     * Multi-line species breakdown      * [⚡ Feed (+50 ATP)]
  * Erase Tool & Clear Rocks         - PresetScenarios Engine:           * [🍎 Drop Food Ahead]
  * [⏭️ Step 1 Tick] (when paused)     * Thriving Garden (#1337)           * Auto-focus Tracking Camera
                                       * Scarcity Crisis (#2026)           * Safe Deselect on Perish
                                       * Predator Outbreak (#9999)
         |                                   |                                   |
         +-----------------------------------+-----------------------------------+
                                             |
                                             v
+-----------------------------------------------------------------------------------------+
|                              SIMULATION CORE & PHYSICS LAYER                            |
+-----------------------------------------------------------------------------------------+
| - SeededRandom (Mulberry32 PRNG): Đảm bảo tính tất định (1000 ticks trace)              |
| - GameLoop: requestAnimationFrame loop với TimeControl (Pause, 0.5x, 1x, 2x, 5x, Step) |
| - EntityManager:                                                                        |
|     * Cells (Creatures: Player, Herbivore, Carnivore, Omnivore)                         |
|     * Resources (Glucose, Amino Acids, Phosphates)                                      |
|     * Obstacles (Rocks: Circular barriers với normal deflection & damping)              |
|     * Spawner & Eraser methods (God Mode API)                                           |
|     * Nearest-neighbor lookup & Feeding (Player Mode API)                               |
| - Genetics Engine: Genome, TraitSystem (55+ traits), MutationEngine, MatingSystem       |
| - Physics 2D: Matter.js + Custom Obstacle Collision Resolver                            |
| - Environment Engine: BiomeGenerator (12 Biomes), DayNightCycle, AtmosphericSystem      |
+-----------------------------------------------------------------------------------------+
                                             |
                                             v
+-----------------------------------------------------------------------------------------+
|                                  RENDERING & STORAGE                                    |
+-----------------------------------------------------------------------------------------+
| - PixiJS 8.5 Canvas 2D: CellRenderer, BiomeRenderer, SelectionRing, ParticleSystem      |
| - CameraController: Eased camera tracking theo cá thể được chọn                         |
| - Dexie (IndexedDB): Lưu trữ kịch bản, cấu hình và lịch sử tiến hóa                     |
+-----------------------------------------------------------------------------------------+
```

---

## 2. Luồng Tương tác Canvas (Interaction Pipeline)

Khi người dùng click vào Canvas:
1. `pointerdown` kích hoạt trên thẻ canvas HTML.
2. Kiểm tra nếu con trỏ nằm trên UI React (`#ui-root`), bỏ qua sự kiện để tránh click xuyên thấu.
3. Chuyển đổi tọa độ màn hình sang tọa độ thế giới mô phỏng thông qua PixiJS:
   `worldPos = renderer.worldContainer.toLocal({ x: screenX, y: screenY })`
4. Điều hướng theo `activeMode`:
   - **God Mode:** Kích hoạt `handleGodToolAction(tool, worldPos.x, worldPos.y)` -> Gọi `EntityManager.spawnCreature`, `spawnResource`, `addObstacle`, hoặc `removeEntityAt`. Kèm hiệu ứng hạt (Particle burst) và thông báo Toast.
   - **Player Mode:** Gọi `EntityManager.findNearestCell(worldPos.x, worldPos.y, 60)`. Nếu tìm thấy -> Khóa camera bám theo cá thể, hiển thị vòng sáng tiêu điểm và cập nhật thông số sinh học lên `PlayerInspectorPanel`.
   - **Research Mode:** Giữ góc nhìn toàn cảnh để quan sát biểu đồ biến thiên quần thể.

---

## 3. Hệ thống Vật cản Môi trường (Obstacle System)

- Lớp `Obstacle` (`src/entities/Obstacle.ts`) đại diện cho các rạn đá / chướng ngại vật cố định trong hồ.
- Mỗi frame trong `EntityManager.update()`, mọi tế bào đều được kiểm tra va chạm với danh sách vật cản:
  - Nếu khoảng cách nhỏ hơn tổng bán kính tế bào và vật cản: Đẩy tế bào ra khỏi vùng giao cắt dọc theo pháp tuyến va chạm.
  - Vận tốc tế bào được phản xạ có giảm chấn: V' = V - 1.5 * (V . n) * n.

---

## 4. Hệ thống Tính tất định (Determinism & PRNG)

- Sử dụng thuật toán **Mulberry32** (`src/utils/SeededRandom.ts`) độc lập với `Math.random()`.
- Được kiểm chứng bằng bài test `tests/core/Determinism.test.ts`: Cùng seed sinh ra chuỗi 3,000 giá trị biến thiên hoàn toàn trùng khớp sau 1,000 ticks.
