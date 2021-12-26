  let ScreenWidth = g.getWidth();

  let BarStart  = ScreenWidth/2, BarEnd = ScreenWidth-5;
  let BarHeight = 20;

  g.clear();

  let ColorNames  = 'black blue green cyan red magenta yellow white'.split(' ');
  let ColorValues = '#000000 #0000FF #00FF00 #00FFFF #FF0000 #FF00FF #FFFF00 #FFFFFF'.split(' ');

  g.setFont12x20();
  for (let i = 0; i < 8; i++) {
    let y = 20*i+5;

    g.setColor('#000000');
    g.drawString(ColorNames[i], 5,y);

    g.setColor(ColorValues[i]);
    g.fillRect(BarStart,y, BarEnd,y+BarHeight);
  }
