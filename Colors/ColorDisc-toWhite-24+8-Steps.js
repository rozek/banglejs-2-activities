  let ScreenWidth  = g.getWidth(),  CenterX = ScreenWidth/2;
  let ScreenHeight = g.getHeight(), CenterY = ScreenHeight/2;

  let outerRadius = Math.min(CenterX,CenterY) * 0.9;

  let sin = Math.sin, cos = Math.cos;
  let twoPi = 2*Math.PI;

  let DeltaPhi = twoPi/72;
  let Epsilon  = 0.001;

  g.clear();

  g.setColor(1,1,1);
  g.fillRect(0,0, ScreenWidth,ScreenHeight);

  for (let i = 0; i < 24; i++) {
    let Phi0 = i * twoPi/24, Phi1 = (i+1) * twoPi/24;

    for (let j = 1; j <= 8; j++) {
      let innerRadius = j * outerRadius/9;

      let Polygon = [];
        for (let Phi = Phi0; Phi <= Phi1+Epsilon; Phi += DeltaPhi) {
          Polygon.push(CenterX + outerRadius * sin(Phi));
          Polygon.push(CenterY - outerRadius * cos(Phi));
        }

        for (let Phi = Phi1; Phi >= Phi0-Epsilon; Phi -= DeltaPhi) {
          Polygon.push(CenterX + innerRadius * sin(Phi));
          Polygon.push(CenterY - innerRadius * cos(Phi));
        }
      let Color = E.HSBtoRGB(i/24,j/8,1, true);
      g.setColor(Color[0]/255,Color[1]/255,Color[2]/255);
      g.fillPoly(Polygon);
    }
  }
