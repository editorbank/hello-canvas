import { InData } from "./in_data";

console.log("Hello from main_module.ts!");

export function crop_string(s :string, maxLen :number = 0) :string {
  if(s.length > maxLen && maxLen !== 0)
    return s.substring(0,maxLen) + '...'
  else
    return s;
}
export function canvas_draw(canvas :HTMLCanvasElement, in_data :InData){
  if(!canvas) return;
  var opt :CanvasRenderingContext2DSettings = {alpha: true};
  var ctx = canvas.getContext('2d', opt) as CanvasRenderingContext2D;
  // var fillRule :CanvasFillRule = "nonzero";
  // ctx.fill(fillRule)
  var W = canvas.width, H = canvas.height;
  // Rects 
  ctx.strokeStyle = 'red';
  ctx.fillStyle = 'green';
	ctx.strokeRect(W/4-W/8, H/4-H/8, W/2, H/2)
	ctx.fillRect(W/4+W/8, H/4+H/8, W/2, H/2)
	ctx.clearRect(W/4, H/4, W/2, H/2)
  // Lines
  ctx.strokeStyle = 'orange';
  ctx.fillStyle = 'orange';
  ctx.beginPath();
  ctx.arc(80, 100, 56, 3/4 * Math.PI, 1/4 * Math.PI, true);
  ctx.fill(); // *14
  ctx.moveTo(40, 140);
  ctx.lineTo(20, 40);
  ctx.lineTo(60, 100);
  ctx.lineTo(80, 20);
  ctx.lineTo(100, 100);
  ctx.lineTo(140, 40);
  ctx.lineTo(120, 140);
  ctx.stroke(); // *22
  // Кривые Бернштейна-Безье
  ctx.strokeStyle = 'rgba(0,0,255, 0.5)';
  ctx.beginPath();
  ctx.moveTo(10, 15);
  ctx.bezierCurveTo(75, 55, 175, 20, 250, 15);
  ctx.moveTo(10, 15);
  ctx.quadraticCurveTo(100, 100, 250, 15);
  ctx.stroke();


}

console.log("Done main_module.ts.");
