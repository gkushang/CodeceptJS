---
permalink: /shadow
title: Locating Shadow Dom Elements
---

# Locating Shadow Dom Elements

> ℹ Shadow DOM locators is supported only in WebDriver helper

Shadow DOM is one of the key browser features that make up web components. Web components are a really great way to build reusable elements, and are able to scale all the way up to complete web applications. Style encapsulation, the feature that gives shadow DOM it's power, has been a bit of a pain when it comes to E2E or UI testing. Things just got a little easier though, as CodeceptJS introduced built-in support for shadow DOM via locators of type `shadow`. Let's dig into what they're all about.

Generated HTML code may often look like this (ref: [Salesforce's Lighting Web Components](https://github.com/salesforce/lwc)):

```js
<body>
  <my-app>
    <recipe-hello>
      <button class="primary-button">Click Me!</button>
    </recipe-hello>
    <recipe-hello-binding>
      <ui-input>
        <input type="text" class="input">
      </ui-input>
    </recipe-hello-binding>
  </my-app>
</body>
```

This uses custom elements, `my-app`, `recipe-hello`, `recipe-hello-binding` and `ui-input`. It's quite common that clickable elements are not actual `a` or `button` elements but custom elements. This way `I.click('Click Me!');` won't work, as well as `fillField('.input', 'value)`. Finding a correct locator for such cases turns to be almost impossible until `shadow` element support is added to CodeceptJS.

## Locate Shadow Dom

### Option 1: Use the [query-selector-shadow-dom](https://github.com/Georgegriff/query-selector-shadow-dom) plugin

CodeceptJS provides an option to apply the `customLocatorStrategies` to locate the Shadow Doms at ease. The query-selector-shadow-dom plugin pierce Shadow DOM roots without knowing the path through nested shadow roots. To use the plugin, define the `customLocatorStrategies` as shown below, and use the name of your strategy  e.g. `custom` in the tests,

```js
npm i query-selector-shadow-dom
```

```js
// in codecept.conf.js
const { locatorStrategy } = require('query-selector-shadow-dom/plugins/webdriverio');

// under WebDriver Helpers Configuration
WebDriver: {
  ...
  customLocatorStrategies: {
    custom: locatorStrategy
  }
}
```

To locate the Shadow DOM in above HTML,

```js
I.click({custom: '.primary-button'});
```

If you want to provide another type of locator, give it another name.

```js
// in codecept.conf.js
const { locatorStrategy } = require('query-selector-shadow-dom/plugins/webdriverio');

const myStrat = (selector) => {
  return document.querySelectorAll(selector)
}

// under WebDriver Helpers Configuration
WebDriver: {
  ...
  customLocatorStrategies: {
    custom: locatorStrategy,
    myStrat: myStrat
  }
}
```

To locate the Shadow DOM in above HTML,

```js
I.click({myStrat: '.primary-button'});
```

The Complete Example is available at [webcomponents-playwright-webdriver-example](https://github.com/salesforce/codeceptjs-bdd/tree/develop/examples/webcomponents-playwright-webdriver-example).

### Option 2: Use the `shadow` locators

TL;DR: This requires the DOM Hierarchy 

For Web Components or [Salesforce's Lighting Web Components](https://github.com/salesforce/lwc) with Shadow DOM's, a special `shadow` locator is available. It allows to select an element by its shadow dom sequences and sequences are defined as an Array of `elements`. Elements defined in the array of `elements` must be in the ordered the shadow elements appear in the DOM.

```js
{ shadow: ['my-app', 'recipe-hello', 'button'] }
{ shadow: ['my-app', 'recipe-hello-binding', 'ui-input', 'input.input'] }
```

In WebDriver, you can use shadow locators in any method where locator is required.

For example, to fill value in `input` field or to click the `Click Me!` button, in above HTML code:

```js
I.fillField({ shadow: ['my-app', 'recipe-hello-binding', 'ui-input', 'input.input'] }, 'value');
I.click({ shadow: ['my-app', 'recipe-hello', 'button'] });
```
## Example

```js
Feature('Shadow Dom Locators');

Scenario('should fill input field within shadow elements', ({I}) => {

  // navigate to LWC webpage containing shadow dom
  I.amOnPage('https://recipes.lwc.dev/');

  // click Click Me! button
  I.click({ shadow: ['my-app', 'recipe-hello', 'button'] });

  // fill the input field
  I.fillField({ shadow: ['my-app', 'recipe-hello-binding', 'ui-input', 'input.input'] }, 'value');

});


```
