import React from 'react';
import { Hero } from '../components/Hero';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { SEO } from '../components/SEO';

export const Home: React.FC = () => {
  return (
    <>
      <SEO 
        title="Home"
        description="Hydroforce Engineering specializes in precision manufacturing, hydraulic solutions, powder metallurgy, CNC machining, and die casting. 30+ years of excellence."
        keywords={['Hydraulic Cylinders', 'Powder Metallurgy', 'CNC Machining', 'Die Casting', 'Hydroforce Engineering', 'Manufacturing']}
      />
      <Hero
        title="Precision in Metal, Power in Hydraulics"
        subtitle="Advanced technologies in powder metallurgy, CNC machining, die casting, and hydraulics."
        bgImage="https://www.hydroforce.ee/wp-content/uploads/2025/09/HF-mainIMG.webp"
        stats={[
          { label: 'Years Excellence', value: '30+' },
          { label: 'Components Delivered', value: '1M+' },
          { label: 'Global Partners', value: '100+' },
        ]}
        buttons={[
          {
            label: 'Explore Technologies',
            link: '#technology-solutions',
            type: 'primary',
          },
          { label: 'Get Consultation', link: '#contacts', type: 'secondary' },
        ]}
      />

      {/* Industries */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Industries We Serve
            </h2>
            <p className="text-xl text-gray-500">
              30 years of supplying high-precision components to key industries
              worldwide
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((ind, idx) => (
              <div
                key={idx}
                className="bg-white p-8 rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300 border-l-4 border-primary hover:border-accent hover:-translate-y-1 h-full flex flex-col justify-start"
              >
                <h3 className="text-xl font-bold text-text-gray mb-3">
                  {ind.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-base">
                  {ind.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-br from-accent to-accent-dark text-center text-white relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Partner with HydroForce?
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Contact our engineering team for technical consultation and custom
            manufacturing solutions
          </p>
          <HashLink
            smooth
            to="/#contacts"
            className="inline-block px-8 py-4 bg-white text-accent font-bold rounded-lg shadow-lg hover:bg-bg-light hover:-translate-y-1 transition-all"
          >
            Request Quote
          </HashLink>
        </div>
      </section>

      {/* Technologies */}
      <section id="technology-solutions" className="py-20 bg-bg-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Hydroforce Technology Solutions
            </h2>
            <p className="text-xl text-gray-500">
              Four core technologies for comprehensive manufacturing solutions
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <TechCard
              title="Hydraulic Systems"
              subtitle="Cylinders & Motors"
              description="Custom hydraulic solutions engineered for your specific applications. From mobile equipment to industrial presses, we design and manufacture components that deliver exceptional performance."
              specs={[
                'Bore Diameter: 20-1000mm',
                'Operating Pressure: Up to 500 bar',
                'Stroke Length: Up to 15000mm',
              ]}
              link="/cylinders"
            />
            <TechCard
              title="CNC Machining"
              subtitle="Precision Machining"
              description="State-of-the-art CNC machining for complex, high-precision components. Our 5-axis capabilities ensure exceptional accuracy for prototypes and production runs."
              specs={[
                'Machining Accuracy: ±0.01mm',
                'Max Dimensions: 1500×1200×1000mm',
                'Surface Finish: Ra 0.4-3.2μm',
              ]}
              link="/machining"
            />
            <TechCard
              title="Powder Metallurgy"
              subtitle="PM & MIM"
              description="Advanced powder metallurgy solutions for complex, high-performance components. Conventional PM and Metal Injection Molding (MIM) deliver superior material properties."
              specs={[
                'Dimensional Accuracy: ±0.02mm',
                'Density Range: Up to 7.6 g/cm³',
                'Volume: 25000+ pieces per series',
              ]}
              link="/pm"
            />
            <TechCard
              title="Die Casting"
              subtitle="High-Pressure Aluminum"
              description="Advanced aluminum die casting for lightweight, durable components. High-pressure capabilities enable thin-wall sections and complex geometries."
              specs={[
                'Wall Thickness: From 2mm',
                'Casting Weight: 0.1-15kg',
                'Dimensional Tolerance: ±0.2mm',
              ]}
              link="/die-casting"
            />
          </div>
        </div>
      </section>

      {/* Manufacturing Gallery */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Our Manufacturing Excellence
            </h2>
            <p className="text-xl text-gray-500">
              Precision engineering and quality in every detail
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-auto lg:h-[500px]">
            {/* Main Large Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-xl group h-[400px] lg:h-full bg-white border border-gray-100 p-4">
              <img
                src="https://www.hydroforce.ee/wp-content/uploads/2025/09/HC053903.png"
                alt="Hydraulic Cylinder"
                className="w-full h-full object-contain"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary/95 to-primary/80 p-8 text-white translate-y-0 transition-all">
                <h3 className="text-2xl font-bold mb-1">Hydraulic Cylinders</h3>
                <p className="text-base opacity-90">
                  Custom hydraulic solutions for any applications
                </p>
              </div>
            </div>

            {/* Grid of 4 */}
            <div className="grid grid-cols-2 gap-6 h-[400px] lg:h-full">
              <GallerySmallItem
                img="https://www.hydroforce.ee/wp-content/uploads/2025/09/MergeLightMIM-3.png"
                title="MIM Technology"
                desc="Complex geometries"
              />
              <GallerySmallItem
                img="https://www.hydroforce.ee/wp-content/uploads/2025/09/HFmachining.png"
                title="CNC Machining"
                desc="5-axis precision"
              />
              <GallerySmallItem
                img="https://www.hydroforce.ee/wp-content/uploads/2025/09/HF-mash.png"
                title="Advanced Processing"
                desc="State-of-the-art facilities"
              />
              <GallerySmallItem
                img="https://www.hydroforce.ee/wp-content/uploads/2025/03/Sintered-ShaftWithRotor.webp"
                title="Quality Components"
                desc="ISO-certified"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quality Section */}
      <section
        className="py-24 bg-cover bg-center bg-fixed relative text-white"
        style={{
          backgroundImage: `linear-gradient(rgba(1, 87, 125, 0.95), rgba(1, 58, 82, 0.95)), url('https://www.hydroforce.ee/wp-content/uploads/2025/10/Back-for-HC.webp')`,
        }}
      >
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6 border-b-2 border-accent inline-block pb-2">
                Quality at Every Step
              </h2>
              <p className="mb-6 text-gray-200 leading-relaxed text-lg">
                Quality isn't just our promise—it's our foundation. Our modern
                facilities feature cutting-edge testing equipment ensuring every
                product represents the pinnacle of market excellence.
              </p>
              <ul className="space-y-3">
                {[
                  'ISO 9001:2015 certified',
                  'Advanced CMM equipment',
                  'Full traceability',
                  'Continuous improvement',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-lg">
                    <span className="text-accent font-bold text-xl">•</span>{' '}
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6 border-b-2 border-accent inline-block pb-2">
                Responsible Manufacturing
              </h2>
              <p className="mb-6 text-gray-200 leading-relaxed text-lg">
                Environmental responsibility drives our operations. We've
                implemented eco-friendly practices that reduce waste and
                minimize environmental impact.
              </p>
              <ul className="space-y-3">
                {[
                  'Waste reduction (-25%)',
                  'Energy-efficient processes',
                  'Recyclable materials',
                  'Carbon footprint reduction',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-lg">
                    <span className="text-accent font-bold text-xl">•</span>{' '}
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="py-20 bg-bg-light">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Latest News & Insights
            </h2>
            <p className="text-xl text-gray-500">
              Trends and innovations in metallurgy and manufacturing
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <NewsCard
              img="https://www.hydroforce.ee/wp-content/uploads/2025/05/Eco-Friendly-Powder-metallurgy.webp"
              title="Eco-Friendly Powder Metallurgy"
              desc="A sustainable choice for modern manufacturing, reducing waste and energy."
              link="/news/eco-friendly"
            />
            <NewsCard
              img="https://www.hydroforce.ee/wp-content/uploads/2025/05/AI-powered-Powder-metallurgy.webp"
              title="AI in Powder Metallurgy"
              desc="How digital technologies and AI are revolutionizing the industry."
              link="/news/ai-digital"
            />
            <NewsCard
              img="https://www.hydroforce.ee/wp-content/uploads/2025/05/Medical-Implants-Using-Powder-Metallurgy.webp"
              title="PM in Non-Traditional Fields"
              desc="Expanding horizons beyond automotive: medical, aerospace, and luxury."
              link="/news/non-traditional"
            />
            <NewsCard
              img="https://www.hydroforce.ee/wp-content/uploads/2025/05/Ultra-High-Temperature-Sintering.webp"
              title="Ultra-High Temp Sintering"
              desc="Transforming material properties with temperatures above 1250°C."
              link="/news/uht-sintering"
            />
          </div>
        </div>
      </section>
    </>
  );
};

const industries = [
  {
    title: 'Automotive Excellence',
    desc: 'Precision components for automotive industry: from engine parts to hydraulic systems. Supporting OEMs and Tier 1 suppliers.',
  },
  {
    title: 'Heavy Machinery',
    desc: 'Robust hydraulic cylinders and precision components for heavy construction equipment. Custom solutions for excavators and loaders.',
  },
  {
    title: 'Agricultural Solutions',
    desc: 'Durable solutions for agricultural machinery: hydraulics and metal components designed for harsh field conditions.',
  },
  {
    title: 'Industrial Precision',
    desc: 'High-precision parts for industrial equipment and automation systems. Delivering accuracy for modern manufacturing.',
  },
  {
    title: 'Energy Innovation',
    desc: 'Components for energy equipment with enhanced reliability. Supporting renewable energy, oil & gas, and power generation.',
  },
  {
    title: 'Marine Durability',
    desc: 'Corrosion-resistant solutions for marine and offshore applications. Specialized alloys for harsh maritime environments.',
  },
];

const TechCard: React.FC<{
  title: string;
  subtitle: string;
  description: string;
  specs: string[];
  link: string;
}> = ({ title, subtitle, description, specs, link }) => (
  <div className="bg-white rounded-xl p-8 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col h-full">
    <h3 className="text-2xl font-bold text-text-gray mb-1">{title}</h3>
    <h4 className="text-primary font-semibold mb-4">{subtitle}</h4>
    <p className="text-gray-600 mb-6 text-base">{description}</p>
    <div className="mt-auto">
      <h5 className="font-bold text-sm text-text-gray mb-3 uppercase tracking-wider">
        Specifications
      </h5>
      <ul className="space-y-2 mb-6">
        {specs.map((s, i) => (
          <li
            key={i}
            className="flex items-center gap-2 text-base text-gray-600"
          >
            <span className="w-1.5 h-1.5 bg-primary rounded-full"></span> {s}
          </li>
        ))}
      </ul>
      <Link
        to={link}
        className="inline-flex items-center text-accent font-bold hover:text-primary transition-colors"
      >
        Learn more &rarr;
      </Link>
    </div>
  </div>
);

const GallerySmallItem: React.FC<{
  img: string;
  title: string;
  desc: string;
}> = ({ img, title, desc }) => (
  <div className="relative rounded-xl overflow-hidden shadow-md group bg-white h-full border border-gray-100 p-4">
    <img src={img} alt={title} className="w-full h-full object-contain" />
    <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <h3 className="text-white font-bold text-lg translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
        {title}
      </h3>
      <p className="text-white/90 text-base translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
        {desc}
      </p>
    </div>
  </div>
);

const NewsCard: React.FC<{
  img: string;
  title: string;
  desc: string;
  link: string;
}> = ({ img, title, desc, link }) => (
  <Link
    to={link}
    className="group bg-white rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col h-full"
  >
    <div className="h-48 overflow-hidden">
      <img
        src={img}
        alt={title}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
      />
    </div>
    <div className="p-6 flex-1 flex flex-col">
      <h3 className="text-xl font-bold text-primary mb-3 group-hover:text-accent transition-colors">
        {title}
      </h3>
      <p className="text-gray-600 text-sm mb-4 flex-1">{desc}</p>
      <span className="text-accent font-bold text-sm uppercase tracking-wide group-hover:translate-x-2 transition-transform inline-block">
        Read Article &rarr;
      </span>
    </div>
  </Link>
);