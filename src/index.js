// JS Goes here - ES6 supported

import "./css/main.scss";

const mobileMenu = document.querySelector("[data-mobile-menu]");
const nav = document.querySelector("[data-nav]");

function toggleMobileMenu() {
  nav.classList.toggle("menu-open");
}

mobileMenu.addEventListener("click", toggleMobileMenu);

// --- ChanThar bilingual (EN/MM) text swapper (no reload) ---
function getI18nDict() {
  // Preferred: injected JSON from Hugo partial via <script type="application/json" id="chanthar-i18n">...
  const el = document.getElementById("chanthar-i18n");
  if (el && el.textContent) {
    try {
      return JSON.parse(el.textContent);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn("Invalid i18n JSON", e);
    }
  }
  // Fallback: allow global dict
  return window.CHANTHAR_I18N || null;
}

function applyLanguage(lang) {
  const dict = getI18nDict();
  if (!dict || !dict[lang]) return;

  document.documentElement.classList.toggle("lang-my", lang === "my");
  document.body.classList.toggle("lang-my", lang === "my");

  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.getAttribute("data-i18n");
    if (!key) return;
    const value = dict[lang][key];
    if (typeof value === "string") {
      node.textContent = value;
    }
  });

  document.querySelectorAll("[data-lang-toggle]").forEach((btn) => {
    const isActive = btn.getAttribute("data-lang") === lang;
    btn.setAttribute("aria-pressed", isActive ? "true" : "false");
  });

  try {
    localStorage.setItem("chanthar_lang", lang);
  } catch (_) {
    // ignore
  }
}

function initLanguageToggle() {
  const buttons = document.querySelectorAll("[data-lang-toggle]");
  if (!buttons.length) return;

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const lang = btn.getAttribute("data-lang") || "en";
      applyLanguage(lang);
    });
  });

  let initial = "en";
  try {
    initial = localStorage.getItem("chanthar_lang") || "en";
  } catch (_) {
    // ignore
  }
  applyLanguage(initial);
}

initLanguageToggle();

// Say hello
// eslint-disable-next-line no-console
console.log("🦊 Hello! Edit me in src/index.js");
