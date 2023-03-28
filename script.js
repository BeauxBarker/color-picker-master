const mySelect = document.getElementById("mySelect");
let num = document.getElementById("numHex").textContent;
const hexInput = document.getElementById("hexInput");
let hexValue = "";

// Create a Pickr instance
const pickr = Pickr.create({
  el: '#color-picker',
  theme: 'classic',
  default: '#124DE0',
  components: {
    preview: true,
    opacity: true,
    hue: true,
    interaction: {
      hex: true,
      input: true,
      clear: true,
      save: true
    }
  }
});



hexInput.addEventListener("input", function() {
  hexValue = this.value;
  this.style.backgroundColor = "#" + hexValue;
});

// Listen for changes in the color picker and update the hex input field
pickr.on('change', (color) => {
  hexValue = color.toHEXA().toString(); // Update hexValue with the new color
  hexInput.style.backgroundColor = hexValue; // Update the background color of the input element
  hexInput.value = hexValue;
});

document.getElementById('btn').addEventListener('click', function(){
  let num = document.getElementById("numHex").value;
  let selectedOption = mySelect.options[mySelect.selectedIndex].value;
  
  if (hexValue.includes("#")){
    hexValue = hexValue.slice(1)
  }
  
  fetch(`https://www.thecolorapi.com/scheme?hex=${hexValue}&mode=${selectedOption}&count=${num}`)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    console.log(selectedOption)
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







