const canvas = document.getElementById("canvas");
const body = document.querySelector("body");
canvas.height = window.innerHeight;
canvas.widhth = window.innerWidth;

let theColor = '';
let lineW = 5;
let prevX = null;
let prevY = null;
let draw = false;

body.backgroundColor = "#FFFFFF";
let theInput = document.getElementById("favcolor");

theInput.addEventListener("input", function () {
    theColor = theInput.value;
    body.style.backgroundColor = theColor;

}, false);
const ctx = canvas.getContext("2d")
ctx.lineWidth = lineW;

document.getElementById("ageInputId").oninput = function(){
    draw = null;
    lineW = document.getElementById("ageInputId").innerHTML = lineW;
    ctx.lineWidth = lineW;

};

let clrs = document.querySelectorAll(".clr");
clrs = Array.from(clrs);
clrs.forEach(clr =>{
    clr.addEventListener("click", ()=>{
        ctx.strokeStyle = clr.dataset.clr;

    })
})

let clearBtn = document.querySelector("#clear")
clearBtn.addEventListener("click", ()=>{
    ctx.clearRect(0,0,canvas.width,canvas.height)
});

let saveBtn = document.querySelector("#save");
saveBtn.addEventListener("click",()=>{
    let data = canvas.toDataURL("img/png");
    let a = document.createElement("a");
    a.href = data;
    a.download = "sketch.png";
    a.click();

})

window.addEventListener("mousedown", (e) => draw = true);
window.addEventListener("mouseup", (e) => draw = false);

window.addEventListener("mousemove", (e) => {
    if (prevX == null || prevY == null || !draw){
        prevX = e.clientX;
        prevY = e.clientY;
        return
    }

    let currentX = e.clientX;
    let currentY = e.clientY;

    ctx.beginPath();
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(currentX, currentY);

    prevX = currentX;
    prevY = currentY;
    


} )