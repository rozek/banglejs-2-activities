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
      let Padding = Details.pad || 0;
      let bold    = Details.bold ? 1 : 0;

      g.setColor(Details.col || g.theme.fg || '#000000');

      if (Details.font != null) { g.setFont(Details.font); }
      g.setFontAlign(xAlignment,yAlignment);

      if (Details.bgCol != null) {
        g.setBgColor(Details.bgCol);
        g.clearRect(x,y, x + Width-1 + bold,y + Height-1 + bold);
      }

      g.setClipRect(x+Padding,y+Padding, x + Width-Padding-1,y + Height-Padding-1);

      x += halfWidth  + xAlignment*(halfWidth +Padding);
      y += halfHeight + yAlignment*(halfHeight+Padding);

      if (Details.col != null) { g.setColor(Details.col); }

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
        if (Result.font == null) {
          Result.font = g.getFont();
        } else {
          g.setFont(Result.font);
        }
        TextMetrics = g.stringMetrics(Result.label);
      }

      Result.width  = Result.width  || TextMetrics.width  + 2*(Result.pad || 0);
      Result.height = Result.height || TextMetrics.height + 2*(Result.pad || 0);
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
        Label('Test',{ valign:1,  halign:-1, common:commonSettings }),
      ] },
      { type:'h', c:[
        Label('Test',{ valign:-1, halign:0, common:commonSettings }),
        Label('Test',{ valign:0,  halign:0, common:commonSettings, bold:true, col:'#000000', bgCol:'#00FF00' }),
        Label('Test',{ valign:1,  halign:0, common:commonSettings }),
      ] },
      { type:'h', c:[
        Label('Test',{ valign:-1, halign:1, common:commonSettings }),
        Label('Test',{ valign:0,  halign:1, common:commonSettings, bold:true }),
        Label('Test',{ valign:1,  halign:1, common:commonSettings }),
      ] },
    ]
  });
  Display.render();
