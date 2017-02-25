---
layout: default
title: OpenGL Display
wikiPageName: Event__CP12OpenGL
wikiPagePath: wiki/Event__CP12OpenGL.md
---

# OpenGL Display

Integrate OpenGL (jogl) view in Gama.

Have a display using OpenGL (Jogl: http://jogamp.org/jogl/www/) libraries implement as a gama plug-ins.

plugin name: ` msi.gama.jogl`

`msi.gama.jogl` will depend on `msi.gama.application` and `msi.gama.core`

Current work:
  * A new output symbol has been defined in order to call a new display in gaml

# Definition of the symbol in `msi.gama.core/src/msi/gama/opengl/GLOutput.java`
```
@symbol(name = IKeyword.DISPLAY_GL, kind = ISymbolKind.OUTPUT)
@facets(value = {
	//@facet(name = IKeyword.DISPLAY_GRAPH, type = IType.STRING_STR, optional = false),
	@facet(name = IKeyword.NAME, type = IType.STRING_STR, optional = true)
	}, omissible = IKeyword.NAME)
@with_sequence
@inside(symbols = IKeyword.OUTPUT)
```


# Use of the symbol in `msi.gama.models/models/graph/model/testSIG.gaml` :
```
output {
	graphdisplaygl {		
	}
```
  * A new view in msi.gama.jogl plugin.xml

```
    <extension
          point="org.eclipse.ui.views">
           <view allowMultiple="true"
            category="msi.gama.gui.category.gama"
            class="msi.gama.jogl.GLView"
            icon="icons/view_console.png"
            id="msi.gama.jogl.GLView"
            name="GL"
            restorable="true">
          </view>
    </extension>
```

This view is implemented in `/Users/macbookpro/Projects/GamaDev/msi.gama.jogl/src/msi/gama/jogl/GLView.java`

The view ID must also be defined `src/msi/gama/common/util/GuiUtils.java`
```
public static final String GL_VIEW_ID = "msi.gama.jogl.GLView";
```


<a href='http://gama-platform.googlecode.com/files/gama-opengl.png' title='CodingCampNight'><img src='http://gama-platform.googlecode.com/files/gama-opengl.png' alt='CodingCampNight' /></a>
