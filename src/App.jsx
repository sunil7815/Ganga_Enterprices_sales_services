import { useEffect, useMemo, useState } from 'react'
import './App.css'
import business from './config/business'
import DirectionsButton from './components/DirectionsButton'

import ownerPortfolio from '/owner_image.png'
import heroImage from '/shop-banner.jpeg'

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'DTH', href: '#dth' },
  { label: 'Products', href: '#products' },
  { label: 'CCTV', href: '#cctv' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Location', href: '#location' },
  { label: 'Contact', href: '#contact' },
]

const portfolioCards = [
  { number: '01', title: 'DTH Installation', text: 'Professional dish installation, positioning and setup assistance.' },
  { number: '02', title: 'DTH Activation', text: 'Set-top box activation and connection support.' },
  { number: '03', title: 'Dish Alignment', text: 'Signal optimization and satellite dish alignment.' },
  { number: '04', title: 'Set-Top Box Setup', text: 'Installation, configuration and basic troubleshooting.' },
  { number: '05', title: 'Technical Troubleshooting', text: 'Practical assistance for common DTH and signal-related issues.' },
  { number: '06', title: 'CCTV Installation', text: 'Camera installation, configuration and technical support.' },
  { number: '07', title: 'Accessories Support', text: 'Batteries, remotes, HDMI cables, mice and other essential items.' },
  { number: '08', title: 'Customer Service', text: 'Direct local assistance through the shop and technician.' },
]

const dthServices = [
  'New DTH Connection',
  'Dish Installation',
  'Dish Alignment',
  'Set-Top Box Installation',
  'Activation Support',
  'Signal Troubleshooting',
  'Relocation Support',
  'Recharge Assistance',
  'Channel / Pack Assistance',
  'Remote Configuration',
]

const dthPlatforms = [
  {
    name: 'TATA PLAY',
    services: ['New connection assistance', 'Installation', 'Activation', 'Recharge assistance', 'Set-top box support', 'Signal troubleshooting'],
    cta: 'Get Tata Play Support',
  },
  {
    name: 'AIRTEL DIGITAL TV',
    services: ['New connection assistance', 'Installation support', 'Activation', 'Recharge assistance', 'Set-top box support', 'Troubleshooting'],
    cta: 'Get Airtel Support',
  },
  {
    name: 'VIDEOCON D2H',
    services: ['Installation', 'Activation', 'Recharge assistance', 'Set-top box support', 'Signal troubleshooting'],
    cta: 'Get d2h Support',
  },
  {
    name: 'SUN DIRECT',
    services: ['Installation', 'Activation', 'Recharge assistance', 'Setup-box support', 'Signal troubleshooting'],
    cta: 'Get Sun Direct Support',
  },
]

const setTopBoxes = [
  { name: 'Tata Play Set-Top Box', description: 'Connection and setup support for Tata Play equipment.', availability: 'Installation availability on request', cta: 'Ask About Availability' },
  { name: 'Airtel Digital TV Set-Top Box', description: 'Support for Airtel set-top box setup and activation assistance.', availability: 'Activation support available', cta: 'Ask About Availability' },
  { name: 'Videocon d2h Set-Top Box', description: 'Installation and troubleshooting support for d2h equipment.', availability: 'Setup support available', cta: 'Ask About Availability' },
  { name: 'Sun Direct Set-Top Box', description: 'Technical help for set-top box installation and signal issues.', availability: 'Installation support on request', cta: 'Ask About Availability' },
]

const batteryItems = [
  { name: 'AAA Batteries', type: 'Dry Cell', use: 'Remote controls, clocks and small devices', price: 'Check with shop', availability: 'Check current availability' },
  { name: 'AA Batteries', type: 'Dry Cell', use: 'TV remotes, toys and general devices', price: 'Check with shop', availability: 'Check current availability' },
  { name: 'Lithium Coin Cell', type: 'CR2032 / CR2025', use: 'TV and AC remotes', price: 'Check with shop', availability: 'Check current availability' },
  { name: 'Rechargeable Cells', type: 'Rechargeable', use: 'Portable electronics and utility devices', price: 'Check with shop', availability: 'Check current availability' },
]

const accessoryCategories = [
  'TV Remotes',
  'DTH / Set-Top Box Remotes',
  'AC Remotes',
  'HDMI Cables',
  'Computer Mice',
  'Batteries',
  'DTH Accessories',
]

const electronicsProducts = [
  'HDMI cables',
  'Computer mice',
  'Batteries',
  'TV remotes',
  'AC remotes',
  'Set-top box remotes',
  'DTH accessories',
  'Essential small electronic items',
]

