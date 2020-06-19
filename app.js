const brushSize = document.querySelector(".brush-size");
const brushColor = document.querySelector(".brush-color");
const downloadImg = document.querySelector(".download-image");
const clearCanvas = document.querySelector(".clear");

console.log(brushSize, brushColor, downloadImg, clearCanvas);

const canvas = document.querySelector(".drawingCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//global-variable
var size = 2,
  canvasColor = "black";

var drawObject = false;

//changing-brush-size
brushSize.addEventListener("change", (e) => {
  size = Math.floor(brushSize.value / 10);
  if (size === 0) {
    size = 1;
  }
});

//changing-brush-color
brushColor.addEventListener("change", (e) => {
  canvasColor = e.target.value;
});

//clearing canvas
clearCanvas.addEventListener("click", (e) => {
  if (confirm("Are your sure")) {
    return ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
});

//downloading image
downloadImg.addEventListener("click", (e) => {
  const saveImage = canvas.toDataURL();
  if (confirm("Are you sure you want to download")) {
    downloadImg.setAttribute("download", "download");
    downloadImg.setAttribute("href", saveImage);
  } else {
    return false;
  }
});

//adding-event-listener
canvas.addEventListener("mouseup", (e) => {
  drawElement(e.clientX, e.clientY);
  drawObject = false;
  ctx.beginPath();
});

canvas.addEventListener("mousedown", (e) => {
  drawObject = true;
});

canvas.addEventListener("mousemove", (e) => {
  if (drawObject) {
    drawElement(e.clientX, e.clientY);
  }
});

//drawing-object on canvas
function drawElement(xPos, yPos) {
  ctx.lineTo(xPos, yPos);
  ctx.strokeStyle = canvasColor;
  ctx.lineWidth = 2 * size;
  ctx.stroke();
  ctx.beginPath();
  ctx.fillStyle = canvasColor;
  ctx.arc(xPos, yPos, size, 0, Math.PI * 2, false);
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(xPos, yPos);
}
