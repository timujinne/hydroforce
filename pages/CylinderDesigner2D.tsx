
import React, { useState, useMemo, useRef } from 'react';
import { SEO } from '../components/SEO';
import { Download, Ruler, Printer, ZoomIn, ZoomOut, RefreshCw, Tag, Anchor, Settings2, Maximize2 } from 'lucide-react';

// Types
type MountType = 'Hole' | 'Point' | 'Fork' | 'Flange' | 'Trunnion' | 'Thread';

interface CylinderSpecs {
  bore: number;
  rod: number;
  stroke: number;
  rearMount: MountType;
  frontMount: MountType;
  portPos: 'Top' | 'Side';
  portLabel: string;
  productLabel: string;
  customClosedLength: number | null;
  pinDia: number;
  eyeDia: number;
}

// ----------------------------------------------------------------------------
// SVG Drawing Helpers
// ----------------------------------------------------------------------------

const DimensionLine = ({ 
  x1, y1, x2, y2, 
  offset = 20, 
  text, 
  vertical = false,
  color = "black",
  textColor = "black"
}: { 
  x1: number, y1: number, x2: number, y2: number, 
  offset?: number, text: string, vertical?: boolean,
  color?: string, textColor?: string
}) => {
  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2;

  let linePath = '';
  let ext1Path = '';
  let ext2Path = '';
  let textX = 0;
  let textY = 0;
  let rotation = 0;

  // Overshoot for extension lines past the dimension arrow
  const overshoot = offset > 0 ? 5 : -5;

  if (vertical) {
    const lineX = x1 + offset;
    linePath = `M ${lineX},${y1} L ${lineX},${y2}`;
    // Extension lines from the part to the dimension line + overshoot
    ext1Path = `M ${x1},${y1} L ${lineX + overshoot},${y1}`;
    ext2Path = `M ${x2},${y2} L ${lineX + overshoot},${y2}`;
    textX = lineX + (offset > 0 ? 12 : -12);
    textY = midY;
    rotation = -90;
  } else {
    const lineY = y1 + offset;
    linePath = `M ${x1},${lineY} L ${x2},${lineY}`;
    // Extension lines from the part to the dimension line + overshoot
    ext1Path = `M ${x1},${y1} L ${x1},${lineY + overshoot}`;
    ext2Path = `M ${x2},${y2} L ${x2},${lineY + overshoot}`;
    textX = midX;
    textY = offset < 0 ? lineY - 10 : lineY + 15;
  }

  return (
    <g className="dimension transition-all duration-300">
      <path d={ext1Path} stroke={color} strokeWidth="0.5" fill="none" opacity="0.8" />
      <path d={ext2Path} stroke={color} strokeWidth="0.5" fill="none" opacity="0.8" />
      <path 
        d={linePath} 
        stroke={color} 
        strokeWidth="0.8" 
        fill="none" 
        markerEnd={`url(#arrow-${color === 'red' ? 'red' : 'black'})`} 
        markerStart={`url(#arrow-start-${color === 'red' ? 'red' : 'black'})`}
      />
      <rect 
        x={textX - (text.length * 4)} 
        y={textY - 7} 
        width={text.length * 8} 
        height={14} 
        fill="white" 
        opacity="0.9"
        transform={rotation ? `rotate(${rotation}, ${textX}, ${textY})` : undefined}
      />
      <text 
        x={textX} 
        y={textY} 
        textAnchor="middle" 
        dominantBaseline="middle" 
        transform={rotation ? `rotate(${rotation}, ${textX}, ${textY})` : undefined}
        className="text-[12px] font-mono font-bold"
        fill={textColor}
      >
        {text}
      </text>
    </g>
  );
};

const SectionHatch = ({ x, y, width, height }: { x: number, y: number, width: number, height: number }) => (
  <rect x={x} y={y} width={width} height={height} fill="url(#hatch-section)" stroke="black" strokeWidth="0.5" />
);

