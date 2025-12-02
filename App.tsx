import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Motors } from './pages/Motors';
import { Cylinders } from './pages/Cylinders';
import { PowderMetallurgy } from './pages/PowderMetallurgy';
import { DieCasting } from './pages/DieCasting';
import { Machining } from './pages/Machining';
import { Quality } from './pages/Quality';
import { EcoFriendly } from './pages/news/EcoFriendly';
import { AIinPM } from './pages/news/AIinPM';
import { NonTraditional } from './pages/news/NonTraditional';
import { UHTSintering } from './pages/news/UHTSintering';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { CylinderForm } from './pages/CylinderForm';
import { CylinderShowcase } from './pages/CylinderShowcase';
import { CylinderConfigurator } from './pages/CylinderConfigurator';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/motors" element={<Motors />} />
          <Route path="/cylinders" element={<Cylinders />} />
          <Route path="/cylinder-showcase" element={<CylinderShowcase />} />
          <Route path="/cylinder-configurator" element={<CylinderConfigurator />} />
          <Route path="/cylinder-form" element={<CylinderForm />} />
          <Route path="/pm" element={<PowderMetallurgy />} />
          <Route path="/die-casting" element={<DieCasting />} />
          <Route path="/machining" element={<Machining />} />
          <Route path="/quality" element={<Quality />} />
          <Route path="/news/eco-friendly" element={<EcoFriendly />} />
          <Route path="/news/ai-digital" element={<AIinPM />} />
          <Route path="/news/non-traditional" element={<NonTraditional />} />
          <Route path="/news/uht-sintering" element={<UHTSintering />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;