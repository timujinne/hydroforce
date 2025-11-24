import React from 'react';
import { Hero } from '../../components/Hero';
import { SEO } from '../../components/SEO';

export const UHTSintering: React.FC = () => {
  return (
    <>
      <SEO 
        title="Ultra-High Temperature Sintering"
        description="Transforming material properties in Powder Metallurgy with Ultra-High Temperature Sintering (UHTS). Enhanced strength and performance."
        keywords={['Ultra-High Temperature Sintering', 'UHTS', 'Powder Metallurgy', 'Sintering', 'Advanced Alloys']}
      />
      <Hero
        title="Ultra-High Temperature Sintering"
        subtitle="Transforming Material Properties"
        bgImage="https://www.hydroforce.ee/wp-content/uploads/2025/05/Ultra-High-Temperature-Sintering.webp"
        overlayType="dark"
      />

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-primary mb-6">
            Pushing the Limits of Heat
          </h2>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            In the world of Powder Metallurgy (PM), sintering is the critical
            step where particles fuse together to form a solid, strong
            component. Standard sintering typically occurs in continuous belt
            furnaces at temperatures around 1120°C. However, a shift towards{' '}
            <strong>Ultra-High Temperature Sintering (UHTS)</strong>—operating
            at temperatures of 1250°C to 1350°C or even higher—is unlocking a
            new tier of material performance that challenges wrought steel.
          </p>

          <div className="mb-10 rounded-xl overflow-hidden shadow-lg">
            <img
              src="https://www.hydroforce.ee/wp-content/uploads/2025/05/Ultra-High-Temperature-Sintering.webp"
              alt="Ultra-High Temperature Sintering Process"
              className="w-full h-auto object-cover"
            />
          </div>

          <div className="bg-primary text-white p-8 rounded-xl shadow-lg mb-10">
            <h3 className="text-2xl font-bold mb-4">
              Why Temperature Matters?
            </h3>
            <p className="text-lg opacity-90 leading-relaxed">
              The jump from 1120°C to 1250°C+ is not merely about processing
              speed. It fundamentally alters the chemical and physical reactions
              within the material. At these elevated temperatures, the reduction
              of stable oxides (specifically Chromium and Manganese oxides)
              becomes thermodynamically possible in standard industrial
              atmospheres. This capability changes the game for alloy selection.
            </p>
          </div>

          <h3 className="text-2xl font-bold text-text-gray mb-6">
            Key Advantages of UHTS
          </h3>

          <div className="space-y-8">
            <div>
              <h4 className="text-xl font-bold text-primary mb-2">
                1. Enabling High-Performance Alloying Elements
              </h4>
              <p className="text-lg text-gray-600 leading-relaxed">
                Standard PM often relies on Nickel and Copper for strengthening
                because they do not form stable oxides at 1120°C. However,
                Nickel is expensive and can be a health hazard, while Copper can
                hinder recyclability. Chromium (Cr) and Manganese (Mn) are far
                superior alloying elements—they are cheaper, offer better
                hardenability, and provide recycling advantages.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mt-2">
                The catch is that Cr and Mn have a high affinity for oxygen.
                UHTS allows for the effective reduction of these oxides,
                enabling the mass production of{' '}
                <strong>Chromium-Manganese alloyed PM steels</strong>. These
                materials offer exceptional tensile strength and fatigue
                performance at a lower cost than traditional Ni-Cu steels.
              </p>
            </div>

            <div>
              <h4 className="text-xl font-bold text-primary mb-2">
                2. Improved Pore Morphology
              </h4>
              <p className="text-lg text-gray-600 leading-relaxed">
                Mechanical properties, particularly impact toughness and fatigue
                strength, are heavily influenced by the shape of the pores
                remaining in the material. At 1120°C, pores tend to be irregular
                and angular, acting as stress concentrators.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mt-2">
                At UHTS temperatures, diffusion rates increase exponentially.
                This accelerates pore rounding, transforming angular pores into
                spherical ones. Smooth, spherical pores significantly reduce
                stress concentrations, leading to dramatic improvements in
                dynamic properties like impact energy and fatigue endurance.
              </p>
            </div>

            <div>
              <h4 className="text-xl font-bold text-primary mb-2">
                3. Enhanced Sinter-Hardening
              </h4>
              <p className="text-lg text-gray-600 leading-relaxed">
                When combined with rapid cooling systems (sinter-hardening),
                UHTS allows for the creation of fully martensitic
                microstructures directly from the furnace. This eliminates the
                need for a separate heat treatment step (like oil quenching),
                reducing distortion, eliminating oil residue, and streamlining
                the manufacturing process.
              </p>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-text-gray mb-4 mt-10">
            Performance Comparison
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <li className="bg-bg-light p-6 rounded-lg border border-gray-200 shadow-sm">
              <strong className="block text-lg mb-2 text-primary">
                Standard Sintering (1120°C)
              </strong>
              <span className="text-gray-600">
                Good general properties, reliant on Ni/Cu, irregular pores,
                often requires secondary heat treatment for high hardness.
              </span>
            </li>
            <li className="bg-bg-light p-6 rounded-lg border border-gray-200 shadow-sm">
              <strong className="block text-lg mb-2 text-accent">
                UHT Sintering (1280°C)
              </strong>
              <span className="text-gray-600">
                Superior tensile & fatigue strength, enables Cr/Mn steels,
                spherical pores, potential for single-step hardening.
              </span>
            </li>
          </ul>

          <h3 className="text-2xl font-bold text-primary mb-4 mt-10">
            Conclusion
          </h3>
          <p className="text-lg text-gray-600 mb-6 leading-relaxed">
            Ultra-High Temperature Sintering is transforming Powder Metallurgy
            from a cost-saving technology into a high-performance one. By
            unlocking the potential of advanced alloy systems and optimizing
            microstructure, UHTS components can now compete directly with
            wrought materials in demanding applications like automotive
            transmission gears and high-stress structural parts.
          </p>
        </div>
      </section>
    </>
  );
};