  let ScreenWidth  = g.getWidth(),  CenterX = ScreenWidth/2;
  let ScreenHeight = g.getHeight(), CenterY = ScreenHeight/2;

  let outerRadius = Math.min(CenterX,CenterY) * 0.9;

  let HourHandLength = outerRadius * 0.5;
  let HourHandWidth  = 2*3, halfHourHandWidth = HourHandWidth/2;

  let MinuteHandLength = outerRadius * 0.7;
  let MinuteHandWidth  = 2*2, halfMinuteHandWidth = MinuteHandWidth/2;

  let twoPi  = 2*Math.PI;
  let Pi     = Math.PI;
  let halfPi = Math.PI/2;

  let sin = Math.sin, cos = Math.cos;

  let HourHandPolygon = [
    -halfHourHandWidth,halfHourHandWidth,
    -halfHourHandWidth,halfHourHandWidth-HourHandLength,
     halfHourHandWidth,halfHourHandWidth-HourHandLength,
     halfHourHandWidth,halfHourHandWidth,
  ];

  let MinuteHandPolygon = [
    -halfMinuteHandWidth,halfMinuteHandWidth,
    -halfMinuteHandWidth,halfMinuteHandWidth-MinuteHandLength,
     halfMinuteHandWidth,halfMinuteHandWidth-MinuteHandLength,
     halfMinuteHandWidth,halfMinuteHandWidth,
  ];

/**** transforme polygon ****/

  let transformedPolygon = new Array(HourHandPolygon.length);

  function transformPolygon (originalPolygon, OriginX,OriginY, Phi) {
    let sPhi = sin(Phi), cPhi = cos(Phi), x,y;

    for (let i = 0, l = originalPolygon.length; i < l; i+=2) {
      x = originalPolygon[i];
      y = originalPolygon[i+1];

      transformedPolygon[i]   = OriginX + x*cPhi + y*sPhi;
      transformedPolygon[i+1] = OriginY + x*sPhi - y*cPhi;
    }
  }

/**** draw clock hands ****/

  function drawClockHands () {
    let now = new Date();

    let Hours   = now.getHours() % 12;
    let Minutes = now.getMinutes();

    let HoursAngle   = (Hours+(Minutes/60))/12 * twoPi - Pi;
    let MinutesAngle = (Minutes/60)            * twoPi - Pi;

    g.setColor(g.theme.fg);

    transformPolygon(HourHandPolygon, CenterX,CenterY, HoursAngle);
    g.fillPoly(transformedPolygon);

    transformPolygon(MinuteHandPolygon, CenterX,CenterY, MinutesAngle);
    g.fillPoly(transformedPolygon);
  }

/**** refreshDisplay ****/

  let Timer;
  function refreshDisplay () {
    g.clear(true);                                   // also loads current theme

    drawClockHands();

    let Pause = 60000 - (Date.now() % 60000);
    Timer = setTimeout(refreshDisplay,Pause);
  }

  setTimeout(refreshDisplay, 500);                 // enqueue first draw request
