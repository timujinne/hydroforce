import React, { useState, useRef, Suspense, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  OrbitControls, 
  Stage, 
  Environment, 
  PerspectiveCamera
} from '@react-three/drei';
import { SEO } from '../components/SEO';
import { Hero } from '../components/Hero';
import { HashLink } from 'react-router-hash-link';
import { Settings, Activity, Layers, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import * as THREE from 'three';

// --- 3D Components ---

const BoltCircle = ({ count, radius, position, rotation, size = 0.08 }: { count: number, radius: number, position: [number, number, number], rotation: [number, number, number], size?: number }) => {
  const bolts = [];
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    bolts.push(
      <mesh key={i} position={[x, y, 0]} rotation={[Math.PI/2, 0, 0]} castShadow>
        <cylinderGeometry args={[size, size, 0.15, 6]} />
        <meshStandardMaterial color="#cccccc" roughness={0.3} metalness={0.8} />
      </mesh>
    );
  }
  return (
    <group position={position} rotation={rotation}>
      {bolts}
    </group>
  );
};

const PortAssembly = ({ position }: { position: [number, number, number] }) => (
  <group position={position}>
    {/* Hex Nut Base */}
    <mesh position={[0, 0, 0]} castShadow>
      <cylinderGeometry args={[0.22, 0.22, 0.15, 6]} />
      <meshStandardMaterial color="#333" roughness={0.5} metalness={0.7} />
    </mesh>
    {/* Fitting Stem */}
    <mesh position={[0, 0.2, 0]} castShadow>
      <cylinderGeometry args={[0.12, 0.12, 0.3, 16]} />
      <meshStandardMaterial color="#333" roughness={0.5} metalness={0.7} />
    </mesh>
    {/* Red Cap */}
    <mesh position={[0, 0.4, 0]} castShadow>
      <cylinderGeometry args={[0.16, 0.16, 0.15, 16]} />
      <meshStandardMaterial color="#bc3636" roughness={0.3} metalness={0.1} />
    </mesh>
  </group>
);

