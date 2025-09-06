
import { Phone, Mail, MapPin, Clock, Building2, Users, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';

const Contact = () => {
  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Get in Touch with SWENLOG</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to optimize your supply chain? Our logistics experts are here to help you find the perfect solution for your business needs.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
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
                  <div className="text-gray-600">+91 95674 10060</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Mail className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Email</div>
                  <div className="text-gray-600">info@swenlog.com</div>
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
                  No.2, 2nd Floor, Kodambakkam High Road<br />
                  Nungambakkam<br />
                  Chennai, Tamil Nadu - 600034<br />
                  Phone: +91 80476 97802 / +91 80476 97628<br />
                  Email: info@swenlog.com
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-4">Quick Access</h4>
              <div className="space-y-3">
                <Link to="/locations" className="flex items-center text-blue-600 hover:text-blue-700 transition-colors">
                  <MapPin className="h-4 w-4 mr-2" />
                  View All Office Locations
                </Link>
                <Link to="/networks" className="flex items-center text-blue-600 hover:text-blue-700 transition-colors">
                  <Users className="h-4 w-4 mr-2" />
                  Our Global Network
                </Link>
              </div>
            </div>
          </div>

          {/* Contact Options */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">How Can We Help You?</h3>
              
              <div className="space-y-4">
                <Link to="/quote">
                  <Button className="w-full py-4 text-lg justify-start">
                    <MessageCircle className="h-5 w-5 mr-3" />
                    Request a Detailed Quote
                  </Button>
                </Link>
                
                <div className="grid grid-cols-2 gap-4">
                  <a href="tel:+918047697802">
                    <Button variant="outline" className="py-3 w-full">
                      <Phone className="h-4 w-4 mr-2" />
                      Call Us
                    </Button>
                  </a>
                  <a href="mailto:info@swenlog.com">
                    <Button variant="outline" className="py-3 w-full">
                      <Mail className="h-4 w-4 mr-2" />
                      Email Us
                    </Button>
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Contact Form */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Send us a Quick Message</h3>
              
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Your Name*"
                    className="bg-gray-50 text-gray-900 px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Email Address*"
                    className="bg-gray-50 text-gray-900 px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none"
                    required
                  />
                </div>
                
                <input
                  type="text"
                  placeholder="Subject*"
                  className="w-full bg-gray-50 text-gray-900 px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none"
                  required
                />
                
                <textarea
                  placeholder="Your Message*"
                  rows={4}
                  className="w-full bg-gray-50 text-gray-900 px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none"
                  required
                ></textarea>
                
                <Button type="submit" className="w-full py-3">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
