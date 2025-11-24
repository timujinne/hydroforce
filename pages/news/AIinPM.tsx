import React from 'react';
import { Hero } from '../../components/Hero';
import { SEO } from '../../components/SEO';

export const AIinPM: React.FC = () => {
  return (
    <>
      <SEO 
        title="AI and Digital Technologies in Manufacturing"
        description="Revolutionizing Powder Metallurgy with Industry 4.0, AI, and digital twin technology for enhanced precision and process control."
        keywords={['AI in Manufacturing', 'Industry 4.0', 'Powder Metallurgy', 'Digital Twin', 'Smart Factory']}
      />
      <Hero
        title="AI and Digital Technologies"
        subtitle="Revolutionizing Powder Metallurgy with Industry 4.0"
        bgImage="https://www.hydroforce.ee/wp-content/uploads/2025/05/AI-powered-Powder-metallurgy.webp"
        overlayType="dark"
      />

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <p className="text-xl text-gray-600 mb-8 font-light border-b pb-8 leading-relaxed">
            The Fourth Industrial Revolution (Industry 4.0) is fundamentally reshaping the Powder Metallurgy (PM) sector. By integrating Artificial Intelligence (AI), machine learning, and advanced data analytics, manufacturers are moving from reactive problem-solving to proactive, data-driven process optimization. This digital transformation is unlocking new levels of precision, efficiency, and quality control.
          </p>

          <div className="mb-10 rounded-xl overflow-hidden shadow-lg">
            <img 
              src="https://www.hydroforce.ee/wp-content/uploads/2025/05/AI-powered-Powder-metallurgy.webp" 
              alt="Digital Technologies in Manufacturing" 
              className="w-full h-auto object-cover"
            />
          </div>

          <h3 className="text-2xl font-bold text-primary mb-4">Data-Driven Process Control</h3>
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            The PM process involves multiple complex variables, including powder characteristics, humidity, compaction pressure, and sintering temperature profiles. Traditionally, optimizing these parameters relied heavily on the experience of skilled operators. Today, sensors embedded in presses and furnaces collect vast amounts of data in real-time.
          </p>
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            AI algorithms analyze this data to identify subtle correlations that affect final part quality. For example, machine learning models can predict how slight variations in powder flow rate will impact the final density of the sintered part, allowing the system to automatically adjust compaction pressure on the fly to compensate. This results in a dramatic reduction in variability and scrap.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10 mt-8">
            <div className="bg-bg-light p-6 rounded-lg border border-gray-100 shadow-sm">
               <h3 className="text-xl font-bold text-primary mb-2">Smart Sintering</h3>
               <p className="text-gray-600">AI-driven furnaces monitor atmosphere composition and temperature zones continuously. They can dynamically adjust gas flow and heating elements to ensure perfect microstructural evolution, preventing defects like oxidation or uneven shrinkage.</p>
            </div>
            <div className="bg-bg-light p-6 rounded-lg border border-gray-100 shadow-sm">
               <h3 className="text-xl font-bold text-primary mb-2">Automated Defect Detection</h3>
               <p className="text-gray-600">Computer vision systems equipped with deep learning models inspect parts at high speed. They can detect surface anomalies, micro-cracks, or dimensional deviations with greater accuracy and consistency than human inspection.</p>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-primary mb-4">Digital Twins and Simulation</h3>
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            One of the most powerful applications of digital technology in PM is the "Digital Twin." This involves creating a virtual replica of the physical manufacturing process. Engineers can simulate the entire production cycle—from die filling to sintering—before any metal is processed.
          </p>
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            Finite Element Analysis (FEA) combined with compaction simulation software allows designers to predict density distribution and potential crack formation during pressing. By iterating on the Digital Twin, tooling designs can be optimized virtually, reducing the need for expensive physical prototypes and shortening time-to-market by weeks or even months.
          </p>
          
          <h3 className="text-2xl font-bold text-primary mb-4">Predictive Maintenance</h3>
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            Beyond product quality, AI is enhancing equipment reliability. By analyzing vibration data, power consumption, and acoustic signatures from presses and furnaces, AI systems can predict when a component (like a hydraulic seal or heating element) is likely to fail. This allows maintenance to be scheduled during planned downtime rather than reacting to unexpected breakdowns, maximizing overall equipment effectiveness (OEE).
          </p>

          <p className="text-lg text-gray-600 mb-6 leading-relaxed font-medium">
            At Hydroforce Engineering, we are committed to integrating these advanced digital tools into our workflow. By harnessing the power of AI, we ensure our clients receive components that are not only high-performance but are also manufactured with the highest degree of process reliability and traceability.
          </p>
        </div>
      </section>
    </>
  );
};