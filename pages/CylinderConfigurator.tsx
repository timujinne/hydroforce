import React, { useState, Suspense, useEffect, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, Environment, Html } from '@react-three/drei';
import { SEO } from '../components/SEO';
import { Check, Download, Box, Circle, Square, Settings2 } from 'lucide-react';
import * as THREE from 'three';

// --- Types & Constants ---

type RearMountingType = 'M0' | 'MP3' | 'MP5' | 'ME8';
type FrontMountingType = 'M0' | 'ME7';
type RodCoating = 'W' | 'S' | 'HC' | 'NC';
type PortType = 'BSP' | 'METRIC' | 'NPT' | 'SAE_UNF' | 'SAE_3000' | 'SAE_6000';

interface ConfigState {
  type: string;
  mountingRear: RearMountingType;
  mountingFront: FrontMountingType;
  stroke: number;
  bore: number;
  rod: number;
  coating: RodCoating;
  portType: PortType;
  extension: number; // 0 to 1
}

// --- 3D Components ---

const Materials = {
  paint: new THREE.MeshStandardMaterial({ color: '#01577d', roughness: 0.3, metalness: 0.2 }),
  steel: new THREE.MeshStandardMaterial({ color: '#2a2a2a', roughness: 0.6, metalness: 0.6 }),
  chrome: new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 0.05, metalness: 1.0 }),
  nickel: new THREE.MeshStandardMaterial({ color: '#d4af37', roughness: 0.2, metalness: 0.9 }), // Gold-ish/Nickel tint
  hardened: new THREE.MeshStandardMaterial({ color: '#8899a6', roughness: 0.3, metalness: 0.8 }),
  thread: new THREE.MeshStandardMaterial({ color: '#888888', roughness: 0.9, metalness: 0.1 }),
};

const getRodMaterial = (coating: RodCoating) => {
  switch (coating) {
    case 'NC': return Materials.nickel;
    case 'HC': return Materials.hardened;
    default: return Materials.chrome;
  }
};

const ThreadedStud = ({ radius, length, position, rotation }: { radius: number, length: number, position: [number, number, number], rotation: [number, number, number] }) => {
  // Create a striped texture for the thread look
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      // Background - Dark Gray
      ctx.fillStyle = '#666666'; 
      ctx.fillRect(0, 0, 64, 64);
      
      // Stripes - Light Gray
      ctx.fillStyle = '#999999'; 
      for (let i = 0; i < 64; i += 8) {
        ctx.fillRect(0, i, 64, 3); 
      }
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    // Repeat texture vertically based on length to simulate thread pitch
    tex.repeat.set(1, length * 8); 
    return tex;
  }, [length]);

  return (
    <group position={position} rotation={new THREE.Euler(...rotation)}>
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[radius, radius, length, 32]} />
        <meshStandardMaterial 
          map={texture} 
          color="#888888"
          roughness={0.9} 
          metalness={0.1} 
        />
      </mesh>
    </group>
  );
};

const RoundFlange = ({ radius, position, rotation }: { radius: number, position: [number, number, number], rotation?: [number, number, number] }) => {
  const flangeThickness = 0.5;
  const flangeRadius = radius * 2.5; // Slightly increased diameter
  const holeCircleRadius = radius * 2.0; // Position holes further out
  const holeSize = 0.12; // Thinner holes

  const shape = useMemo(() => {
    const s = new THREE.Shape();
    s.absarc(0, 0, flangeRadius, 0, Math.PI * 2, false);

    const count = 8; // 8 holes along perimeter
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const x = Math.cos(angle) * holeCircleRadius;
      const y = Math.sin(angle) * holeCircleRadius;
      
      const hole = new THREE.Path();
      hole.absarc(x, y, holeSize, 0, Math.PI * 2, false);
      s.holes.push(hole);
    }
    return s;
  }, [flangeRadius, holeCircleRadius, holeSize]);

  const extrudeSettings = useMemo(() => ({
    depth: flangeThickness,
    bevelEnabled: false,
    curveSegments: 32
  }), [flangeThickness]);

  return (
    <group position={position} rotation={rotation ? new THREE.Euler(...rotation) : new THREE.Euler(0, 0, 0)}>
       {/* 
         ExtrudeGeometry aligns with Z axis. 
         We rotate -90deg on X to align with Y axis (matching CylinderGeometry behavior relative to parent rotation).
         We center it on Y by offsetting -flangeThickness/2.
       */}
       <mesh 
         castShadow 
         receiveShadow 
         material={Materials.steel} 
         rotation={[-Math.PI/2, 0, 0]} 
         position={[0, -flangeThickness/2, 0]}
       >
         <extrudeGeometry args={[shape, extrudeSettings]} />
       </mesh>
    </group>
  );
};

