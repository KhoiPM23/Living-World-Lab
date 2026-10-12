import React from 'react';

interface QuickGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuickGuideModal: React.FC<QuickGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2000,
        fontFamily: 'Inter, system-ui, sans-serif',
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: 'linear-gradient(145deg, #0d1326, #070a14)',
          border: '1px solid rgba(0, 229, 255, 0.35)',
          borderRadius: '12px',
          width: '90%',
          maxWidth: '680px',
          maxHeight: '85vh',
          overflowY: 'auto',
          padding: '24px',
          color: '#e0e6ed',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8), 0 0 40px rgba(0, 229, 255, 0.15)',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '24px' }}>🧬</span>
            <div>
              <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 800, color: '#00e5ff', letterSpacing: '0.5px' }}>
                LIVING WORLD LAB — USER GUIDE
              </h2>
              <p style={{ margin: 0, fontSize: '12px', color: '#8892b0' }}>
                Three Perspectives on a Single Living World Engine
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#8892b0',
              fontSize: '20px',
              cursor: 'pointer',
              padding: '4px 8px',
            }}
          >
            ✕
          </button>
        </div>

        {/* 3 Modes Overview */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '20px' }}>
          <div style={{ background: 'rgba(255, 152, 0, 0.08)', border: '1px solid rgba(255, 152, 0, 0.3)', borderRadius: '8px', padding: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#ff9800', fontWeight: 700, fontSize: '13px', marginBottom: '6px' }}>
              <span>🛠️</span> God Mode
            </div>
            <div style={{ fontSize: '11px', color: '#cfd8dc', lineHeight: '1.5' }}>
              Direct intervention. Click the canvas to spawn species, food clusters, or rock barriers. Erase any entity with the eraser tool.
            </div>
          </div>

          <div style={{ background: 'rgba(0, 176, 255, 0.08)', border: '1px solid rgba(0, 176, 255, 0.3)', borderRadius: '8px', padding: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#00e5ff', fontWeight: 700, fontSize: '13px', marginBottom: '6px' }}>
              <span>📊</span> Research Mode
            </div>
            <div style={{ fontSize: '11px', color: '#cfd8dc', lineHeight: '1.5' }}>
              Real-time analytics. Observe population dynamics on the live timeline chart. Switch initial preset scenarios and export timeline CSV data.
            </div>
          </div>

          <div style={{ background: 'rgba(76, 175, 80, 0.08)', border: '1px solid rgba(76, 175, 80, 0.3)', borderRadius: '8px', padding: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#4caf50', fontWeight: 700, fontSize: '13px', marginBottom: '6px' }}>
              <span>🔬</span> Player Mode
            </div>
            <div style={{ fontSize: '11px', color: '#cfd8dc', lineHeight: '1.5' }}>
              Organism spectator. Click any swimming creature to lock tracking camera, inspect real-time ATP energy and genetics, or feed it.
            </div>
          </div>
        </div>

        {/* Species Color Guide */}
        <div style={{ marginBottom: '20px', background: 'rgba(255, 255, 255, 0.03)', padding: '12px', borderRadius: '8px' }}>
          <div style={{ fontSize: '12px', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>
            Ecosystem Species & Objects Guide
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px', fontSize: '11px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#4caf50' }} />
              <span>Herbivore</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#f44336' }} />
              <span>Carnivore</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ff9800' }} />
              <span>Omnivore</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ffd700' }} />
              <span>Glucose Food</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#78909c' }} />
              <span>Rock Barrier</span>
            </div>
          </div>
        </div>

        {/* Keyboard Shortcuts */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ fontSize: '12px', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>
            Keyboard Shortcuts
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', fontSize: '11px', color: '#b0bec5' }}>
            <div><kbd style={{ background: '#1c2538', padding: '2px 6px', borderRadius: '4px', color: '#00e5ff' }}>Space</kbd> : Pause / Resume</div>
            <div><kbd style={{ background: '#1c2538', padding: '2px 6px', borderRadius: '4px', color: '#00e5ff' }}>W A S D</kbd> : Move Player Cell</div>
            <div><kbd style={{ background: '#1c2538', padding: '2px 6px', borderRadius: '4px', color: '#00e5ff' }}>+ / -</kbd> : Zoom In / Out</div>
            <div><kbd style={{ background: '#1c2538', padding: '2px 6px', borderRadius: '4px', color: '#00e5ff' }}>0</kbd> : Reset Camera Zoom</div>
            <div><kbd style={{ background: '#1c2538', padding: '2px 6px', borderRadius: '4px', color: '#00e5ff' }}>1 - 5</kbd> : Switch Music Preset</div>
            <div><kbd style={{ background: '#1c2538', padding: '2px 6px', borderRadius: '4px', color: '#00e5ff' }}>Shift + ?</kbd> : Key Shortcuts</div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button
            onClick={onClose}
            style={{
              background: 'linear-gradient(135deg, #00b0ff, #0081cb)',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              padding: '8px 20px',
              fontWeight: 700,
              fontSize: '12px',
              cursor: 'pointer',
              boxShadow: '0 2px 10px rgba(0, 176, 255, 0.4)',
            }}
          >
            Start Exploring
          </button>
        </div>
      </div>
    </div>
  );
};
