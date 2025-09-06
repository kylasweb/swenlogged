import React from "react";

interface RouteOptimizerDetailsPanelProps {
  optimizedRoute: any;
  getPriorityColor: (priority: string) => string;
}

const RouteOptimizerDetailsPanel: React.FC<RouteOptimizerDetailsPanelProps> = ({
  optimizedRoute,
  getPriorityColor
}) => {
  return (
    <div className="mt-8 bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Optimized Stop Sequence</h3>
      <div className="space-y-3">
        {optimizedRoute.optimizedOrder.map((stop: any, index: number) => (
          <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-md">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-medium mr-4">
                {stop.order}
              </div>
              <div>
                <div className="font-medium text-gray-800">{stop.name || `Stop ${stop.order}`}</div>
                <div className="text-sm text-gray-600">{stop.location}</div>
              </div>
              <div className={`ml-4 px-2 py-1 rounded-full text-xs border ${getPriorityColor(stop.priority)}`}>
                {stop.priority}
              </div>
            </div>
            <div className="text-right text-sm text-gray-600">
              <div className="font-medium">{stop.arrivalTime}</div>
              <div>{stop.estimatedArrival}</div>
              {index > 0 && (
                <div className="text-xs text-gray-500">
                  {stop.distanceFromPrevious} • {stop.drivingTime}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default RouteOptimizerDetailsPanel;
