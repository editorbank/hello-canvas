export type HTMLColor = string | CanvasGradient | CanvasPattern; 

export interface InData {
  color :'steelblue' | HTMLColor ;
  labels :string[];
  title ?:string;
  values :number[];
  overValue :number;
  overColor :'red' | HTMLColor;
  overLineColor :'red' | HTMLColor;
  maxLabelLen ?:0 | number;
}

var in_data :InData = {
  color: 'steelblue',
  labels: [ "США", "Индонезия (Очень длинное название)", "Китай", "Индия", "Бразилия", "Пакистан", "Нигерия", "Бангладеш", "Россия", "Япония"],
  title: 'Население',
  values: [326625791, 260580739, 1379302771, 1281935911, 207353391, 204924861, 190632261, 157826578, 142257519, 126451398],
  overValue: 400000000,
  overColor: 'red',
  overLineColor: 'red',
  maxLabelLen: 15,
}

export default in_data;