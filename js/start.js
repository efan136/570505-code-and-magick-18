'use strict';
var CLOUD_WIDTH = 420; // ширина облака и тени
var CLOUD_HEIGHT = 270; // высота облака и тени
var CLOUD_X = 100; // координата облака x
var CLOUD_Y = 10; // координата облака y
var GAP = 10; // сдвиг тени
var FONT_Y = 40; // координата заголовка y
var FONT_HEIGHT = 17; // высота строки текста
var GAP_FONT = 15; // межстрочное расстояие
var CLOUD_COLOR = 'white'; // цвет облака
var SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)'; // цвет тени
var GRAPH_HEIGHT = 150; // высота диаграмы
var COLL_WIDTH = 40; // ширина колонки
var COLL_SPACE = 50; // расстояние между колонками
var maxCollHeight = GRAPH_HEIGHT - FONT_HEIGHT - GAP_FONT - FONT_HEIGHT; // макс высота столбцов
var FONT_COLOR = '#000000';
var FONT_STYLE = 'PT Mono 16px';
var USER_COLOR = 'rgba(255, 0, 0, 1)';
var headingLines = ['Ура вы победили!', 'Список результатов:'];

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];
  for (var i = 0; i <= arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

var getRandomNumber = function () {
  var randomNumber = Math.round(Math.random() * 100);
  return randomNumber;
};

var printHeading = function (ctx, arr) {
  ctx.fillStyle = FONT_COLOR;
  ctx.font = FONT_STYLE;
  for (var i = 0; i <= arr.length - 1; i++) {
    if (i < 1) {
      ctx.fillText(arr[i], CLOUD_X + GAP, FONT_Y);
    } else {
      ctx.fillText(arr[i], CLOUD_X + GAP, FONT_Y + (FONT_HEIGHT * i) + (GAP_FONT * i));
    }
  }
};

var printTimes = function (ctx, arr) {
  ctx.fillStyle = FONT_COLOR;
  for (var i = 0; i <= arr.length - 1; i++) {
    ctx.fillText(Math.round(arr[i]), CLOUD_X + GAP + (COLL_WIDTH * i) + (COLL_SPACE * i), FONT_Y + FONT_HEIGHT + GAP_FONT + FONT_HEIGHT + GAP_FONT + GRAPH_HEIGHT - FONT_HEIGHT - getCollHeights(arr)[i] - GAP_FONT);
  }
};

var getCollHeights = function (arr) {
  var collHeights = [];
  for (var i = 0; i <= arr.length - 1; i++) {
    var collHeight = (maxCollHeight * arr[i]) / getMaxElement(arr);
    collHeights.push(collHeight);
  }
  return collHeights;
};

var drawGraph = function (ctx, times, names) {
  for (var i = 0; i <= times.length - 1; i++) {
    if (names[i] === 'Вы') {
      ctx.fillStyle = USER_COLOR;
    } else {
      ctx.fillStyle = 'hsl(240,100%,' + getRandomNumber() + '%)';
    }

    ctx.beginPath();
    ctx.moveTo(CLOUD_X + GAP + (COLL_WIDTH * i) + (COLL_SPACE * i),
        FONT_Y + FONT_HEIGHT + GAP_FONT + FONT_HEIGHT + GAP_FONT + GRAPH_HEIGHT - FONT_HEIGHT);
    ctx.lineTo(CLOUD_X + GAP + (COLL_WIDTH * i) + (COLL_SPACE * i),
        FONT_Y + FONT_HEIGHT + GAP_FONT + FONT_HEIGHT + GAP_FONT + GRAPH_HEIGHT - FONT_HEIGHT - getCollHeights(times)[i]);
    ctx.lineTo(CLOUD_X + GAP + (COLL_WIDTH * i) + (COLL_SPACE * i) + COLL_WIDTH,
        FONT_Y + FONT_HEIGHT + GAP_FONT + FONT_HEIGHT + GAP_FONT + GRAPH_HEIGHT - FONT_HEIGHT - getCollHeights(times)[i]);
    ctx.lineTo(CLOUD_X + GAP + (COLL_WIDTH * i) + (COLL_SPACE * i) + COLL_WIDTH,
        FONT_Y + FONT_HEIGHT + GAP_FONT + FONT_HEIGHT + GAP_FONT + GRAPH_HEIGHT - FONT_HEIGHT);
    ctx.closePath();
    ctx.fill();
  }
};

var printNames = function (ctx, arr) {
  ctx.fillStyle = FONT_COLOR;
  for (var i = 0; i <= arr.length - 1; i++) {
    ctx.fillText(arr[i], CLOUD_X + GAP + (COLL_WIDTH * i) + (COLL_SPACE * i), FONT_Y + FONT_HEIGHT + GAP_FONT + FONT_HEIGHT + GAP_FONT + GRAPH_HEIGHT);
  }
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, SHADOW_COLOR);
  renderCloud(ctx, CLOUD_X, CLOUD_Y, CLOUD_COLOR);
  printHeading(ctx, headingLines);
  printNames(ctx, names);
  drawGraph(ctx, times, names);
  printTimes(ctx, times);
};
