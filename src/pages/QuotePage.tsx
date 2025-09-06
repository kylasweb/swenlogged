import Header from '../components/Header';
import Footer from '../components/Footer';
import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { CheckCircle, Calculator, Truck, Globe } from 'lucide-react';

const QuotePage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    origin: '',
    destination: '',
    weight: '',
    dimensions: '',
    cargoType: '',
    shipDate: '',
    urgency: '',
    additionalServices: [],
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Quote request submitted:', formData);
    alert('Quote request submitted successfully! We will contact you within 24 hours.');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleCheckboxChange = (service: string) => {
    setFormData(prev => ({
      ...prev,
      additionalServices: prev.additionalServices.includes(service)
        ? prev.additionalServices.filter(s => s !== service)
        : [...prev.additionalServices, service]
    }));
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Request a Detailed Quote</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get customized pricing for your logistics needs. Our experts will analyze your requirements and provide a comprehensive quote tailored to your business.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Quote Benefits */}
            <div className="lg:col-span-1">
              <Card className="mb-6">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Why Choose SWENLOG?</h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-1" />
                      <div>
                        <div className="font-semibold text-gray-900">Competitive Pricing</div>
                        <div className="text-sm text-gray-600">Best rates with transparent pricing structure</div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Globe className="h-5 w-5 text-blue-600 mt-1" />
                      <div>
                        <div className="font-semibold text-gray-900">Global Network</div>
                        <div className="text-sm text-gray-600">Worldwide coverage with local expertise</div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Truck className="h-5 w-5 text-orange-600 mt-1" />
                      <div>
                        <div className="font-semibold text-gray-900">End-to-End Solutions</div>
                        <div className="text-sm text-gray-600">Complete logistics from pickup to delivery</div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Calculator className="h-5 w-5 text-purple-600 mt-1" />
                      <div>
                        <div className="font-semibold text-gray-900">Custom Solutions</div>
                        <div className="text-sm text-gray-600">Tailored to your specific requirements</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Quote Processing</h3>
                  <div className="space-y-3 text-sm text-gray-600">
                    <div className="flex items-center">
                      <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold mr-3">1</div>
                      Submit your requirements
                    </div>
                    <div className="flex items-center">
                      <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold mr-3">2</div>
                      Our experts analyze your needs
                    </div>
                    <div className="flex items-center">
                      <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold mr-3">3</div>
                      Receive detailed quote within 24 hours
                    </div>
                    <div className="flex items-center">
                      <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold mr-3">4</div>
                      Discuss and finalize services
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quote Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Personal Information */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="text"
                          name="firstName"
                          placeholder="First Name*"
                          className="bg-gray-50 text-gray-900 px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          required
                        />
                        <input
                          type="text"
                          name="lastName"
                          placeholder="Last Name*"
                          className="bg-gray-50 text-gray-900 px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          required
                        />
                        <input
                          type="email"
                          name="email"
                          placeholder="Email Address*"
                          className="bg-gray-50 text-gray-900 px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                        <input
                          type="tel"
                          name="phone"
                          placeholder="Phone Number*"
                          className="bg-gray-50 text-gray-900 px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <input
                        type="text"
                        name="company"
                        placeholder="Company Name*"
                        className="w-full bg-gray-50 text-gray-900 px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none mt-4"
                        value={formData.company}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    {/* Service Requirements */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Service Requirements</h3>
                      <select 
                        name="service"
                        className="w-full bg-gray-50 text-gray-900 px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none mb-4"
                        value={formData.service}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select Service*</option>
                        <option value="ocean-freight">Ocean Freight</option>
                        <option value="air-freight">Air Freight</option>
                        <option value="ground-transportation">Ground Transportation</option>
                        <option value="customs-brokerage">Customs Brokerage</option>
                        <option value="warehousing-distribution">Warehousing & Distribution</option>
                        <option value="supply-chain-solutions">Supply Chain Solutions</option>
                      </select>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="text"
                          name="origin"
                          placeholder="Origin Location*"
                          className="bg-gray-50 text-gray-900 px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none"
                          value={formData.origin}
                          onChange={handleInputChange}
                          required
                        />
                        <input
                          type="text"
                          name="destination"
                          placeholder="Destination Location*"
                          className="bg-gray-50 text-gray-900 px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none"
                          value={formData.destination}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    {/* Cargo Details */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Cargo Details</h3>
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <input
                          type="text"
                          name="weight"
                          placeholder="Cargo Weight (kg)"
                          className="bg-gray-50 text-gray-900 px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none"
                          value={formData.weight}
                          onChange={handleInputChange}
                        />
                        <input
                          type="text"
                          name="dimensions"
                          placeholder="Cargo Dimensions (LxWxH)"
                          className="bg-gray-50 text-gray-900 px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none"
                          value={formData.dimensions}
                          onChange={handleInputChange}
                        />
                      </div>
                      
                      <select 
                        name="cargoType"
                        className="w-full bg-gray-50 text-gray-900 px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none mb-4"
                        value={formData.cargoType}
                        onChange={handleInputChange}
                      >
                        <option value="">Cargo Type</option>
                        <option value="general">General Cargo</option>
                        <option value="hazardous">Hazardous Materials</option>
                        <option value="temperature-controlled">Temperature Controlled</option>
                        <option value="oversized">Oversized/Heavy Lift</option>
                        <option value="perishable">Perishable Goods</option>
                        <option value="electronics">Electronics</option>
                        <option value="automotive">Automotive Parts</option>
                        <option value="textiles">Textiles</option>
                        <option value="other">Other</option>
                      </select>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="date"
                          name="shipDate"
                          placeholder="Preferred Ship Date"
                          className="bg-gray-50 text-gray-900 px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none"
                          value={formData.shipDate}
                          onChange={handleInputChange}
                        />
                        <select 
                          name="urgency"
                          className="bg-gray-50 text-gray-900 px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none"
                          value={formData.urgency}
                          onChange={handleInputChange}
                        >
                          <option value="">Urgency Level</option>
                          <option value="standard">Standard</option>
                          <option value="express">Express</option>
                          <option value="urgent">Urgent (24-48 hours)</option>
                          <option value="emergency">Emergency</option>
                        </select>
                      </div>
                    </div>

                    {/* Additional Services */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Services</h3>
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          'Insurance',
                          'Customs Clearance',
                          'Door-to-Door Delivery',
                          'Packaging Services',
                          'Warehousing',
                          'Real-time Tracking'
                        ].map((service) => (
                          <label key={service} className="flex items-center text-gray-700 cursor-pointer">
                            <input 
                              type="checkbox" 
                              className="mr-2 text-blue-500"
                              checked={formData.additionalServices.includes(service)}
                              onChange={() => handleCheckboxChange(service)}
                            />
                            {service}
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Description */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Details</h3>
                      <textarea
                        name="description"
                        placeholder="Detailed Description of Your Shipping Requirements..."
                        rows={4}
                        className="w-full bg-gray-50 text-gray-900 px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none"
                        value={formData.description}
                        onChange={handleInputChange}
                      ></textarea>
                    </div>

                    <Button type="submit" className="w-full py-3 text-lg">
                      Get Detailed Quote
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default QuotePage;