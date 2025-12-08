
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { SEO } from '../components/SEO';
import { Download, Ruler, Printer, ZoomIn, ZoomOut, RefreshCw } from 'lucide-react';

// Types
type MountType = 'Eye' | 'Clevis' | 'Flange' | 'Trunnion' | 'Thread';
type ViewMode = 'Extended' | 'Retracted';

interface CylinderSpecs {
  bore: number;
  rod: number;
  stroke: number;
  rearMount: MountType;
  frontMount: MountType;
  portPos: 'Top' | 'Side';
  viewMode: ViewMode;
  portLabel: string;
  customClosedLength: number | null;
}

// ----------------------------------------------------------------------------
// SVG Drawing Helpers
// ----------------------------------------------------------------------------

const DimensionLine = ({ 
  x1, y1, x2, y2, 
  offset = 20, 
  text, 
  vertical = false 
}: { 
  x1: number, y1: number, x2: number, y2: number, 
  offset?: number, text: string, vertical?: boolean 
}) => {
  // Calculate label position
  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2;

  let linePath = '';
  let ext1Path = '';
  let ext2Path = '';
  let textX = 0;
  let textY = 0;
  let rotation = 0;

  if (vertical) {
    // Vertical Dimension (e.g., Diameter)
    const lineX = x1 - offset;
    linePath = `M ${lineX},${y1} L ${lineX},${y2}`;
    
    // Extension lines
    ext1Path = `M ${x1},${y1} L ${lineX - 2},${y1}`;
    ext2Path = `M ${x2},${y2} L ${lineX - 2},${y2}`;
    
    textX = lineX - 8;
    textY = midY;
    rotation = -90;
  } else {
    // Horizontal Dimension (e.g., Length)
    const lineY = y1 + offset;
    linePath = `M ${x1},${lineY} L ${x2},${lineY}`;
    
    // Extension lines
    ext1Path = `M ${x1},${y1} L ${x1},${lineY + 2}`;
    ext2Path = `M ${x2},${y2} L ${x2},${lineY + 2}`;
    
    textX = midX;
    textY = lineY + 12; // Text below line
    if (offset < 0) textY = lineY - 8; // Text above line if offset is negative
  }

  return (
    <g className="dimension">
      {/* Extension lines */}
      <path d={ext1Path} stroke="black" strokeWidth="0.5" fill="none" />
      <path d={ext2Path} stroke="black" strokeWidth="0.5" fill="none" />
      
      {/* Main Dimension Line */}
      <path 
        d={linePath} 
        stroke="black" 
        strokeWidth="0.5" 
        fill="none" 
        markerEnd="url(#arrow)" 
        markerStart="url(#arrow-start)"
      />
      
      {/* Text */}
      <text 
        x={textX} 
        y={textY} 
        textAnchor="middle" 
        dominantBaseline="middle" 
        transform={rotation ? `rotate(${rotation}, ${textX}, ${textY})` : undefined}
        className="text-[10px] font-mono fill-black"
        style={{ fontSize: '10px' }}
      >
        {text}
      </text>
    </g>
  );
};

const CenterLine = ({ x1, y1, x2, y2 }: { x1: number, y1: number, x2: number, y2: number }) => (
  <line 
    x1={x1} y1={y1} x2={x2} y2={y2} 
    stroke="#444" 
    strokeWidth="0.5" 
    strokeDasharray="10,4,2,4" 
    opacity="0.7"
  />
);

