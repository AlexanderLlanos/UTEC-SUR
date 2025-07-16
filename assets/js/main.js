// configuracion tailwind
tailwind.config = {
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem",
      },
    },
  },
};
// Animaciones
function fadeIn(el, delay = 0) {
  gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 1, delay: delay });
}

function slideUp(el, delay = 0) {
  gsap.fromTo(el, { y: 100 }, { y: 0, duration: 1, delay: delay });
}

// tab
function showTab(containerId, tabIndex) {
  var tabButtons = document.querySelectorAll(
    "#" + containerId + " .tab-button"
  );
  tabButtons.forEach((button) => {
    button.classList.remove("active");
  });

  var clickedButton = document.querySelector(
    "#" + containerId + " .tab-button:nth-child(" + tabIndex + ")"
  );
  clickedButton.classList.add("active");

  var tabContents = document.querySelectorAll(
    "#" + containerId + " .tab-content"
  );
  tabContents.forEach((content) => {
    content.classList.remove("active");
  });

  var selectedTabContent = document.querySelector(
    "#" + containerId + ' .tab-content[data-tab="' + tabIndex + '"]'
  );
  var selectedTabContent2 = document.querySelector(
    "#" +
      containerId +
      ' .tab-content.segundo-nivel[data-tab="' +
      tabIndex +
      '"]'
  );

  if (selectedTabContent) {
    selectedTabContent.classList.add("active");
    const fadeInElements = selectedTabContent.querySelectorAll(
      "[data-animation='fade-in']"
    );
    const slideUpElements = selectedTabContent.querySelectorAll(
      "[data-animation='slide-up']"
    );
    fadeInElements.forEach((el) => {
      const delay = el.dataset.animationDelay || 0;
      fadeIn(el, delay);
    });
    slideUpElements.forEach((el) => {
      const delay = el.dataset.animationDelay || 0;
      slideUp(el, delay);
    });
  }
  if (selectedTabContent2) {
    selectedTabContent2.classList.add("active");
  }
}

// Tab V2
function tab(event) {
  event.preventDefault();

  var currentTabButton = event.currentTarget;
  var tab = currentTabButton.closest(".js-tab");
  var tabBody = tab.querySelector(":scope > .js-tab-body");
  var tabPanes = tabBody.querySelectorAll(":scope > .js-tab-pane");

  if (currentTabButton.tagName === "SELECT") {
    var selectedOption = currentTabButton.selectedIndex;

    tabPanes.forEach((tabPane, index) => {
      tabPane.classList.remove("active");
      if (selectedOption === index) {
        tabPane.classList.add("active");
      }
    });
  } else {
    var tabHeader = tab.querySelector(":scope > .js-tab-header");
    var tabButtons = tabHeader.querySelectorAll(":scope > .js-tab-button");

    tabButtons.forEach((button, index) => {
      var tabPane = tabPanes[index];

      button.classList.remove("active");
      tabPane.classList.remove("active");

      if (button === currentTabButton) {
        button.classList.add("active");
        tabPane.classList.add("active");
      }
    });
  }
}

function f_isVisible(elem) {
  // Ventana de Visualización
  var posTopView = window.scrollY || window.pageYOffset;
  var posButView = posTopView + window.innerHeight;

  // Elemento a validar

  var elemRect = elem.getBoundingClientRect();
  var elemTop = elemRect.top + posTopView;
  var elemBottom = elemTop + elemRect.height;
  /* Comparamos los dos valores tanto del elemento como de la ventana*/
  return (
    (elemBottom < posButView && elemBottom > posTopView) ||
    (elemTop > posTopView && elemTop < posButView)
  );
}
// header
document.addEventListener("DOMContentLoaded", function () {
  const header = document.getElementById("main-header");
  let prevScrollPos = window.pageYOffset;

  window.onscroll = function () {
    const currentScrollPos = window.pageYOffset;
    if (prevScrollPos > currentScrollPos || currentScrollPos <= 138) {
      header.classList.remove("headerScroll");
      header.classList.add("headerScrollUp");
    } else {
      header.classList.add("headerScroll");
      header.classList.remove("headerScrollUp");
    }
    prevScrollPos = currentScrollPos;
  };
});