const RearLug = ({ radius, position, type }: { radius: number, position: [number, number, number], type: 'MP3' | 'MP5' }) => {
  const width = radius * 0.8;
  const eyeOuter = radius * 0.75;
  const eyeInner = radius * 0.35; // Nominal hole diameter
  const protrusion = radius * 1.0;

  const eyeShape = useMemo(() => {
    const s = new THREE.Shape();
    s.absarc(0, 0, eyeOuter, 0, Math.PI * 2, false);
    
    // Create hole
    const hole = new THREE.Path();
    hole.absarc(0, 0, eyeInner, 0, Math.PI * 2, false);
    s.holes.push(hole);
    
    return s;
  }, [eyeOuter, eyeInner]);

  // For MP5 Bearing
  const bearingShape = useMemo(() => {
    if (type !== 'MP5') return null;
    const s = new THREE.Shape();
    s.absarc(0, 0, eyeInner, 0, Math.PI * 2, false);
    // Pin Hole in bearing
    const hole = new THREE.Path();
    hole.absarc(0, 0, eyeInner * 0.6, 0, Math.PI * 2, false);
    s.holes.push(hole);
    return s;
  }, [type, eyeInner]);

  const extrudeSettings = useMemo(() => ({ depth: width, bevelEnabled: false, curveSegments: 32 }), [width]);
  const bearingExtrudeSettings = useMemo(() => ({ depth: width * 1.2, bevelEnabled: false, curveSegments: 32 }), [width]);

  return (
    <group position={position}>
       {/* Neck connecting cap to eye */}
       <mesh position={[-protrusion/2, 0, 0]} castShadow receiveShadow material={Materials.steel}>
          <boxGeometry args={[protrusion, eyeOuter * 2, width]} />
       </mesh>
       
       {/* The Eye (Extruded Ring) */}
       <group position={[-protrusion, 0, 0]}>
          <mesh position={[0, 0, -width/2]} castShadow receiveShadow material={Materials.steel}>
             <extrudeGeometry args={[eyeShape, extrudeSettings]} />
          </mesh>
          
          {type === 'MP5' && bearingShape && (
             // MP5: Spherical Bearing (Extruded Ring Insert)
             <mesh position={[0, 0, -(width * 1.2)/2]}>
                <extrudeGeometry args={[bearingShape, bearingExtrudeSettings]} />
                <meshStandardMaterial color="#b0c4de" roughness={0.3} metalness={0.8} />
             </mesh>
          )}
       </group>
    </group>
  );
};

