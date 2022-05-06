module.exports={
  "title": "GAMA-Platform",
  "tagline": "GAMA",
  "url": "https://gama-platform.org",
  "baseUrl": "/",
  "organizationName": "gama-platform",
  "projectName": "gama-platform.github.io",
  "scripts": [
    {
      "src": "https://cdnjs.cloudflare.com/ajax/libs/fuse.js/3.4.4/fuse.min.js",
      "async": false
    },
    {
      "src": "https://buttons.github.io/buttons.js",
      "async": false
    },
    {
      "src": "https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.0/clipboard.min.js",
      "async": false
    },
    {
      "src": "/js/code-block-buttons.js",
      "async": false
    },
    {
      "src": "/js/searchEngine.js",
      "async": false
    },
    {
      "src": "/js/dark.js",
      "async": false
    }
  ],
  "stylesheets": [
    "/css/code-block-buttons.css",
    "https://use.fontawesome.com/releases/v5.8.2/css/all.css"
  ],
  "favicon": "img/gama-logo.png",
  "customFields": {
    "docsUrl": "wiki",
    "zipName": "GAMA_1.8.2",
    "downloadVersion": "1.8.2",
    "facebookAppId": 524881055001796,
    "frontPagePresentation": "GAMA is a modeling and simulation development environment for building spatially explicit agent-based simulations.",
    "frontPageImg": "img/GAMA_1.8_IS_OUT.mov.gif",
    "frontPageImgLink": "release"
  },
  "onBrokenLinks": "log",
  "onBrokenMarkdownLinks": "log",
  "presets": [
    [
      "@docusaurus/preset-classic",
      {
        "docs": {
          "showLastUpdateAuthor": true,
          "showLastUpdateTime": true,
          "path": "../docs",
          "sidebarPath": "../website/sidebars.json"
        },
        "blog": {
          "path": "blog"
        },
        "theme": {
          "customCss": "../src/css/customTheme.css"
        }
      }
    ]
  ],
  "plugins": [],
  "themeConfig": {
    "navbar": {
      "title": "GAMA-Platform",
      "logo": {
        "src": "img/gama-logo.png"
      },
      "items": [
        {
          "to": "docs/Home",
          "label": "Documentation",
          "position": "left"
        },
        {
          "to": "docs/Tutorials",
          "label": "Tutorials",
          "position": "left"
        },
        {
          "to": "/download",
          "label": "Download",
          "position": "left"
        },
        {
          "to": "docs/Contribute",
          "label": "Contribute",
          "position": "left"
        },
        {
          "to": "/faq",
          "label": "FAQ",
          "position": "left"
        },
        {
          "label": "Version",
          "to": "docs",
          "position": "right",
          "items": [
            {
              "label": "1.8.1",
              "to": "docs/",
              "activeBaseRegex": "docs/(?!1.8.1|next)"
            },
            {
              "label": "Main/Unreleased",
              "to": "docs/next/",
              "activeBaseRegex": "docs/next/(?!support|team|resources)"
            }
          ]
        }
      ]
    },
    "image": "/resources/images/general/GamaPlatform.png",
    "footer": {
      "links": [],
      "copyright": "2022 GAMA-Platform",
      "logo": {
        "src": "img/gama-logo.png"
      }
    },
    "algolia": {
      "appId": 'YOUR_APP_ID',
      apiKey: 'YOUR_SEARCH_API_KEY',
      indexName: 'YOUR_INDEX_NAME',
      "placeholder": "Search"
    }
  }
}