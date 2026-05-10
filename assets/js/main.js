/**
 * ============================================================
 *  13AL AUTOGATE — JAVASCRIPT (main.js)
 *  Scroll animations · FAQ accordion · Dynamic content loading
 * ============================================================
 */

document.addEventListener("DOMContentLoaded", () => {

    // ---- 1. INJECT CONFIG VALUES INTO PAGE ----
    injectConfig();

    // ---- 2. SCROLL REVEAL ANIMATION ----
    const revealEls = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); });
    }, { threshold: 0.1 });
    revealEls.forEach((el) => io.observe(el));

    // ---- 3. FAQ ACCORDION ----
    document.querySelectorAll(".faq-item").forEach((item) => {
        item.addEventListener("click", () => {
            const answer = item.querySelector(".faq-answer");
            const chevron = item.querySelector(".faq-chevron");
            const isOpen = item.classList.contains("open");

            // close all
            document.querySelectorAll(".faq-item").forEach((i) => {
                i.classList.remove("open");
                i.querySelector(".faq-answer").classList.remove("open");
            });

            // open clicked if it was closed
            if (!isOpen) {
                item.classList.add("open");
                answer.classList.add("open");
            }
        });
    });

});

// ============================================================
//  INJECT CONFIG — Reads CONFIG object and updates the DOM
// ============================================================
function injectConfig() {
    if (typeof CONFIG === "undefined") return;

    const WA = CONFIG.whatsapp;
    const MSG = encodeURIComponent(CONFIG.whatsappMsg || "Hi 13AL!");
    const LINK = `https://wa.me/${WA}?text=${MSG}`;

    // Update all WhatsApp hrefs
    document.querySelectorAll("[data-wa]").forEach((el) => {
        const custom = el.getAttribute("data-wa");
        const msg = custom ? encodeURIComponent(custom) : MSG;
        el.href = `https://wa.me/${WA}?text=${msg}`;
    });

    // Logo injection
    if (CONFIG.logo?.src) {
        const logoImg = document.getElementById("logo-img");
        const footerLogoImg = document.getElementById("footer-logo-img");
        const height = CONFIG.logo.height ? `${CONFIG.logo.height}px` : '48px';

        if (logoImg) {
            logoImg.src = CONFIG.logo.src;
            logoImg.alt = CONFIG.logo.alt || "Logo";
            logoImg.style.height = height;
        }
        if (footerLogoImg) {
            footerLogoImg.src = CONFIG.logo.src;
            footerLogoImg.alt = CONFIG.logo.alt || "Logo";
            footerLogoImg.style.height = height;
        }
    }

    // Cache-buster: forces browser to load fresh copies of all photos
    const cb = `?v=${Date.now()}`;

    // Hero motor image on the right (4:3)
    setImg("hero-motor-img", CONFIG.hero?.motorImage ? CONFIG.hero.motorImage + cb : null, "Armstrong Autogate Motors");

    // Pain section images
    setImg("img-pain-rain", CONFIG.pain?.rainImage ? CONFIG.pain.rainImage + cb : null, "Person drenched at gate in Ipoh rain");
    setImg("img-dream-home", CONFIG.pain?.dreamImage ? CONFIG.pain.dreamImage + cb : null, "Modern home with gate opening at night");

    // Product Section Image
    setImg("img-product-motor", CONFIG.product?.image ? CONFIG.product.image + cb : null, "Heavy Duty Swing & Folding Arm Motor");

    // Trust photos
    if (CONFIG.trust?.photos) {
        CONFIG.trust.photos.forEach((p, i) => {
            setImg(`img-trust-${i + 1}`, p.src, p.caption);
            const cap = document.getElementById(`cap-trust-${i + 1}`);
            if (cap) cap.textContent = p.caption;
        });
    }

    // Video section
    injectVideo();

    // Testimonials
    injectTestimonials();

    // WhatsApp chat screenshots
    injectWaScreenshots();

    // Pricing
    injectPricing();

    // Bonus section
    injectBonus();

    // Maps
    const mapEl = document.getElementById("maps-embed");
    if (mapEl && CONFIG.maps?.embedSrc) {
        mapEl.innerHTML = `<iframe src="${CONFIG.maps.embedSrc}" width="100%" height="360" style="border:0;border-radius:1rem;" allowfullscreen loading="lazy"></iframe>`;
    }
}

// ---- helpers ----

