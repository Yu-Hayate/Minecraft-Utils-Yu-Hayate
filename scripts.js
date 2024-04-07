var colors = ['#27FA71'];
var colorFades = ['#56AA4E'];
var FireworkCommand = `/give @p firework_rocket{Fireworks:{display:{Name:'{"text":"<custom name;>", "color":"blue"}'},Flight:2b,Explosions:[{Type:<Type;>,Flicker:<Flicker;>b,Trail:<Trail;>b,Colors:[I;<colors;>],FadeColors:[I;<fades;>]}]}} 1`//`/give @p firework_star{display:{Name:'{"text":"<custom name;>", "color":"blue"}'},Explosion:{Type:<Type;>,Flicker:<Flicker;>b,Trail:<Trail;>b,Colors:[I;0,<colors;>],FadeColors:[I;<fades;>]}} 1`
var Flicker = false
var Trail = false
renderColors();
renderColorsFade();
function CalculateNetherCoords() {
    var coords = document.getElementById('_coords').value;
    let pos = coords.split(',');
    for (let i = 0; i <= 1; i++) {pos[i] = pos[i] >> 3};
    document.getElementById('_ConvertedCoords').value = pos[0] + ', ' + pos[1];
}
function CalculateOverworldCoords() {
    var coords = document.getElementById('_coords').value;
    let pos = coords.split(',');
    for (let i = 0; i <= 1; i++) {pos[i] = pos[i] << 3};
    document.getElementById('_ConvertedCoords').value = pos[0] + ', ' + pos[1];
}
function changeColor(index) {
    const colorInput = document.getElementById('colorInput');
    const color = colorInput.value.trim();
    colors[index] = color;
    renderColors();
}
function removeColor(index) {
    colors.splice(index, 1);
    renderColors();
}
function addColor() {
    const colorInput = document.getElementById('colorInput');
    const color = colorInput.value.trim();
    if (color) {
        colors.push(color);
        renderColors();
    }
}
function renderColors() {
    const colorList = document.getElementById('colorList');
    colorList.innerHTML = '';
    colors.forEach((color, index) => {
        const li = document.createElement('li');
        const colorSpan = document.createElement('span');
        colorSpan.textContent = color.toUpperCase();
        colorSpan.style.color = '#ffffff'; // Set text color to white (brighter)
        li.appendChild(colorSpan);
        const canvas = document.createElement('canvas');
        canvas.width = 50;
        canvas.height = 20;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        li.appendChild(canvas);
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.addEventListener('click', () => removeColor(index));
        li.appendChild(removeBtn);
        const changeColorBtn = document.createElement('button');
        changeColorBtn.textContent = 'Change';
        changeColorBtn.addEventListener('click', () => changeColor(index));
        li.appendChild(changeColorBtn);
        colorList.appendChild(li);
    });
}

function changeColorFade(index) {
    const colorInput = document.getElementById('colorFadeInput');
    const color = colorInput.value.trim();
    colorFades[index] = color;
    renderColorsFade();
}
function removeColorFade(index) {
    colorFades.splice(index, 1);
    renderColorsFade();
}
function addColorFade() {
    const colorInput = document.getElementById('colorFadeInput');
    const color = colorInput.value.trim();
    if (color) {
        colorFades.push(color);
        renderColorsFade();
    }
}
function renderColorsFade() {
    const colorList = document.getElementById('colorFadeList');
    colorList.innerHTML = '';
    colorFades.forEach((color, index) => {
        const li = document.createElement('li');
        const colorSpan = document.createElement('span');
        colorSpan.textContent = color.toUpperCase();
        colorSpan.style.color = '#ffffff'; // Set text color to white (brighter)
        li.appendChild(colorSpan);
        const canvas = document.createElement('canvas');
        canvas.width = 50;
        canvas.height = 20;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        li.appendChild(canvas);
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.addEventListener('click', () => removeColorFade(index));
        li.appendChild(removeBtn);
        const changeColorBtn = document.createElement('button');
        changeColorBtn.textContent = 'Change';
        changeColorBtn.addEventListener('click', () => changeColorFade(index));
        li.appendChild(changeColorBtn);
        colorList.appendChild(li);
    });
}
function hexToDecimal(hex) {
    // Remove the '#' symbol if it exists
    hex = hex.replace('#', '');
    var dec = parseInt(hex, 16);
    // Return the decimal representation as an object
    return dec;
}
document.getElementById('_Flicker').addEventListener('change', function() { 
    Flicker = !Flicker;
});

document.getElementById('_Trail').addEventListener('change', function() {
    Trail = !Trail;
});
// command: /give @p firework_star{display:{Name:'{"text":"<custom name;>", "color":"blue"}'},Explosion:{Type:<Type;>,Flicker:<Flicker;>b,Trail:<trail>b,Colors:[I;0,<colors;>],FadeColors:[I;<fades;>]}} 1
function CreateFirework() {
    var command = FireworkCommand;
    const fireworkType = parseFloat(document.getElementById('FireworkType').value);
    const colorList = JSON.stringify(colors.map(color => hexToDecimal(color))).replace('[', '').replace(']', '');
    const fadeColorList = JSON.stringify(colorFades.map(color => hexToDecimal(color))).replace('[', '').replace(']', '');
    command = command.replace('<custom name;>', 'Firework');
    command = command.replace('<Type;>', fireworkType);
    command = command.replace('<Flicker;>', Flicker ? '1' : '0')
    command = command.replace('<Trail;>', Trail ? '1' : '0')
    command = command.replace('<colors;>', colorList)
    command = command.replace('<fades;>', fadeColorList)
    console.log(command)

}