# banglejs-2-activities #

a series of studies and experiments with Bangle.js 2

The [Bangle.js 2](https://www.espruino.com/Bangle.js2) is the second iteration of a JavaScript-programmable smartwatch made available by [Espruino](https://www.espruino.com/) creator [Gordon Williams](https://github.com/gfwilliams).

This repository documents a series of studies and experiments conducted by the author in the course of developing an application for the Bangle.js 2 - looking at the discussions in the [Espruino forum](http://forum.espruino.com/microcosms/1424/), their outcome may be of interest to other people as well.

### Usage ###

Most "activities" come with some source code. Unless otherwise noted, this code may directly be loaded into the Espruino Web IDE - either for the [Bangle.js 2 emulator](https://www.espruino.com/ide/emulator.html) or for [a real device](https://www.espruino.com/ide).

> Just a small note: if you like this module and plan to use it, consider "starring" this repository (you will find the "Star" button on the top right of this page), so that I know which of my repositories to take most care of.

## Overview ##

### Color Handling ###

<table>
 <tr>
   <td align="center"><img src="Colors/BasicColors.png"><br><a href="#basic-colors">Basic Colors</a></td>
   <td align="center"><img src="Colors/Mandelbrot_176x176.png"><br><a href="#bitmap-preparation">Bitmap Preparation</a></td>
   <td align="center"><img src="Colors/HalfColors.png"><br><a href="#half-colors">"Half Colors"</a></td>
   <td align="center"><img src="Colors/QuarterColors.png"><br><a href="#quarter-colors">"Quarter Colors"</a></td>
 </tr>
 <tr>
   <td align="center"><img src="Colors/ColorWheel.png"><br><a href="#color-wheel">Color Wheel</a></td>
   <td align="center"><img src="Colors/ColorWedge-to-black.png"><br><a href="#color-wedges">Color Wedges</a></td>
 </tr>
</table>

## Color Handling ##

### Basic Colors ###

<img align="left" src="Colors/BasicColors.png">

Because of a restriction to 3-bit colours, a Bangle.js 2 may only display 8 different colors without dithering.

The underlying [source code](Colors/BasicColors.js) for this example may be run both in the [emulator](https://www.espruino.com/ide?emulator&codeurl=https://raw.githubusercontent.com/rozek/banglejs-2-activities/main/Colors/BasicColors.js) and on a [real device](https://www.espruino.com/ide?codeurl=https://raw.githubusercontent.com/rozek/banglejs-2-activities/main/Colors/BasicColors.js).

<br clear="left">

### Bitmap Preparation ###

When it comes to preparing a bitmap for being shown on a Bangle.js 2 display, the converter built into the Web IDE's "Device Storage" manager does a remarkably good job (given the constraints it is suffering from)

![](Colors/BitmapPreparation.png)

However, this step also has its limitations, as shown in the following [test image](https://en.wikipedia.org/wiki/Lenna):

![](Colors/Lenna-TestImage.png)

Flat gradients seem to cause problems, but detailed areas come out quite well.

### "Half Colors" ###

Forum user "Numerist" suggested to use RGB channel value 0.5 in addition to the natively supported values 0.0 and 1.0 in programs as the dithering algorithm built into the Bangle.js 2 seemed to produce acceptable results:

<img align="left" src="Colors/HalfColors.png">

The [source code](Colors/HalfColors.js) for this example may be run both in the [emulator](https://www.espruino.com/ide?emulator&codeurl=https://raw.githubusercontent.com/rozek/banglejs-2-activities/main/Colors/HalfColors.js) and on a [real device](https://www.espruino.com/ide?codeurl=https://raw.githubusercontent.com/rozek/banglejs-2-activities/main/Colors/HalfColors.js).

Please note that increasing the color resolution (from 8 to 27) comes at a price, namely the decrease of spatial resolution. The actual resolution loss depends very much on what you draw on the screen, but it may well halve your effectively usable screen size to 88x88 pixels.

<br clear="left">

Forum user "HughB" suggested to make the color patches touchable and display the hexadecimal color code of any touched patch:

<img align="left" src="Colors/HalfColors-touchable.png">

The underlying [source code](Colors/HalfColors-touchable.js) may be run both in the [emulator](https://www.espruino.com/ide?emulator&codeurl=https://raw.githubusercontent.com/rozek/banglejs-2-activities/main/Colors/HalfColors-touchable.js) and on a [real device](https://www.espruino.com/ide?codeurl=https://raw.githubusercontent.com/rozek/banglejs-2-activities/main/Colors/HalfColors-touchable.js).

Just tap on any colored patch in order to see the associated color code. Tapping outside any such patch is simply ignored. 

<br clear="left">

### "Quarter Colors" ###

While "Half Colors" still look acceptable, the next refinement step ("Quarter Colors") no longer produces good looking results:

<img align="left" src="Colors/QuarterColors.png">

The [source code](Colors/QuarterColors.js) for this example may be run both in the [emulator](https://www.espruino.com/ide?emulator&codeurl=https://raw.githubusercontent.com/rozek/banglejs-2-activities/main/Colors/QuarterColors.js) and on a [real device](https://www.espruino.com/ide?codeurl=https://raw.githubusercontent.com/rozek/banglejs-2-activities/main/Colors/QuarterColors.js).

<br clear="left">

### Color Wheel ###

Because of a need for a series of different colors, the author made this little "color wheel":

<img align="left" src="Colors/ColorWheel.png">

As usual, you may run the [source code](Colors/ColorWheel.js) both in the [emulator](https://www.espruino.com/ide?emulator&codeurl=https://raw.githubusercontent.com/rozek/banglejs-2-activities/main/Colors/ColorWheel.js) and on a [real device](https://www.espruino.com/ide?codeurl=https://raw.githubusercontent.com/rozek/banglejs-2-activities/main/Colors/ColorWheel.js).

<br clear="left">&nbsp;<br>

Again, there is also a [touchable version](Colors/ColorWheel-touchable.js) (both for the [emulator](https://www.espruino.com/ide?emulator&codeurl=https://raw.githubusercontent.com/rozek/banglejs-2-activities/main/Colors/ColorWheel-touchable.js) and a [real device](https://www.espruino.com/ide?codeurl=https://raw.githubusercontent.com/rozek/banglejs-2-activities/main/Colors/ColorWheel-touchable.js)) which displays the internal hexdecimal code of any touched color:

<img align="left" src="Colors/ColorWheel-touchable-1.png">
<img align="left" src="Colors/ColorWheel-touchable-2.png">

The whole screen is touchable:
<br>&nbsp;<br>
&nbsp; • touch outside the wheel for "black"<br>
&nbsp; • touch inside the wheel for "white"<br>
&nbsp; • touch on any segment of the wheel for the shown color.

This version also exists as a small Bangle.js 2 [application](https://rozek.github.io/BangleApps/) - just look for "ColorWheel"

<br clear="left">

### Color Wedges ###

In view of a planned application, an attempt was made to draw "intensity wedges" in various colors:

<img align="left" src="Colors/ColorWedge-to-black.png">
<img align="left" src="Colors/ColorWedge-to-white.png">

You may try yourself:<br>
&nbsp;<br>
&nbsp; • [fading to black](Colors/ColorWheel-toBlack.js), in the [emulator](https://www.espruino.com/ide?emulator&codeurl=https://raw.githubusercontent.com/rozek/banglejs-2-activities/main/Colors/ColorWheel-toBlack.js) and on a [real device](https://www.espruino.com/ide?codeurl=https://raw.githubusercontent.com/rozek/banglejs-2-activities/main/Colors/ColorWheel-toBlack.js)<br>
&nbsp; • [fading to white](Colors/ColorWheel-toWhite.js), in the [emulator](https://www.espruino.com/ide?emulator&codeurl=https://raw.githubusercontent.com/rozek/banglejs-2-activities/main/Colors/ColorWheel-toWhite.js) and on a [real device](https://www.espruino.com/ide?codeurl=https://raw.githubusercontent.com/rozek/banglejs-2-activities/main/Colors/ColorWheel-toWhite.js)<br>
&nbsp;<br>
However, the results don't look promising at all.
<br clear="left">


## License ##

[MIT License](LICENSE.md)
