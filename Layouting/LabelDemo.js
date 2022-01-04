  let ScreenWidth  = g.getWidth(),  ColumnWidth = ScreenWidth/3;    // 3 columns
  let ScreenHeight = g.getHeight(), RowHeight   = ScreenHeight/3;  // and 3 rows

  g.clear(true);

/**** Label ****/

  function Label (Text, Options) {
    function renderLabel (Details) {
      let x = Details.x, xAlignment = Details.halign || 0;
      let y = Details.y, yAlignment = Details.valign || 0;

      let Width  = Details.w, halfWidth  = Width/2;
      let Height = Details.h, halfHeight = Height/2;

      let Border  = Details.border || 0, BorderColor = Details.BorderColor;
      let Padding = Details.pad    || 0;
      let Hilite  = Details.hilite || false;
      let bold    = Details.bold ? 1 : 0;

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

      g.setColor(Hilite ? g.theme.fgH : Details.col || g.theme.fg);

      if (Details.font != null) { g.setFont(Details.font); }
      g.setFontAlign(xAlignment,yAlignment);

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
      let Border  = Result.border || 0;
      let Padding = Result.pad    || 0;

      let TextMetrics;
      if (! Result.width || ! Result.height) {
        if (Result.font == null) {
          Result.font = g.getFont();
        } else {
          g.setFont(Result.font);
        }
        TextMetrics = g.stringMetrics(Result.label);
      }

      if (Result.col   == null) { Result.col   = g.getColor(); }
      if (Result.bgCol == null) { Result.bgCol = g.getBgColor(); }

      Result.width  = Result.width  || TextMetrics.width  + 2*Border + 2*Padding;
      Result.height = Result.height || TextMetrics.height + 2*Border + 2*Padding;
    return Result;
  }


  g.setFont12x20();                  // does not seem to be respected in layout!

  let commonSettings = { font:'12x20', width:ColumnWidth, height:RowHeight };

  let Layout = require('Layout');
  let Display = new Layout({
    type:'v', c:[
      { type:'h', c:[
        Label('Test',{ valign:-1, halign:-1, common:commonSettings }),
        Label('Test',{ valign:0,  halign:-1, common:commonSettings, bold:true }),
        Label('Test',{ valign:1,  halign:-1, common:commonSettings, border:1, BorderColor:'#FFFF00' }),
      ] },
      { type:'h', c:[
        Label('Test',{ valign:-1, halign:0, common:commonSettings, hilite:true }),
        Label('Test',{ valign:0,  halign:0, common:commonSettings, bold:true, col:'#000000', bgCol:'#00FF00' }),
        Label('Test',{ valign:1,  halign:0, common:commonSettings }),
      ] },
      { type:'h', c:[
        Label('Test',{ valign:-1, halign:1, common:commonSettings, border:3, BorderColor:'#FFFF00' }),
        Label('Test',{ valign:0,  halign:1, common:commonSettings, bold:true }),
        Label('Test',{ valign:1,  halign:1, common:commonSettings, border:3, BorderColor:null }),
      ] },
    ]
  });
  Display.render();
