import React from 'react';
import { Hero } from '../../components/Hero';
import { SEO } from '../../components/SEO';

export const NonTraditional: React.FC = () => {
  return (
    <>
      <SEO 
        title="PM in Non-traditional Fields"
        description="Exploring the applications of Powder Metallurgy beyond automotive: medical implants, aerospace components, e-mobility, and luxury goods."
        keywords={['Powder Metallurgy Applications', 'Medical Implants', 'Aerospace PM', 'MIM', 'Soft Magnetic Composites']}
      />
      <Hero
        title="Powder Metallurgy in Non-traditional Fields"
        subtitle="Going Beyond Automotive"
        bgImage="https://www.hydroforce.ee/wp-content/uploads/2025/05/Medical-Implants-Using-Powder-Metallurgy.webp"
        overlayType="dark"
      />

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-primary mb-6">Expanding Horizons</h2>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            For decades, the automotive industry has been the driving force behind the Powder Metallurgy (PM) sector, accounting for the vast majority of produced components. However, as the technology matures and capabilities expand, PM is rapidly finding its footing in non-traditional markets. The ability to process difficult materials and create complex geometries without machining is unlocking innovative applications in medicine, aerospace, luxury goods, and green energy.
          </p>
          
          <div className="mb-10 rounded-xl overflow-hidden shadow-lg bg-gray-100">
            <img 
              src="https://www.hydroforce.ee/wp-content/uploads/2025/05/Medical-Implants-Using-Powder-Metallurgy.webp" 
              alt="Medical Implants Using Powder Metallurgy" 
              className="w-full h-auto object-contain max-h-[500px]"
            />
          </div>
          
          <div className="space-y-10 my-10">
             <div className="flex gap-6 items-start">
                <div className="w-3 h-full min-h-[100px] bg-accent rounded-full flex-shrink-0"></div>
                <div>
                   <h3 className="text-2xl font-bold text-primary mb-2">Medical and Dental Applications</h3>
                   <p className="text-lg text-gray-600 leading-relaxed">
                     The medical sector demands materials that are biocompatible, corrosion-resistant, and extremely precise. Metal Injection Molding (MIM) and Additive Manufacturing (AM) are revolutionizing this space. PM allows for the production of surgical instruments with ergonomic, complex shapes that would be impossible to machine. 
                   </p>
                   <p className="text-lg text-gray-600 leading-relaxed mt-3">
                     Furthermore, PM enables the creation of implants with controlled porosity. By tailoring the pore structure of titanium implants, manufacturers can mimic the structure of natural bone, promoting <strong>osseointegration</strong> (bone ingrowth) and reducing rejection rates. From orthodontic brackets to spinal implants, PM is improving patient outcomes.
                   </p>
                </div>
             </div>

             <div className="flex gap-6 items-start">
                <div className="w-3 h-full min-h-[100px] bg-primary rounded-full flex-shrink-0"></div>
                <div>
                   <h3 className="text-2xl font-bold text-primary mb-2">Aerospace and Defense</h3>
                   <p className="text-lg text-gray-600 leading-relaxed">
                     In aerospace, weight is everything. PM facilitates the use of advanced lightweight materials like titanium aluminides and superalloys that are notoriously difficult to machine. "Buy-to-fly" ratios (the ratio of raw material weight to finished part weight) are a major concern in aerospace; machining from billet can waste 90% of expensive titanium. PM Near-Net-Shape technologies reduce this waste dramatically, making the production of turbine blades, brackets, and structural fittings more cost-effective and sustainable.
                   </p>
                </div>
             </div>

             <div className="flex gap-6 items-start">
                <div className="w-3 h-full min-h-[100px] bg-primary-light rounded-full flex-shrink-0"></div>
                <div>
                   <h3 className="text-2xl font-bold text-primary mb-2">E-Mobility and Electrification</h3>
                   <p className="text-lg text-gray-600 leading-relaxed">
                     As the world shifts toward electric vehicles (EVs), the requirements for metal components are changing. While transmission gears remain important, there is a surging demand for <strong>Soft Magnetic Composites (SMCs)</strong>. These are iron powder particles coated with an electrically insulating layer, compacted and cured.
                   </p>
                   <p className="text-lg text-gray-600 leading-relaxed mt-3">
                     SMC components are crucial for high-efficiency electric motors with 3D magnetic flux paths. They reduce core losses at high frequencies, improving the range and efficiency of EVs. PM is uniquely positioned to manufacture these complex magnetic cores that cannot be produced by traditional lamination stacking.
                   </p>
                </div>
             </div>

             <div className="flex gap-6 items-start">
                <div className="w-3 h-full min-h-[100px] bg-gray-400 rounded-full flex-shrink-0"></div>
                <div>
                   <h3 className="text-2xl font-bold text-primary mb-2">Luxury Goods</h3>
                   <p className="text-lg text-gray-600 leading-relaxed">
                     The luxury watch and jewelry/accessories market has embraced Metal Injection Molding for its aesthetic capabilities. MIM allows for the production of scratch-resistant ceramic cases, high-polish stainless steel clasps, and intricate buckles with perfect surface finishes. The technology offers designers absolute freedom to create fluid, organic shapes that define brand identity without the constraints of traditional machining tools.
                   </p>
                </div>
             </div>
          </div>
          
          <h3 className="text-2xl font-bold text-primary mb-4 mt-8">Conclusion</h3>
          <p className="text-lg text-gray-600 leading-relaxed">
             The diversification of Powder Metallurgy into these non-traditional fields highlights the versatility of the technology. It is no longer just a method for making cheap automotive gears; it is a high-tech solution for critical applications where performance, geometry, and material properties must converge.
          </p>
        </div>
      </section>
    </>
  );
};