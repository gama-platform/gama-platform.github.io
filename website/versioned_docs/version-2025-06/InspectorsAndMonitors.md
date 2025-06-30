---
title:  Inspectors and monitors
---


GAMA offers some tools to obtain information about one or several agents. There are two kinds of tools:

* agent browser
* agent inspector

GAMA offers as well a tool to get the value of a specific expression: monitors.

## Table of contents 

* [Inspectors and monitors](#inspectors-and-monitors)
  * [Agent Browser](#agent-browser)
  * [Agent Inspector](#agent-inspector)
  * [Monitor](#monitor)


## Agent Browser

The species browser provides information about all or a selection of agents of a species.

The agent browser is available through the **Agents** menu.

![Open the browse menu from the Agents menu.](/resources/images/runningExperiments/inspectMonitor_browse_menu.png)



It displays in a table all the values of the agent variables of the considered species; each line corresponding to an agent. The list of attributes is displayed on the left side of the view, and you can select the attributes you want to be displayed, simply by clicking on it (Ctrl + Click for multi-selection).

![The Browse View of the prey species.](/resources/images/runningExperiments/inspectMonitor_browse_result.png)


By clicking on the right mouse button on a line, it is possible to perform some actions on the corresponding agent (the same actions as when we right-click on it in a display).

The Browse view provides also two interesting additional features:

1. **Browse a species**: change the population displayed in the table.
2. **Save the agents and their attributes in a `.csv` file**: this allows the modeler to manipulate and analyze the agent population at will in external software.

![More actions command available in the browse view.](/resources/images/runningExperiments/inspectMonitor_browse_additional_actions.png)


## Agent Inspector
The agent inspector provides information about one specific agent. It also allows the modeler to change the values of its variables during the simulation. The agent inspector is available from the **Agents** menu, by right\_clicking on a display, in the species inspector or when inspecting another agent.

![Inspect an agent from right-clicking on it in any display.](/resources/images/runningExperiments/inspectMonitor_Agent_inspector.png)

It is possible to "highlight" the selected agent, to focus on it in all the displays, or to kill it.

![Inspector view allows the modeler to focus on the inspected agent and to highlight it.](/resources/images/runningExperiments/inspectMonitor_Inspector_highlight.png)

To change the color of the highlighted agent, go to Preferences/Display.

![Change the highlight color from the Preferences.](/resources/images/runningExperiments/inspectMonitor_Inspector_change_highlight_color.png)



## Monitor
Monitors allow the user to follow the value of a GAML expression. For instance, the following ones monitor the number of prey and predator agents during the simulation (the model is available in the Prey Predator tutorial). The monitor is updated at each simulation step.

![Monitors of the number of prey and predator agents (Prey-Predator tutorial).](/resources/images/runningExperiments/inspectMonitor_monitor.png)



It is possible to define a monitor inside a model (see [this page](DefiningMonitorsAndInspectors)). It is also possible to define a monitor through the graphical interface.

To define a monitor, first choose **Add Monitor** in the **Views** menu (or by clicking on the icon in the Monitor view), then define the display legend and the expression to monitor. The expression is compiled when it is written in the text field: as long as the text field is surrounded by a red rectangle, it is incorrect. When the surrounding color becomes green, GAMA has accepted the expression and its value can be displayed in the monitor.

![Addition of a monitor from Views menu or from the Monitors View.](/resources/images/runningExperiments/inspectMonitor_add_monitor.png)

In the following example, we defined a monitor with the legend "Total number of agents" and its value is defined by the GAML expression computing the sum of the number of agents in each population: `length(prey) + length(predator)`.

![Creation of a monitor for the total number of agents in the simulation.](/resources/images/runningExperiments/inspectMonitor_monitor_definition.png)

The expression should be written with the GAML language. See [this page](GamlReference) for more details about the GAML language.
