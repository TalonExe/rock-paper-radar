import { Link } from 'react-router-dom';

const Subsection = ({ title, description, imageSrc, imageAlt, imageOnRight = false, bgColor = 'default', linkTo = '#' }) => {
  return (
    <div className={`flex flex-col md:flex-row items-center bg-${bgColor}`}>
      {!imageOnRight && (
        <div className="w-full md:w-1/2 mb-8 md:mb-0 md:pr-8">
          <img src={imageSrc} alt={imageAlt} className="w-full h-96 object-cover rounded-r-lg shadow-lg" />
        </div>
      )}
      <div className="w-full md:w-1/2 text-center md:text-left p-8">
        <h2 className="text-3xl font-bold text-blue-700 mb-4">{title}</h2>
        <p className="text-gray-400 mb-6">{description}</p>
        <Link to={linkTo} className="bg-blue-600 text-white font-bold py-2 px-4 rounded-full hover:bg-blue-700 transition duration-300">
          Learn More
        </Link>
      </div>
      {imageOnRight && (
        <div className="w-full md:w-1/2 mt-8 md:mt-0 md:pl-8">
          <img src={imageSrc} alt={imageAlt} className="w-full h-96 object-cover rounded-l-lg shadow-lg" />
        </div>
      )}
    </div>
  );
};

export default Subsection;