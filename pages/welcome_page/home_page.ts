const { I, testData } = inject()

class HomePage {
    /**
     * Go to home page
     */
    goToHomePage() {
        // I.amOnPage('/')
        I.amOnPage(testData.homePageUrl)
    }
}

export = new HomePage()