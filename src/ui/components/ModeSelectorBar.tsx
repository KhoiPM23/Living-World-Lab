import React from 'react';
import type { ScenarioConfig } from '../../scenarios/PresetScenarios';

export type ActiveInteractionMode = 'god' | 'research' | 'player';

interface ModeSelectorBarProps {
  activeMode: ActiveInteractionMode;
  onSelectMode: (mode: ActiveInteractionMode) => void;
  scenarios: ScenarioConfig[];
  activeScenarioId: string;
  onSelectScenario: (scenarioId: string) => void;
  seed: number;
  totalPopulation: number;
  totalFood: number;
  onOpenGuide?: () => void;
}

export const ModeSelectorBar: React.FC<ModeSelectorBarProps> = ({
  activeMode,
  onSelectMode,
  scenarios,
  activeScenarioId,
  onSelectScenario,
  seed,
  totalPopulation,
  totalFood,
  onOpenGuide,
}) => {
  return (
    <header
      style={{
        position: 'fixed',
        top: '12px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        background: 'rgba(10, 14, 28, 0.88)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(0, 229, 255, 0.25)',
        borderRadius: '30px',
        padding: '6px 16px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
        zIndex: 1000,
        fontFamily: 'Inter, system-ui, sans-serif',
        userSelect: 'none',
      }}
    >
      {/* Brand Title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginRight: '6px' }}>
        <span style={{ fontSize: '16px' }}>🧬</span>
        <span style={{ fontWeight: 800, fontSize: '13px', letterSpacing: '0.5px', color: '#00e5ff' }}>
          LIVING WORLD LAB
        </span>
      </div>

      {/* Mode Switcher Tabs */}
      <div style={{ display: 'flex', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '20px', padding: '3px' }}>
        <button
          onClick={() => onSelectMode('god')}
          style={{
            background: activeMode === 'god' ? 'linear-gradient(135deg, #ff9800, #f57c00)' : 'transparent',
            color: activeMode === 'god' ? '#fff' : '#b0bec5',
            border: 'none',
            borderRadius: '16px',
            padding: '5px 12px',
            fontSize: '12px',
            fontWeight: activeMode === 'god' ? 700 : 500,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          <span>🛠️</span>
          <span>God Mode</span>
        </button>

        <button
          onClick={() => onSelectMode('research')}
          style={{
            background: activeMode === 'research' ? 'linear-gradient(135deg, #00b0ff, #0091ea)' : 'transparent',
            color: activeMode === 'research' ? '#fff' : '#b0bec5',
            border: 'none',
            borderRadius: '16px',
            padding: '5px 12px',
            fontSize: '12px',
            fontWeight: activeMode === 'research' ? 700 : 500,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          <span>📊</span>
          <span>Research Mode</span>
        </button>

        <button
          onClick={() => onSelectMode('player')}
          style={{
            background: activeMode === 'player' ? 'linear-gradient(135deg, #4caf50, #388e3c)' : 'transparent',
            color: activeMode === 'player' ? '#fff' : '#b0bec5',
            border: 'none',
            borderRadius: '16px',
            padding: '5px 12px',
            fontSize: '12px',
            fontWeight: activeMode === 'player' ? 700 : 500,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          <span>🔬</span>
          <span>Player Mode</span>
        </button>
      </div>

      {/* Scenario Selector Dropdown */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        <span style={{ fontSize: '11px', color: '#78909c' }}>Scenario:</span>
        <select
          value={activeScenarioId}
          onChange={e => onSelectScenario(e.target.value)}
          style={{
            background: 'rgba(0, 0, 0, 0.4)',
            color: '#00e5ff',
            border: '1px solid rgba(0, 229, 255, 0.3)',
            borderRadius: '12px',
            padding: '3px 8px',
            fontSize: '11px',
            fontWeight: 600,
            cursor: 'pointer',
            outline: 'none',
          }}
        >
          {scenarios.map(sc => (
            <option key={sc.id} value={sc.id} style={{ background: '#0a0e1c', color: '#fff' }}>
              {sc.name}
            </option>
          ))}
        </select>
      </div>

      {/* Quick Guide Trigger */}
      {onOpenGuide && (
        <button
          onClick={onOpenGuide}
          title="Open Living World Lab User Guide"
          style={{
            background: 'rgba(0, 229, 255, 0.15)',
            border: '1px solid rgba(0, 229, 255, 0.4)',
            color: '#00e5ff',
            borderRadius: '16px',
            padding: '4px 10px',
            fontSize: '11px',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            transition: 'all 0.2s ease',
          }}
        >
          <span>❓</span>
          <span>Guide</span>
        </button>
      )}

      {/* Live State Badges */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: '#b0bec5' }}>
        <span style={{ background: 'rgba(255, 255, 255, 0.08)', padding: '2px 8px', borderRadius: '10px' }}>
          Seed: <b style={{ color: '#fff' }}>#{seed}</b>
        </span>
        <span style={{ background: 'rgba(0, 229, 255, 0.1)', padding: '2px 8px', borderRadius: '10px', color: '#00e5ff' }}>
          Pop: <b>{totalPopulation}</b> | Food: <b>{totalFood}</b>
        </span>
      </div>
    </header>
  );
};
