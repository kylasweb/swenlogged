import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Search, Ship, Truck, Plane, Clock, DollarSign, Info } from "lucide-react";
import { toast } from "sonner";

interface Port {
  id: string;
  name: string;
  country: string;
  countryCode: string;
  coordinates: [number, number];
  type: 'sea' | 'air' | 'inland';
  facilities: string[];
  services: string[];
  capacity: {
    annualTEU?: number;
    annualTons?: number;
    berths: number;
  };
  connectivity: {
    rail: boolean;
    road: boolean;
    air: boolean;
  };
  operatingHours: string;
  contactInfo: {
    phone?: string;
    email?: string;
    website?: string;
  };
  restrictions?: string[];
  fees?: {
    basic: number;
    additional: string;
  };
}

const PortLocatorMap = () => {
  const [selectedPort, setSelectedPort] = useState<Port | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedType, setSelectedType] = useState<'all' | 'sea' | 'air' | 'inland'>('all');
  const [activeTab, setActiveTab] = useState('map');

  // Mock ports data
  const ports: Port[] = [
    {
      id: 'los-angeles',
      name: 'Port of Los Angeles',
      country: 'United States',
      countryCode: 'US',
      coordinates: [33.7380, -118.2610],
      type: 'sea',
      facilities: ['Container Terminal', 'Bulk Terminal', 'RoRo Terminal'],
      services: ['Customs Clearance', 'Warehousing', 'Consolidation'],
      capacity: {
        annualTEU: 9500000,
        berths: 26
      },
      connectivity: {
        rail: true,
        road: true,
        air: true
      },
      operatingHours: '24/7',
      contactInfo: {
        phone: '+1-310-732-3500',
        website: 'portoflosangeles.org'
      },
      fees: {
        basic: 500,
        additional: 'Varies by service'
      }
    },
    {
      id: 'shanghai',
      name: 'Port of Shanghai',
      country: 'China',
      countryCode: 'CN',
      coordinates: [31.2304, 121.4737],
      type: 'sea',
      facilities: ['Container Terminal', 'Bulk Terminal', 'Passenger Terminal'],
      services: ['Customs Clearance', 'Warehousing', 'Transshipment'],
      capacity: {
        annualTEU: 43000000,
        berths: 150
      },
      connectivity: {
        rail: true,
        road: true,
        air: true
      },
      operatingHours: '24/7',
      contactInfo: {
        phone: '+86-21-1234-5678',
        website: 'portshanghai.com.cn'
      }
    },
    {
      id: 'singapore',
      name: 'Port of Singapore',
      country: 'Singapore',
      countryCode: 'SG',
      coordinates: [1.2905, 103.8467],
      type: 'sea',
      facilities: ['Container Terminal', 'Bulk Terminal', 'Chemical Terminal'],
      services: ['Customs Clearance', 'Warehousing', 'Bunkering'],
      capacity: {
        annualTEU: 37000000,
        berths: 70
      },
      connectivity: {
        rail: false,
        road: true,
        air: true
      },
      operatingHours: '24/7',
      contactInfo: {
        phone: '+65-6275-0200',
        website: 'mpa.gov.sg'
      }
    },
    {
      id: 'rotterdam',
      name: 'Port of Rotterdam',
      country: 'Netherlands',
      countryCode: 'NL',
      coordinates: [51.9225, 4.4792],
      type: 'sea',
      facilities: ['Container Terminal', 'Bulk Terminal', 'Liquid Terminal'],
      services: ['Customs Clearance', 'Warehousing', 'Inland Transport'],
      capacity: {
        annualTEU: 15000000,
        berths: 80
      },
      connectivity: {
        rail: true,
        road: true,
        air: true
      },
      operatingHours: '24/7',
      contactInfo: {
        phone: '+31-10-252-2000',
        website: 'porthrotterdam.com'
      }
    },
    {
      id: 'jfk-airport',
      name: 'John F. Kennedy International Airport',
      country: 'United States',
      countryCode: 'US',
      coordinates: [40.6413, -73.7781],
      type: 'air',
      facilities: ['Cargo Terminal', 'Perishable Center', 'Express Facilities'],
      services: ['Customs Clearance', 'Security Screening', 'Temperature Control'],
      capacity: {
        annualTons: 1500000,
        berths: 0
      },
      connectivity: {
        rail: false,
        road: true,
        air: true
      },
      operatingHours: '24/7',
      contactInfo: {
        phone: '+1-718-244-4444',
        website: 'jfkairport.com'
      }
    },
    {
      id: 'hong-kong-airport',
      name: 'Hong Kong International Airport',
      country: 'Hong Kong',
      countryCode: 'HK',
      coordinates: [22.3080, 113.9185],
      type: 'air',
      facilities: ['Cargo Terminal', 'Express Center', 'Pharma Facilities'],
      services: ['Customs Clearance', 'Security Screening', '24/7 Operations'],
      capacity: {
        annualTons: 5200000,
        berths: 0
      },
      connectivity: {
        rail: true,
        road: true,
        air: true
      },
      operatingHours: '24/7',
      contactInfo: {
        phone: '+852-2181-8888',
        website: 'hkairport.com'
      }
    },
    {
      id: 'inland-port-chicago',
      name: 'Inland Port Chicago',
      country: 'United States',
      countryCode: 'US',
      coordinates: [41.8781, -87.6298],
      type: 'inland',
      facilities: ['Rail Terminal', 'Truck Terminal', 'Distribution Center'],
      services: ['Cross-docking', 'Warehousing', 'Consolidation'],
      capacity: {
        annualTons: 2000000,
        berths: 0
      },
      connectivity: {
        rail: true,
        road: true,
        air: false
      },
      operatingHours: '24/7',
      contactInfo: {
        phone: '+1-312-555-0123',
        website: 'inlandportchicago.com'
      }
    }
  ];

  const countries = [
    { code: 'US', name: 'United States', flag: '🇺🇸' },
    { code: 'CN', name: 'China', flag: '🇨🇳' },
    { code: 'SG', name: 'Singapore', flag: '🇸🇬' },
    { code: 'NL', name: 'Netherlands', flag: '🇳🇱' },
    { code: 'HK', name: 'Hong Kong', flag: '🇭🇰' },
    { code: 'DE', name: 'Germany', flag: '🇩🇪' },
    { code: 'JP', name: 'Japan', flag: '🇯🇵' },
    { code: 'KR', name: 'South Korea', flag: '🇰🇷' },
    { code: 'AE', name: 'UAE', flag: '🇦🇪' },
    { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' }
  ];

  const filteredPorts = ports.filter(port => {
    const matchesSearch = !searchTerm ||
      port.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      port.country.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCountry = !selectedCountry || port.countryCode === selectedCountry;
    const matchesType = selectedType === 'all' || port.type === selectedType;

    return matchesSearch && matchesCountry && matchesType;
  });

  const getPortIcon = (type: string) => {
    switch (type) {
      case 'sea': return <Ship className="h-5 w-5" />;
      case 'air': return <Plane className="h-5 w-5" />;
      case 'inland': return <Truck className="h-5 w-5" />;
      default: return <MapPin className="h-5 w-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'sea': return 'bg-blue-100 text-blue-800';
      case 'air': return 'bg-purple-100 text-purple-800';
      case 'inland': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCapacity = (port: Port) => {
    if (port.capacity.annualTEU) {
      return `${port.capacity.annualTEU.toLocaleString()} TEU/year`;
    }
    if (port.capacity.annualTons) {
      return `${port.capacity.annualTons.toLocaleString()} tons/year`;
    }
    return `${port.capacity.berths} berths`;
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2">
          <MapPin className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">Port Locator Map</h1>
        </div>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Find and explore major ports worldwide. Get detailed information about
          facilities, services, capacity, and connectivity for your shipping needs.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="map">Interactive Map</TabsTrigger>
          <TabsTrigger value="list">Port Directory</TabsTrigger>
          <TabsTrigger value="details">Port Details</TabsTrigger>
        </TabsList>

        <TabsContent value="map" className="space-y-6">
          {/* Map Placeholder */}
          <Card>
            <CardHeader>
              <CardTitle>World Ports Map</CardTitle>
              <CardDescription>
                Interactive map showing major ports and their locations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-lg p-8 text-center">
                <MapPin className="h-16 w-16 mx-auto mb-4 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Interactive World Map</h3>
                <p className="text-gray-600 mb-4">
                  Click on ports to view details, or use the filters below to find specific locations.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  {filteredPorts.slice(0, 8).map((port) => (
                    <button
                      key={port.id}
                      onClick={() => setSelectedPort(port)}
                      className="p-3 bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        {getPortIcon(port.type)}
                        <span className="font-medium">{port.name.split(' ')[0]}</span>
                      </div>
                      <div className="text-xs text-gray-600">{port.country}</div>
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Map Controls */}
          <Card>
            <CardHeader>
              <CardTitle>Map Controls</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="search">Search Ports</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="search"
                      placeholder="Port name or country"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                    <SelectTrigger>
                      <SelectValue placeholder="All countries" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All countries</SelectItem>
                      {countries.map((country) => (
                        <SelectItem key={country.code} value={country.code}>
                          <div className="flex items-center gap-2">
                            <span>{country.flag}</span>
                            <span>{country.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">Port Type</Label>
                  <Select value={selectedType} onValueChange={(value: 'all' | 'sea' | 'air' | 'inland') => setSelectedType(value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="All types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All types</SelectItem>
                      <SelectItem value="sea">Sea Ports</SelectItem>
                      <SelectItem value="air">Air Ports</SelectItem>
                      <SelectItem value="inland">Inland Ports</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Quick Actions</Label>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      Reset Filters
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="list" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle>Filter Ports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search ports..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                  <SelectTrigger>
                    <SelectValue placeholder="All countries" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All countries</SelectItem>
                    {countries.map((country) => (
                      <SelectItem key={country.code} value={country.code}>
                        <div className="flex items-center gap-2">
                          <span>{country.flag}</span>
                          <span>{country.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedType} onValueChange={(value: 'all' | 'sea' | 'air' | 'inland') => setSelectedType(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="All types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All types</SelectItem>
                    <SelectItem value="sea">Sea Ports</SelectItem>
                    <SelectItem value="air">Air Ports</SelectItem>
                    <SelectItem value="inland">Inland Ports</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Port List */}
          <div className="grid md:grid-cols-2 gap-4">
            {filteredPorts.map((port) => (
              <Card key={port.id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setSelectedPort(port)}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      {getPortIcon(port.type)}
                      <div>
                        <CardTitle className="text-lg">{port.name}</CardTitle>
                        <CardDescription>{port.country}</CardDescription>
                      </div>
                    </div>
                    <Badge className={getTypeColor(port.type)}>
                      {port.type}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Capacity:</span>
                      <span className="font-medium">{formatCapacity(port)}</span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Operating Hours:</span>
                      <span className="font-medium">{port.operatingHours}</span>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {port.facilities.slice(0, 2).map((facility, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {facility}
                        </Badge>
                      ))}
                      {port.facilities.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{port.facilities.length - 2} more
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        {port.connectivity.rail && <span>🚂</span>}
                        {port.connectivity.road && <span>🚛</span>}
                        {port.connectivity.air && <span>✈️</span>}
                      </div>
                      <span>Connectivity available</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredPorts.length === 0 && (
            <div className="text-center py-12">
              <MapPin className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No ports found</h3>
              <p className="text-gray-600">Try adjusting your search criteria</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="details" className="space-y-6">
          {selectedPort ? (
            <>
              {/* Port Header */}
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      {getPortIcon(selectedPort.type)}
                      <div>
                        <CardTitle className="text-2xl">{selectedPort.name}</CardTitle>
                        <CardDescription className="text-lg">
                          {selectedPort.country} • {selectedPort.type} port
                        </CardDescription>
                      </div>
                    </div>
                    <Badge className={`${getTypeColor(selectedPort.type)} text-lg px-3 py-1`}>
                      {selectedPort.type.toUpperCase()}
                    </Badge>
                  </div>
                </CardHeader>
              </Card>

              {/* Port Information */}
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Capacity & Operations</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Annual Capacity:</span>
                      <span className="font-medium">{formatCapacity(selectedPort)}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-600">Berths/Terminals:</span>
                      <span className="font-medium">{selectedPort.capacity.berths || 'N/A'}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-600">Operating Hours:</span>
                      <span className="font-medium">{selectedPort.operatingHours}</span>
                    </div>

                    {selectedPort.fees && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Basic Fees:</span>
                        <span className="font-medium">${selectedPort.fees.basic}</span>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Connectivity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${selectedPort.connectivity.rail ? 'bg-green-500' : 'bg-gray-300'}`} />
                        <span>Rail Connection</span>
                        {selectedPort.connectivity.rail && <Badge className="bg-green-100 text-green-800">Available</Badge>}
                      </div>

                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${selectedPort.connectivity.road ? 'bg-green-500' : 'bg-gray-300'}`} />
                        <span>Road Access</span>
                        {selectedPort.connectivity.road && <Badge className="bg-green-100 text-green-800">Available</Badge>}
                      </div>

                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${selectedPort.connectivity.air ? 'bg-green-500' : 'bg-gray-300'}`} />
                        <span>Air Connection</span>
                        {selectedPort.connectivity.air && <Badge className="bg-green-100 text-green-800">Available</Badge>}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Facilities & Services */}
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Facilities</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {selectedPort.facilities.map((facility, index) => (
                        <Badge key={index} variant="outline">
                          {facility}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Services</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {selectedPort.services.map((service, index) => (
                        <Badge key={index} className="bg-blue-100 text-blue-800">
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    {selectedPort.contactInfo.phone && (
                      <div>
                        <span className="text-gray-600">Phone:</span>
                        <div className="font-medium">{selectedPort.contactInfo.phone}</div>
                      </div>
                    )}

                    {selectedPort.contactInfo.email && (
                      <div>
                        <span className="text-gray-600">Email:</span>
                        <div className="font-medium">{selectedPort.contactInfo.email}</div>
                      </div>
                    )}

                    {selectedPort.contactInfo.website && (
                      <div>
                        <span className="text-gray-600">Website:</span>
                        <div className="font-medium">
                          <a href={`https://${selectedPort.contactInfo.website}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                            {selectedPort.contactInfo.website}
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Restrictions */}
              {selectedPort.restrictions && (
                <Card className="border-yellow-200 bg-yellow-50">
                  <CardHeader>
                    <CardTitle className="text-yellow-900">Important Restrictions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc list-inside space-y-1 text-yellow-800">
                      {selectedPort.restrictions.map((restriction, index) => (
                        <li key={index}>{restriction}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <MapPin className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Port</h3>
              <p className="text-gray-600">Choose a port from the map or directory to view detailed information</p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <Ship className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{ports.filter(p => p.type === 'sea').length}</div>
            <div className="text-sm text-gray-600">Sea Ports</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <Plane className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{ports.filter(p => p.type === 'air').length}</div>
            <div className="text-sm text-gray-600">Air Ports</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <Truck className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{ports.filter(p => p.type === 'inland').length}</div>
            <div className="text-sm text-gray-600">Inland Ports</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <MapPin className="h-8 w-8 text-orange-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{countries.length}</div>
            <div className="text-sm text-gray-600">Countries</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PortLocatorMap;
