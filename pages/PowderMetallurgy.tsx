import React from 'react';
import { Hero } from '../components/Hero';
import { HashLink } from 'react-router-hash-link';
import { SEO } from '../components/SEO';

export const PowderMetallurgy: React.FC = () => {
  return (
    <>
      <SEO 
        title="Powder Metallurgy and Metal Injection Molding (MIM)"
        description="High-precision metal components using Powder Metallurgy (PM) and MIM technologies. Cost-effective, high-volume production with superior material properties."
        keywords={['Powder Metallurgy', 'Metal Injection Molding', 'MIM', 'Sintering', 'Precision Parts', 'Hydroforce']}
      />
      <Hero
        title="Powder Metallurgy (PM) & Metal Injection Molding (MIM)"
        subtitle="Precision, Strength, and Innovation for Your Business"
        description="Looking for a partner to manufacture high-quality metal components of any complexity? We are specialists in Powder Metallurgy and MIM technologies delivering exceptional results."
        bgImage="https://www.hydroforce.ee/wp-content/uploads/2025/03/Hero-Powder-Metallurgy-scaled.webp"
        stats={[
          { label: 'Tolerance', value: '±0.02mm' },
          { label: 'Final Density', value: '97%' },
          { label: 'Material Saving', value: '30%' },
          { label: 'Experience', value: '15+ Years' },
        ]}
        buttons={[
          { label: 'Request Quote', link: '#contacts', type: 'primary' },
          {
            label: 'View Applications',
            link: '#applications',
            type: 'secondary',
          },
        ]}
      />

      {/* Advantages Section */}
      <section className="py-20 bg-bg-light relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.hydroforce.ee/wp-content/uploads/2025/06/Image_20231128154617-1-scaled.jpg')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Our Advantages
            </h2>
            <p className="text-xl text-gray-600">
              Cost-effective precision manufacturing with superior quality and
              design freedom
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AdvantageCard
              title="Cost Efficiency"
              items={[
                'Minimal material waste — save up to 30% on raw materials',
                'High repeatability — reduces the need for post-machining',
                'Complex shapes produced in one cycle — simplified assembly, fewer components',
              ]}
            />
            <AdvantageCard
              title="Design Freedom"
              items={[
                'Manufacture of highly complex parts that cannot be made using conventional methods',
                'Lightweight yet strong components to boost product efficiency',
              ]}
            />
            <AdvantageCard
              title="Consistent Quality"
              items={[
                'High mechanical strength and wear resistance',
                'Tight process control and multi-stage quality assurance ensure reliability',
              ]}
            />
          </div>
        </div>
      </section>

      {/* Applications & Industries Section */}
      <section id="applications" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Applications & Industries
            </h2>
            <p className="text-xl text-gray-600">
              Advanced powder metallurgy solutions for critical industry
              applications
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AppCard
              title="Automotive Industry"
              items={[
                'Engine components with precise tolerances',
                'Transmission parts requiring complex geometries',
                'Brake system components with superior wear resistance',
              ]}
              bgImage="https://www.hydroforce.ee/wp-content/uploads/2025/10/Construction-and-Road-Building-Equipment-1.webp"
            />
            <AppCard
              title="Medical & Healthcare"
              items={[
                'Biocompatible surgical instruments and implants',
                'Precision dental components and orthodontic tools',
                'MRI-compatible parts with non-magnetic properties',
              ]}
              bgImage="https://www.hydroforce.ee/wp-content/uploads/2025/10/Medical-bio.webp"
            />
            <AppCard
              title="Electronics & Technology"
              items={[
                'Miniature connectors and micro-components',
                'Heat sinks and thermal management parts',
                'Precision housings for electronic devices',
              ]}
              bgImage="https://www.hydroforce.ee/wp-content/uploads/2025/10/HC-on-damb.webp"
            />
          </div>
        </div>
      </section>

      {/* PM Technology Section */}
      <section className="py-20 bg-bg-light relative" id="PM">
        <div className="absolute inset-0 opacity-5 bg-[url('https://www.hydroforce.ee/wp-content/uploads/2025/06/Rectangle-771-e1750072925436.webp')] bg-cover bg-center"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Our Technology - Your Technical Advantage
            </h2>
            <p className="text-xl text-gray-600">
              Advanced powder metallurgy and metal injection molding
              capabilities
            </p>
          </div>

          <div className="bg-white/90 backdrop-blur-sm p-8 md:p-12 rounded-2xl shadow-xl border border-gray-100 mb-16">
            <h3 className="text-2xl font-bold text-primary mb-6 border-b border-gray-200 pb-4">
              Conventional Powder Metallurgy (Sintering)
            </h3>
            <ul className="space-y-4 mb-8">
              {[
                {
                  l: 'Materials',
                  v: 'Carbon and alloy steels, stainless steel, copper and copper alloys, titanium, and more',
                },
                {
                  l: 'Sintering Temperature',
                  v: 'From 1100°C to 1400°C, precisely controlled to ±5°C for structural uniformity',
                },
                {
                  l: 'Atmosphere',
                  v: 'Vacuum, inert gases (argon, nitrogen), or reducing atmospheres to prevent oxidation and surface defects',
                },
                {
                  l: 'Compaction',
                  v: 'High-precision pressing up to 800 MPa ensures green density >95%',
                },
                {
                  l: 'Tolerances',
                  v: 'Dimensional stability within ±0.05 mm after sintering',
                },
                {
                  l: 'Post-processing',
                  v: 'CNC machining, heat treatment, and surface hardening if required',
                },
                {
                  l: 'Quality Control',
                  v: 'Metallographic analysis, hardness testing (Rockwell, Vickers), ultrasonic and X-ray inspection',
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

            <div className="bg-[#e8f5e9] border-l-4 border-primary p-6 rounded-lg">
              <strong className="text-primary block mb-1 text-lg">
                Your benefit:
              </strong>
              <span className="text-gray-700 text-lg">
                High-strength parts with tight tolerances, optimized material
                usage and reduced finishing costs.
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <GalleryItem
              img="https://www.hydroforce.ee/wp-content/uploads/2025/06/Merge-4.webp"
              title="Precision Gears"
            />
            <GalleryItem
              img="https://www.hydroforce.ee/wp-content/uploads/2025/06/DSCN9632-1.webp"
              title="Structural Parts"
            />
            <GalleryItem
              img="https://www.hydroforce.ee/wp-content/uploads/2025/06/Merge-3.webp"
              title="Complex Shapes"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white text-center border-y border-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Ready to Improve Your Product Performance?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Contact us for a consultation and quote.
            <br />
            Tell us about your project — we'll provide the most efficient
            solution.
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

      {/* MIM Technology Section */}
      <section className="py-20 bg-bg-light relative" id="MIM">
        <div className="absolute inset-0 opacity-5 bg-[url('https://www.hydroforce.ee/wp-content/uploads/2025/06/Rectangle-772-e1750073086851.webp')] bg-cover bg-center"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="bg-white/90 backdrop-blur-sm p-8 md:p-12 rounded-2xl shadow-xl border border-gray-100 mb-16">
            <h3 className="text-2xl font-bold text-primary mb-6 border-b border-gray-200 pb-4">
              Metal Injection Molding (MIM)
            </h3>
            <ul className="space-y-4 mb-8">
              {[
                {
                  l: 'Feedstock',
                  v: 'Ultra-fine metal powders (<20 μm) ensure >97% final density',
                },
                {
                  l: 'Binders',
                  v: 'Specially formulated polymers enable clean debinding without deformation',
                },
                {
                  l: 'Injection Molding',
                  v: 'Precise molding of complex shapes with thin walls down to 0.3 mm',
                },
                {
                  l: 'Debinding',
                  v: 'Thermal or chemical removal with careful control to minimize internal stress',
                },
                {
                  l: 'Sintering',
                  v: 'Programmable furnaces with inert or vacuum atmospheres prevent shrinkage and oxidation',
                },
                {
                  l: 'Tolerances',
                  v: 'Standard ±0.02 mm, and down to ±0.01 mm with calibration',
                },
                {
                  l: 'Surface Finish',
                  v: 'Ra as low as 0.4 μm without additional finishing',
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

            <div className="bg-[#e8f5e9] border-l-4 border-primary p-6 rounded-lg">
              <strong className="text-primary block mb-1 text-lg">
                Your benefit:
              </strong>
              <span className="text-gray-700 text-lg">
                Production of miniature, high-precision parts with minimal
                secondary operations.
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <GalleryItem
              img="https://www.hydroforce.ee/wp-content/uploads/2025/07/MergeLightMIM-2.webp"
              title="Medical Components"
            />
            <GalleryItem
              img="https://www.hydroforce.ee/wp-content/uploads/2025/07/MergeBlackMIM-1.webp"
              title="Electronic Parts"
            />
            <GalleryItem
              img="https://www.hydroforce.ee/wp-content/uploads/2025/06/transparent-2.webp"
              title="Precision Parts"
            />
          </div>
        </div>
      </section>

      {/* Combined Advantages */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[url('https://www.hydroforce.ee/wp-content/uploads/2025/06/Rectangle-76.webp')] bg-cover bg-center"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Combined Advantages
            </h2>
            <p className="text-xl text-gray-600">
              Integrated PM and MIM solutions for optimal manufacturing results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <CombinedCard
              title="Integrated Approach"
              text="Combining PM and MIM allows us to offer the optimal solution depending on geometry, material, and production volume"
            />
            <CombinedCard
              title="Process Automation"
              text="Real-time process monitoring and control improves consistency and reduces rejection rates"
            />
            <CombinedCard
              title="Eco-Friendly Production"
              text="Low material waste and energy-efficient equipment reduce both cost and environmental footprint"
            />
            <CombinedCard
              title="Engineering Support"
              text="Our technical team works with you to adapt your design to best suit PM or MIM manufacturing"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ShowcaseCard
              img="https://www.hydroforce.ee/wp-content/uploads/2025/06/IMGP7752-scaled.webp"
              title="Advanced Manufacturing"
              subtitle="State-of-the-art production facilities"
            />
            <ShowcaseCard
              img="https://www.hydroforce.ee/wp-content/uploads/2025/06/IMGP3834-scaled.webp"
              title="Quality Assurance"
              subtitle="Precision measurement and testing"
            />
            <ShowcaseCard
              img="https://www.hydroforce.ee/wp-content/uploads/2025/06/IMGP7793.webp"
              title="Production Excellence"
              subtitle="Efficient automated processes"
            />
          </div>
        </div>
      </section>

      {/* Who We Serve */}
      <section id="industries-served" className="py-20 bg-bg-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Who We Serve?
            </h2>
            <p className="text-xl text-gray-600">
              Delivering powder metallurgy solutions across diverse industrial
              sectors
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AppCard
              title="Automotive"
              subtitle="Reliable, precision components"
              bgImage="https://www.hydroforce.ee/wp-content/uploads/2025/10/Marine-and-Shipbuilding-1.webp"
              height="h-[400px]"
            />
            <AppCard
              title="Medical"
              subtitle="Biocompatible and long-lasting parts"
              bgImage="https://www.hydroforce.ee/wp-content/uploads/2025/10/Medical-bio.webp"
              height="h-[400px]"
            />
            <AppCard
              title="Electronics"
              subtitle="Miniature components with complex geometries"
              bgImage="https://www.hydroforce.ee/wp-content/uploads/2025/10/HC-on-damb.webp"
              height="h-[400px]"
            />
            <AppCard
              title="Tooling & Equipment"
              subtitle="High-strength wear-resistant parts"
              bgImage="https://www.hydroforce.ee/wp-content/uploads/2025/10/Industrial-Manufacturing-1.webp"
              height="h-[400px]"
            />
          </div>
        </div>
      </section>

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
                  '15+ years of experience in complex metal part manufacturing',
                  'Advanced production facilities and in-house R&D',
                  'Flexible order volumes — from prototyping to full-scale production',
                  'Full quality assurance and certifications',
                  'Technical consulting and design optimization support',
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

// Sub-components

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

// Application Card using Cylinders page style (Bottom Overlay)
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

const GalleryItem = ({ img, title }: { img: string; title: string }) => (
  <div className="bg-white p-6 rounded-xl shadow-card flex flex-col items-center text-center hover:shadow-lg transition-shadow h-full hover:-translate-y-1 duration-300">
    <div className="h-[220px] w-full flex items-center justify-center mb-4 bg-gray-50 rounded-lg p-4">
      <img
        src={img}
        alt={title}
        className="max-h-full max-w-full object-contain"
      />
    </div>
    <h4 className="font-bold text-text-gray text-lg mt-auto">{title}</h4>
  </div>
);

const CombinedCard = ({ title, text }: { title: string; text: string }) => (
  <div className="bg-white p-8 rounded-lg border border-primary shadow-sm hover:shadow-md transition-all text-center h-full flex flex-col items-center">
    <h4 className="text-xl font-bold text-primary mb-4">{title}</h4>
    <p className="text-gray-600 text-lg">{text}</p>
  </div>
);

const ShowcaseCard = ({
  img,
  title,
  subtitle,
}: {
  img: string;
  title: string;
  subtitle: string;
}) => (
  <div className="bg-white rounded-xl overflow-hidden shadow-card hover:shadow-xl transition-all group h-full flex flex-col">
    <div className="h-[240px] overflow-hidden">
      <img
        src={img}
        alt={title}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
      />
    </div>
    <div className="p-8 flex-grow">
      <h4 className="text-xl font-bold text-primary mb-2">{title}</h4>
      <p className="text-gray-600 text-lg">{subtitle}</p>
    </div>
  </div>
);
