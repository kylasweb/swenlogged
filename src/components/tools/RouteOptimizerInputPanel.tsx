import RouteStopInput from "./RouteStopInput";
import { MapPin, Trash2, Navigation } from "lucide-react";
import React from "react";

interface StopType {
  id: number;
  name: string;
  location: string;
  latitude: string;
  longitude: string;
  priority: string;
  portOrAirport?: string;
}

interface RouteOptimizerInputPanelProps {
  routes: StopType[];
  viaStops: StopType[];
  routeType: string;
  routeSubType: string;
  vehicleType: string;
  optimizationGoal: string;
  isOptimizing: boolean;
  updateRoute: (id: number, field: string, value: string) => void;
  removeRoute: (id: number) => void;
  addRoute: () => void;
  setRoutes: any;
  addViaStop: () => void;
  removeViaStop: (id: number) => void;
  setViaStops: any;
  aiSuggest: (type: string, term: string, setValue: (v: string) => void) => void;
  setRouteType: (v: string) => void;
  setRouteSubType: (v: string) => void;
  setVehicleType: (v: string) => void;
  setOptimizationGoal: (v: string) => void;
  routeTypeOptions: {
    type: string;
    label: string;
    sub: { key: string; label: string }[];
  }[];
  optimizeRoute: () => void;
}

const RouteOptimizerInputPanel: React.FC<RouteOptimizerInputPanelProps> = ({
  routes,
  viaStops,
  routeType,
  routeSubType,
  vehicleType,
  optimizationGoal,
  isOptimizing,
  updateRoute,
  removeRoute,
  addRoute,
  addViaStop,
  removeViaStop,
  setRoutes,
  setViaStops,
  aiSuggest,
  setRouteType,
  setRouteSubType,
  setVehicleType,
  setOptimizationGoal,
  routeTypeOptions,
  optimizeRoute,
}) => {
  return (
    <div className="lg:col-span-2 bg-gray-50 rounded-lg p-8">
      {/* ROUTING TYPE SELECTION */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Route Type</label>
        <div className="flex gap-3 mb-4">
          {routeTypeOptions.map(rt => (
            <button
              key={rt.type}
              onClick={() => {
                setRouteType(rt.type);
                setRouteSubType(rt.sub[0].key);
              }}
              className={`px-3 py-1 rounded ${routeType === rt.type
                ? "bg-blue-600 text-white"
                : "bg-white border text-blue-600"
                }`}
            >
              {rt.label}
            </button>
          ))}
        </div>
        <div className="mb-2">
          <label className="block text-xs font-medium text-gray-600">Subcategory</label>
          <select
            value={routeSubType}
            onChange={e => setRouteSubType(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
          >
            {routeTypeOptions.find(rt => rt.type === routeType)?.sub.map(sub => (
              <option key={sub.key} value={sub.key}>{sub.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mb-4">
        {/* Start+End Points */}
        {routes.map((route, idx) => (
          <RouteStopInput
            key={route.id}
            stop={route}
            index={idx}
            total={routes.length}
            onChange={updateRoute}
            canRemove={routes.length > 2}
            onRemove={removeRoute}
            type={routeType}
            subcategory={routeSubType}
            showPolPod
            aiSuggest={aiSuggest}
          />
        ))}
        {/* VIA Stops */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm text-gray-700 font-medium">Via Stops</span>
            <button className="text-xs text-blue-600 hover:underline" type="button" onClick={addViaStop}>Add Via Stop</button>
          </div>
          {viaStops.map((stop, idx) => (
            <RouteStopInput
              key={stop.id}
              stop={stop}
              index={idx + 1}
              total={viaStops.length + 2}
              onChange={(id, field, value) => {
                setViaStops(viaStops.map(s => s.id === id ? { ...s, [field]: value } : s));
              }}
              canRemove
              onRemove={removeViaStop}
              type={routeType}
              subcategory={routeSubType}
              isVia
              aiSuggest={aiSuggest}
            />
          ))}
        </div>
      </div>

      {/* Vehicle & Optimization Settings */}
      <div className="grid md:grid-cols-2 gap-4 mb-6 p-4 bg-white rounded-lg border">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Vehicle Type
          </label>
          <select
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
          >
            <option value="truck">🚛 Standard Truck</option>
            <option value="van">🚐 Delivery Van</option>
            <option value="motorcycle">🏍️ Motorcycle</option>
            <option value="bicycle">🚲 Bicycle</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Optimize For
          </label>
          <select
            value={optimizationGoal}
            onChange={(e) => setOptimizationGoal(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
          >
            <option value="time">⏱️ Fastest Time</option>
            <option value="distance">📏 Shortest Distance</option>
            <option value="cost">💰 Lowest Cost</option>
            <option value="eco">🌱 Most Eco-Friendly</option>
          </select>
        </div>
      </div>

      {/* Route Destinations */}
      <div className="space-y-4">
        {routes.map((route, index) => (
          <div key={route.id} className="p-4 bg-white rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                <span className="font-medium text-gray-700">
                  {index === 0 ? 'Starting Point' : `Stop ${index}`}
                </span>
              </div>
              {routes.length > 2 && (
                <button
                  onClick={() => removeRoute(route.id)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-3 mb-3">
              <input
                type="text"
                placeholder="Location name"
                value={route.name}
                onChange={(e) => updateRoute(route.id, 'name', e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
              />
              <input
                type="text"
                placeholder="Address or coordinates"
                value={route.location}
                onChange={(e) => updateRoute(route.id, 'location', e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div className="grid md:grid-cols-3 gap-3">
              <input
                type="text"
                placeholder="Latitude"
                value={route.latitude}
                onChange={(e) => updateRoute(route.id, 'latitude', e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 text-sm"
              />
              <input
                type="text"
                placeholder="Longitude"
                value={route.longitude}
                onChange={(e) => updateRoute(route.id, 'longitude', e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 text-sm"
              />
              <select
                value={route.priority}
                onChange={(e) => updateRoute(route.id, 'priority', e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 text-sm"
              >
                <option value="high">High Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="low">Low Priority</option>
              </select>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={optimizeRoute}
        disabled={isOptimizing || routes.length < 2 || !routes.every(r => r.name && r.location)}
        className="w-full mt-6 px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
      >
        {isOptimizing ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
            AI Optimizing Route...
          </>
        ) : (
          <>
            <Navigation className="h-5 w-5 mr-2" />
            Optimize Route with AI
          </>
        )}
      </button>
    </div>
  );
};

export default RouteOptimizerInputPanel;
