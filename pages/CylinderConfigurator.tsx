import React, { useState, Suspense, useEffect, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage, Environment, Html } from '@react-three/drei';
import { SEO } from '../components/SEO';
import { Check, Download, Box, Circle, Square } from 'lucide-react';
import * as THREE from 'three';

// --- Types & Constants ---

type RearMountingType = 'M0' | 'MP3' | 'MP5' | 'ME8';
type FrontMountingType = 'M0' | 'ME7';
type RodCoating = 'W' | 'S' | 'HC' | 'NC';

interface ConfigState {
  type: string;
  mountingRear: RearMountingType;
  mountingFront: FrontMountingType;
  stroke: number;
  bore: number;
  rod: number;
  coating: RodCoating;
  extension: number; // 0 to 1
}

// Standard Hydraulic Bore/Rod relationships (simplified for demo)
const boreSizes = [25, 32, 40, 50, 63, 80, 100, 125, 160, 200];
const getRodOptions = (bore: number) => {
  if (bore === 25) return [12, 14, 16];
  if (bore === 32) return [16, 18, 22];
  if (bore === 40) return [20, 22, 28];
  if (bore === 50) return [25, 28, 36];
  if (bore === 63) return [32, 36, 45];
  if (bore === 80) return [40, 45, 56];
  if (bore === 100) return [50, 63, 70];
  if (bore === 125) return [63, 80, 90];
  if (bore === 160) return [80, 100, 110];
  if (bore === 200) return [100, 125, 140];
  return [bore / 2];
};

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

  const holes = useMemo(() => {
    const arr = [];
    const count = 8; // 8 holes along perimeter
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const x = Math.cos(angle) * holeCircleRadius;
      const z = Math.sin(angle) * holeCircleRadius;
      arr.push(
        <mesh key={i} position={[x, 0, z]} rotation={[0, 0, 0]}>
           {/* Black cylinder representing a hole passing through */}
           <cylinderGeometry args={[holeSize, holeSize, flangeThickness + 0.1, 16]} />
           <meshBasicMaterial color="#000000" />
        </mesh>
      );
    }
    return arr;
  }, [holeCircleRadius, holeSize, flangeThickness]);

  return (
    <group position={position} rotation={rotation ? new THREE.Euler(...rotation) : new THREE.Euler(0, 0, 0)}>
       {/* Round Plate */}
       <mesh castShadow receiveShadow material={Materials.steel}>
         <cylinderGeometry args={[flangeRadius, flangeRadius, flangeThickness, 32]} />
       </mesh>
       
       {/* Drilled Holes */}
       {holes}
    </group>
  );
};

const RearLug = ({ radius, position, type }: { radius: number, position: [number, number, number], type: 'MP3' | 'MP5' }) => {
  const width = radius * 0.8;
  const eyeOuter = radius * 0.75;
  const eyeInner = radius * 0.35; // Nominal hole diameter
  const protrusion = radius * 1.0;

  return (
    <group position={position}>
       {/* Neck connecting cap to eye */}
       <mesh position={[-protrusion/2, 0, 0]} castShadow receiveShadow material={Materials.steel}>
          <boxGeometry args={[protrusion, eyeOuter * 2, width]} />
       </mesh>
       
       {/* The Eye */}
       <group position={[-protrusion, 0, 0]}>
          <mesh rotation={[Math.PI/2, 0, 0]} castShadow receiveShadow material={Materials.steel}>
             <cylinderGeometry args={[eyeOuter, eyeOuter, width, 32]} />
          </mesh>
          
          {type === 'MP5' ? (
             // MP5: Spherical Bearing (Ring Insert)
             <group rotation={[Math.PI/2, 0, 0]}>
                {/* Inner Ring (The Bearing Race/Ball) - Protrudes slightly and has a different material */}
                <mesh>
                   <cylinderGeometry args={[eyeInner, eyeInner, width * 1.2, 32]} />
                   <meshStandardMaterial color="#b0c4de" roughness={0.3} metalness={0.8} />
                </mesh>
                
                {/* The Pin Hole inside the bearing */}
                <mesh renderOrder={1}>
                   <cylinderGeometry args={[eyeInner * 0.6, eyeInner * 0.6, width * 1.25, 32]} />
                   <meshBasicMaterial color="#1a1a1a" />
                </mesh>
                
                {/* Visual Ring detail for bearing edge */}
                <mesh>
                  <torusGeometry args={[eyeInner, 0.02, 16, 32]} />
                  <meshStandardMaterial color="#666" />
                </mesh>
             </group>
          ) : (
             // MP3: Simple Hole
             <mesh rotation={[Math.PI/2, 0, 0]}>
                <cylinderGeometry args={[eyeInner, eyeInner, width + 0.05, 32]} />
                <meshBasicMaterial color="#1a1a1a" />
             </mesh>
          )}
       </group>
    </group>
  );
};

