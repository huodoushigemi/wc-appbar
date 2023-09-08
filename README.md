# wc-appbar

The `wc-appbar` is a component that imitation [SliverAppBar](https://api.flutter.dev/flutter/material/SliverAppBar-class.html#material.SliverAppBar.3) and is written using web-component

It can support running in various frameworks, such as `React` `Vue` `SolidJs`

![image](https://raw.githubusercontent.com/huodoushigemi/wc-appbar/master/images/flutter_demo.gif)

## 🌈 Demo

[vue-sfc]: https://play.vuejs.org/#eNqVVW1v4zYM/iucD+slQ22nCzoMXlpgG27YhmEbtn0Z4C+KTNtqZUmw5CS9IP/9KCl2krZX4JIPFl9EPXxIUfvkR2OyzYBJkaws74VxYNEN5r5UojO6d7CHHutr2DLHWzhA3esO3tOO95NHmWx5yoxZs75MSlUqrpV1YIRSWMGd3z9z/YDz0VJLzZxQzdFWM2lPRquYeWYoVTh95k3XsGES7u7D5+oKZmOwjBQD0k76zmnTKo/5UCYkOOyMZA5JAlh9labwK7IKe0jTqJpSgKITqr0rk5vFokxIYjsvLaMUkyI5LrxqBEDKcenVHiyp/KdMwhl0SiU2wCWzliyBrvv/h6ETq5wMo4/ompOPD2V7TsvWOWOLPG9Yh1njyCvjKhcda9DmUsuccUdikzeDqNBpExfL2wX9sgfjI+Ux13xKNpBzJOQPQeyPdHigm7TWPZ2MIBQsffojLEF0Evb9HhAOhxH9FOkXrd0ZtXUQx/QkW6O8PzbHSigzODqp0xXKc1rdk0GSeYv8ca13Afwqj5uvsLPmh4t4U0u9iHhWky+MGTrxRbxY0DdjRZKntFf5WfeRaN2T9MvWdfIa1rp6gr3f0rG+EaqARYBhWFUR7Cge/MbMd2fwPNngBrvg3qJoWlcAZ5LPNqyfpelU5dR39By+gRuzmwfvWiuXWvERC1geA6wZf2x6PaiqgHd1XQelNowL9/SZsLbthXpMdV3TzJhDDi8Ppsszh5Tu5CuA5h7LMbPmmJi2wglNJLC11XJwGGBQN4+06PUDcpfWwueqN9gH7VZUri2AruzXF2xMio+pUBXuCkhvpkN9Fz/jM7s9svEKQQ53LmVSNISOo6LaXkQqlGtT3gpZzXCDah4jX7D6/cL/l1NBY4c8z7wWO6xiSbRzugtZmF3QSKwpq8jE53K+/e7o/GpFqVepbqzSW9891D8UGt75GbFYfHtERqMztGhyncQRT3U02YPVip6JgJZGQDDYMikifq87ewYKEseJxStFm+n2iE2fKXS5Mt1pBNHwsDS4fHUyIWokV/+KABCQAyFwlt6FWjTPzue6M0Ji/5fxrF3iYFLq7e9B59+d61EfLusr+gdL99cj/rtHi/0Gy2SyObqU6KL5w79/Ug+cGWkmDJK83zD+g6GPCWN0+4nKQbDP/ALa3wKd1IP/2Q87h8qOSXmggY3gXyb08v78RuonuMtsObF4+AQ0DZx8

- <table width="100%">
    <tr>
      <td><a href="https://codepen.io/huodoushigemi/pen/yLGaxpq" target="_blank"><strong>Basic</strong></a></td>
      <td><a href="https://codepen.io/huodoushigemi/pen/RwEoqZe" target="_blank"><strong>Classics</strong></a></td>
      <td><a href="https://codepen.io/huodoushigemi/pen/Bavpome" target="_blank"><strong>Flutter Demo</strong></a></td>
    </tr>
    <tr>
      <td><img src="https://raw.githubusercontent.com/huodoushigemi/wc-appbar/master/images/yuumi.gif" /></td>
      <td><img src="https://raw.githubusercontent.com/huodoushigemi/wc-appbar/master/images/classic.gif" /></td>
      <td><img src="https://raw.githubusercontent.com/huodoushigemi/wc-appbar/master/images/flutter.gif" /></td>
    </tr>
  </table>
- [Vue SFC Playground][vue-sfc]
- [SolidJs Playground](https://playground.solidjs.com/anonymous/aa7c9d31-1eeb-48f5-9562-6807b28d5457)


<details>
  <summary><h2>Animated Examples</h2></summary>

  The following animations show how app bars with different configurations behave when a user scrolls up and then down again

  - App bar with floating: false, pinned: false, snap: false:

    <video controls><source src="https://flutter.github.io/assets-for-api-docs/assets/material/app_bar.mp4" type="video/mp4"></video>

  - App bar with floating: true, pinned: false, snap: false:

    <video controls><source src="https://flutter.github.io/assets-for-api-docs/assets/material/app_bar_floating.mp4" type="video/mp4"></video>

  - App bar with floating: true, pinned: false, snap: true:

    <video controls><source src="https://flutter.github.io/assets-for-api-docs/assets/material/app_bar_floating_snap.mp4" type="video/mp4"></video>

  - App bar with floating: true, pinned: true, snap: false:

    <video controls><source src="https://flutter.github.io/assets-for-api-docs/assets/material/app_bar_pinned_floating.mp4" type="video/mp4"></video>

  - App bar with floating: true, pinned: true, snap: true:

    <video controls><source src="https://flutter.github.io/assets-for-api-docs/assets/material/app_bar_pinned.mp4" type="video/mp4"></video>

  - App bar with floating: false, pinned: true, snap: false:

    <video controls><source src="https://flutter.github.io/assets-for-api-docs/assets/material/app_bar_pinned.mp4" type="video/mp4"></video>
  
  The property snap can only be set to true if floating is also true.
</details>

## ⚙️ Installation

- ### npm

```shell
npm i wc-appbar
```

- ### cdn

```html
<script src="https://cdn.jsdelivr.net/npm/wc-appbar/dist/index.iife.js"></script>
```

## 🦄 Example

### 🚀 Use in VanillaJS

```js
import 'wc-appbar'
```

```html
<wc-appbar minh="100" maxh="300" pinned="true">
  <div class="bar">Title</div>
  <img class="bg" src="xxx.png" />
</wc-appbar>

<style>
.bar {
  height: calc(var(--wc-appbar-minh) * 1px);
  background: #fff;
  opacity: calc(var(--wc-appbar-shrink-offset) / (var(--wc-appbar-maxh) - var(--wc-appbar-minh)));
}

.bg {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  object-fit: cover;
}
</style>
```

### 🚀 Use in React

```tsx
// App.tsx
import 'wc-appbar'

export default function MyApp() {
  return (
    <wc-appbar minh={100} maxh={300} pinned={true}>
      <div class="bar">Title</div>
      <img class="bg" src="xxx.png" />
    </wc-appbar>
  )
}
```

### 🚀 Use in Vue

```js
// main.ts
import 'wc-appbar'
```

```html
<!-- App.vue -->
<template>
  <wc-appbar :minh="100" :maxh="300" :pinned="true">
    <div class="bar">Title</div>
    <img class="bg" src="xxx.png" />
  </wc-appbar>
</template>
```

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: { isCustomElement: (tag) => tag.startsWith('wc-') }
      },
    })
  ],
})
```

## 📄 Props

| Name     | Type      | Default | Description                                                                               |
| -------- | --------- | ------- | ----------------------------------------------------------------------------------------- |
| minh     | `number`  | 56      | Defines the height of the app bar when it is collapsed                                    |
| maxh     | `number`  |         | The size of the app bar when it is fully expanded                                         |
| pinned   | `boolean` | false   | Whether the app bar should remain visible at the start of the scroll view                 |
| floating | `boolean` | false   | Whether the app bar should become visible as soon as the user scrolls towards the app bar |
| snap     | `boolean` | false   | If `snap` and `floating` are true then the `floating` app bar will "snap" into view       |

## ⭐️ Show Your Support

Please give a ⭐️ if this project helped you!

## 👏 Contributing

If you have any questions or requests or want to contribute, please write the issue or give me a Pull Request freely.
