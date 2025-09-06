import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Ship, Anchor, Search, MapPin, Clock, Users } from "lucide-react";

const MarineTrafficPage = () => {
  const [vessels, setVessels] = useState([
    {
      id: 1,
      name: "MAERSK EDINBURGH",
      type: "Container Ship",
      imo: "9632179",
      flag: "Denmark",
      status: "Under way using engine",
      speed: "18.2 knots",
      course: "045°",
      destination: "Hamburg",
      eta: "2024-01-25 14:30",
      lat: 51.5074,
      lng: 0.1278,
      cargo: "General Cargo"
    },
    {
      id: 2,
      name: "COSCO SHIPPING GALAXY",
      type: "Container Ship", 
      imo: "9795478",
      flag: "Hong Kong",
      status: "At anchor",
      speed: "0 knots",
      course: "180°",
      destination: "Singapore",
      eta: "2024-01-26 08:15",
      lat: 1.3521,
      lng: 103.8198,
      cargo: "Containers"
    },
    {
      id: 3,
      name: "ATLANTIC CONVEYOR",
      type: "Bulk Carrier",
      imo: "9456123",
      flag: "Liberia",
      status: "Under way using engine",
      speed: "14.5 knots",
      course: "270°",
      destination: "Rotterdam",
      eta: "2024-01-27 12:00",
      lat: 52.3676,
      lng: 4.9041,
      cargo: "Iron Ore"
    }
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVessel, setSelectedVessel] = useState<any>(null);

  const filteredVessels = vessels.filter(vessel =>
    vessel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vessel.imo.includes(searchTerm) ||
    vessel.destination.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'under way using engine':
        return 'bg-green-100 text-green-800';
      case 'at anchor':
        return 'bg-yellow-100 text-yellow-800';
      case 'moored':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    return Ship; // In a real app, you'd have different icons for different vessel types
  };

  return (
    <>
      <Header />
      <main className="pt-16">
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center mb-12">
              <Ship className="h-16 w-16 text-blue-600 mx-auto mb-6" />
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-4">
                Marine Traffic Tracker
              </h1>
              <p className="text-lg leading-8 text-gray-600">
                Real-time vessel tracking and port information
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Search className="h-5 w-5" />
                      Vessel Search
                    </CardTitle>
                    <CardDescription>
                      Search by vessel name, IMO number, or destination
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-4 mb-6">
                      <Input
                        placeholder="Search vessels..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="flex-1"
                      />
                      <Button variant="outline">
                        <Search className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="space-y-4">
                      {filteredVessels.map((vessel) => {
                        const TypeIcon = getTypeIcon(vessel.type);
                        return (
                          <div
                            key={vessel.id}
                            className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                              selectedVessel?.id === vessel.id
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                            onClick={() => setSelectedVessel(vessel)}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-100 rounded-lg">
                                  <TypeIcon className="h-5 w-5 text-blue-600" />
                                </div>
                                <div>
                                  <h3 className="font-semibold">{vessel.name}</h3>
                                  <p className="text-sm text-gray-600">
                                    {vessel.type} • IMO: {vessel.imo}
                                  </p>
                                </div>
                              </div>
                              <Badge className={getStatusColor(vessel.status)}>
                                {vessel.status}
                              </Badge>
                            </div>
                            
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                              <div>
                                <span className="text-gray-500">Speed:</span>
                                <p className="font-medium">{vessel.speed}</p>
                              </div>
                              <div>
                                <span className="text-gray-500">Course:</span>
                                <p className="font-medium">{vessel.course}</p>
                              </div>
                              <div>
                                <span className="text-gray-500">Destination:</span>
                                <p className="font-medium">{vessel.destination}</p>
                              </div>
                              <div>
                                <span className="text-gray-500">ETA:</span>
                                <p className="font-medium">{vessel.eta}</p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Vessel Details</CardTitle>
                    <CardDescription>
                      Detailed information about selected vessel
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {selectedVessel ? (
                      <div className="space-y-6">
                        <div className="text-center">
                          <div className="p-4 bg-blue-100 rounded-lg mb-4">
                            <Ship className="h-8 w-8 text-blue-600 mx-auto" />
                          </div>
                          <h3 className="text-lg font-semibold">{selectedVessel.name}</h3>
                          <p className="text-sm text-gray-600">{selectedVessel.type}</p>
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <Anchor className="h-4 w-4 text-gray-400" />
                            <div>
                              <p className="text-sm text-gray-500">IMO Number</p>
                              <p className="font-medium">{selectedVessel.imo}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <Users className="h-4 w-4 text-gray-400" />
                            <div>
                              <p className="text-sm text-gray-500">Flag State</p>
                              <p className="font-medium">{selectedVessel.flag}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <MapPin className="h-4 w-4 text-gray-400" />
                            <div>
                              <p className="text-sm text-gray-500">Current Position</p>
                              <p className="font-medium">
                                {selectedVessel.lat.toFixed(4)}°, {selectedVessel.lng.toFixed(4)}°
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <Clock className="h-4 w-4 text-gray-400" />
                            <div>
                              <p className="text-sm text-gray-500">Estimated Arrival</p>
                              <p className="font-medium">{selectedVessel.eta}</p>
                            </div>
                          </div>
                        </div>

                        <div className="border-t pt-4">
                          <Badge className={getStatusColor(selectedVessel.status)}>
                            {selectedVessel.status}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-center">
                          <div className="p-3 bg-gray-50 rounded-lg">
                            <p className="text-lg font-bold text-gray-900">{selectedVessel.speed}</p>
                            <p className="text-xs text-gray-600">Current Speed</p>
                          </div>
                          <div className="p-3 bg-gray-50 rounded-lg">
                            <p className="text-lg font-bold text-gray-900">{selectedVessel.course}</p>
                            <p className="text-xs text-gray-600">Course</p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-12 text-gray-500">
                        <Ship className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                        <p>Select a vessel to view details</p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Port Statistics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Vessels in Port:</span>
                        <span className="font-semibold">127</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Arriving Today:</span>
                        <span className="font-semibold">23</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Departing Today:</span>
                        <span className="font-semibold">19</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">At Anchor:</span>
                        <span className="font-semibold">45</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default MarineTrafficPage;