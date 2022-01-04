/**** Image ****/

  function Image (Image, Options) {
    function renderImage (Details) {
      let x = Details.x, xAlignment = Details.halign || 0;
      let y = Details.y, yAlignment = Details.valign || 0;

      let Width  = Details.w, halfWidth  = Width/2  - Details.ImageWidth/2;
      let Height = Details.h, halfHeight = Height/2 - Details.ImageHeight/2;

      let Border  = Details.border || 0, BorderColor = Details.BorderColor;
      let Padding = Details.pad    || 0;
      let Hilite  = Details.hilite || false;

      if (Hilite || (Details.bgCol != null)) {
        g.setBgColor(Hilite ? g.theme.bgH : Details.bgCol);
        g.clearRect(x,y, x + Width-1,y + Height-1);
      }

      if ((Border > 0) && (BorderColor !== null)) {// draw border of layout cell
        g.setColor(BorderColor || Details.col || g.theme.fg);

        switch (Border) {
          case 2:  g.drawRect(x+1,y+1, x+Width-2,y+Height-2);// no break here!
          case 1:  g.drawRect(x,y,     x+Width-1,y+Height-1); break;
          default: g.fillPoly([
            x,y, x+Width,y, x+Width,y+Height, x,y+Height, x,y,
            x+Border,y+Border, x+Border,y+Height-Border,
              x+Width-Border,y+Height-Border, x+Width-Border,y+Border,
              x+Border,y+Border
          ]);
        }
      }

      g.setClipRect(
        x+Border+Padding,y+Border+Padding,
        x + Width-Border-Padding-1,y + Height-Border-Padding-1
      );

      x += halfWidth  + xAlignment*(halfWidth  - Border - Padding);
      y += halfHeight + yAlignment*(halfHeight - Border - Padding);

      if ('rotate' in Details) {               // "rotate" centers image at x,y!
        x += Details.ImageWidth/2;
        y += Details.ImageHeight/2;
      }

      g.setColor  (Hilite ? g.theme.fgH : Details.col   || g.theme.fg);
      g.setBgColor(Hilite ? g.theme.bgH : Details.bgCol || g.theme.bg);

      g.drawImage(Image, x,y, Details.ImageOptions);
    }

    let Result = Object.assign((
      Options == null ? {} : Object.assign({}, Options.common || {}, Options)
    ), {
      type:'custom', render:renderImage, Image:Image
    });
      let ImageMetrics = g.imageMetrics(Image);
      let Scale        = Result.scale  || 1;
      let Border       = Result.border || 0;
      let Padding      = Result.pad    || 0;

      Result.ImageWidth  = Scale * ImageMetrics.width;
      Result.ImageHeight = Scale * ImageMetrics.height;

      if (('rotate' in Result) || ('scale' in Result) || ('frame' in Result)) {
        Result.ImageOptions = {};
        if ('rotate' in Result) { Result.ImageOptions.rotate = Result.rotate; }
        if ('scale'  in Result) { Result.ImageOptions.scale  = Result.scale; }
        if ('frame'  in Result) { Result.ImageOptions.frame  = Result.frame; }
      }

      Result.width  = Result.width  || Result.ImageWidth  + 2*Border + 2*Padding;
      Result.height = Result.height || Result.ImageHeight + 2*Border + 2*Padding;
    return Result;
  }
