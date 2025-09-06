import { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Map, Navigation, Clock, DollarSign, Fuel, Leaf, MapPin, Plus, Trash2 } from 'lucide-react';
import RouteStopInput from "../../components/tools/RouteStopInput";
import RouteOptimizerInputPanel from "../../components/tools/RouteOptimizerInputPanel";
import RouteOptimizerResultsPanel from "../../components/tools/RouteOptimizerResultsPanel";
import RouteOptimizerDetailsPanel from "../../components/tools/RouteOptimizerDetailsPanel";

const RouteOptimizerPage = () => {
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizedRoute, setOptimizedRoute] = useState<any>(null);
  const [optimizationGoal, setOptimizationGoal] = useState('time');
  const [vehicleType, setVehicleType] = useState('truck');

  const [routes, setRoutes] = useState([
    { id: 1, name: '', location: '', latitude: '', longitude: '', priority: 'medium' },
    { id: 2, name: '', location: '', latitude: '', longitude: '', priority: 'medium' }
  ]);
  const [routeType, setRouteType] = useState("land");
  const [routeSubType, setRouteSubType] = useState("road");
  const [viaStops, setViaStops] = useState<any[]>([]);

  // Simulated AI suggestion (real implementation would use Puter.js)
  const aiSuggest = async (type: string, _term: string, setValue: (v: string) => void) => {
    // You would use Puter.js here for intelligent suggestions!
    if (routeType === "air") setValue("LHR"); // Just an example AI picks Heathrow for air
    else if (routeType === "ocean") setValue("CNSHA"); // Shanghai for ocean
    else setValue("Detected Place");
  };

  const addViaStop = () => {
    const newId = viaStops.length ? Math.max(...viaStops.map(v => v.id)) + 1 : 1000;
    setViaStops([...viaStops, {
      id: newId,
      name: "",
      location: "",
      latitude: "",
      longitude: "",
      priority: "medium",
      portOrAirport: "",
    }]);
  };
  const removeViaStop = (id: number) => setViaStops(viaStops.filter(v => v.id !== id));

  // Subcategories for each mode
  const routeTypeOptions = [
    {
      type: "land",
      label: "Land",
      sub: [
        { key: "road", label: "Road" },
        { key: "rail", label: "Rail" },
      ],
    },
    {
      type: "ocean",
      label: "Ocean",
      sub: [
        { key: "fcl", label: "Full Container (FCL)" },
        { key: "lcl", label: "Less Container (LCL)" },
      ],
    },
    {
      type: "air",
      label: "Air",
      sub: [
        { key: "express", label: "Express" },
        { key: "cargo", label: "General Cargo" },
      ],
    }
  ];

  const addRoute = () => {
    const newId = Math.max(...routes.map(r => r.id)) + 1;
    setRoutes([...routes, { 
      id: newId, 
      name: '', 
      location: '', 
      latitude: '', 
      longitude: '', 
      priority: 'medium' 
    }]);
  };

  const removeRoute = (id: number) => {
    if (routes.length > 2) {
      setRoutes(routes.filter(route => route.id !== id));
    }
  };

  const updateRoute = (id: number, field: string, value: string) => {
    setRoutes(routes.map(route => 
      route.id === id ? { ...route, [field]: value } : route
    ));
  };

  const optimizeRoute = async () => {
    setIsOptimizing(true);
    
    // Enhanced AI optimization simulation
    setTimeout(() => {
      const baseDistance = routes.length * 150 + Math.random() * 500;
      const baseTime = routes.length * 3 + Math.random() * 10;
      const baseFuel = baseDistance * 0.35;
      
      // Apply optimization adjustments
      let distanceMultiplier = 1;
      let timeMultiplier = 1;
      let fuelMultiplier = 1;
      
      if (optimizationGoal === 'distance') {
        distanceMultiplier = 0.85;
        timeMultiplier = 0.9;
        fuelMultiplier = 0.85;
      } else if (optimizationGoal === 'cost') {
        distanceMultiplier = 0.9;
        timeMultiplier = 0.95;
        fuelMultiplier = 0.8;
      } else {
        distanceMultiplier = 0.95;
        timeMultiplier = 0.8;
        fuelMultiplier = 0.9;
      }

      const optimizedDistance = baseDistance * distanceMultiplier;
      const optimizedTime = baseTime * timeMultiplier;
      const optimizedFuel = baseFuel * fuelMultiplier;

      const priorityRoutes = routes.filter(r => r.priority === 'high');
      const normalRoutes = routes.filter(r => r.priority === 'medium');
      const lowRoutes = routes.filter(r => r.priority === 'low');
      
      const orderedRoutes = [...priorityRoutes, ...normalRoutes, ...lowRoutes];

      const mockOptimized = {
        totalDistance: `${optimizedDistance.toFixed(0)} km`,
        estimatedTime: `${optimizedTime.toFixed(1)} hours`,
        fuelCost: `$${optimizedFuel.toFixed(0)}`,
        fuelConsumption: `${(optimizedFuel / 1.4).toFixed(0)}L`,
        carbonFootprint: `${(optimizedFuel * 0.002387).toFixed(2)} tons CO2`,
        costSavings: `$${(baseDistance * 0.15).toFixed(0)}`,
        timeSavings: `${((baseTime - optimizedTime) * 60).toFixed(0)} minutes`,
        routeEfficiency: `${((1 - distanceMultiplier) * 100).toFixed(1)}%`,
        optimizedOrder: orderedRoutes.map((route, index) => ({
          ...route,
          order: index + 1,
          estimatedArrival: new Date(Date.now() + (index + 1) * 4 * 60 * 60 * 1000).toLocaleDateString(),
          arrivalTime: `${8 + (index * 2)}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
          distanceFromPrevious: index === 0 ? '0 km' : `${(50 + Math.random() * 100).toFixed(0)} km`,
          drivingTime: index === 0 ? '0 min' : `${(30 + Math.random() * 90).toFixed(0)} min`
        })),
        alternatives: [
          {
            name: 'Shortest Distance',
            distance: `${(optimizedDistance * 0.9).toFixed(0)} km`,
            time: `${(optimizedTime * 1.1).toFixed(1)} hours`,
            cost: `$${(optimizedFuel * 0.95).toFixed(0)}`
          },
          {
            name: 'Fastest Time',
            distance: `${(optimizedDistance * 1.05).toFixed(0)} km`,
            time: `${(optimizedTime * 0.85).toFixed(1)} hours`,
            cost: `$${(optimizedFuel * 1.1).toFixed(0)}`
          }
        ]
      };
      
      setOptimizedRoute(mockOptimized);
      setIsOptimizing(false);
    }, 3000);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'low': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
  };

  return (
    <>
      <Header />
      <main className="pt-16">
        <div className="bg-white py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-12">
              <Map className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-gray-900">Smart Route Optimizer</h1>
              <p className="mt-4 text-lg text-gray-600">
                AI-powered route optimization with advanced cost analysis and sustainability metrics
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              <RouteOptimizerInputPanel
                routes={routes}
                viaStops={viaStops}
                routeType={routeType}
                routeSubType={routeSubType}
                vehicleType={vehicleType}
                optimizationGoal={optimizationGoal}
                isOptimizing={isOptimizing}
                updateRoute={updateRoute}
                removeRoute={removeRoute}
                addRoute={addRoute}
                setRoutes={setRoutes}
                addViaStop={addViaStop}
                removeViaStop={removeViaStop}
                setViaStops={setViaStops}
                aiSuggest={aiSuggest}
                setRouteType={setRouteType}
                setRouteSubType={setRouteSubType}
                setVehicleType={setVehicleType}
                setOptimizationGoal={setOptimizationGoal}
                routeTypeOptions={routeTypeOptions}
                optimizeRoute={optimizeRoute}
              />
              <RouteOptimizerResultsPanel
                optimizedRoute={optimizedRoute}
                isOptimizing={isOptimizing}
              />
            </div>
            {optimizedRoute && (
              <RouteOptimizerDetailsPanel
                optimizedRoute={optimizedRoute}
                getPriorityColor={getPriorityColor}
              />
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default RouteOptimizerPage;
