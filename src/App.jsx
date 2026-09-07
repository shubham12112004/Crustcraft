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
  ArrowLeft,
  Info,
  CheckCircle,
  ShoppingCart,
  Heart,
  Trash2,
  ArrowRight
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

  // Selected Product State for Amazon-style detail view
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [detailQuantity, setDetailQuantity] = useState(1);

  // Quantity state for the catalog grid menu cards
  const [quantities, setQuantities] = useState({
    1: 1, 2: 1, 3: 1, 4: 1, 5: 1, 6: 1, 7: 1, 8: 1
  });

  // Shopping Cart State
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const addToCart = (product, variant = null, qty = 1, e = null) => {
    if (e) e.stopPropagation();
    const vObj = variant || (product.variants ? product.variants[0] : { label: 'Standard', multiplier: 1 });
    const unitPrice = Math.round(product.basePrice * vObj.multiplier);
    const cartItemId = `${product.id}-${vObj.label}`;

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(item => item.cartItemId === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += qty;
        return updated;
      } else {
        return [...prevCart, {
          cartItemId,
          id: product.id,
          title: product.title,
          variantLabel: vObj.label,
          unitPrice,
          quantity: qty,
          image: product.image,
        }];
      }
    });

    triggerToast(`Added ${qty}x ${product.title} (${vObj.label}) to cart!`);
  };

  const updateCartQuantity = (cartItemId, delta) => {
    setCart(prev => prev.map(item => {
      if (item.cartItemId === cartItemId) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    }).filter(Boolean));
  };

  const removeFromCart = (cartItemId) => {
    setCart(prev => prev.filter(item => item.cartItemId !== cartItemId));
  };

  const clearCart = () => setCart([]);

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);

  const getCartWhatsAppMessage = () => {
    if (cart.length === 0) return '';
    let msg = `Hello ${business.name}, I would like to place an order for the following items:\n\n`;
    cart.forEach((item, index) => {
      msg += `${index + 1}. ${item.title} (${item.variantLabel}) - ${item.quantity}x @ ₹${item.unitPrice} = ₹${item.quantity * item.unitPrice}\n`;
    });
    msg += `\n*Total Amount: ₹${cartTotal}*\n`;
    msg += `Delivery Address: ${business.address}\n\n`;
    msg += `Please confirm my order. Thank you!`;
    return msg;
  };

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
  }, [heroSlides.length]);

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

  // Initialize state from URL query parameters on load (including ?product=id)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlName = params.get('name');
    const urlPhone = params.get('phone');
    const urlAddress = params.get('address');
    const urlProduct = params.get('product');

    if (urlName || urlPhone || urlAddress) {
      const updated = {
        name: urlName || business.name,
        phone: urlPhone ? urlPhone.replace(/[^\d]/g, '') : business.phone,
        address: urlAddress || business.address,
      };
      setBusiness(updated);
      setEditForm(updated);
    }

    if (urlProduct) {
      const pId = parseInt(urlProduct, 10);
      if (!isNaN(pId) && pId >= 1 && pId <= 8) {
        setSelectedProductId(pId);
      }
    }
  }, []);

  // Open Product Detail View & Sync URL
  const openProductDetail = (productId) => {
    setSelectedProductId(productId);
    setSelectedVariantIndex(0);
    setDetailQuantity(1);

    const url = new URL(window.location.href);
    url.searchParams.set('product', productId.toString());
    window.history.pushState({}, '', url.toString());
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Back to Catalog View & Sync URL
  const closeProductDetail = () => {
    setSelectedProductId(null);
    const url = new URL(window.location.href);
    url.searchParams.delete('product');
    window.history.pushState({}, '', url.toString());
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Update business details state and sync URL
  const handleApplyChanges = (e) => {
    e.preventDefault();
    const cleanedPhone = editForm.phone.replace(/[^\d]/g, '');
    const updated = {
      ...editForm,
      phone: cleanedPhone || '919876543210',
    };
    setBusiness(updated);

    const url = new URL(window.location.href);
    url.searchParams.set('name', updated.name);
    url.searchParams.set('phone', updated.phone);
    url.searchParams.set('address', updated.address);
    window.history.replaceState({}, '', url.toString());

    setIsCustomizeOpen(false);
    triggerToast('Shop details updated successfully!');
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
    triggerToast('Reset to default shop details');
  };

  // Copy Shareable Link
  const copyShareableLink = () => {
    const url = new URL(window.location.href);
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

  // Quantity counter helpers for grid cards
  const updateQuantity = (id, delta, e = null) => {
    if (e) e.stopPropagation();
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

  // 8 RICH DETAILED MENU ITEMS DATA FOR CATALOG & AMAZON DETAIL VIEW
  const menuItems = [
    {
      id: 1,
      category: 'sweets',
      title: 'Kaju Katli & Dry Fruit Sweets',
      itemsList: ['Kaju Katli', 'Dry Fruit Barfi', 'Anjeer Roll'],
      basePrice: 450,
      priceBadge: '₹450 / 500g',
      mrp: 500,
      discount: '10% OFF',
      rating: '4.9',
      ratingCount: 184,
      tag: '⭐ Bestseller',
      tagBg: 'bg-amber-500 text-white',
      image: '/images/mithai.jpg',
      description: 'Rich premium Goan cashews and royal dry fruits crafted into melt-in-mouth silver foil squares. Handcrafted fresh every morning using traditional copper vessel methods.',
      variants: [
        { label: '500g Box', multiplier: 1 },
        { label: '1 kg Box', multiplier: 2 },
        { label: '2 kg Family Box', multiplier: 3.8 },
      ],
      specs: {
        ingredients: 'Premium Goan Cashews, Pure Sugar, Edible Silver Leaf (Vark), Cardamom',
        shelfLife: '20 Days at Room Temperature',
        storage: 'Store in a cool, dry place away from direct sunlight.',
      }
    },
    {
      id: 2,
      category: 'sweets',
      title: 'Pure Desi Ghee Motichoor Ladoo',
      itemsList: ['Motichoor Ladoo', 'Besan Ladoo', 'Saffron Boondi'],
      basePrice: 320,
      priceBadge: '₹320 / kg',
      mrp: 360,
      discount: '11% OFF',
      rating: '4.9',
      ratingCount: 215,
      tag: '✨ Pure Ghee',
      tagBg: 'bg-yellow-600 text-white',
      image: '/images/hero.jpg',
      description: 'Golden tiny boondi pearls fried in 100% pure desi ghee, infused with Kashmiri saffron, green cardamom, and garnished with crushed pistachios.',
      variants: [
        { label: '500g Pack', multiplier: 0.5 },
        { label: '1 kg Pack', multiplier: 1 },
        { label: '2 kg Box', multiplier: 1.95 },
      ],
      specs: {
        ingredients: 'Gram Flour (Besan), 100% Pure Desi Ghee, Saffron, Pistachio, Sugar',
        shelfLife: '12 Days',
        storage: 'Keep in airtight container at room temperature.',
      }
    },
    {
      id: 3,
      category: 'cakes',
      title: 'Belgian Chocolate Truffle Cake',
      itemsList: ['Dark Truffle', 'Choco Ganache', 'Eggless Available'],
      basePrice: 550,
      priceBadge: '₹550 / lb',
      mrp: 650,
      discount: '15% OFF',
      rating: '5.0',
      ratingCount: 142,
      tag: '🎂 Rich Chocolate',
      tagBg: 'bg-pink-600 text-white',
      image: '/images/cakes.jpg',
      description: 'Silky smooth 55% Belgian dark chocolate ganache layered between moist cocoa sponge cake. Finished with handcrafted chocolate curls and fresh berries.',
      variants: [
        { label: '1 lb (0.5 kg)', multiplier: 1 },
        { label: '2 lb (1.0 kg)', multiplier: 1.9 },
        { label: '3 lb Party Size', multiplier: 2.8 },
      ],
      specs: {
        ingredients: 'Belgian Dark Chocolate, Dutch Cocoa, Fresh Dairy Cream, Pure Vanilla',
        shelfLife: '3 Days (Refrigerated)',
        storage: 'Refrigerate below 5°C. Serve slightly chilled.',
      }
    },
    {
      id: 4,
      category: 'cakes',
      title: 'Red Velvet Celebration Cake',
      itemsList: ['Cream Cheese', 'Fresh Berries', 'Edible Gold Leaf'],
      basePrice: 600,
      priceBadge: '₹600 / lb',
      mrp: 700,
      discount: '14% OFF',
      rating: '4.8',
      ratingCount: 98,
      tag: '🍓 Premium Cake',
      tagBg: 'bg-red-600 text-white',
      image: '/images/redvelvet.jpg',
      description: 'Velvety crimson buttermilk sponge layered with lush cream cheese frosting, topped with edible flowers and imported fresh berries.',
      variants: [
        { label: '1 lb (0.5 kg)', multiplier: 1 },
        { label: '2 lb (1.0 kg)', multiplier: 1.9 },
        { label: '3 lb Party Size', multiplier: 2.8 },
      ],
      specs: {
        ingredients: 'Philadelphia-style Cream Cheese, Natural Cocoa, Fresh Berries, Butter',
        shelfLife: '3 Days (Refrigerated)',
        storage: 'Keep refrigerated between 2°C - 5°C.',
      }
    },
    {
      id: 5,
      category: 'bakery',
      title: 'Multi-Grain Artisan Bread & Croissants',
      itemsList: ['Butter Croissants', 'Multi-Grain Loaf', 'Dry Fruit Puff'],
      basePrice: 140,
      priceBadge: '₹140 / pack',
      mrp: 160,
      discount: '12% OFF',
      rating: '4.9',
      ratingCount: 160,
      tag: '🥖 Fresh Daily',
      tagBg: 'bg-emerald-600 text-white',
      image: '/images/bakery.jpg',
      description: 'Golden flaky 100% French butter croissants paired with high-fiber multi-grain artisan loaves baked fresh every morning at 6 AM.',
      variants: [
        { label: 'Standard Combo Pack', multiplier: 1 },
        { label: 'Family Jumbo Pack', multiplier: 1.8 },
      ],
      specs: {
        ingredients: 'Whole Wheat Flour, French Butter, Flaxseeds, Sunflower Seeds, Oats',
        shelfLife: '4 Days',
        storage: 'Store in breadbox or cool place. Toast before serving for best crunch.',
      }
    },
    {
      id: 6,
      category: 'bakery',
      title: 'Choco-Chip Almond Cookies Jar',
      itemsList: ['Dark Choco Chips', 'Roasted Almonds', 'Pure Butter'],
      basePrice: 220,
      priceBadge: '₹220 / jar',
      mrp: 250,
      discount: '12% OFF',
      rating: '4.9',
      ratingCount: 110,
      tag: '🍪 Crunchy Jar',
      tagBg: 'bg-amber-700 text-white',
      image: '/images/cookies.jpg',
      description: 'Crunchy slow-baked butter cookies packed with dark chocolate chunks and sliced California almonds, packed in an airtight glass jar.',
      variants: [
        { label: '250g Glass Jar', multiplier: 1 },
        { label: '500g Glass Jar', multiplier: 1.85 },
      ],
      specs: {
        ingredients: 'Pure Butter, California Almonds, 50% Dark Chocolate Chips, Brown Sugar',
        shelfLife: '45 Days',
        storage: 'Keep glass jar tightly sealed in ambient room temperature.',
      }
    },
    {
      id: 7,
      category: 'bakery',
      title: 'Crispy Paneer Bread Pakoda & Dhokla Platter',
      itemsList: ['Paneer Pakoda', 'Khaman Dhokla', 'Tangy Chutney'],
      basePrice: 120,
      priceBadge: '₹120 / plate',
      mrp: 140,
      discount: '14% OFF',
      rating: '4.8',
      ratingCount: 230,
      tag: '🔥 Hot & Crispy',
      tagBg: 'bg-orange-600 text-white',
      image: '/images/snacks.jpg',
      description: 'Hot golden cottage cheese stuffed bread fritters and fluffy Gujarati Khaman Dhokla served live with mint-coriander and sweet tamarind chutneys.',
      variants: [
        { label: 'Single Platter (2 Pcs)', multiplier: 1 },
        { label: 'Party Platter (6 Pcs)', multiplier: 2.7 },
      ],
      specs: {
        ingredients: 'Fresh Malai Paneer, Gram Flour (Besan), Spices, Mint, Tamarind Chutney',
        shelfLife: 'Best Consumed Fresh Same Day',
        storage: 'Serve hot immediately upon delivery.',
      }
    },
    {
      id: 8,
      category: 'hampers',
      title: 'Festive Sweets & Dry Fruit Gift Hamper',
      itemsList: ['Assorted Mithai', 'Roasted Cashews', 'Almonds', 'Royal Box'],
      basePrice: 850,
      priceBadge: '₹850 / box',
      mrp: 999,
      discount: '15% OFF',
      rating: '5.0',
      ratingCount: 88,
      tag: '🎁 Royal Gift',
      tagBg: 'bg-purple-600 text-white',
      image: '/images/hamper.jpg',
      description: 'Curated royal gift box containing luxury silver Kaju Katli, roasted salted cashews, premium almonds, and decorative festive brass diya packaging.',
      variants: [
        { label: 'Classic Gift Box', multiplier: 1 },
        { label: 'Grand Royal Hamper', multiplier: 1.8 },
      ],
      specs: {
        ingredients: 'Assorted Desi Ghee Sweets, Salted Roasted Cashews, California Almonds',
        shelfLife: '30 Days',
        storage: 'Store hamper in ambient temperature away from heat.',
      }
    },
  ];

  const activeProduct = menuItems.find(item => item.id === selectedProductId);

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
      bgColor: 'from-pink-500/10 via-rose-500/10 to-pink-500/20 border-pink-200/80 text-pink-950',
    },
    {
      id: 'wedding',
      icon: '💍',
      title: 'Wedding Bulk Mithai',
      subtitle: 'Royal Sweet Boxes for Guests & Functions',
      bgColor: 'from-amber-500/10 via-yellow-500/10 to-amber-500/20 border-amber-200/80 text-amber-950',
    },
    {
      id: 'hightea',
      icon: '🎉',
      title: 'Office High-Tea',
      subtitle: 'Savory Snacks, Puffs & Bakery Platters',
      bgColor: 'from-orange-500/10 via-amber-500/10 to-orange-500/20 border-orange-200/80 text-orange-950',
    },
    {
      id: 'festive',
      icon: '🎁',
      title: 'Festive Gift Boxes',
      subtitle: 'Diwali, Rakhi & Corporate Hampers',
      bgColor: 'from-purple-500/10 via-indigo-500/10 to-purple-500/20 border-purple-200/80 text-purple-950',
    },
  ];

  // Calculated values for Amazon-style detail view
  const currentVariant = activeProduct ? activeProduct.variants[selectedVariantIndex] || activeProduct.variants[0] : null;
  const unitPrice = activeProduct && currentVariant ? Math.round(activeProduct.basePrice * currentVariant.multiplier) : 0;
  const totalPrice = unitPrice * detailQuantity;

  const detailWhatsAppMessage = activeProduct && currentVariant
    ? `Hello ${business.name}, I want to order ${detailQuantity}x ${activeProduct.title} (${currentVariant.label}) - Total: ₹${totalPrice}. Please confirm delivery to ${business.address}.`
    : '';

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDF9] text-[#1F2937] pb-16 md:pb-0 relative font-sans">
      
      {/* ------------------- TOAST NOTIFICATION ------------------- */}
      {toastMessage && (
        <div className="fixed top-24 right-4 z-50 bg-amber-950 text-white px-4 py-3 rounded-2xl shadow-2xl border border-amber-600/40 flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300">
          <Sparkles className="w-5 h-5 text-amber-400 shrink-0" />
          <span className="text-xs sm:text-sm font-extrabold">{toastMessage}</span>
        </div>
      )}

      {/* ------------------- STICKY HEADER NAVBAR ------------------- */}
      <header className="sticky top-0 z-40 bg-[#FFFDF9]/90 backdrop-blur-md border-b border-amber-900/10 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-3 sm:gap-4">
          
          {/* Logo & Shop Name */}
          <a 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              if (selectedProductId) closeProductDetail();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-3 group"
          >
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-amber-600 via-amber-500 to-amber-400 flex items-center justify-center shadow-md shadow-amber-500/25 group-hover:scale-105 transition-transform duration-300 border border-amber-300/40">
              <span className="text-2xl">🧁</span>
            </div>
            <div>
              <h1 className="font-serif-heading font-extrabold text-lg sm:text-2xl text-amber-950 leading-tight group-hover:text-amber-700 transition-colors">
                {business.name}
              </h1>
              <p className="text-[11px] sm:text-xs text-amber-700/80 font-bold flex items-center gap-1">
                Fresh Mithai & Bakery
              </p>
            </div>
          </a>

          {/* Dynamic Status Badge & Action CTAs */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Status Badge */}
            <div className={`hidden xs:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
              isOpenNow 
                ? 'bg-emerald-50 border-emerald-300 text-emerald-900 shadow-xs' 
                : 'bg-red-50 border-red-300 text-red-900 shadow-xs'
            }`}>
              <span className={`w-2 h-2 rounded-full ${isOpenNow ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`}></span>
              <span className="hidden lg:inline">
                {isOpenNow ? 'Open Now (8:00 AM – 10:30 PM)' : 'Closed Now (Opens 8:00 AM)'}
              </span>
              <span className="lg:hidden">
                {isOpenNow ? 'Open' : 'Closed'}
              </span>
            </div>

            {selectedProductId ? (
              <button
                onClick={closeProductDetail}
                className="inline-flex items-center gap-1.5 text-xs font-extrabold text-amber-950 bg-amber-100/90 hover:bg-amber-200 px-3.5 py-2 rounded-xl border border-amber-300/80 active-scale shadow-xs transition-all"
              >
                <ArrowLeft className="w-4 h-4 text-amber-800" />
                <span>All Products</span>
              </button>
            ) : (
              <button 
                onClick={scrollToMenu}
                className="hidden lg:inline-flex items-center gap-1.5 text-xs font-extrabold text-amber-950 hover:text-amber-700 bg-amber-100/60 hover:bg-amber-100 px-4 py-2 rounded-xl border border-amber-300/50 active-scale transition-all shadow-xs"
              >
                <UtensilsCrossed className="w-3.5 h-3.5 text-amber-700" />
                <span>Menu</span>
              </button>
            )}

            {/* Shopping Cart Header Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative inline-flex items-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-gradient-to-r from-amber-900 via-amber-950 to-amber-900 hover:from-black hover:to-amber-900 text-white text-xs sm:text-sm font-extrabold shadow-glow-amber active-scale transition-all border border-amber-600/30 group"
              title="View Shopping Cart"
            >
              <ShoppingCart className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
              <span className="hidden xs:inline">Cart</span>
              {cartItemCount > 0 && (
                <span className="bg-amber-400 text-amber-950 font-black text-[11px] px-2 py-0.5 rounded-full shadow-sm">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* Pay / Scan QR CTA Header */}
            <button
              onClick={() => setIsQrModalOpen(true)}
              className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-100 to-amber-200/90 hover:from-amber-200 hover:to-amber-300 text-amber-950 text-xs font-extrabold border border-amber-300/90 shadow-glow-gold active-scale transition-all"
            >
              <QrCode className="w-4 h-4 text-amber-800" />
              <span>Pay QR</span>
            </button>

            {/* Call Shop Header Button */}
            <a
              href={getCallLink()}
              className="inline-flex items-center gap-2 px-3.5 py-2 sm:px-4.5 sm:py-2.5 rounded-xl bg-gradient-to-r from-amber-900 via-amber-950 to-amber-900 hover:from-black hover:to-amber-900 text-white text-xs sm:text-sm font-extrabold shadow-glow-amber active-scale transition-all border border-amber-600/30 group"
            >
              <Phone className="w-4 h-4 text-amber-400 group-hover:rotate-12 transition-transform" />
              <span className="hidden sm:inline">Call Shop</span>
            </a>
          </div>

        </div>
      </header>

      {/* ------------------- AMAZON-STYLE PRODUCT DETAIL VIEW (IF SELECTED) ------------------- */}
      {activeProduct ? (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1 space-y-8 animate-in fade-in duration-300">
          
          {/* Top Navigation Breadcrumb / Back Button */}
          <div className="flex items-center justify-between border-b border-amber-900/10 pb-4">
            <button
              onClick={closeProductDetail}
              className="inline-flex items-center gap-2.5 text-xs sm:text-sm font-extrabold text-amber-950 hover:text-amber-700 bg-amber-100/90 hover:bg-amber-200 px-4.5 py-2.5 rounded-xl border border-amber-300/80 active-scale shadow-sm transition-all"
            >
              <ArrowLeft className="w-4 h-4 text-amber-800" />
              <span>← Back to All Sweets & Cakes</span>
            </button>

            <div className="text-xs text-gray-500 font-bold hidden sm:block">
              Category: <span className="text-amber-950 uppercase tracking-wide bg-amber-100 px-2.5 py-1 rounded-md">{activeProduct.category}</span>
            </div>
          </div>

          {/* Amazon 2-Column Split Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Column: Product Image & Badges */}
            <div className="lg:col-span-6 space-y-6">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-amber-100 group">
                <img
                  src={activeProduct.image}
                  alt={activeProduct.title}
                  className="w-full h-[380px] sm:h-[480px] object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Top Badge Overlay */}
                <span className={`absolute top-4 left-4 text-xs font-extrabold px-3.5 py-1.5 rounded-full shadow-lg ${activeProduct.tagBg}`}>
                  {activeProduct.tag}
                </span>

                <span className="absolute top-4 right-4 text-xs font-extrabold px-3.5 py-1.5 bg-white/95 text-amber-950 backdrop-blur-md rounded-xl shadow-md border border-white">
                  100% Pure Desi Ghee
                </span>
              </div>

              {/* Product Feature Pills */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-200/80 text-center space-y-1 shadow-xs">
                  <div className="text-xl">✨</div>
                  <p className="text-[11px] font-extrabold text-amber-950">Pure Ingredients</p>
                </div>
                <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-200/80 text-center space-y-1 shadow-xs">
                  <div className="text-xl">🥖</div>
                  <p className="text-[11px] font-extrabold text-amber-950">Baked Fresh Today</p>
                </div>
                <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-200/80 text-center space-y-1 shadow-xs">
                  <div className="text-xl">🛡️</div>
                  <p className="text-[11px] font-extrabold text-amber-950">FSSAI Certified</p>
                </div>
              </div>
            </div>

            {/* Right Column: Amazon-style Product Options & Pricing */}
            <div className="lg:col-span-6 space-y-6 bg-white p-6 sm:p-8 rounded-3xl border border-amber-900/10 shadow-xl">
              
              {/* Product Title & Ratings */}
              <div className="space-y-2.5 border-b border-gray-100 pb-5">
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-amber-800 px-3 py-1 bg-amber-100/80 rounded-full inline-block">
                  Fresh Speciality
                </span>
                <h2 className="font-serif-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-amber-950 leading-tight">
                  {activeProduct.title}
                </h2>
                
                <div className="flex items-center gap-3 text-xs sm:text-sm">
                  <div className="flex items-center gap-1.5 text-amber-500 font-extrabold bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200">
                    <Star className="w-4 h-4 fill-current text-amber-500" />
                    <span>{activeProduct.rating}</span>
                  </div>
                  <span className="text-gray-500 font-medium">({activeProduct.ratingCount} verified ratings)</span>
                </div>
              </div>

              {/* Pricing Display */}
              <div className="space-y-1">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl sm:text-4xl font-extrabold text-amber-950">
                    ₹{unitPrice}
                  </span>
                  <span className="text-sm text-gray-400 line-through font-semibold">
                    M.R.P: ₹{Math.round(activeProduct.mrp * currentVariant.multiplier)}
                  </span>
                  <span className="text-xs font-extrabold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-lg border border-emerald-300">
                    {activeProduct.discount}
                  </span>
                </div>
                <p className="text-xs text-gray-500 font-medium">Inclusive of all local taxes & fresh packaging</p>
              </div>

              {/* Weight / Variant Radio Selector */}
              <div className="space-y-2.5">
                <label className="block text-xs font-extrabold text-gray-800 uppercase tracking-wider">
                  Select Weight / Pack Variant:
                </label>
                <div className="flex flex-wrap gap-2.5">
                  {activeProduct.variants.map((v, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedVariantIndex(idx)}
                      className={`px-4.5 py-3 rounded-2xl text-xs sm:text-sm font-extrabold border-2 transition-all active-scale ${
                        selectedVariantIndex === idx
                          ? 'bg-gradient-to-r from-amber-950 to-amber-900 text-white border-amber-950 shadow-glow-amber scale-105'
                          : 'bg-amber-50/80 hover:bg-amber-100 text-amber-950 border-amber-200'
                      }`}
                    >
                      {v.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Counter Stepper */}
              <div className="space-y-2.5">
                <label className="block text-xs font-extrabold text-gray-800 uppercase tracking-wider">
                  Quantity:
                </label>
                <div className="inline-flex items-center gap-3 bg-amber-50/80 rounded-2xl px-3.5 py-2 border border-amber-300 shadow-xs">
                  <button
                    onClick={() => setDetailQuantity(prev => Math.max(1, prev - 1))}
                    disabled={detailQuantity <= 1}
                    className="w-9 h-9 rounded-xl flex items-center justify-center bg-white hover:bg-amber-100 text-amber-950 border border-amber-300 font-bold active-scale transition-all disabled:opacity-40 shadow-xs"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-base font-extrabold text-amber-950 w-8 text-center">
                    {detailQuantity}
                  </span>
                  <button
                    onClick={() => setDetailQuantity(prev => prev + 1)}
                    className="w-9 h-9 rounded-xl flex items-center justify-center bg-white hover:bg-amber-100 text-amber-950 border border-amber-300 font-bold active-scale transition-all shadow-xs"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Dynamic Live Calculated Total */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-100/90 via-amber-50 to-amber-100/90 border border-amber-300/80 flex items-center justify-between shadow-xs">
                <div>
                  <span className="text-xs uppercase tracking-wider font-extrabold text-amber-800">Total Order Amount</span>
                  <p className="text-2xl sm:text-3xl font-extrabold text-amber-950">₹{totalPrice}</p>
                </div>
                <span className="text-xs font-extrabold text-emerald-800 bg-emerald-100 px-3.5 py-1.5 rounded-xl border border-emerald-300 shadow-xs">
                  ⚡ Ready to Dispatch
                </span>
              </div>

              {/* Stock & Delivery Badge */}
              <div className="p-4 rounded-2xl bg-emerald-50/90 border border-emerald-200 text-xs font-semibold text-emerald-950 space-y-1 shadow-xs">
                <div className="flex items-center gap-2 font-extrabold">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>In Stock | Prepared Fresh Today</span>
                </div>
                <p className="text-[11px] text-emerald-800 font-medium">
                  🚚 Free local store pickup or doorstep delivery in 5 km radius from {business.address}.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                <a
                  href={`https://wa.me/${business.phone}?text=${encodeURIComponent(detailWhatsAppMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-3 px-6 py-4.5 rounded-2xl bg-gradient-to-r from-[#25D366] to-[#1da851] hover:from-[#20bd5a] hover:to-[#199447] text-white text-base font-extrabold shadow-glow-whatsapp active-scale btn-shimmer-effect transition-all border border-emerald-400/30"
                >
                  <MessageCircle className="w-5 h-5 fill-current" />
                  <span>Buy Now via WhatsApp (₹{totalPrice})</span>
                </a>

                <button
                  onClick={() => addToCart(activeProduct, currentVariant, detailQuantity)}
                  className="w-full inline-flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-amber-900 via-amber-950 to-amber-900 hover:from-black hover:to-amber-900 text-white text-base font-extrabold shadow-glow-amber active-scale btn-shimmer-effect transition-all border border-amber-600/30"
                >
                  <ShoppingCart className="w-5 h-5 text-amber-400" />
                  <span>+ Add to Shopping Cart</span>
                </button>

                <a
                  href={getCallLink()}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl glass-btn text-amber-950 text-sm font-bold active-scale transition-all"
                >
                  <Phone className="w-4 h-4 text-amber-800" />
                  <span>Call Shop for Special Customization</span>
                </a>
              </div>

              {/* Product Specifications & Ingredients Accordion Box */}
              <div className="pt-4 border-t border-gray-100 space-y-3">
                <h4 className="font-serif-heading font-bold text-base text-amber-950 flex items-center gap-2">
                  <Info className="w-4 h-4 text-amber-700" />
                  <span>Product Details & Specs</span>
                </h4>
                
                <p className="text-xs text-gray-600 leading-relaxed font-medium">
                  {activeProduct.description}
                </p>

                <div className="text-xs space-y-2 bg-gray-50/80 p-4 rounded-2xl border border-gray-200/80">
                  <div>
                    <span className="font-bold text-gray-800">Ingredients: </span>
                    <span className="text-gray-600">{activeProduct.specs.ingredients}</span>
                  </div>
                  <div>
                    <span className="font-bold text-gray-800">Shelf Life: </span>
                    <span className="text-gray-600">{activeProduct.specs.shelfLife}</span>
                  </div>
                  <div>
                    <span className="font-bold text-gray-800">Storage Instructions: </span>
                    <span className="text-gray-600">{activeProduct.specs.storage}</span>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </main>
      ) : (
        /* ------------------- MAIN CATALOG GRID VIEW ------------------- */
        <>
          {/* HERO CAROUSEL */}
          <section className="relative overflow-hidden pt-8 pb-12 lg:pt-16 lg:pb-24 bg-gradient-to-b from-amber-50/60 via-[#FFFDF9] to-[#FFFDF9]">
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-amber-200/30 blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-emerald-200/20 blur-3xl pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                {/* Left Content */}
                <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                  
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100/90 border border-amber-300/70 text-amber-950 text-xs sm:text-sm font-extrabold tracking-wide shadow-xs">
                    <Sparkles className="w-4 h-4 text-amber-600 animate-spin" style={{ animationDuration: '6s' }} />
                    <span>{heroSlides[currentSlide].badge}</span>
                  </div>

                  <h2 className="font-serif-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-amber-950 tracking-tight leading-[1.15] min-h-[120px] transition-all duration-500">
                    {heroSlides[currentSlide].title}
                  </h2>

                  <p className="text-lg sm:text-xl text-gray-700 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium min-h-[60px]">
                    {heroSlides[currentSlide].subtitle} Available fresh daily at <strong className="font-extrabold text-amber-950">{business.name}</strong>, {business.address}.
                  </p>

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                    <a
                      href={getWhatsAppLink(heroSlides[currentSlide].title)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#25D366] to-[#1da851] hover:from-[#20bd5a] hover:to-[#199447] text-white text-base font-extrabold shadow-glow-whatsapp active-scale btn-shimmer-effect transition-all border border-emerald-400/30"
                    >
                      <MessageCircle className="w-5 h-5 fill-current" />
                      <span>{heroSlides[currentSlide].ctaText}</span>
                    </a>

                    <button
                      onClick={scrollToMenu}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl glass-btn text-amber-950 text-base font-extrabold active-scale transition-all shadow-sm"
                    >
                      <UtensilsCrossed className="w-5 h-5 text-amber-800" />
                      <span>Explore 8 Specialities</span>
                    </button>
                  </div>

                  <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs sm:text-sm font-extrabold text-gray-700">
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
                    
                    <div className="absolute -inset-3 rounded-3xl bg-gradient-to-tr from-amber-400 via-amber-200 to-amber-500 opacity-40 blur-lg"></div>
                    
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-amber-900 h-[380px] sm:h-[440px]">
                      
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
                          <div className="absolute inset-0 bg-gradient-to-t from-amber-950/85 via-transparent to-transparent"></div>
                          
                          <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-white/40 shadow-lg text-amber-950">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-xs uppercase tracking-wider text-amber-800 font-extrabold">{slide.badge}</p>
                                <p className="font-serif-heading text-base font-bold truncate max-w-[200px] sm:max-w-[240px]">{slide.title}</p>
                              </div>
                              <span className="px-3 py-1 bg-amber-900 text-amber-100 rounded-lg text-xs font-extrabold shadow-xs shrink-0 border border-amber-700">
                                Fresh Daily
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}

                      {/* Carousel Controls */}
                      <button
                        onClick={prevSlide}
                        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-2xl bg-black/40 hover:bg-amber-900/80 text-white flex items-center justify-center backdrop-blur-md border border-white/20 shadow-xl active-scale transition-all group"
                        title="Previous Slide"
                      >
                        <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
                      </button>

                      <button
                        onClick={nextSlide}
                        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-2xl bg-black/40 hover:bg-amber-900/80 text-white flex items-center justify-center backdrop-blur-md border border-white/20 shadow-xl active-scale transition-all group"
                        title="Next Slide"
                      >
                        <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
                      </button>

                      <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-md border border-white/20">
                        {heroSlides.map((_, i) => (
                          <button
                            key={i}
                            onClick={() => setCurrentSlide(i)}
                            className={`h-2.5 rounded-full transition-all active-scale ${
                              i === currentSlide ? 'w-7 bg-amber-400' : 'w-2.5 bg-white/60 hover:bg-white'
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

          {/* 6 TRUST BADGES */}
          <section className="py-10 bg-amber-950 text-white relative border-y border-amber-800/40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
                
                <div className="p-4 rounded-2xl bg-amber-900/50 border border-amber-700/40 flex flex-col items-center text-center space-y-1.5 hover:bg-amber-900/80 transition-colors">
                  <div className="text-2xl">✨</div>
                  <h3 className="font-extrabold text-xs sm:text-sm text-amber-100">100% Pure Ghee</h3>
                  <p className="text-[11px] text-amber-200/70 font-medium">Traditional recipes</p>
                </div>

                <div className="p-4 rounded-2xl bg-amber-900/50 border border-amber-700/40 flex flex-col items-center text-center space-y-1.5 hover:bg-amber-900/80 transition-colors">
                  <div className="text-2xl">🥖</div>
                  <h3 className="font-extrabold text-xs sm:text-sm text-amber-100">Morning Batches</h3>
                  <p className="text-[11px] text-amber-200/70 font-medium">Fresh 6:00 AM bakes</p>
                </div>

                <div className="p-4 rounded-2xl bg-amber-900/50 border border-amber-700/40 flex flex-col items-center text-center space-y-1.5 hover:bg-amber-900/80 transition-colors">
                  <div className="text-2xl">⚡</div>
                  <h3 className="font-extrabold text-xs sm:text-sm text-amber-100">Zero Commission</h3>
                  <p className="text-[11px] text-amber-200/70 font-medium">Direct WhatsApp pricing</p>
                </div>

                <div className="p-4 rounded-2xl bg-amber-900/50 border border-amber-700/40 flex flex-col items-center text-center space-y-1.5 hover:bg-amber-900/80 transition-colors">
                  <div className="text-2xl">🛡️</div>
                  <h3 className="font-extrabold text-xs sm:text-sm text-amber-100">Kitchen Hygiene</h3>
                  <p className="text-[11px] text-amber-200/70 font-medium">FSSAI Certified</p>
                </div>

                <div className="p-4 rounded-2xl bg-amber-900/50 border border-amber-700/40 flex flex-col items-center text-center space-y-1.5 hover:bg-amber-900/80 transition-colors">
                  <div className="text-2xl">🚚</div>
                  <h3 className="font-extrabold text-xs sm:text-sm text-amber-100">5 km Delivery</h3>
                  <p className="text-[11px] text-amber-200/70 font-medium">Same-day fast drop</p>
                </div>

                <div className="p-4 rounded-2xl bg-amber-900/50 border border-amber-700/40 flex flex-col items-center text-center space-y-1.5 hover:bg-amber-900/80 transition-colors">
                  <div className="text-2xl">🎁</div>
                  <h3 className="font-extrabold text-xs sm:text-sm text-amber-100">Gift Packaging</h3>
                  <p className="text-[11px] text-amber-200/70 font-medium">Custom festive boxes</p>
                </div>

              </div>
            </div>
          </section>

          {/* POPULAR OCCASIONS QUICK GRID */}
          <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
              <span className="text-xs font-extrabold uppercase tracking-widest text-amber-800 px-3.5 py-1.5 bg-amber-100 rounded-full inline-block border border-amber-300/60 shadow-xs">
                Special Orders & Events
              </span>
              <h2 className="font-serif-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-amber-950">
                Planning a Celebration or Gift?
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 font-medium">
                Tap any occasion below to inquire about bulk ordering & custom packages directly on WhatsApp.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
              {occasions.map((occ) => (
                <a
                  key={occ.id}
                  href={getOccasionWhatsAppLink(occ.title)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-6 rounded-3xl border bg-gradient-to-b ${occ.bgColor} flex flex-col items-center text-center space-y-3 hover:shadow-xl hover:-translate-y-1.5 active-scale transition-all duration-300 group`}
                >
                  <span className="text-4xl group-hover:scale-110 transition-transform duration-300">{occ.icon}</span>
                  <h3 className="font-serif-heading font-extrabold text-base sm:text-lg">{occ.title}</h3>
                  <p className="text-xs opacity-85 font-medium">{occ.subtitle}</p>
                  
                  <div className="pt-2">
                    <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-amber-950 group-hover:text-amber-700 bg-white/80 group-hover:bg-white px-3.5 py-1.5 rounded-full border border-amber-300/60 shadow-xs transition-all">
                      <span>Inquire Bulk Order</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </section>

          {/* FEATURED MENU CATALOG GRID (#menu-section) */}
          <section id="menu-section" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full scroll-mt-20">
            
            <div className="text-center max-w-3xl mx-auto space-y-4 mb-10">
              <span className="text-xs font-extrabold uppercase tracking-widest text-amber-800 px-3.5 py-1.5 bg-amber-100 rounded-full inline-block border border-amber-300/60 shadow-xs">
                Full Menu Showcase (Click to View Details)
              </span>
              <h2 className="font-serif-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-amber-950">
                Handcrafted Delights & Gourmet Bakery
              </h2>
              <p className="text-gray-600 text-base sm:text-lg font-medium">
                Tap any item card to open full Amazon-style details, or quick-add directly to your shopping cart.
              </p>

              {/* 5 CATEGORY FILTER TABS */}
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 pt-4">
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
                    className={`px-4.5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-300 active-scale ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-amber-950 to-amber-900 text-white shadow-glow-amber scale-105 border border-amber-600/40'
                        : 'bg-amber-100/70 hover:bg-amber-100 text-amber-950 border border-amber-200/60'
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
                return (
                  <div 
                    key={card.id}
                    onClick={() => openProductDetail(card.id)}
                    className="bg-white rounded-3xl border border-amber-900/10 shadow-lg shadow-amber-900/5 overflow-hidden flex flex-col justify-between hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 group cursor-pointer"
                  >
                    {/* Card Top Image & Badges */}
                    <div className="relative h-52 overflow-hidden bg-amber-100">
                      <img
                        src={card.image}
                        alt={card.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                      
                      <span className={`absolute top-4 left-4 text-xs font-extrabold px-3 py-1 rounded-full shadow-md ${card.tagBg}`}>
                        {card.tag}
                      </span>

                      <span className="absolute bottom-4 right-4 text-xs font-extrabold px-3 py-1 bg-white/95 text-amber-950 backdrop-blur-md rounded-lg shadow-md border border-white">
                        {card.priceBadge}
                      </span>
                    </div>

                    {/* Card Body */}
                    <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        <div className="flex items-center justify-between">
                          <h3 className="font-serif-heading text-lg font-extrabold text-amber-950 group-hover:text-amber-700 transition-colors">
                            {card.title}
                          </h3>
                        </div>
                        
                        <div className="flex items-center gap-1 text-amber-500 text-xs font-extrabold mt-1">
                          <Star className="w-3.5 h-3.5 fill-current" />
                          <span>{card.rating}</span>
                          <span className="text-gray-400 font-medium">({card.ratingCount})</span>
                        </div>

                        <p className="text-xs text-gray-600 mt-2 leading-relaxed line-clamp-2 font-medium">
                          {card.description}
                        </p>

                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {card.itemsList.map((item, i) => (
                            <span key={i} className="text-[11px] font-bold px-2 py-0.5 bg-amber-50 text-amber-900 rounded-md border border-amber-200/60">
                              • {item}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Card Action Buttons (View Details + Quick Add to Cart) */}
                      <div className="pt-3.5 border-t border-gray-100 flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openProductDetail(card.id);
                          }}
                          className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-950 text-xs font-extrabold border border-amber-200/80 active-scale transition-all"
                        >
                          <span>Details</span>
                          <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </button>

                        <button
                          onClick={(e) => addToCart(card, card.variants[0], 1, e)}
                          className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-900 to-amber-950 hover:from-black hover:to-amber-950 text-white text-xs font-extrabold shadow-glow-amber active-scale transition-all border border-amber-600/30"
                          title="Add to Shopping Cart"
                        >
                          <ShoppingCart className="w-3.5 h-3.5 text-amber-400" />
                          <span>+ Cart</span>
                        </button>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>

          </section>

          {/* CUSTOMER REVIEWS SECTION */}
          <section className="py-16 bg-gradient-to-b from-amber-50/50 to-[#FFFDF9] border-t border-amber-900/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-100 text-amber-950 rounded-full text-xs font-extrabold border border-amber-300/60 shadow-xs">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <span>4.9 / 5.0 Rating on Google Reviews</span>
                </div>
                <h2 className="font-serif-heading text-3xl sm:text-4xl font-extrabold text-amber-950">
                  Loved by Sweets & Cake Lovers
                </h2>
                <p className="text-gray-600 text-sm sm:text-base font-medium">
                  Here is what our frequent neighborhood customers say about our quality.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                <div className="p-6 rounded-3xl bg-white border border-amber-900/10 shadow-md flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex text-amber-400">
                      {'★'.repeat(5)}
                    </div>
                    <p className="text-gray-700 text-sm italic leading-relaxed font-medium">
                      "The Kaju Katli and Motichoor Ladoos from {business.name} are unbeatable! Pure desi ghee flavor without being overly sweet. Ordered 15 boxes for a family event over WhatsApp, delivered right on time."
                    </p>
                  </div>
                  <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                    <div className="w-9 h-9 rounded-full bg-amber-200 text-amber-950 font-extrabold flex items-center justify-center text-sm shadow-xs">
                      RS
                    </div>
                    <div>
                      <h4 className="text-sm font-extrabold text-gray-900">Rajesh Sharma</h4>
                      <p className="text-xs text-gray-500 font-medium">Verified Google Reviewer</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-3xl bg-white border border-amber-900/10 shadow-md flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex text-amber-400">
                      {'★'.repeat(5)}
                    </div>
                    <p className="text-gray-700 text-sm italic leading-relaxed font-medium">
                      "Ordered a custom chocolate truffle cake for my daughter's birthday. It was fresh, soft, and decorated beautifully! Plus, ordering directly on WhatsApp took less than 2 minutes."
                    </p>
                  </div>
                  <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                    <div className="w-9 h-9 rounded-full bg-pink-200 text-pink-950 font-extrabold flex items-center justify-center text-sm shadow-xs">
                      PK
                    </div>
                    <div>
                      <h4 className="text-sm font-extrabold text-gray-900">Priya Kapoor</h4>
                      <p className="text-xs text-gray-500 font-medium">Local Customer</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-3xl bg-white border border-amber-900/10 shadow-md flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex text-amber-400">
                      {'★'.repeat(5)}
                    </div>
                    <p className="text-gray-700 text-sm italic leading-relaxed font-medium">
                      "Evening samosas and hot dhokla from their store are my daily staple. Super clean hygiene and polite staff. Highly recommend visiting their store at {business.address}!"
                    </p>
                  </div>
                  <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                    <div className="w-9 h-9 rounded-full bg-emerald-200 text-emerald-950 font-extrabold flex items-center justify-center text-sm shadow-xs">
                      AP
                    </div>
                    <div>
                      <h4 className="text-sm font-extrabold text-gray-900">Amit Patel</h4>
                      <p className="text-xs text-gray-500 font-medium">Regular Buyer</p>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </section>
        </>
      )}

      {/* ------------------- FOOTER & LOCATION DETAILS ------------------- */}
      <footer className="bg-amber-950 text-amber-100 pt-16 pb-12 mt-auto border-t border-amber-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-amber-800/60">
            
            {/* Column 1: Business Info */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500 text-amber-950 flex items-center justify-center text-xl font-bold">
                  🧁
                </div>
                <h3 className="font-serif-heading text-2xl font-extrabold text-white">
                  {business.name}
                </h3>
              </div>
              <p className="text-sm text-amber-200/80 leading-relaxed font-medium">
                Your trusted local Sweet Shop & Bakery, serving fresh desi ghee mithai, custom cakes, and oven-baked savories daily with zero commission online ordering.
              </p>
              
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-extrabold flex items-center gap-2 shadow-glow-whatsapp active-scale transition-all"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>WhatsApp Order</span>
                </a>

                <button
                  onClick={() => setIsQrModalOpen(true)}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-amber-950 text-xs font-extrabold flex items-center gap-2 shadow-glow-gold active-scale transition-all"
                >
                  <QrCode className="w-4 h-4" />
                  <span>💳 Pay / Scan QR</span>
                </button>
              </div>
            </div>

            {/* Column 2: Location & Map Navigation */}
            <div className="md:col-span-4 space-y-4">
              <h4 className="font-serif-heading text-lg font-extrabold text-white flex items-center gap-2">
                <MapPin className="w-5 h-5 text-amber-400" />
                <span>Store Location</span>
              </h4>
              <p className="text-sm text-amber-200/90 leading-relaxed font-medium">
                {business.address}
              </p>
              <div>
                <a
                  href={getMapsLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-extrabold text-amber-300 hover:text-amber-100 underline decoration-amber-400/50 underline-offset-4 active-scale transition-all"
                >
                  <span>Open in Google Maps Navigation</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Column 3: Operational Hours */}
            <div className="md:col-span-3 space-y-4">
              <h4 className="font-serif-heading text-lg font-extrabold text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-amber-400" />
                <span>Opening Hours</span>
              </h4>
              <ul className="text-xs space-y-2 text-amber-200/80 font-medium">
                <li className="flex justify-between py-1 border-b border-amber-900">
                  <span>Monday - Sunday:</span>
                  <span className="font-extrabold text-amber-100">8:00 AM – 10:30 PM</span>
                </li>
                <li className="flex justify-between py-1 border-b border-amber-900">
                  <span>Current Status:</span>
                  <span className={`font-extrabold ${isOpenNow ? 'text-emerald-400' : 'text-red-400'}`}>
                    {isOpenNow ? '🟢 Open Now' : '🔴 Closed'}
                  </span>
                </li>
                <li className="flex justify-between py-1">
                  <span>Delivery Available:</span>
                  <span className="font-extrabold text-emerald-400">All Day (5 km)</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Footer Copyright Bottom */}
          <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-amber-300/70 font-medium gap-4">
            <p>© {new Date().getFullYear()} {business.name}. All rights reserved.</p>
            <p className="flex items-center gap-1">
              <span>Powered by Direct WhatsApp Order System</span>
            </p>
          </div>

        </div>
      </footer>

      {/* ------------------- MOBILE STICKY ACTION BAR (< 768px) ------------------- */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-2xl p-2.5 grid grid-cols-4 gap-2">
        <a
          href={getCallLink()}
          className="flex flex-col items-center justify-center py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-950 font-extrabold text-[11px] active-scale transition-all border border-amber-200/70"
        >
          <Phone className="w-4 h-4 text-amber-800 mb-0.5" />
          <span>Call</span>
        </a>

        <button
          onClick={() => setIsQrModalOpen(true)}
          className="flex flex-col items-center justify-center py-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-950 font-extrabold text-[11px] active-scale transition-all border border-amber-300/80"
        >
          <QrCode className="w-4 h-4 text-amber-800 mb-0.5" />
          <span>Pay QR</span>
        </button>

        <button
          onClick={() => setIsCartOpen(true)}
          className="relative flex flex-col items-center justify-center py-2 rounded-xl bg-amber-950 hover:bg-black text-white font-extrabold text-[11px] active-scale transition-all border border-amber-600/40"
        >
          <ShoppingCart className="w-4 h-4 text-amber-400 mb-0.5" />
          <span>Cart</span>
          {cartItemCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-amber-500 text-amber-950 font-black text-[9px] w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
              {cartItemCount}
            </span>
          )}
        </button>

        <a
          href={activeProduct ? `https://wa.me/${business.phone}?text=${encodeURIComponent(detailWhatsAppMessage)}` : getWhatsAppLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-2 rounded-xl bg-[#25D366] text-white font-extrabold text-[11px] shadow-md active-scale transition-all"
        >
          <MessageCircle className="w-4 h-4 fill-current mb-0.5" />
          <span>WhatsApp</span>
        </a>
      </div>

      {/* ------------------- FLOATING QUICK-EDIT BUTTON ------------------- */}
      <div className="fixed bottom-20 md:bottom-6 left-6 z-40">
        <button
          onClick={() => setIsCustomizeOpen(!isCustomizeOpen)}
          className="inline-flex items-center gap-2.5 px-5 py-3.5 rounded-full bg-gradient-to-r from-amber-950 via-black to-amber-950 text-amber-300 font-extrabold text-xs sm:text-sm shadow-glow-amber border-2 border-amber-500/40 hover:scale-105 active-scale transition-all group"
          title="Click to edit shop details dynamically"
        >
          <Settings className="w-4 h-4 text-amber-400 group-hover:rotate-90 transition-transform duration-300" />
          <span>⚙️ Customize Preview</span>
        </button>
      </div>

      {/* ------------------- SHOPPING CART SLIDE-OVER DRAWER ------------------- */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-md h-full flex flex-col shadow-2xl border-l border-amber-900/10 animate-in slide-in-from-right duration-300">
            
            {/* Cart Drawer Header */}
            <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-amber-50/60">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-950 text-amber-400 flex items-center justify-center font-bold">
                  <ShoppingCart className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif-heading text-xl font-extrabold text-amber-950">
                    Your Shopping Cart
                  </h3>
                  <p className="text-xs text-gray-500 font-medium">
                    {cartItemCount} {cartItemCount === 1 ? 'item' : 'items'} in cart
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsCartOpen(false)}
                className="w-9 h-9 rounded-full bg-white hover:bg-gray-200 text-gray-600 flex items-center justify-center transition-colors shadow-xs"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Drawer Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-16 space-y-4">
                  <div className="text-5xl">🛒</div>
                  <h4 className="font-serif-heading text-lg font-bold text-gray-800">Your cart is currently empty</h4>
                  <p className="text-xs text-gray-500 max-w-xs mx-auto">
                    Browse our sweets, cakes, and bakery items and click "+ Cart" to add fresh treats!
                  </p>
                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      scrollToMenu();
                    }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-950 text-white text-xs font-extrabold shadow-glow-amber active-scale transition-all"
                  >
                    <span>Browse Full Menu</span>
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div 
                    key={item.cartItemId}
                    className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200/70 flex items-center justify-between gap-4 shadow-xs"
                  >
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-16 h-16 rounded-xl object-cover border border-amber-200 shrink-0" 
                    />
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="font-extrabold text-xs text-amber-950 truncate">{item.title}</h4>
                      <p className="text-[11px] text-gray-500 font-bold">{item.variantLabel}</p>
                      <p className="text-xs font-extrabold text-amber-900 mt-1">₹{item.unitPrice} each</p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <div className="flex items-center gap-1.5 bg-white px-2 py-1 rounded-xl border border-amber-200">
                        <button
                          onClick={() => updateCartQuantity(item.cartItemId, -1)}
                          className="w-6 h-6 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-950 flex items-center justify-center font-bold"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-extrabold text-amber-950 w-5 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateCartQuantity(item.cartItemId, 1)}
                          className="w-6 h-6 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-950 flex items-center justify-center font-bold"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.cartItemId)}
                        className="w-8 h-8 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 flex items-center justify-center transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Cart Drawer Footer */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-gray-100 bg-white space-y-4 shadow-xl">
                
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-[11px] font-bold text-emerald-900 flex items-center gap-2">
                  <Truck className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>Free doorstep delivery within 5 km radius!</span>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-gray-500 font-semibold">
                    <span>Subtotal ({cartItemCount} items):</span>
                    <span>₹{cartTotal}</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 font-semibold">
                    <span>Packaging & Taxes:</span>
                    <span className="text-emerald-700 font-extrabold">FREE</span>
                  </div>
                  <div className="flex justify-between text-base font-extrabold text-amber-950 pt-2 border-t border-gray-100">
                    <span>Grand Total:</span>
                    <span className="text-xl">₹{cartTotal}</span>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <a
                    href={`https://wa.me/${business.phone}?text=${encodeURIComponent(getCartWhatsAppMessage())}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-3 py-4 rounded-2xl bg-gradient-to-r from-[#25D366] to-[#1da851] hover:from-[#20bd5a] hover:to-[#199447] text-white font-extrabold text-base shadow-glow-whatsapp active-scale btn-shimmer-effect transition-all border border-emerald-400/30"
                  >
                    <MessageCircle className="w-5 h-5 fill-current" />
                    <span>Checkout & Order via WhatsApp (₹{cartTotal})</span>
                  </a>

                  <button
                    onClick={clearCart}
                    className="w-full py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-extrabold active-scale transition-all"
                  >
                    Clear Cart
                  </button>
                </div>

              </div>
            )}

          </div>
        </div>
      )}

      {/* ------------------- CUSTOMIZE DRAWER MODAL ------------------- */}
      {isCustomizeOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-amber-900/10 space-y-6 animate-in fade-in zoom-in duration-200 relative">
            
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div>
                <h3 className="font-serif-heading text-xl font-extrabold text-amber-950 flex items-center gap-2">
                  <span>⚙️ Customize Preview State</span>
                </h3>
                <p className="text-xs text-gray-500 mt-1 font-medium">
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

            <form onSubmit={handleApplyChanges} className="space-y-4">
              
              <div>
                <label className="block text-xs font-extrabold text-gray-700 uppercase tracking-wider mb-1">
                  Shop Name
                </label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  placeholder="e.g. Royal Sweets & Bakery"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-amber-600 focus:ring-2 focus:ring-amber-500/20 text-sm font-semibold outline-none transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-gray-700 uppercase tracking-wider mb-1">
                  WhatsApp / Call Phone Number (Country code + digits)
                </label>
                <input
                  type="text"
                  value={editForm.phone}
                  onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                  placeholder="e.g. 919876543210"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-amber-600 focus:ring-2 focus:ring-amber-500/20 text-sm font-semibold outline-none transition-all"
                  required
                />
                <p className="text-[11px] text-gray-500 mt-1 font-medium">
                  Only digits with country code (e.g. 919876543210). Used in `wa.me/` and `tel:`.
                </p>
              </div>

              <div>
                <label className="block text-xs font-extrabold text-gray-700 uppercase tracking-wider mb-1">
                  Store Address
                </label>
                <textarea
                  rows={2}
                  value={editForm.address}
                  onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                  placeholder="e.g. Main Market, Clock Tower, City Center"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-amber-600 focus:ring-2 focus:ring-amber-500/20 text-sm font-semibold outline-none transition-all resize-none"
                  required
                />
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={copyShareableLink}
                  className={`w-full py-3.5 px-5 rounded-xl font-extrabold text-sm flex items-center justify-center gap-2 border active-scale transition-all ${
                    copiedUrl 
                      ? 'bg-gradient-to-r from-emerald-600 to-emerald-700 text-white border-emerald-600 shadow-glow-whatsapp' 
                      : 'bg-amber-100 hover:bg-amber-200/90 text-amber-950 border-amber-300 shadow-xs'
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

              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="submit"
                  className="w-full sm:flex-1 py-3.5 px-5 rounded-xl bg-gradient-to-r from-amber-900 via-amber-950 to-amber-900 hover:from-black hover:to-amber-900 text-white font-extrabold text-sm shadow-glow-amber active-scale transition-all border border-amber-600/30"
                >
                  Apply & Save Changes
                </button>

                <button
                  type="button"
                  onClick={handleResetDefaults}
                  className="w-full sm:w-auto py-3.5 px-5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs active-scale transition-all"
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
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-950 flex items-center justify-center mx-auto mb-2 shadow-xs">
                <QrCode className="w-6 h-6 text-amber-800" />
              </div>
              <h3 className="font-serif-heading text-xl font-extrabold text-amber-950">
                Scan & Pay via UPI
              </h3>
              <p className="text-xs text-gray-500 font-medium mt-1">
                Direct store payment for {business.name}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-gradient-to-b from-amber-50 to-amber-100/70 border border-amber-200 flex flex-col items-center justify-center space-y-3 shadow-xs">
              
              <div className="w-48 h-48 bg-white p-3 rounded-2xl border-2 border-amber-900/20 shadow-md flex items-center justify-center relative">
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

              <div className="w-full bg-white px-3 py-2 rounded-xl border border-amber-200 flex items-center justify-between text-xs shadow-xs">
                <div className="truncate text-left">
                  <span className="text-[10px] text-gray-500 block uppercase font-bold">UPI ID</span>
                  <span className="font-extrabold text-amber-950">{business.phone}@upi</span>
                </div>
                
                <button
                  onClick={copyUpiId}
                  className={`px-3 py-1.5 rounded-lg font-extrabold text-[11px] flex items-center gap-1.5 active-scale transition-all ${
                    copiedUpi 
                      ? 'bg-emerald-600 text-white shadow-xs' 
                      : 'bg-amber-100 hover:bg-amber-200 text-amber-950 border border-amber-300/60'
                  }`}
                >
                  {copiedUpi ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-amber-800" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

            </div>

            <div className="text-[11px] text-gray-500 font-semibold space-y-1">
              <p>Accepts GPay, PhonePe, Paytm & all UPI apps</p>
              <p className="text-[10px] text-amber-700 italic font-bold">
                * Please share screenshot of payment on WhatsApp after paying.
              </p>
            </div>

            <button
              onClick={() => setIsQrModalOpen(false)}
              className="w-full py-3 rounded-xl bg-amber-950 hover:bg-black text-white font-extrabold text-xs shadow-glow-amber active-scale transition-all"
            >
              Done / Close
            </button>

          </div>
        </div>
      )}

    </div>
  );
}
