  let ScreenWidth  = g.getWidth();
  let ScreenHeight = g.getHeight();

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

      g.setColor  (Hilite ? g.theme.fgH : Details.col   || g.theme.fg);
      g.setBgColor(Hilite ? g.theme.bgH : Details.bgCol || g.theme.bg);

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

/**** EventConsumerAtPoint ****/

  let activeLayout;

  function EventConsumerAtPoint (HandlerName, x,y) {
    let Layout = (activeLayout || {}).l;
    if (Layout == null) { return; }

    function ConsumerIn (Control) {
      if (
        (x < Control.x) || (x >= Control.x + Control.w) ||
        (y < Control.y) || (y >= Control.y + Control.h)
      ) { return undefined; }

      if (typeof Control[HandlerName] === 'function') { return Control; }

      if (Control.c != null) {
        let ControlList = Control.c;
        for (let i = 0, l = ControlList.length; i < l; i++) {
          let Consumer = ConsumerIn(ControlList[i]);
          if (Consumer != null) { return Consumer; }
        }
      }

      return undefined;
    }

    return ConsumerIn(Layout);
  }

/**** dispatchTouchEvent ****/

  function dispatchTouchEvent (DefaultHandler) {
    function handleTouchEvent (Button, xy) {
      if (activeLayout == null) {
        if (typeof DefaultHandler === 'function') {
          DefaultHandler();
        }
      } else {
        let Control = EventConsumerAtPoint('onTouch', xy.x,xy.y);
        if (Control != null) {
          Control.onTouch(Control, Button, xy);
        }
      }
    }
    Bangle.on('touch',handleTouchEvent);
  }
  dispatchTouchEvent();

/**** dispatchStrokeEvent ****/

  function dispatchStrokeEvent (DefaultHandler) {
    function handleStrokeEvent (Coordinates) {
      if (activeLayout == null) {
        if (typeof DefaultHandler === 'function') {
          DefaultHandler();
        }
      } else {
        let Control = EventConsumerAtPoint('onStroke', Coordinates.xy[0],Coordinates.xy[1]);
        if (Control != null) {
          Control.onStroke(Control, Coordinates);
        }
      }
    }
    Bangle.on('stroke',handleStrokeEvent);
  }
  dispatchStrokeEvent();

  const Radiobutton_checked   = require("heatshrink").decompress(atob("ikUgMB/EAsFgjEBwUAgkggFEgECoEAlEPgOB/EYj+BAgmA+EUCYciDodBwEYg0GgEfwA"));
  const Radiobutton_unchecked = require("heatshrink").decompress(atob("ikUgMB/EAsFgjEBwUAgkggFEgECoEAlEAgOAgEYAhEUCYciDodBwEYg0GgEfwAA="));

/**** Radiobutton ****/

  function Radiobutton (Options) {
    function renderRadiobutton (Details) {
      let x = Details.x, xAlignment = Details.halign || 0;
      let y = Details.y, yAlignment = Details.valign || 0;

      let Width  = Details.w, halfWidth  = Width/2  - 10;
      let Height = Details.h, halfHeight = Height/2 - 10;

      let Padding = Details.pad || 0;

      if (Details.bgCol != null) {
        g.setBgColor(Details.bgCol);
        g.clearRect(x,y, x + Width-1,y + Height-1);
      }

      x += halfWidth  + xAlignment*(halfWidth  - Padding);
      y += halfHeight + yAlignment*(halfHeight - Padding);

      g.setColor  (Details.col   || g.theme.fg);
      g.setBgColor(Details.bgCol || g.theme.bg);

      g.drawImage(
        Details.checked ? Radiobutton_checked : Radiobutton_unchecked, x,y
      );
    }

    let Result = Object.assign((
      Options == null ? {} : Object.assign({}, Options.common || {}, Options)
    ), {
      type:'custom', render:renderRadiobutton, onTouch:checkRadiobutton
    });
      let Padding = Result.pad || 0;

      Result.width  = Result.width  || 20 + 2*Padding;
      Result.height = Result.height || 20 + 2*Padding;

      if (Result.checked == null) { Result.checked = false; }
    return Result;
  }

  /* private */ function checkRadiobutton (Control) {
    if (! Control.checked) {
      uncheckRadiobuttonsIn((activeLayout || {}).l,Control.GroupName);
      toggleRadiobutton(Control);

      if (typeof Control.onChange === 'function') {
        Control.onChange(Control);
      }
    }
  }

  /* private */ function toggleRadiobutton (Control) {
    g.reset();

    Control.checked = ! Control.checked;
    Control.render(Control);
  }

  /* private */ function uncheckRadiobuttonsIn (Control,GroupName) {
    if (Control == null) { return; }

    if (Control.c == null) {
      if (('checked' in Control) && (Control.GroupName === GroupName)) {
        if (Control.checked) { toggleRadiobutton(Control); }
      }
    } else {
      let ControlList = Control.c;
      for (let i = 0, l = ControlList.length; i < l; i++) {
        uncheckRadiobuttonsIn(ControlList[i],GroupName);
      }
    }
  }

/**** checkInnerRadiobutton ****/

  /* export */ function checkInnerRadiobutton (Control) {
    if (Control.c == null) {
      if (('checked' in Control) && ('GroupName' in Control)) {
        checkRadiobutton(Control);
        return true;
      }
    } else {
      let ControlList = Control.c;
      for (let i = 0, l = ControlList.length; i < l; i++) {
        let done = checkInnerRadiobutton(ControlList[i]);
        if (done) { return true; }
      }
    }
  }


  g.setFont12x20();                  // does not seem to be respected in layout!

  let commonSettings = { font:'12x20', width:60, pad:4 };

  function logChange (Control) {
    print(
      'radiobutton "' + Control.id + '" was ' +
      (Control.checked ? 'checked' : 'unchecked')
    );
  }

  let Layout = require('Layout');
  activeLayout = new Layout({
    type:'v', c:[
      { type:'h', c:[
        { type:'h', c:[
          Radiobutton({ id:'one', GroupName:'en', onChange:logChange }),
          Label('one',{ valign:0,  halign:-1, common:commonSettings }),
        ], onTouch:checkInnerRadiobutton },
        { width:10 },
        { type:'h', c:[
          Radiobutton({ id:'eins', GroupName:'de', onChange:logChange }),
          Label('eins',{ valign:0,  halign:-1, common:commonSettings, width:50 }),
        ], onTouch:checkInnerRadiobutton },
      ] },

      { type:'h', c:[
        { type:'h', c:[
          Radiobutton({ id:'two', GroupName:'en', onChange:logChange }),
          Label('two',{ valign:0,  halign:-1, common:commonSettings }),
        ], onTouch:checkInnerRadiobutton },
        { width:10 },
        { type:'h', c:[
          Radiobutton({ id:'zwei', GroupName:'de', onChange:logChange }),
          Label('zwei',{ valign:0,  halign:-1, common:commonSettings, width:50 }),
        ], onTouch:checkInnerRadiobutton },
      ] },

      { type:'h', c:[
        { type:'h', c:[
          Radiobutton({ id:'three', GroupName:'en', onChange:logChange }),
          Label('three',{ valign:0,  halign:-1, common:commonSettings }),
        ], onTouch:checkInnerRadiobutton },
        { width:10 },
        { type:'h', c:[
          Radiobutton({ id:'drei', GroupName:'de', onChange:logChange }),
          Label('drei',{ valign:0,  halign:-1, common:commonSettings, width:50 }),
        ], onTouch:checkInnerRadiobutton },
      ] },
    ]
  });
  activeLayout.render();
