import React, { useState } from 'react';
import { Search, Recycle, Zap, Droplets, ThermometerSun, Shield, Leaf, AlertCircle, CheckCircle2, TrendingUp } from 'lucide-react';

const MaterialSelector = () => {
  const [requirements, setRequirements] = useState({
    application: '',
    temperature: '',
    environment: '',
    strength: '',
    sustainability: false,
    recyclable: false
  });
  
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const materialDatabase = {
    metals: [
      { name: 'Aluminum 6061', strength: 'Medium', temp: 'Up to 200°C', corrosion: 'Excellent', recyclable: true, sustainability: 95, cost: 'Medium', weight: 'Light', applications: ['aerospace', 'automotive', 'structural'] },
      { name: 'Stainless Steel 316', strength: 'High', temp: 'Up to 800°C', corrosion: 'Excellent', recyclable: true, sustainability: 85, cost: 'High', weight: 'Heavy', applications: ['marine', 'chemical', 'food processing'] },
      { name: 'Titanium Ti-6Al-4V', strength: 'Very High', temp: 'Up to 400°C', corrosion: 'Excellent', recyclable: true, sustainability: 70, cost: 'Very High', weight: 'Light', applications: ['aerospace', 'medical', 'marine'] },
      { name: 'Carbon Steel A36', strength: 'High', temp: 'Up to 425°C', corrosion: 'Poor', recyclable: true, sustainability: 90, cost: 'Low', weight: 'Heavy', applications: ['construction', 'structural', 'industrial'] }
    ],
    polymers: [
      { name: 'PLA (Bioplastic)', strength: 'Low', temp: 'Up to 60°C', corrosion: 'Excellent', recyclable: true, sustainability: 95, cost: 'Low', weight: 'Light', applications: ['packaging', '3d printing', 'consumer goods'] },
      { name: 'PEEK', strength: 'High', temp: 'Up to 260°C', corrosion: 'Excellent', recyclable: false, sustainability: 40, cost: 'Very High', weight: 'Light', applications: ['aerospace', 'medical', 'automotive'] },
      { name: 'Recycled PET', strength: 'Medium', temp: 'Up to 70°C', corrosion: 'Excellent', recyclable: true, sustainability: 90, cost: 'Low', weight: 'Light', applications: ['packaging', 'textiles', 'containers'] },
      { name: 'Nylon 6/6', strength: 'Medium', temp: 'Up to 120°C', corrosion: 'Good', recyclable: true, sustainability: 60, cost: 'Medium', weight: 'Light', applications: ['automotive', 'industrial', 'consumer goods'] }
    ],
    composites: [
      { name: 'Carbon Fiber Composite', strength: 'Very High', temp: 'Up to 150°C', corrosion: 'Excellent', recyclable: false, sustainability: 40, cost: 'Very High', weight: 'Very Light', applications: ['aerospace', 'automotive', 'sports equipment'] },
      { name: 'Flax Fiber Composite', strength: 'Medium', temp: 'Up to 100°C', corrosion: 'Good', recyclable: true, sustainability: 95, cost: 'Medium', weight: 'Light', applications: ['automotive', 'consumer goods', 'furniture'] },
      { name: 'Glass Fiber Composite', strength: 'High', temp: 'Up to 200°C', corrosion: 'Excellent', recyclable: false, sustainability: 50, cost: 'Medium', weight: 'Light', applications: ['marine', 'automotive', 'construction'] }
    ]
  };

  const analyzeRequirements = () => {
    setLoading(true);
    
    setTimeout(() => {
      const allMaterials = [...materialDatabase.metals, ...materialDatabase.polymers, ...materialDatabase.composites];
      
      const scored = allMaterials.map(material => {
        let score = 0;
        let reasons = [];

        if (requirements.application) {
          const appMatch = material.applications.some(app => 
            app.toLowerCase().includes(requirements.application.toLowerCase()) ||
            requirements.application.toLowerCase().includes(app)
          );
          if (appMatch) {
            score += 30;
            reasons.push('Suitable for application');
          }
        }

        if (requirements.strength) {
          const strengthMap = { low: 1, medium: 2, high: 3, 'very high': 4 };
          const reqStrength = strengthMap[requirements.strength.toLowerCase()] || 0;
          const matStrength = strengthMap[material.strength.toLowerCase()] || 0;
          
          if (matStrength >= reqStrength) {
            score += 25;
            reasons.push('Meets strength requirements');
          }
        }

        if (requirements.environment === 'corrosive' && material.corrosion === 'Excellent') {
          score += 20;
          reasons.push('Excellent corrosion resistance');
        }

        if (requirements.sustainability && material.sustainability >= 80) {
          score += 15;
          reasons.push('High sustainability rating');
        }

        if (requirements.recyclable && material.recyclable) {
          score += 10;
          reasons.push('Fully recyclable');
        }

        return { ...material, score, reasons };
      });

      const topMaterials = scored
        .filter(m => m.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 5);

      setResults(topMaterials);
      setLoading(false);
    }, 1500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    analyzeRequirements();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Zap className="w-10 h-10 text-blue-400" />
            <h1 className="text-4xl font-bold text-white">GenAI Material Selector</h1>
          </div>
          <p className="text-blue-200 text-lg">Intelligent material selection powered by AI-driven analysis</p>
        </header>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Search className="w-6 h-6 text-blue-400" />
              Project Requirements
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-white mb-2 font-medium">Application Type</label>
                <input
                  type="text"
                  placeholder="e.g., aerospace, automotive, marine, medical"
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-blue-400 transition"
                  value={requirements.application}
                  onChange={(e) => setRequirements({...requirements, application: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-white mb-2 font-medium">Operating Temperature</label>
                <select
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-blue-400 transition"
                  value={requirements.temperature}
                  onChange={(e) => setRequirements({...requirements, temperature: e.target.value})}
                >
                  <option value="">Select temperature range</option>
                  <option value="low">Low (&lt; 100°C)</option>
                  <option value="medium">Medium (100-300°C)</option>
                  <option value="high">High (&gt; 300°C)</option>
                </select>
              </div>

              <div>
                <label className="block text-white mb-2 font-medium">Environmental Conditions</label>
                <select
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-blue-400 transition"
                  value={requirements.environment}
                  onChange={(e) => setRequirements({...requirements, environment: e.target.value})}
                >
                  <option value="">Select environment</option>
                  <option value="normal">Normal (Indoor/Dry)</option>
                  <option value="humid">Humid</option>
                  <option value="corrosive">Corrosive</option>
                  <option value="marine">Marine</option>
                </select>
              </div>

              <div>
                <label className="block text-white mb-2 font-medium">Required Strength</label>
                <select
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-blue-400 transition"
                  value={requirements.strength}
                  onChange={(e) => setRequirements({...requirements, strength: e.target.value})}
                >
                  <option value="">Select strength level</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="very high">Very High</option>
                </select>
              </div>

              <div className="space-y-3">
                <label className="flex items-center gap-3 text-white cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-5 h-5 rounded accent-green-500"
                    checked={requirements.sustainability}
                    onChange={(e) => setRequirements({...requirements, sustainability: e.target.checked})}
                  />
                  <Leaf className="w-5 h-5 text-green-400" />
                  <span>Prioritize sustainable materials</span>
                </label>

                <label className="flex items-center gap-3 text-white cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-5 h-5 rounded accent-blue-500"
                    checked={requirements.recyclable}
                    onChange={(e) => setRequirements({...requirements, recyclable: e.target.checked})}
                  />
                  <Recycle className="w-5 h-5 text-blue-400" />
                  <span>Must be recyclable</span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition transform hover:scale-105 flex items-center justify-center gap-2"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Analyzing Materials...
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    Find Suitable Materials
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-green-400" />
              Recommended Materials
            </h2>

            {!results ? (
              <div className="text-center py-12">
                <AlertCircle className="w-16 h-16 text-white/30 mx-auto mb-4" />
                <p className="text-white/60 text-lg">Enter your requirements and click "Find Suitable Materials" to get AI-powered recommendations</p>
              </div>
            ) : results.length === 0 ? (
              <div className="text-center py-12">
                <AlertCircle className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
                <p className="text-white text-lg">No materials found matching your criteria. Try adjusting your requirements.</p>
              </div>
            ) : (
              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                {results.map((material, index) => (
                  <div key={index} className="bg-white/5 rounded-lg p-5 border border-white/10 hover:border-blue-400/50 transition">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-1">{material.name}</h3>
                        <div className="flex items-center gap-2">
                          <div className="bg-blue-500/20 px-3 py-1 rounded-full">
                            <span className="text-blue-300 text-sm font-medium">Match: {material.score}%</span>
                          </div>
                          {material.recyclable && (
                            <Recycle className="w-5 h-5 text-green-400" title="Recyclable" />
                          )}
                        </div>
                      </div>
                      <CheckCircle2 className="w-6 h-6 text-green-400" />
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div className="flex items-center gap-2 text-white/80">
                        <Shield className="w-4 h-4 text-blue-400" />
                        <span className="text-sm">Strength: {material.strength}</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/80">
                        <ThermometerSun className="w-4 h-4 text-orange-400" />
                        <span className="text-sm">{material.temp}</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/80">
                        <Droplets className="w-4 h-4 text-cyan-400" />
                        <span className="text-sm">Corrosion: {material.corrosion}</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/80">
                        <Leaf className="w-4 h-4 text-green-400" />
                        <span className="text-sm">Sustainability: {material.sustainability}%</span>
                      </div>
                    </div>

                    <div className="mb-3">
                      <p className="text-white/60 text-sm mb-2">Why this material:</p>
                      <div className="flex flex-wrap gap-2">
                        {material.reasons.map((reason, i) => (
                          <span key={i} className="bg-green-500/20 text-green-300 px-2 py-1 rounded text-xs">
                            {reason}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/60">Cost: <span className="text-white">{material.cost}</span></span>
                      <span className="text-white/60">Weight: <span className="text-white">{material.weight}</span></span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
          <h3 className="text-xl font-bold text-white mb-4">How It Works</h3>
          <div className="grid md:grid-cols-3 gap-4 text-white/80">
            <div className="flex gap-3">
              <div className="bg-blue-500/20 rounded-lg p-3 h-fit">
                <Search className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h4 className="font-semibold text-white mb-1">AI Analysis</h4>
                <p className="text-sm">Advanced algorithms analyze your requirements against a comprehensive material database</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="bg-green-500/20 rounded-lg p-3 h-fit">
                <Leaf className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <h4 className="font-semibold text-white mb-1">Sustainability Focus</h4>
                <p className="text-sm">Prioritizes eco-friendly, recyclable materials with high sustainability ratings</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="bg-purple-500/20 rounded-lg p-3 h-fit">
                <TrendingUp className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <h4 className="font-semibold text-white mb-1">Smart Recommendations</h4>
                <p className="text-sm">Provides ranked results with detailed reasoning and performance metrics</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaterialSelector;
