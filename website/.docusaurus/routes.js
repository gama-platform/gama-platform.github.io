import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/__docusaurus/debug',
    component: ComponentCreator('/__docusaurus/debug', 'daa'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/config',
    component: ComponentCreator('/__docusaurus/debug/config', 'c79'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/content',
    component: ComponentCreator('/__docusaurus/debug/content', '0f3'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/globalData',
    component: ComponentCreator('/__docusaurus/debug/globalData', '274'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/metadata',
    component: ComponentCreator('/__docusaurus/debug/metadata', 'ac6'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/registry',
    component: ComponentCreator('/__docusaurus/debug/registry', '858'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/routes',
    component: ComponentCreator('/__docusaurus/debug/routes', '0ba'),
    exact: true
  },
  {
    path: '/blog',
    component: ComponentCreator('/blog', 'f59'),
    exact: true
  },
  {
    path: '/blog/2019/10/30/gama-blog',
    component: ComponentCreator('/blog/2019/10/30/gama-blog', 'eca'),
    exact: true
  },
  {
    path: '/blog/2019/11/15/gama-days-2020',
    component: ComponentCreator('/blog/2019/11/15/gama-days-2020', 'b0c'),
    exact: true
  },
  {
    path: '/blog/2020/02/20/gama-docker',
    component: ComponentCreator('/blog/2020/02/20/gama-docker', 'b50'),
    exact: true
  },
  {
    path: '/blog/2020/06/22/release181',
    component: ComponentCreator('/blog/2020/06/22/release181', '5c9'),
    exact: true
  },
  {
    path: '/blog/2020/07/01/comokit101',
    component: ComponentCreator('/blog/2020/07/01/comokit101', 'f8e'),
    exact: true
  },
  {
    path: '/blog/2021/03/26/gama-days-2021',
    component: ComponentCreator('/blog/2021/03/26/gama-days-2021', 'afc'),
    exact: true
  },
  {
    path: '/blog/archive',
    component: ComponentCreator('/blog/archive', '203'),
    exact: true
  },
  {
    path: '/blog/tags',
    component: ComponentCreator('/blog/tags', '72e'),
    exact: true
  },
  {
    path: '/blog/tags/comokit',
    component: ComponentCreator('/blog/tags/comokit', '9d2'),
    exact: true
  },
  {
    path: '/blog/tags/covid-19',
    component: ComponentCreator('/blog/tags/covid-19', '63f'),
    exact: true
  },
  {
    path: '/blog/tags/docker',
    component: ComponentCreator('/blog/tags/docker', '907'),
    exact: true
  },
  {
    path: '/blog/tags/even',
    component: ComponentCreator('/blog/tags/even', '14d'),
    exact: true
  },
  {
    path: '/blog/tags/france',
    component: ComponentCreator('/blog/tags/france', '009'),
    exact: true
  },
  {
    path: '/blog/tags/gama-days',
    component: ComponentCreator('/blog/tags/gama-days', '069'),
    exact: true
  },
  {
    path: '/blog/tags/headless',
    component: ComponentCreator('/blog/tags/headless', 'e3a'),
    exact: true
  },
  {
    path: '/blog/tags/learning',
    component: ComponentCreator('/blog/tags/learning', 'd06'),
    exact: true
  },
  {
    path: '/blog/tags/release',
    component: ComponentCreator('/blog/tags/release', 'c0d'),
    exact: true
  },
  {
    path: '/blog/tags/template',
    component: ComponentCreator('/blog/tags/template', 'af5'),
    exact: true
  },
  {
    path: '/blog/tags/toulouse',
    component: ComponentCreator('/blog/tags/toulouse', 'd57'),
    exact: true
  },
  {
    path: '/search',
    component: ComponentCreator('/search', 'e9f'),
    exact: true
  },
  {
    path: '/docs',
    component: ComponentCreator('/docs', '695'),
    routes: [
      {
        path: '/docs/',
        component: ComponentCreator('/docs/', '56d'),
        exact: true,
        sidebar: "side"
      },
      {
        path: '/docs/AgentBuiltIn',
        component: ComponentCreator('/docs/AgentBuiltIn', 'fcb'),
        exact: true,
        sidebar: "side"
      },
      {
        path: '/docs/AttachingSkills',
        component: ComponentCreator('/docs/AttachingSkills', '2be'),
        exact: true
      },
      {
        path: '/docs/BasicProgrammingConceptsInGAML',
        component: ComponentCreator('/docs/BasicProgrammingConceptsInGAML', '4f0'),
        exact: true
      },
      {
        path: '/docs/BatchExperiments',
        component: ComponentCreator('/docs/BatchExperiments', 'b55'),
        exact: true
      },
      {
        path: '/docs/BatchSpecific',
        component: ComponentCreator('/docs/BatchSpecific', '75e'),
        exact: true
      },
      {
        path: '/docs/BDIAgents',
        component: ComponentCreator('/docs/BDIAgents', '7a8'),
        exact: true,
        sidebar: "tuto"
      },
      {
        path: '/docs/BDIAgents_step1',
        component: ComponentCreator('/docs/BDIAgents_step1', '6ef'),
        exact: true
      },
      {
        path: '/docs/BDIAgents_step2',
        component: ComponentCreator('/docs/BDIAgents_step2', '533'),
        exact: true
      },
      {
        path: '/docs/BDIAgents_step3',
        component: ComponentCreator('/docs/BDIAgents_step3', 'fa6'),
        exact: true
      },
      {
        path: '/docs/BDIAgents_step4',
        component: ComponentCreator('/docs/BDIAgents_step4', '2fb'),
        exact: true
      },
      {
        path: '/docs/BDIAgents_step5',
        component: ComponentCreator('/docs/BDIAgents_step5', '936'),
        exact: true
      },
      {
        path: '/docs/BuiltInArchitectures',
        component: ComponentCreator('/docs/BuiltInArchitectures', '094'),
        exact: true,
        sidebar: "side"
      },
      {
        path: '/docs/BuiltInSkills',
        component: ComponentCreator('/docs/BuiltInSkills', 'c82'),
        exact: true,
        sidebar: "side"
      },
      {
        path: '/docs/BuiltInSpecies',
        component: ComponentCreator('/docs/BuiltInSpecies', '752'),
        exact: true,
        sidebar: "side"
      },
      {
        path: '/docs/CallingR',
        component: ComponentCreator('/docs/CallingR', 'd78'),
        exact: true,
        sidebar: "side"
      },
      {
        path: '/docs/ChangingWorkspace',
        component: ComponentCreator('/docs/ChangingWorkspace', '23f'),
        exact: true
      },
      {
        path: '/docs/Comodel',
        component: ComponentCreator('/docs/Comodel', '4e8'),
        exact: true,
        sidebar: "side"
      },
      {
        path: '/docs/CoModelingTutorial',
        component: ComponentCreator('/docs/CoModelingTutorial', '98a'),
        exact: true,
        sidebar: "tuto"
      },
      {
        path: '/docs/Contribute',
        component: ComponentCreator('/docs/Contribute', 'a15'),
        exact: true
      },
      {
        path: '/docs/ControlArchitecture',
        component: ComponentCreator('/docs/ControlArchitecture', 'ee7'),
        exact: true,
        sidebar: "side"
      },
      {
        path: '/docs/CreatingAReleaseOfGama',
        component: ComponentCreator('/docs/CreatingAReleaseOfGama', '108'),
        exact: true,
        sidebar: "side"
      },
      {
        path: '/docs/DataTypes',
        component: ComponentCreator('/docs/DataTypes', '819'),
        exact: true,
        sidebar: "side"
      },
      {
        path: '/docs/Defining3DDisplays',
        component: ComponentCreator('/docs/Defining3DDisplays', 'afe'),
        exact: true
      },
      {
        path: '/docs/DefiningActionsAndBehaviors',
        component: ComponentCreator('/docs/DefiningActionsAndBehaviors', '177'),
        exact: true
      },
      {
        path: '/docs/DefiningAdvancedSpecies',
        component: ComponentCreator('/docs/DefiningAdvancedSpecies', '3b3'),
        exact: true,
        sidebar: "side"
      },
      {
        path: '/docs/DefiningCharts',
        component: ComponentCreator('/docs/DefiningCharts', '196'),
        exact: true
      },
      {
        path: '/docs/DefiningDisplaysGeneralities',
        component: ComponentCreator('/docs/DefiningDisplaysGeneralities', 'ee1'),
        exact: true
      },
      {
        path: '/docs/DefiningExportFiles',
        component: ComponentCreator('/docs/DefiningExportFiles', 'dd8'),
        exact: true
      },
      {
        path: '/docs/DefiningGUIExperiment',
        component: ComponentCreator('/docs/DefiningGUIExperiment', '23a'),
        exact: true,
        sidebar: "side"
      },
      {
        path: '/docs/DefiningMonitorsAndInspectors',
        component: ComponentCreator('/docs/DefiningMonitorsAndInspectors', 'a58'),
        exact: true
      },
      {
        path: '/docs/DefiningParameters',
        component: ComponentCreator('/docs/DefiningParameters', '2b9'),
        exact: true,
        sidebar: "side"
      },
      {
        path: '/docs/DefiningUserInteraction',
        component: ComponentCreator('/docs/DefiningUserInteraction', '43c'),
        exact: true
      },
      {
        path: '/docs/DevelopingControlArchitectures',
        component: ComponentCreator('/docs/DevelopingControlArchitectures', '289'),
        exact: true,
        sidebar: "side"
      },
      {
        path: '/docs/DevelopingExtensions',
        component: ComponentCreator('/docs/DevelopingExtensions', '51e'),
        exact: true,
        sidebar: "side"
      },
      {
        path: '/docs/developingGAMA',
        component: ComponentCreator('/docs/developingGAMA', '3e1'),
        exact: true,
        sidebar: "side"
      },
      {
        path: '/docs/DevelopingIndexAnnotations',
        component: ComponentCreator('/docs/DevelopingIndexAnnotations', 'db3'),
        exact: true,
        sidebar: "side"
      },
      {
        path: '/docs/DevelopingIScope',
        component: ComponentCreator('/docs/DevelopingIScope', 'd68'),
        exact: true,
        sidebar: "side"
      },
      {
        path: '/docs/DevelopingOperators',
        component: ComponentCreator('/docs/DevelopingOperators', 'fb3'),
        exact: true,
        sidebar: "side"
      },
      {
        path: '/docs/DevelopingPlugins',
        component: ComponentCreator('/docs/DevelopingPlugins', '9f0'),
        exact: true,
        sidebar: "side"
      },
      {
        path: '/docs/DevelopingSkills',
        component: ComponentCreator('/docs/DevelopingSkills', 'cf2'),
        exact: true,
        sidebar: "side"
      },
      {
        path: '/docs/DevelopingSpecies',
        component: ComponentCreator('/docs/DevelopingSpecies', '491'),
        exact: true,
        sidebar: "side"
      },
      {
        path: '/docs/DevelopingStatements',
        component: ComponentCreator('/docs/DevelopingStatements', '5a1'),
        exact: true,
        sidebar: "side"
      },
      {
        path: '/docs/DevelopingTypes',
        component: ComponentCreator('/docs/DevelopingTypes', '365'),
        exact: true,
        sidebar: "side"
      },
      {
        path: '/docs/Diffusion',
        component: ComponentCreator('/docs/Diffusion', '215'),
        exact: true,
        sidebar: "side"
      },
      {
        path: '/docs/Displays',
        component: ComponentCreator('/docs/Displays', 'f58'),
        exact: true
      },
      {
        path: '/docs/Documentation',
        component: ComponentCreator('/docs/Documentation', 'd52'),
        exact: true,
        sidebar: "side"
      },
      {
        path: '/docs/Download',
        component: ComponentCreator('/docs/Download', 'fc3'),
        exact: true
      },
      {
        path: '/docs/EditingModels',
        component: ComponentCreator('/docs/EditingModels', 'fd8'),
        exact: true,
        sidebar: "side"
      },
      {
        path: '/docs/Equations',
        component: ComponentCreator('/docs/Equations', '9ff'),
        exact: true
      },
      {
        path: '/docs/ErrorsView',
        component: ComponentCreator('/docs/ErrorsView', '3c2'),
        exact: true
      },
      {
        path: '/docs/Event__CC15_Reorganization',
        component: ComponentCreator('/docs/Event__CC15_Reorganization', '586'),
        exact: true,
        sidebar: "side"
      },
      {
        path: '/docs/Event__CodingCamp2012',
        component: ComponentCreator('/docs/Event__CodingCamp2012', '70d'),
        exact: true
      },
      {
        path: '/docs/Event__CodingCampFall2012',
        component: ComponentCreator('/docs/Event__CodingCampFall2012', 'fc5'),
        exact: true
      },
      {
        path: '/docs/Event__CodingCampFall2012_bug',
        component: ComponentCreator('/docs/Event__CodingCampFall2012_bug', '78b'),
        exact: true
      },
      {
        path: '/docs/Event__CodingCampFall2012_coupling',
        component: ComponentCreator('/docs/Event__CodingCampFall2012_coupling', '525'),
        exact: true
      },
      {
        path: '/docs/Event__CodingCampFall2012_improvements',
        component: ComponentCreator('/docs/Event__CodingCampFall2012_improvements', 'd0d'),
        exact: true
      },
      {
        path: '/docs/Event__CodingCampFall2012_models',
        component: ComponentCreator('/docs/Event__CodingCampFall2012_models', '927'),
        exact: true
      },
      {
        path: '/docs/Event__CP12Archi',
        component: ComponentCreator('/docs/Event__CP12Archi', '16b'),
        exact: true
      },
      {
        path: '/docs/Event__CP12Batch',
        component: ComponentCreator('/docs/Event__CP12Batch', '7f9'),
        exact: true
      },
      {
        path: '/docs/Event__CP12Development',
        component: ComponentCreator('/docs/Event__CP12Development', 'dd8'),
        exact: true
      },
      {
        path: '/docs/Event__CP12Doc',
        component: ComponentCreator('/docs/Event__CP12Doc', 'f8e'),
        exact: true
      },
      {
        path: '/docs/Event__CP12FIPA',
        component: ComponentCreator('/docs/Event__CP12FIPA', '887'),
        exact: true
      },
      {
        path: '/docs/Event__CP12Git',
        component: ComponentCreator('/docs/Event__CP12Git', 'a38'),
        exact: true
      },
      {
        path: '/docs/Event__CP12Graph',
        component: ComponentCreator('/docs/Event__CP12Graph', '976'),
        exact: true
      },
      {
        path: '/docs/Event__CP12Headless',
        component: ComponentCreator('/docs/Event__CP12Headless', '5fb'),
        exact: true
      },
      {
        path: '/docs/Event__CP12IDE',
        component: ComponentCreator('/docs/Event__CP12IDE', '8fe'),
        exact: true
      },
      {
        path: '/docs/Event__CP12Library',
        component: ComponentCreator('/docs/Event__CP12Library', '79a'),
        exact: true
      },
      {
        path: '/docs/Event__CP12MultiScale',
        component: ComponentCreator('/docs/Event__CP12MultiScale', '768'),
        exact: true
      },
      {
        path: '/docs/Event__CP12OpenGL',
        component: ComponentCreator('/docs/Event__CP12OpenGL', '279'),
        exact: true
      },
      {
        path: '/docs/Event__CP12SLD',
        component: ComponentCreator('/docs/Event__CP12SLD', '823'),
        exact: true
      },
      {
        path: '/docs/Event__CP12Stats',
        component: ComponentCreator('/docs/Event__CP12Stats', '61e'),
        exact: true
      },
      {
        path: '/docs/Event__CP12Test',
        component: ComponentCreator('/docs/Event__CP12Test', 'c14'),
        exact: true
      },
      {
        path: '/docs/Event__CP12traffic',
        component: ComponentCreator('/docs/Event__CP12traffic', '448'),
        exact: true
      },
      {
        path: '/docs/Event__CP12Water',
        component: ComponentCreator('/docs/Event__CP12Water', 'df0'),
        exact: true
      },
      {
        path: '/docs/Event__Events',
        component: ComponentCreator('/docs/Event__Events', '657'),
        exact: true
      },
      {
        path: '/docs/Event__MIMSCOP2012',
        component: ComponentCreator('/docs/Event__MIMSCOP2012', 'edc'),
        exact: true
      },
      {
        path: '/docs/Event__PDI2012',
        component: ComponentCreator('/docs/Event__PDI2012', 'e6d'),
        exact: true
      },
      {
        path: '/docs/Event__TrainingSessionHanoi2009',
        component: ComponentCreator('/docs/Event__TrainingSessionHanoi2009', 'f2e'),
        exact: true
      },
      {
        path: '/docs/Event__TraininSessionPDI2011',
        component: ComponentCreator('/docs/Event__TraininSessionPDI2011', 'aed'),
        exact: true
      },
      {
        path: '/docs/Events',
        component: ComponentCreator('/docs/Events', '546'),
        exact: true,
        sidebar: "side"
      },
      {
        path: '/docs/ExperimentBuiltIn',
        component: ComponentCreator('/docs/ExperimentBuiltIn', '800'),
        exact: true
      },
      {
        path: '/docs/ExperimentsUserInterface',
        component: ComponentCreator('/docs/ExperimentsUserInterface', '2a9'),
        exact: true
      },
      {
        path: '/docs/ExplorationMethods',
        component: ComponentCreator('/docs/ExplorationMethods', '2ee'),
        exact: true
      },
      {
        path: '/docs/ExploringModels',
        component: ComponentCreator('/docs/ExploringModels', '4d0'),
        exact: true,
        sidebar: "side"
      },
      {
        path: '/docs/Expressions',
        component: ComponentCreator('/docs/Expressions', '13e'),
        exact: true,
        sidebar: "side"
      },
      {
        path: '/docs/Extension',
        component: ComponentCreator('/docs/Extension', '6f7'),
        exact: true
      },
      {
        path: '/docs/FileTypes',
        component: ComponentCreator('/docs/FileTypes', '608'),
        exact: true,
        sidebar: "side"
      },
      {
        path: '/docs/G__GraphicalEditor',
        component: ComponentCreator('/docs/G__GraphicalEditor', 'b5a'),
        exact: true,
        sidebar: "side"
      },
      {
        path: '/docs/G__GraphicalEditorTutorial',
        component: ComponentCreator('/docs/G__GraphicalEditorTutorial', '30d'),
        exact: true
      },
      {
        path: '/docs/GamaArchitecture',
        component: ComponentCreator('/docs/GamaArchitecture', '87d'),
        exact: true,
        sidebar: "side"
      },
      {
        path: '/docs/GamAnalyzer',
        component: ComponentCreator('/docs/GamAnalyzer', 'ec4'),
        exact: true,
        sidebar: "side"
      },
      {
        path: '/docs/GamlEditorGeneralities',
        component: ComponentCreator('/docs/GamlEditorGeneralities', '999'),
        exact: true,
        sidebar: "side"
      },
      {
        path: '/docs/GamlEditorToolbar',
        component: ComponentCreator('/docs/GamlEditorToolbar', '96a'),
        exact: true
      },
      {
        path: '/docs/GamlLanguage',
        component: ComponentCreator('/docs/GamlLanguage', '689'),
        exact: true
      },
      {
        path: '/docs/GamlReference',
        component: ComponentCreator('/docs/GamlReference', '22c'),
        exact: true,
        sidebar: "side"
      },
      {
        path: '/docs/GamlReferences',
        component: ComponentCreator('/docs/GamlReferences', '4d4'),
        exact: true
      },
      {
        path: '/docs/GlobalSpecies',
        component: ComponentCreator('/docs/GlobalSpecies', '7b5'),
        exact: true,
        sidebar: "side"
      },
      {
        path: '/docs/GraphicalEditor',
        component: ComponentCreator('/docs/GraphicalEditor', '579'),
        exact: true
      },
      {
        path: '/docs/GraphSpecies',
        component: ComponentCreator('/docs/GraphSpecies', '999'),
        exact: true
      },
      {
        path: '/docs/GridSpecies',
        component: ComponentCreator('/docs/GridSpecies', '2cd'),
        exact: true,
        sidebar: "side"
      },
      {
        path: '/docs/Headless',
        component: ComponentCreator('/docs/Headless', 'eb6'),
        exact: true
      },
      {
        path: '/docs/Headless-mode-for-dummies',
        component: ComponentCreator('/docs/Headless-mode-for-dummies', '701'),
        exact: true,
        sidebar: "side"
      },
      {
        path: '/docs/Home',
        component: ComponentCreator('/docs/Home', '99c'),
        exact: true,
        sidebar: "side"
      },
      {
        path: '/docs/ImportingModels',
        component: ComponentCreator('/docs/ImportingModels', '52a'),
        exact: true
      },
      {
        path: '/docs/IncrementalModel',
        component: ComponentCreator('/docs/IncrementalModel', '625'),
        exact: true,
        sidebar: "tuto"
      },
      {
        path: '/docs/IncrementalModel_step1',
        component: ComponentCreator('/docs/IncrementalModel_step1', '6e6'),
        exact: true,
        sidebar: "tuto"
      },
      {
        path: '/docs/IncrementalModel_step2',
        component: ComponentCreator('/docs/IncrementalModel_step2', 'bc8'),
        exact: true,
        sidebar: "tuto"
      },
      {
        path: '/docs/IncrementalModel_step3',
        component: ComponentCreator('/docs/IncrementalModel_step3', '0a1'),
        exact: true,
        sidebar: "tuto"
      },
      {
        path: '/docs/IncrementalModel_step4',
        component: ComponentCreator('/docs/IncrementalModel_step4', 'a13'),
        exact: true,
        sidebar: "tuto"
      },
      {
        path: '/docs/IncrementalModel_step5',
        component: ComponentCreator('/docs/IncrementalModel_step5', '736'),
        exact: true,
        sidebar: "tuto"
      },
      {
        path: '/docs/IncrementalModel_step6',
        component: ComponentCreator('/docs/IncrementalModel_step6', '019'),
        exact: true,
        sidebar: "tuto"
      },
      {
        path: '/docs/IncrementalModel_step7',
        component: ComponentCreator('/docs/IncrementalModel_step7', '7f5'),
        exact: true,
        sidebar: "tuto"
      },
      {
        path: '/docs/Inheritance',
        component: ComponentCreator('/docs/Inheritance', '1f2'),
        exact: true
      },
      {
        path: '/docs/InspectorsAndMonitors',
        component: ComponentCreator('/docs/InspectorsAndMonitors', '9cc'),
        exact: true
      },
      {
        path: '/docs/Installation',
        component: ComponentCreator('/docs/Installation', 'ee2'),
        exact: true,
        sidebar: "side"
      },
      {
        path: '/docs/InstallationAndLaunching',
        component: ComponentCreator('/docs/InstallationAndLaunching', '4f3'),
        exact: true,
        sidebar: "side"
      },
      {
        path: '/docs/InstallingGitVersion',
        component: ComponentCreator('/docs/InstallingGitVersion', '390'),
        exact: true,
        sidebar: "side"
      },
      {
        path: '/docs/InstallingPlugins',
        component: ComponentCreator('/docs/InstallingPlugins', '81d'),
        exact: true
      },
      {
        path: '/docs/InteractionBetweenAgents',
        component: ComponentCreator('/docs/InteractionBetweenAgents', '59d'),
        exact: true
      },
      {
        path: '/docs/Introduction',
        component: ComponentCreator('/docs/Introduction', 'f1f'),
        exact: true,
        sidebar: "side"
      },
      {
        path: '/docs/Introduction-To-Gama-Java-API',
        component: ComponentCreator('/docs/Introduction-To-Gama-Java-API', 'cab'),
        exact: true
      },
      {
        path: '/docs/KnownIssues',
        component: ComponentCreator('/docs/KnownIssues', '5b3'),
        exact: true,
        sidebar: "side"
      },
      {
        path: '/docs/Launching',
        component: ComponentCreator('/docs/Launching', '24b'),
        exact: true
      },
      {
        path: '/docs/LaunchingExperiments',
        component: ComponentCreator('/docs/LaunchingExperiments', '8b5'),
        exact: true,
        sidebar: "side"
      },
      {
        path: '/docs/LearnGAMLStepByStep',
        component: ComponentCreator('/docs/LearnGAMLStepByStep', '6a1'),
        exact: true,
        sidebar: "side"
      },
      {
        path: '/docs/Literals',
        component: ComponentCreator('/docs/Literals', '414'),
        exact: true,
        sidebar: "side"
      },
      {
        path: '/docs/LuneraysFlu',
        component: ComponentCreator('/docs/LuneraysFlu', 'b6a'),
        exact: true,
        sidebar: "tuto"
      },
      {
        path: '/docs/LuneraysFlu_step1',
        component: ComponentCreator('/docs/LuneraysFlu_step1', '814'),
        exact: true,
        sidebar: "tuto"
      },
      {
        path: '/docs/LuneraysFlu_step2',
        component: ComponentCreator('/docs/LuneraysFlu_step2', 'c03'),
        exact: true,
        sidebar: "tuto"
      },
      {
        path: '/docs/LuneraysFlu_step3',
        component: ComponentCreator('/docs/LuneraysFlu_step3', 'a1c'),
        exact: true,
        sidebar: "tuto"
      },
      {
        path: '/docs/LuneraysFlu_step4',
        component: ComponentCreator('/docs/LuneraysFlu_step4', '6f0'),
        exact: true,
        sidebar: "tuto"
      },
      {
        path: '/docs/LuneraysFlu_step5',
        component: ComponentCreator('/docs/LuneraysFlu_step5', 'f7a'),
        exact: true,
        sidebar: "tuto"
      },
      {
        path: '/docs/LuneraysFlu_step6',
        component: ComponentCreator('/docs/LuneraysFlu_step6', '2c1'),
        exact: true
      },
      {
        path: '/docs/ManipulateBasicSpecies',
        component: ComponentCreator('/docs/ManipulateBasicSpecies', '09b'),
        exact: true,
        sidebar: "side"
      },
      {
        path: '/docs/ManipulateDates',
        component: ComponentCreator('/docs/ManipulateDates', 'c1f'),
        exact: true,
        sidebar: "side"
      },
      {
        path: '/docs/ManipulateLight',
        component: ComponentCreator('/docs/ManipulateLight', '914'),
        exact: true,
        sidebar: "side"
      },
      {
        path: '/docs/ManipulateOSMDatas',
        component: ComponentCreator('/docs/ManipulateOSMDatas', 'f91'),
        exact: true,
        sidebar: "side"
      },
      {
        path: '/docs/MenusAndCommands',
        component: ComponentCreator('/docs/MenusAndCommands', 'a7f'),
        exact: true
      },
      {
        path: '/docs/MirrorSpecies',
        component: ComponentCreator('/docs/MirrorSpecies', '41c'),
        exact: true
      },
      {
        path: '/docs/ModelBuiltIn',
        component: ComponentCreator('/docs/ModelBuiltIn', '2c3'),
        exact: true
      },
      {
        path: '/docs/ModelOrganization',
        component: ComponentCreator('/docs/ModelOrganization', '9f6'),
        exact: true,
        sidebar: "side"
      },
      {
        path: '/docs/MultiLevelArchitecture',
        component: ComponentCreator('/docs/MultiLevelArchitecture', 'd7b'),
        exact: true
      },
      {
        path: '/docs/MultiParadigmModeling',
        component: ComponentCreator('/docs/MultiParadigmModeling', '609'),
        exact: true,
        sidebar: "side"
      },
      {
        path: '/docs/NavigatingWorkspace',
        component: ComponentCreator('/docs/NavigatingWorkspace', '501'),
        exact: true,
        sidebar: "side"
      },
      {
        path: '/docs/OlderVersions',
        component: ComponentCreator('/docs/OlderVersions', 'e98'),
        exact: true,
        sidebar: "side"
      },
      {
        path: '/docs/Operators',
        component: ComponentCreator('/docs/Operators', '3e9'),
        exact: true
      },
      {
        path: '/docs/OperatorsAA',
        component: ComponentCreator('/docs/OperatorsAA', 'b80'),
        exact: true
      },
      {
        path: '/docs/OperatorsBC',
        component: ComponentCreator('/docs/OperatorsBC', 'de6'),
        exact: true
      },
      {
        path: '/docs/OperatorsDH',
        component: ComponentCreator('/docs/OperatorsDH', '473'),
        exact: true
      },
      {
        path: '/docs/OperatorsIM',
        component: ComponentCreator('/docs/OperatorsIM', 'f4d'),
        exact: true
      },
      {
        path: '/docs/OperatorsNR',
        component: ComponentCreator('/docs/OperatorsNR', 'b33'),
        exact: true
      },
      {
        path: '/docs/OperatorsSplitted',
        component: ComponentCreator('/docs/OperatorsSplitted', 'eba'),
        exact: true
      },
      {
        path: '/docs/OperatorsSZ',
        component: ComponentCreator('/docs/OperatorsSZ', '7ef'),
        exact: true
      },
      {
        path: '/docs/OptimizingModels',
        component: ComponentCreator('/docs/OptimizingModels', '26d'),
        exact: true
      },
      {
        path: '/docs/OptimizingModelsSection',
        component: ComponentCreator('/docs/OptimizingModelsSection', 'f74'),
        exact: true,
        sidebar: "side"
      },
      {
        path: '/docs/OtherBuiltInSpecies',
        component: ComponentCreator('/docs/OtherBuiltInSpecies', 'fcf'),
        exact: true
      },
      {
        path: '/docs/Overview',
        component: ComponentCreator('/docs/Overview', 'a1a'),
        exact: true,
        sidebar: "side"
      },
      {
        path: '/docs/ParametersView',
        component: ComponentCreator('/docs/ParametersView', '425'),
        exact: true
      },
      {
        path: '/docs/Pedagogical-Materials',
        component: ComponentCreator('/docs/Pedagogical-Materials', '4cb'),
        exact: true
      },
      {
        path: '/docs/PlatformDocumentation',
        component: ComponentCreator('/docs/PlatformDocumentation', '23c'),
        exact: true,
        sidebar: "side"
      },
      {
        path: '/docs/PredatorPrey',
        component: ComponentCreator('/docs/PredatorPrey', 'fd5'),
        exact: true,
        sidebar: "tuto"
      },
      {
        path: '/docs/PredatorPrey_step1',
        component: ComponentCreator('/docs/PredatorPrey_step1', '5ca'),
        exact: true,
        sidebar: "tuto"
      },
      {
        path: '/docs/PredatorPrey_step10',
        component: ComponentCreator('/docs/PredatorPrey_step10', 'c1d'),
        exact: true,
        sidebar: "tuto"
      },
      {
        path: '/docs/PredatorPrey_step11',
        component: ComponentCreator('/docs/PredatorPrey_step11', 'f5f'),
        exact: true,
        sidebar: "tuto"
      },
      {
        path: '/docs/PredatorPrey_step12',
        component: ComponentCreator('/docs/PredatorPrey_step12', 'e09'),
        exact: true,
        sidebar: "tuto"
      },
      {
        path: '/docs/PredatorPrey_step13',
        component: ComponentCreator('/docs/PredatorPrey_step13', '183'),
        exact: true
      },
      {
        path: '/docs/PredatorPrey_step2',
        component: ComponentCreator('/docs/PredatorPrey_step2', 'a1e'),
        exact: true,
        sidebar: "tuto"
      },
      {
        path: '/docs/PredatorPrey_step3',
        component: ComponentCreator('/docs/PredatorPrey_step3', 'fb2'),
        exact: true,
        sidebar: "tuto"
      },
      {
        path: '/docs/PredatorPrey_step4',
        component: ComponentCreator('/docs/PredatorPrey_step4', '88f'),
        exact: true,
        sidebar: "tuto"
      },
      {
        path: '/docs/PredatorPrey_step5',
        component: ComponentCreator('/docs/PredatorPrey_step5', '42c'),
        exact: true,
        sidebar: "tuto"
      },
      {
        path: '/docs/PredatorPrey_step6',
        component: ComponentCreator('/docs/PredatorPrey_step6', 'ef0'),
        exact: true,
        sidebar: "tuto"
      },
      {
        path: '/docs/PredatorPrey_step7',
        component: ComponentCreator('/docs/PredatorPrey_step7', '722'),
        exact: true,
        sidebar: "tuto"
      },
      {
        path: '/docs/PredatorPrey_step8',
        component: ComponentCreator('/docs/PredatorPrey_step8', '6b0'),
        exact: true,
        sidebar: "tuto"
      },
      {
        path: '/docs/PredatorPrey_step9',
        component: ComponentCreator('/docs/PredatorPrey_step9', 'bde'),
        exact: true,
        sidebar: "tuto"
      },
      {
        path: '/docs/Preferences',
        component: ComponentCreator('/docs/Preferences', '6de'),
        exact: true,
        sidebar: "side"
      },
      {
        path: '/docs/Projects',
        component: ComponentCreator('/docs/Projects', '7d1'),
        exact: true,
        sidebar: "side"
      },
      {
        path: '/docs/PseudoVariables',
        component: ComponentCreator('/docs/PseudoVariables', 'e89'),
        exact: true
      },
      {
        path: '/docs/Recipes',
        component: ComponentCreator('/docs/Recipes', 'd8d'),
        exact: true,
        sidebar: "side"
      },
      {
        path: '/docs/References',
        component: ComponentCreator('/docs/References', '500'),
        exact: true,
        sidebar: "side"
      },
      {
        path: '/docs/RegularSpecies',
        component: ComponentCreator('/docs/RegularSpecies', 'e3b'),
        exact: true
      },
      {
        path: '/docs/RoadTrafficModel',
        component: ComponentCreator('/docs/RoadTrafficModel', '4a3'),
        exact: true,
        sidebar: "tuto"
      },
      {
        path: '/docs/RoadTrafficModel_step1',
        component: ComponentCreator('/docs/RoadTrafficModel_step1', '0a3'),
        exact: true,
        sidebar: "tuto"
      },
      {
        path: '/docs/RoadTrafficModel_step2',
        component: ComponentCreator('/docs/RoadTrafficModel_step2', '7c7'),
        exact: true,
        sidebar: "tuto"
      },
      {
        path: '/docs/RoadTrafficModel_step3',
        component: ComponentCreator('/docs/RoadTrafficModel_step3', 'ab2'),
        exact: true,
        sidebar: "tuto"
      },
      {
        path: '/docs/RoadTrafficModel_step4',
        component: ComponentCreator('/docs/RoadTrafficModel_step4', 'b4d'),
        exact: true,
        sidebar: "tuto"
      },
      {
        path: '/docs/RoadTrafficModel_step5',
        component: ComponentCreator('/docs/RoadTrafficModel_step5', 'd31'),
        exact: true,
        sidebar: "tuto"
      },
      {
        path: '/docs/RoadTrafficModel_step6',
        component: ComponentCreator('/docs/RoadTrafficModel_step6', '529'),
        exact: true,
        sidebar: "tuto"
      },
      {
        path: '/docs/RoadTrafficModel_step7',
        component: ComponentCreator('/docs/RoadTrafficModel_step7', 'ba0'),
        exact: true,
        sidebar: "tuto"
      },
      {
        path: '/docs/RunningExperiments',
        component: ComponentCreator('/docs/RunningExperiments', '8c1'),
        exact: true,
        sidebar: "side"
      },
      {
        path: '/docs/RunSeveralSimulations',
        component: ComponentCreator('/docs/RunSeveralSimulations', '317'),
        exact: true,
        sidebar: "side"
      },
      {
        path: '/docs/RuntimeConcepts',
        component: ComponentCreator('/docs/RuntimeConcepts', '073'),
        exact: true,
        sidebar: "side"
      },
      {
        path: '/docs/Save-and-restore-simulations',
        component: ComponentCreator('/docs/Save-and-restore-simulations', 'bbf'),
        exact: true,
        sidebar: "side"
      },
      {
        path: '/docs/SpeciesBuiltIn',
        component: ComponentCreator('/docs/SpeciesBuiltIn', '310'),
        exact: true
      },
      {
        path: '/docs/StartWithGAML',
        component: ComponentCreator('/docs/StartWithGAML', '1da'),
        exact: true,
        sidebar: "side"
      },
      {
        path: '/docs/Statements',
        component: ComponentCreator('/docs/Statements', 'a46'),
        exact: true,
        sidebar: "side"
      },
      {
        path: '/docs/ThreeD',
        component: ComponentCreator('/docs/ThreeD', 'c8e'),
        exact: true,
        sidebar: "tuto"
      },
      {
        path: '/docs/ThreeD_step1',
        component: ComponentCreator('/docs/ThreeD_step1', '218'),
        exact: true,
        sidebar: "tuto"
      },
      {
        path: '/docs/ThreeD_step2',
        component: ComponentCreator('/docs/ThreeD_step2', 'e71'),
        exact: true,
        sidebar: "tuto"
      },
      {
        path: '/docs/ThreeD_step3',
        component: ComponentCreator('/docs/ThreeD_step3', '406'),
        exact: true,
        sidebar: "tuto"
      },
      {
        path: '/docs/TrainingSession',
        component: ComponentCreator('/docs/TrainingSession', '133'),
        exact: true,
        sidebar: "side"
      },
      {
        path: '/docs/Troubleshooting',
        component: ComponentCreator('/docs/Troubleshooting', '47c'),
        exact: true
      },
      {
        path: '/docs/Tutorials',
        component: ComponentCreator('/docs/Tutorials', 'c44'),
        exact: true,
        sidebar: "tuto"
      },
      {
        path: '/docs/UnitsAndConstants',
        component: ComponentCreator('/docs/UnitsAndConstants', '836'),
        exact: true
      },
      {
        path: '/docs/UnitsAndConstantsPDF',
        component: ComponentCreator('/docs/UnitsAndConstantsPDF', '7c4'),
        exact: true
      },
      {
        path: '/docs/Updating',
        component: ComponentCreator('/docs/Updating', '760'),
        exact: true
      },
      {
        path: '/docs/Using_Git',
        component: ComponentCreator('/docs/Using_Git', 'e2b'),
        exact: true
      },
      {
        path: '/docs/Using-BEN-simple-bdi',
        component: ComponentCreator('/docs/Using-BEN-simple-bdi', 'e61'),
        exact: true
      },
      {
        path: '/docs/UsingDatabase',
        component: ComponentCreator('/docs/UsingDatabase', 'bbc'),
        exact: true,
        sidebar: "side"
      },
      {
        path: '/docs/UsingDrivingSkill',
        component: ComponentCreator('/docs/UsingDrivingSkill', 'a19'),
        exact: true,
        sidebar: "side"
      },
      {
        path: '/docs/UsingFIPAACL',
        component: ComponentCreator('/docs/UsingFIPAACL', 'c06'),
        exact: true,
        sidebar: "side"
      },
      {
        path: '/docs/UsingNetwork',
        component: ComponentCreator('/docs/UsingNetwork', '69e'),
        exact: true,
        sidebar: "side"
      },
      {
        path: '/docs/ValidationOfModels',
        component: ComponentCreator('/docs/ValidationOfModels', '8a7'),
        exact: true
      },
      {
        path: '/docs/VariablesAndAttributes',
        component: ComponentCreator('/docs/VariablesAndAttributes', '548'),
        exact: true
      },
      {
        path: '/docs/WhatsNext',
        component: ComponentCreator('/docs/WhatsNext', '9d7'),
        exact: true
      },
      {
        path: '/docs/WorkspaceProjectsAndModels',
        component: ComponentCreator('/docs/WorkspaceProjectsAndModels', 'ae2'),
        exact: true,
        sidebar: "side"
      },
      {
        path: '/docs/Writing_Tests',
        component: ComponentCreator('/docs/Writing_Tests', 'd57'),
        exact: true
      },
      {
        path: '/docs/WritingModels',
        component: ComponentCreator('/docs/WritingModels', 'ff2'),
        exact: true
      }
    ]
  },
  {
    path: '/',
    component: ComponentCreator('/', '311'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