function setImg(id, src, alt) {
    const el = document.getElementById(id);
    if (!el || !src) return;

    // Case 1: Element is already a native <img> tag — manage show/hide directly
    if (el.tagName === "IMG") {
        el.onload = () => {
            el.classList.remove("hidden");
            // Hide the sibling placeholder if it exists
            const placeholder = el.nextElementSibling;
            if (placeholder) placeholder.style.display = "none";
        };
        el.onerror = () => {
            el.classList.add("hidden");
            // Show the sibling placeholder
            const placeholder = el.nextElementSibling;
            if (placeholder) placeholder.style.display = "flex";
        };
        el.alt = alt || "";
        el.src = src; // Set src LAST — triggers onload or onerror
        return;
    }

    // Cases 2 & 3: Element is a <div> placeholder — load a hidden img to test it first
    const img = document.createElement("img");
    img.onerror = () => { }; // keep placeholder if file missing
    img.onload = () => {
        // Case 2: data-bg-img means preserve inner HTML (e.g. badges) and apply as background
        if (el.hasAttribute("data-bg-img")) {
            el.style.backgroundImage = `url('${src}')`;
            el.style.backgroundSize = "cover";
            el.style.backgroundPosition = "center";
            Array.from(el.children).forEach(child => {
                if (child.tagName === 'SPAN' && child.classList.contains('material-icons')) {
                    child.style.display = 'none';
                }
            });
        } else {
            // Case 3: Standard placeholder — replace the whole element with the loaded image
            img.className = el.className;
            img.style.cssText = "width:100%;height:100%;object-fit:cover;";
            el.replaceWith(img);
        }
    };
    img.alt = alt || "";
    img.src = src;
}

function injectVideo() {
    const container = document.getElementById("video-container");
    if (!container || !CONFIG.video) return;

    if (CONFIG.video.type === "youtube" && CONFIG.video.youtubeId && CONFIG.video.youtubeId !== "YOUR_YOUTUBE_VIDEO_ID") {
        container.innerHTML = `
      <iframe class="w-full h-full" src="https://www.youtube.com/embed/${CONFIG.video.youtubeId}?rel=0&modestbranding=1"
        title="13AL Autogate Demo" frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen></iframe>`;
    } else if (CONFIG.video.type === "file" && CONFIG.video.src) {
        container.innerHTML = `
      <video class="w-full h-full object-cover" controls controlsList="nodownload" oncontextmenu="return false;" poster="${CONFIG.video.thumbnail || ''}">
        <source src="${CONFIG.video.src}" type="video/mp4"/>
        Your browser does not support video playback.
      </video>`;
    }
    // else keep the placeholder
}

function injectTestimonials() {
    const grid = document.getElementById("testimonials-grid");
    if (!grid || !CONFIG.testimonials?.length) return;
    grid.innerHTML = "";

    CONFIG.testimonials.forEach((t) => {
        const stars = "&#9733;".repeat(t.rating || 5);
        const initials = t.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
        const badge = t.type === "whatsapp" ? `<span class="material-icons text-green-500" style="font-size:.95rem;">whatsapp</span> WhatsApp`
            : t.type === "google" ? `<span class="material-icons text-blue-500" style="font-size:.95rem;">star_rate</span> Google`
                : `<span class="material-icons text-muted" style="font-size:.95rem;">person</span> Customer`;

        const screenshot = t.screenshot
            ? `<img src="${t.screenshot}" alt="Review screenshot from ${t.name}" class="w-full rounded-xl mt-3 border border-gray-100" style="max-height:180px;object-fit:cover;" />`
            : (t.type === "whatsapp"
                ? `<div class="bg-green-50 border border-green-100 p-3 rounded-xl rounded-tl-none text-sm text-gray-800 leading-relaxed">${t.text}</div>`
                : `<p class="italic text-muted text-sm leading-relaxed">"${t.text}"</p>`);

        grid.innerHTML += `
      <div class="card-light p-6">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-11 h-11 rounded-full bg-blue-100 flex items-center justify-center font-black text-primary text-lg">${initials}</div>
          <div>
            <p class="font-bold text-navy">${t.name}</p>
            <p class="text-xs text-muted">${t.location}</p>
            <div class="text-gold text-sm">${stars}</div>
          </div>
        </div>
        ${screenshot}
        <p class="text-xs text-muted-light flex items-center gap-1 mt-3">${badge} &nbsp;&middot;&nbsp; ${t.date}</p>
      </div>`;
    });
}

function injectWaScreenshots() {
    const strip = document.getElementById("wa-screenshots");
    if (!strip || !CONFIG.whatsappScreenshots?.length) return;
    const real = CONFIG.whatsappScreenshots.filter((s) => s && !s.includes("wa-chat-"));
    if (!real.length) return; // keep placeholder

    strip.innerHTML = "";
    real.forEach((src, i) => {
        strip.innerHTML += `<img src="${src}" alt="WhatsApp customer feedback ${i + 1}"
      class="rounded-xl border border-gray-100 shadow-sm" style="height:200px;object-fit:cover;flex:1;" />`;
    });
    strip.style.display = "flex";
    strip.style.gap = "1rem";
    strip.style.flexWrap = "wrap";
}

function injectPricing() {
    if (!CONFIG.pricing) return;
    ["swing", "sliding"].forEach((type) => {
        const p = CONFIG.pricing[type];
        if (!p) return;
        const el = document.getElementById(`price-${type}`);
        const from = document.getElementById(`price-${type}-from`);
        const list = document.getElementById(`price-${type}-list`);
        if (from && p.from) from.textContent = p.from;
        if (list && p.includes) {
            list.innerHTML = p.includes.map((i) =>
                `<li class="check-item"><span class="material-icons text-primary" style="font-size:1.1rem;">check</span>${i}</li>`
            ).join("");
        }
    });
}

