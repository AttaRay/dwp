import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './pages/header';
import Home from './pages/home';
import Services from './pages/Services';
import DACSection from './pages/dac';
import About from './pages/aboutus';
import Contact from './pages/contact';
import Footer from './pages/footer';
import Blog from './pages/blog';
import Insert from './pages/insert';
import ThankYou from './pages/thank';
import Login from './pages/login';
import ForgotPassword from './pages/forgotPassword';
import Dashboard from './pages/dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/digital-asset-custody" element={<DACSection />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/insert" element={<Insert />} />
          <Route path="/thank" element={<ThankYou />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route 
            path="/dashboard/*" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />

          <Route
            path="/transactions"
            element={
              <ProtectedRoute>
                <Dashboard initialTab="transactions" />
              </ProtectedRoute>
            }
          />
          
          {/* Catch-all route for 404 Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        
      </div>
    </Router>
  );
}

export default App;
