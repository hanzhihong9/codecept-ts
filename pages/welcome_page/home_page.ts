const { I, testData } = inject()

class HomePage {
    /**
     * Go to home page
     */
    goToHomePage() {
        I.amOnPage('/')
    }
}

export = new HomePage()