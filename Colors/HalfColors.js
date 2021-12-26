  let ScreenWidth  = g.getWidth(),  PatchWidth  = ScreenWidth/6;
  let ScreenHeight = g.getHeight(), PatchHeight = ScreenHeight/6;

  g.clear();

  for (let i = 0; i < 27; i++) {
    let x = (i % 6)         * PatchWidth;
    let y = Math.floor(i/6) * PatchHeight;

    let R = i % 3;
    let G = Math.floor(i/3) % 3;
    let B = Math.floor(i/9);

    g.setColor(R/2,G/2,B/2);
    g.fillRect(x,y, x+PatchWidth-1,y+PatchHeight-1);
  }
