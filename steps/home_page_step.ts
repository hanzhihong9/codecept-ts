const { pages, I } = inject()

class HomePageStep {
    /**
     * Go to home page on desktop
     */
    goToHomePage() {
        pages.homePage.goToHomePage()
        I.see('Gmail')
        I.say('Desktop mode')
    }
}

class HomePageStepMobile extends HomePageStep {
    /**
     * Go to home page on desktop
     */
    goToHomePage() {
        pages.homePage.goToHomePage()
        I.say('Mobile mode')
    }
}

export = {
    homePageStep: new HomePageStep(),
    homePageStepMobile: new HomePageStepMobile()
}
