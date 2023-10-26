---
title:  Manipulate Dates
---

[//]: # (keyword|concept_date)

[//]: # (keyword|type_date) 
[//]: # (keyword|concept_time)
## Managing Time in Models

If some models are based on an abstract time - only the number of cycles is important - others are based on a real time. To this purpose, GAMA provides some tools to manage time.

First, GAMA allows the modeler to define the duration of a simulation step. It provides access to different time variables. At last, since GAMA 1.7, it provides a date variable type and some global variables allowing to use a real calendar to manage time.

## Definition of the step and use of temporal unity values

GAMA provides three important [global variables to manage time](GlobalSpecies#cycle):

* `cycle` (int - not modifiable): the current simulation step - this variable is incremented by 1 at each simulation step
* `step` (float - can be modified): the duration of a simulation step (in seconds). By default, the duration is one second.
* `time` (float - not modifiable): the current time spent since the beginning of the simulation - this variable is computed at each simulation step by: time = cycle * step. 

The value of the cycle and time variables are shown in the top left (green rectangle) of the simulation interface. Clicking on the green rectangle allows to display either the number cycles or the time variable. Concerning this variable, it is presented following a years - months - days - hours - minutes - seconds format. In this presentation, every month is considered as being composed of 30 days (the different number of days of months are not taken into account).

Concerning step global variable, the variable can be modified by the modeler. A classic way of doing it consists of reediting the variable in the global section:

```
global {
    float step <- 1 #hour;
}
```

In this example, each simulation step will represent 1 hour. This time will be taken into account for all actions based on time (e.g. moving actions).

Note that the value of the `step` variable should be given in seconds. To facilitate the definition of the step value and of all expressions based on time, GAMA provides [different built-in constant variables accessible with the "`#`" symbol](UnitsAndConstants#time-units): 

* `#s` : second - 1 second
* `#mn` : minute - 60 seconds
* `#hour` : hour - 60 minutes - 3600 seconds
* `#day` : day - 24 hours - 86400 seconds
* `#week`: week - 7 days - 604800 seconds
* `#month` : month - 30 days - 2592000 seconds
* `#year` : year - 12 month - 3.1104E7 seconds
	

## The date variable type and the use of a real calendar
Since GAMA 1.7, it is possible to use a real calendar to manage the time. For that, the modeler has only to define the starting date of the simulation. This variable is of type `date` which allows him/her to represent a date and time. 
A date variable has several attributes:

* `year` (int): the year component of the date
* `month` (int): the month component of the date
* `day` (int): the day component of the date
* `hour` (int): the hour component of the date
* `minute` (int): the minute component of the date
* `second` (int): the second component of the date
* `day_of_week` (int): the day of the week
* `week_of_year` (int): the week of the year

Several ways can be used to define a date. The simplest one consists in using a list of int values: [year,month of the year,day of the month, hour of the day, minute of the hour, second of the minute]
```
date my_date <- date([2010,3,23,17,30,10]); // the 23th of March 2010, at 17:30:10
```
Another way consists in using a string with the good format. The following one is perhaps the most complete, with year, month, day, hour, minute, second and also the time zone.
```
date my_date <- date("2010-3-23T17:30:10+07:00"); 
```
But the following ones can also be used:
```
// without time zone:
my_date3 <- date("2010-03-23 17:30:10"); 
//Dates (without time)
my_date3 <- date("20100323");
my_date3 <- date("2010-03-23");
// Dates using some patterns:
my_date3 <- date("03 23 2010","MM dd yyyy");
my_date3 <- date("01 23 20","HH mm ss");
```

Note that the current (real) date can be accessed through the `#now` built-in variable (variable of type date).

In addition, GAMA provides different useful operators working on dates. For instance, it is possible to compute the duration in seconds between 2 dates using the "`-`" operator. The result is given in seconds:
```
float d <- starting_date - my_date;
```

It is also possible to add or subtract a duration (in seconds) to a date:
```
write "my_date + 10: " + (my_date + 10);
write "my_date - 10: " + (my_date - 10);
```
		 
At last, it is possible to add or subtract a duration (in years, months, weeks, days, hours, minutes,  seconds) to a date:
```
write "my_date add_years 1: " + (my_date add_years 1);
write "my_date add_months 1: " + (my_date add_months 1);
write "my_date add_weeks 1: " + (my_date add_weeks 1);
write "my_date add_days 1: " + (my_date add_days 1);
write "my_date add_hours 1: " + (my_date add_hours 1);
write "my_date add_minutes 1: " + (my_date add_minutes 1);
write "my_date add_seconds 1: " + (my_date add_seconds 1);
		  
write "my_date subtract_years 1: " + (my_date subtract_years 1);
write "my_date subtract_months 1: " + (my_date subtract_months 1);
write "my_date subtract_weeks 1: " + (my_date subtract_weeks 1);
write "my_date subtract_days 1: " + (my_date subtract_days 1);
write "my_date subtract_hours 1: " + (my_date subtract_hours 1);
write "my_date subtract_minutes 1: " + (my_date subtract_minutes 1);
write "my_date subtract_seconds 1: " + (my_date subtract_seconds 1);
```

## Date variables in the model

For the modelers, two global date variables are available:

* `starting_date`: date considered as the beginning of the simulation (by default the starting date is `1970-01-01 07:00:00`.
* `current_date`: current date of the simulation.

Defining a value of the starting_date allows to change the normal time management of the simulation by a more realistic one (using a calendar): 
```
global {
    date starting_date <- date([1979,12,17,19,45,10]);
}
```

When a value is set to this variable, the `current_date` variable is automatically initialized with the same value. However, at each simulation step, the `current_date` variable is incremented by the `step` variable. The value of the `current_date` will replace the value of the time variable in the top left green panel.

Note that you have to be careful when a real calendar is used, the built-in constants `#month` and `#year` should not be used as there are not consistent with the calendar (where month can be composed of 28, 29, 30 or 31 days).