function injectBonus() {
    if (!CONFIG.bonus) return;
    const monthEl = document.getElementById("bonus-month");
    if (monthEl) monthEl.textContent = CONFIG.bonus.month || "";

    const grid = document.getElementById("bonus-grid");
    if (!grid || !CONFIG.bonus.bonuses?.length) return;
    const count = CONFIG.bonus.bonuses.length;

    // Dynamically set grid columns based on item count
    grid.className = "mt-12";
    if (count === 1) {
        grid.style.cssText = "display:flex;justify-content:center;";
    } else if (count === 2) {
        grid.style.cssText = "display:grid;grid-template-columns:repeat(2,1fr);gap:1.5rem;";
    } else {
        grid.style.cssText = "display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:1.5rem;";
    }

    grid.innerHTML = "";
    CONFIG.bonus.bonuses.forEach((b) => {
        const worthHtml = b.value ? `<span class="text-muted font-normal text-sm ml-1">(Worth ${b.value})</span>` : "";
        const cardStyle = count === 1
            ? "max-width:420px;width:100%;"
            : "";
        grid.innerHTML += `
      <div class="card-light p-8 text-center" style="${cardStyle}">
        <div style="width:4.5rem;height:4.5rem;border-radius:1.25rem;background:linear-gradient(135deg,#F59E0B,#EF4444);display:flex;align-items:center;justify-content:center;margin:0 auto 1.25rem;box-shadow:0 8px 24px rgba(245,158,11,0.35);">
          <span class="material-icons text-white" style="font-size:2rem;">${b.icon}</span>
        </div>
        <h4 class="font-bold text-xl mb-2">${b.title}${worthHtml}</h4>
        <p class="text-muted text-sm leading-relaxed">${b.desc}</p>
      </div>`;
    });

    // Wire scarcity bar to config
    injectScarcity(CONFIG.bonus.scarcity);

    // Wire countdown timer to config
    injectCountdown(CONFIG.bonus.countdown);
}

// ============================================================
//  SCARCITY — Reads config and updates spots display + bar
// ============================================================
function injectScarcity(scarcity) {
    if (!scarcity?.enabled) return;

    const total = scarcity.totalSpots || 15;
    const left = scarcity.spotsLeft || 0;
    const pct = Math.max(0, Math.min(100, ((total - left) / total) * 100));

    const spotsEl = document.getElementById("bonus-spots");
    const leftEl = document.getElementById("bonus-left");
    const barEl = document.querySelector("#bonus-scarcity-text .h-full.bg-gradient-to-r");

    if (spotsEl) spotsEl.textContent = total;
    if (leftEl) leftEl.textContent = left;
    if (barEl) barEl.style.width = `${pct}%`;
}

// ============================================================
//  COUNTDOWN — Supports evergreenMinutes or fixed targetDate
// ============================================================
function injectCountdown(countdown) {
    if (!countdown?.enabled) return;

    const cdDays = document.getElementById("cd-days");
    const cdHours = document.getElementById("cd-hours");
    const cdMins = document.getElementById("cd-minutes");
    const cdSecs = document.getElementById("cd-seconds");
    if (!cdDays || !cdHours || !cdMins || !cdSecs) return;

    // Determine the target expiry timestamp
    let expiry;
    const SESSION_KEY = "13al_countdown_expiry";

    if (countdown.evergreenMinutes) {
        // Restore from sessionStorage or create a fresh expiry
        const stored = sessionStorage.getItem(SESSION_KEY);
        if (stored && Number(stored) > Date.now()) {
            expiry = Number(stored);
        } else {
            expiry = Date.now() + countdown.evergreenMinutes * 60 * 1000;
            sessionStorage.setItem(SESSION_KEY, expiry);
        }
    } else if (countdown.targetDate) {
        expiry = new Date(countdown.targetDate).getTime();
    } else {
        return; // no usable config
    }

    function pad(n) { return String(Math.max(0, n)).padStart(2, "0"); }

    function tick() {
        const remaining = expiry - Date.now();

        if (remaining <= 0) {
            cdDays.textContent = "00";
            cdHours.textContent = "00";
            cdMins.textContent = "00";
            cdSecs.textContent = "00";
            clearInterval(timer);
            return;
        }

        const days = Math.floor(remaining / 86400000);
        const hours = Math.floor((remaining % 86400000) / 3600000);
        const mins = Math.floor((remaining % 3600000) / 60000);
        const secs = Math.floor((remaining % 60000) / 1000);

        cdDays.textContent = pad(days);
        cdHours.textContent = pad(hours);
        cdMins.textContent = pad(mins);
        cdSecs.textContent = pad(secs);
    }

    tick(); // Run immediately so there's no 1-second blank flash
    const timer = setInterval(tick, 1000);
}

