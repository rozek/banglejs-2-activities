  const Checkbox_checked   = require("heatshrink").decompress(atob("ikUgMf/+GgEGoEAlEAgOAgEYsFhw8OjE54OB/EYh4OB+EYj+BwecjFw8OGg0YDocUgECsEAsP//A"));
  const Checkbox_unchecked = require("heatshrink").decompress(atob("ikUgMf/+GgEGoEAlEAgOAgEYAjkUgECsEAsP//A="));

/**** Checkbox ****/

  function Checkbox (Options) {
    function renderCheckbox (Details) {
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
        Details.checked ? Checkbox_checked : Checkbox_unchecked, x,y
      );
    }

    let Result = Object.assign((
      Options == null ? {} : Object.assign({}, Options.common || {}, Options)
    ), {
      type:'custom', render:renderCheckbox, onTouch:toggleCheckbox
    });
      let Padding = Result.pad || 0;

      Result.width  = Result.width  || 20 + 2*Padding;
      Result.height = Result.height || 20 + 2*Padding;

      if (Result.checked == null) { Result.checked = false; }
    return Result;
  }

  /* private */ function toggleCheckbox (Control) {
    g.reset();

    Control.checked = ! Control.checked;
    Control.render(Control);

    if (typeof Control.onChange === 'function') {
      Control.onChange(Control);
    }
  }

/**** toggleInnerCheckbox ****/

  /* export */ function toggleInnerCheckbox (Control) {
    if (Control.c == null) {
      if (('checked' in Control) && ! ('GroupName' in Control)) {
        toggleCheckbox(Control);
        return true;
      }
    } else {
      let ControlList = Control.c;
      for (let i = 0, l = ControlList.length; i < l; i++) {
        let done = toggleInnerCheckbox(ControlList[i]);
        if (done) { return true; }
      }
    }
  }
