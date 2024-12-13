import { useNavigate } from 'react-router-dom';
import hero from '../LandingDefaultImage.jpg';
import ButtonLg from '../components/ButtonLg';
import Regions from '../components/Regions';

const Landing = () => {
  const navigate = useNavigate();

  const handleSignInClick = () => {
    navigate('/register');
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="lg:mx-auto max-w-screen-xl flex flex-col-reverse lg:flex-row items-center my-12 gap-12 px-5">
        {/* Text Content */}
        <div className="flex flex-col justify-between items-start max-w-3xl text-center lg:text-left">
          <h1 className="font-semibold text-4xl mb-2">Lebanon Real Estate Insights</h1>
          <div className="w-36 h-2 bg-gradient-to-r from-primary to-black mb-6"></div>
          <p className="text-lg text-gray-600 leading-8 mb-6">
            Your gateway to the Lebanese real estate market. Whether you&apos;re looking to buy your dream property, sell
            your current one, or gain valuable insights into market trends, we&apos;ve got you covered. Join our community
            and explore the endless possibilities that the Lebanese real estate market has to offer.
          </p>
          <ButtonLg buttonText="Register Now" onClick={handleSignInClick} />
        </div>
        {/* Hero Image */}
        <div className="flex justify-center items-center w-full max-w-sm lg:max-w-lg">
          <img
            className="object-contain rounded-lg shadow-lg"
            src={hero}
            alt="Lebanon Real Estate Hero"
          />
        </div>
      </div>

      {/* Regions Section */}
      <div className="lg:mx-auto max-w-screen-xl px-5 flex flex-col lg:flex-row items-center justify-between gap-12 my-16">
        {/* Left Text Section */}
        <div className="lg:w-4/12 hidden lg:block">
          <h2 className="font-semibold text-3xl mb-4">Explore Best Properties in Lebanon</h2>
          <div className="w-36 h-2 bg-gradient-to-r from-primary to-black mb-7"></div>
          <p className="text-lg text-gray-600 leading-8">
            Lebanese Properties offers a wide range of properties available for sale across all major Lebanese areas.
          </p>
        </div>
        {/* Regions Component */}
        <div className="lg:w-8/12 w-full">
          <Regions />
        </div>
      </div>
    </div>
  );
};

export default Landing;
