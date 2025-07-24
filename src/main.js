import translations from "../locales/translations.json";

document.addEventListener("DOMContentLoaded", () => {
  const options = document.querySelectorAll(".option");
  const continueButton = document.querySelector(".continue-button");

  options.forEach((option) => {
    option.addEventListener("click", () => {
      options.forEach((o) => o.classList.remove("active"));
      option.classList.add("active");
    });
  });

  continueButton.addEventListener("click", () => {
    const activeOption = document.querySelector(".option.active");
    const link = activeOption?.dataset.link;
    if (link) {
      window.location.href = link;
    }
  });

  const SUPPORTED_LANGUAGES = ["en", "fr", "es", "de", "ru", "it"];

  function getLangFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const langParam = params.get("lang");
    if (langParam && SUPPORTED_LANGUAGES.includes(langParam)) return langParam;
    return null;
  }

  function getSystemLang() {
    const lang = navigator.language?.slice(0, 2).toLowerCase();
    return SUPPORTED_LANGUAGES.includes(lang) ? lang : "en";
  }

  function applyTranslations(lang) {
    const dict = translations[lang] || translations["en"];
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.dataset.i18n;
      const value = dict[key];
      if (value) {
        if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
          el.placeholder = value;
        } else {
          el.innerHTML = value;
        }
      }
    });
  }

  const selectedLang = getLangFromUrl() || getSystemLang();
  applyTranslations(selectedLang);
  document.documentElement.setAttribute("lang", selectedLang);
});
