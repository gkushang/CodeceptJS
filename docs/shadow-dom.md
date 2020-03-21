---
permalink: /shadow-dom
title: Locating Shadow Dom Elements
---

# Locating Shadow Dom Elements

Shadow DOM is one of the key browser features that make up web components. Web components are a really great way to build reusable elements, and are able to scale all the way up to complete web applications. Style encapsulation, the feature that gives shadow DOM it's power, has been a bit of a pain when it comes to E2E or UI testing. Things just got a little easier though, as CodeceptJS introduced built-in support for shadow DOM via locators of type `shadowDom`. Let's dig into what they're all about.

Generated HTML code may often look like this:

```js
<body>
  <shop-app>
    <shop-tabs>
        <shop-tab></shop-tab>
    </shop-tabs>
  </shop-app>
</body>
```

This uses custom elements, `shop-app`, `shop-tabs` and `shop-tab`. It's quite common that clickable elements are not actual `a` or `button` elements but custom elements. This way `I.click('Click Me!');` won't work, as well as `fillField('name', 'value)`. Finding a correct locator for such cases turns to be almost impossible until `shadowDom` element support is added.

## Locate Shadow DOM

For Web Components or [Salesforce's Lighting Web Components](https://github.com/salesforce/lwc) with Shadow DOM's, a special `shadowDom` locator is available. It allows to select an element by its shadow dom Host and shadow dom Children.

```js
{ shadowDom: { host: 'shop-app' } }
{ shadowDom: { host: 'shop-app' }, children: ['shop-tabs', 'shop-tab'] }
```

In WebDriver, you can use ShadowDom locators in any method where locator is required. For example, to click `shop-tab` in above HTML code:

```js
I.click({ shadowDom: { host: 'shop-app' }, children: ['shop-tabs', 'shop-tab'] })
```
