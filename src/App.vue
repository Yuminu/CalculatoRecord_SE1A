<template>
  <div class="app">
    <header class="app__header">
      <h1 class="app__title">前后端分离计算器</h1>
      <p class="app__subtitle">Vue 3 + Flask · 计算结果由后端返回</p>
    </header>

    <main class="app__main">
      <Calculator
        :expression="store.expression"
        :result="store.result"
        :loading="store.loading"
        @update:expression="store.setExpression"
        @calculate="onCalculate"
      />
      <HistoryPanel
        :history="store.history"
        :total="store.total"
        @delete="onDelete"
        @clear-all="onClearAll"
        @refresh="store.fetchHistory"
      />
    </main>
  </div>
</template>

<script setup>
/**
 * Root component: wires the two child components to the Pinia store and
 * displays native alert dialogs for backend/network errors.
 */
import { onMounted } from 'vue';
import Calculator from './components/Calculator.vue';
import HistoryPanel from './components/HistoryPanel.vue';
import { useCalculatorStore } from './store/calculator';

const store = useCalculatorStore();

const onCalculate = async () => {
  const response = await store.calculate();
  if (!response.ok) {
    window.alert(response.message);
  }
};

const onDelete = async (id) => {
  const response = await store.removeHistory(id);
  if (!response.ok) {
    window.alert(response.message);
  }
};

const onClearAll = async () => {
  if (!window.confirm('确定要清空所有历史记录吗？')) {
    return;
  }
  const response = await store.clearAllHistory();
  if (!response.ok) {
    window.alert(response.message);
  }
};

onMounted(() => {
  store.fetchHistory();
});

// Reserved: global keyboard-shortcut listener placeholder.
// See src/utils/keyMapping.js and requirements sections 6.5 / 14.
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
  padding: 32px 16px 48px;
}

.app__header {
  text-align: center;
  margin-bottom: 24px;
}

.app__title {
  margin: 0 0 8px;
  font-size: 28px;
}

.app__subtitle {
  margin: 0;
  color: var(--color-muted);
}

.app__main {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  align-items: start;
}

@media (max-width: 720px) {
  .app__main {
    grid-template-columns: 1fr;
  }
}
</style>