const reasonCards = [
  { title: '14+ Years Experience', text: 'Practical field experience built over years of technical service.' },
  { title: 'Multiple DTH Platforms', text: 'Support across major DTH platforms.' },
  { title: 'Local Physical Shop', text: 'Visit us directly for products and technical assistance.' },
  { title: 'Experienced Technician', text: 'Hands-on support for installation and troubleshooting.' },
  { title: 'DTH + CCTV', text: 'Entertainment and security technology support in one place.' },
  { title: 'Direct Communication', text: 'Call or WhatsApp for quick assistance.' },
]

const steps = [
  { title: 'Tell Us What You Need', text: 'Call, WhatsApp or submit a service request.' },
  { title: 'Get the Right Guidance', text: 'Explain your DTH, CCTV or accessory requirement.' },
  { title: 'Technician Support', text: 'For installation or physical technical work, connect with the technician.' },
  { title: 'Service & Setup', text: 'Installation, configuration, repair or troubleshooting is completed as required.' },
  { title: 'Stay Connected', text: 'Contact Ganga Enterprises again whenever technical support is needed.' },
]

const serviceHighlights = [
  { icon: '⚡', title: 'Fast Support', text: 'Quick response for DTH, recharge and setup issues.' },
  { icon: '📍', title: 'Local Access', text: 'Direct shop support near Pullagandlu / Pulivendula.' },
  { icon: '🛡️', title: 'Trusted Care', text: 'Professional and practical technical assistance.' },
  { icon: '💬', title: 'WhatsApp Ready', text: 'Simple communication for bookings and questions.' },
]

const qrBlocks = Array.from({ length: 64 }, (_, index) => {
  const row = Math.floor(index / 8)
  const col = index % 8
  const finderPattern =
    (row < 3 && col < 3) ||
    (row < 3 && col > 4) ||
    (row > 4 && col < 3)

  return finderPattern || ((row > 2 && row < 6 && col > 2 && col < 6) && ((row + col) % 2 === 0)) || ((row + col) % 5 === 0)
})

const faqs = [
  { question: 'Do you provide new DTH connections?', answer: 'Yes. Ganga Enterprises provides assistance for new DTH connections, installation and setup for supported platforms.' },
  { question: 'Which DTH platforms do you support?', answer: 'Tata Play, Airtel Digital TV, Videocon d2h and Sun Direct.' },
  { question: 'Do you provide DTH installation?', answer: 'Yes. Installation, dish alignment, set-top box setup and related technical assistance are available.' },
  { question: 'Do you provide DTH recharge assistance?', answer: 'Yes. Recharge assistance is available for supported DTH platforms.' },
  { question: 'Do you install CCTV cameras?', answer: 'Yes. CCTV installation, configuration and technical support are available through the technician.' },
  { question: 'Do you sell TV remotes?', answer: 'Yes. Common TV, AC and DTH/set-top box remotes may be available. Customers can contact the shop to check availability.' },
  { question: 'Do you sell batteries?', answer: 'Yes. Common AA, AAA, lithium coin cells and other batteries may be available depending on stock.' },
  { question: 'Where is Ganga Enterprises located?', answer: 'The shop is near Pullagandlu / Pulivendula, Andhra Pradesh, opposite APGB.' },
  { question: 'How can I contact the technician?', answer: 'Call or WhatsApp Ganga Enterprises at 9014415590.' },
]

