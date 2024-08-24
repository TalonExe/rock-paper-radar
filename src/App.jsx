import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/public/LandingPage';
import ExploreEcoFriendly from './pages/public/ExploreEcoFriendly';
import ConnectTravelers from './pages/public/ConnectTravelers';
import PositiveImpact from './pages/public/PositiveImpact';
import NotFound from './components/errors/NotFound';
import Profile from './pages/user/Profile';
import SignIn from './pages/auth/SignIn.jsx';
import SignUp from './pages/auth/SignUp.jsx';
import Community from './pages/user/Community';
import ViewPostPage from './pages/user/ViewPost';
import Map from './pages/user/Map';
import PrivateRoute from './components/navigation/PrivateRoute';
import CreatePost from './pages/user/CreatePost';
import TravelPlans from './pages/user/TravelPlans';
import FeedbackPage from './pages/user/FeedbackPage';
import BlogPage from './pages/user/BlogPage';
import BlogPost from './pages/user/BlogPost';
import FAQ from './pages/user/FAQ';

function App() {
  return (
    <div className="min-h-screen bg-white text-black">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/explore-eco-friendly" element={<ExploreEcoFriendly />} />
          <Route path="/connect-travelers" element={<ConnectTravelers />} />
          <Route path="/positive-impact" element={<PositiveImpact />} />
          <Route path="/auth/signin" element={<SignIn />} />
          <Route path="/auth/signup" element={<SignUp />} />
          <Route path="/user/profile" element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          } />
          <Route path="/user/community" element={
            <PrivateRoute>
              <Community />
            </PrivateRoute>
          } />
          <Route path="/user/post-view" element={
            <PrivateRoute>
              <ViewPostPage />
            </PrivateRoute>
          } />
          <Route path="/user/create-post" element={
            <PrivateRoute>
              <CreatePost />
            </PrivateRoute>
          } />
          <Route path="/user/map" element={
            <PrivateRoute>
              <Map />
            </PrivateRoute>
          } />
          <Route path="/user/travel-plans" element={
            <PrivateRoute>
              <TravelPlans />
            </PrivateRoute>
          } />
          <Route path="/user/feedback" element={
            <PrivateRoute>
              <FeedbackPage />
            </PrivateRoute>
          } />
          <Route path="/blogs" element={
            <BlogPage />
          } />
          <Route path="/blogs/:id" element={
            <BlogPost />
          } />
          <Route path="/user/faq" element={
            <PrivateRoute>
              <FAQ />
            </PrivateRoute>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;