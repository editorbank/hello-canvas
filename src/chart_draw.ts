import { HTMLColor, InData } from "./in_data";

export function chart_draw(canvas :HTMLCanvasElement, in_data :InData){
  if(!canvas){ console.error("No canvas!"); return;}
  if(!in_data || in_data.values.length == 0){ console.error("No data!"); return;}
  var ctx = canvas.getContext('2d', {
    alpha: true, // прозрачный холст
  }) as CanvasRenderingContext2D;
  if(!ctx){ console.error("No create context!"); return;}
 
  // init
  var cW = canvas.width
  var cH = canvas.height;
  var count = in_data.values.length;
  var vW = cW/count; // Ширина областей прямоугольников
  var minValue = in_data.values[0]||0;
  var maxValue = minValue;
  
  // Вычисление минимов, максимов и пр.
  for( var i=0; i<count;i++){
    var value = in_data.values[i];
    if( minValue > value ) minValue = value;
    if( maxValue < value ) maxValue = value;
  };
  
  // тут должен быть Автокалинг
  var topValue = 1_400_000_000;
  var bottomValue = 0;
  // topValue = maxValue;
  // bottomValue = minValue;
  
  function xScale(value :number, bottomValue :number, topValue :number){
    return (value - bottomValue) / (topValue - bottomValue)
  }
  
  // Рисование столбиков
  for( var j=0; j<count;j++){
    var value = in_data.values[j];
    var H = cH*xScale(value, bottomValue, topValue);
    ctx.fillStyle = value>=in_data.overValue ? in_data.overColor : in_data.color;
    ctx.fillRect(vW*j+10, cH-H, vW-20, H);
  };
  
  // Рисование прога превышения
  var H = cH*xScale(in_data.overValue, bottomValue, topValue);
  ctx.strokeStyle = in_data.overLineColor;
  ctx.beginPath();
  ctx.moveTo(0, cH-H);
  ctx.lineTo(cW, cH-H);
  ctx.stroke();
  ctx.closePath();

}