const HydraulicCylinderModel = ({ extension }: { extension: number }) => {
  const rodGroupRef = useRef<THREE.Group>(null);
  
  // Materials
  const chromeMaterial = new THREE.MeshStandardMaterial({ 
    color: '#ffffff', 
    roughness: 0.05, 
    metalness: 1.0,
    envMapIntensity: 1.0
  });
  
  const paintMaterial = new THREE.MeshStandardMaterial({ 
    color: '#01577d', // Hydroforce Blue
    roughness: 0.2, 
    metalness: 0.3,
  });

  const steelMaterial = new THREE.MeshStandardMaterial({
    color: '#2a2a2a',
    roughness: 0.6,
    metalness: 0.6
  });

  const darkSteelMaterial = new THREE.MeshStandardMaterial({
    color: '#1a1a1a',
    roughness: 0.8,
    metalness: 0.4
  });

  // Geometry Constants
  const barrelLength = 3.8;
  const rodLength = 5.8; 
  
  // Animation Logic
  useFrame(() => {
    if (rodGroupRef.current) {
      // 0% Extension: Rod Eye sits flush with the gland
      // startX = -0.2 positions the eye assembly right against the gland face
      const startX = -0.2; 
      // Stroke length
      const stroke = 3.5; 
      
      const targetX = startX + (extension * stroke);
      rodGroupRef.current.position.x = THREE.MathUtils.lerp(rodGroupRef.current.position.x, targetX, 0.1);
    }
  });

  return (
    <group rotation={[0, -Math.PI / 6, 0]}>
      {/* --- Fixed Assembly (Barrel & Rear) --- */}
      <group position={[-1, 0, 0]}>
        {/* Tube Body */}
        <mesh rotation={[0, 0, -Math.PI / 2]} position={[0, 0, 0]} castShadow receiveShadow material={paintMaterial}>
          <cylinderGeometry args={[0.8, 0.8, barrelLength, 64]} />
        </mesh>
        
        {/* Rear Cap Block - Detailed */}
        <group position={[-2.05, 0, 0]}>
           <mesh rotation={[0, 0, -Math.PI / 2]} castShadow receiveShadow material={steelMaterial}>
             <cylinderGeometry args={[0.95, 0.95, 0.4, 32]} />
           </mesh>
           {/* Chamfer detail */}
           <mesh rotation={[0, 0, -Math.PI / 2]} position={[-0.2, 0, 0]} castShadow receiveShadow material={steelMaterial}>
             <cylinderGeometry args={[0.85, 0.95, 0.1, 32]} />
           </mesh>
        </group>
        {/* Rear Bolts */}
        <BoltCircle count={6} radius={0.65} position={[-2.26, 0, 0]} rotation={[0, Math.PI/2, 0]} />
        
        {/* Rear Clevis / Mounting Hub - Detailed */}
        <group position={[-2.65, 0, 0]}>
           {/* Main Block */}
           <mesh rotation={[0, 0, 0]} castShadow receiveShadow material={steelMaterial}>
              <boxGeometry args={[0.9, 1.4, 1.4]} />
           </mesh>
           {/* Rounded End */}
           <mesh rotation={[Math.PI/2, 0, 0]} position={[-0.45, 0, 0]} material={steelMaterial}>
              <cylinderGeometry args={[0.7, 0.7, 1.4, 32]} />
           </mesh>
           {/* Pin Hole */}
           <mesh rotation={[Math.PI/2, 0, 0]} position={[0, 0, 0]} material={darkSteelMaterial}>
              <cylinderGeometry args={[0.35, 0.35, 1.42, 32]} />
           </mesh>
        </group>

        {/* Front Gland/Head - Detailed */}
        <group position={[1.95, 0, 0]}>
           {/* Main Flange */}
           <mesh rotation={[0, 0, -Math.PI / 2]} castShadow receiveShadow material={steelMaterial}>
             <cylinderGeometry args={[0.95, 0.95, 0.5, 32]} />
           </mesh>
           {/* Wiper Seal Housing (Stepped) */}
           <mesh rotation={[0, 0, -Math.PI / 2]} position={[0.35, 0, 0]} castShadow receiveShadow material={steelMaterial}>
             <cylinderGeometry args={[0.6, 0.7, 0.2, 32]} />
           </mesh>
           {/* Wiper Seal (Black Ring) */}
           <mesh rotation={[0, 0, -Math.PI / 2]} position={[0.46, 0, 0]} material={darkSteelMaterial}>
             <torusGeometry args={[0.46, 0.04, 16, 32]} />
           </mesh>
        </group>
        
        {/* Front Bolts */}
        <BoltCircle count={8} radius={0.7} position={[2.21, 0, 0]} rotation={[0, Math.PI/2, 0]} />

        {/* Detailed Ports */}
        <PortAssembly position={[-1.2, 0.8, 0]} />
        <PortAssembly position={[1.4, 0.8, 0]} />
      </group>

      {/* --- Moving Assembly (Rod & Eye) --- */}
      {/* Initial position ensures rod is inside. We animate this group's X. */}
      <group ref={rodGroupRef} position={[0, 0, 0]}>
         
         {/* Rod Eye / Hub (The visible connection point) - Detailed */}
         <group position={[1.8, 0, 0]}>
            {/* Threaded Neck Area */}
            <mesh position={[-0.4, 0, 0]} rotation={[0, 0, -Math.PI/2]} castShadow material={steelMaterial}>
                <cylinderGeometry args={[0.5, 0.5, 0.8, 32]} />
            </mesh>
            {/* Jam Nut */}
            <mesh position={[-0.7, 0, 0]} rotation={[Math.PI/2, 0, 0]} castShadow material={steelMaterial}>
                <cylinderGeometry args={[0.6, 0.6, 0.3, 6]} />
            </mesh>

            {/* Eye Block - Rounded */}
            <group position={[0.2, 0, 0]}>
               <mesh rotation={[Math.PI/2, 0, 0]} castShadow material={steelMaterial}>
                  <cylinderGeometry args={[0.7, 0.7, 1.3, 32]} />
               </mesh>
               {/* Connection to neck */}
               <mesh position={[-0.35, 0, 0]} castShadow material={steelMaterial}>
                  <boxGeometry args={[0.7, 1.3, 1.3]} />
               </mesh>
               {/* Pin Hole */}
               <mesh rotation={[Math.PI/2, 0, 0]} material={darkSteelMaterial}>
                    <cylinderGeometry args={[0.35, 0.35, 1.32, 32]} />
               </mesh>
            </group>
         </group>

         {/* The Chrome Rod Shaft */}
         {/* It extends BACKWARDS from the Eye into the barrel */}
         <mesh rotation={[0, 0, -Math.PI / 2]} position={[-1.2, 0, 0]} castShadow material={chromeMaterial}>
            <cylinderGeometry args={[0.45, 0.45, rodLength, 32]} />
         </mesh>
      </group>
    </group>
  );
};

