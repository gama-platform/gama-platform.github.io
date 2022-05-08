module.exports={
  // Main website options
  "title": "GAMA-Platform",
  "tagline": "GAMA",
  "url": "https://gama-platform.org",
  "baseUrl": "/",
  "favicon": "img/gama-logo.png",
  titleDelimiter: '|',

  // Compilation/deploy options
  "organizationName": "gama-platform",
  "projectName": "gama-platform.github.io",
  "onBrokenLinks": "log",
  "onBrokenMarkdownLinks": "log",
  "deploymentBranch": "master",

  // Adding in header
  "scripts": [
    /*{
      "src": "https://buttons.github.io/buttons.js",
      "async": false
    },
    {
      "src": "https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.0/clipboard.min.js",
      "async": false
    }*/
  ],
  "stylesheets": [
    "/css/code-block-buttons.css",
    "https://use.fontawesome.com/releases/v5.8.2/css/all.css"
  ],

  // Custom variables in page
  "customFields": {
    footerIcon: 'img/gama-logo.png',
    "docsUrl": "wiki",
    "zipName": "GAMA_1.8.2",
    "downloadVersion": "1.8.2",
    "facebookAppId": 524881055001796,
    "frontPagePresentation": "GAMA is a modeling and simulation development environment for building spatially explicit agent-based simulations.",
    "frontPageImgLink": "release"
  },

  /*
   *  DOCUSAURUS CONFIGURATION
   */
  "presets": [
    [
      "@docusaurus/preset-classic",
      {
        "docs": {
          "showLastUpdateAuthor": false,
          "showLastUpdateTime": false,
          "path": "../docs",
          routeBasePath: 'wiki',
          "sidebarPath": "../website/sidebars.json",
          editUrl: ({docPath}) => `https://github.com/gama-platform/gama/wiki/${docPath.slice(0, -3)}/_edit`,
          editCurrentVersion: true,

          // Version dropdown options
          /*lastVersion: '1.8.1',
          versions: {
            "1.8.1": {
              label: '1.8.1',
              path: '',
            },
            "1.8.2": {
              label: '1.8.2',
              path: 'next',
            },
          },*/
        },
        "blog": {
          "path": "blog"
        },
        "theme": {
          "customCss": "/src/css/customTheme.css"
        }
      }
    ]
  ],
  "themeConfig": {
    "navbar": {
      "title": "GAMA-Platform",
      "logo": {
        "src": "img/gama-logo.png"
      },
      // Navigator bar
      "items": [
        // Left side
        {
          type: 'doc',
          "docId": "Home",
          "label": "Documentation",
          "position": "left"
        },
        {
          type: 'doc',
          "docId": "Tutorials",
          "label": "Tutorials",
          "position": "left"
        },
        {
          "to": "/download",
          "label": "Download",
          "position": "left"
        },
        {
          type: 'doc',
          "docId": "Contribute",
          "label": "Contribute",
          "position": "left"
        },
        {
          "to": "/blog",
          "label": "Blog",
          "position": "left"
        },
        {
          "to": "/faq",
          "label": "FAQ",
          "position": "left"
        },

        // Right Side
        {
          type: 'docsVersionDropdown',
          position: 'right',
          //dropdownItemsAfter: [{to: '/versions', label: 'All versions'}],
          dropdownActiveClassDisabled: false,
        },
        {
          href: 'https://github.com/gama-platform/gama',
          label: 'GitHub',
          position: 'right',
        }
      ]
    },
    "image": "/resources/images/general/GamaPlatform.png",
    "footer": {
      links: [
        {
          title: 'Community',
          items: [
            {
              label: 'Github',
              href: 'https://github.com/gama-platform',
            },
            {
              label: 'Facebook',
              href: 'https://www.facebook.com/GamaPlatform/',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/gamaplatform',
            },
            {
              label: 'LinkedIn',
              href: 'https://www.linkedin.com/company/gama-platform',
            },
            {
              label: 'Youtube',
              href: 'https://www.youtube.com/channel/UCWJ1kWGDDI-9u2f2uD0gcaQ',
            },
            {
              label: 'Blog RSS',
              href: 'https://gama-platform.org/blog/feed',
            }
          ],
        },
        {
          title: 'Mailing list',
          items: [
            {
              label: "For Users: gama-platform@googlegroups.com",
              to: 'https://groups.google.com/forum/#!forum/gama-platform',
            },
            {
              label: 'For Developers: gama-dev@googlegroups.com',
              to: 'https://groups.google.com/forum/#!forum/gama-dev',
            },
          ],
        },
        {
          title: 'Licence',
          items: [
            {
              html: `
                  <p>
                    Permission is granted to copy, distribute and/or modify this document under the terms of the GNU Free Documentation License, Version 1.3 or any later version published by the Free Software Foundation; with no Invariant Sections, no Front-Cover Texts, and no Back-Cover Texts.
                  </p>
                `,
            },
            {
              html: `
                  <p>A copy of the license is included <a href="https://github.com/gama-platform/gama/wiki/LICENSE.md" style="display:initial">here</a>, in the repository of the wiki content.</p>
                `,
            }
          ],
        }
      ],
      "copyright": "Copyright (C) - 2022 GAMA-Platform.",
      "logo": {
        "src": "img/gama-logo.png"
      }
    }
  },

  /*
   *  PLUGINS
   */
  "plugins": [
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      {
        // `hashed` is recommended as long-term-cache of index file is possible.
        hashed: true,
        indexBlog: false,
        docsRouteBasePath: "/wiki",
        highlightSearchTermsOnTargetPage: true,
        docsDir: "../docs"
      },
    ],
    require.resolve('@saucelabs/theme-github-codeblock'),
  ],
}