const canvas = document.querySelector("#canvas"),
  ctx = canvas.getContext("2d");

let isDrawing = false;
let color = "green";

let colorBoxes = Array.from(document.getElementsByClassName("clr"));

console.log(colorBoxes);
colorBoxes.forEach((box) => {
  box.addEventListener("click", () => {
    color = box.getAttribute("data-clr");
  });
});

window.addEventListener("load", () => {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
});

const startDrawing = () => {
  isDrawing = true;
  ctx.beginPath();
  // ctx.style.color = color;

  // add color to stroke
};

const drawing = (e) => {
  if (!isDrawing) return;
  ctx.strokeStyle = color;
  ctx.lineWidth = 3;
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  // console.log("s")
};

canvas.addEventListener("mousemove", drawing);
canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mouseup", () => {
  isDrawing = false;
});