const MountDraw = ({ type, x, y, radius, length, isFront = false }: { type: MountType, x: number, y: number, radius: number, length: number, isFront?: boolean }) => {
  const dir = isFront ? -1 : 1;
  
  if (type === 'Eye' || type === 'Clevis') {
    // Engineering style Eye Mount
    // x,y is the Pin Center
    // length is distance from Pin Center to connection Face
    
    const outerR = radius;
    const innerR = radius * 0.5; // Pin hole
    const neckHeight = radius * 1.6; // Width of the rectangular neck
    const faceX = dir * length;
    
    // Dimension positioning
    const dimY = -outerR - 10;
    
    return (
      <g transform={`translate(${x}, ${y})`}>
         {/* Main Outline: Circle merged with Rectangle */}
         <path 
           d={`
             M ${0} ${-outerR}
             A ${outerR} ${outerR} 0 1 ${isFront ? 1 : 0} ${0} ${outerR}
             L ${faceX} ${neckHeight/2}
             L ${faceX} ${-neckHeight/2}
             Z
           `} 
           fill="white" 
           stroke="black" 
           strokeWidth="1.5"
           strokeLinejoin="round"
         />
         
         {/* Pin Hole */}
         <circle cx={0} cy={0} r={innerR} fill="white" stroke="black" strokeWidth="1.5" />
         
         {/* Bushing detail (concentric circle) */}
         <circle cx={0} cy={0} r={innerR * 1.15} fill="none" stroke="black" strokeWidth="0.5" />
         
         {/* Crosshair Centerlines */}
         <line x1={-outerR * 1.3} y1={0} x2={outerR * 1.3} y2={0} stroke="black" strokeWidth="0.5" strokeDasharray="5,3" />
         <line x1={0} y1={-outerR * 1.3} x2={0} y2={outerR * 1.3} stroke="black" strokeWidth="0.5" strokeDasharray="5,3" />
         
         {/* Dimensions for Eye (Standard Engineering style) */}
         <g opacity="0.8">
            {/* Radius Dimension (R) */}
            {/* If Front: Dimension points to right side of arc. If Rear: points to left side of arc. */}
            {isFront ? (
                <g>
                    <line x1={0} y1={0} x2={outerR * 0.707} y2={-outerR * 0.707} stroke="black" strokeWidth="0.5" markerEnd="url(#arrow)" />
                    <text x={outerR + 2} y={-outerR} className="text-[8px] font-mono">R{Math.round(outerR)}</text>
                </g>
            ) : (
                <g>
                    <line x1={0} y1={0} x2={-outerR * 0.707} y2={-outerR * 0.707} stroke="black" strokeWidth="0.5" markerEnd="url(#arrow)" />
                    <text x={-outerR - 18} y={-outerR} className="text-[8px] font-mono">R{Math.round(outerR)}</text>
                </g>
            )}
            
            {/* Hole Dimension (Ø) */}
            {isFront ? (
                <g>
                    {/* Front Mount: Leader goes right */}
                    <path d={`M ${innerR * 0.707} ${innerR * 0.707} L ${outerR + 10} ${outerR + 10} H ${outerR + 25}`} fill="none" stroke="black" strokeWidth="0.5" />
                    <text x={outerR + 27} y={outerR + 12} className="text-[8px] font-mono" dominantBaseline="middle">Ø{Math.round(innerR * 2)}</text>
                </g>
            ) : (
                <g>
                    {/* Rear Mount: Leader goes left */}
                    <path d={`M ${-innerR * 0.707} ${-innerR * 0.707} L ${-outerR - 10} ${-outerR - 10} H ${-outerR - 25}`} fill="none" stroke="black" strokeWidth="0.5" />
                    <text x={-outerR - 45} y={-outerR - 8} className="text-[8px] font-mono" dominantBaseline="middle">Ø{Math.round(innerR * 2)}</text>
                </g>
            )}
         </g>
      </g>
    );
  }

  if (type === 'Flange') {
    const flangeH = radius * 2.5;
    const flangeW = 15;
    
    // Rear Flange: Attaches to the right of x (cylinder body starts at x)
    // Front Flange: Attaches to the left of x (cylinder body ends at x)
    
    const rectX = isFront ? -flangeW : 0;

    return (
      <g transform={`translate(${x}, ${y})`}>
        <rect x={rectX} y={-flangeH/2} width={flangeW} height={flangeH} fill="white" stroke="black" strokeWidth="1.5" />
        {/* Bolt Holes */}
        <circle cx={rectX + flangeW/2} cy={-flangeH/2 + 10} r={3} fill="white" stroke="black" strokeWidth="0.5" />
        <circle cx={rectX + flangeW/2} cy={flangeH/2 - 10} r={3} fill="white" stroke="black" strokeWidth="0.5" />
      </g>
    );
  }

  if (type === 'Thread') {
    const tLen = length;
    const tH = radius * 0.8;
    return (
      <g transform={`translate(${x}, ${y})`}>
        <rect x={isFront ? -tLen : 0} y={-tH/2} width={tLen} height={tH} fill="white" stroke="black" strokeWidth="1.5" />
        {/* Thread lines schematic */}
        <line x1={isFront ? -tLen : 0} y1={-tH/2 + 2} x2={isFront ? 0 : tLen} y2={-tH/2 + 2} stroke="black" strokeWidth="0.5" />
        <line x1={isFront ? -tLen : 0} y1={tH/2 - 2} x2={isFront ? 0 : tLen} y2={tH/2 - 2} stroke="black" strokeWidth="0.5" />
        <text x={isFront ? -tLen/2 : tLen/2} y={-tH/2 - 5} textAnchor="middle" className="text-[8px] font-mono">M{Math.round(tH)}</text>
      </g>
    );
  }

  if (type === 'Trunnion') {
    const tLen = 20;
    const tH = radius * 3.0; // Pins sticking out
    return (
      <g transform={`translate(${x}, ${y})`}>
         <rect x={isFront ? 0 : -tLen} y={-radius} width={tLen} height={radius*2} fill="white" stroke="black" strokeWidth="1.5" />
         {/* Pins */}
         <rect x={isFront ? 5 : -tLen + 5} y={-tH/2} width={10} height={tH} fill="white" stroke="black" strokeWidth="1" />
      </g>
    );
  }

  return null;
};

