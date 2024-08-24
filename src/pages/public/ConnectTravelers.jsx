import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import HorizontalNavbar from '../../components/layouts/HorizontalNavbar';
import Footer from '../../components/layouts/Footer';
import subsectionTwo from '../../assets/images/public/subsectionTwo.jpg';

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

const ConnectTravelers = () => {
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
            <img src={subsectionTwo} alt="Travelers connecting" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <h1 className="absolute bottom-0 left-0 text-4xl font-bold text-white p-6">Connect with Like-Minded Travelers</h1>
          </div>
          <div className="p-6 md:p-8 text-white">
            <p className="text-lg mb-6">
              Build a network of responsible tourists, share your experiences, and learn from others. Engage in meaningful discussions about sustainable travel practices and make lasting connections with fellow eco-conscious adventurers.
            </p>
            <h2 className="text-2xl font-bold mb-4">Why Connect?</h2>
            <ul className="list-disc pl-6 mb-6">
              <li>Share and gain valuable insights on sustainable travel</li>
              <li>Find travel companions who share your eco-friendly values</li>
              <li>Discover hidden gems recommended by fellow travelers</li>
              <li>Collaborate on planning eco-conscious trips</li>
            </ul>
            <h2 className="text-2xl font-bold mb-4">How to Connect</h2>
            <p className="mb-6">
              Our platform offers various ways to connect with like-minded travelers:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li>Join our community forums to discuss travel topics</li>
              <li>Participate in virtual and in-person meetups</li>
              <li>Use our trip planning tools to find travel buddies</li>
              <li>Share your eco-friendly travel stories and tips</li>
            </ul>
            <p className="mb-8">
              By connecting with other responsible travelers, you're not just expanding your network – you're becoming part of a global movement towards more sustainable and ethical tourism.
            </p>
            <Link to="/auth/signup" className="bg-blue-600 text-white font-bold py-3 px-6 rounded-full hover:bg-blue-700 transition duration-300 inline-block">
              Join Our Community
            </Link>
          </div>
        </motion.article>
      </main>
      <Footer />
    </motion.div>
  );
};

export default ConnectTravelers;