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
      let Padding = Details.pad || 0;

      if (Details.bgCol != null) {
        g.setBgColor(Details.bgCol);
        g.clearRect(x,y, x + Width-1,y + Height-1);
      }

      g.setClipRect(x+Padding,y+Padding, x + Width-Padding-1,y + Height-Padding-1);

      x += halfWidth  + xAlignment*(halfWidth  + Padding);
      y += halfHeight + yAlignment*(halfHeight + Padding);

      if ('rotate' in Details) {               // "rotate" centers image at x,y!
        x += Details.ImageWidth/2;
        y += Details.ImageHeight/2;
      }

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


  let commonSettings = { width:ColumnWidth, height:RowHeight };

  let Layout = require('Layout');
  let Display = new Layout({
    type:'v', c:[
      { type:'h', c:[
        Image(Icon,{ valign:-1, halign:-1, common:commonSettings, scale:0.5 }),
        Image(Icon,{ valign:0,  halign:-1, common:commonSettings }),
        Image(Icon,{ valign:1,  halign:-1, common:commonSettings }),
      ] },
      { type:'h', c:[
        Image(Icon,{ valign:-1, halign:0, common:commonSettings }),
        Image(Icon,{ valign:0,  halign:0, common:commonSettings, rotate:Math.PI/4, bgCol:'#00FF00' }),
        Image(Icon,{ valign:1,  halign:0, common:commonSettings }),
      ] },
      { type:'h', c:[
        Image(Icon,{ valign:-1, halign:1, common:commonSettings }),
        Image(Icon,{ valign:0,  halign:1, common:commonSettings }),
        Image(Icon,{ valign:1,  halign:1, common:commonSettings, scale:1.5 }),
      ] },
    ]
  });
  Display.render();
