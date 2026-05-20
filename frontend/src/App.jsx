import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const Navbar = () => (
  <nav className="fixed top-0 w-full z-50 px-8 py-6 flex justify-between items-center bg-charcoal/90 backdrop-blur-md border-b border-gold/20">
    <div className="text-2xl font-serif font-bold gold-text tracking-widest">LUXE DINING</div>
    <div className="hidden md:flex space-x-8 text-champagne font-light tracking-wide">
      <a href="#home" className="hover:text-gold transition-colors">HOME</a>
      <a href="#menu" className="hover:text-gold transition-colors">MENU</a>
      <a href="#reservations" className="hover:text-gold transition-colors">RESERVATIONS</a>
    </div>
    <a href="#reservations" className="px-6 py-2 border border-gold text-gold hover:bg-gold hover:text-charcoal transition-all duration-300 uppercase text-xs tracking-widest">
      Book Now
    </a>
  </nav>
);

const Hero = () => (
  <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
    <div className="absolute inset-0 bg-black/60 z-10" />
    <div
      className="absolute inset-0 bg-cover bg-center scale-110"
      style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1514361589476-758576d76737?q=80&w=2070&auto=format&fit=crop")' }}
    />
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="relative z-20 text-center px-4"
    >
      <h1 className="text-6xl md:text-8xl font-serif text-champagne mb-6 leading-tight">
        A Symphony of <br /> <span className="gold-text italic">Exquisite Taste</span>
      </h1>
      <p className="text-lg md:text-xl text-champagne/80 max-w-2xl mx-auto font-light mb-12 tracking-wide">
        Experience the pinnacle of culinary artistry, where every dish is a masterpiece and every moment is unforgettable.
      </p>
      <motion.a
        href="#menu"
        className="px-10 py-4 bg-gold text-charcoal font-bold uppercase tracking-widest hover:bg-champagne transition-colors duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Discover the Menu
      </motion.a>
    </motion.div>
    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce">
      <div className="w-px h-16 bg-gradient-to-b from-gold to-transparent" />
    </div>
  </section>
);

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/menu`);
        setMenuItems(response.data);
      } catch (err) {
        setError('Unable to load the menu. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, []);

  if (loading) return <div className="py-20 text-center gold-text">Curating the menu...</div>;
  if (error) return <div className="py-20 text-center text-red-400">{error}</div>;

  const categories = [...new Set(menuItems.map(item => item.category))];

  return (
    <section id="menu" className="py-24 px-8 bg-charcoal">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="text-center mb-20"
      >
        <h2 className="text-4xl md:text-6xl font-serif gold-text mb-4">The Culinary Collection</h2>
        <div className="w-24 h-px bg-gold mx-auto mb-6" />
        <p className="text-champagne/60 max-w-xl mx-auto font-light italic">
          Sourced from the finest producers across the globe, crafted with passion and precision.
        </p>
      </motion.div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
        {categories.map((category, idx) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: idx * 0.2 }}
            className="space-y-8"
          >
            <h3 className="text-2xl font-serif text-champagne uppercase tracking-widest border-b border-gold/30 pb-2">
              {category}
            </h3>
            <div className="space-y-6">
              {menuItems.filter(item => item.category === category).map((item, i) => (
                <div key={i} className="group flex justify-between items-end">
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-lg font-medium text-champagne group-hover:text-gold transition-colors">{item.item_name}</span>
                      <span className="text-gold font-serif ml-4">${item.price}</span>
                    </div>
                    <p className="text-sm text-champagne/50 font-light italic">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const Reservations = () => {
  const [formData, setFormData] = useState({
    guest_name: '',
    email: '',
    phone: '',
    reservation_date: '',
    reservation_time: '',
    party_size: '2'
  });
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: 'loading', message: 'Processing your request...' });
    try {
      const response = await axios.post(`${API_BASE_URL}/reservations`, formData);
      setStatus({ type: 'success', message: 'Your reservation has been secured. We look forward to welcoming you.' });
      setFormData({ guest_name: '', email: '', phone: '', reservation_date: '', reservation_time: '', party_size: '2' });
    } catch (err) {
      setStatus({ type: 'error', message: 'An error occurred. Please check your details and try again.' });
    }
  };

  return (
    <section id="reservations" className="py-24 px-8 bg-charcoal relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gold/5 -skew-x-12 translate-x-20" />
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-serif gold-text mb-4">Reserve Your Table</h2>
          <div className="w-24 h-px bg-gold mx-auto mb-6" />
          <p className="text-champagne/60 font-light">Ensure your presence at the most sought-after table in the city.</p>
        </motion.div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white/5 p-8 md:p-12 rounded-2xl border border-gold/10 backdrop-blur-sm">
          <div className="space-y-2">
            <label className="block text-xs uppercase tracking-widest text-gold">Full Name</label>
            <input
              type="text"
              className="w-full bg-transparent border-b border-gold/30 py-2 text-champagne focus:border-gold outline-none transition-colors"
              value={formData.guest_name}
              onChange={(e) => setFormData({...formData, guest_name: e.target.value})}
              required
            />
          </div>
          <div className="space-y-2">
            <label className="block text-xs uppercase tracking-widest text-gold">Email Address</label>
            <input
              type="email"
              className="w-full bg-transparent border-b border-gold/30 py-2 text-champagne focus:border-gold outline-none transition-colors"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>
          <div className="space-y-2">
            <label className="block text-xs uppercase tracking-widest text-gold">Phone Number</label>
            <input
              type="tel"
              className="w-full bg-transparent border-b border-gold/30 py-2 text-champagne focus:border-gold outline-none transition-colors"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              required
            />
          </div>
          <div className="space-y-2">
            <label className="block text-xs uppercase tracking-widest text-gold">Party Size</label>
            <select
              className="w-full bg-transparent border-b border-gold/30 py-2 text-champagne focus:border-gold outline-none transition-colors"
              value={formData.party_size}
              onChange={(e) => setFormData({...formData, party_size: e.target.value})}
            >
              {[1,2,3,4,5,6,7,8].map(num => <option key={num} value={num} className="bg-charcoal">{num} Guests</option>)}
            </select>
          </div>
          <div className="space-y-2">
            <label className="block text-xs uppercase tracking-widest text-gold">Date</label>
            <input
              type="date"
              className="w-full bg-transparent border-b border-gold/30 py-2 text-champagne focus:border-gold outline-none transition-colors"
              value={formData.reservation_date}
              onChange={(e) => setFormData({...formData, reservation_date: e.target.value})}
              required
            />
          </div>
          <div className="space-y-2">
            <label className="block text-xs uppercase tracking-widest text-gold">Time</label>
            <input
              type="time"
              className="w-full bg-transparent border-b border-gold/30 py-2 text-champagne focus:border-gold outline-none transition-colors"
              value={formData.reservation_time}
              onChange={(e) => setFormData({...formData, reservation_time: e.target.value})}
              required
            />
          </div>
          <div className="md:col-span-2 flex justify-center mt-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="px-12 py-4 bg-gold text-charcoal font-bold uppercase tracking-widest hover:bg-champagne transition-colors duration-300"
            >
              Confirm Reservation
            </motion.button>
          </div>
          {status.message && (
            <div className={`md:col-span-2 text-center py-4 ${status.type === 'error' ? 'text-red-400' : 'text-gold'} font-light italic`}>
              {status.message}
            </div>
          )}
        </form>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="py-12 px-8 bg-charcoal border-t border-gold/10 text-center">
    <div className="text-xl font-serif gold-text mb-6 tracking-widest">LUXE DINING</div>
    <p className="text-champagne/40 text-sm font-light mb-8">
      &copy; {new Date().getFullYear()} Luxe Dining Experience. All rights reserved.
    </p>
    <div className="flex justify-center space-x-6 text-champagne/60 text-xs uppercase tracking-widest">
      <a href="#" className="hover:text-gold transition-colors">Privacy Policy</a>
      <a href="#" className="hover:text-gold transition-colors">Terms of Service</a>
      <a href="#" className="hover:text-gold transition-colors">Contact Us</a>
    </div>
  </footer>
);

function App() {
  return (
    <div className="min-h-screen selection:bg-gold selection:text-charcoal">
      <Navbar />
      <Hero />
      <Menu />
      <Reservations />
      <Footer />
    </div>
  );
}

export default App;
