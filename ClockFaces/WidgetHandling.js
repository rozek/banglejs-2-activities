  Bangle.loadWidgets();

/**** updateClockFaceSize ****/

  function updateClockFaceSize () {
    CenterX = ScreenWidth/2;
    CenterY = ScreenHeight/2;

    outerRadius = Math.min(CenterX,CenterY) * 0.9;

    if (global.WIDGETS == null) { return; }

    let WidgetLayouts = {
      tl:{ x:0,             y:0,               Direction:0 },
      tr:{ x:ScreenWidth-1, y:0,               Direction:1 },
      bl:{ x:0,             y:ScreenHeight-24, Direction:0 },
      br:{ x:ScreenWidth-1, y:ScreenHeight-24, Direction:1 }
    };

    for (let Widget of WIDGETS) {
      let WidgetLayout = WidgetLayouts[Widget.area];     // reference, not copy!
      if (WidgetLayout == null) { continue; }

      Widget.x = WidgetLayout.x - WidgetLayout.Direction * Widget.width;
      Widget.y = WidgetLayout.y;

      WidgetLayout.x += Widget.width * (1-2*WidgetLayout.Direction);
    }

    let x,y, dx,dy;
    let cx = CenterX, cy = CenterY, r = outerRadius, r2 = r*r;

    x = WidgetLayouts.tl.x; y = WidgetLayouts.tl.y+24; dx = x - cx; dy = y - cy;
    if (dx*dx + dy*dy < r2) {
      cy = CenterY + 12; dy = y - cy; r2 = dx*dx + dy*dy; r = Math.sqrt(r2);
    }

    x = WidgetLayouts.tr.x; y = WidgetLayouts.tr.y+24; dx = x - cx; dy = y - cy;
    if (dx*dx + dy*dy < r2) {
      cy = CenterY + 12; dy = y - cy; r2 = dx*dx + dy*dy; r = Math.sqrt(r2);
    }

    x = WidgetLayouts.bl.x; y = WidgetLayouts.bl.y; dx = x - cx; dy = y - cy;
    if (dx*dx + dy*dy < r2) {
      cy = CenterY - 12; dy = y - cy; r2 = dx*dx + dy*dy; r = Math.sqrt(r2);
    }

    x = WidgetLayouts.br.x; y = WidgetLayouts.br.y; dx = x - cx; dy = y - cy;
    if (dx*dx + dy*dy < r2) {
      cy = CenterY - 12; dy = y - cy; r2 = dx*dx + dy*dy; r = Math.sqrt(r2);
    }

    CenterX = cx; CenterY = cy; outerRadius = r * 0.9;
  }

  updateClockFaceSize();

/**** custom version of Bangle.drawWidgets (does not clear the widget areas) ****/

  Bangle.drawWidgets = function () {
    var w = g.getWidth(), h = g.getHeight();

    var pos = {
      tl:{x:0,   y:0,    r:0, c:0}, // if r==1, we're right->left
      tr:{x:w-1, y:0,    r:1, c:0},
      bl:{x:0,   y:h-24, r:0, c:0},
      br:{x:w-1, y:h-24, r:1, c:0}
    };

    if (global.WIDGETS) {
      for (var wd of WIDGETS) {
        var p = pos[wd.area];
        if (!p) continue;

        wd.x = p.x - p.r*wd.width;
        wd.y = p.y;

        p.x += wd.width*(1-2*p.r);
        p.c++;
      }

      g.reset();                                 // also loads the current theme

      if (pos.tl.c || pos.tr.c) {
        g.setClipRect(0,h-24,w-1,h-1);
        g.reset();                           // also (re)loads the current theme
      }

      if (pos.bl.c || pos.br.c) {
        g.setClipRect(0,h-24,w-1,h-1);
        g.reset();                           // also (re)loads the current theme
      }

      try {
        for (wd of WIDGETS) {
          g.clearRect(wd.x,wd.y, wd.x+wd.width-1,23);
          wd.draw(wd);
        }
      } catch (e) { print(e); }
    }
  };