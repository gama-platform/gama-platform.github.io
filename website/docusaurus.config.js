const LATEST_VERSION = "2025-06";
const DOWNLOAD_VERSION = "2025.06.4"

module.exports = {
  // Main website options
  title: "GAMA Platform",
  tagline: "GAMA",
  url: "https://gama-platform.org",
  baseUrl: "/",
  favicon: "img/gama-logo.png",
  titleDelimiter: "|",

  // Compilation/deploy options
  organizationName: "gama-platform",
  projectName: "gama-platform.github.io",
  onBrokenLinks: "log",
  onBrokenMarkdownLinks: "log",
  deploymentBranch: "master",
  // Needed to have an algolia crawler compatible website
  trailingSlash: false,

  // Adding in header
  stylesheets: ["https://use.fontawesome.com/releases/v6.1.1/css/all.css"],

  // Custom variables in page
  customFields: {
    footerIcon: "img/gama-logo.png",
    docsUrl: "wiki",
    zipName: "GAMA_" + DOWNLOAD_VERSION,
    downloadVersion: DOWNLOAD_VERSION,
    facebookAppId: 524881055001796,
    frontPagePresentation:
      "GAMA is a modeling and simulation development environment for building spatially explicit agent-based simulations.",
    frontPageImgLink: "release",
    latestVersion: LATEST_VERSION,
  },

  /*
   *  DOCUSAURUS CONFIGURATION
   */
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          showLastUpdateAuthor: false,
          showLastUpdateTime: false,
          path: "../docs",
          routeBasePath: "wiki",
          sidebarPath: "../website/sidebars.json",
          editUrl: ({ docPath }) =>
            `https://github.com/gama-platform/gama/wiki/${docPath.slice(0, -3)}/_edit`,
          editCurrentVersion: true,

          // Version dropdown options
          lastVersion: LATEST_VERSION,
          /*versions: {
            "1.81: {
              label: '1.8.1',
              path: '',
            },
            "1.82: {
              label: '1.8.2',
              path: 'next',
            },
          },*/
          versions: {
            current: {
              label: "🚧 Alpha 🚧",
            },
          },
        },
        theme: {
          customCss: "./src/css/customTheme.css",
        },
      },
    ],
  ],
  themeConfig: {
    announcementBar: {
      // Change the ID for new announcement
      id: "releaseGama202506",
      content:
        '🎉 <strong>GAMA Platform 2025-06 is out!!</strong> 🎉 <a href="/download"><u>Download it now</u></a> and check <a href="/wiki/Changelog"><u>the changelog</u></a>!! 🎉',
      backgroundColor: "#34709f",
      textColor: "#e3e3e3",
      isCloseable: true,
    },
    colorMode: {
      respectPrefersColorScheme: true,
    },
    prism: {
      additionalLanguages: ["java", "javascript", "python"],
      defaultLanguage: "gaml",

      theme: require("prism-gaml/themes/light"),
      darkTheme: require("prism-gaml/themes/dark"),
    },
    algolia: {
      appId: "MWUOLTL2EG",
      apiKey: "1521937a1a954de39ac48917e384bfd6",
      indexName: "gama-platform",
      contextualSearch: true,
    },
    /*codeblock: {
      showGithubLink: true,
      githubLinkLabel: 'View on GitHub',
      showRunmeLink: false,
      runmeLinkLabel: 'Checkout via Runme'
    },*/
    goatcounter: {
      code: "gama-platform",
    },
    docs: {
      sidebar: {
        autoCollapseCategories: true,
      },
    },
    navbar: {
      title: "GAMA Platform",
      logo: {
        src: "img/gama-logo.png",
      },
      // Navigator bar
      items: [
        // Left side
        {
          type: "doc",
          docId: "Home",
          label: "Documentation",
          position: "left",
        },
        {
          type: "doc",
          docId: "Tutorials",
          label: "Tutorials",
          position: "left",
        },
        {
          type: "doc",
          docId: "Community",
          label: "Community",
          position: "left",
        },
        {
          to: "/download",
          label: "Download",
          position: "left",
        },

        // Right Side
        /* Waiting for https://github.com/gama-platform/gama-platform.github.io/issues/160
        {
          type: 'docsVersionDropdown',
          position: 'right',
          //dropdownItemsAfter: [{to: '/versions', label: 'All versions'}],
          dropdownActiveClassDisabled: false,
        },*/
        {
          href: "https://github.com/gama-platform/gama",
          html: '<i class="fab fa-github" style="font-size: 24px;"></i>',
          //label: 'GitHub repository',
          position: "right",
        },
      ],
    },
    image: "/resources/images/general/GamaPlatform.png",
    footer: {
      links: [
        {
          title: "Community",
          items: [
            {
              html: '<a class="footer__link-item" href="https://github.com/gama-platform" target="_blank" rel="noopener noreferrer"><i class="fab fa-github"></i> Github <i class="fa fa-arrow-up-right-from-square"></i></a>',
            },
            {
              html: '<a class="footer__link-item" href="https://www.facebook.com/GamaPlatform/" target="_blank" rel="noopener noreferrer"><i class="fab fa-facebook"></i> Facebook <i class="fa fa-arrow-up-right-from-square"></i></a>',
            },
            /*{
              html: '<a class="footer__link-item" href="https://twitter.com/gamaplatform" target="_blank" rel="noopener noreferrer"><i class="fab fa-twitter"></i> Twitter <i class="fa fa-arrow-up-right-from-square"></i></a>'
            },*/
            {
              html: '<a class="footer__link-item" href="https://www.linkedin.com/company/gama-platform" target="_blank" rel="noopener noreferrer"><i class="fab fa-linkedin"></i> LinkedIn <i class="fa fa-arrow-up-right-from-square"></i></a>',
            },
            {
              html: '<a class="footer__link-item" href="https://www.youtube.com/channel/UCWJ1kWGDDI-9u2f2uD0gcaQ" target="_blank" rel="noopener noreferrer"><i class="fab fa-youtube"></i> Youtube <i class="fa fa-arrow-up-right-from-square"></i></a>',
            },
          ],
        },
        {
          title: "Mailing list",
          items: [
            {
              html: '<a class="footer__link-item" href="https://groups.google.com/forum/#!forum/gama-platform" target="_blank"><i class="fas fa-envelope"></i> For Users<br>gama-platform@googlegroups.com</a>',
            },
            {
              html: '<a class="footer__link-item" href="https://groups.google.com/forum/#!forum/gama-dev" target="_blank"><i class="fas fa-envelope"></i> For Developers<br>gama-dev@googlegroups.com</a>',
            },
          ],
        },
        {
          title: "Licence",
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
            },
          ],
        },
      ],
      copyright: `Copyright (C) - ${new Date().getFullYear()} GAMA Platform.`,
      logo: {
        src: "img/gama-logo.png",
      },
    },
  },
  //themes: ['docusaurus-theme-github-codeblock'],
  themes: ["@saucelabs/theme-github-codeblock"],
  /*
   *  PLUGINS
   */
  plugins: [
    "docusaurus-plugin-goatcounter", 
    [
      "@docusaurus/plugin-client-redirects",
      {
        redirects: [
          // Default wiki page
          { from: "/wiki/next", to: "/wiki/next/Home" },
          { from: "/wiki", to: "/wiki/Home" },
          { from: "/wiki/1.8.1", to: "/wiki/1.8.1/Home" },
          // Debug
          // {
          //   from: "/wiki/next/Operators",
          //   to: "/wiki/next/Exhaustive-list-of-GAMA-Keywords",
          // },
          // { from: "/wiki/next/Headless", to: "/wiki/next/RunningHeadless" },
          // External
          //{ from: '/Gama-Days-2022', to: '/gama.resources/conferences/Gama-Days-2022', },
        ],
      },
    ],
  ],
};
