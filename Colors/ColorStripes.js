  let ScreenWidth  = g.getWidth();
  let ScreenHeight = g.getHeight();

  let StepsOfStripe   = [ 6,12,18,24,ScreenWidth ];
  let NumberOfStripes = StepsOfStripe.length;

  function drawStripe (y, Steps, StripeHeight) {
    let StepWidth = ScreenWidth/Steps;

    for (let i = 0; i < Steps; i++) {
      let Color = E.HSBtoRGB(i/Steps,1,1, true);
      g.setColor(Color[0]/255,Color[1]/255,Color[2]/255);
      g.fillRect(i*StepWidth,y, (i+1)*StepWidth,y+StripeHeight-2);
    }
  }

  g.clear();

  g.setColor(0,0,0);
  g.fillRect(0,0, ScreenWidth,ScreenHeight);

  let StripeHeight = Math.floor(ScreenHeight/NumberOfStripes);
  for (let i = 0; i < NumberOfStripes; i++) {
    drawStripe(i*StripeHeight, StepsOfStripe[i], StripeHeight);
  }
