  let ScreenWidth  = g.getWidth(),  CenterX = ScreenWidth/2;
  let ScreenHeight = g.getHeight(), CenterY = ScreenHeight/2;

  let MoonRadius = Math.min(CenterX,CenterY) * 0.8;

  g.setBgColor('#000000');
  g.clear(false);

  function drawMoonPhase (CenterX,CenterY, Radius, leftFactor,rightFactor) {
    let x = Radius, y = 0, Error = Radius;

    g.drawLine(CenterX-leftFactor*x,CenterY, CenterX+rightFactor*x,CenterY);

    let dx,dy;
    while (y <= x) {
      dy = 1 + 2*y; y++; Error -= dy;
      if (Error < 0) {
        dx = 1 - 2*x; x--; Error -= dx;
      }

      g.drawLine(CenterX-leftFactor*x,CenterY-y, CenterX+rightFactor*x,CenterY-y);
      g.drawLine(CenterX-leftFactor*x,CenterY+y, CenterX+rightFactor*x,CenterY+y);
      g.drawLine(CenterX-leftFactor*y,CenterY-x, CenterX+rightFactor*y,CenterY-x);
      g.drawLine(CenterX-leftFactor*y,CenterY+x, CenterX+rightFactor*y,CenterY+x);
    }
  }


  g.setColor('#FFFFFF');

  let leftFactor = -1.0; let rightFactor = 1.0;
  function updateDisplay () {
    switch (true) {
      case (rightFactor === 1.0) && (leftFactor < 1.0):
        leftFactor += 0.1;
        if (leftFactor > 1.0) { leftFactor = 1.0; }
        break;
      case (leftFactor === 1.0) && (rightFactor > -1.0):
        rightFactor -= 0.1;
        if (rightFactor < -1.0) { rightFactor = -1.0; }
        break;
      default:
        leftFactor = -1.0; rightFactor = 1.0;
    }

    g.clear(false);
    drawMoonPhase(CenterX,CenterY, MoonRadius, leftFactor,rightFactor);
    setTimeout(updateDisplay,100);
  }
  setTimeout(updateDisplay,100);                    // do not start immediately!
