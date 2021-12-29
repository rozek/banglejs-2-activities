  let ScreenWidth  = g.getWidth(),  ColumnWidth = ScreenWidth/3;    // 3 columns
  let ScreenHeight = g.getHeight(), RowHeight   = ScreenHeight/3;  // and 3 rows

  g.clear(true);

/**** Label ****/

  function Label (Text, Options) {
    function renderLabel (Details) {
      let halfWidth  = Details.w/2, xAlignment = Details.halign || 0;
      let halfHeight = Details.h/2, yAlignment = Details.valign || 0;
      let Padding = Details.pad || 0;

      g.setColor(Details.col || g.theme.fg || '#000000');

      if (Details.font != null) { g.setFont(Details.font); }
      g.setFontAlign(xAlignment,yAlignment);

      let x = Details.x + halfWidth  + xAlignment*(halfWidth+Padding);
      let y = Details.y + halfHeight + yAlignment*(halfHeight+Padding);

      g.drawString(Details.label, x,y);
      if (Details.bold) {
        g.drawString(Details.label, x+1,y);
        g.drawString(Details.label, x,y+1);
        g.drawString(Details.label, x+1,y+1);
      }
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


  g.setFont12x20();                  // does not seem to be respected in layout!

  let Layout = require('Layout');
  let Display = new Layout({
    type:'v', c:[
      { type:'h', c:[
        Label('Test',{ valign:-1, halign:-1, font:'12x20', width:ColumnWidth, height:RowHeight }),
        Label('Test',{ valign:0,  halign:-1, font:'12x20', width:ColumnWidth, height:RowHeight, bold:true }),
        Label('Test',{ valign:1,  halign:-1, font:'12x20', width:ColumnWidth, height:RowHeight }),
      ] },
      { type:'h', c:[
        Label('Test',{ valign:-1, halign:0, font:'12x20', width:ColumnWidth, height:RowHeight }),
        Label('Test',{ valign:0,  halign:0, font:'12x20', width:ColumnWidth, height:RowHeight, bold:true }),
        Label('Test',{ valign:1,  halign:0, font:'12x20', width:ColumnWidth, height:RowHeight }),
      ] },
      { type:'h', c:[
        Label('Test',{ valign:-1, halign:1, font:'12x20', width:ColumnWidth, height:RowHeight }),
        Label('Test',{ valign:0,  halign:1, font:'12x20', width:ColumnWidth, height:RowHeight, bold:true }),
        Label('Test',{ valign:1,  halign:1, font:'12x20', width:ColumnWidth, height:RowHeight }),
      ] },
    ]
  });
  Display.render();
