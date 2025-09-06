
import Header from '../components/Header';
import Footer from '../components/Footer';
import About from '../components/About';

const AboutPage = () => {
  return (
    <>
      <Header />
      <main className="pt-16 bg-gray-50">
        <About />
        <div className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Journey</h2>
                <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto">
                    From our humble beginnings in 1998, SWENLOG has grown into a global logistics powerhouse. Our journey has been one of constant innovation, dedication to our clients, and a commitment to excellence. We believe in building lasting partnerships and leveraging technology to solve the world's most complex logistics challenges.
                </p>
            </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default AboutPage;
