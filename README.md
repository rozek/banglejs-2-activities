# banglejs-2-activities #

a series of studies and experiments with Bangle.js 2

The [Bangle.js 2](https://www.espruino.com/Bangle.js2) is the second iteration of a JavaScript-programmable smartwatch made available by [Espruino](https://www.espruino.com/) creator [Gordon Williams](https://github.com/gfwilliams).

This repository documents a series of studies and experiments conducted by the author in the course of developing an application for the Bangle.js 2 - looking at the discussions in the [Espruino forum](http://forum.espruino.com/microcosms/1424/), their outcome may be of interest to other people as well.

## Usage ##

Most "activities" come with some source code. Unless otherwise noted, this code may directly be loaded into the Espruino Web IDE - either for the [Bangle.js 2 emulator](https://www.espruino.com/ide/emulator.html) or for [a real device](https://www.espruino.com/ide).

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
 </tr>
</table>

## Color Handling ##

### Basic Colors ###

<img align="left" src="Colors/BasicColors.png">

Because of a restriction to 3-bit colours, a Bangle.js 2 may only display 8 colors without dithering.

The underlying [source code](Colors/BasicColors.js) may be run both in the [emulator](https://www.espruino.com/ide?emulator&codeurl=https://raw.githubusercontent.com/rozek/banglejs-2-activities/main/Colors/BasicColors.js) and on a [real device](https://www.espruino.com/ide?codeurl=https://raw.githubusercontent.com/rozek/banglejs-2-activities/main/Colors/BasicColors.js).

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

The underlying [source code](Colors/HalfColors.js) may be run both in the [emulator](https://www.espruino.com/ide?emulator&codeurl=https://raw.githubusercontent.com/rozek/banglejs-2-activities/main/Colors/HalfColors.js) and on a [real device](https://www.espruino.com/ide?codeurl=https://raw.githubusercontent.com/rozek/banglejs-2-activities/main/Colors/HalfColors.js).

<br clear="left">

<img align="right" src="Colors/HalfColors-touchable.png">

Forum user "HughB" suggested to make the color patches touchable and display the hexadecimal color code of any touched patch:

The underlying [source code](Colors/HalfColors-touchable.js) may be run both in the [emulator](https://www.espruino.com/ide?emulator&codeurl=https://raw.githubusercontent.com/rozek/banglejs-2-activities/main/Colors/HalfColors-touchable.js) and on a [real device](https://www.espruino.com/ide?codeurl=https://raw.githubusercontent.com/rozek/banglejs-2-activities/main/Colors/HalfColors-touchable.js).

<br clear="right">

### "Quarter Colors" ###

While "Half Colors" still look acceptable, the next refinement step ("Quarter Colors") no longer produces good looking results:

<img align="left" src="Colors/QuarterColors.png">

[Try yourself](Colors/QuarterColors.js).

<br clear="left">

### Color Wheel ###

Because of a need for a series of different colors, the author made this little "color wheel":

<img align="left" src="Colors/ColorWheel.png">

You may try yourself with this little [code snippet](Colors/ColorWheel.js).

<br clear="left">

Again there is also a [touchable version](Colors/ColorWheel-touchable.js) which displays the internal hexdecimal code of any touched color:

<img align="left" src="Colors/ColorWheel-touchable-1.png">
<img align="left" src="Colors/ColorWheel-touchable-2.png">

The whole screen is touchable:

* touch outside the wheel for "black"
* touch inside the wheel for "white"
* touch on any segment of the wheel for the shown color.

This version also exists as a small Bangle.js 2 [application](https://rozek.github.io/BangleApps/) - just look for "ColorWheel"

<br clear="left">

## License ##

[MIT License](LICENSE.md)
