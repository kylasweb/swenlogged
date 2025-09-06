
import { useState } from "react";
import { Bot } from "lucide-react";

interface RouteStopInputProps {
  stop: any;
  index: number;
  total: number;
  onChange: (id: number, field: string, value: string) => void;
  onRemove?: (id: number) => void;
  canRemove?: boolean;
  type: string;
  subcategory: string;
  showPolPod?: boolean;
  isVia?: boolean;
  aiSuggest?: (type: string, term: string, setValue: (v: string) => void) => void;
}

const subcategoryLabels: Record<string, Record<string, string>> = {
  land: { road: "Road", rail: "Rail" },
  ocean: { fcl: "Full Container (FCL)", lcl: "Less Container (LCL)" },
  air: { express: "Express", cargo: "General Cargo" },
};

const airportData = [
  // Minimal, mock data for now. Ideally you'd get AI-suggested.
  { name: "Los Angeles International", code: "LAX" },
  { name: "London Heathrow", code: "LHR" },
  { name: "Frankfurt Main", code: "FRA" },
  { name: "Singapore Changi", code: "SIN" },
];

const portData = [
  { name: "Port of Shanghai", code: "CNSHA" },
  { name: "Port of Rotterdam", code: "NLRTM" },
  { name: "Port of Los Angeles", code: "USLAX" },
];

const RouteStopInput = ({
  stop,
  index,
  total,
  onChange,
  onRemove,
  canRemove,
  type,
  subcategory,
  showPolPod,
  isVia,
  aiSuggest,
}: RouteStopInputProps) => {
  const [aiLoading, setAiLoading] = useState(false);

  // Helpers for POL/POD/airport fields
  const showAirport = type === "air";
  const showPort = type === "ocean";

  // Could be extended for deeper AI enrichment
  const suggestField = async (fieldKey: string) => {
    if (!aiSuggest) return;
    setAiLoading(true);
    await aiSuggest(
      fieldKey,
      stop[fieldKey] || "",
      (val: string) => onChange(stop.id, fieldKey, val)
    );
    setAiLoading(false);
  };

  return (
    <div className={`p-4 bg-white rounded-lg border border-gray-200 mb-2`}>
      <div className="flex items-center justify-between mb-2">
        <span className="font-medium text-gray-700 capitalize">
          {isVia ? `Via Stop ${index}` : index === 0 ? "Starting Point (POL)" : total - 1 === index ? "End Point (POD)" : `Stop ${index}`}
        </span>
        {canRemove && onRemove && (
          <button
            className="text-red-500 text-xs hover:underline"
            onClick={() => onRemove(stop.id)}
            type="button"
          >
            Remove
          </button>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-3 mb-2">
        <input
          type="text"
          placeholder="Location name"
          value={stop.name}
          onChange={e => onChange(stop.id, "name", e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
        />
        <input
          type="text"
          placeholder="Address / coordinates"
          value={stop.location}
          onChange={e => onChange(stop.id, "location", e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
        />
      </div>

      {showPolPod && (showAirport || showPort) && (
        <div className="grid md:grid-cols-2 gap-3 mb-2">
          <select
            value={stop.portOrAirport || ""}
            onChange={e => onChange(stop.id, "portOrAirport", e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
          >
            <option value="">Select {showAirport ? "Airport" : "Port"}</option>
            {(showAirport ? airportData : portData).map((a) => (
              <option key={a.code} value={a.code}>{a.name} ({a.code})</option>
            ))}
          </select>
          {aiSuggest && (
            <button
              className="flex items-center gap-2 px-3 py-2 bg-blue-100 text-blue-800 rounded hover:bg-blue-200"
              type="button"
              disabled={aiLoading}
              onClick={() => suggestField("portOrAirport")}
            >
              <Bot className="h-4 w-4" /> AI Suggest {showAirport ? "Airport" : "Port"}
            </button>
          )}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-3 mb-2">
        <input
          type="text"
          placeholder="Latitude"
          value={stop.latitude}
          onChange={e => onChange(stop.id, "latitude", e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 text-sm"
        />
        <input
          type="text"
          placeholder="Longitude"
          value={stop.longitude}
          onChange={e => onChange(stop.id, "longitude", e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 text-sm"
        />
      </div>
      <div className="md:flex items-center gap-4">
        <select
          value={stop.priority}
          onChange={e => onChange(stop.id, "priority", e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 text-sm mb-2 md:mb-0"
        >
          <option value="high">High Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="low">Low Priority</option>
        </select>
        {subcategory && (
          <span className="text-xs px-2 py-1 bg-gray-100 rounded ml-2 inline-block">
            {subcategoryLabels[type]?.[subcategory] ?? ""}
          </span>
        )}
      </div>
    </div>
  );
};

export default RouteStopInput;
