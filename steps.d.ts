/// <reference types='codeceptjs' />
type config = typeof import('./resources/config');
type steps_file = typeof import('./steps_file');
type pages = typeof import('./pages/pages_import');
type steps = typeof import('./steps/steps_import');
type api = typeof import('./api/index.js');
type translate = typeof import('./resources/translation/undefined');
type testData = typeof import('./resources/test_data/dev/test_data');
type CustomCommands = import('./helpers/custom_commands_helper');
type PlaywrightBrowser = import('./helpers/playwright_browser_helper');
type ChaiWrapper = import('./node_modules/codeceptjs-chai');

declare namespace CodeceptJS {
  interface SupportObject { I: I, current: any, config: config, pages: pages, steps: steps, api: api, translate: translate, testData: testData }
  interface Methods extends Playwright, CustomCommands, PlaywrightBrowser, ChaiWrapper {}
  interface I extends ReturnType<steps_file> {}
  namespace Translation {
    interface Actions {}
  }
}
