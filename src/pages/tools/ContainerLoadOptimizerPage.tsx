import React, { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Package, Layers, Box, Calculator, Maximize, BarChart3, Truck, Container } from 'lucide-react';

interface ContainerOptimization {
  containerType: string;
  utilization: number;
  totalItems: number;
  arrangement: PackageArrangement[];
  savings: number;
  recommendations: string[];
}

interface PackageArrangement {
  item: string;
  quantity: number;
  dimensions: string;
  position: string;
  stackable: boolean;
}

const ContainerLoadOptimizerPage = () => {
  const [packages, setPackages] = useState([
    { id: 1, name: 'Electronics Boxes', length: 60, width: 40, height: 30, weight: 25, quantity: 10, stackable: true },
    { id: 2, name: 'Textile Rolls', length: 120, width: 20, height: 20, weight: 35, quantity: 5, stackable: false },
    { id: 3, name: 'Machinery Parts', length: 80, width: 60, height: 50, weight: 120, quantity: 3, stackable: true }
  ]);

  const [containerType, setContainerType] = useState('20ft');
  const [optimization, setOptimization] = useState<ContainerOptimization | null>(null);
  const [isOptimizing, setIsOptimizing] = useState(false);

  const containerTypes = [
    { id: '20ft', name: '20ft Standard', length: 589, width: 235, height: 239, maxWeight: 28000 },
    { id: '40ft', name: '40ft Standard', length: 1203, width: 235, height: 239, maxWeight: 30000 },
    { id: '40hc', name: '40ft High Cube', length: 1203, width: 235, height: 269, maxWeight: 30000 },
    { id: '45hc', name: '45ft High Cube', length: 1354, width: 235, height: 269, maxWeight: 30000 }
  ];

  const addPackage = () => {
    const newPackage = {
      id: Date.now(),
      name: 'New Package',
      length: 50,
      width: 40,
      height: 30,
      weight: 20,
      quantity: 1,
      stackable: true
    };
    setPackages([...packages, newPackage]);
  };

  const updatePackage = (id: number, field: string, value: any) => {
    setPackages(packages.map(pkg => 
      pkg.id === id ? { ...pkg, [field]: value } : pkg
    ));
  };

  const removePackage = (id: number) => {
    setPackages(packages.filter(pkg => pkg.id !== id));
  };

  const optimizeLoad = async () => {
    setIsOptimizing(true);

    // Simulate optimization calculation
    await new Promise(resolve => setTimeout(resolve, 2500));

    const selectedContainer = containerTypes.find(c => c.id === containerType)!;
    const totalVolume = packages.reduce((sum, pkg) => 
      sum + (pkg.length * pkg.width * pkg.height * pkg.quantity), 0
    );
    const containerVolume = selectedContainer.length * selectedContainer.width * selectedContainer.height;
    const utilization = Math.min((totalVolume / containerVolume) * 100 * 0.85, 95); // 85% efficiency factor

    const mockOptimization: ContainerOptimization = {
      containerType: selectedContainer.name,
      utilization,
      totalItems: packages.reduce((sum, pkg) => sum + pkg.quantity, 0),
      arrangement: packages.map((pkg, index) => ({
        item: pkg.name,
        quantity: pkg.quantity,
        dimensions: `${pkg.length}x${pkg.width}x${pkg.height}cm`,
        position: `Layer ${index + 1}, ${pkg.stackable ? 'Stackable' : 'Non-stackable'}`,
        stackable: pkg.stackable
      })),
      savings: Math.floor(Math.random() * 2000 + 500),
      recommendations: [
        'Rotate Electronics Boxes 90° for better fit',
        'Stack items by weight distribution',
        'Consider using dunnage for fragile items',
        `Current utilization: ${utilization.toFixed(1)}%`,
        'Recommended loading sequence provided'
      ]
    };

    setOptimization(mockOptimization);
    setIsOptimizing(false);
  };

  return (
    <>
      <Header />
      <main className="pt-16 min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Container Load Optimizer
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Maximize container space utilization and reduce shipping costs with AI-powered load planning
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Package Configuration */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <Package className="h-6 w-6 text-orange-600 mr-3" />
                    <h2 className="text-2xl font-bold text-gray-900">Package Configuration</h2>
                  </div>
                  <button
                    onClick={addPackage}
                    className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
                  >
                    Add Package
                  </button>
                </div>

                {/* Container Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Container Type
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {containerTypes.map((container) => (
                      <label
                        key={container.id}
                        className={`flex flex-col items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                          containerType === container.id
                            ? 'border-orange-500 bg-orange-50'
                            : 'border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <input
                          type="radio"
                          name="containerType"
                          value={container.id}
                          checked={containerType === container.id}
                          onChange={(e) => setContainerType(e.target.value)}
                          className="sr-only"
                        />
                        <Container className="h-6 w-6 text-gray-600 mb-2" />
                        <span className="text-sm font-medium text-center">{container.name}</span>
                        <span className="text-xs text-gray-500">{container.maxWeight/1000}T</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Package List */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Package Details</h3>
                  {packages.map((pkg, index) => (
                    <div key={pkg.id} className="p-4 border border-gray-200 rounded-lg">
                      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                        <div className="md:col-span-2">
                          <label className="block text-xs font-medium text-gray-700 mb-1">Package Name</label>
                          <input
                            type="text"
                            value={pkg.name}
                            onChange={(e) => updatePackage(pkg.id, 'name', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Length (cm)</label>
                          <input
                            type="number"
                            value={pkg.length}
                            onChange={(e) => updatePackage(pkg.id, 'length', parseInt(e.target.value))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Width (cm)</label>
                          <input
                            type="number"
                            value={pkg.width}
                            onChange={(e) => updatePackage(pkg.id, 'width', parseInt(e.target.value))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Height (cm)</label>
                          <input
                            type="number"
                            value={pkg.height}
                            onChange={(e) => updatePackage(pkg.id, 'height', parseInt(e.target.value))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Quantity</label>
                          <input
                            type="number"
                            value={pkg.quantity}
                            onChange={(e) => updatePackage(pkg.id, 'quantity', parseInt(e.target.value))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                          />
                        </div>
                      </div>
                      
                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">Weight (kg)</label>
                            <input
                              type="number"
                              value={pkg.weight}
                              onChange={(e) => updatePackage(pkg.id, 'weight', parseInt(e.target.value))}
                              className="w-20 px-3 py-1 border border-gray-300 rounded-md text-sm"
                            />
                          </div>
                          
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              checked={pkg.stackable}
                              onChange={(e) => updatePackage(pkg.id, 'stackable', e.target.checked)}
                              className="mr-2"
                            />
                            <span className="text-sm text-gray-700">Stackable</span>
                          </label>
                        </div>
                        
                        {packages.length > 1 && (
                          <button
                            onClick={() => removePackage(pkg.id)}
                            className="text-red-600 hover:text-red-800 px-2 py-1"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={optimizeLoad}
                  disabled={isOptimizing}
                  className="w-full mt-6 bg-orange-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                >
                  {isOptimizing ? (
                    <>
                      <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-3"></div>
                      Optimizing Load...
                    </>
                  ) : (
                    <>
                      <Calculator className="h-5 w-5 mr-2" />
                      Optimize Container Load
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Optimization Results */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg p-8 sticky top-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  {optimization ? 'Optimization Results' : 'Load Optimization'}
                </h3>

                {!optimization && !isOptimizing && (
                  <div className="text-center py-12">
                    <Box className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-center">
                      Configure your packages and click optimize to see results
                    </p>
                  </div>
                )}

                {isOptimizing && (
                  <div className="text-center py-12">
                    <div className="animate-spin h-12 w-12 border-4 border-orange-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                    <p className="text-gray-600">Calculating optimal arrangement...</p>
                  </div>
                )}

                {optimization && (
                  <div className="space-y-6">
                    {/* Key Metrics */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-orange-50 rounded-lg">
                        <div className="text-2xl font-bold text-orange-600">
                          {optimization.utilization.toFixed(1)}%
                        </div>
                        <div className="text-xs text-gray-600">Utilization</div>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">
                          ${optimization.savings}
                        </div>
                        <div className="text-xs text-gray-600">Savings</div>
                      </div>
                    </div>

                    {/* Container Info */}
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">Container: {optimization.containerType}</h4>
                      <div className="text-sm text-gray-600">
                        <div>Total Items: {optimization.totalItems}</div>
                        <div>Utilization: {optimization.utilization.toFixed(1)}%</div>
                      </div>
                    </div>

                    {/* Load Arrangement */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Load Arrangement</h4>
                      <div className="space-y-2">
                        {optimization.arrangement.map((item, index) => (
                          <div key={index} className="p-3 bg-gray-50 rounded text-sm">
                            <div className="font-medium">{item.item}</div>
                            <div className="text-gray-600">
                              {item.quantity} units • {item.dimensions}
                            </div>
                            <div className="text-xs text-gray-500">{item.position}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Recommendations */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Recommendations</h4>
                      <div className="space-y-2">
                        {optimization.recommendations.map((rec, index) => (
                          <div key={index} className="flex items-start text-sm text-gray-700">
                            <div className="w-2 h-2 bg-orange-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                            {rec}
                          </div>
                        ))}
                      </div>
                    </div>

                    <button className="w-full bg-orange-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-orange-700 transition-colors">
                      Download Load Plan
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ContainerLoadOptimizerPage;