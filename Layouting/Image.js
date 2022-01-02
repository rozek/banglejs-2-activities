/**** Image ****/

  function Image (Image, Options) {
    function renderImage (Details) {
      let x = Details.x, xAlignment = Details.halign || 0;
      let y = Details.y, yAlignment = Details.valign || 0;
      let Width  = Details.w, halfWidth  = Width/2  - Details.ImageWidth/2;
      let Height = Details.h, halfHeight = Height/2 - Details.ImageHeight/2;
      let Padding = Details.pad || 0;

      g.setClipRect(x,y, x + Width-1,y + Height-1);

      if (Details.bgCol != null) {
        g.setBgColor(Details.bgCol);
        g.clearRect(x,y, x + Width-1,y + Height-1);
      }

      x += halfWidth  + xAlignment*(halfWidth  + Padding);
      y += halfHeight + yAlignment*(halfHeight + Padding);

      g.drawImage(Image, x,y, Details.ImageOptions);
    }

    let Result = Object.assign((
      Options == null ? {} : Object.assign({}, Options.common || {}, Options)
    ), {
      type:'custom', render:renderImage, Image:Image
    });
      let ImageMetrics = g.imageMetrics(Image);
      let Scale        = Result.scale || 1;

      Result.ImageWidth  = Scale * ImageMetrics.width;
      Result.ImageHeight = Scale * ImageMetrics.height;

      if (('rotate' in Result) || ('scale' in Result) || ('frame' in Result)) {
        Result.ImageOptions = {};
        if ('rotate' in Result) { Result.ImageOptions.rotate = Result.rotate; }
        if ('scale'  in Result) { Result.ImageOptions.scale  = Result.scale; }
        if ('frame'  in Result) { Result.ImageOptions.frame  = Result.frame; }
      }

      Result.width  = Result.width  || Result.ImageWidth  + 2*(Result.pad || 0);
      Result.height = Result.height || Result.ImageHeight + 2*(Result.pad || 0);
    return Result;
  }
