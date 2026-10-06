<template>
  <main class="home">
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
      @toggle-favorite="onToggleFavorite"
    />

    <ConfirmDialog
      :visible="showClearConfirm"
      title="Clear All History"
      message="Are you sure you want to clear all history? This cannot be undone."
      confirm-text="Clear"
      cancel-text="Cancel"
      @confirm="confirmClearAll"
      @cancel="showClearConfirm = false"
    />
  </main>
</template>

<script setup>
/**
 * Home page: the calculator, the history panel and the clear-all dialog.
 */
import { onMounted, ref } from 'vue';
import Calculator from '../components/Calculator.vue';
import ConfirmDialog from '../components/ConfirmDialog.vue';
import HistoryPanel from '../components/HistoryPanel.vue';
import { useCalculatorStore } from '../store/calculator';

const store = useCalculatorStore();

// Controls the in-page confirmation dialog for "clear all history".
const showClearConfirm = ref(false);

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

const onToggleFavorite = async (id) => {
  const response = await store.toggleFavorite(id);
  if (!response.ok) {
    window.alert(response.message);
  }
};

const onClearAll = () => {
  showClearConfirm.value = true;
};

const confirmClearAll = async () => {
  showClearConfirm.value = false;
  const response = await store.clearAllHistory();
  if (!response.ok) {
    window.alert(response.message);
  }
};

onMounted(() => {
  store.fetchHistory();
});
</script>

<style scoped>
.home {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  align-items: start;
}

@media (max-width: 720px) {
  .home {
    grid-template-columns: 1fr;
  }
}
</style>
