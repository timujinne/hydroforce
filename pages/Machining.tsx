
import React from 'react';
import { Hero } from '../components/Hero';
import { HashLink } from 'react-router-hash-link';

export const Machining: React.FC = () => {
  return (
    <>
      <Hero
        title="Machining"
        subtitle="Manufacturing of Standard, High-Precision, and Large-Scale Components"
        description="We offer comprehensive machining services for standard, precision, and large components, including custom gears with modern equipment and strict quality control."
        bgImage="https://www.hydroforce.ee/wp-content/uploads/2025/07/metalloobrabotka.webp"
        stats={[
          { label: "Precision", value: "±0.05mm" },
          { label: "Max Length", value: "16m" },
          { label: "Max Diameter", value: "2m" },
          { label: "Certified", value: "ISO 9001" }
        ]}
        buttons={[
            { label: "Get In Touch", link: "#contacts", type: "primary" },
            { label: "Our Capabilities", link: "#standard", type: "secondary" }
        ]}
      />

      <div className="section-divider"></div>

      {/* Standard Parts Production */}
      <section className="py-20 bg-bg-light relative" id="standard">
         <div className="absolute inset-0 bg-[url('https://www.hydroforce.ee/wp-content/uploads/2025/07/metalloobrabotka.webp')] bg-cover bg-center opacity-5 mix-blend-overlay"></div>
         <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Standard Parts Production</h2>
                <p className="text-xl text-gray-600 max-w-4xl mx-auto">We manufacture standard metal parts in series with typical sizes and tolerances, leveraging a versatile machine park for efficient large-batch processing.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <ListCard title="Typical Products" items={[
                    "Shafts and Axles",
                    "Flanges",
                    "Bushings",
                    "Housings",
                    "Brackets and Mounting Plates",
                    "Covers and Caps",
                    "Sleeves and Rings",
                    "Machined Blanks and Semi-finished Parts"
                ]} />
                
                <div className="bg-white p-8 rounded-xl shadow-card h-full border-l-4 border-primary">
                    <h3 className="text-2xl font-bold text-text-gray mb-6">Production Capabilities</h3>
                    <ul className="space-y-4">
                        <li className="flex flex-col gap-1 text-gray-600 text-lg">
                            <strong className="text-primary">Haas CNC Milling Centers:</strong>
                            Work envelope 1270 x 660 x 635 mm, high productivity and reliability
                        </li>
                        <li className="flex flex-col gap-1 text-gray-600 text-lg">
                            <strong className="text-primary">DMG MORI Turning Machines:</strong>
                            Diameter up to Ø500 mm, length up to 1000 mm, precise turning
                        </li>
                        <li className="flex flex-col gap-1 text-gray-600 text-lg">
                            <strong className="text-primary">Additional Equipment:</strong>
                            Precision grinding, drilling, and boring machines
                        </li>
                    </ul>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
               {["SPP1-removebg.webp", "Piston-backC-removebg.webp", "SPP3-removebg.webp", "SPP_4-removebg.webp"].map((img, i) => (
                  <div key={i} className="bg-white rounded-xl p-6 flex items-center justify-center shadow-md h-[250px] hover:-translate-y-1 transition-transform duration-300">
                     <img src={`https://www.hydroforce.ee/wp-content/uploads/2025/07/${img}`} className="max-h-full max-w-full object-contain" alt="Standard Part" />
                  </div>
               ))}
            </div>
         </div>
      </section>

      <div className="section-divider"></div>

      {/* High-Precision Components */}
      <section className="py-20 bg-bg-light relative" id="precision">
         <div className="absolute inset-0 bg-[url('https://www.hydroforce.ee/wp-content/uploads/2025/07/metalloobrabotka.webp')] bg-cover bg-center opacity-5 mix-blend-overlay"></div>
         <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">High-Precision Components</h2>
                <p className="text-xl text-gray-600 max-w-4xl mx-auto">We produce series of components with tight tolerances, form accuracy, and surface finish. Dimensional repeatability within IT6-IT7 and geometric control aligned with ISO 2768-fH, ISO 286, ISO 1101.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <ListCard title="Typical Products" items={[
                    "Precision parts for hydraulic and pneumatic systems",
                    "Bearing and seal seats",
                    "Shafts requiring minimal runout and high concentricity",
                    "Precision housings, flanges, and bushings"
                ]} />
                
                <ListCard title="Production Capabilities" items={[
                    "Haas CNC milling centers with thermal deformation and vibration compensation systems",
                    "Renishaw probing system for in-process measurement",
                    "DMG MORI CNC turning centers supporting precision fits H6/h6",
                    "Repeatable dimensional tolerances in IT6-IT7 range",
                    "Dedicated quality protocols with CMM inspection"
                ]} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               {["HPC1-removebg.webp", "HPC2-removebg.webp"].map((img, i) => (
                  <div key={i} className="bg-white rounded-xl p-8 flex items-center justify-center shadow-lg h-[400px] hover:-translate-y-1 transition-transform duration-300">
                     <img src={`https://www.hydroforce.ee/wp-content/uploads/2025/07/${img}`} className="max-h-full max-w-full object-contain" alt="High Precision Part" />
                  </div>
               ))}
            </div>
         </div>
      </section>

      <div className="section-divider"></div>

      {/* Large and Custom Components */}
      <section className="py-20 bg-bg-light relative" id="large">
         <div className="absolute inset-0 bg-[url('https://www.hydroforce.ee/wp-content/uploads/2025/07/metalloobrabotka.webp')] bg-cover bg-center opacity-5 mix-blend-overlay"></div>
         <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Large and Custom Components</h2>
                <p className="text-xl text-gray-600 max-w-4xl mx-auto">A strategic focus area with capacity to machine large parts such as rods and shafts up to 2 meters diameter and 16 meters length, including custom hydraulic cylinder parts.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <ListCard title="Typical Products" items={[
                    "Large-diameter rods and shafts",
                    "Oversized flanges and housings",
                    "Hydraulic cylinder bodies",
                    "Bushings and major hydraulic assemblies"
                ]} />
                
                <ListCard title="Production Capabilities" items={[
                    "DMG MORI milling centers with extended work envelope",
                    "Schiess lathes for parts up to 2 m diameter, 16 m length",
                    "Klingelnberg and Walter grinding and boring",
                    "Specialized lifting and handling equipment"
                ]} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[1.26fr_0.74fr] gap-6 h-auto md:h-[400px]">
               <div className="bg-white rounded-xl overflow-hidden shadow-lg group h-[400px]">
                  <img src="https://www.hydroforce.ee/wp-content/uploads/2025/07/LCC1.webp" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Large Component 1" />
               </div>
               <div className="bg-white rounded-xl overflow-hidden shadow-lg group h-[400px]">
                  <img src="https://www.hydroforce.ee/wp-content/uploads/2025/07/LCC2.webp" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Large Component 2" />
               </div>
            </div>
         </div>
      </section>

      <div className="section-divider"></div>

      {/* Industries Section */}
      <section className="py-20 bg-bg-light" id="industries">
         <div className="container mx-auto px-4">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Industries Served</h2>
                <p className="text-xl text-gray-600">Delivering precision machining solutions across diverse industrial sectors</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <AppOverlay 
                 title="Hydraulic & Industrial Machinery" 
                 text="Hydraulic cylinder components, pump and valve housings, power transmission parts" 
                 bg="https://www.hydroforce.ee/wp-content/uploads/2025/10/Industrial-Manufacturing-1.webp" 
               />
               <AppOverlay 
                 title="Power Generation" 
                 text="Hydro turbine components, thermal plant parts, generator housings" 
                 bg="https://www.hydroforce.ee/wp-content/uploads/2025/10/HC-on-damb.webp" 
               />
               <AppOverlay 
                 title="Shipbuilding & Marine" 
                 text="Propeller shafts, engine components, deck machinery parts" 
                 bg="https://www.hydroforce.ee/wp-content/uploads/2025/10/Marine-and-Shipbuilding-1.webp" 
               />
               <AppOverlay 
                 title="Mining & Metallurgy" 
                 text="Crusher components, mill parts, heavy-duty drives" 
                 bg="https://www.hydroforce.ee/wp-content/uploads/2025/10/Mining-Industry.webp" 
               />
               <AppOverlay 
                 title="Heavy Machinery" 
                 text="Construction equipment, transport machinery, agricultural equipment" 
                 bg="https://www.hydroforce.ee/wp-content/uploads/2025/10/Construction-and-Road-Building-Equipment-1.webp" 
               />
               <AppOverlay 
                 title="Custom Industries" 
                 text="Specialized machining for unique industrial applications" 
                 bg="https://www.hydroforce.ee/wp-content/uploads/2025/07/metalloobrabotka.webp" 
               />
            </div>
         </div>
      </section>

      <div className="section-divider"></div>

      {/* CTA Section */}
      <section className="py-16 bg-white text-center border-y border-gray-100">
          <div className="container mx-auto px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Ready to Start Your Project?</h2>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">Whether you need prototype support or full-scale production, we offer fast lead times, expert engineering, and reliable results.</p>
              <HashLink smooth to="#contacts" className="inline-block px-10 py-4 bg-primary text-white font-bold rounded-full shadow-lg hover:bg-primary-dark hover:-translate-y-1 transition-all">
                  Get In Touch
              </HashLink>
          </div>
      </section>

      <div className="section-divider"></div>

      {/* Custom Gears */}
      <section className="py-20 bg-bg-light relative" id="gears">
         <div className="absolute inset-0 bg-[url('https://www.hydroforce.ee/wp-content/uploads/2025/07/metalloobrabotka.webp')] bg-cover bg-center opacity-5 mix-blend-overlay"></div>
         <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Custom Gears</h2>
                <p className="text-xl text-gray-600 max-w-4xl mx-auto">We produce custom gears of various sizes and complexities, including large gears up to several meters diameter, tailored to your specifications.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <ListCard title="Production Capabilities" items={[
                    "Custom tooth counts, modules, profiles, helix angles per customer drawings",
                    "Machining of high-strength and alloy steels with heat treatment",
                    "Haas VF-5 CNC and DMG MORI CTX 510 turning centers",
                    "Specialized gear milling and grinding machines",
                    "Geometry and profile inspection via Zeiss Contura"
                ]} />
                
                <ListCard title="Applications" items={[
                    "Hydraulic drives and reducers",
                    "Lifting and transport machinery",
                    "Industrial and mobile equipment reducers",
                    "Energy sector drives",
                    "General and heavy machinery",
                    "Mining and metallurgy equipment"
                ]} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               {["CG1.webp", "CG2-removebg.webp", "CG3-removebg.webp"].map((img, i) => (
                  <div key={i} className="bg-white rounded-xl p-6 flex items-center justify-center shadow-lg h-[350px] hover:-translate-y-1 transition-transform duration-300 overflow-hidden">
                     <img src={`https://www.hydroforce.ee/wp-content/uploads/2025/07/${img}`} className="max-h-full max-w-full object-contain" alt="Custom Gear" />
                  </div>
               ))}
            </div>
         </div>
      </section>

      <div className="section-divider"></div>

      {/* Materials */}
      <section className="py-20 bg-bg-light relative" id="materials">
         <div className="absolute inset-0 bg-[url('https://www.hydroforce.ee/wp-content/uploads/2025/07/metalloobrabotka.webp')] bg-cover bg-center opacity-5 mix-blend-overlay"></div>
         <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Materials</h2>
                <p className="text-xl text-gray-600 max-w-4xl mx-auto">We use a broad range of metals and alloys compliant with international standards and customer specifications.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div className="bg-white p-8 rounded-xl shadow-card h-full border-l-4 border-primary">
                    <h3 className="text-2xl font-bold text-text-gray mb-6">Material Types</h3>
                    <ul className="space-y-4">
                        {[
                           { t: "Carbon and alloy steels", d: "(EN, DIN, AISI, ASTM) for structural strength" },
                           { t: "Stainless steels", d: "(EN 1.4301/304, 1.4404/316, etc.) for corrosion resistance" },
                           { t: "Aluminum alloys", d: "(6xxx, 7xxx series) for lightweight applications" },
                           { t: "Titanium alloys", d: "(EN standards) for high strength-to-weight ratio" },
                           { t: "Copper and bronze alloys", d: "for thermal/electrical conductivity" }
                        ].map((item, i) => (
                            <li key={i} className="text-lg text-gray-700">
                                <strong className="text-primary">{item.t}</strong> {item.d}
                            </li>
                        ))}
                    </ul>
                </div>
                
                <ListCard title="Additional Capabilities" items={[
                    "Heat treatments (quenching, tempering, normalization)",
                    "Surface hardening (nitriding, carburizing)",
                    "Incoming material inspections",
                    "Certificate verification and lab tests"
                ]} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               {["4.webp", "5.webp", "Image_20240715110925.webp"].map((img, i) => (
                  <div key={i} className="bg-white rounded-xl p-0 overflow-hidden shadow-lg h-[300px] hover:-translate-y-1 transition-transform duration-300 group">
                     <img src={`https://www.hydroforce.ee/wp-content/uploads/2025/07/${img}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Material" />
                  </div>
               ))}
            </div>
         </div>
      </section>

      <div className="section-divider"></div>

      {/* Quality Assurance */}
      <section className="py-20 bg-bg-light relative" id="quality">
         <div className="absolute inset-0 bg-[url('https://www.hydroforce.ee/wp-content/uploads/2025/07/metalloobrabotka.webp')] bg-cover bg-center opacity-5 mix-blend-overlay"></div>
         <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Quality Assurance</h2>
                <p className="text-xl text-gray-600 max-w-4xl mx-auto">Quality control is integral at every stage to guarantee reliability and compliance with high-demand sectors.</p>
            </div>

            <div className="bg-white/90 backdrop-blur-sm p-8 md:p-12 rounded-2xl shadow-xl border border-gray-100 mb-16">
                <h3 className="text-2xl font-bold text-primary mb-6 border-b border-gray-200 pb-4">Comprehensive Quality Control</h3>
                <ul className="space-y-4">
                    {[
                        { l: "Coverage", v: "Standard mass production parts, high-precision hydraulic and mechanical components, large shafts, housings, and flanges, custom gears including large diameter units" },
                        { l: "Equipment", v: "Zeiss Contura CMM for geometry validation, gear measurement tools and profilometers, laser trackers and 3D scanners, manual inspection tools for parts up to 16 m long" },
                        { l: "Inspection Regime", v: "Incoming and final inspection of geometry, materials, heat treatment, corrosion protection, marking, and packaging" },
                        { l: "Standards Compliance", v: "EN ISO 2768, DIN ISO 286-1, ISO 1328, ISO 9001 and customer specifications" },
                        { l: "Sectors Served", v: "Hydraulic and power transmission, energy and machinery manufacturing, heavy and custom equipment, mining, transport, and processing industries" }
                    ].map((item, i) => (
                        <li key={i} className="flex flex-col md:flex-row md:items-start gap-2 text-gray-700 text-lg">
                            <strong className="text-primary min-w-[220px]">{item.l}:</strong>
                            <span>{item.v}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-6 h-auto md:h-[320px]">
               <div className="bg-white rounded-xl overflow-hidden shadow-lg group h-[320px]">
                  <img src="https://www.hydroforce.ee/wp-content/uploads/2025/07/zeiss-contura-laboratory.webp" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Zeiss Laboratory" />
               </div>
               <div className="bg-white rounded-xl overflow-hidden shadow-lg group h-[320px]">
                  <img src="https://www.hydroforce.ee/wp-content/uploads/2025/07/Image_20240725104137.webp" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Measurement" />
               </div>
               <div className="bg-white rounded-xl overflow-hidden shadow-lg group h-[320px]">
                  <img src="https://www.hydroforce.ee/wp-content/uploads/2025/07/Image_20240725104235.webp" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Quality Process" />
               </div>
            </div>
         </div>
      </section>
    </>
  );
};

const ListCard = ({title, items}: {title: string, items: string[]}) => (
   <div className="bg-white p-8 rounded-xl shadow-card h-full border-l-4 border-primary hover:-translate-y-1 transition-transform">
      <h3 className="text-2xl font-bold text-text-gray mb-6">{title}</h3>
      <ul className="space-y-4">
         {items.map((it, i) => <li key={i} className="text-lg text-gray-600 leading-relaxed">• {it}</li>)}
      </ul>
   </div>
);

const AppOverlay = ({title, text, bg}: {title: string, text: string, bg: string}) => (
   <div className="relative h-[320px] rounded-2xl overflow-hidden group shadow-lg">
      <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{backgroundImage: `url(${bg})`}} />
      <div className="absolute bottom-0 left-0 right-0 bg-primary/90 p-6 transition-colors duration-300 group-hover:bg-accent/95">
         <h3 className="text-white font-bold text-xl mb-2 drop-shadow-md">{title}</h3>
         <p className="text-white/90 text-base font-medium leading-relaxed">{text}</p>
      </div>
   </div>
);
