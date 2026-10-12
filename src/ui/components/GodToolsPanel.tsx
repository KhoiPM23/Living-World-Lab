import React from 'react';

export type GodToolType =
  | 'inspect'
  | 'spawn_herbivore'
  | 'spawn_carnivore'
  | 'spawn_omnivore'
  | 'spawn_food'
  | 'spawn_obstacle'
  | 'erase';

interface GodToolsPanelProps {
  activeTool: GodToolType;
  onSelectTool: (tool: GodToolType) => void;
  onClearObstacles: () => void;
  onReplenishFood: () => void;
  onStepTick: () => void;
  isPaused: boolean;
}

export const GodToolsPanel: React.FC<GodToolsPanelProps> = ({
  activeTool,
  onSelectTool,
  onClearObstacles,
  onReplenishFood,
  onStepTick,
  isPaused,
}) => {
  const tools: { id: GodToolType; label: string; icon: string; desc: string; color: string }[] = [
    { id: 'inspect', label: 'Inspect', icon: '✋', desc: 'Click to inspect or drag viewport', color: '#90a4ae' },
    { id: 'spawn_herbivore', label: '+Herbivore', icon: '🟢', desc: 'Click canvas to spawn herbivore', color: '#4caf50' },
    { id: 'spawn_carnivore', label: '+Carnivore', icon: '🔴', desc: 'Click canvas to spawn carnivore', color: '#f44336' },
    { id: 'spawn_omnivore', label: '+Omnivore', icon: '🟡', desc: 'Click canvas to spawn omnivore', color: '#ff9800' },
    { id: 'spawn_food', label: '+Food', icon: '🍎', desc: 'Click canvas to drop glucose', color: '#ffd700' },
    { id: 'spawn_obstacle', label: '+Rock', icon: '🪨', desc: 'Click canvas to place rock barrier', color: '#78909c' },
    { id: 'erase', label: 'Erase', icon: '🗑️', desc: 'Click entity or rock to delete', color: '#e91e63' },
  ];

  return (
    <div style={{
      background: 'rgba(10, 14, 28, 0.95)',
      border: '1px solid rgba(255, 152, 0, 0.4)',
      borderRadius: '8px',
      padding: '12px',
      color: '#e0e6ed',
      width: '320px',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.6)',
      fontFamily: 'Inter, system-ui, sans-serif',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
        <span style={{ fontWeight: 700, fontSize: '13px', color: '#ff9800' }}>
          🛠️ GOD MODE TOOLS
        </span>
        <span style={{ fontSize: '11px', color: '#8892b0' }}>
          Click Canvas to Apply
        </span>
      </div>

      {/* Tool Palette */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '6px', marginBottom: '10px' }}>
        {tools.map(tool => {
          const isSelected = activeTool === tool.id;
          return (
            <button
              key={tool.id}
              onClick={() => onSelectTool(tool.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 8px',
                background: isSelected ? 'rgba(255, 152, 0, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                border: isSelected ? '1px solid #ff9800' : '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '6px',
                color: isSelected ? '#fff' : '#b0bec5',
                fontSize: '12px',
                fontWeight: isSelected ? 700 : 500,
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.15s ease',
              }}
              title={tool.desc}
            >
              <span>{tool.icon}</span>
              <span>{tool.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tool Quick Description */}
      <div style={{
        fontSize: '11px',
        color: '#ffb74d',
        background: 'rgba(255, 152, 0, 0.08)',
        padding: '6px 8px',
        borderRadius: '4px',
        marginBottom: '10px',
      }}>
        {tools.find(t => t.id === activeTool)?.desc}
      </div>

      {/* Global Interventions */}
      <div style={{ display: 'flex', gap: '6px' }}>
        <button
          onClick={onReplenishFood}
          style={{
            flex: 1,
            background: 'rgba(255, 215, 0, 0.15)',
            border: '1px solid rgba(255, 215, 0, 0.4)',
            color: '#ffd700',
            borderRadius: '4px',
            padding: '5px',
            fontSize: '11px',
            fontWeight: 600,
            cursor: 'pointer',
          }}
          title="Spawn 50 food clusters"
        >
          🍎 +50 Food
        </button>
        <button
          onClick={onClearObstacles}
          style={{
            flex: 1,
            background: 'rgba(233, 30, 99, 0.15)',
            border: '1px solid rgba(233, 30, 99, 0.4)',
            color: '#ff4081',
            borderRadius: '4px',
            padding: '5px',
            fontSize: '11px',
            fontWeight: 600,
            cursor: 'pointer',
          }}
          title="Remove all placed obstacles"
        >
          🧹 Clear Rocks
        </button>
        {isPaused && (
          <button
            onClick={onStepTick}
            style={{
              flex: 1,
              background: 'rgba(0, 229, 255, 0.15)',
              border: '1px solid rgba(0, 229, 255, 0.4)',
              color: '#00e5ff',
              borderRadius: '4px',
              padding: '5px',
              fontSize: '11px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
            title="Advance simulation by 1 tick"
          >
            ⏭️ Step 1 Tick
          </button>
        )}
      </div>
    </div>
  );
};
