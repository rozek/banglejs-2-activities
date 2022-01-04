  if (g.drawRoundedRect == null) {
    g.drawRoundedRect = function drawRoundedRect (x1,y1, x2,y2, r) {
      let x,y;
      if (x1 > x2) { x = x1; x1 = x2; x2 = x; }
      if (y1 > y2) { y = y1; y1 = y2; y2 = y; }

      r = Math.min(r || 0, (x2-x1)/2, (y2-y1)/2);

      let cx1 = x1+r, cx2 = x2-r;
      let cy1 = y1+r, cy2 = y2-r;

      this.drawLine(cx1,y1, cx2,y1);
      this.drawLine(cx1,y2, cx2,y2);
      this.drawLine(x1,cy1, x1,cy2);
      this.drawLine(x2,cy1, x2,cy2);

      x = r; y = 0;

      let dx,dy, Error = 0;
      while (y <= x) {
        dy = 1 + 2*y; y++; Error -= dy;
        if (Error < 0) {
          dx = 1 - 2*x; x--; Error -= dx;
        }

        this.setPixel(cx1 - x, cy1 - y);  this.setPixel(cx1 - y, cy1 - x);
        this.setPixel(cx2 + x, cy1 - y);  this.setPixel(cx2 + y, cy1 - x);
        this.setPixel(cx2 + x, cy2 + y);  this.setPixel(cx2 + y, cy2 + x);
        this.setPixel(cx1 - x, cy2 + y);  this.setPixel(cx1 - y, cy2 + x);
      }
    };
  }

  if (g.fillRoundedRect == null) {
    g.fillRoundedRect = function fillRoundedRect (x1,y1, x2,y2, r) {
      let x,y;
      if (x1 > x2) { x = x1; x1 = x2; x2 = x; }
      if (y1 > y2) { y = y1; y1 = y2; y2 = y; }

      r = Math.min(r || 0, (x2-x1)/2, (y2-y1)/2);

      let cx1 = x1+r, cx2 = x2-r;
      let cy1 = y1+r, cy2 = y2-r;

      this.fillRect(x1,cy1, x2,cy2);

      x = r; y = 0;

      let dx,dy, Error = 0;
      while (y <= x) {
        dy = 1 + 2*y; y++; Error -= dy;
        if (Error < 0) {
          dx = 1 - 2*x; x--; Error -= dx;
        }

        this.drawLine(cx1 - x, cy1 - y,  cx2 + x, cy1 - y);
        this.drawLine(cx1 - y, cy1 - x,  cx2 + y, cy1 - x);
        this.drawLine(cx1 - x, cy2 + y,  cx2 + x, cy2 + y);
        this.drawLine(cx1 - y, cy2 + x,  cx2 + y, cy2 + x);
      }
    };
  }


/**** Button ****/

  function Button (Text, Options) {
    function renderButton (Details) {
      let x = Details.x, Width  = Details.w, halfWidth  = Width/2;
      let y = Details.y, Height = Details.h, halfHeight = Height/2;

      let Padding = Details.pad || 0;
      let Hilite  = Details.hilite || false;

      if (Details.bgCol != null) {
        g.setBgColor(Details.bgCol);
        g.clearRect(x,y, x + Width-1,y + Height-1);
      }

      if (Hilite) {
        g.setColor(g.theme.bgH);                                     // no typo!
        g.fillRoundedRect(x+Padding,y+Padding, x+Width-Padding-1,y+Height-Padding-1,8);
      }

      g.setColor  (Hilite ? g.theme.fgH : Details.col   || g.theme.fg);
      g.setBgColor(Hilite ? g.theme.bgH : Details.bgCol || g.theme.bg);

      if (Details.font != null) { g.setFont(Details.font); }
      g.setFontAlign(0,0);

      g.drawRoundedRect(x+Padding,y+Padding, x+Width-Padding-1,y+Height-Padding-1,8);

      g.setClipRect(x+Padding,y+Padding, x+Width-Padding-1,y+Height-Padding-1);

      g.drawString(Details.label, x+halfWidth,y+halfHeight);
      g.drawString(Details.label, x+halfWidth+1,y+halfHeight);
      g.drawString(Details.label, x+halfWidth,y+halfHeight+1);
      g.drawString(Details.label, x+halfWidth+1,y+halfHeight+1);
    }

    let Result = Object.assign((
      Options == null ? {} : Object.assign({}, Options.common || {}, Options)
    ), {
      type:'custom', render:renderButton, label:Text || 'Tap'
    });
      let Padding = Result.pad || 0;

      let TextMetrics;
      if (! Result.width || ! Result.height) {
        if (Options.font != null) { g.setFont(Options.font); }
        TextMetrics = g.stringMetrics(Result.label);
      }

      Result.width  = Result.width  || TextMetrics.width + 2*10 + 2*Padding;
      Result.height = Result.height || TextMetrics.height + 2*5 + 2*Padding;
    return Result;
  }
