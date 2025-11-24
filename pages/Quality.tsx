import React from 'react';
import { Hero } from '../components/Hero';
import { HashLink } from 'react-router-hash-link';
import { SEO } from '../components/SEO';

export const Quality: React.FC = () => {
  return (
    <>
      <SEO
        title="Quality Control"
        description="Our integrated quality management system ensures precision and reliability. ISO 9001:2015 certified. Advanced measurement and testing facilities."
        keywords={[
          'Quality Control',
          'ISO 9001',
          'CMM Inspection',
          'Material Analysis',
          'Hydroforce Engineering',
        ]}
      />
      {/* Hero Section - Image Updated */}
      <Hero
        title="Quality Control System"
        subtitle="Uncompromising Precision and Reliability"
        description="Our integrated quality management system ensures that every component we manufacture meets the highest standards of precision. From raw material verification to final inspection, we guarantee excellence."
        bgImage="https://www.hydroforce.ee/wp-content/uploads/2025/03/QC-section-1-img.webp"
        stats={[
          { label: 'Certified', value: 'ISO 9001' },
          { label: 'Inspection', value: '100%' },
          { label: 'Accuracy', value: '±0.001mm' },
        ]}
        buttons={[
          { label: 'Contact Us', link: '#contacts', type: 'primary' },
          { label: 'Our Certificates', link: '#standards', type: 'secondary' },
        ]}
      />

      <div className="section-divider"></div>

      {/* Quality Commitment Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="w-full md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
                Our Quality Commitment
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                At Hydroforce Engineering, quality is not just a checkpoint—it's
                embedded in our culture. We utilize state-of-the-art measuring
                technology and rigorous inspection protocols to deliver
                components that exceed customer expectations.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Our quality management system is certified according to{' '}
                <strong>ISO 9001:2015</strong> standards, ensuring full
                traceability and consistency across all manufacturing processes,
                from Powder Metallurgy to CNC Machining and Die Casting.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-bg-light p-4 rounded-lg border-l-4 border-accent">
                  <strong className="block text-primary text-lg mb-1">
                    Zero Defects
                  </strong>
                  <span className="text-gray-600">Goal-oriented approach</span>
                </div>
                <div className="bg-bg-light p-4 rounded-lg border-l-4 border-primary">
                  <strong className="block text-primary text-lg mb-1">
                    Continuous Improvement
                  </strong>
                  <span className="text-gray-600">Kaizen methodology</span>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <div className="rounded-2xl overflow-hidden shadow-2xl h-[400px]">
                <img
                  src="https://www.hydroforce.ee/wp-content/uploads/2025/07/zeiss-contura-laboratory.webp"
                  alt="Zeiss Contura Laboratory"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider"></div>

      {/* Laboratory & Equipment Section */}
      <section className="py-20 bg-bg-light relative">
        <div className="absolute inset-0 bg-[url('https://www.hydroforce.ee/wp-content/uploads/2025/07/metalloobrabotka.webp')] bg-cover bg-center opacity-5 mix-blend-overlay"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Measuring & Testing Equipment
            </h2>
            <p className="text-xl text-gray-600">
              Advanced laboratory facilities for precise validation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <EquipmentCard
              title="3D CMM Inspection"
              items={[
                'Zeiss Contura G2',
                'Full geometry validation',
                'CAD model comparison',
                'Micron-level accuracy',
              ]}
            />
            <EquipmentCard
              title="Material Analysis"
              items={[
                'Spectrometers for chemical composition',
                'Hardness testers (HRC, HB, HV)',
                'Microstructure analysis',
                'Tensile strength testing',
              ]}
            />
            <EquipmentCard
              title="Surface & Contour"
              items={[
                'Roughness testers (Ra, Rz)',
                'Contour measuring systems',
                'Optical profile projectors',
                'Vision measurement systems',
              ]}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-auto md:h-[300px]">
            <GalleryItem
              img="https://www.hydroforce.ee/wp-content/uploads/2025/07/Zeisse.webp"
              title="Zeiss CMM"
            />
            <GalleryItem
              img="https://www.hydroforce.ee/wp-content/uploads/2025/07/Image_20240725104137.webp"
              title="Digital Measurement"
            />
            <GalleryItem
              img="https://www.hydroforce.ee/wp-content/uploads/2025/07/Quality.webp"
              title="Visual Inspection"
            />
          </div>
        </div>
      </section>

      <div className="section-divider"></div>

      {/* Quality Control Stages */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-16">
            Quality Control Workflow
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-1 bg-gray-100 -z-10"></div>

            <StageCard
              step="01"
              title="Incoming Control"
              desc="Rigorous inspection of all raw materials and outsourced components. Verification of material certificates (3.1) and dimensional checks before production begins."
            />
            <StageCard
              step="02"
              title="In-Process Control"
              desc="Continuous monitoring (SPC) during manufacturing. Operators perform self-checks combined with regular spot checks by QC inspectors to catch deviations early."
            />
            <StageCard
              step="03"
              title="Final Inspection"
              desc="100% visual and dimensional inspection of critical features before shipment. Preparation of full quality documentation, test reports, and secure packaging."
            />
          </div>
        </div>
      </section>

      <div className="section-divider"></div>

      {/* Standards & Compliance */}
      <section className="py-20 bg-bg-light" id="standards">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Standards & Documentation
            </h2>
            <p className="text-xl text-gray-600">
              Full compliance with international standards
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
            <div className="bg-white p-8 rounded-xl shadow-card h-full">
              <h3 className="text-2xl font-bold text-primary mb-6 border-b pb-2">
                Certifications
              </h3>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-lg text-gray-700">
                  <span className="text-accent font-bold">✓</span> ISO 9001:2015
                </li>
                <li className="flex items-center gap-3 text-lg text-gray-700">
                  <span className="text-accent font-bold">✓</span> ISO
                  14001:2015
                </li>
                <li className="flex items-center gap-3 text-lg text-gray-700">
                  <span className="text-accent font-bold">✓</span> DNV / ABS /
                  API (Product Specific)
                </li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-card h-full">
              <h3 className="text-2xl font-bold text-primary mb-6 border-b pb-2">
                Documentation
              </h3>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-lg text-gray-700">
                  <span className="text-accent font-bold">✓</span> PPAP Level 3
                  / APQP / FMEA
                </li>
                <li className="flex items-center gap-3 text-lg text-gray-700">
                  <span className="text-accent font-bold">✓</span> Material
                  Certificates EN 10204 3.1
                </li>
                <li className="flex items-center gap-3 text-lg text-gray-700">
                  <span className="text-accent font-bold">✓</span> Dimensional
                  Reports & Protocols
                </li>
              </ul>
            </div>
          </div>

          <div className="text-center">
            <div className="inline-block rounded-xl overflow-hidden shadow-lg bg-white p-2 max-w-3xl mx-auto">
              <img
                src="https://www.hydroforce.ee/wp-content/uploads/2025/07/Image_20240725104235.webp"
                alt="Quality Certification"
                className="max-w-full h-auto max-h-[400px] object-contain rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider"></div>

      {/* CTA Section */}
      <section className="py-16 bg-white text-center border-y border-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Need Reliable Manufacturing?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Contact our team to discuss your quality requirements and how we can
            meet your standards.
          </p>
          <HashLink
            smooth
            to="#contacts"
            className="inline-block px-10 py-4 bg-primary text-white font-bold rounded-full shadow-lg hover:bg-primary-dark hover:-translate-y-1 transition-all"
          >
            Contact Quality Dept.
          </HashLink>
        </div>
      </section>
    </>
  );
};

// Components

const EquipmentCard = ({
  title,
  items,
}: {
  title: string;
  items: string[];
}) => (
  <div className="bg-white p-8 rounded-xl shadow-card border-l-4 border-primary hover:-translate-y-1 transition-transform h-full">
    <h3 className="text-2xl font-bold text-text-gray mb-6">{title}</h3>
    <ul className="space-y-3">
      {items.map((it, i) => (
        <li key={i} className="flex items-start gap-3 text-gray-600 text-lg">
          <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2.5 flex-shrink-0"></span>
          <span>{it}</span>
        </li>
      ))}
    </ul>
  </div>
);

const GalleryItem = ({ img, title }: { img: string; title: string }) => (
  <div className="relative rounded-xl overflow-hidden shadow-lg group h-full">
    <img
      src={img}
      alt={title}
      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
    />
    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary/90 to-transparent p-6 pt-12">
      <h4 className="text-white font-bold text-lg">{title}</h4>
    </div>
  </div>
);

const StageCard = ({
  step,
  title,
  desc,
}: {
  step: string;
  title: string;
  desc: string;
}) => (
  <div className="relative bg-white p-8 pt-12 rounded-2xl shadow-card hover:-translate-y-2 transition-transform duration-300 border border-gray-100 h-full z-10">
    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-accent text-white text-xl font-bold w-12 h-12 rounded-full flex items-center justify-center shadow-lg ring-4 ring-white">
      {step}
    </div>
    <h3 className="text-2xl font-bold text-primary mt-2 mb-4 text-center">
      {title}
    </h3>
    <p className="text-gray-600 leading-relaxed text-center text-lg">{desc}</p>
  </div>
);
