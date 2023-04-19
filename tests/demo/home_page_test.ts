Feature('Deomo Home Page')
const { steps, I } = inject()
Scenario('Test Home Page', async () => {
    await steps.homePageStep.goToHomePage();
    I.see('Gmail');
    I.seeInTitle('Google');
    // I.seeInTitle(/Google/); // not working
    // I.seeInCurrentUrl(/google/); // not working
    I.seeCurrentUrlEquals('https://www.google.ca/')
})
