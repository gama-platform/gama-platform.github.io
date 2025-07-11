---
title:  Units and constants
---


----

**This file is automatically generated from java files. Do Not Edit It.**

----


## Introduction
Units can be used to qualify the values of numeric variables. By default, unqualified values are considered as:

* meters for distances, lengths...
* seconds for durations
* cubic meters for volumes
* kilograms for masses 

So, an expression like:
```
float foo <- 1;
```

will be considered as 1 meter if `foo` is a distance, or 1 second if it is a duration, or 1 meter/second if it is a speed. If one wants to specify the unit, it can be done very simply by adding the unit symbol (° or `#`) followed by an unit name after the numeric value, like:

```
float foo <- 1 °centimeter;
```

or

```
float foo <- 1 #centimeter;
```

In that case, the numeric value of `foo` will be automatically translated to 0.01 (meter). It is recommended to always use float as the type of the variables that might be qualified by units (otherwise, for example in the previous case, they might be truncated to 0). 
Several units names are allowed as qualifiers of numeric variables. 
These units represent the basic metric and US units. Composed and derived units (like velocity, acceleration, special volumes or surfaces) can be obtained by combining these units using the `*` and `/` operators. For instance:
```
float one_kmh <- 1 °km / °h const: true;
float one_millisecond <-1 °sec / 1000;
float one_cubic_inch <- 1 °sqin * 1 °inch;
... etc ...
```


	
		
----

## 3D
* **`#ambient`**, value= Ambient light, Comment: Represent the 'ambient' type of light
* **`#direction`**, value= Directional light, Comment: Represent the 'direction' type of light
* **`#from_above`**, value= From above, Comment: Represent the position of the camera, above the scene
* **`#from_front`**, value= From front, Comment: Represent the position of the camera, in front of the scene
* **`#from_left`**, value= From left, Comment: Represent the position of the camera, on the left of the scene
* **`#from_right`**, value= From right, Comment: Represent the position of the camera, on the right of the scene
* **`#from_up_front`**, value= From up front, Comment: Represent the position of the camera, in front and slightly above the scene
* **`#from_up_left`**, value= From up left, Comment: Represent the position of the camera, on the left, slightly above the scene
* **`#from_up_right`**, value= From up right, Comment: Represent the position of the camera on the right, slightly above the scene
* **`#isometric`**, value= Isometric, Comment: Represent the position of the camera, on the left of the scene
* **`#point`**, value= Point light, Comment: Represent the 'point' type of light
* **`#spot`**, value= Spot light, Comment: Represent the 'spot' type of light
		
----

