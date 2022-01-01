  let ScreenWidth  = g.getWidth(),  CenterX = ScreenWidth/2;
  let ScreenHeight = g.getHeight(), CenterY = ScreenHeight/2;

  let outerRadius = Math.min(CenterX,CenterY) * 0.9;

  let HourHandLength = outerRadius * 0.5;
  let HourHandWidth  = 2*5, halfHourHandWidth = HourHandWidth/2;

  let MinuteHandLength = outerRadius * 0.7;
  let MinuteHandWidth  = 2*3, halfMinuteHandWidth = MinuteHandWidth/2;

  let SecondHandLength = outerRadius * 0.9;
  let SecondHandOffset = halfHourHandWidth + 10;

  let outerBoltRadius = halfHourHandWidth + 2, innerBoltRadius = outerBoltRadius - 4;
  let HandOffset = outerBoltRadius + 4;

  let twoPi  = 2*Math.PI, deg2rad = Math.PI/180;
  let Pi     = Math.PI;
  let halfPi = Math.PI/2;

  let sin = Math.sin, cos = Math.cos;

  let sine = [0, sin(30*deg2rad), sin(60*deg2rad), 1];

  let HandPolygon = [
    -sine[3],-sine[0], -sine[2],-sine[1], -sine[1],-sine[2], -sine[0],-sine[3],
     sine[0],-sine[3],  sine[1],-sine[2],  sine[2],-sine[1],  sine[3],-sine[0],
     sine[3], sine[0],  sine[2], sine[1],  sine[1], sine[2],  sine[0], sine[3],
    -sine[0], sine[3], -sine[1], sine[2], -sine[2], sine[1], -sine[3], sine[0],
  ];

  let HourHandPolygon = new Array(HandPolygon.length);
    for (let i = 0, l = HandPolygon.length; i < l; i+=2) {
      HourHandPolygon[i]   = halfHourHandWidth*HandPolygon[i];
      HourHandPolygon[i+1] = halfHourHandWidth*HandPolygon[i+1];
      if (i < l/2) { HourHandPolygon[i+1] -= HourHandLength; }
      if (i > l/2) { HourHandPolygon[i+1] += HandOffset; }
    }
  let MinuteHandPolygon = new Array(HandPolygon.length);
    for (let i = 0, l = HandPolygon.length; i < l; i+=2) {
      MinuteHandPolygon[i]   = halfMinuteHandWidth*HandPolygon[i];
      MinuteHandPolygon[i+1] = halfMinuteHandWidth*HandPolygon[i+1];
      if (i < l/2) { MinuteHandPolygon[i+1] -= MinuteHandLength; }
      if (i > l/2) { MinuteHandPolygon[i+1] += HandOffset; }
    }

/**** transforme polygon ****/

  let transformedPolygon = new Array(HandPolygon.length);

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
    let Seconds = now.getSeconds();

    let HoursAngle   = (Hours+(Minutes/60))/12 * twoPi - Pi;
    let MinutesAngle = (Minutes/60)            * twoPi - Pi;
    let SecondsAngle = (Seconds/60)            * twoPi - Pi;

    g.setColor(g.theme.fg);

    transformPolygon(HourHandPolygon, CenterX,CenterY, HoursAngle);
    g.fillPoly(transformedPolygon);

    transformPolygon(MinuteHandPolygon, CenterX,CenterY, MinutesAngle);
    g.fillPoly(transformedPolygon);

    let sPhi = Math.sin(SecondsAngle), cPhi = Math.cos(SecondsAngle);

    g.setColor(g.theme.fg2);
    g.drawLine(
      CenterX + SecondHandOffset*sPhi,
      CenterY - SecondHandOffset*cPhi,
      CenterX - SecondHandLength*sPhi,
      CenterY + SecondHandLength*cPhi
    );

    g.setColor(g.theme.fg);
    g.fillCircle(CenterX,CenterY, outerBoltRadius);

    g.setColor(g.theme.bg);
    g.drawCircle(CenterX,CenterY, outerBoltRadius);
    g.fillCircle(CenterX,CenterY, innerBoltRadius);
  }

/**** refreshDisplay ****/

  let Timer;
  function refreshDisplay () {
    g.clear(true);                                   // also loads current theme

    drawClockHands();

    let Pause = 1000 - (Date.now() % 1000);
    Timer = setTimeout(refreshDisplay,Pause);
  }

  setTimeout(refreshDisplay, 500);                 // enqueue first draw request
