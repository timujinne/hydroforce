import React from 'react';
import { Hero } from '../components/Hero';
import { HashLink } from 'react-router-hash-link';
import { SEO } from '../components/SEO';

export const Cylinders: React.FC = () => {
  return (
    <>
      <SEO 
        title="Hydraulic Cylinders"
        description="Custom and standard hydraulic cylinders manufactured for demanding conditions. Telescopic, high-pressure, and precision cylinders up to 500+ bar."
        keywords={['Hydraulic Cylinders', 'Custom Cylinders', 'Telescopic Cylinders', 'Heavy Duty Cylinders', 'Hydroforce']}
      />
      <Hero
        title="Hydraulic Cylinders"
        subtitle="Design and Production for All Tasks and Operating Conditions"
        description="Our company specializes in the production of highly loaded, non-standard and precision hydraulic cylinders designed for the most demanding operating conditions. From compact cylinders for mobile equipment to telescopic systems operating under 500+bar pressure, we develop custom solutions to meet any customer's requirements."
        bgImage="https://www.hydroforce.ee/wp-content/uploads/2025/03/Hero-Hydraulic-Cylinders-scaled.webp"
        stats={[
          { label: "Years of Experience", value: "30+" },
          { label: "Custom Projects", value: "1000+" },
          { label: "Working Pressure", value: "500+bar" }
        ]}
        buttons={[
          { label: "Request Quote", link: "#contacts", type: "primary" },
          { label: "View Products", link: "#products", type: "secondary" }
        ]}
      />

      {/* Gallery Showcase Section */}
      <section id="gallery" className="py-20 bg-bg-light">
         <div className="container mx-auto px-4">
            <div className="text-center mb-12">
               <h2 className="text-4xl font-bold text-primary mb-4">Custom Hydraulic Cylinders</h2>
               <p className="text-gray-600 text-xl">We specialize in challenges that standard solutions can't meet. Our experience includes:</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-6 lg:h-[500px]">
               {/* Left: Dual Image Card */}
               <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col h-[400px] lg:h-full group hover:-translate-y-2 transition-transform duration-300">
                  <div className="flex-1 flex">
                     <div className="w-1/2 bg-cover bg-center" style={{backgroundImage: `url('https://www.hydroforce.ee/wp-content/uploads/2025/06/bigTwo-2.webp')`}}></div>
                     <div className="w-1/2 bg-cover bg-center" style={{backgroundImage: `url('https://www.hydroforce.ee/wp-content/uploads/2025/06/4-3.webp')`}}></div>
                  </div>
                  <div className="bg-primary p-8 text-white group-hover:bg-primary-dark transition-colors">
                     <h3 className="text-2xl font-bold mb-2">Heavy-Duty Hydraulic Cylinders</h3>
                     <p className="opacity-90 text-lg">Final stage production - after testing and ready for shipment</p>
                  </div>
               </div>

               {/* Right: 2x2 Grid */}
               <div className="grid grid-cols-2 gap-4 h-[400px] lg:h-full">
                  <GridItem img="https://www.hydroforce.ee/wp-content/uploads/2025/09/5.webp" title="Ready for Shipment" subtitle="Large hydraulic cylinders prepared for delivery" />
                  <GridItem img="https://www.hydroforce.ee/wp-content/uploads/2025/06/Image_20231215114449.webp" title="Custom Solutions" subtitle="Engineered to specification" />
                  <GridItem img="https://www.hydroforce.ee/wp-content/uploads/2025/06/5-6.webp" title="Industrial Applications" subtitle="Heavy machinery systems" />
                  <GridItem img="https://www.hydroforce.ee/wp-content/uploads/2025/06/Image_20220127125542.webp" title="Quality Testing" subtitle="100% performance validation" />
               </div>
            </div>
         </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="why-choose" className="py-24 bg-white">
         <div className="container mx-auto px-4">
            <div className="text-center mb-16">
               <h2 className="text-4xl font-bold text-primary mb-4">Why Choose HydroForce?</h2>
               <p className="text-gray-600 text-xl">Leading expertise in hydraulic cylinder design and manufacturing</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
               <WhyCard title="Full-cycle production" text="Complete Production Cycle: design, machining, assembly, and testing capabilities" />
               <WhyCard title="Turnkey Manufacturing" text="From standard cylinders to complex telescopic systems and cylinders with progressive environments" />
               <WhyCard title="Engineering Excellence" text="Expert engineering support at every stage of the project with advanced CAD/CAM systems" />
               <WhyCard title="Quality & Standards" text="Consistent quality and full technical documentation compliant with ISO / DIN / DNV / ABS / API" />
            </div>
         </div>
      </section>

      {/* Applications Section */}
      <section id="industries" className="py-20 bg-bg-light">
         <div className="container mx-auto px-4">
            <div className="text-center mb-12">
               <h2 className="text-3xl font-bold text-primary mb-4">Applications</h2>
               <p className="text-gray-600 text-xl">Delivering hydraulic solutions across diverse industrial sectors</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <AppOverlay 
                 title="Mechanical Engineering" 
                 text="Presses, manipulators, automation systems" 
                 bg="https://www.hydroforce.ee/wp-content/uploads/2025/10/Industrial-Manufacturing-1.webp" 
               />
               <AppOverlay 
                 title="Construction" 
                 text="Telescopic lift cylinders, cranes, dump trucks" 
                 bg="https://www.hydroforce.ee/wp-content/uploads/2025/10/Construction-and-Road-Building-Equipment-1.webp" 
               />
               <AppOverlay 
                 title="Military and Aerospace" 
                 text="High-reliability specialized hydraulic cylinders" 
                 bg="https://www.hydroforce.ee/wp-content/uploads/2025/06/Rectangle-228.webp" 
               />
               <AppOverlay 
                 title="Mining and Metallurgy" 
                 text="Blast furnaces, manipulators, automation systems" 
                 bg="https://www.hydroforce.ee/wp-content/uploads/2025/10/Mining-Industry.webp" 
               />
               <AppOverlay 
                 title="Shipbuilding & Offshore" 
                 text="Steering mechanisms, hatches, anchor cylinders" 
                 bg="https://www.hydroforce.ee/wp-content/uploads/2025/10/Marine-and-Shipbuilding-1.webp" 
               />
               <AppOverlay 
                 title="Energy Sector" 
                 text="Synchronized multi-point cylinders, damper cylinders" 
                 bg="https://www.hydroforce.ee/wp-content/uploads/2025/10/HC-on-damb.webp" 
               />
            </div>
         </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white border-t border-gray-100">
          <div className="container mx-auto px-4 text-center">
              <h2 className="text-4xl font-bold text-primary mb-6">Ready to Order Custom Hydraulic Cylinders?</h2>
              <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">Contact our engineering team for technical consultation and custom manufacturing quote</p>
              <HashLink smooth to="#contacts" className="inline-block px-10 py-5 bg-gradient-to-r from-accent to-accent-dark text-white text-lg font-bold rounded-full shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all">
                  Request Quote
              </HashLink>
          </div>
      </section>

      {/* Technical Capabilities Section */}
      <section id="products" className="py-28 bg-cover bg-center bg-fixed relative" style={{backgroundImage: `linear-gradient(135deg, rgba(1, 87, 125, 0.9) 0%, rgba(1, 58, 82, 0.9) 100%), url('https://www.hydroforce.ee/wp-content/uploads/2025/10/Back-for-HC.webp')`}}>
         <div className="container mx-auto px-4 relative z-10 text-white">
            <div className="text-center mb-16">
               <h2 className="text-4xl font-bold mb-4 text-white">Technical Capabilities</h2>
               <p className="text-xl text-gray-200">Advanced manufacturing solutions for every hydraulic challenge</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
               <div className="bg-white/95 backdrop-blur-sm text-text-gray p-10 rounded-2xl shadow-2xl">
                  <h3 className="text-2xl font-bold mb-6 border-b pb-4 text-primary">Parameters</h3>
                  <ul className="space-y-3 text-lg text-gray-700">
                     <li><strong className="text-primary">Bore / Rod diameter:</strong> up to 1000 mm</li>
                     <li><strong className="text-primary">Total cylinder length:</strong> up to 16000 mm</li>
                     <li><strong className="text-primary">Number of telescopic stages:</strong> up to 9</li>
                     <li><strong className="text-primary">Working pressure:</strong> 500 bar and more</li>
                     <li><strong className="text-primary">Operating temperature:</strong> from -50°C to +200°C</li>
                     <li><strong className="text-primary">Rod coatings:</strong> Chrome plating, Titanium Nitride (TiN), Ceramic</li>
                     <li><strong className="text-primary">Materials:</strong> Carbon steel, stainless steel, titanium, bronze, exotic alloys</li>
                     <li><strong className="text-primary">Sealing systems:</strong> Parker, Hallite, Merkel, custom solutions</li>
                     <li><strong className="text-primary">Sensors:</strong> Position, pressure, temperature and other</li>
                     <li><strong className="text-primary">Protocols:</strong> CANopen, IO-link, analog signals</li>
                  </ul>
               </div>
               <div className="bg-white/95 backdrop-blur-sm text-text-gray p-10 rounded-2xl shadow-2xl">
                  <h3 className="text-2xl font-bold mb-6 border-b pb-4 text-primary">Capabilities</h3>
                  <ul className="space-y-4 text-lg text-gray-700">
                     {[
                       "Telescopic cylinders for lifters and mining trucks",
                       "Plunger-type cylinders with precision sealing and position feedback",
                       "Synchronized multi-point lifting systems for large structures",
                       "Cylinders with integrated sensors for stroke, pressure, and temperature",
                       "Twin and cascade cylinders for space-constrained applications",
                       "Marine-grade cylinders with OFFSHORE corrosion and DNV/ABS certification",
                       "Position, pressure, temperature and other sensors integration",
                       "CANopen, IO-Link, analog signals compatibility"
                     ].map((item, idx) => (
                       <li key={idx} className="flex items-start gap-3">
                         <span className="text-accent font-bold mt-1">•</span>
                         <span className="leading-relaxed">{item}</span>
                       </li>
                     ))}
                  </ul>
               </div>
            </div>
         </div>
      </section>

      {/* Quality & Project Section */}
      <section className="py-24 bg-[#002535] text-white relative">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Project Stages */}
            <div>
              <h2 className="text-3xl font-bold mb-8 text-white border-l-4 border-accent pl-4">Project Development Stages</h2>
              <ul className="space-y-6">
                {[
                  "Task analysis and technical specification (RFQ/TOR)",
                  "Design and modeling including FEA simulation",
                  "Manufacturing on high-precision equipment (DMG MORI, Haas)",
                  "Assembly, sealing, and dimensional inspection",
                  "Testing for pressure, leakage, and fatigue",
                  "Shipment with documentation, packaging, and certifications"
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-4 items-start group">
                    <div className="bg-white/10 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1 group-hover:bg-accent transition-colors">
                      <span className="font-bold text-sm">{idx + 1}</span>
                    </div>
                    <span className="text-lg text-gray-200 font-light leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quality Assurance */}
            <div>
              <h2 className="text-3xl font-bold mb-8 text-white border-l-4 border-accent pl-4">Quality Assurance & Testing</h2>
              <div className="bg-white/5 rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-colors">
                <ul className="space-y-4">
                  {[
                    "Every cylinder undergoes 100% final testing",
                    "Leak testing at working and overpressure",
                    "Dimensional and tolerance inspection",
                    "Electronic functionality testing (if applicable)",
                    "Engineering drawings and material certificates",
                    "Strength calculations and test protocols"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-4 text-lg text-gray-200 font-light">
                      <span className="text-green-400 text-xl">✔</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

const GridItem = ({img, title, subtitle}: {img: string, title: string, subtitle: string}) => (
   <div className="relative rounded-xl overflow-hidden group h-full shadow-lg">
      <img src={img} alt={title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
      <div className="absolute inset-x-0 bottom-0 bg-primary/95 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
         <h3 className="text-white font-bold text-lg mb-1">{title}</h3>
         <p className="text-white/80 text-sm leading-tight">{subtitle}</p>
      </div>
   </div>
);

const WhyCard = ({title, text}: {title: string, text: string}) => (
   <div className="bg-white p-8 rounded-xl shadow-card border-l-[6px] border-primary hover:border-accent h-full flex flex-col hover:-translate-y-2 transition-all duration-300 hover:shadow-card-hover">
      <h3 className="text-xl font-bold text-primary mb-3">{title}</h3>
      <p className="text-lg text-gray-600 leading-relaxed">{text}</p>
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