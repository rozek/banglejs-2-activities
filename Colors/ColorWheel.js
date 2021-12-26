  let ColorList = [
    '#0000FF', '#8000FF', '#FF00FF', '#FF0080', '#FF0000', '#FF8000',
    '#FFFF00', '#80FF00', '#00FF00', '#00FF80', '#00FFFF', '#0080FF'
  ];
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
  for (let i = 0; i < 12; i++) {
    let Phi0 = i * twoPi/12, Phi1 = (i+1) * twoPi/12;
    
    let Polygon = [];
      for (let Phi = Phi0; Phi <= Phi1+Epsilon; Phi += DeltaPhi) {
        Polygon.push(CenterX + outerRadius * sin(Phi));
        Polygon.push(CenterY - outerRadius * cos(Phi));
      }
    
      for (let Phi = Phi1; Phi >= Phi0-Epsilon; Phi -= DeltaPhi) {
        Polygon.push(CenterX + innerRadius * sin(Phi));
        Polygon.push(CenterY - innerRadius * cos(Phi));
      }
    g.setColor(ColorList[i]);
    g.fillPoly(Polygon);
  }