  let ScreenWidth  = g.getWidth(),  ColumnWidth = ScreenWidth/3;    // 3 columns
  let ScreenHeight = g.getHeight(), RowHeight   = ScreenHeight/3;  // and 3 rows

  let Icon = require("heatshrink").decompress(atob("kEwgP/AAfv94DB4EHAZuAAZcDAYsDwYDBn/x//8AIN//P//0/+Y4B3/3//fz/n/+f55BB3/v7//v4DB/1/84DB//3z/9//zAYXxAYOfA4V/+ff/s/+4DBFQIDB75tBBYIDC//P+4DBDgJRB35LBKoJTDLYf/g5jCN46DLT5/Ah66EA=="));

  g.clear(true);

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


  let commonSettings = { width:ColumnWidth, height:RowHeight };

  let Layout = require('Layout');
  let Display = new Layout({
    type:'v', c:[
      { type:'h', c:[
        Image(Icon,{ valign:-1, halign:-1, common:commonSettings, scale:0.5 }),
        Image(Icon,{ valign:0,  halign:-1, common:commonSettings }),
        Image(Icon,{ valign:1,  halign:-1, common:commonSettings, border:1, BorderColor:'#FFFF00' }),
      ] },
      { type:'h', c:[
        Image(Icon,{ valign:-1, halign:0, common:commonSettings, hilite:true }),
        Image(Icon,{ valign:0,  halign:0, common:commonSettings, rotate:Math.PI/4, bgCol:'#00FF00' }),
        Image(Icon,{ valign:1,  halign:0, common:commonSettings }),
      ] },
      { type:'h', c:[
        Image(Icon,{ valign:-1, halign:1, common:commonSettings, border:3, BorderColor:'#FFFF00' }),
        Image(Icon,{ valign:0,  halign:1, common:commonSettings }),
        Image(Icon,{ valign:1,  halign:1, common:commonSettings, scale:1.5, border:3, BorderColor:null }),
      ] },
    ]
  });
  Display.render();
