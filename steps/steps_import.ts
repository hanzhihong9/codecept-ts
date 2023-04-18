const { config } = inject()

import importHomePage = require('./home_page_step')

const homePageStep = config.isMobile
    ? importHomePage.homePageStepMobile
    : importHomePage.homePageStep

export = {
    homePageStep,
}