const serviceBenefits = [
  'DTH installation and setup',
  'Recharge support assistance',
  'CCTV installation support',
  'Local shop access',
  'Direct technician communication',
  'Essential accessories and remotes',
]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [tab, setTab] = useState('Batteries')
  const [cart, setCart] = useState([])
  const [scrollY, setScrollY] = useState(0)
  const [chatInput, setChatInput] = useState('')
  const [chatMessages, setChatMessages] = useState([
    { type: 'bot', text: 'Hi! Ask about DTH, recharge, CCTV or accessories and I will guide you.' },
  ])
  const [rechargeForm, setRechargeForm] = useState({
    provider: 'Tata Play',
    customerId: '',
    amount: '',
  })
  const [paymentForm, setPaymentForm] = useState({
    method: 'UPI',
    customerName: '',
    phone: '',
    amount: '500',
    status: 'idle',
    message: 'Ready to send a payment request.',
  })

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const activeProducts = useMemo(() => {
    const products = {
      Batteries: batteryItems,
      'Remotes & Accessories': [
        { name: 'TV Remote', type: 'Remote Control', use: 'TV replacement and setup needs', price: 'Check with shop', availability: 'Check current availability' },
        { name: 'Set-Top Box Remote', type: 'Control Device', use: 'DTH and set-top box operation', price: 'Check with shop', availability: 'Check current availability' },
        { name: 'AC Remote', type: 'Remote Control', use: 'Air conditioner replacement', price: 'Check with shop', availability: 'Check current availability' },
        { name: 'HDMI Cable', type: 'Video Cable', use: 'Home theatre and display setup', price: 'Check with shop', availability: 'Check current availability' },
      ],
    }

    return products[tab] || batteryItems
  }, [tab])

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0)

  const addToCart = (product) => {
    setCart((current) => {
      const existing = current.find((item) => item.name === product.name)
      if (existing) {
        return current.map((item) =>
          item.name === product.name ? { ...item, qty: item.qty + 1 } : item,
        )
      }

      return [...current, { ...product, qty: 1 }]
    })
  }

  const handleRechargeSubmit = (event) => {
    event.preventDefault()
    const message = encodeURIComponent(
      `Hello Ganga Enterprises, I need recharge assistance. Provider: ${rechargeForm.provider}. Customer ID: ${rechargeForm.customerId || 'Not provided'}. Amount: ${rechargeForm.amount || 'Not provided'}.`,
    )
    window.open(`https://wa.me/${business.whatsapp}?text=${message}`, '_blank', 'noopener,noreferrer')
  }

  const handleChatSubmit = (event) => {
    event.preventDefault()
    const value = chatInput.trim()
    if (!value) return

    const lower = value.toLowerCase()
    let response = 'For quick support, call or WhatsApp Ganga Enterprises at 9014415590.'

    if (lower.includes('signal') || lower.includes('dish') || lower.includes('no signal')) {
      response = 'Dish alignment, cable connection and set-top box configuration are common causes for signal issues. Contact Ganga Enterprises for technician support.'
    } else if (lower.includes('tata') || lower.includes('airtel') || lower.includes('d2h') || lower.includes('sun')) {
      response = 'Ganga Enterprises supports Tata Play, Airtel Digital TV, Videocon d2h and Sun Direct for installation, activation and recharge assistance.'
    } else if (lower.includes('cctv') || lower.includes('camera')) {
      response = 'Yes. CCTV installation, camera configuration and technical support are available through the technician.'
    } else if (lower.includes('recharge')) {
      response = 'Recharge assistance is available for supported DTH platforms. You can request this directly on WhatsApp.'
    } else if (lower.includes('battery') || lower.includes('remote') || lower.includes('hdmi')) {
      response = 'Common batteries, remotes and HDMI cables may be available at the local shop. Please check with the shop or WhatsApp the team.'
    }

    setChatMessages((current) => [
      ...current,
      { type: 'user', text: value },
      { type: 'bot', text: response },
    ])
    setChatInput('')
  }

  const handlePaymentSubmit = (event) => {
    event.preventDefault()

    const customerName = paymentForm.customerName.trim()
    const phone = paymentForm.phone.trim()
    const amount = Number(paymentForm.amount)

    if (!customerName || !phone || !amount || amount <= 0) {
      setPaymentForm((current) => ({
        ...current,
        status: 'error',
        message: 'Please complete the payment details before continuing.',
      }))
      return
    }

    const upiUrl = `upi://pay?pa=${encodeURIComponent(business.upiId)}&pn=${encodeURIComponent(business.upiName)}&am=${amount.toFixed(2)}&cu=INR&tn=${encodeURIComponent(`Payment for ${customerName} - ${phone}`)}`

    setPaymentForm((current) => ({
      ...current,
      status: 'processing',
      message: `Opening UPI app for ${current.customerName}...`,
    }))

    try {
      window.location.href = upiUrl
    } catch (error) {
      console.error('UPI launch failed', error)
    }

    window.setTimeout(() => {
      setPaymentForm((current) => ({
        ...current,
        status: 'success',
        message: `UPI request ready. Please pay to ${business.upiId} or scan the QR code using your UPI app.`,
      }))
    }, 1200)
  }

  const handleCopyUpiId = async () => {
    try {
      await navigator.clipboard.writeText(business.upiId)
      setPaymentForm((current) => ({
        ...current,
        status: 'success',
        message: `UPI ID copied: ${business.upiId}`,
      }))
    } catch (error) {
      setPaymentForm((current) => ({
        ...current,
        status: 'error',
        message: 'Copy failed. Please copy the UPI ID manually.',
      }))
    }
  }

  return (
    <div className="site-shell">
      <header className="topbar" id="home">
        <div className="wrap nav-row">
          <a href="#home" className="brand-wrap" aria-label="Ganga Enterprises home">
            <span className="brand-mark" aria-hidden="true" />
            <span className="brand-name">GANGA ENTERPRISES</span>
          </a>

          <nav className="main-nav" aria-label="Main navigation">
            {navItems.map((item) => (
              <a key={item.label} href={item.href}>{item.label}</a>
            ))}
          </nav>

          <div className="nav-actions">
            <a href="tel:+919014415590" className="primary-btn small">Call Now</a>
            <a href="https://wa.me/919849490171?text=Hello%20Ganga%20Enterprises%2C%20I%20need%20support." className="secondary-btn small" target="_blank" rel="noreferrer">WhatsApp</a>
          </div>

          <button
            type="button"
            className="menu-toggle"
            onClick={() => setMenuOpen((current) => !current)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            ☰
          </button>
        </div>

        {menuOpen && (
          <div className="mobile-menu">
            {navItems.map((item) => (
              <a key={item.label} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}</a>
            ))}
          </div>
        )}
      </header>

      <main>
        <section className="hero-section">
          <div className="wrap hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">GANGA ENTERPRISES</p>
              <h1>Your Trusted DTH & Technical Service Partner</h1>
              <h2>14+ Years of DTH, CCTV & Technical Service Experience</h2>
              <p className="lead">
                Ganga Enterprises provides DTH installation, activation, recharge assistance,
                technical support, CCTV installation and essential electronic accessories from our local shop near Pullagandlu,
                Pulivendula, Andhra Pradesh.
              </p>

              <div className="hero-actions">
                <a href="tel:+919014415590" className="primary-btn">Call Now</a>
                <DirectionsButton className="secondary-btn" label="Get Directions" />
                <a href="https://wa.me/919849490171?text=Hello%20Ganga%20Enterprises%2C%20I%20need%20assistance." className="accent-btn" target="_blank" rel="noreferrer">Chat on WhatsApp</a>
              </div>

              <div className="hero-meta">
                <span>📍 Near Pullagandlu / Pulivendula</span>
                <span>📞 9014415590</span>
                <span>🛠️ DTH • CCTV • Recharge • Accessories</span>
              </div>

              <div className="hero-badges" aria-label="Business highlights">
                <span>Trusted Local Shop</span>
                <span>Same-Day Support</span>
                <span>WhatsApp Booking</span>
              </div>
            </div>

            <div className="hero-visual" style={{ transform: `translateY(${Math.min(scrollY * 0.08, 18)}px)` }}>
              <img src={heroImage} alt="Ganga Enterprises local shop and technical service" />
              <div className="floating-card">
                <strong>Local Service</strong>
                <span>Opposite APGB</span>
              </div>
            </div>
          </div>
        </section>

        <section className="stats-strip">
          <div className="wrap stats-grid">
            <div className="stat-box"><strong>14+</strong><span>Years Experience</span></div>
            <div className="stat-box"><strong>4+</strong><span>DTH Platforms</span></div>
            <div className="stat-box"><strong>Local</strong><span>Physical Shop</span></div>
            <div className="stat-box"><strong>Direct</strong><span>Technician Support</span></div>
          </div>
        </section>

        <section className="content-section highlight-band">
          <div className="wrap highlight-grid">
            {serviceHighlights.map((item) => (
              <article className="highlight-card" key={item.title}>
                <span className="highlight-icon" aria-hidden="true">{item.icon}</span>
                <h4>{item.title}</h4>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="about" className="content-section intro-section">
          <div className="wrap intro-grid">
            <div className="intro-image-wrap">
              <img src={ownerPortfolio} alt="Ganga Enterprises founder and service owner" />
            </div>
            <div className="intro-copy">
              <p className="section-label">About Ganga Enterprises</p>
              <h3>14+ Years of Practical Experience in DTH & Technical Services</h3>
              <p>
                Ganga Enterprises is a local DTH and technical service business built on more than 14 years of hands-on field experience.
              </p>
              <p>
                The business provides DTH installation, activation, dish alignment, set-top box setup, recharge assistance, troubleshooting and technical support across multiple DTH platforms.
              </p>
              <p>
                Along with DTH services, Ganga Enterprises also provides CCTV camera installation and support through an experienced technician. Customers can also visit the physical shop for batteries, TV and set-top box remotes, HDMI cables, computer mice, DTH accessories and Xerox services.
              </p>
              <a href="#services" className="primary-btn inline-btn">Explore Our Services</a>
            </div>
          </div>
        </section>

        <section id="portfolio" className="content-section portfolio-section">
          <div className="wrap">
            <div className="section-head">
              <p className="section-label">Our Portfolio</p>
              <h3>14+ Years of Hands-On Technical Experience</h3>
              <p>
                Over the years, Ganga Enterprises has developed practical field experience in DTH installation, satellite dish setup, activation, set-top box configuration, signal troubleshooting and customer technical support.
              </p>
            </div>

            <div className="portfolio-grid">
              {portfolioCards.map((card) => (
                <article className="portfolio-card" key={card.number}>
                  <div className="portfolio-number">{card.number}</div>
                  <h4>{card.title}</h4>
                  <p>{card.text}</p>
                </article>
              ))}
            </div>

            <div className="portfolio-highlight">
              <span>Experience Built Through Real Field Work</span>
            </div>
          </div>
        </section>

        <section id="services" className="content-section service-section">
          <div className="wrap">
            <div className="section-head">
              <p className="section-label">DTH Services</p>
              <h3>DTH Installation & Support</h3>
              <p>
                From a new DTH connection to installation, activation, signal troubleshooting and setup-box support, Ganga Enterprises provides practical assistance for multiple DTH platforms.
              </p>
            </div>

            <div className="feature-list">
              {dthServices.map((service) => (
                <div key={service} className="feature-pill">{service}</div>
              ))}
            </div>

            <div className="cta-block large-gap">
              <span>Need DTH support today?</span>
              <a href="tel:+919014415590" className="primary-btn">Book DTH Service</a>
            </div>
          </div>
        </section>

        <section id="dth" className="content-section highlight-section">
          <div className="wrap">
            <div className="section-head center-text">
              <p className="section-label">Supported DTH Platforms</p>
              <h3>Professional DTH Platform Support</h3>
            </div>

            <div className="platform-grid">
              {dthPlatforms.map((platform) => (
                <article className="platform-card" key={platform.name}>
                  <div className="platform-header">
                    <span className="platform-badge">DTH</span>
                    <h4>{platform.name}</h4>
                  </div>
                  <ul>
                    {platform.services.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                  <a href="https://wa.me/919849490171?text=Hello%20Ganga%20Enterprises%2C%20I%20need%20support%20for%20platform%20service." className="text-btn" target="_blank" rel="noreferrer">{platform.cta}</a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="content-section product-showcase">
          <div className="wrap">
            <div className="section-head">
              <p className="section-label">Set-Top Boxes & DTH Equipment</p>
              <h3>Supported equipment and installation assistance</h3>
            </div>

            <div className="equipment-grid">
              {setTopBoxes.map((box) => (
                <article className="equipment-card" key={box.name}>
                  <h4>{box.name}</h4>
                  <p>{box.description}</p>
                  <div className="mini-row"><strong>Availability:</strong> <span>{box.availability}</span></div>
                  <div className="mini-row"><strong>Activation:</strong> <span>Support available</span></div>
                  <a href="https://wa.me/919849490171?text=Hello%20Ganga%20Enterprises%2C%20I%20want%20to%20ask%20about%20DTH%20equipment." className="text-btn" target="_blank" rel="noreferrer">{box.cta}</a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="products" className="content-section products-section">
          <div className="wrap">
            <div className="section-head">
              <p className="section-label">Batteries</p>
              <h3>Power for Your Everyday Devices</h3>
              <p>Find commonly used batteries for TV remotes, AC remotes, clocks, electronic devices and other everyday applications.</p>
            </div>

            <div className="product-tabs">
              {['Batteries', 'Remotes & Accessories'].map((item) => (
                <button
                  type="button"
                  key={item}
                  className={item === tab ? 'tab-btn active' : 'tab-btn'}
                  onClick={() => setTab(item)}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="product-grid">
              {activeProducts.map((product) => (
                <article className="product-card" key={product.name}>
                  <h4>{product.name}</h4>
                  <span className="product-type">{product.type}</span>
                  <p>{product.use}</p>
                  <div className="product-details">
                    <strong>{product.price}</strong>
                    <span>{product.availability}</span>
                  </div>
                  <div className="product-actions">
                    <button type="button" className="primary-btn small" onClick={() => addToCart(product)}>Add to Cart</button>
                    <a href="https://wa.me/919849490171?text=Hello%20Ganga%20Enterprises%2C%20I%20need%20this%20item%20%3A%20${encodeURIComponent(product.name)}" className="secondary-btn small" target="_blank" rel="noreferrer">WhatsApp</a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="content-section accessories-section">
          <div className="wrap">
            <div className="section-head">
              <p className="section-label">TV Remotes & DTH Accessories</p>
              <h3>Essential support for remotes and accessories</h3>
              <p>
                We provide commonly required TV, AC and DTH-related remotes and accessories to help customers replace lost, damaged or non-working controls.
              </p>
            </div>

            <div className="category-grid">
              {accessoryCategories.map((category) => (
                <div className="category-tag" key={category}>{category}</div>
              ))}
            </div>

            <div className="cta-row second-row">
              <a href="https://wa.me/919849490171?text=Hello%20Ganga%20Enterprises%2C%20I%20want%20to%20check%20availability." className="primary-btn" target="_blank" rel="noreferrer">Check Availability</a>
              <a href="https://wa.me/919849490171?text=Hello%20Ganga%20Enterprises%2C%20I%20need%20information%20about%20accessories." className="secondary-btn" target="_blank" rel="noreferrer">Ask on WhatsApp</a>
            </div>
          </div>
        </section>

        <section className="content-section electronics-section">
          <div className="wrap">
            <div className="section-head">
              <p className="section-label">Everyday Electronic Accessories</p>
              <h3>Everyday items for home, office and technical use</h3>
            </div>
            <div className="electronics-grid">
              {electronicsProducts.map((item) => (
                <article className="electronics-card" key={item}>{item}</article>
              ))}
            </div>
          </div>
        </section>

        <section className="content-section xerox-section">
          <div className="wrap"> 
            <div className="xerox-card">
              <div>
                <p className="section-label">Xerox Service</p>
                <h3>Xerox Service</h3>
                <p>Convenient Xerox / photocopy service available at Ganga Enterprises for nearby customers.</p>
              </div>
              <a href="#contact" className="primary-btn">Visit Our Shop</a>
            </div>
          </div>
        </section>

        <section className="content-section recharge-section">
          <div className="wrap recharge-grid">
            <div>
              <p className="section-label">DTH Recharge Support</p>
              <h3>Quick & Convenient Recharge Assistance</h3>
              <p className="support-copy">Supported platforms: Tata Play, Airtel Digital TV, Videocon d2h and Sun Direct.</p>
              <ul className="support-list">
                {serviceBenefits.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>

            <form className="recharge-form" onSubmit={handleRechargeSubmit}>
              <label>
                DTH Provider
                <select value={rechargeForm.provider} onChange={(event) => setRechargeForm({ ...rechargeForm, provider: event.target.value })}>
                  {business.supportedPlatforms.map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>
              </label>

              <label>
                Subscriber / Customer ID
                <input type="text" placeholder="Enter customer ID" value={rechargeForm.customerId} onChange={(event) => setRechargeForm({ ...rechargeForm, customerId: event.target.value })} />
              </label>

              <label>
                Recharge Amount
                <input type="text" placeholder="Enter amount" value={rechargeForm.amount} onChange={(event) => setRechargeForm({ ...rechargeForm, amount: event.target.value })} />
              </label>

              <button type="submit" className="primary-btn">Request Recharge Assistance</button>
            </form>
          </div>
        </section>

        <section id="cctv" className="content-section cctv-section">
          <div className="wrap">
            <div className="section-head">
              <p className="section-label">CCTV Installation & Technical Support</p>
              <h3>Professional CCTV Installation With Local Technician Support</h3>
              <p>
                Ganga Enterprises provides CCTV installation and technical support for homes, shops and small businesses. An experienced technician is available to handle installation, camera setup, wiring and troubleshooting.
              </p>
            </div>

            <div className="cctv-grid">
              <div className="cctv-features">
                {['CCTV Camera Installation', 'Camera Replacement', 'DVR Setup', 'NVR Setup', 'Camera Configuration', 'Cable/Wiring Support', 'Camera Troubleshooting', 'Maintenance Support'].map((item) => (
                  <div className="feature-pill" key={item}>{item}</div>
                ))}
              </div>

              <div className="cctv-cta-box">
                <span className="status-pill">Technician Available</span>
                <a href="tel:+919014415590" className="primary-btn">Book CCTV Service</a>
                <a href="https://wa.me/919849490171?text=Hello%20Ganga%20Enterprises%2C%20I%20need%20CCTV%20service%20support." className="secondary-btn" target="_blank" rel="noreferrer">WhatsApp Technician</a>
              </div>
            </div>
          </div>
        </section>

        <section className="content-section process-section">
          <div className="wrap">
            <div className="section-head center-text">
              <p className="section-label">How We Work</p>
              <h3>CCTV Service Process</h3>
            </div>

            <div className="process-grid">
              {[
                'Contact Ganga Enterprises',
                'Explain Your CCTV Requirement',
                'Technician Understands the Site Requirement',
                'Installation / Configuration',
                'Testing & Customer Handover',
              ].map((step, index) => (
                <div className="process-card" key={step}>
                  <span>0{index + 1}</span>
                  <p>{step}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="content-section why-section">
          <div className="wrap">
            <div className="section-head center-text">
              <p className="section-label">Why Choose Ganga Enterprises</p>
              <h3>Trusted local support for DTH, accessories and CCTV service</h3>
            </div>

            <div className="reason-grid">
              {reasonCards.map((reason) => (
                <article className="reason-card" key={reason.title}>
                  <h4>{reason.title}</h4>
                  <p>{reason.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="content-section process-explained-section">
          <div className="wrap">
            <div className="section-head center-text">
              <p className="section-label">How It Works</p>
              <h3>Simple Service. Direct Support.</h3>
            </div>

            <div className="steps-grid">
              {steps.map((step, index) => (
                <div className="step-card" key={step.title}>
                  <span>{`Step 0${index + 1}`}</span>
                  <h4>{step.title}</h4>
                  <p>{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="location" className="content-section location-section">
          <div className="wrap location-grid">
            <div className="location-copy">
              <p className="section-label">Location</p>
              <h3>Visit Ganga Enterprises</h3>
              <h4>Your Local DTH & Technical Service Shop</h4>
              <div className="location-address">
                <p>Ganga Enterprises</p>
                <p>Near Pullagandlu / Pulivendula</p>
                <p>Andhra Pradesh</p>
                <p>Opposite APGB</p>
              </div>

              <div className="location-actions">
                <DirectionsButton className="primary-btn" label="Get Directions" />
                <a href={business.googleMapsUrl} className="secondary-btn" target="_blank" rel="noreferrer">Open Google Maps</a>
                <a href="tel:+919014415590" className="secondary-btn">Call Now</a>
                <a href="https://wa.me/919849490171?text=Hello%20Ganga%20Enterprises%2C%20I%20want%20to%20visit%20your%20shop." className="secondary-btn" target="_blank" rel="noreferrer">WhatsApp</a>
              </div>
            </div>

            <div className="map-card">
              <div className="map-header">📍 Local Shop</div>
              <div className="map-body">
                <strong>Ganga Enterprises</strong>
                <span>Near Pullagandlu / Pulivendula, Andhra Pradesh</span>
                <span>Opposite APGB</span>
              </div>
              <div className="map-buttons">
                <DirectionsButton className="primary-btn small" label="Get Directions" />
                <a href={business.googleMapsUrl} className="accent-btn small" target="_blank" rel="noreferrer">Open Maps</a>
              </div>
            </div>
          </div>
        </section>

        <section id="payment" className="content-section payment-section">
          <div className="wrap payment-grid">
            <div className="payment-copy">
              <p className="section-label">Payment</p>
              <h3>UPI Payment For Recharge & Service</h3>
              <p>
                Pay directly using the merchant UPI ID or scan the QR code from your UPI app. This flow is configured for the business UPI account and works as a real payment request link on supported devices.
              </p>

              <div className="upi-box">
                <span className="upi-label">UPI ID</span>
                <strong>{business.upiId}</strong>
                <span className="upi-number">UPI Number: {business.upiNumber}</span>
              </div>

              <ul className="payment-list">
                <li>Real UPI deep link payment request</li>
                <li>UPI ID copy support</li>
                <li>Fast recharge and service payments</li>
              </ul>
            </div>

            <div className="payment-visual">
              <div className="qr-card">
                <div className="qr-brand-row">
                  <span className="qr-brand-mark">पे</span>
                  <span className="qr-brand-name">PhonePe</span>
                </div>

                <p className="qr-heading">ACCEPTED HERE</p>
                <p className="qr-subheading">Scan &amp; Pay Using PhonePe App</p>

                <div className="qr-grid" aria-label="UPI QR code preview">
                  {qrBlocks.map((filled, index) => (
                    <span key={index} className={filled ? 'qr-box filled' : 'qr-box'} />
                  ))}
                </div>

                <div className="qr-merchant">GANGADEVI DERANGULA</div>
              </div>
            </div>

            <form className="payment-form" onSubmit={handlePaymentSubmit}>
              <label>
                Payment Method
                <select
                  value={paymentForm.method}
                  onChange={(event) => setPaymentForm((current) => ({ ...current, method: event.target.value }))}
                >
                  <option value="UPI">UPI</option>
                  <option value="UPI QR">UPI QR</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                </select>
              </label>

              <label>
                Customer Name
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={paymentForm.customerName}
                  onChange={(event) => setPaymentForm((current) => ({ ...current, customerName: event.target.value }))}
                />
              </label>

              <label>
                Phone Number
                <input
                  type="tel"
                  placeholder="Enter phone number"
                  value={paymentForm.phone}
                  onChange={(event) => setPaymentForm((current) => ({ ...current, phone: event.target.value }))}
                />
              </label>

              <label>
                Amount
                <input
                  type="number"
                  min="1"
                  placeholder="Enter amount"
                  value={paymentForm.amount}
                  onChange={(event) => setPaymentForm((current) => ({ ...current, amount: event.target.value }))}
                />
              </label>

              <div className="payment-actions">
                <button type="submit" className="primary-btn">Pay via UPI</button>
                <button type="button" className="secondary-btn" onClick={handleCopyUpiId}>Copy UPI ID</button>
              </div>

              <div className={`payment-status ${paymentForm.status}`}>
                <span className="status-dot" aria-hidden="true" />
                {paymentForm.message}
              </div>
            </form>
          </div>
        </section>

        <section className="content-section direct-approach-section">
          <div className="wrap">
            <div className="direct-approach-box">
              <div>
                <p className="section-label">Direct Approach</p>
                <h3>Need DTH or CCTV Service?</h3>
                <p>Talk directly with Ganga Enterprises.</p>
              </div>
              <div className="direct-actions">
                <a href="tel:+919014415590" className="primary-btn">CALL NOW</a>
                <a href="https://wa.me/919849490171?text=Hello%20Ganga%20Enterprises%2C%20I%20need%20service%20support." className="accent-btn" target="_blank" rel="noreferrer">WHATSAPP</a>
                <DirectionsButton className="secondary-btn" label="GET DIRECTIONS" />
                <a href="#location" className="secondary-btn">VISIT SHOP</a>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="content-section contact-section">
          <div className="wrap contact-grid">
            <div className="contact-copy">
              <p className="section-label">Contact</p>
              <h3>Contact Ganga Enterprises</h3>
              <p className="contact-brand">TATA PLAY GANGA ENTERPRISES</p>

              <div className="contact-cta-panel">
                <span className="contact-pill">📞 9014415590</span>
                <span className="contact-pill">💬 9849490171</span>
                <span className="contact-pill">📍 Opposite APGB</span>
              </div>

              <ul className="contact-list">
                <li><strong>Phone:</strong> <a href="tel:+919014415590">9014415590</a></li>
                <li><strong>WhatsApp:</strong> <a href="https://wa.me/919849490171" target="_blank" rel="noreferrer">9849490171</a></li>
                <li><strong>Location:</strong> Near Pullagandlu / Pulivendula, Andhra Pradesh</li>
                <li><strong>Landmark:</strong> Opposite APGB</li>
              </ul>

              <div className="contact-actions">
                <a href="tel:+919014415590" className="primary-btn">Call Now</a>
                <a href="https://wa.me/919849490171?text=Hello%20Ganga%20Enterprises%2C%20I%20need%20support." className="accent-btn" target="_blank" rel="noreferrer">WhatsApp</a>
                <DirectionsButton className="secondary-btn" label="Get Directions" />
              </div>
            </div>

            <div className="assistant-box">
              <div className="assistant-header">Ganga AI Support</div>
              <div className="assistant-chat">
                {chatMessages.map((message, index) => (
                  <div key={`${message.type}-${index}`} className={`chat-item ${message.type}`}>
                    {message.text}
                  </div>
                ))}
              </div>
              <form onSubmit={handleChatSubmit} className="chat-form">
                <input
                  type="text"
                  placeholder="Ask about DTH, CCTV or recharge..."
                  value={chatInput}
                  onChange={(event) => setChatInput(event.target.value)}
                />
                <button type="submit">Send</button>
              </form>
            </div>
          </div>
        </section>

        <section className="content-section faq-section">
          <div className="wrap">
            <div className="section-head center-text">
              <p className="section-label">FAQ</p>
              <h3>Common questions</h3>
            </div>

            <div className="faq-list">
              {faqs.map((item) => (
                <details key={item.question}>
                  <summary>{item.question}</summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      <aside className="floating-actions" aria-label="Quick actions">
        <a href="tel:+919014415590" className="action-btn call">📞 Call</a>
        <a href="https://wa.me/919849490171?text=Hello%20Ganga%20Enterprises%2C%20I%20need%20support." className="action-btn whatsapp" target="_blank" rel="noreferrer">💬 WhatsApp</a>
        <DirectionsButton className="action-btn directions" label="📍 Directions" />
      </aside>

      <aside className="cart-panel" aria-label="Cart summary">
        <div className="cart-header">
          <h4>Cart</h4>
          <span>{cartCount} items</span>
        </div>
        {cart.length === 0 ? (
          <p className="empty-msg">Your cart is empty.</p>
        ) : (
          <div className="cart-items">
            {cart.map((item) => (
              <div className="cart-item" key={item.name}>
                <span>{item.name}</span>
                <strong>{item.qty}</strong>
              </div>
            ))}
          </div>
        )}
        <a href="https://wa.me/919849490171?text=Hello%20Ganga%20Enterprises%2C%20I%20want%20to%20place%20an%20order." className="primary-btn full-width" target="_blank" rel="noreferrer">Checkout</a>
      </aside>

      <footer className="site-footer">
        <div className="wrap footer-grid">
          <div>
            <h4>GANGA ENTERPRISES</h4>
            <p>14+ Years of DTH, CCTV & Technical Service</p>
          </div>

          <div>
            <h5>Services</h5>
            <ul>
              <li>DTH</li>
              <li>CCTV</li>
              <li>Recharge</li>
              <li>Accessories</li>
              <li>Xerox</li>
              <li>Technical Support</li>
            </ul>
          </div>

          <div>
            <h5>Quick Links</h5>
            <ul>
              {navItems.filter((item) => item.label !== 'Home').map((item) => (
                <li key={item.label}><a href={item.href}>{item.label}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h5>Contact</h5>
            <ul>
              <li><a href="tel:+919014415590">9014415590</a></li>
              <li>Near Pullagandlu / Pulivendula</li>
              <li>Andhra Pradesh</li>
              <li>Opposite APGB</li>
            </ul>
          </div>
        </div>

        <div className="footer-actions wrap">
          <a href="tel:+919014415590" className="primary-btn small">Call</a>
          <a href="https://wa.me/919849490171?text=Hello%20Ganga%20Enterprises%2C%20I%20need%20support." className="secondary-btn small" target="_blank" rel="noreferrer">WhatsApp</a>
          <DirectionsButton className="secondary-btn small" label="Directions" />
        </div>
      </footer>
    </div>
  )
}

export default App
