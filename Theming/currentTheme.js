  let ScreenWidth = g.getWidth();
  let ColumnWidth = ScreenWidth/4;                          // we plan 4 columns

  g.stringHeight = function stringHeight (Text) {
    return g.stringMetrics(Text).height;
  };

  g.reset();                                              // loads current theme

  let Theme = g.theme;

  g.setColor('#000000'); g.setBgColor('#FFFFFF');           // assert legibility
  g.clear(false);

/**** Label ****/

  function Label (Text) {
    g.setFont12x20();
    return {
      type:'custom', render:renderLabel,
      label:Text, width:ColumnWidth, height:g.stringHeight(Text)+2*4, pad:4
    };
  }

/**** renderLabel - left-aligned ****/

  function renderLabel (Details) {
    let x = Details.x, y = Details.y, Padding = Details.pad;

    g.setColor('#000000');
    g.setFont12x20();
    g.setFontAlign(-1,-1);
    g.drawString(Details.label, x+Padding,y+Padding);
  }

/**** Patch ****/

  function Patch (Color) {
    g.setFont12x20();
    return {
      type:'custom', render:renderPatch,
      color:Color, width:ColumnWidth, height:g.stringHeight('*')+2*4, pad:4
    };
  }

/**** renderPatch ****/

  function renderPatch (Details) {
    let x = Details.x, y = Details.y, Width = Details.w, Height = Details.h;
    let Padding = Details.pad;

    g.setColor('#000000');
    g.drawRect(x+Padding,y+Padding, x+Width-Padding,y+Height-Padding);

    g.setColor(Details.color);
    g.fillRect(x+Padding+1,y+Padding+1, x+Width-Padding-1,y+Height-Padding-1);
  }

  let Layout = require('Layout');
  let Display = new Layout({
    type:'v', c:[
      { type:'txt', font:'12x20', label:'currentTheme', pad:4 },
      { type:'h', c:[
        Label('fg'), Patch(Theme.fg),
        Label('bg'), Patch(Theme.bg),
      ] },
      { type:'h', c:[
        Label('fg2'), Patch(Theme.fg2),
        Label('bg2'), Patch(Theme.bg2),
      ] },
      { type:'h', c:[
        Label('fgH'), Patch(Theme.fgH),
        Label('bgH'), Patch(Theme.bgH),
      ] },
      { type:'h', c:[
        Label('dark'),
        Label(Theme.dark ? ' yes' : ' no'),
        { width:ColumnWidth, pad:4 },
        { width:ColumnWidth, pad:4 },
      ] },
    ]
  });
  Display.render();
