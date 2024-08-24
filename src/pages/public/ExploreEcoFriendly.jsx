import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import HorizontalNavbar from '../../components/layouts/HorizontalNavbar';
import Footer from '../../components/layouts/Footer';
import subsectionOne from '../../assets/images/public/subsectionOne.jpg';

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

const ExploreEcoFriendly = () => {
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
            <img src={subsectionOne} alt="Eco-friendly destination" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <h1 className="absolute bottom-0 left-0 text-4xl font-bold text-white p-6">Explore Eco-Friendly Destinations</h1>
          </div>
          <div className="p-6 md:p-8 text-white">
            <p className="text-lg mb-6">
              Discover hidden gems and sustainable travel spots that preserve local environments and cultures. Our community-driven platform helps you find and share eco-conscious travel experiences around the world.
            </p>
            <p className="text-lg mb-6">
              By choosing eco-friendly destinations, you contribute to the preservation of natural habitats, support local communities, and minimize your carbon footprint while traveling.
            </p>
            <h2 className="text-2xl font-bold mb-4">Why Choose Eco-Friendly Destinations?</h2>
            <ul className="list-disc pl-6 mb-6">
              <li>Preserve natural environments and wildlife</li>
              <li>Support local communities and economies</li>
              <li>Reduce your carbon footprint</li>
              <li>Experience authentic and sustainable cultures</li>
            </ul>
            <Link to="/auth/signup" className="bg-blue-600 text-white font-bold py-3 px-6 rounded-full hover:bg-blue-700 transition duration-300 inline-block">
              Browse Eco-Friendly Destinations
            </Link>
          </div>
        </motion.article>
      </main>
      <Footer />
    </motion.div>
  );
};

export default ExploreEcoFriendly;