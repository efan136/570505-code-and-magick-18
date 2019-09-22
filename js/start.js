'use strict';
var CLOUD_WIDTH = 420; // ширина облака и тени
var CLOUD_HEIGHT = 270; // высота облака и тени
var cloudX = 100; // координата облака x
var cloudY = 10; // координата облака y
var GAP = 10; // сдвиг тени
var fontY = 40; // координата заголовка y
var fontHeight = 17; // высота строки текста
var GAP_FONT = 15; // межстрочное расстояие
var cloudColor = 'white'; // цвет облака
var shadowColor = 'rgba(0, 0, 0, 0.7)'; // цвет тени
var graphHeight = 150; // высота диаграмы
var collWidth = 40; // ширина колонки
var colSpace = 50; // расстояние между колонками
var maxCollHeight = graphHeight - fontHeight - GAP_FONT - fontHeight; // макс высота столбцов
var fontColor = '#000000';
var userColor = 'rgba(255, 0, 0, 1)';

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];
  for (var i = 0; i <= arr.length; i++) {
    if (arr[i] > maxElement){
      maxElement = arr[i];
    }
  }
  return maxElement;
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, cloudX + GAP, cloudY + GAP, shadowColor); // тень
  renderCloud(ctx, cloudX, cloudY, cloudColor); // облако

  ctx.fillStyle = fontColor;
  ctx.font = 'PT Mono 16px';
  ctx.fillText('Ура вы победили!', cloudX + GAP, fontY);
  ctx.fillText('Список результатов:', cloudX + GAP, fontY + fontHeight + GAP_FONT); // текст

  var maxTime = getMaxElement(times);

  for (var i = 0; i <= times.length - 1; i++) {
    var collHeight = (maxCollHeight * times[i]) / maxTime; // высота колонки
    var randomColor = 100 - (Math.random() * 100); // рандомная насыщенность

    if (names[i] === 'Вы') {
      ctx.fillStyle = userColor;
      ctx.strokeStyle = userColor;
    } else {
      ctx.fillStyle = 'hsl(240,100%,' + randomColor + '%)';
      ctx.strokeStyle = 'hsl(240,100%,' + randomColor + '%)';

    }
    ctx.beginPath();
    ctx.moveTo(cloudX + GAP + (collWidth * i) + (colSpace * i), fontY + fontHeight + GAP_FONT + fontHeight + GAP_FONT + graphHeight - fontHeight);
    ctx.lineTo(cloudX + GAP + (collWidth * i) + (colSpace * i), fontY + fontHeight + GAP_FONT + fontHeight + GAP_FONT + graphHeight - fontHeight - collHeight);
    ctx.lineTo(cloudX + GAP + (collWidth * i) + (colSpace * i) + collWidth, fontY + fontHeight + GAP_FONT + fontHeight + GAP_FONT + graphHeight - fontHeight - collHeight);
    ctx.lineTo(cloudX + GAP + (collWidth * i) + (colSpace * i) + collWidth, fontY + fontHeight + GAP_FONT + fontHeight + GAP_FONT + graphHeight - fontHeight);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = fontColor;
    ctx.fillText(names[i], cloudX + GAP + (collWidth * i) + (colSpace * i), fontY + fontHeight + GAP_FONT + fontHeight + GAP_FONT + graphHeight);
    ctx.fillText(Math.round(times[i]), cloudX + GAP + (collWidth * i) + (colSpace * i), fontY + fontHeight + GAP_FONT + fontHeight + GAP_FONT + graphHeight - fontHeight - collHeight - GAP_FONT);
  }
};