// accordion
function createAccordion(accordionId) {
  const accordion = document.getElementById(accordionId);
  if (!accordion) {
    console.error(`No se encontró el elemento con el ID "${accordionId}"`);
    return;
  }
  const accordionItems = accordion.querySelectorAll(".accordion-item");
  accordionItems.forEach((item) => {
    const header = item.querySelector(".accordion-header");

    header.addEventListener("click", () => {
      const isActive = item.classList.contains("active");
      accordionItems.forEach((otherItem) => {
        otherItem.classList.remove("active");
      });
      if (!isActive) {
        item.classList.add("active");
      }
    });
  });
}

// Accordion V2
function accordion(event) {
  event.preventDefault();

  var currentAccordionItem = event.currentTarget.closest(".js-accordion-item");
  var accordion = currentAccordionItem.closest(".js-accordion");
  var accordionItems = accordion.querySelectorAll(
    ":scope > .js-accordion-item"
  );

  accordionItems.forEach((item) => {
    if (item === currentAccordionItem) {
      item.classList.toggle("active");
    } else {
      item.classList.remove("active");
    }
  });
}

function initMarquee(element) {
  const marqueeWrapper = element.querySelector(".js-marquee-wrapper");
  const marqueeItems = element.querySelectorAll(".js-marquee-item");
  const marqueeItemsLength = marqueeItems.length;
  const marqueeWidth = element.offsetWidth;
  const marqueeItemWidth = marqueeItems[0].offsetWidth;
  let marqueePosition = 0;
  let intervalId;

  const duplicateItems = () => {
    const neededCopies =
      Math.ceil(marqueeWidth / (marqueeItemWidth * marqueeItemsLength)) + 1

    Array.from({ length: neededCopies }).forEach(() => {
      marqueeItems.forEach((marqueItem) => {
        marqueeWrapper.appendChild(marqueItem.cloneNode(true))
      })
    })
  }

  duplicateItems(marqueeItems)

  const startMarquee = () => {
    intervalId = setInterval(() => {
      marqueePosition -= 1;
      marqueeWrapper.style.transform = `translateX(${marqueePosition}px)`;

      if (marqueePosition <= -marqueeItemWidth * marqueeItemsLength) {
        marqueePosition = 0;
      }
    }, 10);
  };

  const stopMarquee = () => {
    clearInterval(intervalId);
  };

  duplicateItems(marqueeItems);

  element.addEventListener('mouseover', stopMarquee);
  element.addEventListener('mouseout', startMarquee);

  startMarquee();
}

document.addEventListener("DOMContentLoaded", function () {
  createAccordion("accordionQuestion");
  let sectionWhatsapp = document.querySelector(".section-whatsapp");

  function f_hiddenElement(nameElement) {
    if (f_isVisible(sectionWhatsapp)) {
      document.querySelector(nameElement).classList.add("hidden");
    } else {
      document.querySelector(nameElement).classList.remove("hidden");
    }
  }
  if (sectionWhatsapp) {
    f_hiddenElement(".icon-whatsapp");
    document.addEventListener("scroll", function () {
      f_hiddenElement(".icon-whatsapp");
    });
  }

  var tabButtons = document.querySelectorAll(".js-tab-button");
  tabButtons.forEach((button) => {
    button.addEventListener("click", tab);
  });

  var tabSelects = document.querySelectorAll(".js-tab-select");
  tabSelects.forEach((select) => {
    select.addEventListener("change", tab);
  });

  var accordionHeaders = document.querySelectorAll(".js-accordion-header");
  accordionHeaders.forEach((header) => {
    header.addEventListener("click", accordion);
  });

  var marquees = document.querySelectorAll(".js-marquee");
  marquees.forEach((marquee) => {
    initMarquee(marquee);
  });
});

function generateTooltip(name) {
  const targetElement = document.querySelector(`[data-tooltip-name="${name}"]`);
  const contentElement = document.querySelector(
    `[data-tooltip-content="${name}"]`
  );

  if (targetElement && contentElement) {
    contentElement.classList.add("hidden");

    tippy(targetElement, {
      content: contentElement.innerHTML,
      allowHTML: true,
      theme: "custom",
    });
  }
}
