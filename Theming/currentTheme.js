  let ScreenWidth  = g.getWidth(),  CenterX = ScreenWidth/2;
  let ScreenHeight = g.getHeight();

  g.reset();                                // automatically loads current theme
  g.clearRect(0,0, ScreenWidth,ScreenHeight);

  g.setFont12x20();

  g.setFontAlign(0,-1);
  g.drawString('current Theme', CenterX,0);

  g.setFontAlign(-1,-1);

  let Theme = g.theme;

  g.setColor(Theme.fg);
    g.drawString('fg',  0,40);
    g.drawString('bg',  CenterX,40);
    g.drawString('fg2', 0,80);
    g.drawString('bg2', CenterX,80);
    g.drawString('fgH', 0,120);
    g.drawString('bgH', CenterX,120);
    g.drawString('dark', 0,160);

  g.setColor(Theme.fg); g.fillRect(40,40, 70,60);

  g.setColor(Theme.fg); g.drawRect(CenterX+39,39, CenterX+71,61);
  g.setColor(Theme.bg); g.fillRect(CenterX+40,40, CenterX+70,60);

  g.setColor(Theme.fg2); g.fillRect(40,80, 70,100);

  g.setColor(Theme.fg);  g.drawRect(CenterX+39,79, CenterX+71,101);
  g.setColor(Theme.bg2); g.fillRect(CenterX+40,80, CenterX+70,100);

  g.setColor(Theme.fgH); g.fillRect(40,120, 70,140);

  g.setColor(Theme.fg);  g.drawRect(CenterX+39,119, CenterX+71,141);
  g.setColor(Theme.bgH); g.fillRect(CenterX+40,120, CenterX+70,140);

  g.setColor(Theme.fg); g.drawString(Theme.dark ? 'yes' : 'no', 50,160);
