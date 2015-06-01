var Arrow = {
  tickNumber: 0,
  rightSidePointX: 20,
  topSidePointIncrement: 6,
  bottomSidePointIncrement: 6
};


var Slider = {
  x: -5,
  y: 0,
  width: 30,
  height: 145,
  borderWidth: 1
};

var tick = {
  width: 10,
  height: 1,
  intervals: 10,
  borderWidth: 1
};




function drawArrow(ctx, canvas) {
  ctx.beginPath();
  // pointy part: x,y
  ctx.moveTo(Arrow.rightSidePointX, canvas.height / 2);

  // top part
  ctx.lineTo(0, canvas.height / 2 - Arrow.topSidePointIncrement);

  // bottom part
  ctx.lineTo(0, canvas.height / 2 + Arrow.bottomSidePointIncrement);
  ctx.fillStyle = "#FF0000";

  ctx.fill();
}

function drawTicks(context, Slider, tick) {
  var i = 0;
  for (i = 0; i * tick.intervals < Slider.height; i++) {

    var a = Slider.x + Slider.width - tick.width;

    context.beginPath();

    if (i % 10 === 0) {
      context.rect(Slider.x + Slider.width - (tick.width + 5), Slider.y + i * tick.intervals, tick.width + 5, tick.height);

    } else {
      context.rect(Slider.x + Slider.width - tick.width, Slider.y + i * tick.intervals, tick.width, tick.height);
    }
    context.fillStyle = '#FFFFFF';
    context.fill();
    context.lineWidth = tick.borderWidth;
    context.strokeStyle = 'black';
    context.stroke();

  }
}

function drawRectangle(Slider, tick, context, canvas) {
  context.beginPath();
  context.rect(Slider.x, Slider.y, Slider.width, Slider.height);
  context.fillStyle = '#FFFFFF';
  context.fill();
  context.lineWidth = Slider.borderWidth;
  context.strokeStyle = 'white';
  context.stroke();

  drawTicks(context, Slider, tick);


}



//    drawRectangle(Slider, tick, context, canvas);