const PortAssembly = ({ radius, height, position, type }: { radius: number, height: number, position: [number, number, number], type: PortType }) => {
  const isFlange = type === 'SAE_3000' || type === 'SAE_6000';
  
  const flangeShape = useMemo(() => {
    if (!isFlange) return null;
    const s = new THREE.Shape();
    const w = radius * 2.5;
    const h = radius * 2.5; // It's square
    // Draw centered rectangle
    s.moveTo(-w/2, -h/2);
    s.lineTo(w/2, -h/2);
    s.lineTo(w/2, h/2);
    s.lineTo(-w/2, h/2);
    s.lineTo(-w/2, -h/2);

    // Center Port Hole
    const centerHole = new THREE.Path();
    centerHole.absarc(0, 0, radius * 0.6, 0, Math.PI * 2, false);
    s.holes.push(centerHole);

    // 4 Bolt Holes
    const boltOffset = radius * 0.85;
    const boltSize = radius * 0.15;
    [ [1, 1], [1, -1], [-1, 1], [-1, -1] ].forEach(([mx, mz]) => {
         const bh = new THREE.Path();
         bh.absarc(mx * boltOffset, mz * boltOffset, boltSize, 0, Math.PI * 2, false);
         s.holes.push(bh);
    });
    
    return s;
  }, [isFlange, radius]);

  const extrudeSettings = useMemo(() => ({ depth: height * 0.5, bevelEnabled: false, curveSegments: 32 }), [height]);

  return (
    <group position={position}>
      {isFlange && flangeShape ? (
         // SAE Flange Port Visualization with Real Holes
         <group>
            {/* 
               Extrude starts at 0 (on Y plane of group after rotation). 
               We position group on surface, so we extrude up.
               Rotate X -90 aligns Z-extrusion to Y-axis.
            */}
            <mesh 
              position={[0, 0, 0]} 
              rotation={[-Math.PI/2, 0, 0]} 
              castShadow 
              receiveShadow 
              material={Materials.steel}
            >
               <extrudeGeometry args={[flangeShape, extrudeSettings]} />
            </mesh>
         </group>
      ) : (
         // Threaded Port Visualization (Boss + Plug)
         <group>
            {/* Boss */}
            <mesh position={[0, 0, 0]} castShadow receiveShadow material={Materials.steel}>
               <cylinderGeometry args={[radius, radius, height, 24]} />
            </mesh>
            {/* Plug / Cap */}
            <mesh position={[0, height * 0.75, 0]} castShadow receiveShadow material={Materials.steel}>
               <cylinderGeometry args={[radius * 0.8, radius * 0.8, height * 0.5, 6]} />
            </mesh>
             {/* Center Indent */}
            <mesh position={[0, height * 1.01, 0]} material={Materials.steel}>
               <cylinderGeometry args={[radius * 0.4, radius * 0.4, 0.1, 24]} />
            </mesh>
         </group>
      )}
    </group>
  );
};

