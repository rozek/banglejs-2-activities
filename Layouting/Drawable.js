/**** Drawable ****/

  function Drawable (Callback, Options) {
    function renderDrawable (Details) {
      let x = Details.x, xAlignment = Details.halign || 0;
      let y = Details.y, yAlignment = Details.valign || 0;

      let Width  = Details.w, DrawableWidth  = Details.DrawableWidth  || Width;
      let Height = Details.h, DrawableHeight = Details.DrawableHeight || Height;

      let halfWidth  = Width/2  - DrawableWidth/2;
      let halfHeight = Height/2 - DrawableHeight/2;

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

      let DrawableX = x + halfWidth  + xAlignment*(halfWidth  - Border - Padding);
      let DrawableY = y + halfHeight + yAlignment*(halfHeight - Border - Padding);

      g.setClipRect(
        Math.max(x+Border+Padding,DrawableX),
        Math.max(y+Border+Padding,DrawableY),
        Math.min(x+Width -Border-Padding,DrawableX+DrawableWidth)-1,
        Math.min(y+Height-Border-Padding,DrawableY+DrawableHeight)-1
      );

      g.setColor  (Hilite ? g.theme.fgH : Details.col   || g.theme.fg);
      g.setBgColor(Hilite ? g.theme.bgH : Details.bgCol || g.theme.bg);

      Callback(DrawableX,DrawableY, DrawableWidth,DrawableHeight, Details);
    }

    let Result = Object.assign((
      Options == null ? {} : Object.assign({}, Options.common || {}, Options)
    ), {
      type:'custom', render:renderDrawable, cb:Callback
    });
      let DrawableWidth  = Result.DrawableWidth  || 10;
      let DrawableHeight = Result.DrawableHeight || 10;

      let Border  = Result.border || 0;
      let Padding = Result.pad    || 0;

      Result.width  = Result.width  || DrawableWidth  + 2*Border + 2*Padding;
      Result.height = Result.height || DrawableHeight + 2*Border + 2*Padding;
    return Result;
  }
