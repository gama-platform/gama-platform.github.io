---
title: Updating GAMA
id: version-1.8.1-Updating
original_id: Updating
---



Unless you are using the version of GAMA built from the sources available in the GIT repository of the project (see [here](InstallingGitVersion)), you are normally running a specific **release** of GAMA that sports a given **version number** (e.g. GAMA 1.8.1, GAMA 1.7, GAMA 1.6.1, etc.). When new features were developed, or when serious issues were fixed, the release you had on your disk, prior to GAMA 1.6.1, could not benefit from them. Since the version 1.6.1, however, GAMA has been enhanced to support a _self\_update_ mechanism, which allows you to import from the GAMA update site additional plugins (offering new features) or updated versions of the plugins that constitute the core of GAMA. 

The update of GAMA will be detailed on this page; to install new additional plugins (from the GAMA community or third-part developers) see the page dedicated to [the installation of new plugins](InstallingPlugins).

## Table of contents 

* [Updating GAMA](#updating-gama)
  * [Manual Update](#manual-update)
  * [Automatic Update](#automatic-update)



## Manual Update
To activate this feature, you have to invoke the "Check for Updates" or "Install New Software..." menu commands in the "Help" menu.

The first one will only check if the existing plugins have any updates available, while the second will, in addition, scan the update site to detect any new plugins that might be added to the current installation.

![Menu to install new extensions to GAMA.](../resources/images/installationAndLaunching/up1.menu_install.png)

In general, it is preferable to use the second command, as more options (including that of _desinstalling_ some plugins) are provided. Once invoked, it makes the following dialog appear:

![Window where the user enters the address of an update site and can choose plugins to install.](../resources/images/installationAndLaunching/up2.dialog_install.png)

GAMA expects the user to enter a so-called _update site_. You can copy and paste the following line (or choose it from the drop-down menu as this address is built inside GAMA):
```
http://updates.gama-platform.org
```

GAMA will then scan the entire update site, looking both for new plugins of the GAMA kernel and updates to existing plugins. The list available in your installation will, of course, be different from the one displayed here.  

**In order to make the plugins appear, you need to uncheck the option "Group items by category".** Choose the ones you want to update (or install) and click "Next >".

![Display of the list of plugins that can be updated.](../resources/images/installationAndLaunching/up3.dialog_install_2.png)

A summary page will appear, indicating which plugins will actually be installed (since some plugins might require additional plugins to run properly). Click on the "Next >" button.

![Summary of the plugins that will be updated and installed.](../resources/images/installationAndLaunching/up3.dialog_install_3.png)

A license page will then appear: you have to accept all of them. Click on "Finish".

![Licences of the plugins that will be updated and installed.](../resources/images/installationAndLaunching/up4.dialog_install_4_licence.png)


GAMA will then proceed to the installation (that can be canceled at any time) of the chosen plugins.


During the course of the installation, you might receive the following warning, that you can dismiss by clicking "OK". You can click on the "Details" button to see which plugins contain unsigned contents.

![Warning window that can be dismissed.](../resources/images/installationAndLaunching/up5.warning_install.png)

Once the plugins are installed, GAMA will ask you whether you want to restart or not. It is always safer to do so, so select "Restart now" and let it close by itself, register the new plugins and restart.

![After installation, GAMA has to be restarted.](../resources/images/installationAndLaunching/up6.install_restart.png)



## Automatic Update
GAMA offers a mechanism to monitor the availability of updates to the plugins already installed. To activate this feature, [open the preferences of GAMA](Preferences) and choose the button "Advanced...", which gives access to additional preferences.

![Button to give access to additional preferences.](../resources/images/installationAndLaunching/up7.open_advanced.png)

In the dialog that appears, navigate to "Install/Update > Automatic Updates". Then, enable the option using the check-box in the top of the dialog and choose the best settings for your workflow. Clicking on "Apply and close" will save these preferences and dismiss the dialog.

![Check for automatic update.](../resources/images/installationAndLaunching/up8.prefs_update.png)


From now on, GAMA will continuously support you in having an up-to-date version of the platform, provided you accept the updates.
