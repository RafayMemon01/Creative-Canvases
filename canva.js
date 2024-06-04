const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
let isDrawing = false;
let color = "green";
let brushSize = 5;

const colorBoxes = Array.from(document.getElementsByClassName("clr"));
const favColorInput = document.getElementById("favcolor");
const brushSizeInput = document.getElementById("brushSize");
const clearButton = document.getElementById("clear");
const saveButton = document.getElementById("save");

// Set up color boxes
colorBoxes.forEach((box) => {
  box.addEventListener("click", () => {
    colorBoxes.forEach((sibling) => sibling.classList.remove("active"));
    color = box.getAttribute("data-clr");
    box.classList.add("active");
  });
});

// Handle favorite color input
favColorInput.addEventListener("input", () => {
  color = favColorInput.value;
});

// Handle brush size input
brushSizeInput.addEventListener("input", () => {
  brushSize = brushSizeInput.value;
});

// Adjust canvas size on load
window.addEventListener("load", () => {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
});

// Drawing functions
const startDrawing = (e) => {
  isDrawing = true;
  ctx.beginPath();
  ctx.moveTo(e.offsetX || e.touches[0].clientX - canvas.offsetLeft, e.offsetY || e.touches[0].clientY - canvas.offsetTop);
};

const drawing = (e) => {
  if (!isDrawing) return;
  ctx.strokeStyle = color;
  ctx.lineWidth = brushSize;
  ctx.lineTo(e.offsetX || e.touches[0].clientX - canvas.offsetLeft, e.offsetY || e.touches[0].clientY - canvas.offsetTop);
  ctx.stroke();
};

const stopDrawing = () => {
  isDrawing = false;
  ctx.closePath();
};

// Event listeners for drawing
canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", drawing);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mouseout", stopDrawing);

canvas.addEventListener("touchstart", (e) => {
  e.preventDefault();
  startDrawing(e);
});
canvas.addEventListener("touchmove", (e) => {
  e.preventDefault();
  drawing(e);
});
canvas.addEventListener("touchend", stopDrawing);
canvas.addEventListener("touchcancel", stopDrawing);

// Clear canvas
clearButton.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Save canvas
saveButton.addEventListener("click", () => {
  const link = document.createElement('a');
  link.download = 'canvas.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
});
