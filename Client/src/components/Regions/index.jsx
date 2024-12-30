import  { useState, useEffect } from 'react';
import beirut from '../../images/beirut.jpg';
import tyre from '../../images/tyre.jpg';
import keserwen from '../../images/keserwen.jpg';
import jounieh from '../../images/junieh.jpg';
import byblos from '../../images/byblos.jpg';
import chouf from '../../images/chouf.jpg';
import batroun from '../../images/batroun.jpg';

const Regions = () => {
  const regions = [
    { key: '1', name: 'Beirut', image: beirut },
    { key: '2', name: 'Jounieh', image: jounieh },
    { key: '3', name: 'Chouf', image: chouf },
    { key: '4', name: 'Batroun', image: batroun },
    { key: '5', name: 'Keserwen', image: keserwen },
    { key: '6', name: 'Byblos', image: byblos },
    { key: '7', name: 'Nabatieh', image: tyre },
    { key: '8', name: 'Saida', image: batroun },
    { key: '9', name: 'Tyre', image: jounieh },
  ];

  const [visibleRegions, setVisibleRegions] = useState([0, 1, 2]);
  const [activeRoundedDiv, setActiveRoundedDiv] = useState(0);

  const handleNavigation = (direction) => {
    const step = 3;
    let startIndex = visibleRegions[0];
    startIndex = direction === 'next' ? startIndex + step : startIndex - step;

    if (startIndex >= regions.length) startIndex = 0;
    if (startIndex < 0) startIndex = regions.length - step;

    setVisibleRegions([startIndex, startIndex + 1, startIndex + 2]);
    setActiveRoundedDiv(Math.floor(startIndex / step));
  };

  useEffect(() => {
    const interval = setInterval(() => handleNavigation('next'), 4000);
    return () => clearInterval(interval);
  }, [visibleRegions]);

  return (
    <div className="w-full flex flex-col items-center">
      <div className="flex flex-wrap justify-center gap-6">
        {visibleRegions.map((index) => (
          regions[index] && (
            <div
              key={regions[index].key}
              className="card w-80 h-80 bg-gray-200 relative overflow-hidden shadow-lg hover:shadow-xl transition-shadow rounded-md"
            >
              <p className="text-center text-lg font-bold mt-2 text-secondary">{regions[index].name}</p>
              <img
                src={regions[index].image}
                className="w-full h-full object-cover rounded-b-md"
                alt={`${regions[index].name}`}
              />
            </div>
          )
        ))}
      </div>
      <div className="w-full flex justify-center items-center mt-6 gap-4">
        <button
          onClick={() => handleNavigation('prev')}
          className="p-2 bg-primary text-white rounded-full hover:bg-secondary transition-colors"
          aria-label="Previous Regions"
        >
          &lt;
        </button>
        <div>
          {Array.from({ length: Math.ceil(regions.length / 3) }).map((_, i) => (
            <span
              key={i}
              className={`rounded-full inline-block w-4 h-4 mx-2 ${activeRoundedDiv === i ? 'bg-secondary' : 'bg-gray-300'}`}
              aria-hidden="true"
            ></span>
          ))}
        </div>
        <button
          onClick={() => handleNavigation('next')}
          className="p-2 bg-primary text-white rounded-full hover:bg-secondary transition-colors"
          aria-label="Next Regions"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Regions;
