# Super Simple Scroll Animations

SSSA uses intersection observers to detect when an element becomes visible, adding an `is-visible` class which triggers a CSS-powered animation. Optionally it can remove the class to trigger an exit animation.

## Usage

### JavaScript

```js
import superSimpleScrollAnimations from 'super-simple-scroll-animations';

superSimpleScrollAnimations(0.3, true).init();
```

SSSA accepts two parameters:

* **threshold** - Decimal to indicate at what percentage of the target's visibility the observer's callback should be executed, default `0.3`
* **detect exit** - When enabled it removes the `is-visible` when the element exits the viewport, default `false`

### HTML

Elements you wish to be animated should have the attribute `js-scroll-animation` added. When an element with `js-scroll-animation` comes into view the `is-visible` class will be added to it.

```html
<!-- Element will fade in when it passes the threshold -->
<div class="foo" js-scroll-animation="fadeIn">
  Lorem ipsum dolor sit amet...
</div>

<!-- Sub-elements will fade in when parent passes the threshold -->
<ul class="foo" js-scroll-animation>
  <li data-scroll-animation="fadeIn">Lorem ipsum dolor sit amet...</li>
  <li data-scroll-animation="fadeIn">Lorem ipsum dolor sit amet...</li>
  <li data-scroll-animation="fadeIn">Lorem ipsum dolor sit amet...</li>
</ul>
```

#### Staggering the animations

To stagger the animations you will need to add a `transition-delay` property to your elements, either using CSS or inline.

In the example below we use Vue; it's assumed you're using a templating language to handle iteration.

```html
<ul js-scroll-animation>
  <li
    v-for="(person, index) in people"
    :key="index"
    :style="`transition-delay: ${(0.15 * index)}s;`"
    data-scroll-animation="fadeIn"
  >
    {{ person }}
  </li>
</ul>
```

### CSS

The module comes with a set of default animations, the animation used is determined by the value of the attribute added to the element.

Movement is achieved using `transform: translate()`. Properties are transitioned using the CSS `transition` property. All transitions use `cubic-bezier(0.42, 0, 0.58, 1)` easing and a duration of `0.6s`.

* `fadeIn` - Fades in.
* `fadeDirectionUp` - Moves up as it fades in.
* `fadeDirectionDown` - Moves down as it fades in.
* `fadeDirectionLeft` - Moves left as it fades in.
* `fadeDirectionRight` - Moves right as it fades in.

#### Adding your own animations

Simply add the below CSS for each custom animation you want, replacing `fade` and `opacity` with your own animation name and property to transition.

```css
.sssa-enabled [js-scroll-animation=fade],
.sssa-enabled [data-scroll-animation=fade] {
  opacity: 0;
  transition: opacity 0.3s ease;
}

[js-scroll-animation=fade].is-visible,
.is-visible [data-scroll-animation=fade] {
  opacity: 1;
}
```

## Browser compatibility

| Chrome | Edge | Firefox | IE | Opera | Safari
--- | --- | --- | --- | --- | ---
| 51+ | 15+ | 55+ | X | 38+ | 12.1+

See MDN's page on [intersection observer](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Browser_compatibility) for full details.

For Internet Explorer support you will need to use a [polyfill](https://www.npmjs.com/package/intersection-observer-polyfill).

