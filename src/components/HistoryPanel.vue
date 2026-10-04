<template>
  <aside class="history">
    <header class="history__header">
      <h2 class="history__title">历史记录</h2>
      <span class="history__count">共 {{ total }} 条</span>
    </header>

    <div class="history__actions">
      <button type="button" class="history__button" @click="emit('refresh')">
        刷新
      </button>
      <button
        type="button"
        class="history__button is-danger"
        :disabled="history.length === 0"
        @click="emit('clear-all')"
      >
        清空全部
      </button>
    </div>

    <p v-if="history.length === 0" class="history__empty">暂无记录</p>

    <ul v-else class="history__list">
      <li v-for="item in history" :key="item.id" class="history__item">
        <div class="history__content">
          <span class="history__expression">{{ item.expression }}</span>
          <span class="history__result">= {{ item.result }}</span>
          <span class="history__time">{{ item.created_at }}</span>
        </div>
        <div class="history__item-actions">
          <button
            type="button"
            class="history__favorite"
            disabled
            title="收藏功能（预留）"
          >
            ☆
          </button>
          <button
            type="button"
            class="history__delete"
            @click="emit('delete', item.id)"
          >
            删除
          </button>
        </div>
      </li>
    </ul>
  </aside>
</template>

<script setup>
/**
 * History list component.
 *
 * Receives the records and total via props, and emits user intentions
 * (delete / clear-all / refresh) to the parent component.
 */
defineProps({
  history: { type: Array, default: () => [] },
  total: { type: Number, default: 0 },
});

const emit = defineEmits(['delete', 'clear-all', 'refresh']);
</script>

<style scoped>
.history {
  background: var(--color-panel);
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 4px 18px rgba(31, 41, 51, 0.08);
}

.history__header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 12px;
}

.history__title {
  margin: 0;
  font-size: 18px;
}

.history__count {
  color: var(--color-muted);
  font-size: 13px;
}

.history__actions {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}

.history__button {
  flex: 1;
  padding: 8px 0;
  border: 1px solid #d9dee5;
  border-radius: 8px;
  background: #ffffff;
  cursor: pointer;
}

.history__button.is-danger {
  border-color: #ffc9c9;
  color: #c92a2a;
}

.history__button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.history__empty {
  color: var(--color-muted);
  text-align: center;
  padding: 24px 0;
}

.history__list {
  list-style: none;
  margin: 0;
  padding: 0;
  max-height: 360px;
  overflow-y: auto;
}

.history__item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  padding: 10px 0;
  border-bottom: 1px solid #eef1f6;
}

.history__content {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.history__expression {
  font-size: 15px;
  color: var(--color-text);
  word-break: break-all;
}

.history__result {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-primary-dark);
}

.history__time {
  font-size: 12px;
  color: var(--color-muted);
}

.history__item-actions {
  display: flex;
  gap: 6px;
  flex-shrink: 0;
}

.history__favorite,
.history__delete {
  border: none;
  border-radius: 6px;
  padding: 6px 10px;
  cursor: pointer;
}

.history__favorite {
  background: #f1f3f5;
  color: #adb5bd;
  cursor: not-allowed;
}

.history__delete {
  background: #fff5f5;
  color: #c92a2a;
}

.history__delete:hover {
  background: #ffe3e3;
}
</style>
