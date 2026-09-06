import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  MessageCircle, 
  MapPin, 
  Clock, 
  Star, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  Settings, 
  X, 
  ChevronRight, 
  ChevronLeft,
  ShoppingBag, 
  Award, 
  Flame, 
  Copy, 
  Check, 
  ExternalLink,
  UtensilsCrossed,
  QrCode,
  CreditCard,
  Plus,
  Minus,
  Share2,
  Gift,
  Truck,
  PackageCheck,
  Calendar,
  Heart
} from 'lucide-react';

export default function App() {
  // 1. DYNAMIC BUSINESS STATE
  const [business, setBusiness] = useState({
    name: 'Royal Sweets & Bakery',
    phone: '919876543210',
    address: 'Main Market, Clock Tower, City Center',
  });

  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [editForm, setEditForm] = useState({ ...business });
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  // Quantity state for the 8 menu cards
  const [quantities, setQuantities] = useState({
    1: 1, 2: 1, 3: 1, 4: 1, 5: 1, 6: 1, 7: 1, 8: 1
  });

  // Hero Carousel State
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      id: 1,
      image: '/images/cakes.jpg',
      badge: '🎂 Artisanal Cakes',
      title: 'Custom Celebration Cakes & Theme Designs',
      subtitle: 'Moist, handcrafted designer cakes made for birthdays, weddings, & special moments.',
      ctaText: 'Order Custom Cake',
    },
    {
      id: 2,
      image: '/images/mithai.jpg',
      badge: '🍬 Pure Desi Ghee',
      title: 'Authentic Handcrafted Indian Sweets',
      subtitle: 'Made fresh every morning using 100% pure desi ghee, saffron, and premium nuts.',
      ctaText: 'Order Fresh Mithai',
    },
    {
      id: 3,
      image: '/images/bakery.jpg',
      badge: '🥖 Morning Fresh',
      title: 'Oven-Fresh Breads, Croissants & Cookies',
      subtitle: 'Crispy savory puffs, artisan sourdough, butter croissants, and crunchy cookies.',
      ctaText: 'Order Fresh Bakery',
    },
  ];

  // Auto rotate hero carousel every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);

  // Dynamic Open / Closed Status (8:00 AM - 10:30 PM)
  const [isOpenNow, setIsOpenNow] = useState(true);

  const checkIsOpenStatus = () => {
    const now = new Date();
    const currentMins = now.getHours() * 60 + now.getMinutes();
    const openMins = 8 * 60; // 8:00 AM
    const closeMins = 22 * 60 + 30; // 10:30 PM
    return currentMins >= openMins && currentMins < closeMins;
  };

  useEffect(() => {
    setIsOpenNow(checkIsOpenStatus());
    const timer = setInterval(() => {
      setIsOpenNow(checkIsOpenStatus());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Initialize state from URL query parameters on load
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlName = params.get('name');
    const urlPhone = params.get('phone');
    const urlAddress = params.get('address');

    if (urlName || urlPhone || urlAddress) {
      const updated = {
        name: urlName || business.name,
        phone: urlPhone ? urlPhone.replace(/[^\d]/g, '') : business.phone,
        address: urlAddress || business.address,
      };
      setBusiness(updated);
      setEditForm(updated);
    }
  }, []);

  // Update business details state and sync URL
  const handleApplyChanges = (e) => {
    e.preventDefault();
    const cleanedPhone = editForm.phone.replace(/[^\d]/g, '');
    const updated = {
      ...editForm,
      phone: cleanedPhone || '919876543210',
    };
    setBusiness(updated);

    const url = new URL(window.location.origin + window.location.pathname);
    url.searchParams.set('name', updated.name);
    url.searchParams.set('phone', updated.phone);
    url.searchParams.set('address', updated.address);
    window.history.replaceState({}, '', url.toString());

    setIsCustomizeOpen(false);
  };

  const handleResetDefaults = () => {
    const defaults = {
      name: 'Royal Sweets & Bakery',
      phone: '919876543210',
      address: 'Main Market, Clock Tower, City Center',
    };
    setBusiness(defaults);
    setEditForm(defaults);

    const url = new URL(window.location.origin + window.location.pathname);
    window.history.replaceState({}, '', url.toString());
  };

  // Copy Shareable Link
  const copyShareableLink = () => {
    const url = new URL(window.location.origin + window.location.pathname);
    url.searchParams.set('name', editForm.name);
    url.searchParams.set('phone', editForm.phone);
    url.searchParams.set('address', editForm.address);

    navigator.clipboard.writeText(url.toString());
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2500);
  };

  // Copy UPI ID
  const copyUpiId = () => {
    const upi = `${business.phone}@upi`;
    navigator.clipboard.writeText(upi);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2500);
  };

  // Quantity counter helpers
  const updateQuantity = (id, delta) => {
    setQuantities(prev => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + delta)
    }));
  };

  // Helper redirection link builders
  const getWhatsAppLink = (customText) => {
    const message = customText 
      ? `Hello ${business.name}, I would like to order: ${customText}` 
      : `Hello ${business.name}, I want to inquire about your sweets and bakery orders.`;
    return `https://wa.me/${business.phone}?text=${encodeURIComponent(message)}`;
  };

  const getOccasionWhatsAppLink = (occasionTitle) => {
    const message = `Hello ${business.name}, I want to inquire about bulk ordering for ${occasionTitle}.`;
    return `https://wa.me/${business.phone}?text=${encodeURIComponent(message)}`;
  };

  const getCallLink = () => `tel:${business.phone}`;
  
  const getMapsLink = () => 
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.address)}`;

  const scrollToMenu = () => {
    const menuEl = document.getElementById('menu-section');
    if (menuEl) {
      menuEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // 8 EXPANDED MENU ITEMS DATA
  const menuItems = [
    {
      id: 1,
      category: 'sweets',
      title: 'Kaju Katli & Dry Fruit Sweets',
      itemsList: ['Kaju Katli', 'Dry Fruit Barfi', 'Anjeer Roll'],
      priceBadge: '₹450/box',
      tag: '⭐ Bestseller',
      tagBg: 'bg-amber-500 text-white',
      image: '/images/mithai.jpg',
      description: 'Rich cashews and premium dry fruits crafted into melt-in-mouth traditional silver squares.',
    },
    {
      id: 2,
      category: 'sweets',
      title: 'Pure Desi Ghee Motichoor Ladoo',
      itemsList: ['Motichoor Ladoo', 'Besan Ladoo', 'Saffron Boondi'],
      priceBadge: '₹320/kg',
      tag: '✨ Pure Ghee',
      tagBg: 'bg-yellow-600 text-white',
      image: '/images/hero.jpg',
      description: 'Golden tiny boondi pearls fried in 100% pure desi ghee infused with saffron & pistachios.',
    },
    {
      id: 3,
      category: 'cakes',
      title: 'Belgian Chocolate Truffle Cake',
      itemsList: ['Dark Truffle', 'Choco Ganache', 'Eggless Available'],
      priceBadge: '₹550/lb',
      tag: '🎂 Rich Chocolate',
      tagBg: 'bg-pink-600 text-white',
      image: '/images/cakes.jpg',
      description: 'Silky smooth Belgian dark chocolate ganache layered between moist cocoa sponge cake.',
    },
    {
      id: 4,
      category: 'cakes',
      title: 'Red Velvet Celebration Cake',
      itemsList: ['Cream Cheese', 'Fresh Berries', 'Edible Gold Leaf'],
      priceBadge: '₹600/lb',
      tag: '🍓 Premium Cake',
      tagBg: 'bg-red-600 text-white',
      image: '/images/redvelvet.jpg',
      description: 'Velvety crimson sponge layered with lush cream cheese frosting and fresh berries.',
    },
    {
      id: 5,
      category: 'bakery',
      title: 'Multi-Grain Artisan Bread & Croissants',
      itemsList: ['Butter Croissants', 'Multi-Grain Loaf', 'Dry Fruit Puff'],
      priceBadge: '₹140/pack',
      tag: '🥖 Fresh Daily',
      tagBg: 'bg-emerald-600 text-white',
      image: '/images/bakery.jpg',
      description: 'Golden flaky butter croissants and high-fiber multi-grain loaves baked fresh every 6 AM.',
    },
    {
      id: 6,
      category: 'bakery',
      title: 'Choco-Chip Almond Cookies Jar',
      itemsList: ['Dark Choco Chips', 'Roasted Almonds', 'Pure Butter'],
      priceBadge: '₹220/jar',
      tag: '🍪 Crunchy Jar',
      tagBg: 'bg-amber-700 text-white',
      image: '/images/cookies.jpg',
      description: 'Crunchy butter cookies packed with dark chocolate chunks and sliced almonds in glass jar.',
    },
    {
      id: 7,
      category: 'bakery',
      title: 'Crispy Paneer Bread Pakoda & Dhokla Platter',
      itemsList: ['Paneer Pakoda', 'Khaman Dhokla', 'Tangy Chutney'],
      priceBadge: '₹120/plate',
      tag: '🔥 Hot & Crispy',
      tagBg: 'bg-orange-600 text-white',
      image: '/images/snacks.jpg',
      description: 'Hot golden savory snacks served live with mint-coriander and sweet tamarind chutneys.',
    },
    {
      id: 8,
      category: 'hampers',
      title: 'Festive Sweets & Dry Fruit Gift Hamper',
      itemsList: ['Assorted Mithai', 'Roasted Cashews', 'Almonds', 'Royal Box'],
      priceBadge: '₹850/box',
      tag: '🎁 Royal Gift',
      tagBg: 'bg-purple-600 text-white',
      image: '/images/hamper.jpg',
      description: 'Curated luxury gift box containing assorted sweets, roasted nuts, and royal festive packaging.',
    },
  ];

  const filteredMenuItems = activeTab === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeTab);

  // POPULAR OCCASIONS DATA
  const occasions = [
    {
      id: 'birthday',
      icon: '🎂',
      title: 'Birthday Cakes',
      subtitle: 'Custom Theme Cakes & Dessert Tables',
      bgColor: 'from-pink-500/10 to-rose-500/20 border-pink-200 text-pink-950',
    },
    {
      id: 'wedding',
      icon: '💍',
      title: 'Wedding Bulk Mithai',
      subtitle: 'Royal Sweet Boxes for Guests & Functions',
      bgColor: 'from-amber-500/10 to-yellow-500/20 border-amber-200 text-amber-950',
    },
    {
      id: 'hightea',
      icon: '🎉',
      title: 'Office High-Tea',
      subtitle: 'Savory Snacks, Puffs & Bakery Platters',
      bgColor: 'from-orange-500/10 to-amber-500/20 border-orange-200 text-orange-950',
    },
    {
      id: 'festive',
      icon: '🎁',
      title: 'Festive Gift Boxes',
      subtitle: 'Diwali, Rakhi & Corporate Hampers',
      bgColor: 'from-purple-500/10 to-indigo-500/20 border-purple-200 text-purple-950',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDF9] text-[#1F2937] pb-16 md:pb-0">
      
      {/* ------------------- STICKY HEADER NAVBAR ------------------- */}
      <header className="sticky top-0 z-40 bg-[#FFFDF9]/90 backdrop-blur-md border-b border-amber-900/10 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          {/* Logo & Shop Name */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform">
              <span className="text-2xl">🧁</span>
            </div>
            <div>
              <h1 className="font-serif-heading font-bold text-xl sm:text-2xl text-amber-950 leading-tight group-hover:text-amber-700 transition-colors">
                {business.name}
              </h1>
              <p className="text-xs text-amber-700/80 font-medium flex items-center gap-1">
                Fresh Mithai & Bakery
              </p>
            </div>
          </a>

          {/* Dynamic Open / Closed Status Badge & Call CTA */}
          <div className="flex items-center gap-2 sm:gap-4">
            
            {/* Status Badge */}
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
              isOpenNow 
                ? 'bg-emerald-50 border-emerald-300 text-emerald-900 shadow-xs' 
                : 'bg-red-50 border-red-300 text-red-900 shadow-xs'
            }`}>
              <span className={`w-2 h-2 rounded-full ${isOpenNow ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`}></span>
              <span className="hidden sm:inline">
                {isOpenNow ? 'Open Now (8:00 AM – 10:30 PM)' : 'Closed Now (Opens 8:00 AM)'}
              </span>
              <span className="sm:hidden">
                {isOpenNow ? 'Open Now' : 'Closed'}
              </span>
            </div>

            <button 
              onClick={scrollToMenu}
              className="hidden lg:inline-flex items-center gap-1.5 text-sm font-semibold text-amber-900 hover:text-amber-700 px-3 py-2"
            >
              Menu
            </button>

            {/* Pay / Scan QR CTA Header */}
            <button
              onClick={() => setIsQrModalOpen(true)}
              className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-950 text-xs font-bold border border-amber-300/80 active-scale transition-all"
            >
              <QrCode className="w-4 h-4 text-amber-800" />
              <span>Pay QR</span>
            </button>

            <a
              href={getCallLink()}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-900 hover:bg-amber-950 text-white text-sm font-semibold shadow-md shadow-amber-950/15 active-scale transition-all"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">Call Shop</span>
            </a>
          </div>

        </div>
      </header>

      {/* ------------------- DYNAMIC HERO SECTION WITH AUTOMATIC CAROUSEL ------------------- */}
      <section className="relative overflow-hidden pt-8 pb-12 lg:pt-16 lg:pb-24 bg-gradient-to-b from-amber-50/50 via-[#FFFDF9] to-[#FFFDF9]">
        
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-amber-200/30 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-emerald-200/20 blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100/80 border border-amber-300/60 text-amber-900 text-xs sm:text-sm font-bold tracking-wide shadow-xs">
                <Sparkles className="w-4 h-4 text-amber-600 animate-spin" style={{ animationDuration: '6s' }} />
                <span>{heroSlides[currentSlide].badge}</span>
              </div>

              {/* Dynamic Slide Headline */}
              <h2 className="font-serif-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-amber-950 tracking-tight leading-[1.15] min-h-[120px] transition-all duration-500">
                {heroSlides[currentSlide].title}
              </h2>

              {/* Dynamic Subtitle */}
              <p className="text-lg sm:text-xl text-gray-700 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal min-h-[60px]">
                {heroSlides[currentSlide].subtitle} Available fresh daily at <strong className="font-semibold text-amber-950">{business.name}</strong>, {business.address}.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <a
                  href={getWhatsAppLink(heroSlides[currentSlide].title)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-7 py-4 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-base font-bold shadow-lg shadow-[#25D366]/25 active-scale transition-all"
                >
                  <MessageCircle className="w-5 h-5 fill-current" />
                  <span>{heroSlides[currentSlide].ctaText}</span>
                </a>

                <button
                  onClick={scrollToMenu}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-amber-100/70 hover:bg-amber-100 text-amber-950 border border-amber-300/80 text-base font-bold active-scale transition-all"
                >
                  <UtensilsCrossed className="w-5 h-5 text-amber-700" />
                  <span>Explore 8 Specialities</span>
                </button>
              </div>

              {/* Micro Trust Indicators */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs sm:text-sm font-semibold text-gray-600">
                <div className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <span>4.9 ★ (1,200+ Reviews)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Same-Day Delivery</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-amber-700" />
                  <span>FSSAI Certified</span>
                </div>
              </div>

            </div>

            {/* Right Hero Image CAROUSEL */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                
                {/* Decorative border frame */}
                <div className="absolute -inset-3 rounded-3xl bg-gradient-to-tr from-amber-400 via-amber-200 to-amber-500 opacity-40 blur-lg"></div>
                
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-amber-900 h-[380px] sm:h-[440px]">
                  
                  {/* Slides */}
                  {heroSlides.map((slide, index) => (
                    <div
                      key={slide.id}
                      className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                        index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                      }`}
                    >
                      <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-amber-950/80 via-transparent to-transparent"></div>
                      
                      {/* Image Badge overlay */}
                      <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-white/40 shadow-lg text-amber-950">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs uppercase tracking-wider text-amber-700 font-bold">{slide.badge}</p>
                            <p className="font-serif-heading text-base font-bold truncate max-w-[200px] sm:max-w-[240px]">{slide.title}</p>
                          </div>
                          <span className="px-3 py-1 bg-amber-600 text-white rounded-lg text-xs font-bold shadow-xs shrink-0">
                            Fresh Daily
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Previous / Next Arrows */}
                  <button
                    onClick={prevSlide}
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-xs transition-all"
                    title="Previous Slide"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <button
                    onClick={nextSlide}
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-xs transition-all"
                    title="Next Slide"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>

                  {/* Dot Indicators */}
                  <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 bg-black/30 px-3 py-1.5 rounded-full backdrop-blur-xs">
                    {heroSlides.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentSlide(i)}
                        className={`h-2 rounded-full transition-all ${
                          i === currentSlide ? 'w-6 bg-amber-400' : 'w-2 bg-white/60 hover:bg-white'
                        }`}
                        title={`Go to slide ${i + 1}`}
                      />
                    ))}
                  </div>

                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ------------------- EXPANDED TRUST BADGES (6 COLUMNS) ------------------- */}
      <section className="py-10 bg-amber-950 text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
            
            <div className="p-3.5 rounded-2xl bg-amber-900/40 border border-amber-700/30 flex flex-col items-center text-center space-y-1">
              <div className="text-2xl">✨</div>
              <h3 className="font-bold text-xs sm:text-sm text-amber-100">100% Pure Ghee</h3>
              <p className="text-[11px] text-amber-200/70">Traditional recipes</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-amber-900/40 border border-amber-700/30 flex flex-col items-center text-center space-y-1">
              <div className="text-2xl">🥖</div>
              <h3 className="font-bold text-xs sm:text-sm text-amber-100">Morning Batches</h3>
              <p className="text-[11px] text-amber-200/70">Fresh 6:00 AM bakes</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-amber-900/40 border border-amber-700/30 flex flex-col items-center text-center space-y-1">
              <div className="text-2xl">⚡</div>
              <h3 className="font-bold text-xs sm:text-sm text-amber-100">Zero Commission</h3>
              <p className="text-[11px] text-amber-200/70">Direct WhatsApp pricing</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-amber-900/40 border border-amber-700/30 flex flex-col items-center text-center space-y-1">
              <div className="text-2xl">🛡️</div>
              <h3 className="font-bold text-xs sm:text-sm text-amber-100">Kitchen Hygiene</h3>
              <p className="text-[11px] text-amber-200/70">FSSAI Certified</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-amber-900/40 border border-amber-700/30 flex flex-col items-center text-center space-y-1">
              <div className="text-2xl">🚚</div>
              <h3 className="font-bold text-xs sm:text-sm text-amber-100">5 km Delivery</h3>
              <p className="text-[11px] text-amber-200/70">Same-day fast drop</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-amber-900/40 border border-amber-700/30 flex flex-col items-center text-center space-y-1">
              <div className="text-2xl">🎁</div>
              <h3 className="font-bold text-xs sm:text-sm text-amber-100">Gift Packaging</h3>
              <p className="text-[11px] text-amber-200/70">Custom festive boxes</p>
            </div>

          </div>
        </div>
      </section>

      {/* ------------------- POPULAR OCCASIONS QUICK GRID ------------------- */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-8">
          <span className="text-xs font-extrabold uppercase tracking-widest text-amber-700 px-3 py-1 bg-amber-100 rounded-full inline-block">
            Special Orders & Events
          </span>
          <h2 className="font-serif-heading text-2xl sm:text-3xl font-extrabold text-amber-950">
            Planning a Celebration or Gift?
          </h2>
          <p className="text-xs sm:text-sm text-gray-600">
            Tap any occasion below to inquire about bulk ordering & custom packages directly on WhatsApp.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {occasions.map((occ) => (
            <a
              key={occ.id}
              href={getOccasionWhatsAppLink(occ.title)}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-5 rounded-2xl border bg-gradient-to-b ${occ.bgColor} flex flex-col items-center text-center space-y-2 hover:shadow-lg hover:-translate-y-1 active-scale transition-all group`}
            >
              <span className="text-3xl group-hover:scale-110 transition-transform">{occ.icon}</span>
              <h3 className="font-serif-heading font-bold text-sm sm:text-base">{occ.title}</h3>
              <p className="text-[11px] opacity-80">{occ.subtitle}</p>
              <span className="text-[11px] font-bold text-amber-900 underline group-hover:text-amber-700 pt-1">
                Inquire Bulk Order →
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* ------------------- EXPANDED FEATURED MENU GRID (#menu-section) ------------------- */}
      <section id="menu-section" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full scroll-mt-20">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-10">
          <span className="text-xs font-extrabold uppercase tracking-widest text-amber-700 px-3 py-1 bg-amber-100 rounded-full inline-block">
            Full Menu Showcase (8 Items)
          </span>
          <h2 className="font-serif-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-amber-950">
            Handcrafted Delights & Gourmet Bakery
          </h2>
          <p className="text-gray-600 text-base sm:text-lg">
            Select quantity and tap any menu item to instantly place your order via WhatsApp.
          </p>

          {/* 5 CATEGORY FILTER TABS */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {[
              { id: 'all', label: 'All Items (8)' },
              { id: 'sweets', label: '🍬 Sweets' },
              { id: 'cakes', label: '🎂 Designer Cakes' },
              { id: 'bakery', label: '🥖 Bakery & Snacks' },
              { id: 'hampers', label: '🎁 Gift Hampers' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  activeTab === tab.id
                    ? 'bg-amber-900 text-white shadow-md'
                    : 'bg-amber-100/60 hover:bg-amber-100 text-amber-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 8 Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredMenuItems.map((card) => {
            const currentQty = quantities[card.id] || 1;

            return (
              <div 
                key={card.id}
                className="bg-white rounded-3xl border border-amber-900/10 shadow-lg shadow-amber-900/5 overflow-hidden flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
              >
                {/* Card Top Image & Badges */}
                <div className="relative h-52 overflow-hidden bg-amber-100">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  
                  {/* Category Tag */}
                  <span className={`absolute top-4 left-4 text-xs font-bold px-3 py-1 rounded-full shadow-md ${card.tagBg}`}>
                    {card.tag}
                  </span>

                  {/* Price Badge */}
                  <span className="absolute bottom-4 right-4 text-xs font-bold px-3 py-1 bg-white/95 text-amber-950 backdrop-blur-md rounded-lg shadow-md">
                    {card.priceBadge}
                  </span>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-serif-heading text-lg font-bold text-amber-950 group-hover:text-amber-700 transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                      {card.description}
                    </p>

                    {/* Bullet Pills */}
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {card.itemsList.map((item, i) => (
                        <span key={i} className="text-[11px] font-medium px-2 py-0.5 bg-amber-50 text-amber-900 rounded-md border border-amber-200/60">
                          • {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Quantity Selector & WhatsApp Order Button */}
                  <div className="pt-3 border-t border-gray-100 space-y-3">
                    
                    {/* Quantity Control Row */}
                    <div className="flex items-center justify-between bg-amber-50/70 p-2 rounded-xl border border-amber-200/60">
                      <span className="text-xs font-bold text-amber-950">Select Qty:</span>
                      <div className="flex items-center gap-3 bg-white rounded-lg px-2 py-1 border border-amber-300/80 shadow-xs">
                        <button
                          onClick={() => updateQuantity(card.id, -1)}
                          disabled={currentQty <= 1}
                          className="w-6 h-6 rounded flex items-center justify-center text-amber-900 hover:bg-amber-100 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                          title="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-xs font-extrabold text-amber-950 w-5 text-center">
                          {currentQty}
                        </span>
                        <button
                          onClick={() => updateQuantity(card.id, 1)}
                          className="w-6 h-6 rounded flex items-center justify-center text-amber-900 hover:bg-amber-100 transition-colors"
                          title="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Card WhatsApp CTA with Quantity */}
                    <a
                      href={getWhatsAppLink(`${currentQty}x ${card.title}`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-sm font-bold shadow-md active-scale transition-all"
                    >
                      <MessageCircle className="w-4 h-4 fill-current" />
                      <span>Order {currentQty}x via WhatsApp</span>
                    </a>

                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </section>

      {/* ------------------- CUSTOMER REVIEWS SECTION ------------------- */}
      <section className="py-16 bg-gradient-to-b from-amber-50/40 to-[#FFFDF9] border-t border-amber-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-100 text-amber-900 rounded-full text-xs font-bold">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>4.9 / 5.0 Rating on Google Reviews</span>
            </div>
            <h2 className="font-serif-heading text-3xl sm:text-4xl font-extrabold text-amber-950">
              Loved by Sweets & Cake Lovers
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              Here is what our frequent neighborhood customers say about our quality.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="p-6 rounded-3xl bg-white border border-amber-900/10 shadow-md flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex text-amber-400">
                  {'★'.repeat(5)}
                </div>
                <p className="text-gray-700 text-sm italic leading-relaxed">
                  "The Kaju Katli and Motichoor Ladoos from {business.name} are unbeatable! Pure desi ghee flavor without being overly sweet. Ordered 15 boxes for a family event over WhatsApp, delivered right on time."
                </p>
              </div>
              <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
                <div className="w-9 h-9 rounded-full bg-amber-200 text-amber-900 font-bold flex items-center justify-center text-sm">
                  RS
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">Rajesh Sharma</h4>
                  <p className="text-xs text-gray-500">Verified Google Reviewer</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-amber-900/10 shadow-md flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex text-amber-400">
                  {'★'.repeat(5)}
                </div>
                <p className="text-gray-700 text-sm italic leading-relaxed">
                  "Ordered a custom chocolate truffle cake for my daughter's birthday. It was fresh, soft, and decorated beautifully! Plus, ordering directly on WhatsApp took less than 2 minutes."
                </p>
              </div>
              <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
                <div className="w-9 h-9 rounded-full bg-pink-200 text-pink-900 font-bold flex items-center justify-center text-sm">
                  PK
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">Priya Kapoor</h4>
                  <p className="text-xs text-gray-500">Local Customer</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-amber-900/10 shadow-md flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex text-amber-400">
                  {'★'.repeat(5)}
                </div>
                <p className="text-gray-700 text-sm italic leading-relaxed">
                  "Evening samosas and hot dhokla from their store are my daily staple. Super clean hygiene and polite staff. Highly recommend visiting their store at {business.address}!"
                </p>
              </div>
              <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
                <div className="w-9 h-9 rounded-full bg-emerald-200 text-emerald-900 font-bold flex items-center justify-center text-sm">
                  AP
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">Amit Patel</h4>
                  <p className="text-xs text-gray-500">Regular Buyer</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ------------------- FOOTER & LOCATION DETAILS ------------------- */}
      <footer className="bg-amber-950 text-amber-100 pt-16 pb-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-amber-800/60">
            
            {/* Column 1: Business Info */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500 text-amber-950 flex items-center justify-center text-xl font-bold">
                  🧁
                </div>
                <h3 className="font-serif-heading text-2xl font-bold text-white">
                  {business.name}
                </h3>
              </div>
              <p className="text-sm text-amber-200/80 leading-relaxed">
                Your trusted local Sweet Shop & Bakery, serving fresh desi ghee mithai, custom cakes, and oven-baked savories daily with zero commission online ordering.
              </p>
              
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold flex items-center gap-2 shadow-md transition-all"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>WhatsApp Order</span>
                </a>

                <button
                  onClick={() => setIsQrModalOpen(true)}
                  className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-amber-950 text-xs font-bold flex items-center gap-2 shadow-md transition-all"
                >
                  <QrCode className="w-4 h-4" />
                  <span>💳 Pay / Scan QR</span>
                </button>
              </div>
            </div>

            {/* Column 2: Location & Map Navigation */}
            <div className="md:col-span-4 space-y-4">
              <h4 className="font-serif-heading text-lg font-bold text-white flex items-center gap-2">
                <MapPin className="w-5 h-5 text-amber-400" />
                <span>Store Location</span>
              </h4>
              <p className="text-sm text-amber-200/90 leading-relaxed">
                {business.address}
              </p>
              <div>
                <a
                  href={getMapsLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-bold text-amber-300 hover:text-amber-100 underline decoration-amber-400/50 underline-offset-4"
                >
                  <span>Open in Google Maps Navigation</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Column 3: Operational Hours */}
            <div className="md:col-span-3 space-y-4">
              <h4 className="font-serif-heading text-lg font-bold text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-amber-400" />
                <span>Opening Hours</span>
              </h4>
              <ul className="text-xs space-y-2 text-amber-200/80">
                <li className="flex justify-between py-1 border-b border-amber-900">
                  <span>Monday - Sunday:</span>
                  <span className="font-bold text-amber-100">8:00 AM – 10:30 PM</span>
                </li>
                <li className="flex justify-between py-1 border-b border-amber-900">
                  <span>Current Status:</span>
                  <span className={`font-bold ${isOpenNow ? 'text-emerald-400' : 'text-red-400'}`}>
                    {isOpenNow ? '🟢 Open Now' : '🔴 Closed'}
                  </span>
                </li>
                <li className="flex justify-between py-1">
                  <span>Delivery Available:</span>
                  <span className="font-bold text-emerald-400">All Day (5 km)</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Footer Copyright Bottom */}
          <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-amber-300/60 gap-4">
            <p>© {new Date().getFullYear()} {business.name}. All rights reserved.</p>
            <p className="flex items-center gap-1">
              <span>Powered by Direct WhatsApp Order System</span>
            </p>
          </div>

        </div>
      </footer>

      {/* ------------------- MOBILE STICKY ACTION BAR (< 768px) ------------------- */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-2xl p-2.5 grid grid-cols-3 gap-2">
        <a
          href={getCallLink()}
          className="flex items-center justify-center gap-1.5 py-3 rounded-xl bg-amber-100 text-amber-950 font-bold text-xs active-scale"
        >
          <Phone className="w-3.5 h-3.5 text-amber-800" />
          <span>Call</span>
        </a>

        <button
          onClick={() => setIsQrModalOpen(true)}
          className="flex items-center justify-center gap-1.5 py-3 rounded-xl bg-amber-900 text-white font-bold text-xs active-scale"
        >
          <QrCode className="w-3.5 h-3.5 text-amber-400" />
          <span>Pay QR</span>
        </button>

        <a
          href={getWhatsAppLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 py-3 rounded-xl bg-[#25D366] text-white font-bold text-xs shadow-md active-scale"
        >
          <MessageCircle className="w-3.5 h-3.5 fill-current" />
          <span>WhatsApp</span>
        </a>
      </div>

      {/* ------------------- FLOATING QUICK-EDIT BUTTON ------------------- */}
      <div className="fixed bottom-20 md:bottom-6 left-6 z-40">
        <button
          onClick={() => setIsCustomizeOpen(!isCustomizeOpen)}
          className="inline-flex items-center gap-2 px-4 py-3 rounded-full bg-amber-950 text-amber-300 hover:bg-black font-bold text-xs sm:text-sm shadow-2xl border border-amber-600/40 hover:scale-105 transition-all group"
          title="Click to edit shop details dynamically"
        >
          <Settings className="w-4 h-4 text-amber-400 group-hover:rotate-90 transition-transform duration-300" />
          <span>⚙️ Customize Preview</span>
        </button>
      </div>

      {/* ------------------- CUSTOMIZE DRAWER MODAL ------------------- */}
      {isCustomizeOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-amber-900/10 space-y-6 animate-in fade-in zoom-in duration-200 relative">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div>
                <h3 className="font-serif-heading text-xl font-bold text-amber-950 flex items-center gap-2">
                  <span>⚙️ Customize Preview State</span>
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Change values to update all headers, footers & links dynamically.
                </p>
              </div>
              <button
                onClick={() => setIsCustomizeOpen(false)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleApplyChanges} className="space-y-4">
              
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Shop Name
                </label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  placeholder="e.g. Royal Sweets & Bakery"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-amber-600 focus:ring-2 focus:ring-amber-500/20 text-sm outline-none transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  WhatsApp / Call Phone Number (Country code + digits)
                </label>
                <input
                  type="text"
                  value={editForm.phone}
                  onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                  placeholder="e.g. 919876543210"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-amber-600 focus:ring-2 focus:ring-amber-500/20 text-sm outline-none transition-all"
                  required
                />
                <p className="text-[11px] text-gray-500 mt-1">
                  Only digits with country code (e.g. 919876543210). Used in `wa.me/` and `tel:`.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                  Store Address
                </label>
                <textarea
                  rows={2}
                  value={editForm.address}
                  onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                  placeholder="e.g. Main Market, Clock Tower, City Center"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-amber-600 focus:ring-2 focus:ring-amber-500/20 text-sm outline-none transition-all resize-none"
                  required
                />
              </div>

              {/* Copy Shareable Link Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={copyShareableLink}
                  className={`w-full py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 border transition-all ${
                    copiedUrl 
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-md' 
                      : 'bg-amber-100 hover:bg-amber-200/80 text-amber-950 border-amber-300'
                  }`}
                >
                  {copiedUrl ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Link Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-4 h-4 text-amber-800" />
                      <span>Copy Shareable Link (With Params)</span>
                    </>
                  )}
                </button>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="submit"
                  className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-amber-900 hover:bg-amber-950 text-white font-bold text-sm shadow-md active-scale transition-all"
                >
                  Apply & Save Changes
                </button>

                <button
                  type="button"
                  onClick={handleResetDefaults}
                  className="w-full sm:w-auto py-3 px-4 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-xs transition-all"
                >
                  Reset Defaults
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* ------------------- PAY / SCAN QR MODAL ------------------- */}
      {isQrModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center shadow-2xl border border-amber-900/10 space-y-5 animate-in fade-in zoom-in duration-200 relative">
            
            <button
              onClick={() => setIsQrModalOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center mx-auto mb-2">
                <QrCode className="w-6 h-6 text-amber-800" />
              </div>
              <h3 className="font-serif-heading text-xl font-bold text-amber-950">
                Scan & Pay via UPI
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Direct store payment for {business.name}
              </p>
            </div>

            {/* Generated UPI QR Code Graphics */}
            <div className="p-4 rounded-2xl bg-gradient-to-b from-amber-50 to-amber-100/60 border border-amber-200 flex flex-col items-center justify-center space-y-3">
              
              <div className="w-48 h-48 bg-white p-3 rounded-xl border-2 border-amber-900/20 shadow-md flex items-center justify-center relative">
                <svg className="w-full h-full text-amber-950" viewBox="0 0 100 100" fill="currentColor">
                  <rect x="5" y="5" width="25" height="25" fill="currentColor" rx="4" />
                  <rect x="9" y="9" width="17" height="17" fill="white" rx="2" />
                  <rect x="13" y="13" width="9" height="9" fill="currentColor" rx="1" />

                  <rect x="70" y="5" width="25" height="25" fill="currentColor" rx="4" />
                  <rect x="74" y="9" width="17" height="17" fill="white" rx="2" />
                  <rect x="78" y="13" width="9" height="9" fill="currentColor" rx="1" />

                  <rect x="5" y="70" width="25" height="25" fill="currentColor" rx="4" />
                  <rect x="9" y="74" width="17" height="17" fill="white" rx="2" />
                  <rect x="13" y="78" width="9" height="9" fill="currentColor" rx="1" />

                  <rect x="35" y="5" width="8" height="8" />
                  <rect x="48" y="5" width="8" height="18" />
                  <rect x="60" y="12" width="6" height="8" />

                  <rect x="5" y="35" width="18" height="8" />
                  <rect x="28" y="30" width="12" height="12" />
                  <rect x="45" y="28" width="10" height="22" />
                  <rect x="60" y="25" width="15" height="10" />
                  <rect x="80" y="35" width="15" height="8" />

                  <rect x="35" y="48" width="15" height="15" />
                  <rect x="55" y="42" width="10" height="10" />
                  <rect x="70" y="48" width="25" height="8" />
                  <rect x="85" y="60" width="10" height="10" />

                  <rect x="35" y="70" width="8" height="25" />
                  <rect x="48" y="75" width="20" height="8" />
                  <rect x="72" y="72" width="23" height="23" />
                  <rect x="77" y="77" width="13" height="13" fill="white" />
                  <rect x="81" y="81" width="5" height="5" fill="currentColor" />
                </svg>

                <div className="absolute w-8 h-8 rounded-full bg-amber-600 text-white font-bold flex items-center justify-center text-xs border-2 border-white shadow-md">
                  🧁
                </div>
              </div>

              {/* UPI ID Pill */}
              <div className="w-full bg-white px-3 py-2 rounded-xl border border-amber-200 flex items-center justify-between text-xs">
                <div className="truncate text-left">
                  <span className="text-[10px] text-gray-500 block uppercase font-bold">UPI ID</span>
                  <span className="font-extrabold text-amber-950">{business.phone}@upi</span>
                </div>
                
                <button
                  onClick={copyUpiId}
                  className="px-2.5 py-1 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-950 font-bold text-[11px] flex items-center gap-1 shrink-0 transition-colors"
                >
                  {copiedUpi ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-600" />
                      <span className="text-emerald-700">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 text-amber-800" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

            </div>

            <div className="text-[11px] text-gray-500 font-semibold space-y-1">
              <p>Accepts GPay, PhonePe, Paytm & all UPI apps</p>
              <p className="text-[10px] text-amber-700 italic">
                * Please share screenshot of payment on WhatsApp after paying.
              </p>
            </div>

            <button
              onClick={() => setIsQrModalOpen(false)}
              className="w-full py-2.5 rounded-xl bg-amber-950 hover:bg-black text-white font-bold text-xs transition-colors"
            >
              Done / Close
            </button>

          </div>
        </div>
      )}

    </div>
  );
}
