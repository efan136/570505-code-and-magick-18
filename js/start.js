'use strict';
var CLOUD_WIDTH = 420; // ширина облака и тени
var CLOUD_HEIGHT = 270; // высота облака и тени
var cloudX = 100; // координата облака x
var cloudY = 10; // координата облака y
var GAP = 10; // сдвиг тени
var fontY = 40; // координата заголовка y
var GAP_FONT = 15; // сдвиг шрифта
var cloudColor = 'white'; // цвет облака
var shadowColor = 'rgba(0, 0, 0, 0.7)'; // цвет тени
var graphHeight = 150; // высота диаграмы
var collWidth = 40; // ширина колонки
var colSpace = 50; // расстояние между колонками

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect (x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, cloudX + GAP, cloudY + GAP, shadowColor);
  renderCloud(ctx, cloudX, cloudY, cloudColor);

  ctx.fillStyle = 'black';
  ctx.font = 'PT Mono 16px'; // шрифт
  ctx.fillText('Ура вы победили!', cloudX + GAP, fontY); // текст
  ctx.fillText('Список результатов:', cloudX + GAP, fontY + GAP_FONT); // текст
  ctx.strokeStyle = 'blue';
  ctx.strokeRect(100, 100, 420, 150);

  for (var i = 0; i <= times.length - 1; i++) {
    var collHeight = (graphHeight * 1000) / times[i];
    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)'; // покрасил  колонку ВЫ
    }
    else {
      ctx.fillStyle = 'hsl(120,100%,Math.round(Math.random() + 10 * i) + '%' )'; // не получается с
    }

    ctx.fillRect(cloudX + GAP + (collWidth * i) + (colSpace * i), cloudX, collWidth, collHeight);
    ctx.fillText(names[i], cloudX + GAP + (collWidth * i) + (colSpace * i), fontY + GAP_FONT + graphHeight);
    ctx.fillText(Math.round(times[i]), cloudX + GAP + (collWidth * i) + (colSpace * i), 100);
  }
};

renderStatistics();

