import React from "react";
import { Map, Navigation, Clock, DollarSign, Leaf } from "lucide-react";

interface RouteOptimizerResultsPanelProps {
  optimizedRoute: any;
  isOptimizing: boolean;
}

const RouteOptimizerResultsPanel: React.FC<RouteOptimizerResultsPanelProps> = ({
  optimizedRoute,
  isOptimizing,
}) => {
  return (
    <div className="space-y-6">
      {optimizedRoute && (
        <>
          {/* Key Metrics */}
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
              <Navigation className="h-6 w-6 text-blue-600 mx-auto mb-1" />
              <div className="text-lg font-semibold text-blue-800">{optimizedRoute.totalDistance}</div>
              <div className="text-xs text-blue-600">Total Distance</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
              <Clock className="h-6 w-6 text-green-600 mx-auto mb-1" />
              <div className="text-lg font-semibold text-green-800">{optimizedRoute.estimatedTime}</div>
              <div className="text-xs text-green-600">Travel Time</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <DollarSign className="h-6 w-6 text-yellow-600 mx-auto mb-1" />
              <div className="text-lg font-semibold text-yellow-800">{optimizedRoute.fuelCost}</div>
              <div className="text-xs text-yellow-600">Fuel Cost</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
              <Leaf className="h-6 w-6 text-purple-600 mx-auto mb-1" />
              <div className="text-lg font-semibold text-purple-800">{optimizedRoute.carbonFootprint}</div>
              <div className="text-xs text-purple-600">CO2 Emissions</div>
            </div>
          </div>

          {/* Savings Summary */}
          <div className="bg-gradient-to-r from-green-500 to-teal-600 text-white p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Optimization Results</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="font-medium">Cost Savings</div>
                <div className="text-green-100">{optimizedRoute.costSavings}</div>
              </div>
              <div>
                <div className="font-medium">Time Saved</div>
                <div className="text-green-100">{optimizedRoute.timeSavings}</div>
              </div>
            </div>
            <div className="mt-2">
              <div className="font-medium">Route Efficiency</div>
              <div className="text-green-100">{optimizedRoute.routeEfficiency} improvement</div>
            </div>
          </div>

          {/* Alternative Routes */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h4 className="font-semibold text-gray-800 mb-3">Alternative Routes</h4>
            <div className="space-y-2">
              {optimizedRoute.alternatives.map((alt: any, index: number) => (
                <div key={index} className="p-3 bg-gray-50 rounded-md">
                  <div className="font-medium text-gray-800 mb-1">{alt.name}</div>
                  <div className="grid grid-cols-3 gap-2 text-xs text-gray-600">
                    <div>{alt.distance}</div>
                    <div>{alt.time}</div>
                    <div>{alt.cost}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {!optimizedRoute && (
        <div className="bg-gray-100 rounded-lg p-8 text-center">
          <Map className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-2">Configure your route stops</p>
          <p className="text-sm text-gray-500">Add locations and click optimize to see AI-powered route suggestions</p>
        </div>
      )}
    </div>
  );
};

export default RouteOptimizerResultsPanel;
