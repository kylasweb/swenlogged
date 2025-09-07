import { useState, useEffect } from 'react';
import { puterService } from '../../utils/puterService';
import { extractJson, coerceArray, safeNumber } from '../../utils/aiJson';
import { routeOptimizationPrompt } from '../../utils/toolPrompts';
import AIBadge from '../../components/ui/AIBadge';

interface BaseStop {
  id: number;
  name: string;
  location: string;
  latitude: string;
  longitude: string;
  priority: string;
}

interface OptimizedStop extends BaseStop {
  order: number;
  estimatedArrival?: string;
  arrivalTime?: string;
  distanceFromPrevious?: string;
  drivingTime?: string;
  portOrAirport?: string;
}

interface RouteOptimizationAIResult {
  totalDistance?: string;
  estimatedTime?: string;
  fuelCost?: string;
  fuelConsumption?: string;
  carbonFootprint?: string;
  costSavings?: string;
  timeSavings?: string;
  routeEfficiency?: string;
  optimizedOrder?: OptimizedStop[];
  alternatives?: Array<{ name: string; distance: string; time: string; cost: string }>;
  error?: string;
  raw?: string;
}
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Map, Navigation, Clock, DollarSign, Fuel, Leaf, MapPin, Plus, Trash2 } from 'lucide-react';
import RouteStopInput from "../../components/tools/RouteStopInput";
import RouteOptimizerInputPanel from "../../components/tools/RouteOptimizerInputPanel";
import RouteOptimizerResultsPanel from "../../components/tools/RouteOptimizerResultsPanel";
import RouteOptimizerDetailsPanel from "../../components/tools/RouteOptimizerDetailsPanel";

const RouteOptimizerPage = () => {
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizedRoute, setOptimizedRoute] = useState<RouteOptimizationAIResult | null>(null);
  const [optimizationGoal, setOptimizationGoal] = useState('time');
  const [vehicleType, setVehicleType] = useState('truck');

  const [routes, setRoutes] = useState([
    { id: 1, name: '', location: '', latitude: '', longitude: '', priority: 'medium' },
    { id: 2, name: '', location: '', latitude: '', longitude: '', priority: 'medium' }
  ]);
  const [routeType, setRouteType] = useState("land");
  const [routeSubType, setRouteSubType] = useState("road");
  const [viaStops, setViaStops] = useState<BaseStop[]>([]);

  // Hydrate from cache
  useEffect(() => {
    try {
      const cached = localStorage.getItem('route-optimizer:last');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed.routes) setRoutes(parsed.routes);
        if (parsed.optimizedRoute) setOptimizedRoute(parsed.optimizedRoute);
        if (parsed.optimizationGoal) setOptimizationGoal(parsed.optimizationGoal);
        if (parsed.vehicleType) setVehicleType(parsed.vehicleType);
        if (parsed.routeType) setRouteType(parsed.routeType);
        if (parsed.routeSubType) setRouteSubType(parsed.routeSubType);
      }
    } catch {/* ignore */}
  }, []);

  // Simulated AI suggestion (real implementation would use Puter.js)
  const aiSuggest = async (type: string, _term: string, setValue: (v: string) => void) => {
    // You would use Puter.js here for intelligent suggestions!
    if (routeType === "air") setValue("LHR"); // Just an example AI picks Heathrow for air
    else if (routeType === "ocean") setValue("CNSHA"); // Shanghai for ocean
    else setValue("Detected Place");
  };

  const addViaStop = () => {
    const newId = viaStops.length > 0 ? Math.max(...viaStops.map(v => v.id)) + 1 : 1000;
    setViaStops([...viaStops, {
      id: newId,
      name: '',
      location: '',
      latitude: '',
      longitude: '',
      priority: 'medium'
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
    const newId = routes.length > 0 ? Math.max(...routes.map(r => r.id)) + 1 : 1000;
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
    try {
      await puterService.ensureReady(4000);
      const prompt = routeOptimizationPrompt({
        optimizationGoal,
        routeType,
        routeSubType,
        vehicleType,
        routes: routes.map(r => ({ id: r.id, name: r.name, priority: r.priority }))
      });

      const aiResp = await puterService.makeAIRequest(prompt, { temperature: 0.2, maxTokens: 900 });
  const text = typeof aiResp === 'string' ? aiResp : (aiResp as { text?: string }).text || '';
  const json = extractJson<RouteOptimizationAIResult>(text);
      if (json) {
        // minimal validation & normalization
  const ordered = coerceArray<OptimizedStop>(json.optimizedOrder).map((o, index: number) => ({
          ...o,
          order: safeNumber(o.order, index + 1)
        }));
        const finalResult = { ...json, optimizedOrder: ordered };
        setOptimizedRoute(finalResult);
        try {
          localStorage.setItem('route-optimizer:last', JSON.stringify({
            routes,
            optimizedRoute: finalResult,
            optimizationGoal,
            vehicleType,
            routeType,
            routeSubType
          }));
        } catch {/* ignore */}
      } else {
        setOptimizedRoute({ error: 'Could not parse AI response', raw: text });
      }
    } catch (err) {
      console.error('Route optimization AI error', err);
      setOptimizedRoute({ error: 'AI optimization failed. Please retry.' });
    } finally {
      setIsOptimizing(false);
    }
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
              <div className="flex items-center justify-center gap-3">
                <h1 className="text-3xl font-bold text-gray-900">Smart Route Optimizer</h1>
                <AIBadge />
              </div>
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
