Feature('doemo github Page')
Before(({ I }) => { // or Background
  I.amOnPage('https://github.com');
});
Scenario('update user profile', ({ I }) => {
 
  I.click('Sign in', '//html/body/div[1]/div[1]/header');
  I.see('Sign in to GitHub', 'h1');
  I.fillField('Username or email address', 'something@totest.com');
  I.fillField('Password', '123456');
  I.click('Sign in');
  I.see('Incorrect username or password.', '.flash-error');
  
})
.tag('@demo').tag('important');