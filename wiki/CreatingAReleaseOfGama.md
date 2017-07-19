---
layout: default
title: Product a release of GAMA
wikiPageName: CreatingAReleaseOfGama
wikiPagePath: wiki/CreatingAReleaseOfGama.md
---
# Product a release of GAMA
## From the product
Locate the file named `gama.product` (in plugin `ummisco.gama.product`) and open it.
On the first page, select the link `Eclipse Product export wizard` and follow the instructions in it. You can specify a root directory (under which the plugins will be copied) and an export directory on your hard drive where to export the whole application. Then click `Finish` and wait for a few minutes while Eclipse exports and packages your application. Once it is done, you can safely delete the `Repository` folder and the `logs.zip` file.
## Specific to MacOS X
Use `Gama.app` as the name of the root directory. Failing to do so will leave you with a non-working application. 

[[/resources/images/Export_Mac.png]]

This should result in a self-contained `Gama.app` application. However, the enclosed `Info.plist` lacks several key definitions. Open it (in a text editor) and paste the following items under the first <dict> (replace existing double entries if necessary):
```
	<key>NSHighResolutionCapable</key>
	<string>True</string>
	<key>CFBundleExecutable</key>
	<string>Gama</string>
	<key>CFBundleGetInfoString</key>
	<string>Gama 1.7.0b, Copyright UMMISCO IRD/UPMC and partners 2006-2016 http://gama-platform.org</string>
	<key>CFBundleShortVersionString</key>
	<string>1.7.0b</string>
	<key>CFBundleSignature</key>
	<string>GAMA</string>
	<key>CFBundleVersion</key>
	<string>1.7.0b</string>

```

If you also want the `.gaml` documents to be decorated with an icon and recognized when double-clicking on them, you can add:
```
	<key>CFBundleDocumentTypes</key>
	<array>
		<dict>
			<key>CFBundleTypeExtensions</key>
			<array>
				<string>gaml</string>
			</array>
			<key>CFBundleTypeIconFile</key>
			<string>Model.icns</string>
			<key>CFBundleTypeName</key>
			<string>Gama Model</string>
			<key>CFBundleTypeRole</key>
			<string>Editor</string>
			<key>CFBundleTypeOSTypes</key>
			<array>
				<string>TEXT</string>
			</array>
		</dict>
	</array>
```

You can additionally create an icon (`Model.icns`) for these files, which needs to reside in `Gama.app/Contents/Resources` next to `icon.icns`. An example of icon is available in the plugin `msi.gama.application/macosx`. 

## On Windows OS
No specific step to do. After select the link `Eclipse Product export wizard`, choose the directory for the export by click on Browse button, in Destination section. Then, click on Finish.

## Configure your IDE in order to allow multi-platform builds

* Open Eclipse Preferences
* Navigate to Plugin Development Environment/Target Platform
* Select your (active) target platform
* Click Edit
* Click Add
* Select "Software Site"
* Click Next
* In "Work With" type: http://download.eclipse.org/eclipse/updates/4.5 (replace 4.5 with your current version)
* Check "Eclipse RCP Target Components"
* Check "Equinox Target Components"
* **Uncheck** "Include required software" (**IMPORTANT**)
* **Check** "Include all environments" (**IMPORTANT**)
* Press Finish
* Wait for the plugins to be downloaded and provisioned
* Press Finish
* Press OK

Open your product file and select the "Export" option. You will see that the "Export for multiple platforms" checkbox is available. The next page allows you to choose for which platform you'd like to export GAMA.
