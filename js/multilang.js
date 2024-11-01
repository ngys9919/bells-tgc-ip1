// Function to set the language preference
function setLanguagePreference(lang) {
    localStorage.setItem('language', lang);
    location.reload();
  }
  
  // Function to fetch language data
  async function fetchLanguageData(lang) {
    const response = await fetch(`lang/${lang}.json`);
    return response.json();
  }
  
  // Function to update content based on selected language
  function updateContent(langData) {
    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const key = element.getAttribute("data-i18n");
  
      if (element.tagName === "INPUT" && key === "navbar_placeholderSearch") {
        // If the element is an input with placeholder_text attribute, set placeholder
        element.placeholder = langData[key];
      } if (element.tagName === "INPUT" && key === "navbar_placeholderLocate") {
        // If the element is an input with placeholder_text attribute, set placeholder
        element.placeholder = langData[key];
      } else {
        // For other elements, set text content
        //element.textContent = langData[key];
        element.innerHTML = langData[key];
      }
    });
  }
  
  // Function to change language
  async function changeLanguage(lang) {
    await setLanguagePreference(lang);
    
    const langData = await fetchLanguageData(lang);
    updateContent(langData);
  
  }

  let lang = "en";

  // Call updateContent() on page load
window.addEventListener('DOMContentLoaded', async () => {
    const userPreferredLanguage = localStorage.getItem('language') || 'en';
    lang = userPreferredLanguage;
    const langData = await fetchLanguageData(userPreferredLanguage);
    updateContent(langData);
});

