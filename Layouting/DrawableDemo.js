  let ScreenWidth  = g.getWidth(),  ColumnWidth = ScreenWidth/3;    // 3 columns
  let ScreenHeight = g.getHeight(), RowHeight   = ScreenHeight/3;  // and 3 rows

  function Callback (x,y, Width,Height, Details) {
    g.setColor(Details.col || g.theme.fg);
    g.drawRect(x,y, x+Width-1,y+Height-1);
    g.drawLine(x,y, x+Width-1,y+Height-1);
    g.drawLine(x,y+Height-1, x+Width-1,y);
  }

  g.clear(true);

/**** Drawable ****/

  function Drawable (Callback, Options) {
    function renderDrawable (Details) {
      let x = Details.x, xAlignment = Details.halign || 0;
      let y = Details.y, yAlignment = Details.valign || 0;
      let Width  = Details.w, DrawableWidth  = Details.DrawableWidth  || Width;
      let Height = Details.h, DrawableHeight = Details.DrawableHeight || Height;
      let halfWidth  = Width/2  - DrawableWidth/2;
      let halfHeight = Height/2 - DrawableHeight/2;
      let Padding = Details.pad || 0;

      if (Details.bgCol != null) {
        g.setBgColor(Details.bgCol);
        g.clearRect(x,y, x + Width-1,y + Height-1);
      }

      let DrawableX = x + halfWidth  + xAlignment*(halfWidth  + Padding);
      let DrawableY = y + halfHeight + yAlignment*(halfHeight + Padding);

      g.setClipRect(
        Math.max(x+Padding,DrawableX),
        Math.max(y+Padding,DrawableY),
        Math.min(x+Width -Padding,DrawableX+DrawableWidth),
        Math.min(y+Height-Padding,DrawableY+DrawableHeight)
      );

      Callback(DrawableX,DrawableY, DrawableWidth,DrawableHeight, Details);
    }

    let Result = Object.assign((
      Options == null ? {} : Object.assign({}, Options.common || {}, Options)
    ), {
      type:'custom', render:renderDrawable, cb:Callback
    });
      Result.width  = (Result.width  || Result.DrawableWidth  || 10) + 2*(Result.pad || 0);
      Result.height = (Result.height || Result.DrawableHeight || 10) + 2*(Result.pad || 0);
    return Result;
  }


  let commonSettings = {
    width:ColumnWidth, DrawableWidth:20,
    height:RowHeight,  DrawableHeight:20
  };

  let Layout = require('Layout');
  let Display = new Layout({
    type:'v', c:[
      { type:'h', c:[
        Drawable(Callback,{ valign:-1, halign:-1, common:commonSettings,
          DrawableWidth:ColumnWidth-10,DrawableHeight:RowHeight-10 }),
        Drawable(Callback,{ valign:0,  halign:-1, common:commonSettings }),
        Drawable(Callback,{ valign:1,  halign:-1, common:commonSettings }),
      ] },
      { type:'h', c:[
        Drawable(Callback,{ valign:-1, halign:0, common:commonSettings }),
        Drawable(Callback,{ valign:0,  halign:0, common:commonSettings,
          DrawableWidth:0,DrawableHeight:0, col:'#FF0000', bgCol:'#00FF00' }),
        Drawable(Callback,{ valign:1,  halign:0, common:commonSettings }),
      ] },
      { type:'h', c:[
        Drawable(Callback,{ valign:-1, halign:1, common:commonSettings }),
        Drawable(Callback,{ valign:0,  halign:1, common:commonSettings }),
        Drawable(Callback,{ valign:1,  halign:1, common:commonSettings,
          DrawableWidth:ColumnWidth+10,DrawableHeight:RowHeight+10 }),
      ] },
    ]
  });
  Display.render();