## Constants
* **`#AStar`**, value= AStar, Comment: AStar shortest path computation algorithm
* **`#BellmannFord`**, value= BellmannFord, Comment: BellmannFord shortest path computation algorithm
* **`#Bhandari`**, value= Bhandari, Comment: Bhandari K shortest paths computation algorithm
* **`#BidirectionalDijkstra`**, value= BidirectionalDijkstra, Comment: BidirectionalDijkstra shortest path computation algorithm
* **`#CHBidirectionalDijkstra`**, value= CHBidirectionalDijkstra, Comment: CHBidirectionalDijkstra shortest path computation algorithm
* **`#current_error`**, value= , Comment: The text of the last error thrown during the current execution
* **`#DeltaStepping`**, value= DeltaStepping, Comment: DeltaStepping shortest path computation algorithm
* **`#Dijkstra`**, value= Dijkstra, Comment: Dijkstra shortest path computation algorithm
* **`#e`**, value= 2.718281828459045, Comment: The e constant
* **`#Eppstein`**, value= Eppstein, Comment: Eppstein K shortest paths computation algorithm
* **`#FloydWarshall`**, value= FloydWarshall, Comment: FloydWarshall shortest path computation algorithm
* **`#infinity`**, value= Infinity, Comment: A constant holding the positive infinity of type float (Java Double.POSITIVE_INFINITY)
* **`#max_float`**, value= 1.7976931348623157E308, Comment: A constant holding the largest positive finite value of type float (Java Double.MAX_VALUE)
* **`#max_int`**, value= 2147483647, Comment: A constant holding the maximum value an int can have (Java Integer.MAX_VALUE)
* **`#min_float`**, value= 4.9E-324, Comment: A constant holding the smallest positive nonzero value of type float (Java Double.MIN_VALUE)
* **`#min_int`**, value= -2147483648, Comment: A constant holding the minimum value an int can have (Java Integer.MIN_VALUE)
* **`#nan`**, value= NaN, Comment: A constant holding a Not-a-Number (NaN) value of type float (Java Double.POSITIVE_INFINITY)
* **`#NBAStar`**, value= NBAStar, Comment: NBAStar shortest path computation algorithm
* **`#NBAStarApprox`**, value= NBAStarApprox, Comment: NBAStarApprox shortest path computation algorithm
* **`#pi`**, value= 3.141592653589793, Comment: The PI constant
* **`#Suurballe`**, value= Suurballe, Comment: Suurballe K shortest paths computation algorithm
* **`#to_deg`**, value= 57.29577951308232, Comment: A constant holding the value to convert radians into degrees
* **`#to_rad`**, value= 0.017453292519943295, Comment: A constant holding the value to convert degrees into radians
* **`#TransitNodeRouting`**, value= TransitNodeRouting, Comment: TransitNodeRouting shortest path computation algorithm
* **`#Yen`**, value= Yen, Comment: Yen K shortest paths computation algorithm
		
----

