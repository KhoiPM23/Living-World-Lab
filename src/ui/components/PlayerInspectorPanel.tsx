import React from 'react';

export interface InspectedCreatureData {
  id: string;
  name: string;
  type: 'Player' | 'Herbivore' | 'Carnivore' | 'Omnivore';
  atp: number;
  maxATP: number;
  health: number;
  maxHealth: number;
  survivalTime: number;
  speed: number;
  size: number;
  senseRange: number;
  metabolism: number;
  color: number;
}

interface PlayerInspectorPanelProps {
  creature: InspectedCreatureData | null;
  onFeed: (id: string) => void;
  onDropFood: (id: string) => void;
  onDeselect: () => void;
}

export const PlayerInspectorPanel: React.FC<PlayerInspectorPanelProps> = ({
  creature,
  onFeed,
  onDropFood,
  onDeselect,
}) => {
  if (!creature) {
    return (
      <div style={{
        background: 'rgba(10, 14, 28, 0.92)',
        border: '1px solid rgba(0, 229, 255, 0.25)',
        borderRadius: '8px',
        padding: '14px',
        color: '#e0e6ed',
        width: '320px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
        fontFamily: 'Inter, system-ui, sans-serif',
      }}>
        <div style={{ fontSize: '13px', fontWeight: 700, color: '#00e5ff', marginBottom: '6px' }}>
          🔬 PLAYER MODE — SPECTATOR
        </div>
        <div style={{ fontSize: '12px', color: '#90a4ae', lineHeight: '1.5' }}>
          Click on any creature swimming in the lake to lock camera focus, inspect its genetic traits, and interact with it directly.
        </div>
      </div>
    );
  }

  const atpPercent = Math.min(100, Math.max(0, (creature.atp / creature.maxATP) * 100));
  const healthPercent = Math.min(100, Math.max(0, (creature.health / creature.maxHealth) * 100));
  const colorHex = '#' + creature.color.toString(16).padStart(6, '0');

  return (
    <div style={{
      background: 'rgba(10, 14, 28, 0.95)',
      border: '1px solid rgba(0, 229, 255, 0.4)',
      borderRadius: '8px',
      padding: '14px',
      color: '#e0e6ed',
      width: '320px',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.6)',
      fontFamily: 'Inter, system-ui, sans-serif',
    }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '14px',
            height: '14px',
            borderRadius: '50%',
            backgroundColor: colorHex,
            border: '2px solid #fff',
            boxShadow: `0 0 8px ${colorHex}`,
          }} />
          <span style={{ fontWeight: 700, fontSize: '14px', color: '#fff' }}>
            {creature.type}
          </span>
        </div>
        <button
          onClick={onDeselect}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#90a4ae',
            cursor: 'pointer',
            fontSize: '14px',
            padding: '2px 6px',
          }}
          title="Deselect creature"
        >
          ✕
        </button>
      </div>

      <div style={{ fontSize: '11px', color: '#8892b0', marginBottom: '10px', wordBreak: 'break-all' }}>
        ID: {creature.id.substring(0, 24)}...
      </div>

      {/* Energy ATP Bar */}
      <div style={{ marginBottom: '8px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '3px' }}>
          <span style={{ color: '#00e5ff', fontWeight: 600 }}>ATP Energy</span>
          <span>{Math.round(creature.atp)} / {creature.maxATP}</span>
        </div>
        <div style={{ height: '6px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '3px', overflow: 'hidden' }}>
          <div style={{
            height: '100%',
            width: `${atpPercent}%`,
            background: atpPercent < 25 ? '#f44336' : '#00e5ff',
            transition: 'width 0.2s ease',
          }} />
        </div>
      </div>

      {/* Health Bar */}
      <div style={{ marginBottom: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '3px' }}>
          <span style={{ color: '#4caf50', fontWeight: 600 }}>Health</span>
          <span>{Math.round(creature.health)} / {creature.maxHealth}</span>
        </div>
        <div style={{ height: '6px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '3px', overflow: 'hidden' }}>
          <div style={{
            height: '100%',
            width: `${healthPercent}%`,
            background: '#4caf50',
            transition: 'width 0.2s ease',
          }} />
        </div>
      </div>

      {/* Trait Specs Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '6px',
        fontSize: '11px',
        background: 'rgba(0, 0, 0, 0.3)',
        padding: '8px',
        borderRadius: '6px',
        marginBottom: '12px',
      }}>
        <div><span style={{ color: '#8892b0' }}>Speed:</span> <b>{creature.speed.toFixed(1)}</b></div>
        <div><span style={{ color: '#8892b0' }}>Size:</span> <b>{creature.size.toFixed(1)}</b></div>
        <div><span style={{ color: '#8892b0' }}>Senses:</span> <b>{Math.round(creature.senseRange)}px</b></div>
        <div><span style={{ color: '#8892b0' }}>Age:</span> <b>{Math.round(creature.survivalTime)}s</b></div>
      </div>

      {/* Controlled Interventions */}
      <div style={{ display: 'flex', gap: '8px' }}>
        <button
          onClick={() => onFeed(creature.id)}
          style={{
            flex: 1,
            background: 'linear-gradient(135deg, #00b0ff, #0081cb)',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            padding: '7px 10px',
            fontSize: '12px',
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0, 176, 255, 0.3)',
          }}
        >
          ⚡ Feed (+50 ATP)
        </button>
        <button
          onClick={() => onDropFood(creature.id)}
          style={{
            flex: 1,
            background: 'linear-gradient(135deg, #43a047, #2e7d32)',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            padding: '7px 10px',
            fontSize: '12px',
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(67, 160, 71, 0.3)',
          }}
        >
          🍎 Drop Food
        </button>
      </div>
    </div>
  );
};