const ProceduralCylinder = ({ config }: { config: ConfigState }) => {
  const scale = 0.02; // Convert mm to 3D units roughly
  
  const boreRad = (config.bore / 2) * scale;
  const rodRad = (config.rod / 2) * scale;
  const strokeLen = config.stroke * scale;
  
  // Dimensions for "Just a tube" look
  const endBlockLen = boreRad * 1.5; // Reserved length for internal mechanics
  const barrelLen = strokeLen + (endBlockLen * 2); 
  
  // Rod Length Calculation
  // Reduced multiplier from 4 to 2.8 to prevent rear protrusion while maintaining gland engagement
  const rodTotalLength = strokeLen + (boreRad * 2.8);

  const currentExtension = config.extension * strokeLen;

  const tubeRadius = boreRad * 1.2;
  const plugRadius = boreRad * 1.1; 
  
  // Thread dimensions
  const threadLength = boreRad * 1.1; 
  const threadRadius = rodRad * 0.95; 

  // Flange thickness used for positioning
  const flangeThickness = 0.5;

  // Port dimensions
  // FIXED: Ports now use a constant visual size and do not scale with cylinder diameter
  const portRadius = 0.35; // Fixed radius (~35mm diameter equivalent visually)
  const portHeight = 0.5;  // Fixed height
  const portY = tubeRadius; 

  return (
    <group rotation={[0, -Math.PI / 6, 0]}>
      
      {/* --- BARREL ASSEMBLY (Fixed) --- */}
      <group position={[-barrelLen / 2, 0, 0]}>
        
        {/* Main Painted Tube Body */}
        <mesh rotation={[0, 0, -Math.PI / 2]} position={[barrelLen/2, 0, 0]} castShadow receiveShadow material={Materials.paint}>
          <cylinderGeometry args={[tubeRadius, tubeRadius, barrelLen, 32]} />
        </mesh>

        {/* --- FRONT END (Head) --- */}
        <group position={[barrelLen, 0, 0]}>
            {/* Black Steel Plug (Flush Face) */}
            <mesh rotation={[0, 0, -Math.PI / 2]} position={[0, 0, 0]} material={Materials.steel}>
                <cylinderGeometry args={[plugRadius, plugRadius, 0.1, 32]} />
            </mesh>
            
            {/* Front Mountings */}
            {config.mountingFront === 'ME7' && (
                <RoundFlange radius={boreRad} position={[flangeThickness/2, 0, 0]} rotation={[0, 0, Math.PI/2]} />
            )}
            
            {/* Front Port - Positioned on Top */}
            <PortAssembly 
               radius={portRadius} 
               height={portHeight} 
               position={[-endBlockLen, portY, 0]} 
               type={config.portType}
            />
        </group>
        
        {/* --- REAR END (Cap) --- */}
        <group position={[0, 0, 0]}>
            {/* Black Steel Plug (Flush Face) */}
            <mesh rotation={[0, 0, -Math.PI / 2]} position={[0, 0, 0]} material={Materials.steel}>
                <cylinderGeometry args={[plugRadius, plugRadius, 0.1, 32]} />
            </mesh>
            
            {/* Rear Mountings */}
            {config.mountingRear === 'ME8' && (
                <RoundFlange radius={boreRad} position={[-flangeThickness/2, 0, 0]} rotation={[0, 0, Math.PI/2]} />
            )}
            {(config.mountingRear === 'MP3' || config.mountingRear === 'MP5') && (
                <RearLug radius={boreRad} position={[0, 0, 0]} type={config.mountingRear} />
            )}
            {config.mountingRear === 'M0' && (
                <ThreadedStud 
                   radius={threadRadius} 
                   length={threadLength} 
                   position={[-threadLength/2, 0, 0]} 
                   rotation={[0, 0, Math.PI/2]} 
                />
            )}

            {/* Rear Port - Positioned on Top */}
            <PortAssembly 
               radius={portRadius} 
               height={portHeight} 
               position={[endBlockLen, portY, 0]} 
               type={config.portType}
            />
        </group>

      </group>

      {/* --- ROD ASSEMBLY (Moving) --- */}
      <group position={[(-barrelLen / 2) + barrelLen + currentExtension, 0, 0]}>
         
         {/* Rod Shaft */}
         <mesh rotation={[0, 0, -Math.PI / 2]} position={[- rodTotalLength / 2 + threadLength/2, 0, 0]} castShadow material={getRodMaterial(config.coating)}>
             <cylinderGeometry args={[rodRad, rodRad, rodTotalLength, 32]} />
         </mesh>

         {/* Rod End - Threaded Stud */}
         <ThreadedStud 
            radius={threadRadius} 
            length={threadLength} 
            position={[threadLength/2, 0, 0]} 
            rotation={[0, 0, -Math.PI/2]} 
         />

      </group>

    </group>
  );
};

// --- UI Components ---

const MountingOption = ({ id, label, selected, onSelect, icon }: { id: string, label: string, selected: boolean, onSelect: () => void, icon?: React.ReactNode }) => (
  <div 
    onClick={onSelect}
    className={`
      cursor-pointer rounded-lg p-3 border-2 transition-all duration-200 flex flex-col items-center justify-center text-center gap-2 h-24
      ${selected 
        ? 'border-primary bg-primary/5 shadow-md' 
        : 'border-gray-200 dark:border-gray-700 hover:border-primary/50 dark:hover:border-primary/50 hover:bg-gray-50 dark:hover:bg-gray-800/50'
      }
    `}
  >
    <div className={`${selected ? 'text-primary' : 'text-gray-400'}`}>
        {icon || <Box size={24} />}
    </div>
    <span className={`text-xs font-bold ${selected ? 'text-primary' : 'text-gray-600 dark:text-gray-300'}`}>{id}</span>
    <span className="text-[10px] text-gray-500 dark:text-gray-400 leading-tight px-1">{label}</span>
  </div>
);

