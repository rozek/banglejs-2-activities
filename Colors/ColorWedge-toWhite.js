  let ScreenWidth  = g.getWidth(),  CenterX = ScreenWidth/2;
  let ScreenHeight = g.getHeight(), CenterY = ScreenHeight/2;

  let BarStep   = Math.floor(ScreenWidth/128);
  let BarWidth  = 128 * BarStep;
  let BarHeight = Math.floor(ScreenHeight/7);

  let ColorList = [
    [0,0,0], [0,0,1], [0,1,0], [0,1,1], [1,0,0], [1,0,1], [1,1,0]
  ];

  g.clear();

  for (let i = 0; i < 7; i++) {
    let StartColor = ColorList[i];         // no support for array destructuring
    let R = StartColor[0];
    let G = StartColor[1];
    let B = StartColor[2];

    let y = i*BarHeight;

    for (let j = 0; j < 128; j++) {
      g.setColor(R+(1-R)*j/128,G+(1-G)*j/128,B+(1-B)*j/128);

      let x = CenterX - BarWidth/2 + j*BarStep;
      g.fillRect(x,y, x+BarStep-1,y+BarHeight-3);
    }
  }
