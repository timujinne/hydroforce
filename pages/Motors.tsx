import React from 'react';
import { Hero } from '../components/Hero';
import { HashLink } from 'react-router-hash-link';
import { SEO } from '../components/SEO';

export const Motors: React.FC = () => {
  return (
    <>
      <SEO 
        title="Hydraulic Motors and Pumps"
        description="Hydroforce offers a complete range of gear, planetary, axial-piston, and radial-piston hydraulic motors. Engineered for reliability in mobile and industrial applications."
        keywords={['Hydraulic Motors', 'Hydraulic Pumps', 'Gear Motors', 'Piston Motors', 'Radial Piston', 'Hydroforce']}
      />
      <Hero
        title="Hydraulic Motors and Pumps by Hydroforce"
        subtitle="Engineered for reliable performance across mobile and industrial applications"
        description="We supply gear, planetary, axial-piston, and radial-piston hydraulic motors with specifications aligned for interchangeability in common equipment platforms, offering compatible replacements for leading European brands."
        bgImage="https://www.hydroforce.ee/wp-content/uploads/2025/10/2e1f0bae-32e6-432e-b83e-3f83b61386f3.webp"
        stats={[
          { label: 'Years of Expertise', value: '25+' },
          { label: 'Motor Models', value: '500+' },
          { label: 'Max Pressure', value: '450 bar' },
        ]}
        buttons={[
          { label: 'View Products', link: '#products', type: 'primary' },
          { label: 'Get in Touch', link: '#contacts', type: 'secondary' },
        ]}
      />

      {/* Product Types */}
      <section id="products" className="py-24 bg-bg-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">
              Hydraulic Motor Types
            </h2>
            <p className="text-gray-600 text-xl max-w-3xl mx-auto">
              Complete range of gear, planetary, axial-piston, and radial-piston
              hydraulic motors designed for interchangeability
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            <ProductCard
              img="https://www.hydroforce.ee/wp-content/uploads/2025/09/HP0005.webp"
              title="Gear Motors"
              desc="Compatible replacements aligned with widely used M+S and Danfoss footprints for broad application coverage."
            />
            <ProductCard
              img="https://www.hydroforce.ee/wp-content/uploads/2025/09/НМ002701.webp"
              title="Planetary Motors"
              desc="Available in multiple configurations including 2, 3, 4, 5, and 6-speed versions plus wheel drive motors."
            />
            <ProductCard
              img="https://www.hydroforce.ee/wp-content/uploads/2025/09/HM003101.webp"
              title="Axial-Piston Motors"
              desc="Fixed and variable displacement models compatible with Rexroth A2F, A6V, and A10V series."
            />
            <ProductCard
              img="https://www.hydroforce.ee/wp-content/uploads/2025/09/HM0024021В.webp"
              title="Radial-Piston Motors"
              desc="High-torque solutions for demanding applications, compatible with leading European designs."
            />
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="section-header text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">
              Why Choose Hydroforce
            </h2>
            <p className="text-gray-600 text-xl">
              Engineering excellence meets practical application
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                t: 'High torque in a compact design',
                d: 'Delivering substantial torque even at low speeds while saving installation space.',
              },
              {
                t: 'Smooth speed and direction control',
                d: 'Wide operating range, precise positioning, and easy reversing capability.',
              },
              {
                t: 'Durability and reliability in harsh environments',
                d: 'Proven performance under heavy loads, vibration, dust, and moisture with long service life.',
              },
              {
                t: 'Versatility and easy integration',
                d: 'Compatible with various hydraulic systems and suitable for mobile, industrial, and marine applications.',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="p-8 rounded-2xl bg-white shadow-card border-l-[6px] border-primary hover:border-accent transition-all duration-300 hover:-translate-y-2 hover:shadow-card-hover group"
              >
                <h4 className="text-xl font-bold mb-4 text-primary group-hover:text-accent transition-colors">
                  {item.t}
                </h4>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {item.d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Showcase Gallery */}
      <section className="py-24 bg-bg-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">
              Precision Engineering in Every Detail
            </h2>
            <p className="text-gray-600 text-xl">
              Explore our range of hydraulic motors and components manufactured
              with highest quality standards
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 min-h-0 lg:min-h-[600px]">
            {/* Left Column - Main Image & 2 Small Images */}
            <div className="grid grid-rows-[2fr_1fr] gap-8 h-auto lg:h-full">
              {/* Main Image */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden h-[350px] lg:h-auto relative group p-10 border border-gray-100">
                <img
                  src="https://www.hydroforce.ee/wp-content/uploads/2025/10/HM-I.webp"
                  alt="High-Performance Hydraulic Motor"
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700 ease-in-out"
                />
              </div>
              {/* Small Images Left Col */}
              <div className="grid grid-cols-2 gap-8 h-[200px] lg:h-auto">
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden relative group p-6 border border-gray-100">
                  <img
                    src="https://www.hydroforce.ee/wp-content/uploads/2025/10/HF-motor.webp"
                    alt="Precision Hydraulic Motor"
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden relative group p-6 border border-gray-100">
                  <img
                    src="https://www.hydroforce.ee/wp-content/uploads/2025/10/motor2.webp"
                    alt="Precision Hydraulic Motor"
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>

            {/* Right Column - 6 Images Grid */}
            <div className="grid grid-cols-2 grid-rows-3 gap-8 h-[600px] lg:h-full mt-6 lg:mt-0">
              {[
                'HMCRE03-2-11A-B02-2A20-2.webp',
                'HMSE05-3-113-F04-2A50-1.webp',
                'HMCRE05-2-19A-B04-1140-8B-1.webp',
                'HMSE02-2-123-R02-1120-YJ00-1.webp',
                'HMSE05-2-133-R05-1220-1.webp',
                'HMS08-2-121-R08-1120-1-1.webp',
              ].map((img, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden relative group p-6 border border-gray-100"
                >
                  <img
                    src={`https://www.hydroforce.ee/wp-content/uploads/2025/10/${img}`}
                    alt={`Hydraulic Component ${idx}`}
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Applications Overlay Grid */}
      <section id="applications" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="section-header text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">
              Industry Applications
            </h2>
            <p className="text-gray-600 text-xl">
              Powering diverse industrial sectors with specialized hydraulic
              solutions
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AppCard
              title="Construction and Road-Building Equipment"
              bg="https://www.hydroforce.ee/wp-content/uploads/2025/10/Construction-and-Road-Building-Equipment-1.webp"
              items={[
                'Excavators (track drives, swing mechanisms)',
                'Bulldozers (blade drives)',
                'Asphalt pavers (drives of working units)',
              ]}
            />
            <AppCard
              title="Mining Industry"
              bg="https://www.hydroforce.ee/wp-content/uploads/2025/10/Mining-Industry.webp"
              items={[
                'Hydraulic drilling rigs',
                'Continuous miners',
                'Conveyor systems for ore transportation',
              ]}
            />
            <AppCard
              title="Agriculture"
              bg="https://www.hydroforce.ee/wp-content/uploads/2025/10/Agriculture-1.webp"
              items={[
                'Harvesters (header, auger, and conveyor drives)',
                'Sprayers and feed dispensers',
                'Tractors (attachments and hydrostatic wheel drives)',
              ]}
            />
            <AppCard
              title="Industrial Manufacturing"
              bg="https://www.hydroforce.ee/wp-content/uploads/2025/10/Industrial-Manufacturing-1.webp"
              items={[
                'Metalworking machines (rotary tables, clamping devices)',
                'Hydraulic presses (feeding and rotation drives)',
                'Robotic manipulators',
              ]}
            />
            <AppCard
              title="Marine and Shipbuilding"
              bg="https://www.hydroforce.ee/wp-content/uploads/2025/10/Marine-and-Shipbuilding-1.webp"
              items={[
                'Winches and windlasses',
                'Steering gear drives',
                'Cranes and lifting devices on ships',
              ]}
            />
            <AppCard
              title="Municipal Equipment"
              bg="https://www.hydroforce.ee/wp-content/uploads/2025/10/Municipal-Equipment-1.webp"
              items={[
                'Aerial work platforms',
                'Snow removal equipment',
                'Waste management vehicles',
                'Forestry machinery',
              ]}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-bg-light border-y border-gray-200">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-primary mb-6">
            Get Expert Technical Support
          </h2>
          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
            Our engineering team is ready to help you select the perfect
            hydraulic motor solution for your application
          </p>
          <HashLink
            smooth
            to="#contacts"
            className="inline-block px-10 py-5 bg-gradient-to-r from-accent to-accent-dark text-white text-lg font-bold rounded-full shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all"
          >
            Contact Engineering Team
          </HashLink>
        </div>
      </section>

      {/* Specs */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="section-header text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">
              Technical Specifications
            </h2>
            <p className="text-gray-600 text-xl">
              Industry-leading performance parameters
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <SpecBox
              title="Performance Range"
              items={[
                'Pressure: Up to 450 bar continuous',
                'Torque Output: 0.5 - 50,000 Nm',
                'Speed Range: 0.5 - 10,000 RPM',
                'Displacement: 8 - 8000 cc/rev',
              ]}
            />
            <SpecBox
              title="Operating Conditions"
              items={[
                'Temperature: -40°C to +120°C',
                'Efficiency: Up to 95%',
                'Fluid Compatibility: Mineral oils, synthetic fluids',
                'Filtration: ISO 4406 18/16/13',
              ]}
            />
            <SpecBox
              title="Mounting Options"
              items={[
                'Flanges: SAE, ISO, custom configurations',
                'Shafts: Splined, keyed, tapered',
                'Ports: SAE, BSP, metric threads',
                'Special Features: Integrated valves, sensors',
              ]}
            />
          </div>
        </div>
      </section>

      {/* Manufacturing & Quality Dark Section */}
      <section
        className="py-28 bg-cover bg-center text-white relative"
        style={{
          backgroundImage: `linear-gradient(rgba(2, 24, 34, 0.9), rgba(0, 58, 82, 0.92)), url('https://www.hydroforce.ee/wp-content/uploads/2025/10/e312721e-d519-4d51-871f-a47183971ec3.webp')`,
        }}
      >
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16 max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Manufacturing & Quality
            </h2>
            <p className="text-xl text-gray-200 font-light">
              Unified excellence in production and verification ensuring the
              highest international standards.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 relative items-start">
            {/* Vertical Divider for Desktop */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent -ml-px"></div>

            {/* Manufacturing Excellence */}
            <div>
              <div className="mb-10">
                <h3 className="text-3xl font-bold mb-6 text-accent">
                  Manufacturing Excellence
                </h3>
                <p className="text-lg opacity-90 leading-relaxed text-gray-200 font-light">
                  State-of-the-art production facilities equipped with modern
                  CNC machining centers, precision turning machines, and
                  advanced quality control systems ensure every motor meets the
                  highest international standards.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <StatSmall
                  val="50,000+"
                  label="Motors produced annually with consistent quality"
                />
                <StatSmall
                  val="ISO 9001"
                  label="Certified quality management system"
                />
                <StatSmall
                  val="Modern CNC"
                  label="Advanced machining centers for precision manufacturing"
                />
                <StatSmall
                  val="100% Testing"
                  label="Every motor tested before delivery"
                />
              </div>
            </div>

            {/* Quality Assurance */}
            <div>
              <div className="mb-10">
                <h3 className="text-3xl font-bold mb-6 text-accent">
                  Quality Assurance
                </h3>
                <p className="text-lg opacity-90 text-gray-200 font-light">
                  Rigorous testing and inspection procedures guarantee reliable
                  performance
                </p>
              </div>
              <div className="space-y-5">
                <QualityItem
                  title="Pressure Testing"
                  text="Every motor tested to 500 bar to ensure structural integrity and leak-proof operation under extreme conditions"
                />
                <QualityItem
                  title="Performance Verification"
                  text="Flow rate, torque output, and efficiency validated against specifications on dedicated test benches"
                />
                <QualityItem
                  title="Full Traceability"
                  text="Batch numbers and quality certificates ensure complete tracking from raw materials to finished product"
                />
                <QualityItem
                  title="Extended Warranty"
                  text="24-month standard warranty coverage with extended options available for added peace of mind"
                />
                <QualityItem
                  title="Material Inspection"
                  text="Incoming material verification and in-process dimensional checks using precision measurement equipment"
                />
                <QualityItem
                  title="Continuous Improvement"
                  text="Regular audits, employee training, and feedback loops drive ongoing quality enhancements"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

const ProductCard = ({
  img,
  title,
  desc,
}: {
  img: string;
  title: string;
  desc: string;
}) => (
  <div className="bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover hover:-translate-y-2 transition-all duration-300 h-full flex flex-col border border-gray-100">
    <div className="h-[320px] bg-bg-light p-8 flex items-center justify-center overflow-hidden border-b border-gray-50">
      <img
        src={img}
        alt={title}
        className="max-w-full max-h-full object-contain hover:scale-110 transition-transform duration-500"
      />
    </div>
    <div className="p-8 flex-grow flex flex-col">
      <h4 className="text-2xl font-bold text-text-gray mb-3">{title}</h4>
      <p className="text-gray-600 text-base leading-relaxed">{desc}</p>
    </div>
  </div>
);

// Modified AppCard to match Cylinders style (Bottom Block Overlay)
const AppCard = ({
  title,
  bg,
  items,
}: {
  title: string;
  bg: string;
  items: string[];
}) => (
  <div className="relative h-[500px] rounded-2xl overflow-hidden group shadow-lg">
    <div
      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
      style={{ backgroundImage: `url(${bg})` }}
    />

    {/* Bottom Overlay with List */}
    <div className="absolute bottom-0 left-0 right-0 bg-primary/90 p-8 transition-colors duration-300 group-hover:bg-accent/95 flex flex-col justify-start">
      <h4 className="text-2xl font-bold text-white mb-4 border-b-2 border-white/30 pb-3 leading-snug shadow-sm">
        {title}
      </h4>
      <ul className="space-y-2">
        {items.map((it, i) => (
          <li
            key={i}
            className="text-white/90 text-base font-medium flex items-start gap-3"
          >
            <span className="mt-2 w-1.5 h-1.5 bg-white rounded-full flex-shrink-0 shadow-sm"></span>
            <span className="leading-relaxed">{it}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

const SpecBox = ({ title, items }: { title: string; items: string[] }) => (
  <div className="bg-white p-10 rounded-2xl shadow-lg border border-gray-100 hover:border-primary/30 transition-colors h-full">
    <h3 className="text-2xl font-bold text-text-gray mb-6 border-b pb-4 text-primary">
      {title}
    </h3>
    <ul className="space-y-4">
      {items.map((it, i) => (
        <li key={i} className="text-gray-700 flex items-start gap-3 text-lg">
          <span className="text-accent font-bold mt-1 text-xl">✓</span>{' '}
          <span className="flex-1 font-medium">{it}</span>
        </li>
      ))}
    </ul>
  </div>
);

const StatSmall = ({ val, label }: { val: string; label: string }) => (
  <div className="bg-white/10 backdrop-blur-xl border border-white/30 p-8 rounded-2xl hover:bg-white/20 transition-all shadow-2xl h-full flex flex-col justify-center hover:-translate-y-1 duration-300">
    <strong className="block text-4xl font-bold text-accent mb-3 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
      {val}
    </strong>
    <p className="text-lg text-white font-medium leading-relaxed opacity-95">
      {label}
    </p>
  </div>
);

const QualityItem = ({ title, text }: { title: string; text: string }) => (
  <div className="flex gap-6 items-start group p-4 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/10">
    <div className="text-accent font-bold text-3xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300 mt-1">
      ✓
    </div>
    <div>
      <h4 className="text-white font-bold text-xl mb-2 group-hover:text-accent transition-colors duration-300">
        {title}
      </h4>
      <p className="text-gray-200 text-lg leading-relaxed font-light">{text}</p>
    </div>
  </div>
);