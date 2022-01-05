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
    if ((Control == null) || (GroupName == null)) { return; }

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
