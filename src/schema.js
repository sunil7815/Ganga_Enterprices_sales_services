const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Do you provide DTH installation in Pulivendula?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Ganga Enterprises provides DTH installation, dish alignment, activation and setup assistance for Tata Play, Airtel Digital TV, Videocon d2h and Sun Direct in Pulivendula.',
      },
    },
    {
      '@type': 'Question',
      name: 'Where is Ganga Enterprises located in Pulivendula?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ganga Enterprises is located at Poola Angallu, Pulivendula, Andhra Pradesh 516390, near Andhra Pradesh Grameena Bank (APGB) and beside Lakshmi Theatre on Parnapalli Road.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you offer DTH recharge assistance in Pulivendula?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. The shop provides recharge assistance and support for DTH services across major platforms in Pulivendula.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you install CCTV cameras in Pulivendula?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Ganga Enterprises offers CCTV installation, camera setup, DVR/NVR connection and troubleshooting support through an experienced technician in Pulivendula.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you sell TV remotes and electronics accessories in Pulivendula?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. The shop offers TV remotes, AC remotes, HDMI cables, batteries, computer mice, DTH accessories and other daily-use electronic items.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I contact Ganga Enterprises on WhatsApp?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Customers can contact Ganga Enterprises directly on WhatsApp at +91 98494 90171 for DTH, CCTV, recharge and accessory support.',
      },
    },
  ],
}

const businessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Ganga Enterprises',
  image: 'https://ganga-enterprises-snowy.vercel.app/shop-banner-1200.webp',
  description:
    'Ganga Enterprises is a local DTH installation, recharge assistance, CCTV camera installation and electronics accessories shop in Pulivendula, Andhra Pradesh near APGB and Lakshmi Theatre.',
  telephone: '+91-9014415590',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Poola Angallu, Pulivendula',
    addressLocality: 'Pulivendula',
    addressRegion: 'Andhra Pradesh',
    postalCode: '516390',
    addressCountry: 'IN',
  },
  areaServed: ['Pulivendula', 'Andhra Pradesh', 'YSR Kadapa District'],
  openingHours: 'Mo-Sa 09:00-21:00',
  priceRange: '₹₹',
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '14.4173',
    longitude: '78.2383',
  },
  sameAs: ['https://wa.me/919849490171', 'https://ganga-enterprises-snowy.vercel.app/'],
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'DTH Installation and Recharge Assistance',
  provider: {
    '@type': 'LocalBusiness',
    name: 'Ganga Enterprises',
  },
  areaServed: 'Pulivendula, Andhra Pradesh',
  description:
    'Professional DTH installation, dish alignment, set-top box setup, activation support, recharge assistance and technical troubleshooting for major DTH platforms.',
  serviceType: ['DTH Installation', 'CCTV Installation', 'Recharge Assistance', 'Technical Support'],
  offers: {
    '@type': 'Offer',
    availability: 'https://schema.org/InStock',
    priceCurrency: 'INR',
    price: '0',
  },
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Ganga Enterprises',
  url: 'https://ganga-enterprises-snowy.vercel.app/',
  logo: 'https://ganga-enterprises-snowy.vercel.app/shop-banner.jpeg',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+91-9014415590',
    contactType: 'customer service',
    areaServed: 'IN',
    availableLanguage: 'English',
  },
  sameAs: ['https://wa.me/919849490171'],
}

const jsonLd = [organizationSchema, businessSchema, serviceSchema, faqSchema]

const schemaScript = document.createElement('script')
schemaScript.type = 'application/ld+json'
schemaScript.textContent = JSON.stringify(jsonLd)
document.head.appendChild(schemaScript)
