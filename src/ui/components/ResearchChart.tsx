import React, { useRef, useEffect } from 'react';

export interface MetricSample {
  time: number;
  herbivores: number;
  carnivores: number;
  omnivores: number;
  total: number;
  food: number;
  avgAtp: number;
}

interface ResearchChartProps {
  samples: MetricSample[];
  activeScenarioName?: string;
  seed?: number;
}

export const ResearchChart: React.FC<ResearchChartProps> = ({
  samples,
  activeScenarioName = 'Default',
  seed = 1337,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    // Clear background
    ctx.fillStyle = '#0a0e1c';
    ctx.fillRect(0, 0, width, height);

    // Grid lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 1;
    const gridCols = 5;
    const gridRows = 4;

    for (let c = 1; c < gridCols; c++) {
      const x = (width / gridCols) * c;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    for (let r = 1; r < gridRows; r++) {
      const y = (height / gridRows) * r;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    if (samples.length < 2) {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Collecting real simulation metrics...', width / 2, height / 2);
      return;
    }

    // Determine max scale value
    const maxVal = Math.max(
      ...samples.map(s => Math.max(s.total, s.food / 3, 20))
    ) * 1.15;

    // Helper to draw a single metric line
    const drawLine = (
      getValue: (s: MetricSample) => number,
      color: string,
      lineWidth = 2
    ) => {
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
      ctx.beginPath();

      const stepX = width / (samples.length - 1);
      samples.forEach((sample, i) => {
        const val = getValue(sample);
        const x = i * stepX;
        const y = height - (val / maxVal) * (height - 20) - 10;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();
    };

    // Draw lines
    drawLine(s => s.food / 3, 'rgba(255, 215, 0, 0.7)', 1.5); // Yellow: Scaled Food
    drawLine(s => s.herbivores, '#4caf50', 2);                 // Green: Herbivores
    drawLine(s => s.carnivores, '#f44336', 2);                 // Red: Carnivores
    drawLine(s => s.omnivores, '#ff9800', 2);                  // Orange: Omnivores
    drawLine(s => s.total, '#00e5ff', 2.5);                     // Cyan: Total Population
  }, [samples]);

  const latest = samples[samples.length - 1] || {
    herbivores: 0,
    carnivores: 0,
    omnivores: 0,
    total: 0,
    food: 0,
    avgAtp: 0,
  };

  return (
    <div style={{
      background: 'rgba(10, 14, 28, 0.95)',
      border: '1px solid rgba(0, 229, 255, 0.3)',
      borderRadius: '8px',
      padding: '12px',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.6)',
      color: '#e0e6ed',
      fontFamily: 'Inter, system-ui, sans-serif',
      width: '100%',
      maxWidth: '460px',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
        <div>
          <span style={{ fontWeight: 700, fontSize: '14px', color: '#00e5ff' }}>POPULATION TIMELINE</span>
          <span style={{ fontSize: '11px', color: '#8892b0', marginLeft: '8px' }}>Seed: #{seed}</span>
        </div>
        <div style={{ fontSize: '11px', background: 'rgba(0, 229, 255, 0.1)', padding: '2px 8px', borderRadius: '4px', border: '1px solid rgba(0, 229, 255, 0.2)' }}>
          {activeScenarioName}
        </div>
      </div>

      <div style={{ position: 'relative', width: '100%', height: '140px', borderRadius: '4px', overflow: 'hidden', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
        <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
      </div>

      {/* Legend & Stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: '6px',
        marginTop: '10px',
        fontSize: '11px',
        textAlign: 'center',
      }}>
        <div style={{ background: 'rgba(0, 229, 255, 0.08)', padding: '4px', borderRadius: '4px', borderTop: '2px solid #00e5ff' }}>
          <div style={{ color: '#00e5ff', fontWeight: 600 }}>Total</div>
          <div style={{ fontSize: '13px', fontWeight: 700 }}>{latest.total}</div>
        </div>
        <div style={{ background: 'rgba(76, 175, 80, 0.08)', padding: '4px', borderRadius: '4px', borderTop: '2px solid #4caf50' }}>
          <div style={{ color: '#4caf50', fontWeight: 600 }}>Herb</div>
          <div style={{ fontSize: '13px', fontWeight: 700 }}>{latest.herbivores}</div>
        </div>
        <div style={{ background: 'rgba(244, 67, 54, 0.08)', padding: '4px', borderRadius: '4px', borderTop: '2px solid #f44336' }}>
          <div style={{ color: '#f44336', fontWeight: 600 }}>Carn</div>
          <div style={{ fontSize: '13px', fontWeight: 700 }}>{latest.carnivores}</div>
        </div>
        <div style={{ background: 'rgba(255, 152, 0, 0.08)', padding: '4px', borderRadius: '4px', borderTop: '2px solid #ff9800' }}>
          <div style={{ color: '#ff9800', fontWeight: 600 }}>Omni</div>
          <div style={{ fontSize: '13px', fontWeight: 700 }}>{latest.omnivores}</div>
        </div>
        <div style={{ background: 'rgba(255, 215, 0, 0.08)', padding: '4px', borderRadius: '4px', borderTop: '2px solid #ffd700' }}>
          <div style={{ color: '#ffd700', fontWeight: 600 }}>Food</div>
          <div style={{ fontSize: '13px', fontWeight: 700 }}>{latest.food}</div>
        </div>
      </div>
    </div>
  );
};
