import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import HorizontalNavbar from '../../components/layouts/HorizontalNavbar';
import Footer from '../../components/layouts/Footer';
import subsectionThree from '../../assets/images/public/subsectionThree.jpg';

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.5 }
  }
};

const slideUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, delay: 0.2 }
  }
};

const PositiveImpact = () => {
  return (
    <motion.div 
      className="min-h-screen w-screen bg-gray-900"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      <HorizontalNavbar />
      <main className="container mx-auto px-4 pt-8 max-w-4xl">
        <motion.article className="rounded-lg overflow-hidden" variants={slideUp}>
          <div className="relative h-64 md:h-96">
            <img src={subsectionThree} alt="Positive impact on local community" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <h1 className="absolute bottom-0 left-0 text-4xl font-bold text-white p-6">Make a Positive Impact</h1>
          </div>
          <div className="p-6 md:p-8 text-white">
            <p className="text-lg mb-6">
              Share your sustainable travel stories and inspire others to make a positive impact. Learn about local conservation efforts, participate in eco-friendly activities, and contribute to the well-being of the destinations you visit.
            </p>
            <p className="text-lg mb-6">
              Discover volunteer opportunities, support local initiatives, and learn how to minimize your environmental footprint while traveling. Your actions can make a significant difference in preserving our planet's natural beauty and cultural heritage.
            </p>
            <h2 className="text-2xl font-bold mb-4">Ways to Make an Impact</h2>
            <ul className="list-disc pl-6 mb-6">
              <li>Participate in local conservation projects</li>
              <li>Support eco-friendly businesses and accommodations</li>
              <li>Engage in responsible wildlife tourism</li>
              <li>Educate yourself and others about sustainable travel practices</li>
            </ul>
            <Link to="/auth/signup" className="bg-blue-600 text-white font-bold py-3 px-6 rounded-full hover:bg-blue-700 transition duration-300 inline-block">
              Explore Impact Opportunities
            </Link>
          </div>
        </motion.article>
      </main>
      <Footer />
    </motion.div>
  );
};

export default PositiveImpact;