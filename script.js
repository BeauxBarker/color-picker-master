const mySelect = document.getElementById("mySelect");
const { textContent: num } = document.getElementById("numHex");
const hexInput = document.getElementById("hexInput");
const btn = document.getElementById("btn")
const logoWrapper = document.getElementById('logo-wrapper');
const pickr = createPickr();
let hexValue = "";


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




document.getElementById('color-picker-btn').addEventListener('click', function(){
  pickr.show();
})

hexInput.addEventListener("input", function() {
  hexValue = this.value;
  this.style.backgroundColor = "#" + hexValue;
});

// Listen for changes in the color picker and update the hex input field
pickr.on('change', (color) => {
  hexValue = color.toHEXA().toString(); 
  hexInput.style.backgroundColor = hexValue;
  hexInput.style.textShadow = "2px 2px 2px #000000";
  hexInput.value = hexValue;
});


function selectRandomOption(selectElement) {
  const randomIndex = Math.floor(Math.random() * selectElement.options.length);
  selectElement.selectedIndex = randomIndex;
}

function generateRandomHexColor(numDigits = 6) {
  return Math.floor(Math.random() * 16 ** numDigits).toString(16).padStart(numDigits, '0');
}


document.querySelector('.wide-btn').addEventListener('click', function() {
  const randomColor = generateRandomHexColor();
  hexInput.value = randomColor;
  hexValue = randomColor;
  hexInput.style.backgroundColor = "#" + randomColor;
  selectRandomOption(mySelect);
  btn.click();
});


btn.addEventListener('click', function(){
  const num = document.getElementById("numHex").value;
  const selectedOption = mySelect.options[mySelect.selectedIndex].value;
  if (hexValue.includes("#")) {
    hexValue = hexValue.slice(1);
  }


logoWrapper.addEventListener('click', function() {
  pickr.destroy();
});

  
  fetch(`https://www.thecolorapi.com/scheme?hex=${hexValue}&mode=${selectedOption}&count=${num}`)
  .then((response) => response.json())
  .then((data) => {
    let colorsArray = [];
    for (let color of data.colors){
      colorsArray.push(color.hex.value);
    }
    let container = document.getElementById('colors');
    container.innerHTML = '';
    for (let i = 0; i < colorsArray.length; i++) {
      container.innerHTML += `
        <div class="one" style="background-color:${colorsArray[i]}">
        <div class="hex-container">${colorsArray[i]}</div>
        </div>
        
      `;
    }
  })
});







