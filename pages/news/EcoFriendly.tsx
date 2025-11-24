import React from 'react';
import { Hero } from '../../components/Hero';
import { SEO } from '../../components/SEO';

export const EcoFriendly: React.FC = () => {
  return (
    <>
      <SEO 
        title="Eco-Friendly Powder Metallurgy"
        description="Learn how Powder Metallurgy is a sustainable choice for modern manufacturing, offering material efficiency and reduced energy consumption."
        keywords={['Sustainability', 'Green Manufacturing', 'Powder Metallurgy', 'Eco-friendly', 'Material Efficiency']}
      />
      <Hero
        title="Eco-Friendly Powder Metallurgy"
        subtitle="A Sustainable Choice for Modern Manufacturing"
        bgImage="https://www.hydroforce.ee/wp-content/uploads/2025/05/Eco-Friendly-Powder-metallurgy.webp"
        overlayType="dark"
      />

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-primary mb-6">Sustainability in Manufacturing</h2>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            In the modern industrial landscape, environmental responsibility has shifted from a corporate buzzword to a critical operational imperative. Powder Metallurgy (PM) is increasingly recognized as a "green" technology, offering a sustainable alternative to traditional metalworking processes like machining, casting, and forging. By leveraging the unique additive nature of PM, manufacturers can significantly reduce their carbon footprint, minimize waste, and optimize energy consumption.
          </p>
          
          <div className="mb-10 rounded-xl overflow-hidden shadow-lg">
            <img 
              src="https://www.hydroforce.ee/wp-content/uploads/2025/05/Eco-Friendly-Powder-metallurgy.webp" 
              alt="Eco-Friendly Powder Metallurgy Process" 
              className="w-full h-auto object-cover"
            />
          </div>
          
          <h3 className="text-2xl font-bold text-primary mb-4">Unmatched Material Efficiency</h3>
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            One of the most compelling environmental advantages of Powder Metallurgy is its high material utilization. Traditional subtractive manufacturing processes, such as CNC machining, start with a solid billet of metal and remove material to achieve the desired shape. This can result in material waste rates as high as 50-70% in the form of chips and swarf.
          </p>
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            In contrast, PM is a near-net-shape process. Metal powder is compacted directly into the final geometry of the part. The material utilization rate typically exceeds <strong>95% to 97%</strong>. This drastic reduction in scrap not only conserves raw resources but also eliminates the energy-intensive processes required to recycle or dispose of machining waste.
          </p>

          <div className="bg-bg-light p-8 rounded-xl border-l-4 border-accent my-8">
            <h3 className="text-xl font-bold text-primary mb-4">Key Environmental Metrics</h3>
            <ul className="space-y-3 text-gray-700 text-lg">
              <li className="flex gap-2"><span className="text-accent font-bold">✓</span> <strong>Lower Energy Consumption:</strong> Sintering involves heating material below its melting point, which consumes significantly less energy than the melting required for casting.</li>
              <li className="flex gap-2"><span className="text-accent font-bold">✓</span> <strong>Reduced Secondary Machining:</strong> The high precision of PM parts often eliminates the need for finish machining, saving further energy and fluids.</li>
              <li className="flex gap-2"><span className="text-accent font-bold">✓</span> <strong>Use of Recycled Materials:</strong> The PM industry is a major consumer of recycled scrap metal, which is atomized into powder, closing the loop on the material lifecycle.</li>
            </ul>
          </div>
          
          <h3 className="text-2xl font-bold text-primary mb-4 mt-8">Clean Process and Hazardous Waste Reduction</h3>
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            Traditional metalworking often relies on substantial quantities of metalworking fluids, coolants, and lubricants, many of which are hazardous and require strict disposal protocols. The Powder Metallurgy process is inherently cleaner. While lubricants are used during compaction to eject parts from the die, modern PM lubricants are designed to burn off cleanly during the sintering process.
          </p>
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            Furthermore, the closed-loop nature of many sintering furnaces allows for the capture and treatment of exhaust gases, ensuring minimal emissions. Advances in "green" binders and lubricants are continuing to reduce the environmental impact of the debinding phase, making PM one of the cleanest metallurgical processes available today.
          </p>

          <h3 className="text-2xl font-bold text-primary mb-4 mt-8">Conclusion</h3>
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            Choosing Powder Metallurgy is not just an economic decision; it is an ecological one. By adopting PM components, companies contribute to a circular economy, reduce their reliance on virgin raw materials, and lower the overall energy intensity of their supply chain. As regulations regarding industrial emissions and waste tighten globally, the green credentials of Powder Metallurgy position it as the manufacturing technology of the future.
          </p>
        </div>
      </section>
    </>
  );
};