const PortOption = ({ id, label, selected, onSelect, type }: { id: string, label: string, selected: boolean, onSelect: () => void, type: 'thread' | 'flange' }) => (
  <div 
    onClick={onSelect}
    className={`
      cursor-pointer rounded-lg p-3 border-2 transition-all duration-200 flex flex-col items-center justify-center text-center gap-1 min-h-[80px]
      ${selected 
        ? 'border-primary bg-primary/5 shadow-sm' 
        : 'border-gray-200 dark:border-gray-700 hover:border-primary/50 dark:hover:border-primary/50 hover:bg-gray-50 dark:hover:bg-gray-800/50'
      }
    `}
  >
    <div className={`${selected ? 'text-primary' : 'text-gray-400'} mb-1`}>
        {type === 'thread' ? <Circle size={18} /> : <Square size={18} />}
    </div>
    <span className={`text-xs font-bold leading-tight ${selected ? 'text-primary' : 'text-gray-700 dark:text-gray-300'}`}>{id}</span>
    <span className="text-[9px] text-gray-400 dark:text-gray-500">{label}</span>
  </div>
);

const SliderControl = ({ label, value, onChange, min, max, suffix = "mm" }: { label: string, value: number, onChange: (val: number) => void, min: number, max: number, suffix?: string }) => (
  <div className="mb-6">
     <div className="flex justify-between items-center mb-2">
        <label className="text-sm font-bold text-gray-700 dark:text-gray-300">{label}</label>
        <div className="flex items-center gap-2">
            <input 
               type="number" 
               value={value}
               onChange={(e) => {
                   const val = parseInt(e.target.value);
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
            value={value}
            onChange={(e) => onChange(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary hover:accent-primary-light z-10 relative"
        />
     </div>
     <div className="flex justify-between text-[10px] uppercase font-bold text-gray-400 mt-1 tracking-wider">
        <span>{min} {suffix}</span>
        <span>{max} {suffix}</span>
     </div>
  </div>
);

export const CylinderConfigurator: React.FC = () => {
  const [config, setConfig] = useState<ConfigState>({
    type: 'DS – double acting cylinder with single rod',
    mountingRear: 'M0',
    mountingFront: 'M0',
    stroke: 300,
    bore: 63,
    rod: 36,
    coating: 'W',
    portType: 'BSP',
    extension: 0.3
  });

  // Ensure rod is always smaller than bore
  useEffect(() => {
    if (config.rod >= config.bore) {
        setConfig(prev => ({ ...prev, rod: Math.floor(prev.bore * 0.6) })); 
    }
  }, [config.bore]);

  const handleChange = (key: keyof ConfigState, value: any) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  return (
    <>
      <SEO 
        title="3D Cylinder Configurator" 
        description="Design your custom hydraulic cylinder. Select bore, rod, stroke, and mounting options and view the result in real-time 3D."
        keywords={['Hydraulic Cylinder Configurator', '3D CAD', 'Custom Hydraulics']}
      />
      
      <div className="flex flex-col lg:flex-row h-[calc(100vh-80px)] overflow-hidden bg-white dark:bg-gray-900">
        
        {/* Left Panel: 3D View */}
        <div className="w-full lg:w-3/5 h-[50vh] lg:h-full relative bg-gray-100 dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 order-1 lg:order-1">
           <div className="absolute top-4 left-4 z-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md px-4 py-2 rounded-full text-sm font-bold text-primary dark:text-primary-light shadow-sm">
              Interactive Preview
           </div>
           
           <Canvas shadows dpr={[1, 2]} camera={{ position: [4, 3, 6], fov: 45 }}>
             <Suspense fallback={<Html center>Loading...</Html>}>
                <Stage environment="city" intensity={0.6} adjustCamera={false}>
                   <ProceduralCylinder config={config} />
                </Stage>
                <Environment preset="warehouse" />
             </Suspense>
             <OrbitControls enablePan={true} minPolarAngle={Math.PI / 6} maxPolarAngle={Math.PI / 1.5} />
           </Canvas>

           {/* Actuation Control Overlay */}
           <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-3/4 max-w-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-md p-4 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center mb-2">
                 <span className="text-xs font-bold uppercase text-gray-500 dark:text-gray-400">Test Actuation</span>
                 <span className="text-xs font-mono text-primary dark:text-primary-light font-bold">{(config.extension * 100).toFixed(0)}%</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="1" 
                step="0.01" 
                value={config.extension}
                onChange={(e) => handleChange('extension', parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
              />
           </div>
        </div>

        {/* Right Panel: Configuration Form */}
        <div className="w-full lg:w-2/5 h-[50vh] lg:h-full overflow-y-auto bg-white dark:bg-gray-800 p-6 lg:p-10 order-2 lg:order-2 shadow-2xl z-10">
           <div className="max-w-xl mx-auto">
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Configure Your Cylinder</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">Define your specifications below. The 3D model updates automatically.</p>

              {/* Type Selection */}
              <div className="mb-8">
                 <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Type <span className="text-red-500">*</span></label>
                 <select 
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                    value={config.type}
                    onChange={(e) => handleChange('type', e.target.value)}
                 >
                    <option>DS – double acting cylinder with single rod</option>
                    <option>SS – single acting cylinder (Push)</option>
                    <option>SS – single acting cylinder (Pull)</option>
                 </select>
              </div>

              {/* Rear Mounting (Cap) */}
              <div className="mb-6">
                 <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">Rear Mounting (Cap) <span className="text-red-500">*</span></label>
                 <div className="grid grid-cols-4 gap-2">
                    <MountingOption 
                        id="M0" 
                        label="No mount" 
                        selected={config.mountingRear === 'M0'} 
                        onSelect={() => handleChange('mountingRear', 'M0')} 
                        icon={<Square size={20} />} 
                    />
                    <MountingOption 
                        id="MP3" 
                        label="Fixed eye" 
                        selected={config.mountingRear === 'MP3'} 
                        onSelect={() => handleChange('mountingRear', 'MP3')} 
                        icon={<Circle size={20} />} 
                    />
                    <MountingOption 
                        id="MP5" 
                        label="Spherical" 
                        selected={config.mountingRear === 'MP5'} 
                        onSelect={() => handleChange('mountingRear', 'MP5')} 
                        icon={<Circle size={20} fill="currentColor" fillOpacity={0.2} />} 
                    />
                    <MountingOption 
                        id="ME8" 
                        label="Cap flange" 
                        selected={config.mountingRear === 'ME8'} 
                        onSelect={() => handleChange('mountingRear', 'ME8')} 
                        icon={<Box size={20} className="border-l-4 border-current" />} 
                    />
                 </div>
              </div>

              {/* Front Mounting (Head) */}
              <div className="mb-8">
                 <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">Front Mounting (Head) <span className="text-red-500">*</span></label>
                 <div className="grid grid-cols-4 gap-2">
                    <MountingOption 
                        id="M0" 
                        label="No mount" 
                        selected={config.mountingFront === 'M0'} 
                        onSelect={() => handleChange('mountingFront', 'M0')} 
                        icon={<Square size={20} />} 
                    />
                    <MountingOption 
                        id="ME7" 
                        label="Head flange" 
                        selected={config.mountingFront === 'ME7'} 
                        onSelect={() => handleChange('mountingFront', 'ME7')} 
                        icon={<Box size={20} className="border-r-4 border-current" />} 
                    />
                 </div>
              </div>

              {/* Stroke Slider */}
              <SliderControl 
                  label="Stroke" 
                  value={config.stroke} 
                  onChange={(v) => handleChange('stroke', v)} 
                  min={30} 
                  max={2000} 
              />

              {/* Bore & Rod Grid */}
              <div className="grid grid-cols-2 gap-6 mb-2">
                 <SliderControl 
                    label="Bore Ø" 
                    value={config.bore} 
                    onChange={(v) => handleChange('bore', v)} 
                    min={20} 
                    max={250} 
                 />
                 <SliderControl 
                    label="Rod Ø" 
                    value={config.rod} 
                    onChange={(v) => handleChange('rod', v)} 
                    min={10} 
                    max={config.bore - 5} 
                 />
              </div>

              {/* Hydraulic Ports */}
              <div className="mb-8">
                 <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">Hydraulic Ports</label>
                 <div className="grid grid-cols-3 gap-2">
                    <PortOption id="BSP" label="G Thread" selected={config.portType === 'BSP'} onSelect={() => handleChange('portType', 'BSP')} type="thread" />
                    <PortOption id="Metric" label="M Thread" selected={config.portType === 'METRIC'} onSelect={() => handleChange('portType', 'METRIC')} type="thread" />
                    <PortOption id="NPT" label="NPT Thread" selected={config.portType === 'NPT'} onSelect={() => handleChange('portType', 'NPT')} type="thread" />
                    <PortOption id="SAE" label="UNF Thread" selected={config.portType === 'SAE_UNF'} onSelect={() => handleChange('portType', 'SAE_UNF')} type="thread" />
                    <PortOption id="SAE 3000" label="Code 61 Flange" selected={config.portType === 'SAE_3000'} onSelect={() => handleChange('portType', 'SAE_3000')} type="flange" />
                    <PortOption id="SAE 6000" label="Code 62 Flange" selected={config.portType === 'SAE_6000'} onSelect={() => handleChange('portType', 'SAE_6000')} type="flange" />
                 </div>
              </div>

              {/* Rod Coating */}
              <div className="mb-8">
                 <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">Piston Rod Material / Coating <span className="text-red-500">*</span></label>
                 <div className="space-y-3">
                    {[
                        { id: 'W', label: 'Welded (Standard)', desc: 'Standard chrome plated C45E' },
                        { id: 'S', label: 'Solid Forged', desc: 'Higher strength application' },
                        { id: 'HC', label: 'Hardened + Hard Chrome', desc: 'Extreme wear resistance' },
                        { id: 'NC', label: 'Nickel Plated + Chrome', desc: 'Superior corrosion resistance (Marine)' }
                    ].map((opt) => (
                        <label key={opt.id} className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all ${config.coating === opt.id ? 'border-primary bg-primary/5 dark:bg-primary/10' : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50'}`}>
                           <input 
                              type="radio" 
                              name="rod_coating" 
                              checked={config.coating === opt.id}
                              onChange={() => handleChange('coating', opt.id)}
                              className="mt-1 accent-primary"
                           />
                           <div>
                              <div className="text-sm font-bold text-gray-800 dark:text-gray-200">{opt.label}</div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">{opt.desc}</div>
                           </div>
                        </label>
                    ))}
                 </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex gap-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                  <button className="flex-1 bg-primary text-white font-bold py-4 rounded-lg shadow-lg hover:bg-primary-dark transition-colors flex items-center justify-center gap-2">
                     <Check size={20} /> Request Quote
                  </button>
                  <button className="px-6 py-4 border-2 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 font-bold rounded-lg hover:border-gray-300 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                     <Download size={20} /> PDF
                  </button>
              </div>

           </div>
        </div>

      </div>
    </>
  );
};