const ProceduralCylinder = ({ config }: { config: ConfigState }) => {
  const scale = 0.02; // Convert mm to 3D units roughly
  
  const boreRad = (config.bore / 2) * scale;
  const rodRad = (config.rod / 2) * scale;
  const strokeLen = config.stroke * scale;
  
  // Dimensions for "Just a tube" look
  // The Head and Cap are now internal/flush plugs, so the barrel covers everything visually.
  // We use fixed offsets for internal mechanics logic, but visually it's linear.
  const endBlockLen = boreRad * 1.5; // Reserved length for internal mechanics
  const barrelLen = strokeLen + (endBlockLen * 2); 
  
  const currentExtension = config.extension * strokeLen;

  const tubeRadius = boreRad * 1.2;
  const plugRadius = boreRad * 1.1; 
  
  // Thread dimensions
  const threadLength = boreRad * 1.1; 
  const threadRadius = rodRad * 0.95; 

  // Flange thickness used for positioning
  const flangeThickness = 0.5;

  // Port dimensions (Scaled to ensure visibility on large sizes)
  const portRadius = boreRad * 0.45;
  const portHeight = Math.max(0.4, boreRad * 1.0);
  const portY = tubeRadius; 

  return (
    <group rotation={[0, -Math.PI / 6, 0]}>
      
      {/* --- BARREL ASSEMBLY (Fixed) --- */}
      {/* Center the whole barrel on local 0 for easier rotation pivot */}
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
                // ME7: Round Flange bolted to the front face
                <RoundFlange radius={boreRad} position={[flangeThickness/2, 0, 0]} rotation={[0, 0, Math.PI/2]} />
            )}
            
            {/* Front Port (On the tube surface) - Scaled */}
            <mesh position={[-endBlockLen, portY, 0]} material={Materials.steel}>
                <cylinderGeometry args={[portRadius, portRadius, portHeight, 24]} />
            </mesh>
        </group>
        
        {/* --- REAR END (Cap) --- */}
        <group position={[0, 0, 0]}>
            {/* Black Steel Plug (Flush Face) */}
            <mesh rotation={[0, 0, -Math.PI / 2]} position={[0, 0, 0]} material={Materials.steel}>
                <cylinderGeometry args={[plugRadius, plugRadius, 0.1, 32]} />
            </mesh>
            
            {/* Rear Mountings */}
            {config.mountingRear === 'ME8' && (
                // ME8: Round Flange welded/bolted to the rear face
                <RoundFlange radius={boreRad} position={[-flangeThickness/2, 0, 0]} rotation={[0, 0, Math.PI/2]} />
            )}
            {(config.mountingRear === 'MP3' || config.mountingRear === 'MP5') && (
                <RearLug radius={boreRad} position={[0, 0, 0]} type={config.mountingRear} />
            )}
            {config.mountingRear === 'M0' && (
                // M0 logic: Threaded stud on the rear face
                <ThreadedStud 
                   radius={threadRadius} 
                   length={threadLength} 
                   position={[-threadLength/2, 0, 0]} 
                   rotation={[0, 0, Math.PI/2]} 
                />
            )}

            {/* Rear Port (On the tube surface) - Scaled */}
            <mesh position={[endBlockLen, portY, 0]} material={Materials.steel}>
                <cylinderGeometry args={[portRadius, portRadius, portHeight, 24]} />
            </mesh>
        </group>

      </group>

      {/* --- ROD ASSEMBLY (Moving) --- */}
      {/* Positioned relative to the front face (barrelLen) */}
      <group position={[(-barrelLen / 2) + barrelLen + currentExtension, 0, 0]}>
         
         {/* Rod Shaft */}
         {/* Extends backwards into the barrel */}
         <mesh rotation={[0, 0, -Math.PI / 2]} position={[- (strokeLen + (boreRad*4)) / 2, 0, 0]} castShadow material={getRodMaterial(config.coating)}>
             <cylinderGeometry args={[rodRad, rodRad, strokeLen + (boreRad*4), 32]} />
         </mesh>

         {/* Rod End - Threaded Stud */}
         {/* Starts exactly at the rod face */}
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
        : 'border-gray-200 hover:border-primary/50 hover:bg-gray-50'
      }
    `}
  >
    <div className={`${selected ? 'text-primary' : 'text-gray-400'}`}>
        {icon || <Box size={24} />}
    </div>
    <span className={`text-xs font-bold ${selected ? 'text-primary' : 'text-gray-600'}`}>{id}</span>
    <span className="text-[10px] text-gray-500 leading-tight px-1">{label}</span>
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
    extension: 0.3
  });

  // Update rod if bore changes and current rod is invalid
  useEffect(() => {
    const validRods = getRodOptions(config.bore);
    if (!validRods.includes(config.rod)) {
        setConfig(prev => ({ ...prev, rod: validRods[0] }));
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
      
      <div className="flex flex-col lg:flex-row h-[calc(100vh-80px)] overflow-hidden">
        
        {/* Left Panel: 3D View */}
        <div className="w-full lg:w-3/5 h-[50vh] lg:h-full relative bg-gray-100 border-r border-gray-200 order-1 lg:order-1">
           <div className="absolute top-4 left-4 z-10 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full text-sm font-bold text-primary shadow-sm">
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
           <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-3/4 max-w-md bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-lg border border-gray-200">
              <div className="flex justify-between items-center mb-2">
                 <span className="text-xs font-bold uppercase text-gray-500">Test Actuation</span>
                 <span className="text-xs font-mono text-primary font-bold">{(config.extension * 100).toFixed(0)}%</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="1" 
                step="0.01" 
                value={config.extension}
                onChange={(e) => handleChange('extension', parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
              />
           </div>
        </div>

        {/* Right Panel: Configuration Form */}
        <div className="w-full lg:w-2/5 h-[50vh] lg:h-full overflow-y-auto bg-white p-6 lg:p-10 order-2 lg:order-2 shadow-2xl z-10">
           <div className="max-w-xl mx-auto">
              <h1 className="text-2xl font-bold text-gray-800 mb-2">Configure Your Cylinder</h1>
              <p className="text-sm text-gray-500 mb-8">Define your specifications below. The 3D model updates automatically.</p>

              {/* Type Selection */}
              <div className="mb-8">
                 <label className="block text-sm font-bold text-gray-700 mb-2">Type <span className="text-red-500">*</span></label>
                 <select 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-white"
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
                 <label className="block text-sm font-bold text-gray-700 mb-3">Rear Mounting (Cap) <span className="text-red-500">*</span></label>
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
                 <label className="block text-sm font-bold text-gray-700 mb-3">Front Mounting (Head) <span className="text-red-500">*</span></label>
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
              <div className="mb-8">
                 <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-bold text-gray-700">Stroke (mm)</label>
                    <input 
                       type="number" 
                       value={config.stroke}
                       onChange={(e) => handleChange('stroke', parseInt(e.target.value))}
                       className="w-24 text-right p-1 border border-gray-300 rounded text-sm font-mono"
                       min={30} max={4000}
                    />
                 </div>
                 <input 
                    type="range" 
                    min={30} 
                    max={2000} 
                    value={config.stroke}
                    onChange={(e) => handleChange('stroke', parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-accent"
                 />
                 <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>30mm</span>
                    <span>2000mm+</span>
                 </div>
              </div>

              {/* Bore & Rod Grid */}
              <div className="grid grid-cols-2 gap-6 mb-8">
                 <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Bore (mm) <span className="text-red-500">*</span></label>
                    <select 
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                        value={config.bore}
                        onChange={(e) => handleChange('bore', parseInt(e.target.value))}
                    >
                        {boreSizes.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                 </div>
                 <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Piston Rod (mm) <span className="text-red-500">*</span></label>
                    <select 
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                        value={config.rod}
                        onChange={(e) => handleChange('rod', parseInt(e.target.value))}
                    >
                        {getRodOptions(config.bore).map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                 </div>
              </div>

              {/* Rod Coating */}
              <div className="mb-8">
                 <label className="block text-sm font-bold text-gray-700 mb-3">Piston Rod Material / Coating <span className="text-red-500">*</span></label>
                 <div className="space-y-3">
                    {[
                        { id: 'W', label: 'Welded (Standard)', desc: 'Standard chrome plated C45E' },
                        { id: 'S', label: 'Solid Forged', desc: 'Higher strength application' },
                        { id: 'HC', label: 'Hardened + Hard Chrome', desc: 'Extreme wear resistance' },
                        { id: 'NC', label: 'Nickel Plated + Chrome', desc: 'Superior corrosion resistance (Marine)' }
                    ].map((opt) => (
                        <label key={opt.id} className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all ${config.coating === opt.id ? 'border-primary bg-primary/5' : 'border-gray-200 hover:bg-gray-50'}`}>
                           <input 
                              type="radio" 
                              name="rod_coating" 
                              checked={config.coating === opt.id}
                              onChange={() => handleChange('coating', opt.id)}
                              className="mt-1 accent-primary"
                           />
                           <div>
                              <div className="text-sm font-bold text-gray-800">{opt.label}</div>
                              <div className="text-xs text-gray-500">{opt.desc}</div>
                           </div>
                        </label>
                    ))}
                 </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex gap-4 pt-4 border-t border-gray-100">
                  <button className="flex-1 bg-primary text-white font-bold py-4 rounded-lg shadow-lg hover:bg-primary-dark transition-colors flex items-center justify-center gap-2">
                     <Check size={20} /> Request Quote
                  </button>
                  <button className="px-6 py-4 border-2 border-gray-200 text-gray-600 font-bold rounded-lg hover:border-gray-300 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                     <Download size={20} /> PDF
                  </button>
              </div>

           </div>
        </div>

      </div>
    </>
  );
};
