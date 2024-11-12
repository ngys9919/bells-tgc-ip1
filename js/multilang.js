// Function to set the language preference
function checkSidebarVisibility() {
  if (window.getComputedStyle(document.getElementById("myDIV")).visibility === "hidden") {
    sidebarVisible = false;
    // alert("Sidebar visibility is hidden!");
  } else if (window.getComputedStyle(document.getElementById("myDIV")).visibility === "visible") {
    sidebarVisible = true;
    // alert("Sidebar visibility is visible!");
  }
}

// Function to set the language preference
function setLanguagePreference(lang, sidebarToggleState, mobileOrientation) {
    localStorage.setItem('language', lang);
    localStorage.setItem('sidebarToggleState', sidebarToggleState);
    localStorage.setItem('mobileOrientation', mobileOrientation);
    location.reload();
  }
  
  // Function to fetch language data
  async function fetchLanguageData(lang) {
    const response = await fetch(`lang/${lang}.json`);
    return response.json();
  }
  
  // Function to update content based on selected language
  function updateContent(langData, sidebarToggleState) {
    // if ((sidebarVisible == true) && (lang == "en")) {
      // console.log("Icons for Sidebar!");
    // } else {
        document.querySelectorAll("[data-i18n]").forEach((element) => {
        const key = element.getAttribute("data-i18n");

        if (element.tagName === "INPUT" && key === "navbar_placeholderSearch") {
          // If the element is an input with placeholder_text attribute, set placeholder
          element.placeholder = langData[key];
        } else if (element.tagName === "INPUT" && key === "navbar_placeholderLocate") {
          // If the element is an input with placeholder_text attribute, set placeholder
          element.placeholder = langData[key];
        } else if (element.tagName === "INPUT" && key === "sidebar_placeholderSearch") {
          // If the element is an input with placeholder_text attribute, set placeholder
          element.placeholder = langData[key];
        } else if (element.tagName === "BUTTON" && key === "sidebar_Toggle") {
          let x = document.getElementById("sidebar-search-results");
          let y = document.getElementById("sidebarToggleBtn");
          let w = document.getElementById("sidebarSearchBtn");
          let z = document.getElementById("sidebarSearchTerms");
          if ((sidebarVisible == true) && (lang == "zh")) {
            // alert("You have come here 2!");
            if (sidebarToggleState === "toggleon") {
              // alert("You have come here toggleon!");
              x.style.display = "block";
              y.innerHTML = "显示是开";
              w.style.opacity = 1;
              z.style.opacity = 1;
              // console.log(y.innerHTML);
            } else if (sidebarToggleState === "toggleoff") {
              // alert("You have come here toggleoff!");
              x.style.display = "none";
              y.innerHTML = "显示是关";
              w.style.opacity = 0;
              z.style.opacity = 0;
              // console.log(y.innerHTML);
            } else {
              // alert("You have come here toggle onoff!");
              y.innerHTML = "切换显示";
              // console.log(y.innerHTML);
            }
            // console.log(y.innerHTML);
          } else if ((sidebarVisible == true) && (lang == "en")) {
            // alert("You have come here 1!");
            if (sidebarToggleState === "toggleon") {
              // alert("You have come here toggleon!");
              x.style.display = "block";
              y.innerHTML = "Listings On";
              w.style.opacity = 1;
              z.style.opacity = 1;
              // console.log(y.innerHTML);
            } else if (sidebarToggleState === "toggleoff") {
              // alert("You have come here toggleoff!");
              x.style.display = "none";
              y.innerHTML = "Listings Off";
              w.style.opacity = 0;
              z.style.opacity = 0;
              // console.log(y.innerHTML);
            } else {
              if (mobileOrientation == "landscape") {
                y.innerHTML = "Toggle On/Off";
              } else if (mobileOrientation == "portrait") {
                y.innerHTML = "On/Off";
              }
              // alert("You have come here toggle onoff!");
              // console.log(y.innerHTML);
            }
            // console.log(y.innerHTML);
          }
        } else {
          if ((sidebarVisible == true) && (lang == "zh")) {
            // Change sidebar language for Chinese only,
            // For English, use icons instead!
            element.innerHTML = langData[key];
          } else if ((sidebarVisible == false)) {
            // For other elements, set text content
            //element.textContent = langData[key];
            element.innerHTML = langData[key];
          } else {
            // For other elements, set text content
            //element.textContent = langData[key];
            element.innerHTML = langData[key];
          }
        }
      })
    
    // Change sidebar language accordingly
    if (lang == "en") {
      languageSelected.value = "English";      
    } else if (lang == "zh") {
      languageSelected.value = "中文";
    }
  };

    
    



  // Function to change language
  async function changeLanguage(lang, sidebarToggleState, mobileOrientation) {
    await setLanguagePreference(lang, sidebarToggleState, mobileOrientation);
    
    const langData = await fetchLanguageData(lang);
    checkSidebarVisibility();
    updateContent(langData, sidebarToggleState);
  
  }

