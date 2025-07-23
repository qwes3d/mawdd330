// utils.mjs
// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

// Retrieve data from localStorage with error handling
export function getLocalStorage(key) {
  try {
    const data = localStorage.getItem(key);
    if (data === null) {
      return null; // Return null instead of [] to allow caller to decide fallback
    }
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error parsing localStorage key "${key}":`, error);
    return null; // Return null on parse error
  }
}

// Save data to localStorage
export function setLocalStorage(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving to localStorage key "${key}":`, error);
  }
}

// Set a listener for both touchend and click
export function setClick(selector, callback) {
  const element = qs(selector);
  if (!element) {
    console.error(`Element not found for selector: ${selector}`);
    return;
  }
  element.addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  element.addEventListener("click", callback);
}

// Get a query parameter from the URL
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false) {
  if (clear) {
    parentElement.innerHTML = "";
  }
  const htmlString = list.map(templateFn).join("");
  parentElement.insertAdjacentHTML(position, htmlString);
}

// utils.mjs

/**
 * Renders a single template with data
 * @param {HTMLTemplateElement} template 
 * @param {HTMLElement} parentElement 
 * @param {Object} data 
 * @param {Function} [callback] 
 */
export function renderWithTemplate(template, parentElement, data, callback) {
  const clone = template.content.cloneNode(true);
  parentElement.appendChild(clone);
  
  if (callback) {
    callback(data);
  }
}

/**
 * Loads HTML template from file
 * @param {string} path 
 * @returns {Promise<string>}
 */
export async function loadTemplate(path) {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Failed to load template: ${path}`);
  }
  return await response.text();
}

/**
 * Loads and renders header/footer
 * @param {string} headerPath 
 * @param {string} footerPath 
 */
export async function loadHeaderFooter(headerPath = './partials/header.html', footerPath = './partials/footer.html') {
  const headerElement = document.getElementById('header');
  const footerElement = document.getElementById('footer');
  
  try {
    // Load and render header
    if (headerElement) {
      const headerHtml = await loadTemplate(headerPath);
      const headerTemplate = document.createElement('template');
      headerTemplate.innerHTML = headerHtml;
      renderWithTemplate(headerTemplate, headerElement);
    }
    
    // Load and render footer
    if (footerElement) {
      const footerHtml = await loadTemplate(footerPath);
      const footerTemplate = document.createElement('template');
      footerTemplate.innerHTML = footerHtml;
      renderWithTemplate(footerTemplate, footerElement);
    }
    
    // Initialize cart icon if needed
    if (typeof initCartIcon === 'function') {
      initCartIcon();
    }
    
  } catch (err) {
    console.error('Error loading templates:', err);
  }
}
