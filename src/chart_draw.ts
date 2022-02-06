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
  var verticalGridColor = 'lightgray'; // '',null,undefined - без рисования вертикальной сетки
  
  // Вычисление минимов, максимов и пр.
  for( var i=0; i<count;i++){
    var value = in_data.values[i];
    if( minValue > value ) minValue = value;
    if( maxValue < value ) maxValue = value;
  };
  
  // тут должен быть Автоcкалинг
  var topValue = 1_400_000_000;
  var bottomValue = 0;
  // topValue = maxValue;
  // bottomValue = minValue;

  function verticalGradient(color :HTMLColor, W :number, X :number) :CanvasGradient|HTMLColor{
    // return color;
    var gradient = ctx.createLinearGradient(X, 0, W, 0);
    gradient.addColorStop(0.0, 'rgba(0,0,0,.5)');
    gradient.addColorStop(0.5, color as string);
    gradient.addColorStop(0.5, color as string);
    gradient.addColorStop(1.0, 'rgba(222,222,222,.5)');
    console.log(`gradient=${gradient} W=${W} W=${X}`);
    return gradient
  }
  
  function xScale(value :number, bottomValue :number, topValue :number){
    return (value - bottomValue) / (topValue - bottomValue)
  }
  function xRect(X :number, Y :number, W :number, H :number, color :HTMLColor){
    // рисование закрашеного прямоугольника с координатоми относительно нижнего левого угла холста
    ctx.fillStyle = color;
    ctx.fillRect(X, cH-Y-H, W, H);
  }

  function xVerticalText(text :string, X :number, Y :number, FS :number = 16, FN :string = 'Arial', fontColor :HTMLColor = 'black'){
    ctx.save();
    ctx.shadowColor = '#fff' as string;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowBlur = 5;
    ctx.font = `${FS}pt ${FN}`;
    ctx.textBaseline = "middle";
    ctx.textAlign = "start";
    ctx.translate(X, cH-Y);
    ctx.rotate(-Math.PI/2);
    ctx.fillStyle = fontColor;
    ctx.fillText(in_data.labels[i], 0, 0);
    ctx.restore();
  }

  var SA = 10 ; // Растояние между столбиком и линией вертикальной сетки
  // Рисование столбиков
  for( var i=0; i<count;i++){
    var value = in_data.values[i];
    var H = cH*xScale(value, bottomValue, topValue);
    xRect(vW*i+SA, 0, vW-SA-SA, H, verticalGradient(value >= in_data.overValue ? in_data.overColor : in_data.color, vW*i+SA, vW*i+SA + (vW-SA-SA)));
    // Верикальная сетка    
    if (verticalGridColor) xRect(vW*i, 0, .5, cH, verticalGridColor);
    xVerticalText(in_data.labels[i], 0+i*vW +vW/2, 10);
  
  };
  if (verticalGridColor) xRect(vW*count-1, 0, .5, cH, verticalGridColor); // последяя правая линия сетки
  
  // Рисование прога превышения
  var H = cH*xScale(in_data.overValue, bottomValue, topValue);
  xRect(0, H, cW, .45, in_data.overLineColor);
  
}