## Graphics units
* **`#bold`**, value= 1, Comment: This constant allows to build a font with a bold face. Can be combined with #italic
* **`#bottom_center`**, value= No Default Value, Comment: Represents an anchor situated at the center of the bottom side of the text to draw
* **`#bottom_left`**, value= No Default Value, Comment: Represents an anchor situated at the bottom left corner of the text to draw
* **`#bottom_right`**, value= No Default Value, Comment: Represents an anchor situated at the bottom right corner of the text to draw
* **`#camera_location`**, value= No Default Value, Comment: This unit, only available when running aspects or declaring displays, returns the current position of the camera as a point
* **`#camera_orientation`**, value= No Default Value, Comment: This unit, only available when running aspects or declaring displays, returns the current orientation of the camera as a point
* **`#camera_target`**, value= No Default Value, Comment: This unit, only available when running aspects or declaring displays, returns the current target of the camera as a point
* **`#center`**, value= No Default Value, Comment: Represents an anchor situated at the center of the text to draw
* **`#display_height`**, value= 1.0, Comment: This constant is only accessible in a graphical context: display, graphics...
* **`#display_width`**, value= 1.0, Comment: This constant is only accessible in a graphical context: display, graphics...
* **`#flat`**, value= 2, Comment: This constant represents a flat line buffer end cap style
* **`#fullscreen`**, value= false, Comment: This unit, only available when running aspects or declaring displays, returns whether the display is currently fullscreen or not
* **`#hidpi`**, value= false, Comment: This unit, only available when running aspects or declaring displays, returns whether the display is currently in HiDPI mode or not
* **`#horizontal`**, value= 3, Comment: This constant represents a layout where all display views are aligned horizontally
* **`#italic`**, value= 2, Comment: This constant allows to build a font with an italic face. Can be combined with #bold
* **`#left_center`**, value= No Default Value, Comment: Represents an anchor situated at the center of the left side of the text to draw
* **`#none`**, value= 0, Comment: This constant represents the absence of a predefined layout
* **`#pixels`** (#px), value= 1.0, Comment: This unit, only available when running aspects or declaring displays,  returns a dynamic value instead of a fixed one. px (or pixels), returns the value of one pixel on the current view in terms of model units.
* **`#plain`**, value= 0, Comment: This constant allows to build a font with a plain face
* **`#right_center`**, value= No Default Value, Comment: Represents an anchor situated at the center of the right side of the text to draw
* **`#round`**, value= 1, Comment: This constant represents a round line buffer end cap style
* **`#split`**, value= 2, Comment: This constant represents a layout where all display views are split in a grid-like structure
* **`#square`**, value= 3, Comment: This constant represents a square line buffer end cap style
* **`#stack`**, value= 1, Comment: This constant represents a layout where all display views are stacked
* **`#top_center`**, value= No Default Value, Comment: Represents an anchor situated at the center of the top side of the text to draw
* **`#top_left`**, value= No Default Value, Comment: Represents an anchor situated at the top left corner of the text to draw
* **`#top_right`**, value= No Default Value, Comment: Represents an anchor situated at the top right corner of the text to draw
* **`#user_location`** (#user_location_in_world), value= No Default Value, Comment: This unit permanently holds the mouse's location in the world's coordinates. If it is outside a display window, its last position is used.
* **`#user_location_in_display`**, value= No Default Value, Comment: This unit permanently holds the mouse's location in the display's coordinates. If it is outside a display window, its last position is used.
* **`#vertical`**, value= 4, Comment: This constant represents a layout where all display views are aligned vertically
* **`#zoom`**, value= 1.0, Comment: This unit, only available when running aspects or declaring displays, returns the current zoom level of the display as a positive float, where 1.0 represent the neutral zoom (100%)
		
----

## Length units
* **`#µm`** (#micrometer,#micrometers), value= 1.0E-6, Comment: micrometer unit
* **`#cm`** (#centimeter,#centimeters), value= 0.01, Comment: centimeter unit
* **`#dm`** (#decimeter,#decimeters), value= 0.1, Comment: decimeter unit
* **`#foot`** (#feet,#ft), value= 0.3048, Comment: foot unit
* **`#inch`** (#inches), value= 0.025400000000000002, Comment: inch unit
* **`#km`** (#kilometer,#kilometers), value= 1000.0, Comment: kilometer unit
* **`#m`** (#meter,#meters), value= 1.0, Comment: meter: the length basic unit
* **`#mile`** (#miles), value= 1609.344, Comment: mile unit
* **`#mm`** (#milimeter,#milimeters), value= 0.001, Comment: millimeter unit
* **`#nm`** (#nanometer,#nanometers), value= 9.999999999999999E-10, Comment: nanometer unit
* **`#yard`** (#yards), value= 0.9144, Comment: yard unit
		
----

## Math constants
* **`#AdamsBashforth`**, value= AdamsBashforth, Comment: AdamsBashforth solver
* **`#AdamsMoulton`**, value= AdamsMoulton, Comment: AdamsMoulton solver
* **`#DormandPrince54`**, value= DormandPrince54, Comment: DormandPrince54 solver
* **`#dp853`**, value= dp853, Comment: dp853 solver
* **`#Euler`**, value= Euler, Comment: Euler solver
* **`#Gill`**, value= Gill, Comment: Gill solver
* **`#GraggBulirschStoer`**, value= GraggBulirschStoer, Comment: GraggBulirschStoer solver
* **`#HighamHall54`**, value= HighamHall54, Comment: HighamHall54 solver
* **`#Luther`**, value= Luther, Comment: Luther solver
* **`#Midpoint`**, value= Midpoint, Comment: Midpoint solver
* **`#rk4`**, value= rk4, Comment: rk4 solver
* **`#ThreeEighthes`**, value= ThreeEighthes, Comment: ThreeEighthes solver
		
----

## Surface units
* **`#m2`**, value= 1.0, Comment: square meter: the basic unit for surfaces
* **`#sqft`** (#square_foot,#square_feet), value= 0.09290304, Comment: square foot unit
* **`#sqin`** (#square_inch,#square_inches), value= 6.451600000000001E-4, Comment: square inch unit
* **`#sqmi`** (#square_mile,#square_miles), value= 2589988.110336, Comment: square mile unit
		
----

## Time units
* **`#custom`**, value= CUSTOM, Comment: custom: a custom date/time pattern that can be defined in the preferences of GAMA and reused in models
* **`#cycle`** (#cycles), value= 1, Comment: cycle: the discrete measure of time in the simulation. Used to force a temporal expression to be expressed in terms of cycles rather than seconds
* **`#day`** (#d,#days), value= 86400.0, Comment: day time unit: defines an exact duration of 24 hours
* **`#epoch`**, value= No Default Value, Comment: The epoch default starting date as defined by the ISO format (1970-01-01T00:00Z)
* **`#h`** (#hour,#hours), value= 3600.0, Comment: hour time unit: defines an exact duration of 60 minutes
* **`#iso_local`**, value= ISO_LOCAL_DATE_TIME, Comment: iso_local: the standard ISO 8601 output / parsing format for local dates (i.e. with no time-zone information)
* **`#iso_offset`**, value= ISO_OFFSET_DATE_TIME, Comment: iso_offset: the standard ISO 8601 output / parsing format for dates with a time offset
* **`#iso_zoned`**, value= ISO_ZONED_DATE_TIME, Comment: iso_zoned: the standard ISO 8601 output / parsing format for dates with a time zone
* **`#minute`** (#minutes,#mn), value= 60.0, Comment: minute time unit: defined an exact duration of 60 seconds
* **`#month`** (#months), value= 2592000.0, Comment: month time unit: an approximate duration of 30 days. The number of days of each #month depend of course on the current_date of the model and cannot be constant
* **`#msec`** (#millisecond,#milliseconds,#ms), value= 0.001, Comment: millisecond time unit: defines an exact duration of 0.001 second
* **`#now`**, value= 1.0, Comment: This value represents the current date
* **`#sec`** (#second,#seconds,#s), value= 1.0, Comment: second: the time basic unit, with a fixed value of 1. All other durations are expressed with respect to it
* **`#week`** (#weeks), value= 604800.0, Comment: week time unit: defines an exact duration of 7 days
* **`#year`** (#years,#y), value= 3.1536E7, Comment: year time unit: an approximate duration of 365 days. The value of #year in number of days varies depending on leap years, etc. and is dependend on the current_date of the model
		
----

## User control operators
		
----

## Volume units
* **`#cl`** (#centiliter,#centiliters), value= 1.0E-5, Comment: centiliter unit
* **`#dl`** (#deciliter,#deciliters), value= 1.0E-4, Comment: deciliter unit
* **`#hl`** (#hectoliter,#hectoliters), value= 0.1, Comment: hectoliter unit
* **`#l`** (#liter,#liters,#dm3), value= 0.001, Comment: liter unit
* **`#m3`**, value= 1.0, Comment: cube meter: the basic unit for volumes
		
----

## Weight units
* **`#gram`** (#grams), value= 0.001, Comment: gram unit
* **`#kg`** (#kilo,#kilogram,#kilos), value= 1.0, Comment: second: the basic unit for weights
* **`#longton`** (#lton), value= 1016.0469088000001, Comment: short ton unit
* **`#ounce`** (#oz,#ounces), value= 0.028349523125, Comment: ounce unit
* **`#pound`** (#lb,#pounds,#lbm), value= 0.45359237, Comment: pound unit
* **`#shortton`** (#ston), value= 907.18474, Comment: short ton unit
* **`#stone`** (#st), value= 6.35029318, Comment: stone unit
* **`#ton`** (#tons), value= 1000.0, Comment: ton unit


----

## Colors

In addition to the previous units, GAML provides a direct access to the 147 named colors defined in CSS (see http://www.cssportal.com/css3-color-names/). E.g,
```
rgb my_color <- °teal;
```

* **`#aliceblue`**, value= r=240, g=248, b=255, alpha=255
* **`#antiquewhite`**, value= r=250, g=235, b=215, alpha=255
* **`#aqua`**, value= r=0, g=255, b=255, alpha=255
* **`#aquamarine`**, value= r=127, g=255, b=212, alpha=255
* **`#azure`**, value= r=240, g=255, b=255, alpha=255
* **`#beige`**, value= r=245, g=245, b=220, alpha=255
* **`#bisque`**, value= r=255, g=228, b=196, alpha=255
* **`#black`**, value= r=0, g=0, b=0, alpha=255
* **`#blanchedalmond`**, value= r=255, g=235, b=205, alpha=255
* **`#blue`**, value= r=0, g=0, b=255, alpha=255
* **`#blueviolet`**, value= r=138, g=43, b=226, alpha=255
* **`#brown`**, value= r=165, g=42, b=42, alpha=255
* **`#burlywood`**, value= r=222, g=184, b=135, alpha=255
* **`#cadetblue`**, value= r=95, g=158, b=160, alpha=255
* **`#chartreuse`**, value= r=127, g=255, b=0, alpha=255
* **`#chocolate`**, value= r=210, g=105, b=30, alpha=255
* **`#coral`**, value= r=255, g=127, b=80, alpha=255
* **`#cornflowerblue`**, value= r=100, g=149, b=237, alpha=255
* **`#cornsilk`**, value= r=255, g=248, b=220, alpha=255
* **`#crimson`**, value= r=220, g=20, b=60, alpha=255
* **`#cyan`**, value= r=0, g=255, b=255, alpha=255
* **`#darkblue`**, value= r=0, g=0, b=139, alpha=255
* **`#darkcyan`**, value= r=0, g=139, b=139, alpha=255
* **`#darkgoldenrod`**, value= r=184, g=134, b=11, alpha=255
* **`#darkgray`**, value= r=169, g=169, b=169, alpha=255
* **`#darkgreen`**, value= r=0, g=100, b=0, alpha=255
* **`#darkgrey`**, value= r=169, g=169, b=169, alpha=255
* **`#darkkhaki`**, value= r=189, g=183, b=107, alpha=255
* **`#darkmagenta`**, value= r=139, g=0, b=139, alpha=255
* **`#darkolivegreen`**, value= r=85, g=107, b=47, alpha=255
* **`#darkorange`**, value= r=255, g=140, b=0, alpha=255
* **`#darkorchid`**, value= r=153, g=50, b=204, alpha=255
* **`#darkred`**, value= r=139, g=0, b=0, alpha=255
* **`#darksalmon`**, value= r=233, g=150, b=122, alpha=255
* **`#darkseagreen`**, value= r=143, g=188, b=143, alpha=255
* **`#darkslateblue`**, value= r=72, g=61, b=139, alpha=255
* **`#darkslategray`**, value= r=47, g=79, b=79, alpha=255
* **`#darkslategrey`**, value= r=47, g=79, b=79, alpha=255
* **`#darkturquoise`**, value= r=0, g=206, b=209, alpha=255
* **`#darkviolet`**, value= r=148, g=0, b=211, alpha=255
* **`#deeppink`**, value= r=255, g=20, b=147, alpha=255
* **`#deepskyblue`**, value= r=0, g=191, b=255, alpha=255
* **`#dimgray`**, value= r=105, g=105, b=105, alpha=255
* **`#dimgrey`**, value= r=105, g=105, b=105, alpha=255
* **`#dodgerblue`**, value= r=30, g=144, b=255, alpha=255
* **`#firebrick`**, value= r=178, g=34, b=34, alpha=255
* **`#floralwhite`**, value= r=255, g=250, b=240, alpha=255
* **`#forestgreen`**, value= r=34, g=139, b=34, alpha=255
* **`#fuchsia`**, value= r=255, g=0, b=255, alpha=255
* **`#gainsboro`**, value= r=220, g=220, b=220, alpha=255
* **`#ghostwhite`**, value= r=248, g=248, b=255, alpha=255
* **`#gold`**, value= r=255, g=215, b=0, alpha=255
* **`#goldenrod`**, value= r=218, g=165, b=32, alpha=255
* **`#gray`**, value= r=128, g=128, b=128, alpha=255
* **`#green`**, value= r=0, g=128, b=0, alpha=255
* **`#greenyellow`**, value= r=173, g=255, b=47, alpha=255
* **`#grey`**, value= r=128, g=128, b=128, alpha=255
* **`#honeydew`**, value= r=240, g=255, b=240, alpha=255
* **`#hotpink`**, value= r=255, g=105, b=180, alpha=255
* **`#indianred`**, value= r=205, g=92, b=92, alpha=255
* **`#indigo`**, value= r=75, g=0, b=130, alpha=255
* **`#ivory`**, value= r=255, g=255, b=240, alpha=255
* **`#khaki`**, value= r=240, g=230, b=140, alpha=255
* **`#lavender`**, value= r=230, g=230, b=250, alpha=255
* **`#lavenderblush`**, value= r=255, g=240, b=245, alpha=255
* **`#lawngreen`**, value= r=124, g=252, b=0, alpha=255
* **`#lemonchiffon`**, value= r=255, g=250, b=205, alpha=255
* **`#lightblue`**, value= r=173, g=216, b=230, alpha=255
* **`#lightcoral`**, value= r=240, g=128, b=128, alpha=255
* **`#lightcyan`**, value= r=224, g=255, b=255, alpha=255
* **`#lightgoldenrodyellow`**, value= r=250, g=250, b=210, alpha=255
* **`#lightgray`**, value= r=211, g=211, b=211, alpha=255
* **`#lightgreen`**, value= r=144, g=238, b=144, alpha=255
* **`#lightgrey`**, value= r=211, g=211, b=211, alpha=255
* **`#lightpink`**, value= r=255, g=182, b=193, alpha=255
* **`#lightsalmon`**, value= r=255, g=160, b=122, alpha=255
* **`#lightseagreen`**, value= r=32, g=178, b=170, alpha=255
* **`#lightskyblue`**, value= r=135, g=206, b=250, alpha=255
* **`#lightslategray`**, value= r=119, g=136, b=153, alpha=255
* **`#lightslategrey`**, value= r=119, g=136, b=153, alpha=255
* **`#lightsteelblue`**, value= r=176, g=196, b=222, alpha=255
* **`#lightyellow`**, value= r=255, g=255, b=224, alpha=255
* **`#lime`**, value= r=0, g=255, b=0, alpha=255
* **`#limegreen`**, value= r=50, g=205, b=50, alpha=255
* **`#linen`**, value= r=250, g=240, b=230, alpha=255
* **`#magenta`**, value= r=255, g=0, b=255, alpha=255
* **`#maroon`**, value= r=128, g=0, b=0, alpha=255
* **`#mediumaquamarine`**, value= r=102, g=205, b=170, alpha=255
* **`#mediumblue`**, value= r=0, g=0, b=205, alpha=255
* **`#mediumorchid`**, value= r=186, g=85, b=211, alpha=255
* **`#mediumpurple`**, value= r=147, g=112, b=219, alpha=255
* **`#mediumseagreen`**, value= r=60, g=179, b=113, alpha=255
* **`#mediumslateblue`**, value= r=123, g=104, b=238, alpha=255
* **`#mediumspringgreen`**, value= r=0, g=250, b=154, alpha=255
* **`#mediumturquoise`**, value= r=72, g=209, b=204, alpha=255
* **`#mediumvioletred`**, value= r=199, g=21, b=133, alpha=255
* **`#midnightblue`**, value= r=25, g=25, b=112, alpha=255
* **`#mintcream`**, value= r=245, g=255, b=250, alpha=255
* **`#mistyrose`**, value= r=255, g=228, b=225, alpha=255
* **`#moccasin`**, value= r=255, g=228, b=181, alpha=255
* **`#navajowhite`**, value= r=255, g=222, b=173, alpha=255
* **`#navy`**, value= r=0, g=0, b=128, alpha=255
* **`#oldlace`**, value= r=253, g=245, b=230, alpha=255
* **`#olive`**, value= r=128, g=128, b=0, alpha=255
* **`#olivedrab`**, value= r=107, g=142, b=35, alpha=255
* **`#orange`**, value= r=255, g=165, b=0, alpha=255
* **`#orangered`**, value= r=255, g=69, b=0, alpha=255
* **`#orchid`**, value= r=218, g=112, b=214, alpha=255
* **`#palegoldenrod`**, value= r=238, g=232, b=170, alpha=255
* **`#palegreen`**, value= r=152, g=251, b=152, alpha=255
* **`#paleturquoise`**, value= r=175, g=238, b=238, alpha=255
* **`#palevioletred`**, value= r=219, g=112, b=147, alpha=255
* **`#papayawhip`**, value= r=255, g=239, b=213, alpha=255
* **`#peachpuff`**, value= r=255, g=218, b=185, alpha=255
* **`#peru`**, value= r=205, g=133, b=63, alpha=255
* **`#pink`**, value= r=255, g=192, b=203, alpha=255
* **`#plum`**, value= r=221, g=160, b=221, alpha=255
* **`#powderblue`**, value= r=176, g=224, b=230, alpha=255
* **`#purple`**, value= r=128, g=0, b=128, alpha=255
* **`#red`**, value= r=255, g=0, b=0, alpha=255
* **`#rosybrown`**, value= r=188, g=143, b=143, alpha=255
* **`#royalblue`**, value= r=65, g=105, b=225, alpha=255
* **`#saddlebrown`**, value= r=139, g=69, b=19, alpha=255
* **`#salmon`**, value= r=250, g=128, b=114, alpha=255
* **`#sandybrown`**, value= r=244, g=164, b=96, alpha=255
* **`#seagreen`**, value= r=46, g=139, b=87, alpha=255
* **`#seashell`**, value= r=255, g=245, b=238, alpha=255
* **`#sienna`**, value= r=160, g=82, b=45, alpha=255
* **`#silver`**, value= r=192, g=192, b=192, alpha=255
* **`#skyblue`**, value= r=135, g=206, b=235, alpha=255
* **`#slateblue`**, value= r=106, g=90, b=205, alpha=255
* **`#slategray`**, value= r=112, g=128, b=144, alpha=255
* **`#slategrey`**, value= r=112, g=128, b=144, alpha=255
* **`#snow`**, value= r=255, g=250, b=250, alpha=255
* **`#springgreen`**, value= r=0, g=255, b=127, alpha=255
* **`#steelblue`**, value= r=70, g=130, b=180, alpha=255
* **`#tan`**, value= r=210, g=180, b=140, alpha=255
* **`#teal`**, value= r=0, g=128, b=128, alpha=255
* **`#thistle`**, value= r=216, g=191, b=216, alpha=255
* **`#tomato`**, value= r=255, g=99, b=71, alpha=255
* **`#transparent`**, value= r=0, g=0, b=0, alpha=0
* **`#turquoise`**, value= r=64, g=224, b=208, alpha=255
* **`#violet`**, value= r=238, g=130, b=238, alpha=255
* **`#wheat`**, value= r=245, g=222, b=179, alpha=255
* **`#white`**, value= r=255, g=255, b=255, alpha=255
* **`#whitesmoke`**, value= r=245, g=245, b=245, alpha=255
* **`#yellow`**, value= r=255, g=255, b=0, alpha=255
* **`#yellowgreen`**, value= r=154, g=205, b=50, alpha=255
