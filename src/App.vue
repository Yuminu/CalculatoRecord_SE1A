<template>
  <div class="app">
    <Navbar />
    <router-view />
  </div>
</template>

<script setup>
/**
 * Root component: a persistent navigation bar plus the routed page.
 */
import Navbar from './components/Navbar.vue';
</script>

<style>
:root {
  --color-bg: #f5f6fa;
  --color-panel: #ffffff;
  --color-primary: #4c6ef5;
  --color-primary-dark: #364fc7;
  --color-text: #1f2933;
  --color-muted: #7b8794;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif;
  background: var(--color-bg);
  color: var(--color-text);
}

.app {
  max-width: 960px;
  margin: 0 auto;
  padding: 0 16px 48px;
}
</style>
