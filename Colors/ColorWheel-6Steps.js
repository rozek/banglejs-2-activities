  let ScreenWidth  = g.getWidth(),  CenterX = ScreenWidth/2;
  let ScreenHeight = g.getHeight(), CenterY = ScreenHeight/2;

  let outerRadius = Math.min(CenterX,CenterY) * 0.9;
  let innerRadius = outerRadius*0.5;

  let sin = Math.sin, cos = Math.cos;
  let twoPi = 2*Math.PI;

  let DeltaPhi = twoPi/72;
  let Epsilon  = 0.001;
  g.clear();

  g.setColor(0,0,0);
  g.fillRect(0,0, ScreenWidth,ScreenHeight);
  for (let i = 0; i < 6; i++) {
    let Phi0 = i * twoPi/6, Phi1 = (i+1) * twoPi/6;

    let Polygon = [];
      for (let Phi = Phi0; Phi <= Phi1+Epsilon; Phi += DeltaPhi) {
        Polygon.push(CenterX + outerRadius * sin(Phi));
        Polygon.push(CenterY - outerRadius * cos(Phi));
      }

      for (let Phi = Phi1; Phi >= Phi0-Epsilon; Phi -= DeltaPhi) {
        Polygon.push(CenterX + innerRadius * sin(Phi));
        Polygon.push(CenterY - innerRadius * cos(Phi));
      }
    let Color = E.HSBtoRGB(i/6,1,1, true);
    g.setColor(Color[0],Color[1],Color[2]);
    g.fillPoly(Polygon);
  }
