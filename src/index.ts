import { chart_draw } from "./chart_draw";
import in_data from "./in_data";

if(window) window.onload = function () {
  var theCanvas = (document.getElementById('theCanvas') as HTMLCanvasElement);
  if(theCanvas){
    chart_draw(theCanvas, in_data);
  }
}
