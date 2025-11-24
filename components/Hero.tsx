import React from 'react';
import { HeroProps } from '../types';
import { HashLink } from 'react-router-hash-link';

export const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  description,
  stats,
  bgImage,
  overlayType = 'normal',
  buttons,
}) => {
  let overlayGradient =
    'linear-gradient(rgba(2, 24, 34, 0.8), rgba(1, 87, 125, 0.1))';
  let textColor = 'text-white';
  let textShadowClass = 'drop-shadow-lg';

  if (overlayType === 'dark') {
    overlayGradient =
      'linear-gradient(rgba(2, 24, 34, 0.85), rgba(0, 58, 82, 0.85))';
  } else if (overlayType === 'light') {
    overlayGradient =
      'linear-gradient(rgba(248, 249, 250, 0.85), rgba(233, 236, 239, 0.85))';
    textColor = 'text-primary';
    textShadowClass = '';
  }

  return (
    <section
      className="relative min-h-[600px] flex items-center py-24 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `${overlayGradient}, url(${bgImage})` }}
    >
      <div className="container mx-auto px-4 relative z-10">
        <div className={`max-w-4xl ${textColor}`}>
          <h1
            className={`text-4xl md:text-5xl lg:text-7xl font-bold mb-6 ${textShadowClass} leading-tight tracking-tight`}
          >
            {title}
          </h1>
          <p
            className={`text-xl md:text-2xl font-light mb-8 opacity-95 ${textShadowClass} leading-relaxed max-w-2xl`}
          >
            {subtitle}
          </p>
          {description && (
            <p
              className={`text-lg md:text-xl mb-10 opacity-90 max-w-3xl ${textShadowClass} leading-relaxed font-normal`}
            >
              {description}
            </p>
          )}

          {stats && (
            <div className="flex flex-wrap gap-6 mb-12">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className={`px-8 py-5 rounded-xl backdrop-blur-xl border shadow-2xl transition-transform hover:-translate-y-1 duration-300 ${
                    overlayType === 'light'
                      ? 'bg-primary/5 border-primary/10'
                      : 'bg-white/10 border-white/30 hover:border-accent/50 hover:shadow-accent/20'
                  }`}
                >
                  <strong
                    className={`block text-3xl md:text-4xl font-bold mb-1 ${overlayType === 'light' ? 'text-accent' : 'text-white drop-shadow-md'}`}
                  >
                    {stat.value}
                  </strong>
                  <span
                    className={`text-sm md:text-base font-bold uppercase tracking-wider ${overlayType === 'light' ? 'text-text-gray' : 'text-gray-100'}`}
                  >
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          )}

          {buttons && (
            <div className="flex flex-wrap gap-4">
              {buttons.map((btn, idx) => (
                <HashLink
                  key={idx}
                  smooth
                  to={btn.link}
                  className={`px-10 py-4 rounded-full font-bold text-lg transition-all shadow-lg hover:shadow-2xl transform hover:-translate-y-1 ${
                    btn.type === 'primary'
                      ? 'bg-gradient-to-r from-accent to-accent-dark text-white border-2 border-transparent hover:from-accent-dark hover:to-accent'
                      : 'bg-transparent text-white border-2 border-white hover:bg-white hover:text-primary'
                  }`}
                >
                  {btn.label}
                </HashLink>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
