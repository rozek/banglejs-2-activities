# banglejs-2-activities #

a series of studies and experiments with Bangle.js 2

The [Bangle.js 2](https://www.espruino.com/Bangle.js2) is the second iteration of a JavaScript-programmable smartwatch made available by the [Espruino](https://www.espruino.com/) creator [Gordon Williams](https://github.com/gfwilliams).

This repository documents a series of studies and experiments conducted by the author in the course of developing an application for the bangle.js 2 - looking at the discussions in the [Espruino forum](http://forum.espruino.com/microcosms/1424/), their outcome may be of interest to other people as well.

## Usage ##

All "activities" come with their source code - many of them may already be run in the [Espruino emulator](https://www.espruino.com/ide/emulator.html), others require a real device.

Unless otherwise described, any source code should be copied into the clipboard and then pasted into the editor on the right side of the [Espruino Web IDE](https://www.espruino.com/ide). From there, it may now be uploaded to the (real or virtual) smartwatch and executed.

## Overview ##

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

## Actual Activities ##

### Basic Colors ###

<img src="Colors/BasicColors.png">

Because of a restriction to 3-bit colours, a Bangle.js 2 may only display 8 colors without dithering. [This little snippet](Colors/BasicColors.js) lists them.

### Bitmap Preparation ###

When it comes to preparing a bitmap for being shown on a Bangle.js 2 display, the converter built into the Web IDE's "Device Storage" manager does a remarkably good job (given the constraints it is suffering from)

![](Colors/BitmapPreparation.png)

However, this step also has its limitations, as shown in the following [test image](https://en.wikipedia.org/wiki/Lenna):

![](Colors/Lenna-TestImage.png)

### "Half Colors" ###

Forum user "Numerist" suggested to use RGB channel value 0.5 in addition to the natively supported values 0.0 and 1.0 in programs as the dithering algorithm built into the Bangle.js 2 seemed to produce acceptable results:

![](Colors/HalfColors.png)

You may try yourself with this little [code snippet](Colors/HalfColors.js).

Forum user HughB suggested to make the color patches touchable and display the hexadecimal color code of any touched patch - et voilá, [here it comes](Colors/HalfColors-touchable.js)!

### "Quarter Colors" ###

While "Half Colors" still look acceptable, the next refinement step ("Quarter Colors") no longer produces good looking results:

![](Colors/QuarterColors.png)

[Try yourself](Colors/QuarterColors.js).

### Color Wheel ###

Because of a need for a series of different colors, the author made this little "color wheel":

![](Colors/ColorWheel.png)

You may try yourself with this little [code snippet](Colors/ColorWheel.js).

Again there is also a [touchable version](Colors/ColorWheel-touchable.js) which displays the internal hexdecimal code of any touched color:

![](Colors/ColorWheel-touchable-1.png)
![](Colors/ColorWheel-touchable-2.png)

The whole screen is touchable:

* touch outside the wheel for "black"
* touch inside the wheel for "white"
* touch on any segment of the wheel for the shown color.

This version also exists as a small Bengle.js 2 [application](https://rozek.github.io/BangleApps/) - just look for "ColorWheel"

## License ##

[MIT License](LICENSE.md)