const PortDraw = ({ x, y, size, label }: { x: number, y: number, size: number, label: string }) => (
   <g transform={`translate(${x}, ${y})`}>
     {/* Spot face / Outer rim */}
     <circle cx={0} cy={0} r={size} fill="white" stroke="black" strokeWidth="0.5" />
     {/* Thread Major Dia (Thin, broken 3/4 circle for thread convention) */}
     <path d={`M ${size*0.8} 0 A ${size*0.8} ${size*0.8} 0 1 1 0 ${-size*0.8}`} fill="none" stroke="black" strokeWidth="0.5" />
     {/* Thread Minor Dia (Solid thick) */}
     <circle cx={0} cy={0} r={size * 0.65} fill="none" stroke="black" strokeWidth="1" />
     
     {/* Center mark */}
     <line x1={-size*0.3} y1={0} x2={size*0.3} y2={0} stroke="black" strokeWidth="0.5" />
     <line x1={0} y1={-size*0.3} x2={0} y2={size*0.3} stroke="black" strokeWidth="0.5" />

     {/* Leader Line for Label */}
     <g>
        <path d={`M ${size*0.5} ${-size*0.5} L ${size + 15} ${-size - 15} H ${size + 40}`} fill="none" stroke="black" strokeWidth="0.5" />
        <text x={size + 42} y={-size - 15} dominantBaseline="middle" className="text-[10px] font-mono">{label}</text>
     </g>
   </g>
);


// ----------------------------------------------------------------------------
// Components
// ----------------------------------------------------------------------------