// --- UI Components ---

const SpecGauge = ({ label, value, unit, max, color = "primary" }: { label: string, value: number, unit: string, max: number, color?: "primary" | "accent" }) => (
  <div className="bg-white/90 backdrop-blur-sm p-4 rounded-lg border border-gray-200 shadow-sm min-w-[140px] flex-1">
    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1 font-bold">{label}</div>
    <div className="flex items-end gap-1">
      <span className={`text-3xl font-bold font-mono ${color === 'accent' ? 'text-accent' : 'text-primary'}`}>{value.toFixed(0)}</span>
      <span className="text-sm text-gray-400 mb-1 font-medium">{unit}</span>
    </div>
    <div className="w-full h-1.5 bg-gray-200 rounded-full mt-3 overflow-hidden">
      <div 
        className={`h-full transition-all duration-200 ${color === 'accent' ? 'bg-accent' : 'bg-primary'}`}
        style={{ width: `${Math.min((value / max) * 100, 100)}%` }}
      ></div>
    </div>
  </div>
);

const TestGraph = () => {
  // Simulating a square wave test cycle (Load -> Hold -> Release)
  const [dataPoints, setDataPoints] = useState<number[]>(new Array(60).fill(5));
  const [cycleCount, setCycleCount] = useState(12450);
  const [phase, setPhase] = useState(0); 

  useEffect(() => {
    const interval = setInterval(() => {
      setDataPoints(prev => {
        const newPoints = [...prev.slice(1)];
        
        let newValue = 5;
        const tick = phase % 80; 
        
        if (tick < 10) {
           newValue = 5 + Math.random() * 2; // Idle
        } else if (tick < 20) {
           newValue = 5 + ((tick - 10) / 10) * 90; // Rise
        } else if (tick < 50) {
           newValue = 95 + Math.random() * 3; // Hold High
        } else if (tick < 60) {
           newValue = 95 - ((tick - 50) / 10) * 90; // Fall
        } else {
           newValue = 5 + Math.random() * 2; // Idle
        }

        if (tick === 50) setCycleCount(c => c + 1); 

        newPoints.push(newValue);
        return newPoints;
      });
      
      setPhase(p => p + 1);
    }, 50); 
    return () => clearInterval(interval);
  }, [phase]);

  // Convert data points to SVG path
  const getPath = () => {
    const width = 100; 
    const step = width / (dataPoints.length - 1);
    
    let d = `M 0 ${100 - dataPoints[0]}`;
    dataPoints.forEach((val, i) => {
        if (i === 0) return;
        const x = i * step;
        const y = 100 - val;
        d += ` L ${x} ${y}`;
    });
    return d;
  };

  return (
    <div className="bg-[#0a0f14] border border-white/10 rounded-2xl p-6 relative shadow-2xl overflow-hidden h-full flex flex-col">
      <div className="flex justify-between items-start mb-6 relative z-10">
        <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <ShieldCheck className="text-green-400" />
                Lifecycle Test
            </h3>
            <div className="text-gray-400 text-sm mt-1 font-mono">Protocol: ISO-10100-Fatigue</div>
        </div>
        <div className="text-right">
            <div className="text-3xl font-bold font-mono text-white">{cycleCount.toLocaleString()}</div>
            <div className="text-xs text-gray-400 uppercase tracking-widest">Cycles Completed</div>
        </div>
      </div>
      
      {/* Oscilloscope Screen (SVG) */}
      <div className="flex-1 relative rounded-lg border border-white/5 bg-[#05080a] overflow-hidden">
          {/* Grid */}
          <div className="absolute inset-0" style={{ 
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', 
              backgroundSize: '20px 20px' 
          }}></div>

          {/* SVG Graph */}
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
             {/* Fill Area */}
             <path 
                d={`${getPath()} L 100 100 L 0 100 Z`} 
                fill="url(#gradient)" 
                opacity="0.2" 
                vectorEffect="non-scaling-stroke"
             />
             {/* Line */}
             <path 
                d={getPath()} 
                fill="none" 
                stroke="#22c55e" 
                strokeWidth="1.5" 
                vectorEffect="non-scaling-stroke"
                strokeLinejoin="round"
                strokeLinecap="round"
             />
             <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                   <stop offset="0%" stopColor="#22c55e" stopOpacity="0.8" />
                   <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
                </linearGradient>
             </defs>
          </svg>
          
          {/* Overlay Text */}
          <div className="absolute top-2 right-2 text-xs font-mono text-green-500/80">
              CH1: PRESSURE (BAR)
          </div>
      </div>
      
      <div className="flex justify-between text-xs text-gray-500 mt-3 font-mono uppercase">
          <span>Status: <span className="text-green-400">RUNNING</span></span>
          <span>Sample Rate: 50ms</span>
      </div>
    </div>
  );
};

