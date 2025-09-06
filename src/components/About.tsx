
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { defaultAboutData } from '@/data/defaults';
import { ICONS } from './icons';

const About = () => {
  const [aboutData] = useLocalStorage('aboutData', defaultAboutData);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              {aboutData.title}
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              {aboutData.paragraph1}
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              {aboutData.paragraph2}
            </p>
            
            <div className="grid grid-cols-2 gap-8 mb-8">
              <div>
                <div className="text-3xl font-bold text-blue-800 mb-2">{aboutData.stat1_value}</div>
                <div className="text-gray-600">{aboutData.stat1_label}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-800 mb-2">{aboutData.stat2_value}</div>
                <div className="text-gray-600">{aboutData.stat2_label}</div>
              </div>
            </div>

            <button className="bg-blue-800 text-white px-8 py-3 rounded-lg hover:bg-blue-900 transition-colors font-semibold">
              Our Story
            </button>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">{aboutData.values_title}</h3>
            {aboutData.values.map((value) => {
              const Icon = ICONS[value.icon];
              return (
                <div key={value.title} className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-3 rounded-lg flex-shrink-0">
                    {Icon && <Icon className="h-6 w-6 text-blue-800" />}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">{value.title}</h4>
                    <p className="text-gray-600">{value.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
