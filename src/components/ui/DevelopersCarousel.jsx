import { useState, useEffect, useRef } from 'react';

const developers = [
  { name: 'Audy Wallace Siegle', role: 'Backend Developer', image: 'https://oyster.ignimgs.com/mediawiki/apis.ign.com/adventure-time-hey-ice-king/e/ef/FinnHeadshot.jpg' },
  { name: 'Chow Zhan Jiea', role: 'Backend Developer', image: 'https://i.pinimg.com/750x/d2/77/54/d27754cbf0bb5c852fccf833d2dee9ca.jpg' },
  { name: 'Albert Tan', role: 'Backend Developer', image: 'https://ti-content-global.cdn.turner.com/PROD-APAC/C_GUMBAL_03019976_MET_TUR/C_GUMBAL_03019976_MET_TUR_VIDSCREENSHOT.jpg' },
  { name: 'Havyn Liew', role: 'Frontend Developer', image: 'https://cdn.anisearch.de/images/character/cover/1/1215_400.webp' },
  { name: 'Charlotte Chen', role: 'Frontend Developer', image: 'https://pm1.aminoapps.com/6324/ac9fef4cb663c1ac923deb6ce75ce368e6b78b50_00.jpg' },
  { name: 'Brian Choo', role: 'Frontend Developer', image: 'https://qph.cf2.quoracdn.net/main-qimg-c0216ecbc80f9481f1635325f770650e-lq' },
];

const DevelopersCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);

  const totalDevelopers = developers.length;
  const visibleDevelopers = 4;
  const extendedDevelopers = [...developers, ...developers.slice(0, visibleDevelopers)];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % totalDevelopers;
        if (nextIndex === 0) {
          setTimeout(() => {
            if (carouselRef.current) {
              carouselRef.current.style.transition = 'none';
              carouselRef.current.style.transform = 'translateX(0)';
              setTimeout(() => {
                if (carouselRef.current) {
                  carouselRef.current.style.transition = 'transform 500ms ease-in-out';
                }
              }, 50);
            }
          }, 500);
        }
        return nextIndex;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [totalDevelopers]);

  return (
    <div className="pt-16">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 text-blue-700">Meet Our Team</h2>
        <div className="relative overflow-hidden">
          <div 
            ref={carouselRef}
            className="flex transition-transform duration-500 ease-in-out" 
            style={{ transform: `translateX(-${currentIndex * (100 / visibleDevelopers)}%)` }}
          >
            {extendedDevelopers.map((developer, index) => (
              <div key={index} className="w-1/4 flex-shrink-0 px-2">
                <div className="bg-gray-700 rounded-lg shadow-md overflow-hidden flex flex-col items-center p-4">
                  <div className="relative w-32 h-32 mb-4">
                    <img
                      src={developer.image}
                      alt={developer.name}
                      className="w-full h-full object-cover rounded-full"
                    />
                    <div className="absolute inset-0 border-4 border-blue-500 rounded-full"></div>
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-white">{developer.name}</h3>
                    <p className="text-sm text-blue-300">{developer.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DevelopersCarousel;