let lang = "en";
let sidebarToggleState = "toggleonoff";
let mobileOrientation = "portrait";

function debounce (func, wait, immediate) {
    let timeout;
    return () => {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};

function resizeUpdateContent() {
  // alert("You have resized!");
  // get the width of the screen after the resize event
  let width = document.documentElement.clientWidth;
  // tablets are between 768 and 922 pixels wide
  // phones are less than 768 pixels wide
  if (width < 768) {
    // alert("The width is now phone-sized!");
    // map.setView(singapore, 12); 
    // map.zoomIn(); 
  } else if ((width >= 768) && (width <= 992)) {
    // alert("The width is now tablet-sized!");
    // map.setView(singapore, 11);
    // map.zoomIn();
  } else {
    // alert("The width is now laptop-sized!");
    // map.setView(singapore, 10);
    // map.zoomOut();
  }
  // Refresh the page by setting the URL to itself
  location.href = location.href;
  
}

  // Call updateContent() on page load
window.addEventListener('DOMContentLoaded', async () => {
    // mobile orientation support
    const userMobileOrientation = localStorage.getItem('mobileOrientation') || 'portrait';
    mobileOrientation = userMobileOrientation;
    // sidebar language support
    const userSidebarToggleState = localStorage.getItem('sidebarToggleState') || 'toggleonoff';
    sidebarToggleState = userSidebarToggleState;
    // language support
    const userPreferredLanguage = localStorage.getItem('language') || 'en';
    lang = userPreferredLanguage;
    const langData = await fetchLanguageData(userPreferredLanguage);
    checkSidebarVisibility();
    updateContent(langData, sidebarToggleState);
});

// window.addEventListener('resize',debounce(handler, delay, immediate),false);
// The resize event should never be used directly as it is fired continuously as we resize.
// Use a debounce function to mitigate the excess calls.
// It will never fire more than once every 200ms.
// For immediate set to true, the side-effect is that for async-wait it need processing time, hence affects display.
// this work
window.addEventListener('resize', debounce(() => resizeUpdateContent(), 200, false),false);
// this work
// window.addEventListener('resize', debounce(() => console.log('hello'), 200, false), false);
// this work
// window.addEventListener('resize', debounce(() => alert('hello resizing'), 200, false), false);

// window.addEventListener('resize', function() {
  // alert("You have resized!");
  // get the width of the screen after the resize event
  // let width = document.documentElement.clientWidth;
  // tablets are between 768 and 922 pixels wide
  // phones are less than 768 pixels wide
  // if (width < 768) {
    // alert("The width is now phone-sized!");
      
  // } else if ((width >= 768) && (width <= 992)) {
    // alert("The width is now tablet-sized!");
    
  // } else {
    // alert("The width is now laptop-sized!");

  // }
  // Refresh the page by setting the URL to itself
  // location.href = location.href;
// });

// For mobile orientation changes use:
window.addEventListener('orientationchange', (event) => {
  // angle = 0 => portrait mode
  // angle = 90 => landscape mode
  
  if (event.target.screen.orientation.angle == 0) {
    mobileOrientation = "portrait";
  } else if (event.target.screen.orientation.angle == 90) {
    mobileOrientation = "landscape";
  }
  changeLanguage(lang, sidebarToggleState, mobileOrientation);
  // alert(`orientation change ${event.target.screen.orientation.angle}`), false
});