const SliderControl = ({ label, value, onChange, min, max, step = 1, suffix = "mm" }: { label: string, value: number, onChange: (val: number) => void, min: number, max: number, step?: number, suffix?: string }) => (
  <div className="mb-6">
     <div className="flex justify-between items-center mb-2">
        <label className="text-sm font-bold text-gray-700">{label}</label>
        <div className="flex items-center gap-2">
            <input 
               type="number" 
               value={value}
               onChange={(e) => {
                   const val = parseFloat(e.target.value);
                   if (!isNaN(val)) onChange(Math.max(min, Math.min(max, val)));
               }}
               className="w-20 text-right p-1.5 border border-gray-300 rounded-md text-sm font-mono focus:ring-2 focus:ring-primary outline-none transition-all"
               min={min} max={max}
            />
            <span className="text-xs font-bold text-gray-400 w-6">{suffix}</span>
        </div>
     </div>
     <div className="relative h-6 flex items-center">
        <input 
            type="range" 
            min={min} 
            max={max} 
            step={step}
            value={value}
            onChange={(e) => onChange(parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary hover:accent-primary-light z-10 relative"
        />
     </div>
     <div className="flex justify-between text-[10px] uppercase font-bold text-gray-400 mt-1 tracking-wider">
        <span>{min}</span>
        <span>{max}</span>
     </div>
  </div>
);


// ----------------------------------------------------------------------------
// Main Component
// ----------------------------------------------------------------------------

export const CylinderDesigner2D: React.FC = () => {
  const [specs, setSpecs] = useState<CylinderSpecs>({
    bore: 80,
    rod: 45,
    stroke: 400,
    rearMount: 'Eye',
    frontMount: 'Eye',
    portPos: 'Top',
    viewMode: 'Retracted',
    portLabel: 'G 1/2"',
    customClosedLength: null
  });

  const [zoom, setZoom] = useState(1);
  const svgRef = useRef<SVGSVGElement>(null);

  // Constants for drawing logic (in SVG units = mm)
  const WALL_THICKNESS = 10;
  
  // Calculated Dimensions
  const barrelOuterDia = specs.bore + (WALL_THICKNESS * 2);
  
  // Determine radii for mounts
  const rearMountRadius = barrelOuterDia / 2;
  const frontMountRadius = Math.max(specs.rod, barrelOuterDia * 0.4);

  // Mount Offsets
  const getMountOffset = (type: MountType, radius: number) => {
     if (type === 'Flange') return 15;
     if (type === 'Thread') return 30;
     return radius * 1.5; 
  };

  const rearOffset = getMountOffset(specs.rearMount, rearMountRadius);
  const frontOffset = getMountOffset(specs.frontMount, frontMountRadius);
  
  // Length Calculation Logic
  // Default (calculated) Closed Length = rearOffset + barrelLength + frontOffset
  // If user provides customClosedLength (L), we need to derive barrelLength from it.
  
  let barrelLength = 0;
  let retractedLength = 0;
  const MIN_PISTON_LENGTH = 60; // Internal mechanical requirement

  if (specs.customClosedLength) {
      retractedLength = specs.customClosedLength;
      // Reverse calculate barrel length
      // L = rearOffset + barrel + frontOffset => barrel = L - rear - front
      barrelLength = retractedLength - rearOffset - frontOffset;
      
      // Validation: Barrel must be at least Stroke + Piston
      const minBarrel = specs.stroke + MIN_PISTON_LENGTH;
      if (barrelLength < minBarrel) {
          // If custom length is physically impossible, force minimum valid length
          barrelLength = minBarrel;
          retractedLength = rearOffset + barrelLength + frontOffset;
      }
  } else {
      // Default calculation
      barrelLength = specs.stroke + MIN_PISTON_LENGTH; 
      retractedLength = rearOffset + barrelLength + frontOffset;
  }

  const currentLength = specs.viewMode === 'Retracted' ? retractedLength : retractedLength + specs.stroke;
  
  // SHEET LAYOUT CALCULATION (16:9)
  const minMarginX = 100;
  const minMarginY = 150;
  
  const requiredContentWidth = currentLength + (minMarginX * 2);
  const requiredContentHeight = (barrelOuterDia * 3) + (minMarginY * 2);
  const aspectRatio = 16 / 9;
  
  let sheetWidth = requiredContentWidth;
  let sheetHeight = sheetWidth / aspectRatio;
  
  if (sheetHeight < requiredContentHeight) {
      sheetHeight = requiredContentHeight;
      sheetWidth = sheetHeight * aspectRatio;
  }

  // Centering logic
  const startX = (sheetWidth - currentLength) / 2;
  const centerY = sheetHeight / 2;
  
  // Positions
  const barrelStart = startX + rearOffset;
  const barrelEnd = barrelStart + barrelLength;
  const rodEndAnchor = startX + currentLength; 
  const rodConnectX = rodEndAnchor - (['Eye', 'Clevis'].includes(specs.frontMount) ? frontOffset : 0);

  // Title Block Position
  const titleBlockWidth = 250;
  const titleBlockHeight = 100;
  const titleBlockX = sheetWidth - (sheetWidth * 0.05) - titleBlockWidth;
  const titleBlockY = sheetHeight - (sheetHeight * 0.05) - titleBlockHeight;
  
  // Ports
  const portSize = 12;
  const portDist = 45; 
  
  const handleBoreChange = (newBore: number) => {
      let newRod = specs.rod;
      if (newRod >= newBore - 10) {
          newRod = Math.max(10, newBore - 10);
      }
      setSpecs({...specs, bore: newBore, rod: newRod});
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    if(!svgRef.current) return;
    const svgData = new XMLSerializer().serializeToString(svgRef.current);
    const blob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `cylinder_${specs.bore}x${specs.rod}x${specs.stroke}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <SEO 
        title="2D Cylinder Designer" 
        description="Generate technical engineering drawings of hydraulic cylinders online. Configure bore, stroke, and mounts."
        keywords={['2D CAD', 'Hydraulic Cylinder Drawing', 'Engineering Draft', 'Blueprint Generator']}
      />

      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .print-content, .print-content * {
            visibility: visible;
          }
          .print-content {
            position: fixed;
            left: 0;
            top: 0;
            width: 100vw !important;
            height: 100vh !important;
            transform: none !important;
            z-index: 99999;
            background: white;
            margin: 0 !important;
            padding: 0 !important;
            box-shadow: none !important;
            border: none !important;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .print-content svg {
             width: 100%;
             height: 100%;
             max-height: 100vh;
          }
          /* Hide scrollbars */
          ::-webkit-scrollbar {
              display: none;
          }
        }
      `}</style>

      <div className="flex flex-col lg:flex-row h-[calc(100vh-80px)] overflow-hidden bg-gray-50">
        
        {/* --- LEFT SIDEBAR: CONTROLS --- */}
        <div className="w-full lg:w-80 bg-white border-r border-gray-200 overflow-y-auto p-6 z-10 shadow-lg print:hidden">
            <h1 className="text-xl font-bold text-primary mb-6 flex items-center gap-2">
                <Ruler className="text-accent" /> Cylinder Designer
            </h1>

            <div className="space-y-6">
                
                {/* Dimensions */}
                <div className="space-y-4">
                    <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Dimensions (mm)</h3>
                    
                    <SliderControl 
                        label="Bore Diameter (Ø)" 
                        value={specs.bore} 
                        onChange={handleBoreChange} 
                        min={30} 
                        max={300} 
                        step={5}
                    />

                    <SliderControl 
                        label="Rod Diameter (Ø)" 
                        value={specs.rod} 
                        onChange={(v) => setSpecs({...specs, rod: v})} 
                        min={10} 
                        max={Math.max(10, specs.bore - 10)} 
                        step={5}
                    />

                    <SliderControl 
                        label="Stroke Length" 
                        value={specs.stroke} 
                        onChange={(v) => setSpecs({...specs, stroke: v})} 
                        min={50} 
                        max={2000} 
                        step={10}
                    />

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Closed Length (L)</label>
                        <div className="flex items-center gap-2">
                            <input 
                                type="number" 
                                value={specs.customClosedLength ?? ''}
                                placeholder={retractedLength.toFixed(1)}
                                onChange={(e) => {
                                    const val = parseFloat(e.target.value);
                                    setSpecs({...specs, customClosedLength: isNaN(val) ? null : val});
                                }}
                                className="w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-primary outline-none"
                            />
                            <span className="text-xs font-bold text-gray-400">mm</span>
                        </div>
                        <p className="text-[10px] text-gray-400 mt-1">Leave empty for auto-calculation</p>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Port Size / Thread</label>
                        <input 
                            type="text" 
                            value={specs.portLabel}
                            onChange={(e) => setSpecs({...specs, portLabel: e.target.value})}
                            className="w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-primary outline-none"
                        />
                    </div>
                </div>

                <hr className="border-gray-100" />

                {/* Mountings */}
                <div className="space-y-4">
                    <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Mountings</h3>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Rear Mount (Cap)</label>
                        <select 
                            value={specs.rearMount} 
                            onChange={(e) => setSpecs({...specs, rearMount: e.target.value as MountType})}
                            className="w-full p-2 border rounded bg-gray-50"
                        >
                            {['Eye', 'Clevis', 'Flange', 'Trunnion', 'Thread'].map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Front Mount (Rod)</label>
                        <select 
                            value={specs.frontMount} 
                            onChange={(e) => setSpecs({...specs, frontMount: e.target.value as MountType})}
                            className="w-full p-2 border rounded bg-gray-50"
                        >
                            {['Eye', 'Clevis', 'Flange', 'Thread'].map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                    </div>
                </div>

                <hr className="border-gray-100" />

                {/* View Options */}
                <div className="space-y-4">
                    <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Visualization</h3>
                    <div className="flex bg-gray-100 p-1 rounded-lg">
                        <button 
                            className={`flex-1 py-1 text-sm rounded-md transition-colors ${specs.viewMode === 'Retracted' ? 'bg-white shadow text-primary font-bold' : 'text-gray-500 hover:text-gray-700'}`}
                            onClick={() => setSpecs({...specs, viewMode: 'Retracted'})}
                        >
                            Retracted
                        </button>
                        <button 
                            className={`flex-1 py-1 text-sm rounded-md transition-colors ${specs.viewMode === 'Extended' ? 'bg-white shadow text-primary font-bold' : 'text-gray-500 hover:text-gray-700'}`}
                            onClick={() => setSpecs({...specs, viewMode: 'Extended'})}
                        >
                            Extended
                        </button>
                    </div>
                </div>

                <button 
                    onClick={handleDownload}
                    className="w-full bg-primary text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-primary-dark transition-colors shadow-md"
                >
                    <Download size={18} /> Download DXF/SVG
                </button>
            </div>
        </div>

        {/* --- RIGHT PANEL: BLUEPRINT AREA --- */}
        <div className="flex-1 relative bg-white flex flex-col h-full overflow-hidden">
            
            {/* Toolbar */}
            <div className="absolute top-4 right-4 flex gap-2 bg-white shadow-md rounded-lg p-2 z-20 border border-gray-100 print:hidden">
                <button onClick={() => setZoom(z => Math.max(0.5, z - 0.1))} className="p-2 hover:bg-gray-100 rounded text-gray-600" title="Zoom Out"><ZoomOut size={20} /></button>
                <button onClick={() => setZoom(1)} className="p-2 hover:bg-gray-100 rounded text-gray-600" title="Reset"><RefreshCw size={20} /></button>
                <button onClick={() => setZoom(z => Math.min(3, z + 0.1))} className="p-2 hover:bg-gray-100 rounded text-gray-600" title="Zoom In"><ZoomIn size={20} /></button>
                <div className="w-px bg-gray-200 mx-1"></div>
                <button onClick={handlePrint} className="p-2 hover:bg-primary hover:text-white rounded text-gray-600 transition-colors" title="Print"><Printer size={20} /></button>
            </div>

            {/* Drawing Canvas */}
            <div className="flex-1 overflow-auto flex items-center justify-center bg-[#fcfcfc] cursor-grab active:cursor-grabbing p-10 print:p-0 print:block print:overflow-visible">
                <div 
                    className="bg-white shadow-2xl border border-gray-200 transition-transform duration-200 ease-out origin-center print-content"
                    style={{ 
                        transform: `scale(${zoom})`,
                        width: '100%',
                        maxWidth: '1200px',
                        aspectRatio: '16/9'
                    }}
                >
                    <svg 
                        ref={svgRef}
                        viewBox={`0 0 ${sheetWidth} ${sheetHeight}`} 
                        className="w-full h-full"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <defs>
                            {/* Arrow Marker */}
                            <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                                <path d="M0,0 L0,6 L9,3 z" fill="#000" />
                            </marker>
                            <marker id="arrow-start" markerWidth="10" markerHeight="10" refX="0" refY="3" orient="auto" markerUnits="strokeWidth">
                                <path d="M9,0 L9,6 L0,3 z" fill="#000" />
                            </marker>
                            {/* Hatch Pattern */}
                            <pattern id="hatch" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                                <line x1="0" y1="0" x2="0" y2="10" stroke="#eee" strokeWidth="1" />
                            </pattern>
                        </defs>

                        {/* Title Block (Simple) - Positioned relative to drawing, usually centered above */}
                        <text 
                            x={startX + currentLength/2} 
                            y={centerY - barrelOuterDia - 100} 
                            textAnchor="middle"
                            className="text-2xl font-bold fill-primary font-sans" 
                            style={{fontSize: '32px', fontWeight: 'bold'}}
                        >
                           HYDROFORCE ENGINEERING
                        </text>

                        {/* --- THE DRAWING --- */}
                        <g>
                            {/* Centerline */}
                            <CenterLine x1={startX - 50} y1={centerY} x2={rodEndAnchor + 50} y2={centerY} />

                            {/* Rear Mount (Anchor at startX) */}
                            <MountDraw 
                                type={specs.rearMount} 
                                x={startX} 
                                y={centerY} 
                                radius={rearMountRadius} 
                                length={rearOffset} 
                            />

                            {/* Barrel */}
                            <g transform={`translate(${barrelStart}, ${centerY - barrelOuterDia/2})`}>
                                <rect 
                                    x={0} y={0} 
                                    width={barrelLength} height={barrelOuterDia} 
                                    fill="white" stroke="black" strokeWidth="1.5"
                                />
                                
                                {/* Rear Port with Label & Dimension */}
                                <PortDraw x={portDist} y={barrelOuterDia / 2} size={portSize} label={specs.portLabel} />
                                <DimensionLine 
                                    x1={0} y1={0} 
                                    x2={portDist} y2={0} 
                                    offset={-20} 
                                    text={`${portDist}`} 
                                />

                                {/* Front Port with Label & Dimension */}
                                <PortDraw x={barrelLength - portDist} y={barrelOuterDia / 2} size={portSize} label={specs.portLabel} />
                                <DimensionLine 
                                    x1={barrelLength - portDist} y1={0} 
                                    x2={barrelLength} y2={0} 
                                    offset={-20} 
                                    text={`${portDist}`} 
                                />
                                
                                {/* Bore Diameter Dimension */}
                                <DimensionLine 
                                    x1={barrelLength/3} y1={0} 
                                    x2={barrelLength/3} y2={barrelOuterDia} 
                                    vertical 
                                    text={`Ø${specs.bore}`} 
                                />
                            </g>

                            {/* Piston Rod (Visible Part) */}
                            {/* Rod starts inside barrel and extends to rodConnectX */}
                            {(() => {
                                const rodVisibleStart = barrelEnd;
                                return (
                                    <g>
                                        <rect 
                                            x={rodVisibleStart} 
                                            y={centerY - specs.rod/2} 
                                            width={Math.max(0, rodConnectX - rodVisibleStart)} 
                                            height={specs.rod} 
                                            fill="url(#hatch)" stroke="black" strokeWidth="1"
                                        />
                                        {/* Rod Diameter Dimension */}
                                        <DimensionLine 
                                            x1={rodVisibleStart + 20} y1={centerY - specs.rod/2} 
                                            x2={rodVisibleStart + 20} y2={centerY + specs.rod/2} 
                                            vertical 
                                            text={`Ø${specs.rod}`} 
                                        />
                                    </g>
                                );
                            })()}

                            {/* Front Mount (Anchor at rodEndAnchor) */}
                            <MountDraw 
                                type={specs.frontMount} 
                                x={rodEndAnchor} 
                                y={centerY} 
                                radius={frontMountRadius} 
                                length={frontOffset} 
                                isFront
                            />

                            {/* Stroke Dimension (Above) */}
                            {specs.viewMode === 'Extended' && (
                                <DimensionLine 
                                    x1={barrelEnd} 
                                    y1={centerY - barrelOuterDia/2 - 60} 
                                    x2={rodConnectX} 
                                    y2={centerY - barrelOuterDia/2 - 60} 
                                    offset={-20}
                                    text={`Stroke = ${specs.stroke} mm`} 
                                />
                            )}
                            
                            {/* Retracted Length (Below) */}
                            {specs.viewMode === 'Retracted' && (
                                <DimensionLine 
                                    x1={startX} 
                                    y1={centerY + barrelOuterDia/2 + 20} 
                                    x2={rodEndAnchor} 
                                    y2={centerY + barrelOuterDia/2 + 20} 
                                    offset={20}
                                    text={`L = ${retractedLength} mm`} 
                                />
                            )}
                            
                            {/* Total Extended Length (Below) */}
                             {specs.viewMode === 'Extended' && (
                                <DimensionLine 
                                    x1={startX} 
                                    y1={centerY + barrelOuterDia/2 + 40} 
                                    x2={rodEndAnchor} 
                                    y2={centerY + barrelOuterDia/2 + 40} 
                                    offset={20}
                                    text={`L = ${retractedLength + specs.stroke} mm`} 
                                />
                            )}
                        </g>

                        {/* --- Title Block Table (Bottom Right) --- */}
                        <g transform={`translate(${titleBlockX}, ${titleBlockY})`}>
                            {/* Outer Border */}
                            <rect x="0" y="0" width={titleBlockWidth} height={titleBlockHeight} fill="none" stroke="black" strokeWidth="1.5" />
                            
                            {/* Horizontal Divider */}
                            <line x1="0" y1="50" x2={titleBlockWidth} y2="50" stroke="black" strokeWidth="1" />
                            
                            {/* Vertical Divider (Top Half) */}
                            <line x1={titleBlockWidth * 0.7} y1="0" x2={titleBlockWidth * 0.7} y2="50" stroke="black" strokeWidth="1" />
                            
                            {/* Data Fields */}
                            <g transform="translate(10, 20)">
                                <text className="text-[10px] font-sans" style={{fontSize: '10px'}}>DATE: {new Date().toLocaleDateString()}</text>
                                <text y="20" className="text-[10px] font-sans" style={{fontSize: '10px'}}>SCALE: NTS</text>
                            </g>
                            
                            {/* Serial Number (Top Right Cell) */}
                            <text 
                                x={titleBlockWidth * 0.85} 
                                y="30" 
                                textAnchor="middle" 
                                className="font-bold font-mono" 
                                style={{fontSize: '16px'}}
                            >
                                HC-{specs.bore}-{specs.rod}
                            </text>

                            {/* Company Name (Bottom Cell) */}
                            <text 
                                x={titleBlockWidth / 2} 
                                y="80" 
                                textAnchor="middle" 
                                className="font-sans text-sm"
                                style={{fontSize: '14px'}}
                            >
                                HYDROFORCE ENGINEERING
                            </text>
                        </g>

                    </svg>
                </div>
            </div>
        </div>
      </div>
    </>
  );
};
