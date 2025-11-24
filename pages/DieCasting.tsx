import React from 'react';
import { Hero } from '../components/Hero';
import { HashLink } from 'react-router-hash-link';
import { SEO } from '../components/SEO';

export const DieCasting: React.FC = () => {
  return (
    <>
      <SEO
        title="High-Pressure Die Casting (HPDC)"
        description="Precision aluminum die casting services for complex components. High-pressure die casting offers dimensional accuracy, efficiency, and superior surface finish."
        keywords={[
          'Die Casting',
          'HPDC',
          'Aluminum Casting',
          'High Pressure Die Casting',
          'Hydroforce',
        ]}
      />
      <Hero
        title="High-Pressure Die Casting (HPDC)"
        subtitle="Precision, Efficiency, and Exceptional Surface Quality"
        description="Looking for high-volume production of complex aluminum parts with superior dimensional accuracy? Our High-Pressure Die Casting (HPDC) technology delivers exceptional results for demanding applications."
        bgImage="https://www.hydroforce.ee/wp-content/uploads/2025/03/Hero-Die-Casting-scaled.webp"
        stats={[
          { label: 'Tolerance', value: '±0.1mm' },
          { label: 'Cycle Time', value: '30s-2min' },
          { label: 'Daily Output', value: '1000+ Parts' },
        ]}
        buttons={[
          { label: 'Request Quote', link: '#contacts', type: 'primary' },
          {
            label: 'View Capabilities',
            link: '#advantages',
            type: 'secondary',
          },
        ]}
      />

      <div className="section-divider"></div>

      {/* Advantages Section */}
      <section id="advantages" className="py-20 bg-bg-light relative">
        <div className="absolute inset-0 bg-[url('https://www.hydroforce.ee/wp-content/uploads/2025/07/storage-e1752045958263.webp')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              High-Pressure Die Casting (HPDC)
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <AdvantageCard
              title="Dimensional Accuracy"
              items={[
                'Tight tolerances: ±0.1-0.3mm achievable',
                'Excellent surface finish (Ra 1.6-6.3 μm)',
                'Minimal post-machining required',
                'Consistent repeatability across production runs',
              ]}
            />
            <AdvantageCard
              title="High Production Efficiency"
              items={[
                'Fast cycle times (30 seconds to 2 minutes)',
                'High-volume production capability',
                'Automated processes for consistency',
                'Reduced labor costs through automation',
              ]}
            />
            <AdvantageCard
              title="Complex Geometries"
              items={[
                'Thin-wall sections (0.5-1.5mm)',
                'Complex internal features and cavities',
                'Integrated design features reduce assembly',
                'Near-net-shape manufacturing capabilities',
              ]}
            />
            <AdvantageCard
              title="Material Properties"
              items={[
                'Excellent strength-to-weight ratio',
                'Superior mechanical properties',
                'Corrosion resistance capabilities',
                'Thermal conductivity for heat dissipation',
              ]}
            />
            <AdvantageCard
              title="Cost Effectiveness"
              items={[
                'Lower per-unit costs for high volumes',
                'Reduced material waste',
                'Minimal finishing operations required',
                'Faster time-to-market for new products',
              ]}
            />
            <AdvantageCard
              title="Versatile Applications"
              items={[
                'Automotive components',
                'Electronic housings',
                'Industrial machinery parts',
                'Aerospace and defense applications',
              ]}
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { img: '5-1.webp', alt: 'High-Pressure Die Cast Part' },
              { img: '2.webp', alt: 'Aluminum Die Casting' },
              { img: 'DSCN9380.webp', alt: 'Precision Die Cast Component' },
              { img: 'IMGP3875CC.webp', alt: 'Complex Die Cast Part' },
              { img: 'DSCN9436.webp', alt: 'Die Cast Component' },
              { img: 'DSCN9429.webp', alt: 'Precision Part' },
              { img: '10.webp', alt: 'Complex Geometry' },
              { img: 'IMGP3878CC.webp', alt: 'Finished Product' },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-xl shadow-md flex items-center justify-center h-48 hover:-translate-y-1 transition-transform duration-300"
              >
                <img
                  src={`https://www.hydroforce.ee/wp-content/uploads/2025/07/${item.img}`}
                  className="max-h-full max-w-full object-contain"
                  alt={item.alt}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider"></div>

      {/* Tooling & Mold Design Section */}
      <section className="py-20 bg-bg-light relative">
        <div className="absolute inset-0 bg-[url('https://www.hydroforce.ee/wp-content/uploads/2025/07/storage2.webp')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Tooling & Mold Design
            </h2>
            <p className="text-xl text-gray-600">
              Advanced mold design and manufacturing capabilities for optimal
              die casting results
            </p>
          </div>

          <div className="bg-white/90 backdrop-blur-sm p-8 md:p-12 rounded-2xl shadow-xl border border-gray-100 mb-16">
            <h3 className="text-2xl font-bold text-primary mb-6 border-b border-gray-200 pb-4">
              Advanced Manufacturing Capabilities
            </h3>
            <ul className="space-y-4">
              {[
                {
                  l: 'Advanced CAD/CAM Design',
                  v: 'State-of-the-art software for optimal mold geometry and cooling channel design',
                },
                {
                  l: 'Precision Machining',
                  v: 'CNC machining centers ensure accurate mold cavities and precise surface finishes',
                },
                {
                  l: 'High-Quality Tool Steel',
                  v: 'Premium grade tool steels (H13, P20) for extended mold life and durability',
                },
                {
                  l: 'Thermal Management',
                  v: 'Advanced cooling/heating systems for optimal cycle times and part quality',
                },
                {
                  l: 'Ejection Systems',
                  v: 'Carefully designed ejector systems to prevent part damage and ensure smooth release',
                },
                {
                  l: 'Quality Validation',
                  v: 'Comprehensive testing and validation before production to ensure optimal performance',
                },
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex flex-col md:flex-row md:items-start gap-2 text-gray-700 text-lg"
                >
                  <strong className="text-primary min-w-[220px]">
                    {item.l}:
                  </strong>
                  <span>{item.v}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {['mold1.webp', 'mold2.webp', 'mold3.webp'].map((img, i) => (
              <div
                key={i}
                className="bg-white p-4 rounded-xl overflow-hidden shadow-lg h-[450px] group"
              >
                <img
                  src={`https://www.hydroforce.ee/wp-content/uploads/2025/07/${img}`}
                  className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-500"
                  alt="Mold"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider"></div>

      {/* CTA Section */}
      <section className="py-16 bg-white text-center border-y border-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Contact us for a consultation and quote.
            <br />
            Tell us about your requirements — we'll provide the most efficient
            HPDC solution.
          </p>
          <HashLink
            smooth
            to="#contacts"
            className="inline-block px-10 py-4 bg-primary text-white font-bold rounded-full shadow-lg hover:bg-primary-dark hover:-translate-y-1 transition-all"
          >
            Get Started
          </HashLink>
        </div>
      </section>

      <div className="section-divider"></div>

      {/* Surface Finishing & Post-Processing Section */}
      <section className="py-20 bg-bg-light relative">
        <div className="absolute inset-0 bg-[url('https://www.hydroforce.ee/wp-content/uploads/2025/03/Cylinder-2.webp')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Surface Finishing & Post-Processing
            </h2>
          </div>

          <div className="max-w-5xl mx-auto mb-16">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-primary mb-2">
                Comprehensive Finishing Services
              </h3>
            </div>
            <div className="bg-white p-10 rounded-2xl shadow-lg">
              <ul className="space-y-4">
                {[
                  {
                    l: 'Trimming & Deburring',
                    v: 'Precision removal of excess material and flash for clean part edges',
                  },
                  {
                    l: 'CNC Machining',
                    v: 'Secondary machining operations for critical dimensions and features',
                  },
                  {
                    l: 'Surface Treatments',
                    v: 'Anodizing, powder coating, and painting for enhanced appearance and protection',
                  },
                  {
                    l: 'Heat Treatment',
                    v: 'T6 heat treatment for improved mechanical properties when required',
                  },
                  {
                    l: 'Assembly Services',
                    v: 'Integration of inserts, fasteners, and sub-components',
                  },
                  {
                    l: 'Quality Inspection',
                    v: 'Comprehensive dimensional and surface quality verification',
                  },
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex flex-col md:flex-row md:items-start gap-2 text-gray-700 text-lg border-b border-gray-100 last:border-0 pb-3 last:pb-0"
                  >
                    <strong className="text-primary min-w-[220px]">
                      {item.l}:
                    </strong>
                    <span>{item.v}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="bg-white p-4 rounded-xl shadow-md h-[300px] overflow-hidden group">
              <img
                src="https://www.hydroforce.ee/wp-content/uploads/2025/07/Surface1.webp"
                alt="Surface Treatment"
                className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform"
              />
            </div>
            <div className="bg-white p-4 rounded-xl shadow-md h-[300px] overflow-hidden group">
              <img
                src="https://www.hydroforce.ee/wp-content/uploads/2025/07/Surface2.webp"
                alt="CNC Machining"
                className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform"
              />
            </div>
            <div className="bg-white p-4 rounded-xl shadow-md h-[300px] overflow-hidden group">
              <img
                src="https://www.hydroforce.ee/wp-content/uploads/2025/07/Surface3.webp"
                alt="Quality Control"
                className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-4 rounded-xl shadow-md h-[450px] overflow-hidden group">
              <img
                src="https://www.hydroforce.ee/wp-content/uploads/2025/07/Prototype14.webp"
                alt="Finishing"
                className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform"
              />
            </div>
            <div className="bg-white p-4 rounded-xl shadow-md h-[450px] overflow-hidden group">
              <img
                src="https://www.hydroforce.ee/wp-content/uploads/2025/07/Prototype15.webp"
                alt="Finishing Process"
                className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider"></div>

      {/* Quality Control Section */}
      <section className="py-20 bg-bg-light relative">
        <div className="absolute inset-0 bg-[url('https://www.hydroforce.ee/wp-content/uploads/2025/03/QC-section-1-img.webp')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Quality Control
            </h2>
          </div>

          <div className="max-w-5xl mx-auto mb-16">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-primary mb-2">
                Quality Assurance Standards
              </h3>
            </div>
            <div className="bg-white p-10 rounded-2xl shadow-lg">
              <ul className="space-y-4">
                {[
                  {
                    l: 'Dimensional Inspection',
                    v: 'CMM (Coordinate Measuring Machine) for precise dimensional verification',
                  },
                  {
                    l: 'Surface Quality Assessment',
                    v: 'Surface roughness measurement and visual inspection protocols',
                  },
                  {
                    l: 'Material Testing',
                    v: 'Mechanical property testing and material composition analysis',
                  },
                  {
                    l: 'Non-Destructive Testing',
                    v: 'X-ray inspection for internal defect detection when required',
                  },
                  {
                    l: 'Statistical Process Control',
                    v: 'Real-time monitoring and control of production parameters',
                  },
                  {
                    l: 'Certification Compliance',
                    v: 'ISO 9001 quality management system implementation',
                  },
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex flex-col md:flex-row md:items-start gap-2 text-gray-700 text-lg border-b border-gray-100 last:border-0 pb-3 last:pb-0"
                  >
                    <strong className="text-primary min-w-[250px]">
                      {item.l}:
                    </strong>
                    <span>{item.v}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-8 h-auto md:h-[500px]">
            <div className="flex-[2] relative rounded-2xl overflow-hidden shadow-xl group min-h-[300px]">
              <img
                src="https://www.hydroforce.ee/wp-content/uploads/2025/07/Zeisse.webp"
                alt="Zeiss Precision Measurement Systems"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-r from-primary to-primary-light p-4 text-center text-white font-bold text-lg">
                Zeiss Precision Measurement Systems
              </div>
            </div>
            <div className="flex-1 relative rounded-2xl overflow-hidden shadow-xl group min-h-[300px]">
              <img
                src="https://www.hydroforce.ee/wp-content/uploads/2025/07/Quality.webp"
                alt="Quality Inspection Process"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-r from-accent to-accent-dark p-4 text-center text-white font-bold text-lg">
                Quality Inspection Process
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider"></div>

      {/* Industries Section (Who We Serve) */}
      <section id="industries" className="py-20 bg-bg-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Who We Serve?
            </h2>
            <p className="text-xl text-gray-600">
              Delivering high-pressure die casting solutions across diverse
              industrial sectors
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AppCard
              title="Automotive"
              subtitle="Engine components, transmission housings"
              bgImage="https://www.hydroforce.ee/wp-content/uploads/2025/10/Marine-and-Shipbuilding-1.webp"
              height="h-[400px]"
            />
            <AppCard
              title="Electronics"
              subtitle="Heat sinks, enclosures, connectors"
              bgImage="https://www.hydroforce.ee/wp-content/uploads/2025/10/HC-on-damb.webp"
              height="h-[400px]"
            />
            <AppCard
              title="Aerospace"
              subtitle="Lightweight structural components"
              bgImage="https://www.hydroforce.ee/wp-content/uploads/2025/06/Rectangle-228.webp"
              height="h-[400px]"
            />
            <AppCard
              title="Industrial Equipment"
              subtitle="Machinery housings, brackets"
              bgImage="https://www.hydroforce.ee/wp-content/uploads/2025/10/Industrial-Manufacturing-1.webp"
              height="h-[400px]"
            />
            <AppCard
              title="Consumer Goods"
              subtitle="Appliance components, hardware"
              bgImage="https://www.hydroforce.ee/wp-content/uploads/2025/10/Municipal-Equipment-1.webp"
              height="h-[400px]"
            />
            <AppCard
              title="Medical Devices"
              subtitle="Equipment housings, precision parts"
              bgImage="https://www.hydroforce.ee/wp-content/uploads/2025/10/Medical-bio.webp"
              height="h-[400px]"
            />
          </div>
        </div>
      </section>

      <div className="section-divider"></div>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-8">
              Why Choose Us?
            </h2>
            <div className="max-w-3xl mx-auto">
              <ul className="text-left space-y-6 text-xl text-gray-700">
                {[
                  '20+ years of experience in die casting and precision manufacturing',
                  'State-of-the-art production facilities with advanced automation',
                  'Comprehensive in-house capabilities from tooling to finishing',
                  'Flexible production volumes from prototypes to high-volume series',
                  'Full quality assurance and ISO 9001 certification',
                  'Expert engineering support and design optimization services',
                  'Competitive pricing and reliable delivery schedules',
                ].map((item, i) => (
                  <li
                    key={i}
                    className="border-b border-gray-100 pb-4 last:border-0 flex items-start gap-4"
                  >
                    <span className="text-primary font-bold text-2xl">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

// Components used in DieCasting page

const AdvantageCard = ({
  title,
  items,
}: {
  title: string;
  items: string[];
}) => (
  <div className="bg-white p-8 rounded-xl shadow-card border-l-4 border-primary hover:-translate-y-1 transition-transform h-full">
    <h3 className="text-2xl font-bold text-text-gray mb-6">{title}</h3>
    <ul className="space-y-4">
      {items.map((it, i) => (
        <li key={i} className="text-lg text-gray-600 leading-relaxed">
          • {it}
        </li>
      ))}
    </ul>
  </div>
);

const AppCard = ({
  title,
  subtitle,
  items,
  bgImage,
  height = 'h-[500px]',
}: any) => (
  <div
    className={`relative ${height} rounded-2xl overflow-hidden group shadow-lg`}
  >
    <div
      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
      style={{ backgroundImage: `url(${bgImage})` }}
    />

    {/* Bottom Overlay */}
    <div className="absolute bottom-0 left-0 right-0 bg-primary/90 p-8 transition-colors duration-300 group-hover:bg-accent/95 flex flex-col justify-start">
      <h4 className="text-2xl font-bold text-white mb-2 border-b-2 border-white/30 pb-3 leading-snug shadow-sm">
        {title}
      </h4>
      {subtitle && (
        <p className="text-white/90 text-lg font-medium mb-2">{subtitle}</p>
      )}
      {items && (
        <ul className="space-y-2 mt-2">
          {items.map((it: string, i: number) => (
            <li
              key={i}
              className="text-white/90 text-base font-medium flex items-start gap-3"
            >
              <span className="mt-1.5 w-1.5 h-1.5 bg-white rounded-full flex-shrink-0 shadow-sm"></span>
              <span className="leading-relaxed">{it}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  </div>
);
