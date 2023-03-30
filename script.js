// Elements
const elements = {
  mySelect: document.getElementById('mySelect'),
  num: document.getElementById('numHex').textContent,
  hexInput: document.getElementById('hexInput'),
  btn: document.getElementById('btn'),
  logoWrapper: document.getElementById('logo-wrapper'),
  menuToggle: document.querySelector('.menu-toggle'),
  menuItems: document.querySelector('.menu-items'),
  toast: document.getElementById('toast'),
  singleHex: document.getElementById('single-hex'),
  pickr: createPickr()
};

// Functions
function createPickr() {
  return Pickr.create({
    el: '#color-picker',
    theme: 'classic',
    default: '#124DE0',
    components: {
      preview: true,
      opacity: true,
      hue: true
    },
    interaction: {
      hex: true,
      input: true,
      clear: true,
      save: true
    }
  });
}

function selectRandomOption(selectElement) {
  selectElement.selectedIndex = Math.floor(Math.random() * selectElement.options.length);
}

function generateRandomHexColor(numDigits = 6) {
  return Math.floor(Math.random() * 16 ** numDigits).toString(16).padStart(numDigits, '0');
}

// Event listeners
window.addEventListener('load', () => {
  document.getElementById('logo').classList.add('fade-in');
});

document.getElementById('color-picker-btn').addEventListener('click', () => {
  elements.pickr.show();
});

elements.hexInput.addEventListener('input', () => {
  const hexValue = elements.hexInput.value;
  elements.hexValue = hexValue;
  elements.hexInput.style.backgroundColor = `#${hexValue}`;
});

elements.pickr.on('change', (color) => {
  const hexValue = color.toHEXA().toString();
  elements.hexValue = hexValue;
  elements.hexInput.style.backgroundColor = hexValue;
  elements.hexInput.style.textShadow = '1px 1px 1px #000000';
  elements.hexInput.value = hexValue;
});

document.querySelector('.random-btn').addEventListener('click', () => {
  const randomColor = generateRandomHexColor();
  elements.hexInput.value = randomColor;
  elements.hexValue = randomColor;
  elements.hexInput.style.backgroundColor = `#${randomColor}`;
  selectRandomOption(elements.mySelect);
  elements.btn.click();
});

elements.btn.addEventListener('click', () => {
  const hexValue = elements.hexValue.replace('#', '');
  const selectedOption = elements.mySelect.options[elements.mySelect.selectedIndex].value;



  fetch(`https://www.thecolorapi.com/scheme?hex=${hexValue}&mode=${selectedOption}&count=${elements.num}`)
    .then((response) => response.json())
    .then((data) => {
      const colorsArray = data.colors.map(color => color.hex.value);
      const container = document.getElementById('colors');
      container.innerHTML = '';

      colorsArray.forEach((color) => {
        container.innerHTML += `
          <div class="one-color" id="single-hex" style="background-color:${color}">
            <div class="color-icon-wrapper">
              <img class="copy" src="images/copy.png">
              <div class="hex-container">${color}</div>
            </div>
          </div>
        `;
      });


      const colorElements = document.querySelectorAll('.one-color');
      colorElements.forEach((colorElement) => {
        const hexValue = colorElement.querySelector('.hex-container').textContent;
        colorElement.addEventListener('click', () => {
          navigator.clipboard.writeText(hexValue)
          .then(() => {
            const toast = document.createElement('div');
            toast.classList.add('toast-notice');
            toast.innerHTML = `${hexValue} Copied to Clipboard!`;
    
            colorElement.parentElement.appendChild(toast);
    
            setTimeout(() => {
              toast.remove();
            }, 1000);
          })
          .catch((error) => {
            console.error('Could not copy text: ', error);
          });
      });
    });
  });
});



