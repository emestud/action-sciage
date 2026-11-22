/**
 * Action Sciage — Interactive Pink Saw Animations, Gallery Lightbox & Quote Builder
 */
(function () {
  "use strict";

  var prefersReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* 1. Scroll-Driven Header Pink-Saw Kerf Indicator */
  var kerfFill = document.getElementById("kerfProgressFill");
  var kerfSaw = document.getElementById("kerfProgressSaw");
  var ticking = false;

  function updateKerfProgress() {
    ticking = false;
    if (!kerfFill) return;
    var doc = document.documentElement;
    var scrollTop = window.scrollY || doc.scrollTop || 0;
    var maxScroll = Math.max(1, doc.scrollHeight - window.innerHeight);
    var ratio = Math.min(1, Math.max(0, scrollTop / maxScroll));
    kerfFill.style.width = (ratio * 100).toFixed(2) + "%";
    if (kerfSaw && !prefersReduced) {
      kerfSaw.style.transform = "rotate(" + (scrollTop * 0.45).toFixed(1) + "deg)";
    }
  }

  window.addEventListener("scroll", function () {
    if (!ticking) {
      window.requestAnimationFrame(updateKerfProgress);
      ticking = true;
    }
  }, { passive: true });
  updateKerfProgress();

  /* 2. Angled 3.5deg Laser Cut Section Dividers */
  var dividers = document.querySelectorAll(".saw-divider");
  if (dividers.length && "IntersectionObserver" in window && !prefersReduced) {
    var divObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-cut");
          divObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.25 });
    dividers.forEach(function (d) { divObserver.observe(d); });
  } else {
    dividers.forEach(function (d) { d.classList.add("is-cut"); });
  }

  /* 3. Mobile Navigation Drawer */
  var drawer = document.getElementById("mobileDrawer");
  var openBtn = document.getElementById("menuOpenBtn");
  var closeBtn = document.getElementById("menuCloseBtn");

  function toggleDrawer(show) {
    if (!drawer) return;
    drawer.classList.toggle("open", show);
    document.body.classList.toggle("drawer-open", show);
    if (openBtn) openBtn.setAttribute("aria-expanded", show ? "true" : "false");
  }

  if (openBtn) openBtn.addEventListener("click", function () { toggleDrawer(true); });
  if (closeBtn) closeBtn.addEventListener("click", function () { toggleDrawer(false); });
  if (drawer) {
    drawer.addEventListener("click", function (e) {
      if (e.target === drawer) toggleDrawer(false);
    });
  }

  /* 4. Filterable Job-Site Gallery & Lightbox */
  var filterBtns = document.querySelectorAll("[data-gallery-filter]");
  var galleryTiles = document.querySelectorAll("[data-gallery-cat]");

  filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var target = btn.getAttribute("data-gallery-filter");
      filterBtns.forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");
      galleryTiles.forEach(function (tile) {
        var cat = tile.getAttribute("data-gallery-cat") || "";
        var match = target === "all" || cat.indexOf(target) !== -1;
        tile.classList.toggle("is-hidden", !match);
      });
    });
  });

  var lightbox = document.getElementById("galleryLightbox");
  var lbImg = document.getElementById("lbImg");
  var lbCap = document.getElementById("lbCap");
  var lbClose = document.getElementById("lbClose");
  var lbPrev = document.getElementById("lbPrev");
  var lbNext = document.getElementById("lbNext");
  var activeIndex = 0;

  function visibleTiles() {
    return Array.prototype.slice.call(galleryTiles).filter(function (t) {
      return !t.classList.contains("is-hidden");
    });
  }

  function showLightboxAt(idx) {
    var tiles = visibleTiles();
    if (!tiles.length || !lightbox || !lbImg) return;
    activeIndex = (idx + tiles.length) % tiles.length;
    var tile = tiles[activeIndex];
    var img = tile.querySelector("img");
    var cap = tile.querySelector(".gallery-tile-cap");
    if (img) {
      lbImg.src = img.src;
      lbImg.alt = img.alt || "";
    }
    if (lbCap) lbCap.textContent = (activeIndex + 1) + " / " + tiles.length + " — " + (cap ? cap.textContent : "");
    lightbox.classList.add("open");
    document.body.classList.add("lightbox-open");
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove("open");
    document.body.classList.remove("lightbox-open");
  }

  galleryTiles.forEach(function (tile) {
    tile.addEventListener("click", function () {
      var tiles = visibleTiles();
      var idx = tiles.indexOf(tile);
      showLightboxAt(idx >= 0 ? idx : 0);
    });
  });

  if (lbClose) lbClose.addEventListener("click", closeLightbox);
  if (lbPrev) lbPrev.addEventListener("click", function () { showLightboxAt(activeIndex - 1); });
  if (lbNext) lbNext.addEventListener("click", function () { showLightboxAt(activeIndex + 1); });
  if (lightbox) {
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) closeLightbox();
    });
  }
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      toggleDrawer(false);
      closeLightbox();
    } else if (lightbox && lightbox.classList.contains("open")) {
      if (e.key === "ArrowLeft") showLightboxAt(activeIndex - 1);
      if (e.key === "ArrowRight") showLightboxAt(activeIndex + 1);
    }
  });

  /* 5. Interactive Technical Quote Configurator (FR / EN / DE) */
  var quoteForm = document.getElementById("quoteConfigurator");
  if (quoteForm) {
    var lang = document.documentElement.lang || "fr";
    var labels = {
      fr: {
        subjectPrefix: "Demande d'étude technique — Action Sciage",
        title: "ACTION SCIAGE — BRIEF TECHNIQUE",
        services: "Prestations",
        structure: "Support / Dimensions",
        zone: "Localisation chantier",
        timing: "Échéance souhaitée",
        client: "Demandeur",
        company: "Société",
        phone: "Téléphone",
        email: "Email",
        notes: "Précisions",
        none: "Non précisé",
        copied: "Brief copié !"
      },
      en: {
        subjectPrefix: "Technical Quote Request — Action Sciage",
        title: "ACTION SCIAGE — TECHNICAL BRIEF",
        services: "Disciplines",
        structure: "Material / Dimensions",
        zone: "Site Location",
        timing: "Target Schedule",
        client: "Contact Name",
        company: "Company",
        phone: "Phone",
        email: "Email",
        notes: "Project Details",
        none: "Not specified",
        copied: "Brief copied!"
      },
      de: {
        subjectPrefix: "Technische Angebotsanfrage — Action Sciage",
        title: "ACTION SCIAGE — TECHNISCHES BRIEFING",
        services: "Leistungen",
        structure: "Bauteil / Maße",
        zone: "Einsatzort",
        timing: "Wunschtermin",
        client: "Ansprechpartner",
        company: "Unternehmen",
        phone: "Telefon",
        email: "E-Mail",
        notes: "Details",
        none: "Keine Angabe",
        copied: "Briefing kopiert!"
      }
    }[lang] || {};

    var previewEl = document.getElementById("briefPreview");
    var emailBtn = document.getElementById("sendEmailBtn");
    var copyBtn = document.getElementById("copyBriefBtn");

    function buildBrief() {
      var checked = Array.prototype.slice.call(quoteForm.querySelectorAll('input[name="services"]:checked')).map(function (c) {
        return c.value;
      });
      var material = (quoteForm.querySelector('[name="material"]') || {}).value || labels.none;
      var thickness = (quoteForm.querySelector('[name="thickness"]') || {}).value || labels.none;
      var city = (quoteForm.querySelector('[name="city"]') || {}).value || labels.none;
      var zone = (quoteForm.querySelector('[name="zone"]') || {}).value || labels.none;
      var timing = (quoteForm.querySelector('[name="timing"]') || {}).value || labels.none;
      var fullName = (quoteForm.querySelector('[name="fullName"]') || {}).value || labels.none;
      var company = (quoteForm.querySelector('[name="company"]') || {}).value || labels.none;
      var phone = (quoteForm.querySelector('[name="phone"]') || {}).value || labels.none;
      var clientEmail = (quoteForm.querySelector('[name="clientEmail"]') || {}).value || labels.none;
      var notes = (quoteForm.querySelector('[name="notes"]') || {}).value || labels.none;

      var lines = [
        labels.title,
        "----------------------------------------",
        labels.services + ": " + (checked.length ? checked.join(", ") : labels.none),
        labels.structure + ": " + material + " (" + thickness + ")",
        labels.zone + ": " + city + " [" + zone + "]",
        labels.timing + ": " + timing,
        labels.client + ": " + fullName + " (" + company + ")",
        labels.phone + ": " + phone + " | " + labels.email + ": " + clientEmail,
        labels.notes + ": " + notes
      ];
      var brief = lines.join("\n");
      if (previewEl) previewEl.textContent = brief;

      var cfg = window.ACTION_SCIAGE_CONFIG;
      if (emailBtn && cfg) {
        var subject = encodeURIComponent(labels.subjectPrefix + (city !== labels.none ? " — " + city : ""));
        emailBtn.href = "mailto:" + cfg.contact.email + "?subject=" + subject + "&body=" + encodeURIComponent(brief);
      }
      return brief;
    }

    quoteForm.addEventListener("input", buildBrief);
    quoteForm.addEventListener("change", buildBrief);
    if (copyBtn) {
      copyBtn.addEventListener("click", function () {
        var text = buildBrief();
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(function () {
            var old = copyBtn.textContent;
            copyBtn.textContent = labels.copied;
            setTimeout(function () { copyBtn.textContent = old; }, 2200);
          });
        }
      });
    }
    buildBrief();
  }
})();
