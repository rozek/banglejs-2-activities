  let ScreenWidth  = g.getWidth(),  PatchWidth  = ScreenWidth/12;
  let ScreenHeight = g.getHeight(), PatchHeight = ScreenHeight/12;

  g.clear();

  for (let i = 0; i < 125; i++) {
    let x = (i % 12)         * PatchWidth;
    let y = Math.floor(i/12) * PatchHeight;

    let R = i % 5;
    let G = Math.floor(i/5) % 5;
    let B = Math.floor(i/25);

    g.setColor(R/4,G/4,B/4);
    g.fillRect(x,y, x+PatchWidth-1,y+PatchHeight-1);
  }
