/**** Label ****/

  function Label (Text, Options) {
    function renderLabel (Details) {
      let halfWidth  = Details.w/2, xAlignment = Details.halign || 0;
      let halfHeight = Details.h/2, yAlignment = Details.valign || 0;
      let Padding = Details.pad || 0;

      g.setColor(Details.col || g.theme.fg || '#000000');

      if (Details.font != null) { g.setFont(Details.font); }
      g.setFontAlign(xAlignment,yAlignment);

      g.drawString(Details.label,
        Details.x + halfWidth  + xAlignment*(halfWidth+Padding),
        Details.y + halfHeight + yAlignment*(halfHeight+Padding)
      );
    }

    let Result = Object.assign({}, Options || {}, {
      type:'custom', render:renderLabel, label:Text || ''
    });
      let TextMetrics;
      if (! Options.width || ! Options.height) {
        if (Options.font != null) { g.setFont(Options.font); }
        TextMetrics = g.stringMetrics(Result.label);
      }

      Result.width  = Options.width  || TextMetrics.width  + 2*(Options.pad || 0);
      Result.height = Options.height || TextMetrics.height + 2*(Options.pad || 0);
    return Result;
  }
