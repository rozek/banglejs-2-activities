/**** Label ****/

  function Label (Text, Options) {
    function renderLabel (Details) {
      let x = Details.x, xAlignment = Details.halign || 0;
      let y = Details.y, yAlignment = Details.valign || 0;
      let Width  = Details.w, halfWidth  = Width/2;
      let Height = Details.h, halfHeight = Height/2;
      let Padding = Details.pad || 0;
      let bold    = Details.bold ? 1 : 0;

      g.setColor(Details.col || g.theme.fg || '#000000');

      if (Details.font != null) { g.setFont(Details.font); }
      g.setFontAlign(xAlignment,yAlignment);

      g.setClipRect(x,y, x + Width-1 + bold,y + Height-1 + bold);

      x += halfWidth  + xAlignment*(halfWidth +Padding);
      y += halfHeight + yAlignment*(halfHeight+Padding);

      g.drawString(Details.label, x,y);
      if (bold !== 0) {
        g.drawString(Details.label, x+1,y);
        g.drawString(Details.label, x,y+1);
        g.drawString(Details.label, x+1,y+1);
      }
    }

    let Result = Object.assign((
      Options == null ? {} : Object.assign({}, Options.common || {}, Options)
    ), {
      type:'custom', render:renderLabel, label:Text || ''
    });
      let TextMetrics;
      if (! Result.width || ! Result.height) {
        if (Result.font != null) { g.setFont(Result.font); }
        TextMetrics = g.stringMetrics(Result.label);
      }

      Result.width  = Result.width  || TextMetrics.width  + 2*(Result.pad || 0);
      Result.height = Result.height || TextMetrics.height + 2*(Result.pad || 0);
    return Result;
  }
