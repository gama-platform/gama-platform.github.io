module.exports={
  // Main website options
  "title": "GAMA Platform",
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
    {
      "src": "/js/blogFacebook-iFrame.js",
      "async": false
    },
  ],
  "stylesheets": [
    "https://use.fontawesome.com/releases/v6.1.1/css/all.css",
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
    "docs": {
      "sidebar": {
        "autoCollapseCategories": true,
      },
    },
    "navbar": {
      "title": "GAMA Platform",
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
          html: '<i class="fab fa-github" style="font-size: 24px;"></i>',
          //label: 'GitHub repository',
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
              html: '<a class="footer__link-item" href="https://github.com/gama-platform" target="_blank" rel="noopener noreferrer"><i class="fab fa-github"></i> Github <svg width="13.5" height="13.5" aria-hidden="true" viewBox="0 0 24 24" class="iconExternalLink_node_modules-@docusaurus-theme-classic-lib-next-theme-IconExternalLink-styles-module"><path fill="currentColor" d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"></path></svg></a>'
            },
            {
              html: '<a class="footer__link-item" href="https://www.facebook.com/GamaPlatform/" target="_blank" rel="noopener noreferrer"><i class="fab fa-facebook"></i> Facebook <svg width="13.5" height="13.5" aria-hidden="true" viewBox="0 0 24 24" class="iconExternalLink_node_modules-@docusaurus-theme-classic-lib-next-theme-IconExternalLink-styles-module"><path fill="currentColor" d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"></path></svg></a>'
            },
            /*{
              html: '<a class="footer__link-item" href="https://twitter.com/gamaplatform" target="_blank" rel="noopener noreferrer"><i class="fab fa-twitter"></i> Twitter <svg width="13.5" height="13.5" aria-hidden="true" viewBox="0 0 24 24" class="iconExternalLink_node_modules-@docusaurus-theme-classic-lib-next-theme-IconExternalLink-styles-module"><path fill="currentColor" d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"></path></svg></a>'
            },*/
            {
              html: '<a class="footer__link-item" href="https://www.linkedin.com/company/gama-platform" target="_blank" rel="noopener noreferrer"><i class="fab fa-linkedin"></i> LinkedIn <svg width="13.5" height="13.5" aria-hidden="true" viewBox="0 0 24 24" class="iconExternalLink_node_modules-@docusaurus-theme-classic-lib-next-theme-IconExternalLink-styles-module"><path fill="currentColor" d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"></path></svg></a>'
            },
            {
              html: '<a class="footer__link-item" href="https://www.youtube.com/channel/UCWJ1kWGDDI-9u2f2uD0gcaQ" target="_blank" rel="noopener noreferrer"><i class="fab fa-youtube"></i> Youtube <svg width="13.5" height="13.5" aria-hidden="true" viewBox="0 0 24 24" class="iconExternalLink_node_modules-@docusaurus-theme-classic-lib-next-theme-IconExternalLink-styles-module"><path fill="currentColor" d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"></path></svg></a>'
            },
            {
              html: '<a class="footer__link-item" href="https://gama-platform.org/blog/feed" target="_blank" rel="noopener noreferrer"><i class="fa fa-rss"></i> Blog RSS <svg width="13.5" height="13.5" aria-hidden="true" viewBox="0 0 24 24" class="iconExternalLink_node_modules-@docusaurus-theme-classic-lib-next-theme-IconExternalLink-styles-module"><path fill="currentColor" d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"></path></svg></a>'
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
      "copyright": "Copyright (C) - 2022 GAMA Platform.",
      "logo": {
        "src": "img/gama-logo.png"
      }
    }
  },

  /*
   *  PLUGINS
   */
  "plugins": [
    require.resolve('@saucelabs/theme-github-codeblock'),
    [
      require.resolve('docusaurus-lunr-search'), 
      {
        excludeRoutes: [
          'wiki/next/*', // exclude changelogs from indexing
          'blog/*'
        ]
      }
    ]
  ],
}