const MountDraw = ({ type, x, y, radius, pinRadius, length, isFront = false }: { type: MountType, x: number, y: number, radius: number, pinRadius: number, length: number, isFront?: boolean }) => {
  const dir = isFront ? -1 : 1;
  
  if (type === 'Hole' || type === 'Point' || type === 'Fork') {
    const outerR = radius;
    const innerR = pinRadius;
    const neckHeight = radius * 2.0; 
    const faceX = dir * length;
    
    return (
      <g transform={`translate(${x}, ${y})`}>
         {/* Housing Body Boundary */}
         {type === 'Hole' ? (
            <path 
              d={`M ${dir * outerR} ${-outerR} L ${dir * -outerR} ${-outerR} L ${dir * -outerR} ${outerR} L ${dir * outerR} ${outerR} L ${faceX} ${outerR} L ${faceX} ${-outerR} Z`} 
              fill="#f0f0f0" stroke="black" strokeWidth="1.5" strokeLinejoin="round"
            />
         ) : (
            <path 
              d={`M 0 ${-outerR} A ${outerR} ${outerR} 0 1 ${isFront ? 1 : 0} 0 ${outerR} L ${faceX} ${neckHeight/2} L ${faceX} ${-neckHeight/2} Z`} 
              fill="#f0f0f0" stroke="black" strokeWidth="1.5" strokeLinejoin="round"
            />
         )}
         
         {type === 'Fork' && (
           <>
             <line x1={0} y1={-innerR * 1.2} x2={faceX} y2={-innerR * 1.2} stroke="black" strokeWidth="0.8" />
             <line x1={0} y1={innerR * 1.2} x2={faceX} y2={innerR * 1.2} stroke="black" strokeWidth="0.8" />
           </>
         )}

         {/* Internal Pin Hole */}
         <circle cx={0} cy={0} r={innerR} fill="white" stroke="black" strokeWidth="1.5" />
         
         {/* Pin Centerlines */}
         <line x1={-outerR * 1.2} y1={0} x2={outerR * 1.2} y2={0} stroke="#666" strokeWidth="0.5" strokeDasharray="5,2,1,2" />
         <line x1={0} y1={-outerR * 1.2} x2={0} y2={outerR * 1.2} stroke="#666" strokeWidth="0.5" strokeDasharray="5,2,1,2" />
      </g>
    );
  }
  if (type === 'Flange') {
    const flangeH = radius * 2.2;
    const flangeW = 18;
    const rectX = isFront ? -flangeW : 0;
    return (
      <g transform={`translate(${x}, ${y})`}>
        <rect x={rectX} y={-flangeH/2} width={flangeW} height={flangeH} fill="#f0f0f0" stroke="black" strokeWidth="1.5" />
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
        <line x1={isFront ? -tLen : 0} y1={-tH/2 + 2} x2={isFront ? 0 : tLen} y2={-tH/2 + 2} stroke="black" strokeWidth="0.5" />
        <line x1={isFront ? -tLen : 0} y1={tH/2 - 2} x2={isFront ? 0 : tLen} y2={tH/2 - 2} stroke="black" strokeWidth="0.5" />
      </g>
    );
  }
  if (type === 'Trunnion') {
    const tLen = 40;
    const tH = radius * 2.8;
    const pinW = 16;
    const blockH = radius * 2;
    return (
      <g transform={`translate(${x}, ${y})`}>
         <rect x={-tLen/2} y={-blockH/2} width={tLen} height={blockH} fill="#f0f0f0" stroke="black" strokeWidth="1.5" />
         <rect x={-pinW/2} y={-tH/2} width={pinW} height={(tH - blockH)/2 + 2} fill="#f0f0f0" stroke="black" strokeWidth="1" />
         <rect x={-pinW/2} y={blockH/2 - 2} width={pinW} height={(tH - blockH)/2 + 2} fill="#f0f0f0" stroke="black" strokeWidth="1" />
      </g>
    );
  }
  return null;
};

