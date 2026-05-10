/**
 * ============================================================
 *  13AL AUTOGATE — EASY EDIT CONFIGURATION FILE
 *  Edit this file to update content without touching the HTML.
 * ============================================================
 */

const CONFIG = {

  // ----------------------------------------------------------
  // 0. LOGO
  // ----------------------------------------------------------
  logo: {
    // → Put your logo image in: assets/images/logo.png (or .jpg, .svg)
    // → Then update the filename below to match
    src: "assets/images/logo.png",
    alt: "13AL Autogate Logo",
    // Height of the logo in the navbar/footer (in pixels)
    height: 48,
  },

  // ----------------------------------------------------------
  // 1. BUSINESS INFO
  // ----------------------------------------------------------
  company: "13AL Autogate",
  whatsapp: "60167401258",           // WhatsApp number — DO NOT add spaces or dashes
  whatsappMsg: "Hi 13AL! I'm interested in a free autogate quote.",

  // ----------------------------------------------------------
  // 2. HERO SECTION
  // ----------------------------------------------------------
  hero: {
    // Main motor image shown on the RIGHT side of the headline (4:3 ratio)
    // → Your file is already here: assets/images/hero-bg.jpg
    motorImage: "assets/images/hero-bg.PNG",
  },

  // ----------------------------------------------------------
  // 3. PAIN SECTION IMAGES
  // ----------------------------------------------------------
  pain: {
    // Photo of someone getting drenched at a gate in heavy rain
    // → Put your image in: assets/images/pain-rain.jpg
    rainImage: "assets/images/pain-rain.jpg",

    // Photo of a beautiful modern home at night with gate opening
    // → Put your image in: assets/images/dream-home.jpg
    dreamImage: "assets/images/dream-home.jpg",
  },

  // ----------------------------------------------------------
  // 3.5. PRODUCT SECTION IMAGE
  // ----------------------------------------------------------
  product: {
    // Photo of your premium motor (e.g. Swing & Folding Arm Motor)
    // → Put your image in: assets/images/product-motor.jpg
    image: "assets/images/product-motor.JPG",
  },

  // ----------------------------------------------------------
  // 4. TRUST / WORKMANSHIP PHOTOS (4 photos)
  // ----------------------------------------------------------
  trust: {
    // → Put your photos in: assets/images/trust-1.jpg ... trust-4.jpg
    photos: [
      { src: "assets/images/trust-1.jpg", caption: "Concealed Cable Run" },
      { src: "assets/images/trust-2.jpg", caption: "Uniformed Technicians" },
      { src: "assets/images/trust-3.jpg", caption: "Full Copper Motor" },
      { src: "assets/images/trust-4.jpg", caption: "Full Handover Kit" },
    ],
  },

  // ----------------------------------------------------------
  // 5. VIDEO DEMO
  // ----------------------------------------------------------
  video: {
    // Option A: Upload your own MP4 video
    // → Put your video in: assets/video/gate-demo.mp4
    // → Set type to "file" and fill in src
    type: "file",               // "youtube" or "file"
    src: "assets/video/gate-demo.mp4",

    // Option B: Use a YouTube video (paste your YouTube video ID below)
    // e.g. for https://www.youtube.com/watch?v=XxXxXxXx → use "XxXxXxXx"
    youtubeId: "YOUR_YOUTUBE_VIDEO_ID",

    // Thumbnail shown before video plays (for "file" type)
    // → Put your image in: assets/images/video-thumb.jpg
    thumbnail: "assets/images/video-thumb.jpg",
  },

  // ----------------------------------------------------------
  // 6. TESTIMONIALS (add as many as you want)
  // ----------------------------------------------------------
  testimonials: [
    {
      name: "Ahmad Faizal",
      location: "Silibin, Ipoh",
      rating: 5,
      text: "Serious la, kerja cantik gila. Wiring semua sorok elok, motor senyap, tak bising langsung. Recommend 13AL kepada semua jiran saya!",
      type: "whatsapp",           // "whatsapp" or "google" or "text"
      // Optional: replace with a real screenshot image
      // → Put image in: assets/images/review-1.jpg
      screenshot: "",                 // e.g. "assets/images/review-1.jpg"
      date: "Jan 2026",
    },
    {
      name: "Sarah Lim",
      location: "Menglembu, Ipoh",
      rating: 5,
      text: "Finally no more getting wet in the rain! The team finished installing the motor in half day and cleaned up after. Very professional. My husband loves how smooth it is - no more pushing that heavy gate!",
      type: "google",
      screenshot: "",
      date: "Feb 2026",
    },
    {
      name: "Rajendran M.",
      location: "Falim, Ipoh",
      rating: 5,
      text: "My previous motor from Shopee spoiled in 8 months. Called 13AL - their motor uses premium aluminum casing, been 12 months, still running perfectly. Quality makes a huge difference.",
      type: "text",
      screenshot: "",
      date: "Mar 2025",
    },
  ],

  // ----------------------------------------------------------
  // 7. WHATSAPP CHAT SCREENSHOTS (social proof strip)
  // ----------------------------------------------------------
  whatsappScreenshots: [
    // → Put your screenshots in: assets/images/wa-chat-1.jpg etc.
    "assets/images/wa-chat-1.jpg",
    "assets/images/wa-chat-2.jpg",
    "assets/images/wa-chat-3.jpg",
  ],

  // ----------------------------------------------------------
  // 8. PRICING
  // ----------------------------------------------------------
  pricing: {
    swing: {
      name: "Swing & Folding Gate System",
      from: "RM1,XXX",
      desc: "Best for single or double leaf swing and folding gates. Most popular in Ipoh housing estates.",
      includes: [
        "3 remote controls included",
        "Built-in backup battery",
        "Manual release key",
        "1-Year parts & labour warranty",
      ],
    },
  },

  // ----------------------------------------------------------
  // 9. URGENCY BONUS (update month/year as needed)
  // ----------------------------------------------------------
  bonus: {
    month: "May 2026",
    scarcity: {
      enabled: true,
      totalSpots: 15,
      spotsLeft: 4,
    },
    countdown: {
      enabled: true,
      // Target date format: YYYY-MM-DD or YYYY-MM-DDTHH:mm:ss
      // OR use "evergreenMinutes: 1440" for a timer that resets based on session
      evergreenMinutes: 1440, // overrides targetDate if set (1 day)
      targetDate: "2026-03-31T23:59:59",
    },
    bonuses: [
      { title: "FREE Backup Battery", value: "", icon: "battery_full", desc: "24 hours of backup power during TNB blackouts." },
    ],
  },

  // ----------------------------------------------------------
  // 10. GOOGLE MAPS EMBED
  // ----------------------------------------------------------
  maps: {
    // Paste your full Google Maps embed iframe src URL here
    // Go to Google Maps → Share → Embed a map → copy the src="..." value
    embedSrc: "",   // e.g. "https://www.google.com/maps/embed?pb=..."
  },

};
