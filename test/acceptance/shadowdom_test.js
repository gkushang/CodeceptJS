Feature('Shadow Dom Selectors');

Scenario('should click and verify shadowDom elements', I => {
  I.amOnPage('https://shop.polymer-project.org');

  // click on Men's Outwear tab
  I.click({
    shadowDom: {
      host: 'shop-app',
      children: ['#tabContainer', 'shop-tab'],
    },
  });

  // verify if Cart Icon exists on page
  I.seeElement({
    shadowDom: {
      host: 'shop-app',
      children: ['paper-icon-button', 'iron-icon'],
    },
  });
});
