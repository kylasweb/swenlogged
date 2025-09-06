
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { defaultFooterData } from '@/data/defaults';
import { ICONS } from './icons';

const Footer = () => {
  const [footerData] = useLocalStorage('footerData', defaultFooterData);

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-bold text-blue-400 mb-4">{footerData.logoText}</h3>
            <p className="text-gray-300 mb-6">
              {footerData.description}
            </p>
            <div className="flex space-x-4">
              {footerData.socials.map(social => {
                const Icon = ICONS[social.icon];
                return (
                  <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors">
                    {Icon ? <Icon className="h-5 w-5" /> : <span>{social.name}</span>}
                  </a>
                )
              })}
            </div>
          </div>

          {footerData.columns.map(column => (
            <div key={column.title}>
              <h4 className="text-lg font-semibold mb-6">{column.title}</h4>
              <ul className="space-y-3 text-gray-300">
                {column.links.map(link => (
                   <li key={link.name}><a href={link.url} className="hover:text-blue-400 transition-colors">{link.name}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              {footerData.bottomText}
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              {footerData.bottomLinks.map(link => (
                 <a key={link.name} href={link.url} className="text-gray-400 hover:text-blue-400 text-sm transition-colors">{link.name}</a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
