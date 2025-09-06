import Header from '../components/Header';
import Footer from '../components/Footer';
import { MapPin, Phone, Mail, Clock, Building2 } from 'lucide-react';

const LocationsPage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Strategic Locations</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              With offices across India, SWENLOG maintains a strong presence in key commercial hubs to serve our clients efficiently. Our strategic network ensures we're always close to your business.
            </p>
          </div>

          {/* Location Overview */}
          <div className="mb-16 bg-white rounded-xl shadow-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Pan-India Presence</h2>
            <p className="text-gray-600 mb-6">We operate across major cities in India with our headquarters in Chennai and corporate office in Bengaluru, supported by regional branches.</p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-red-100 p-4 rounded-lg inline-block mb-3">
                  <Building2 className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="font-semibold text-gray-900">South India</h3>
                <p className="text-sm text-gray-600">Chennai, Bengaluru, Coimbatore, Tuticorin, Cochin</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-100 p-4 rounded-lg inline-block mb-3">
                  <Building2 className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900">West India</h3>
                <p className="text-sm text-gray-600">Mumbai</p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 p-4 rounded-lg inline-block mb-3">
                  <Building2 className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900">North India</h3>
                <p className="text-sm text-gray-600">Delhi</p>
              </div>
            </div>
          </div>

          {/* Office Details */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Corporate Headquarters */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center mb-6">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Building2 className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 ml-4">Corporate Headquarters</h3>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <MapPin className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Corporate Office</div>
                    <div className="text-gray-600">
                      SWENLOG SUPPLY CHAIN SOLUTIONS PVT LTD<br />
                      1st Floor, 3rd Block, 307, 5th A Cross Rd<br />
                      HRBR Layout, Kalyan Nagar<br />
                      Bengaluru, Karnataka - 560043
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Phone className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Phone</div>
                    <div className="text-gray-600">+91-80-4152-XXXX</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Mail className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Email</div>
                    <div className="text-gray-600">bangalore@swenlog.co</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <Clock className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Business Hours</div>
                    <div className="text-gray-600">Monday - Friday: 9:30 AM - 6:00 PM<br />Saturday: 9:30 AM - 2:00 PM</div>
                  </div>
                </div>
              </div>

              {/* Registered Office */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-4">Registered Office</h4>
                <div className="flex items-start space-x-4">
                  <div className="bg-red-100 p-2 rounded">
                    <MapPin className="h-4 w-4 text-red-600" />
                  </div>
                  <div className="text-sm text-gray-600">
                    1st Floor, No. 45, 1st Main Road<br />
                    West Shenoy Nagar<br />
                    Chennai, Tamil Nadu - 600030<br />
                    Phone: +91-44-2854-XXXX<br />
                    Email: chennai@swenlog.co
                  </div>
                </div>
              </div>
            </div>

            {/* Regional Coverage */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Regional Coverage</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">South India</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                    <div>• Chennai (Registered)</div>
                    <div>• Bengaluru (Corporate)</div>
                    <div>• Coimbatore</div>
                    <div>• Tuticorin</div>
                    <div>• Cochin</div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">West India</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                    <div>• Mumbai</div>
                    <div>• Navi Mumbai</div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">North India</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                    <div>• New Delhi</div>
                    <div>• Dwarka</div>
                  </div>
                </div>
              </div>

              {/* Key Services at Each Location */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-4">Services Available</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    Ocean & Air Freight Services
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    Customs Clearance & Documentation
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    Ground Transportation & Distribution
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    Warehousing & Storage Solutions
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    Supply Chain Consulting
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default LocationsPage;