const SliderControl = ({ label, value, onChange, min, max, step = 1, suffix = "mm" }: { label: string, value: number, onChange: (val: number) => void, min: number, max: number, step?: number, suffix?: string }) => (
  <div className="mb-6">
     <div className="flex justify-between items-center mb-2">
        <label className="text-sm font-bold text-gray-700 dark:text-gray-300">{label}</label>
        <div className="flex items-center gap-2">
            <input 
               type="number" 
               value={value}
               onChange={(e) => {
                   const val = parseFloat(e.target.value);
                   if (!isNaN(val)) onChange(Math.max(min, Math.min(max, val)));
               }}
               className="w-20 text-right p-1.5 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-md text-sm font-mono focus:ring-2 focus:ring-primary outline-none transition-all shadow-sm"
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
            className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary hover:accent-primary-light z-10 relative"
        />
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
    rearMount: 'Hole',
    frontMount: 'Hole',
    portPos: 'Top',
    portLabel: 'G 1/2"',
    productLabel: 'HC-80-400',
    customClosedLength: null,
    pinDia: 30.5,
    eyeDia: 55
  });

  const [extension, setExtension] = useState(0); // 0-100%
  const [zoom, setZoom] = useState(1);
  const svgRef = useRef<SVGSVGElement>(null);

  // Constants
  const WALL_THICKNESS = 10;
  const PISTON_LENGTH = 80;
  const END_CAP_THICKNESS = 40;
  const GLAND_THICKNESS = 45;
  const ROD_EXTENSION_WHEN_RETRACTED = 22;

  // Mounting Geometry
  const rearMountVisualRadius = specs.eyeDia / 2;
  const frontMountVisualRadius = specs.eyeDia / 2;

  const getMountOffset = (type: MountType, radius: number) => {
     if (type === 'Flange') return 18;
     if (type === 'Thread') return 35;
     if (type === 'Trunnion') return 25;
     return radius * 1.5; 
  };

  const rearOffset = getMountOffset(specs.rearMount, rearMountVisualRadius);
  const frontOffset = getMountOffset(specs.frontMount, frontMountVisualRadius);
  
  // Logical chamber length = Piston + Stroke
  const chamberLength = PISTON_LENGTH + specs.stroke;
  // Total barrel length including end pieces
  const defaultBarrelLength = chamberLength + END_CAP_THICKNESS + GLAND_THICKNESS;
  
  // Base retracted length center-to-center
  const defaultRetractedLength = rearOffset + defaultBarrelLength + frontOffset;

  let retractedLength = defaultRetractedLength;
  if (specs.customClosedLength !== null && specs.customClosedLength > defaultRetractedLength) {
      retractedLength = specs.customClosedLength;
  }

  // Visualization Setup
  const sheetWidth = 1400;
  const sheetHeight = 800;
  
  const currentExtensionMm = specs.stroke * (extension / 100);

  const barrelOuterDia = specs.bore + (WALL_THICKNESS * 2);
  const totalVisLength = retractedLength + currentExtensionMm + ROD_EXTENSION_WHEN_RETRACTED;
  const startX = (sheetWidth - totalVisLength) / 2;
  const centerY = sheetHeight / 2;

  const centerRear = startX;
  const centerFront = startX + retractedLength + currentExtensionMm;
  
  const barrelStart = centerRear + rearOffset;
  const barrelEnd = barrelStart + defaultBarrelLength;
  
  const chamberStart = barrelStart + END_CAP_THICKNESS;
  const chamberEnd = barrelEnd - GLAND_THICKNESS;

  const pistonStart = chamberStart + currentExtensionMm;
  const pistonEnd = pistonStart + PISTON_LENGTH;

  // Rod start point must be end of piston
  const rodStartX = pistonEnd;
  // Adjusted rod end: stops at the interface with the front mount (visual radius)
  const rodEndX = centerFront - frontMountVisualRadius;

  // Port placement adjusted inward from edges to avoid weld seams
  const portDistFromEdge = 75;

  // Helper to calculate outermost dimensions of mounts for "General Size"
  const getMountExtremeX = (type: MountType, center: number, radius: number, length: number, isRear: boolean) => {
      // Trunnion block width is 40, so +/- 20 from center
      if (type === 'Trunnion') {
          return isRear ? center - 20 : center + 20;
      }
      
      if (isRear) {
          // Rear Mounts (Left side)
          // Holes/Points/Forks extend 'radius' left from center
          if (type === 'Hole' || type === 'Point' || type === 'Fork') {
              return center - radius;
          }
          // Flange/Thread start at center (0) and go right, so 'center' is the leftmost point
          return center;
      } else {
          // Front Mounts (Right side)
          // Visual draws mount extending to 'length' (offset) to the right from center
          return center + length;
      }
  };

  const generalStart = getMountExtremeX(specs.rearMount, centerRear, rearMountVisualRadius, rearOffset, true);
  const generalEnd = getMountExtremeX(specs.frontMount, centerFront, frontMountVisualRadius, frontOffset, false);
  const generalSize = generalEnd - generalStart;

  const handleBoreChange = (newBore: number) => {
      let newRod = specs.rod;
      if (newRod >= newBore - 10) {
          newRod = Math.max(10, newBore - 10);
      }
      setSpecs({...specs, bore: newBore, rod: newRod, productLabel: `HC-${newBore}-${specs.stroke}`});
  };

  return (
    <>
      <SEO 
        title="Engineering Draft - 2D Designer" 
        description="Generate technical section-view drawings of hydraulic cylinders. Online blueprint generator for engineering specifications."
        keywords={['2D CAD', 'Section View', 'Hydraulic Blueprint', 'Cylinder Drawing']}
      />

      <div className="flex flex-col lg:flex-row h-[calc(100vh-80px)] overflow-hidden bg-[#0e1621] dark:bg-gray-900">
        
        {/* --- SIDEBAR --- */}
        <div className="w-full lg:w-80 bg-[#162131] border-r border-white/10 overflow-y-auto p-6 z-10 shadow-lg print:hidden text-white">
            <h1 className="text-xl font-bold text-primary-light mb-6 flex items-center gap-2">
                <Ruler className="text-accent" /> Draft Refinement
            </h1>

            <div className="space-y-6">
                <div className="space-y-4">
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                        <Settings2 className="w-4 h-4" /> Component Geometry
                    </h3>
                    <SliderControl label="Bore Ø" value={specs.bore} onChange={handleBoreChange} min={30} max={300} step={5} />
                    <SliderControl label="Rod Ø" value={specs.rod} onChange={(v) => setSpecs({...specs, rod: v})} min={10} max={Math.max(10, specs.bore - 10)} step={5} />
                    <SliderControl label="Stroke" value={specs.stroke} onChange={(v) => setSpecs({...specs, stroke: v, productLabel: `HC-${specs.bore}-${v}`})} min={50} max={2000} step={10} />
                    
                    <div className="pt-2 border-t border-white/5">
                        <h4 className="text-xs font-bold text-gray-500 uppercase mb-3">Mounting Dimensions</h4>
                        <SliderControl label="Pin Ø" value={specs.pinDia} onChange={(v) => setSpecs({...specs, pinDia: v})} min={10} max={100} step={0.5} />
                        <SliderControl label="Eye Outer Ø" value={specs.eyeDia} onChange={(v) => setSpecs({...specs, eyeDia: v})} min={20} max={200} step={1} />
                    </div>

                    <div className="pt-2 border-t border-white/5">
                        <label className="block text-sm font-bold text-gray-300 mb-2">Closed Length (E)</label>
                        <div className="flex items-center gap-2">
                            <input type="number" value={specs.customClosedLength ?? ''} placeholder={retractedLength.toFixed(1)} onChange={(e) => {
                                const val = parseFloat(e.target.value);
                                setSpecs({...specs, customClosedLength: (isNaN(val) || val <= 0) ? null : val});
                            }} className="w-full p-2 border border-white/10 rounded-md text-sm bg-black/20 text-white focus:ring-2 focus:ring-primary outline-none transition-all" />
                            <span className="text-xs font-bold text-gray-500">mm</span>
                        </div>
                    </div>
                </div>

                <div className="pt-2 border-t border-white/5">
                    <h4 className="text-xs font-bold text-gray-500 uppercase mb-3 flex items-center gap-2"><Maximize2 className="w-4 h-4" /> Visualization</h4>
                    <SliderControl label="Extension" value={extension} onChange={setExtension} min={0} max={100} step={1} suffix="%" />
                </div>

                <hr className="border-white/5" />

                <div className="space-y-4">
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                        <Tag className="w-4 h-4" /> Identification
                    </h3>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Product ID</label>
                        <input type="text" value={specs.productLabel} onChange={(e) => setSpecs({...specs, productLabel: e.target.value})} className="w-full p-2 border border-white/10 rounded bg-black/20 text-white text-sm focus:ring-2 focus:ring-primary outline-none" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Port Size</label>
                        <input type="text" value={specs.portLabel} onChange={(e) => setSpecs({...specs, portLabel: e.target.value})} className="w-full p-2 border border-white/10 rounded bg-black/20 text-white text-sm focus:ring-2 focus:ring-primary outline-none" />
                    </div>
                </div>

                <hr className="border-white/5" />

                <div className="space-y-4">
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                        <Anchor className="w-4 h-4" /> Mount Types
                    </h3>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Rear Mount</label>
                        <select value={specs.rearMount} onChange={(e) => setSpecs({...specs, rearMount: e.target.value as MountType})} className="w-full p-2 border border-white/10 rounded bg-black/20 text-white text-sm focus:ring-2 focus:ring-primary outline-none">
                            {['Hole', 'Point', 'Fork', 'Flange', 'Trunnion', 'Thread'].map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Front Mount</label>
                        <select value={specs.frontMount} onChange={(e) => setSpecs({...specs, frontMount: e.target.value as MountType})} className="w-full p-2 border border-white/10 rounded bg-black/20 text-white text-sm focus:ring-2 focus:ring-primary outline-none">
                            {['Hole', 'Point', 'Fork', 'Flange', 'Thread'].map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                    </div>
                </div>

                <button onClick={() => window.print()} className="w-full bg-[#0a6a94] text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-primary-dark shadow-md transition-all active:scale-95">
                    <Printer size={18} /> Print Blueprint
                </button>
            </div>
        </div>

        {/* --- DRAWING CANVAS --- */}
        <div className="flex-1 relative bg-[#05080b] flex items-center justify-center overflow-hidden">
            <div className="absolute top-4 right-4 flex gap-2 bg-[#162131] shadow-md rounded-lg p-2 z-20 print:hidden border border-white/10">
                <button onClick={() => setZoom(z => Math.max(0.5, z - 0.1))} className="p-2 hover:bg-white/5 rounded text-gray-300"><ZoomOut size={20} /></button>
                <button onClick={() => setZoom(1)} className="p-2 hover:bg-white/5 rounded text-gray-300"><RefreshCw size={20} /></button>
                <button onClick={() => setZoom(z => Math.min(3, z + 0.1))} className="p-2 hover:bg-white/5 rounded text-gray-300"><ZoomIn size={20} /></button>
            </div>

            <div className="bg-white shadow-2xl border border-white/5 origin-center transition-transform" style={{ transform: `scale(${zoom})`, width: '1200px', height: '675px' }}>
                <svg ref={svgRef} viewBox={`0 0 ${sheetWidth} ${sheetHeight}`} className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <marker id="arrow-black" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#000" /></marker>
                        <marker id="arrow-start-black" markerWidth="10" markerHeight="10" refX="0" refY="3" orient="auto"><path d="M9,0 L9,6 L0,3 z" fill="#000" /></marker>
                        <marker id="arrow-red" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="red" /></marker>
                        <marker id="arrow-start-red" markerWidth="10" markerHeight="10" refX="0" refY="3" orient="auto"><path d="M9,0 L9,6 L0,3 z" fill="red" /></marker>
                        <pattern id="hatch-section" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="8" stroke="#333" strokeWidth="0.5" /></pattern>
                        <pattern id="hatch-rod" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)"><line x1="0" y1="0" x2="0" y2="10" stroke="#ccc" strokeWidth="2" /></pattern>
                    </defs>

                    <text x={sheetWidth / 2} y={centerY - 220} textAnchor="middle" className="text-2xl font-bold fill-[#0a6a94] uppercase tracking-widest">Hydraulic Cylinder</text>

                    <g>
                        {/* 1. Cylinder Barrel & Chamber */}
                        <SectionHatch x={barrelStart} y={centerY - barrelOuterDia/2} width={END_CAP_THICKNESS} height={barrelOuterDia} />
                        <SectionHatch x={chamberStart} y={centerY - barrelOuterDia/2} width={chamberLength} height={WALL_THICKNESS} />
                        <SectionHatch x={chamberStart} y={centerY + specs.bore/2} width={chamberLength} height={WALL_THICKNESS} />
                        <rect x={chamberStart} y={centerY - specs.bore/2} width={chamberLength} height={specs.bore} fill="none" stroke="black" strokeWidth="1" />
                        <SectionHatch x={barrelEnd - GLAND_THICKNESS} y={centerY - barrelOuterDia/2} width={GLAND_THICKNESS} height={barrelOuterDia} />
                        
                        {/* 2. Piston Geometry */}
                        <g transform={`translate(${pistonStart}, ${centerY - specs.bore/2})`}>
                            <rect x={0} y={0} width={PISTON_LENGTH} height={specs.bore} fill="white" stroke="black" strokeWidth="1.5" />
                            {/* Piston Seals */}
                            <rect x={15} y={0} width={10} height={specs.bore} fill="#333" />
                            <rect x={PISTON_LENGTH - 25} y={0} width={10} height={specs.bore} fill="#333" />
                        </g>

                        {/* 3. Rod Geometry - MUST start at pistonEnd */}
                        <rect x={rodStartX} y={centerY - specs.rod/2} width={rodEndX - rodStartX} height={specs.rod} fill="url(#hatch-rod)" stroke="black" strokeWidth="1.2" />
                        {/* Gland rod clearance hole */}
                        <rect x={barrelEnd - GLAND_THICKNESS} y={centerY - specs.rod/2 - 2} width={GLAND_THICKNESS} height={specs.rod + 4} fill="white" stroke="none" />

                        {/* 4. Details: Ports & Label */}
                        <g transform={`translate(${barrelStart + portDistFromEdge}, ${centerY - barrelOuterDia/2})`}>
                           <rect x={-10} y={-10} width={20} height={10} fill="white" stroke="black" />
                           <text x={0} y={-15} textAnchor="middle" className="text-[10px] font-bold">{specs.portLabel}</text>
                        </g>
                        <g transform={`translate(${barrelEnd - portDistFromEdge}, ${centerY - barrelOuterDia/2})`}>
                           <rect x={-10} y={-10} width={20} height={10} fill="white" stroke="black" />
                           <text x={0} y={-15} textAnchor="middle" className="text-[10px] font-bold">{specs.portLabel}</text>
                        </g>

                        <g transform={`translate(${barrelStart + defaultBarrelLength/2 - 40}, ${centerY - barrelOuterDia/2 + 2})`}>
                            <rect x={0} y={0} width={80} height={WALL_THICKNESS - 4} fill="#eee" stroke="black" strokeWidth="0.5" />
                            <text x={40} y={(WALL_THICKNESS - 4)/2} textAnchor="middle" dominantBaseline="middle" className="text-[5px] font-bold fill-gray-800 tracking-wider">HYDROFORCE • {specs.productLabel}</text>
                        </g>

                        {/* 5. Mounts */}
                        <MountDraw type={specs.rearMount} x={centerRear} y={centerY} radius={rearMountVisualRadius} pinRadius={specs.pinDia/2} length={rearOffset} />
                        {/* Front Mount flipped (isFront={false}) to orient outwards from rod end */}
                        <MountDraw type={specs.frontMount} x={centerFront} y={centerY} radius={frontMountVisualRadius} pinRadius={specs.pinDia/2} length={frontOffset} isFront={false} />

                        {/* Centerline */}
                        <line x1={centerRear - 50} y1={centerY} x2={centerFront + ROD_EXTENSION_WHEN_RETRACTED + 50} y2={centerY} stroke="#666" strokeWidth="0.5" strokeDasharray="15,4,2,4" />

                        {/* 6. DIMENSIONS (Attached directly to part boundaries) */}
                        
                        {/* General Size (Total Length) - Top Dimension */}
                        {extension === 0 && (
                            <DimensionLine 
                                x1={generalStart} 
                                y1={centerY} 
                                x2={generalEnd} 
                                y2={centerY} 
                                text={`${generalSize.toFixed(1)}`} 
                                offset={-180} 
                                color="red" 
                                textColor="red" 
                            />
                        )}

                        {/* Bore Ø - Positioned inside chamber */}
                        <DimensionLine 
                            x1={chamberStart + 180} 
                            y1={centerY - specs.bore/2} 
                            x2={chamberStart + 180} 
                            y2={centerY + specs.bore/2} 
                            vertical 
                            text={`${specs.bore.toFixed(1)}`} 
                            offset={-50} 
                            color="red" 
                            textColor="red" 
                        />

                        {/* Rod Ø - Positioned on the rod shaft */}
                        <DimensionLine 
                            x1={rodStartX + (rodEndX - rodStartX) * 0.75} 
                            y1={centerY - specs.rod/2} 
                            x2={rodStartX + (rodEndX - rodStartX) * 0.75} 
                            y2={centerY + specs.rod/2} 
                            vertical 
                            text={`${specs.rod.toFixed(1)}`} 
                            offset={25} 
                            color="red" 
                            textColor="red" 
                        />

                        {/* Outer Barrel Ø */}
                        <DimensionLine 
                            x1={barrelStart + defaultBarrelLength/2} 
                            y1={centerY - barrelOuterDia/2} 
                            x2={barrelStart + defaultBarrelLength/2} 
                            y2={centerY + barrelOuterDia/2} 
                            vertical 
                            text={`${barrelOuterDia.toFixed(1)}`} 
                            offset={80} 
                        />

                        {/* Stroke (Static Capacity Measurement) */}
                        {extension === 0 && (
                            <DimensionLine 
                                x1={chamberStart + PISTON_LENGTH} 
                                y1={centerY + specs.bore/2} 
                                x2={chamberEnd} 
                                y2={centerY + specs.bore/2} 
                                text={`${specs.stroke.toFixed(0)}`} 
                                offset={50} 
                                color="red" 
                                textColor="red" 
                            />
                        )}

                        {/* Current Length (Center-to-Center) */}
                        {extension === 0 && (
                            <DimensionLine 
                                x1={centerRear} 
                                y1={centerY} 
                                x2={centerFront} 
                                y2={centerY} 
                                text={`${(retractedLength + currentExtensionMm).toFixed(1)}`} 
                                offset={180} 
                                color="red" 
                                textColor="red" 
                            />
                        )}

                        {/* Pin Ø Dimension */}
                        <DimensionLine 
                            x1={centerRear - specs.pinDia/2} 
                            y1={centerY} 
                            x2={centerRear + specs.pinDia/2} 
                            y2={centerY} 
                            text={`${specs.pinDia.toFixed(1)}`} 
                            offset={-120} 
                        />
                    </g>

                    {/* Title Block */}
                    <g transform={`translate(${sheetWidth - 300}, ${sheetHeight - 120})`}>
                        <rect x="0" y="0" width="280" height="100" fill="none" stroke="black" strokeWidth="1.5" />
                        <line x1="0" y1="50" x2="280" y2="50" stroke="black" />
                        <text x="140" y="80" textAnchor="middle" className="font-bold text-lg">HYDROFORCE ENGINEERING</text>
                        <text x="10" y="30" className="text-[10px]">SECTION VIEW BLUEPRINT</text>
                        <text x="270" y="30" textAnchor="end" className="font-mono font-bold">{specs.productLabel}</text>
                    </g>
                </svg>
            </div>
        </div>
      </div>
    </>
  );
};
