  let ScreenWidth  = g.getWidth(),  CenterX = ScreenWidth/2;
  let ScreenHeight = g.getHeight(), CenterY = ScreenHeight/2;

  let outerRadius = Math.min(CenterX,CenterY) * 0.9 - 10;

  let sin = Math.sin, cos = Math.cos;
  let twoPi = 2*Math.PI;

  g.clear(true);                                     // also loads current theme

  g.setColor(g.theme.fg);
  g.setFont('Vector', 22);
  g.setFontAlign(0,0);

  for (let i = 0; i < 12; i++) {
    let Phi = i * twoPi/12;

    let x = CenterX + outerRadius * sin(Phi);
    let y = CenterY - outerRadius * cos(Phi);

    g.drawString(i == 0 ? '12' : '' + i, x,y);
  }
