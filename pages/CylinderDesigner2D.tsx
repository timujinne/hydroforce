import React, { useState, useMemo, useRef } from 'react';
import { SEO } from '../components/SEO';
import { Download, Ruler, Printer, ZoomIn, ZoomOut, RefreshCw, Tag, Anchor, Settings2, Maximize2 } from 'lucide-react';

// Types
type MountType = 'Eye' | 'Point' | 'Fork' | 'Flange' | 'Trunnion' | 'Thread';

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

  if (vertical) {
    const lineX = x1 - offset;
    linePath = `M ${lineX},${y1} L ${lineX},${y2}`;
    ext1Path = `M ${x1},${y1} L ${lineX - 2},${y1}`;
    ext2Path = `M ${x2},${y2} L ${lineX - 2},${y2}`;
    textX = lineX - 8;
    textY = midY;
    rotation = -90;
  } else {
    const lineY = y1 + offset;
    linePath = `M ${x1},${lineY} L ${x2},${lineY}`;
    ext1Path = `M ${x1},${y1} L ${x1},${lineY + 2}`;
    ext2Path = `M ${x2},${y2} L ${x2},${lineY + 2}`;
    textX = midX;
    textY = offset < 0 ? lineY - 8 : lineY + 12;
  }

  return (
    <g className="dimension">
      <path d={ext1Path} stroke={color} strokeWidth="0.5" fill="none" />
      <path d={ext2Path} stroke={color} strokeWidth="0.5" fill="none" />
      <path 
        d={linePath} 
        stroke={color} 
        strokeWidth="0.5" 
        fill="none" 
        markerEnd={`url(#arrow-${color === 'red' ? 'red' : 'black'})`} 
        markerStart={`url(#arrow-start-${color === 'red' ? 'red' : 'black'})`}
      />
      <text 
        x={textX} 
        y={textY} 
        textAnchor="middle" 
        dominantBaseline="middle" 
        transform={rotation ? `rotate(${rotation}, ${textX}, ${textY})` : undefined}
        className="text-[11px] font-mono font-bold"
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
  
  if (type === 'Eye' || type === 'Point' || type === 'Fork') {
    const outerR = radius;
    const innerR = pinRadius;
    const neckHeight = radius * 1.4;
    const faceX = dir * length;
    
    return (
      <g transform={`translate(${x}, ${y})`}>
         {/* Housing Body Boundary */}
         <path 
           d={`M 0 ${-outerR} A ${outerR} ${outerR} 0 1 ${isFront ? 1 : 0} 0 ${outerR} L ${faceX} ${neckHeight/2} L ${faceX} ${-neckHeight/2} Z`} 
           fill="#f0f0f0" stroke="black" strokeWidth="1.5" strokeLinejoin="round"
         />
         
         {/* Fork specific internal lines representing the "ears" in section */}
         {type === 'Fork' && (
           <>
             <line x1={0} y1={-innerR * 1.2} x2={faceX} y2={-innerR * 1.2} stroke="black" strokeWidth="0.8" />
             <line x1={0} y1={innerR * 1.2} x2={faceX} y2={innerR * 1.2} stroke="black" strokeWidth="0.8" />
           </>
         )}

         {/* Internal Pin Hole */}
         <circle cx={0} cy={0} r={innerR} fill="white" stroke="black" strokeWidth="1.5" />
         
         {/* Visual Bearing detail for Eye */}
         {type === 'Eye' && <circle cx={0} cy={0} r={innerR * 1.25} fill="none" stroke="black" strokeWidth="0.5" />}
         
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
    rearMount: 'Point',
    frontMount: 'Fork',
    portPos: 'Top',
    portLabel: 'G 3/8"',
    productLabel: 'HC-80-400',
    customClosedLength: null,
    pinDia: 25,
    eyeDia: 60
  });

  const [zoom, setZoom] = useState(1);
  const svgRef = useRef<SVGSVGElement>(null);

  const WALL_THICKNESS = 10;
  const barrelOuterDia = specs.bore + (WALL_THICKNESS * 2);
  
  // Use the Eye Diameter spec for visual mounting circle
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
  
  const MIN_PISTON_LENGTH = 60;
  const END_CAP_THICKNESS = 40;
  const GLAND_THICKNESS = 45;
  const ROD_EXTENSION_WHEN_RETRACTED = 22;

  const defaultBarrelLength = specs.stroke + MIN_PISTON_LENGTH + 20; 
  const defaultRetractedLength = rearOffset + defaultBarrelLength + frontOffset;

  let barrelLength = defaultBarrelLength;
  let retractedLength = defaultRetractedLength;

  if (specs.customClosedLength !== null && specs.customClosedLength > 0) {
      retractedLength = specs.customClosedLength;
      barrelLength = retractedLength - rearOffset - frontOffset;
      const minRequired = specs.stroke + MIN_PISTON_LENGTH + 20;
      if (barrelLength < minRequired) {
          barrelLength = minRequired;
          retractedLength = rearOffset + barrelLength + frontOffset;
      }
  }

  // Visualization Setup
  const sheetWidth = 1400;
  const sheetHeight = 800;
  const startX = (sheetWidth - retractedLength - ROD_EXTENSION_WHEN_RETRACTED) / 2;
  const centerY = sheetHeight / 2;

  const barrelStart = startX + rearOffset;
  const barrelEnd = barrelStart + barrelLength;
  const rodEndAnchor = startX + retractedLength + ROD_EXTENSION_WHEN_RETRACTED;
  const rodConnectX = rodEndAnchor - frontOffset;

  const portDist = 45;

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

      <div className="flex flex-col lg:flex-row h-[calc(100vh-80px)] overflow-hidden bg-gray-50 dark:bg-gray-900">
        
        {/* --- SIDEBAR --- */}
        <div className="w-full lg:w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 overflow-y-auto p-6 z-10 shadow-lg print:hidden">
            <h1 className="text-xl font-bold text-primary dark:text-primary-light mb-6 flex items-center gap-2">
                <Ruler className="text-accent" /> Draft Refinement
            </h1>

            <div className="space-y-6">
                {/* Section 1: Specs */}
                <div className="space-y-4">
                    <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                        <Settings2 className="w-4 h-4" /> Component Geometry
                    </h3>
                    <SliderControl label="Bore Ø" value={specs.bore} onChange={handleBoreChange} min={30} max={300} step={5} />
                    <SliderControl label="Rod Ø" value={specs.rod} onChange={(v) => setSpecs({...specs, rod: v})} min={10} max={Math.max(10, specs.bore - 10)} step={5} />
                    <SliderControl label="Stroke" value={specs.stroke} onChange={(v) => setSpecs({...specs, stroke: v, productLabel: `HC-${specs.bore}-${v}`})} min={50} max={2000} step={10} />
                    
                    <div className="pt-2 border-t border-gray-100 dark:border-gray-700">
                        <h4 className="text-xs font-bold text-gray-400 uppercase mb-3">Mounting Dimensions</h4>
                        <SliderControl label="Pin Ø" value={specs.pinDia} onChange={(v) => setSpecs({...specs, pinDia: v})} min={10} max={100} step={1} />
                        <SliderControl label="Eye Outer Ø" value={specs.eyeDia} onChange={(v) => setSpecs({...specs, eyeDia: v})} min={20} max={200} step={1} />
                    </div>

                    <div className="pt-2 border-t border-gray-100 dark:border-gray-700">
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Closed Length (E)</label>
                        <div className="flex items-center gap-2">
                            <input type="number" value={specs.customClosedLength ?? ''} placeholder={defaultRetractedLength.toFixed(1)} onChange={(e) => {
                                const val = parseFloat(e.target.value);
                                setSpecs({...specs, customClosedLength: (isNaN(val) || val <= 0) ? null : val});
                            }} className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary outline-none transition-all" />
                            <span className="text-xs font-bold text-gray-400">mm</span>
                        </div>
                    </div>
                </div>

                <hr className="dark:border-gray-700" />

                {/* Section 2: Branding & Labels */}
                <div className="space-y-4">
                    <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                        <Tag className="w-4 h-4" /> Identification
                    </h3>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Product ID</label>
                        <input 
                            type="text" 
                            value={specs.productLabel} 
                            onChange={(e) => setSpecs({...specs, productLabel: e.target.value})}
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-primary outline-none"
                            placeholder="e.g. HC-80-400"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Port Size</label>
                        <input 
                            type="text" 
                            value={specs.portLabel} 
                            onChange={(e) => setSpecs({...specs, portLabel: e.target.value})}
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-primary outline-none"
                            placeholder='e.g. G 3/8"'
                        />
                    </div>
                </div>

                <hr className="dark:border-gray-700" />

                {/* Section 3: Mountings */}
                <div className="space-y-4">
                    <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                        <Anchor className="w-4 h-4" /> Mount Types
                    </h3>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Rear Mount</label>
                        <select value={specs.rearMount} onChange={(e) => setSpecs({...specs, rearMount: e.target.value as MountType})} className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-primary outline-none">
                            {['Eye', 'Point', 'Fork', 'Flange', 'Trunnion', 'Thread'].map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Front Mount</label>
                        <select value={specs.frontMount} onChange={(e) => setSpecs({...specs, frontMount: e.target.value as MountType})} className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-primary outline-none">
                            {['Eye', 'Point', 'Fork', 'Flange', 'Thread'].map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                    </div>
                </div>

                <button onClick={() => window.print()} className="w-full bg-primary text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-primary-dark shadow-md transition-all active:scale-95">
                    <Printer size={18} /> Print Blueprint
                </button>
            </div>
        </div>

        {/* --- DRAWING CANVAS --- */}
        <div className="flex-1 relative bg-[#f8f9fa] dark:bg-gray-950 flex items-center justify-center overflow-hidden">
            <div className="absolute top-4 right-4 flex gap-2 bg-white dark:bg-gray-800 shadow-md rounded-lg p-2 z-20 print:hidden">
                <button onClick={() => setZoom(z => Math.max(0.5, z - 0.1))} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-gray-600 dark:text-gray-300"><ZoomOut size={20} /></button>
                <button onClick={() => setZoom(1)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-gray-600 dark:text-gray-300"><RefreshCw size={20} /></button>
                <button onClick={() => setZoom(z => Math.min(3, z + 0.1))} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-gray-600 dark:text-gray-300"><ZoomIn size={20} /></button>
            </div>

            <div className="bg-white shadow-2xl border border-gray-300 dark:border-gray-700 origin-center transition-transform" style={{ transform: `scale(${zoom})`, width: '1200px', height: '675px' }}>
                <svg ref={svgRef} viewBox={`0 0 ${sheetWidth} ${sheetHeight}`} className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <marker id="arrow-black" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="#000" /></marker>
                        <marker id="arrow-start-black" markerWidth="10" markerHeight="10" refX="0" refY="3" orient="auto"><path d="M9,0 L9,6 L0,3 z" fill="#000" /></marker>
                        <marker id="arrow-red" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto"><path d="M0,0 L0,6 L9,3 z" fill="red" /></marker>
                        <marker id="arrow-start-red" markerWidth="10" markerHeight="10" refX="0" refY="3" orient="auto"><path d="M9,0 L9,6 L0,3 z" fill="red" /></marker>
                        <pattern id="hatch-section" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="8" stroke="#333" strokeWidth="0.5" /></pattern>
                        <pattern id="hatch-rod" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="10" stroke="#ccc" strokeWidth="2" /></pattern>
                    </defs>

                    {/* Centered Main Title */}
                    <text x={sheetWidth / 2} y={centerY - 220} textAnchor="middle" className="text-2xl font-bold fill-[#0a6a94] uppercase tracking-widest">Hydraulic Cylinder</text>

                    {/* Section View Drawing */}
                    <g>
                        {/* Rear End Block Section */}
                        <SectionHatch x={barrelStart} y={centerY - barrelOuterDia/2} width={END_CAP_THICKNESS} height={barrelOuterDia} />
                        
                        {/* Barrel Tube (Top & Bottom Walls) */}
                        <SectionHatch x={barrelStart + END_CAP_THICKNESS} y={centerY - barrelOuterDia/2} width={barrelLength - END_CAP_THICKNESS - GLAND_THICKNESS} height={WALL_THICKNESS} />
                        <SectionHatch x={barrelStart + END_CAP_THICKNESS} y={centerY + specs.bore/2} width={barrelLength - END_CAP_THICKNESS - GLAND_THICKNESS} height={WALL_THICKNESS} />
                        
                        {/* Internal Chamber Outline */}
                        <rect x={barrelStart + END_CAP_THICKNESS} y={centerY - specs.bore/2} width={barrelLength - END_CAP_THICKNESS - GLAND_THICKNESS} height={specs.bore} fill="none" stroke="black" strokeWidth="1" />

                        {/* Piston inside */}
                        <g transform={`translate(${barrelStart + END_CAP_THICKNESS + 10}, ${centerY - specs.bore/2})`}>
                            <rect x={0} y={0} width={MIN_PISTON_LENGTH} height={specs.bore} fill="white" stroke="black" strokeWidth="1.5" />
                            {/* Piston Seals */}
                            <rect x={10} y={0} width={10} height={specs.bore} fill="#333" />
                            <rect x={MIN_PISTON_LENGTH - 20} y={0} width={10} height={specs.bore} fill="#333" />
                        </g>

                        {/* Front Gland Section */}
                        <SectionHatch x={barrelEnd - GLAND_THICKNESS} y={centerY - barrelOuterDia/2} width={GLAND_THICKNESS} height={barrelOuterDia} />
                        {/* Gland bore hole for rod (Clearance) */}
                        <rect x={barrelEnd - GLAND_THICKNESS} y={centerY - specs.rod/2 - 2} width={GLAND_THICKNESS} height={specs.rod + 4} fill="white" stroke="none" />
                        
                        {/* Piston Rod */}
                        <rect x={barrelStart + END_CAP_THICKNESS + 10 + MIN_PISTON_LENGTH} y={centerY - specs.rod/2} width={rodConnectX - (barrelStart + END_CAP_THICKNESS + 10 + MIN_PISTON_LENGTH)} height={specs.rod} fill="url(#hatch-rod)" stroke="black" strokeWidth="1" />

                        {/* Product Label */}
                        <g transform={`translate(${barrelStart + barrelLength/2 - 40}, ${centerY - barrelOuterDia/2 + 2})`}>
                            <rect x={0} y={0} width={80} height={WALL_THICKNESS - 4} fill="#eee" stroke="black" strokeWidth="0.5" />
                            <text x={40} y={(WALL_THICKNESS - 4)/2} textAnchor="middle" dominantBaseline="middle" className="text-[5px] font-bold fill-gray-800 tracking-wider">HYDROFORCE • {specs.productLabel}</text>
                        </g>

                        {/* Ports */}
                        <g transform={`translate(${barrelStart + portDist}, ${centerY - barrelOuterDia/2})`}>
                           <rect x={-10} y={-10} width={20} height={10} fill="white" stroke="black" />
                           <text x={0} y={-15} textAnchor="middle" className="text-[10px] font-bold">{specs.portLabel}</text>
                        </g>
                        <g transform={`translate(${barrelEnd - portDist}, ${centerY - barrelOuterDia/2})`}>
                           <rect x={-10} y={-10} width={20} height={10} fill="white" stroke="black" />
                           <text x={0} y={-15} textAnchor="middle" className="text-[10px] font-bold">{specs.portLabel}</text>
                        </g>

                        {/* Mounts - Using EyeDia and PinDia */}
                        <MountDraw type={specs.rearMount} x={startX} y={centerY} radius={rearMountVisualRadius} pinRadius={specs.pinDia/2} length={rearOffset} />
                        <MountDraw type={specs.frontMount} x={rodEndAnchor} y={centerY} radius={frontMountVisualRadius} pinRadius={specs.pinDia/2} length={frontOffset} isFront />

                        {/* Centerline */}
                        <line x1={startX - 50} y1={centerY} x2={rodEndAnchor + 50} y2={centerY} stroke="#666" strokeWidth="0.5" strokeDasharray="15,4,2,4" />

                        {/* DIMENSIONS */}
                        
                        {/* Bore Diameter */}
                        <DimensionLine 
                            x1={barrelStart + barrelLength/2} 
                            y1={centerY - specs.bore/2} 
                            x2={barrelStart + barrelLength/2} 
                            y2={centerY + specs.bore/2} 
                            vertical 
                            text={`${specs.bore.toFixed(1)}`} 
                            offset={-25} 
                            color="red"
                            textColor="red"
                        />

                        {/* Rod Diameter */}
                        <DimensionLine 
                            x1={rodConnectX - 40} 
                            y1={centerY - specs.rod/2} 
                            x2={rodConnectX - 40} 
                            y2={centerY + specs.rod/2} 
                            vertical 
                            text={`${specs.rod.toFixed(1)}`} 
                            offset={-25} 
                            color="red"
                            textColor="red"
                        />

                        {/* Outer Tube Diameter */}
                        <DimensionLine x1={barrelStart + barrelLength/2} y1={centerY - barrelOuterDia/2} x2={barrelStart + barrelLength/2} y2={centerY + barrelOuterDia/2} vertical text={`${barrelOuterDia.toFixed(1)}`} offset={35} />

                        {/* Rod extension beyond barrel */}
                        <DimensionLine x1={barrelEnd} y1={centerY + barrelOuterDia/2 + 10} x2={rodEndAnchor} y2={centerY + barrelOuterDia/2 + 10} text={`${ROD_EXTENSION_WHEN_RETRACTED.toFixed(0)}`} offset={25} color="red" textColor="red" />

                        {/* Stroke */}
                        <DimensionLine 
                            x1={barrelStart + END_CAP_THICKNESS} 
                            y1={centerY + specs.bore/2} 
                            x2={barrelEnd - GLAND_THICKNESS} 
                            y2={centerY + specs.bore/2} 
                            text={`${specs.stroke.toFixed(0)}`} 
                            offset={35} 
                            color="red" 
                            textColor="red" 
                        />

                        {/* Closed Length Center-to-Center */}
                        <DimensionLine 
                            x1={startX} 
                            y1={centerY + barrelOuterDia/2 + 65} 
                            x2={rodEndAnchor} 
                            y2={centerY + barrelOuterDia/2 + 65} 
                            text={`${retractedLength.toFixed(1)}`} 
                            offset={30} 
                            color="red" 
                            textColor="red" 
                        />

                        {/* Pin Hole Dimensions */}
                        <DimensionLine 
                            x1={startX - specs.pinDia/2} 
                            y1={centerY - 80} 
                            x2={startX + specs.pinDia/2} 
                            y2={centerY - 80} 
                            text={`${specs.pinDia.toFixed(0)}`} 
                            offset={-20} 
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