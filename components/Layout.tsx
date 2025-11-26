import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { Menu, X, Phone, Mail, MapPin, ArrowRight, Facebook, Linkedin, ChevronDown, Loader2, CheckCircle } from 'lucide-react';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  
  // Form States
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formMessage, setFormMessage] = useState('');

  const location = useLocation();

  const toggleDropdown = (name: string) => {
    if (openDropdown === name) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(name);
    }
  };

  const navStructure = [
    { name: 'Home', path: '/' },
    { 
      name: 'Hydraulics', 
      path: '#', 
      dropdown: [
        { name: 'Hydraulic Cylinders', path: '/cylinders' },
        { name: 'Interactive Showcase', path: '/cylinder-showcase' },
        { name: 'Motors & Pumps', path: '/motors' },
        { name: 'Specification Form', path: '/cylinder-form' },
      ]
    },
    { 
      name: 'Metal Parts', 
      path: '#', 
      dropdown: [
        { name: 'Powder Metallurgy', path: '/pm' },
        { name: 'Die Casting', path: '/die-casting' },
        { name: 'Machining', path: '/machining' }
      ] 
    },
    { name: 'Quality', path: '/quality' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  const scrollWithOffset = (el: HTMLElement) => {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    const yOffset = -100; 
    window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' }); 
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    // ---------------------------------------------------------
    // TODO: Replace 'YOUR_FORMSPREE_ID' with your actual Formspree Form ID
    // Register at https://formspree.io to get one.
    // Example: https://formspree.io/f/xwqbjzvq
    // ---------------------------------------------------------
    const FORMSPREE_ENDPOINT = "https://formspree.io/f/xqanlwzb"; 

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setFormStatus('success');
        form.reset();
        setTimeout(() => setFormStatus('idle'), 5000); // Reset status after 5 seconds
      } else {
        setFormStatus('error');
        const data = await response.json();
        if (Object.prototype.hasOwnProperty.call(data, 'errors')) {
          setFormMessage(data["errors"].map((error: any) => error["message"]).join(", "));
        } else {
          setFormMessage("Oops! There was a problem submitting your form");
        }
      }
    } catch (error) {
      setFormStatus('error');
      setFormMessage("Oops! There was a problem submitting your form");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[linear-gradient(135deg,#01577d_0%,#013a54_100%)] shadow-lg overflow-visible">
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-primary to-accent z-10"></div>
        
        <div className="container mx-auto px-0 h-20 lg:h-24 flex justify-between items-center relative z-20">
            
            {/* Logo Section */}
            <div className="h-full flex items-center bg-white pl-2 pr-2 lg:pl-4 lg:pr-[56px] relative lg:[clip-path:polygon(0_0,calc(100%-46px)_0,100%_100%,0_100%)] z-20 shadow-md">
                <Link to="/" onClick={() => window.scrollTo(0, 0)} className="block h-full w-auto py-0">
                    <img 
                        src="https://www.hydroforce.ee/wp-content/uploads/2025/03/Logo-Main-SVG.svg" 
                        alt="Hydroforce Engineering" 
                        className="h-full w-auto object-contain"
                    />
                </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-2 text-white flex-1 justify-end pr-8">
              {navStructure.map((item) => (
                <div key={item.name} className="relative group px-3">
                  {item.dropdown ? (
                    <button 
                      className={`flex items-center gap-1 text-lg font-semibold tracking-wide py-8 transition-all hover:text-accent focus:outline-none ${
                        item.dropdown.some(d => isActive(d.path)) ? 'text-white border-b-4 border-accent' : 'text-gray-100'
                      }`}
                    >
                      {item.name}
                      <ChevronDown size={16} className="group-hover:rotate-180 transition-transform duration-300" />
                    </button>
                  ) : (
                    <Link
                      to={item.path}
                      onClick={() => window.scrollTo(0, 0)}
                      className={`block py-8 text-lg font-semibold tracking-wide transition-all hover:text-accent ${
                        isActive(item.path) ? 'text-white border-b-4 border-accent' : 'text-gray-100'
                      }`}
                    >
                      {item.name}
                    </Link>
                  )}

                  {/* Desktop Dropdown */}
                  {item.dropdown && (
                    <div className="absolute top-full left-0 mt-0 w-64 bg-white rounded-b-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 overflow-hidden border-t-4 border-accent">
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.name}
                          to={subItem.path}
                          onClick={() => window.scrollTo(0, 0)}
                          className="block px-6 py-4 text-base text-gray-700 hover:bg-primary hover:text-white transition-colors border-b border-gray-50 last:border-0 font-medium"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Contact Button / Info Section (Desktop) */}
            <div className="hidden lg:flex h-full items-center bg-white/10 backdrop-blur-md px-12 pl-16 relative [clip-path:polygon(46px_0,100%_0,100%_100%,0_100%)] border-l border-white/5 hover:bg-white/20 transition-colors">
                 <HashLink 
                   smooth 
                   to="/#contacts" 
                   scroll={el => scrollWithOffset(el)}
                   className="bg-gradient-to-r from-accent to-accent-dark hover:from-accent-dark hover:to-accent text-white px-8 py-3 rounded-full font-bold text-base shadow-lg transition-all transform hover:scale-105 flex items-center gap-2"
                 >
                   Contact Us <ArrowRight size={18} />
                 </HashLink>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden px-4 text-white">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="focus:outline-none hover:text-accent transition-colors p-2"
                >
                  {isMobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
                </button>
            </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <div className={`lg:hidden bg-white border-t-4 border-accent absolute w-full transition-all duration-300 ease-in-out shadow-2xl overflow-y-auto ${isMobileMenuOpen ? 'max-h-[80vh] opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="flex flex-col p-4 space-y-1">
              {navStructure.map((item) => (
                <div key={item.name}>
                   {item.dropdown ? (
                     <div>
                       <button 
                         onClick={() => toggleDropdown(item.name)}
                         className="w-full flex justify-between items-center text-lg font-bold px-4 py-4 rounded-lg text-gray-800 hover:bg-gray-50"
                       >
                         {item.name}
                         <ChevronDown size={20} className={`transition-transform ${openDropdown === item.name ? 'rotate-180' : ''}`} />
                       </button>
                       <div className={`pl-4 space-y-1 overflow-hidden transition-all duration-300 ${openDropdown === item.name ? 'max-h-96 opacity-100 mt-1' : 'max-h-0 opacity-0'}`}>
                          {item.dropdown.map(subItem => (
                             <Link
                               key={subItem.name}
                               to={subItem.path}
                               className={`block text-base px-4 py-3 rounded-lg border-l-4 border-gray-200 hover:border-accent hover:text-primary hover:bg-gray-50 transition-colors ${isActive(subItem.path) ? 'text-primary font-bold border-primary' : 'text-gray-600'}`}
                               onClick={() => {
                                 setIsMobileMenuOpen(false);
                                 window.scrollTo(0, 0);
                               }}
                             >
                               {subItem.name}
                             </Link>
                          ))}
                       </div>
                     </div>
                   ) : (
                    <Link
                      to={item.path}
                      className={`block text-lg font-bold px-4 py-4 rounded-lg transition-colors ${
                        isActive(item.path) ? 'bg-primary/10 text-primary' : 'text-gray-800 hover:bg-gray-50'
                      }`}
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        window.scrollTo(0, 0);
                      }}
                    >
                      {item.name}
                    </Link>
                   )}
                </div>
              ))}
              <HashLink
                 smooth
                 to="/#contacts"
                 className="block text-lg font-bold px-4 py-4 rounded-lg text-white bg-accent hover:bg-accent-dark mt-4 text-center shadow-md"
                 onClick={() => setIsMobileMenuOpen(false)}
                 scroll={el => scrollWithOffset(el)}
              >
                Contact Us
              </HashLink>
            </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer & Contact Form */}
      <footer id="contacts" className="bg-[#002535] text-white pt-20 pb-10 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 mb-16">
            
            {/* Left Column: Info */}
            <div>
                <div className="mb-10">
                     <div className="bg-white rounded-xl inline-block mb-8 shadow-xl overflow-hidden w-[220px] md:w-[280px]">
                        {/* Footer Logo: Maximized size, no padding */}
                        <img 
                            src="https://www.hydroforce.ee/wp-content/uploads/2025/03/Logo-Main-SVG.svg" 
                            alt="Hydroforce" 
                            className="w-full h-auto object-contain block" 
                        />
                     </div>
                     <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Get in Touch</h2>
                     <p className="text-gray-300 text-lg leading-relaxed mb-8 border-l-4 border-accent pl-4">
                        Whether you have a question about our hydraulic solutions, need a quote for precision manufacturing, or want to discuss a custom project, our engineering team is ready to help.
                     </p>
                </div>

                <div className="space-y-6">
                    <div className="flex items-start gap-4 p-5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group">
                        <div className="bg-accent p-3 rounded-full group-hover:scale-110 transition-transform shadow-lg shrink-0">
                            <MapPin className="text-white" size={24} />
                        </div>
                        <div>
                            <h4 className="font-bold text-lg mb-1 text-white group-hover:text-accent transition-colors">Headquarters</h4>
                            <p className="text-gray-300">HYDROFORCE ENGINEERING<br/>Valge 13, Tallinn, 11415, Estonia</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4 p-5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group">
                        <div className="bg-accent p-3 rounded-full group-hover:scale-110 transition-transform shadow-lg shrink-0">
                            <Phone className="text-white" size={24} />
                        </div>
                        <div>
                            <h4 className="font-bold text-lg mb-1 text-white group-hover:text-accent transition-colors">Phone</h4>
                            <a href="tel:+37256699464" className="text-gray-300 hover:text-white transition-colors block font-mono text-lg">+372 5669 94 64</a>
                            <span className="text-sm text-gray-500">Mon-Fri 9am-6pm</span>
                        </div>
                    </div>

                    <div className="flex items-start gap-4 p-5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group">
                        <div className="bg-accent p-3 rounded-full group-hover:scale-110 transition-transform shadow-lg shrink-0">
                            <Mail className="text-white" size={24} />
                        </div>
                        <div>
                            <h4 className="font-bold text-lg mb-1 text-white group-hover:text-accent transition-colors">Email</h4>
                            <a href="mailto:office@hydroforce.ee" className="text-gray-300 hover:text-white transition-colors text-lg">office@hydroforce.ee</a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Column: Contact Form */}
            <div className="bg-white text-gray-800 p-8 md:p-10 rounded-3xl shadow-2xl border-t-8 border-accent transform transition-transform hover:scale-[1.01]">
                <h3 className="text-3xl font-bold text-primary mb-2">Send us a Message</h3>
                <p className="text-gray-500 mb-8">We typically respond within 24 hours.</p>
                
                {formStatus === 'success' ? (
                  <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h4 className="text-2xl font-bold text-green-800 mb-2">Message Sent!</h4>
                    <p className="text-green-700">Thank you for contacting us. We will get back to you shortly.</p>
                    <button 
                      onClick={() => setFormStatus('idle')} 
                      className="mt-6 text-primary font-bold hover:underline"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form className="space-y-5" onSubmit={handleFormSubmit}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          <div className="space-y-2">
                              <label htmlFor="name" className="text-sm font-bold text-gray-700 uppercase tracking-wider">Name</label>
                              <input type="text" id="name" name="name" className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" placeholder="Your name" required disabled={formStatus === 'submitting'} />
                          </div>
                          <div className="space-y-2">
                              <label htmlFor="phone" className="text-sm font-bold text-gray-700 uppercase tracking-wider">Phone</label>
                              <input type="tel" id="phone" name="phone" className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" placeholder="+372..." disabled={formStatus === 'submitting'} />
                          </div>
                      </div>
                      
                      <div className="space-y-2">
                          <label htmlFor="email" className="text-sm font-bold text-gray-700 uppercase tracking-wider">Email</label>
                          <input type="email" id="email" name="email" className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" placeholder="john@example.com" required disabled={formStatus === 'submitting'} />
                      </div>

                      <div className="space-y-2">
                          <label htmlFor="message" className="text-sm font-bold text-gray-700 uppercase tracking-wider">Message</label>
                          <textarea id="message" name="message" rows={4} className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none" placeholder="Tell us about your project..." required disabled={formStatus === 'submitting'}></textarea>
                      </div>

                      {formStatus === 'error' && (
                        <div className="bg-red-50 text-red-600 p-3 rounded-lg border border-red-200 text-sm">
                          {formMessage || "Something went wrong. Please try again later."}
                        </div>
                      )}

                      <button 
                        type="submit" 
                        disabled={formStatus === 'submitting'}
                        className={`w-full bg-gradient-to-r from-primary to-primary-light hover:from-primary-dark hover:to-primary text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 mt-2 flex items-center justify-center gap-2 group ${formStatus === 'submitting' ? 'opacity-70 cursor-not-allowed' : ''}`}
                      >
                          {formStatus === 'submitting' ? (
                            <>
                              <Loader2 className="animate-spin" size={20} /> Sending...
                            </>
                          ) : (
                            <>
                              Send Message <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                            </>
                          )}
                      </button>
                  </form>
                )}
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
             <div className="text-gray-400 text-sm flex flex-col md:flex-row gap-4 items-center">
                <span>&copy; {new Date().getFullYear()} Hydroforce Engineering. All rights reserved.</span>
                <Link to="/privacy-policy" className="text-gray-400 hover:text-white transition-colors underline underline-offset-4">Privacy Policy</Link>
             </div>
             <div className="flex gap-4">
                <a href="https://www.facebook.com/profile.php?id=61569990287623" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#1877F2] transition-all">
                    <Facebook size={18} />
                </a>
                <a href="https://www.linkedin.com/company/hydroforce-engineering/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#0A66C2] transition-all">
                    <Linkedin size={18} />
                </a>
             </div>
          </div>
        </div>
      </footer>
    </div>
  );
};