export const CylinderShowcase: React.FC = () => {
  const [extension, setExtension] = useState(0); // Start fully retracted (0)
  const [pressure, setPressure] = useState(0); 

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setExtension(val);
    
    // Simulate pressure logic
    const randomNoise = Math.random() * 5;
    if (val > 0.02 && val < 0.98) {
        setPressure(180 + randomNoise); // Working pressure
    } else if (val >= 0.98) {
        setPressure(250 + randomNoise); // End stroke pressure spike
    } else {
        setPressure(10 + randomNoise); // Idle pressure
    }
  };

  return (
    <>
      <SEO 
        title="Interactive Cylinder Tech"
        description="Experience Hydroforce Engineering's hydraulic cylinder technology in 3D. Operate, test, and explore our precision manufacturing standards."
        keywords={['3D Cylinder', 'Interactive Hydraulics', 'Cylinder Testing', 'Hydraulic Engineering', 'Hydroforce']}
      />

      <Hero 
        title="Engineering In Motion"
        subtitle="Interactive 3D Visualization"
        description="Experience the precision of our hydraulic cylinders. Interact with the virtual model below to understand the mechanics and testing procedures."
        bgImage="https://www.hydroforce.ee/wp-content/uploads/2025/03/Hero-Hydraulic-Cylinders-scaled.webp"
        overlayType="dark"
      />

      {/* Interactive 3D Section */}
      <section className="relative h-[85vh] min-h-[700px] bg-gray-50 overflow-hidden flex flex-col border-b border-gray-200">
        
        {/* 3D Scene */}
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-gray-100 to-white">
          <Canvas shadows dpr={[1, 2]}>
            <PerspectiveCamera makeDefault position={[2, 3, 6.5]} fov={45} />
            <Suspense fallback={null}>
              <Stage environment="warehouse" intensity={0.7} adjustCamera={false}>
                   <HydraulicCylinderModel extension={extension} />
              </Stage>
              <Environment preset="city" />
            </Suspense>
            <OrbitControls enablePan={false} minPolarAngle={Math.PI / 6} maxPolarAngle={Math.PI / 2.2} />
          </Canvas>
        </div>

        {/* UI Overlay */}
        <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-end py-12 pointer-events-none">
          
          {/* Top Label */}
          <div className="absolute top-8 right-8 pointer-events-none hidden md:block">
             <div className="inline-block px-4 py-2 rounded-full bg-white/80 border border-gray-200 text-primary text-sm font-bold tracking-wider uppercase backdrop-blur-sm shadow-lg">
                Interactive Demo • Drag to Rotate
             </div>
          </div>

          {/* Controls & Gauges Container */}
          <div className="flex flex-col lg:flex-row items-end justify-between gap-6 pointer-events-auto">
            
            {/* Control Panel */}
            <div className="w-full lg:w-1/3 bg-white/80 backdrop-blur-xl border border-white/40 p-6 rounded-2xl shadow-2xl">
               <div className="flex justify-between items-center mb-6">
                  <h3 className="text-gray-800 font-bold text-lg flex items-center gap-2">
                    <Settings className="text-primary" size={20} />
                    Actuator Control
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    <span className="text-xs font-bold text-green-700 uppercase">Online</span>
                  </div>
               </div>
               
               <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-sm text-gray-600 mb-3 font-medium">
                      <span>Retracted</span>
                      <span className="font-mono text-primary font-bold text-lg">{(extension * 100).toFixed(0)}%</span>
                      <span>Extended</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="1" 
                      step="0.005" 
                      value={extension} 
                      onChange={handleSliderChange}
                      className="w-full h-4 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary hover:accent-primary-light transition-all shadow-inner"
                    />
                  </div>
               </div>
            </div>

            {/* Telemetry */}
            <div className="flex gap-4 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0">
               <SpecGauge label="System Pressure" value={pressure} unit="BAR" max={300} color="accent" />
               <SpecGauge label="Rod Stroke" value={extension * 1200} unit="MM" max={1200} />
               <SpecGauge label="Force" value={extension > 0 ? (pressure * 12.5) : 0} unit="kN" max={4000} />
            </div>

          </div>
        </div>
      </section>

      {/* Manufacturing Process / Assembly */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
           <div className="flex flex-col items-center text-center mb-16">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6">
                 <Layers size={32} />
              </div>
              <h2 className="text-4xl font-bold text-primary mb-4">Precision Assembly</h2>
              <p className="text-xl text-gray-600 max-w-2xl">Every cylinder is a complex assembly of precision-machined components, engineered to work in perfect harmony.</p>
           </div>

           <div className="relative">
              {/* Timeline / Connector Line */}
              <div className="absolute top-8 lg:top-1/2 left-0 w-1 h-full lg:w-full lg:h-1 bg-gray-100 lg:-translate-y-1/2 z-0 ml-8 lg:ml-0"></div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative z-10 pl-20 lg:pl-0">
                 <ProcessCard 
                   step="01"
                   title="Machining & Preparation"
                   desc="Barrels are honed to H8 tolerance. Rods are induction hardened and chrome plated. Components are washed in ultrasonic baths."
                   icon={<Settings />}
                 />
                 <ProcessCard 
                   step="02"
                   title="Clean Room Assembly"
                   desc="Assembly takes place in a controlled environment. High-performance seals (Parker, Hallite) are installed using specialized tooling."
                   icon={<Layers />}
                 />
                 <ProcessCard 
                   step="03"
                   title="Final Torque & Paint"
                   desc="Pistons and glands are torqued to specific values. The cylinder is painted with 2-component epoxy for maximum corrosion resistance."
                   icon={<CheckCircle2 />}
                 />
              </div>
           </div>
        </div>
      </section>

      {/* Testing Visualization */}
      <section className="py-24 bg-primary text-white relative">
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
         
         <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-stretch">
               
               <div className="flex flex-col justify-center">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-accent font-bold mb-6 w-fit">
                     <Activity size={18} />
                     TEST BENCH PROTOCOL
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold mb-6">100% Verified Performance</h2>
                  <p className="text-lg text-gray-200 mb-8 leading-relaxed">
                     We don't just build; we prove. Every single cylinder undergoes a rigorous testing cycle on our digital test bench before it leaves the factory. We simulate real-world loads to ensure reliability.
                  </p>
                  
                  <ul className="space-y-4">
                     <TestItem label="Static Pressure Test" value="1.5x Working Pressure" />
                     <TestItem label="Dynamic Cycling" value="Full Stroke Verification" />
                     <TestItem label="Internal Bypass Check" value="Zero Leakage Tolerance" />
                     <TestItem label="Rod Seal Integrity" value="Visual & Digital Inspection" />
                  </ul>

                  <HashLink smooth to="/#contacts" className="mt-10 inline-flex items-center gap-3 bg-white text-primary px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl hover:-translate-y-1 transform w-fit">
                     Request Test Report Example <ArrowRight size={20} />
                  </HashLink>
               </div>

               {/* Visual Graph Representation */}
               <div className="h-full min-h-[400px]">
                  <TestGraph />
               </div>

            </div>
         </div>
      </section>
    </>
  );
};

const ProcessCard = ({step, title, desc, icon}: {step: string, title: string, desc: string, icon: React.ReactElement}) => (
   <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 relative group hover:-translate-y-2 transition-transform duration-300 h-full">
      <div className="absolute -left-16 top-0 lg:-top-6 lg:left-8 bg-primary text-white w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold shadow-lg z-20">
         {step}
      </div>
      <div className="mt-2 lg:mt-6 mb-4 text-primary/80 group-hover:text-accent transition-colors">
         {React.cloneElement(icon as React.ReactElement<any>, { size: 32 })}
      </div>
      <h3 className="text-2xl font-bold text-primary mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{desc}</p>
   </div>
);

const TestItem = ({label, value}: {label: string, value: string}) => (
   <li className="flex items-center justify-between border-b border-white/10 pb-3">
      <span className="text-gray-300 font-medium">{label}</span>
      <span className="text-white font-bold">{value}</span>
   </li>
);
