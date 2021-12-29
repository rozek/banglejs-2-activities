  let ScreenWidth  = g.getWidth(),  CenterX = ScreenWidth/2;
  let ScreenHeight = g.getHeight(), CenterY = ScreenHeight/2;

  let outerRadius = Math.min(CenterX,CenterY) * 0.9;

  g.clear(true);                                     // also loads current theme

  g.setColor(g.theme.fg);
  g.setFont('Vector', 22);

  g.setFontAlign(0,-1);
  g.drawString('12', CenterX,CenterY-outerRadius);

  g.setFontAlign(1,0);
  g.drawString('3', CenterX+outerRadius,CenterY);

  g.setFontAlign(0,1);
  g.drawString('6', CenterX,CenterY+outerRadius);

  g.setFontAlign(-1,0);
  g.drawString('9', CenterX-outerRadius,CenterY);

