import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './LandingPage.css';
import Subsection from '../../components/layouts/Subsection';
import Footer from '../../components/layouts/Footer';
import HorizontalNavbar from '../../components/layouts/HorizontalNavbar';
import subsectionOne from '../../assets/images/public/subsectionOne.jpg';
import subsectionTwo from '../../assets/images/public/subsectionTwo.jpg';
import subsectionThree from '../../assets/images/public/subsectionThree.jpg';
import DevelopersCarousel from '../../components/ui/DevelopersCarousel';

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

const LandingPage = () => {
  return (
    <motion.div 
      className="min-h-screen w-screen bg-gray-900"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      <main className="w-full">
        <section className="relative flex flex-col items-center justify-center mb-16 bg-landing-bg bg-cover bg-center bg-no-repeat h-screen w-full">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <HorizontalNavbar />
          <motion.div 
            className="relative z-10 text-right self-end p-16 flex flex-col items-end justify-center h-full w-1/2"
            variants={slideUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <h1 className="text-5xl font-bold text-white mb-4">Discover Sustainable Adventures</h1>
            <p className="text-xl text-white mb-8">Connect with eco-conscious travelers and explore hidden gems responsibly</p>
            <Link to="/auth/signup" className="bg-blue-600 text-white font-bold py-3 px-6 rounded-full hover:bg-blue-700 transition duration-300">
              Join the Community
            </Link>
          </motion.div>
        </section>
        <motion.div 
          className="w-full"
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div variants={slideUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <Subsection 
              title="Explore Eco-Friendly Destinations"
              description="Discover hidden gems and sustainable travel spots that preserve local environments and cultures. Our community-driven platform helps you find and share eco-conscious travel experiences around the world."
              imageSrc={subsectionOne}
              imageAlt="Eco-friendly destination"
              linkTo="/explore-eco-friendly"
            />
          </motion.div>

          <motion.div variants={slideUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <Subsection 
              title="Connect with Like-Minded Travelers"
              description="Build a network of responsible tourists, share your experiences, and learn from others. Engage in meaningful discussions about sustainable travel practices and make lasting connections with fellow eco-conscious adventurers."
              imageSrc={subsectionTwo}
              imageAlt="Travelers connecting"
              imageOnRight={true}
              bgColor="gray-100"
              linkTo="/connect-travelers"
            />
          </motion.div>

          <motion.div variants={slideUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <Subsection 
              title="Make a Positive Impact"
              description="Share your sustainable travel stories and inspire others to make a positive impact. Learn about local conservation efforts, participate in eco-friendly activities, and contribute to the well-being of the destinations you visit."
              imageSrc={subsectionThree}
              imageAlt="Positive impact on local community"
              linkTo="/positive-impact"
            />
          </motion.div>
        </motion.div>
      </main>
      <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
        <DevelopersCarousel />
      </motion.div>
      <motion.footer variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
        <Footer />
      </motion.footer>
    </motion.div>
  );
};

export default LandingPage;