<template>
  <div
    v-if="visible"
    class="confirm-overlay"
    role="dialog"
    aria-modal="true"
  >
    <div class="confirm-dialog">
      <h3 class="confirm-dialog__title">{{ title }}</h3>
      <p class="confirm-dialog__message">{{ message }}</p>
      <div class="confirm-dialog__actions">
        <button
          type="button"
          class="confirm-dialog__button is-cancel"
          @click="emit('cancel')"
        >
          {{ cancelText }}
        </button>
        <button
          type="button"
          class="confirm-dialog__button is-confirm"
          @click="emit('confirm')"
        >
          {{ confirmText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
/**
 * Reusable in-page confirmation dialog.
 *
 * Unlike window.confirm(), it is rendered inside the page (so no browser
 * "localhost:xxxx says" prefix appears) and can only be dismissed by
 * clicking one of its buttons.
 */
defineProps({
  visible: { type: Boolean, default: false },
  title: { type: String, default: '请确认' },
  message: { type: String, default: '' },
  confirmText: { type: String, default: '确认' },
  cancelText: { type: String, default: '取消' },
});

const emit = defineEmits(['confirm', 'cancel']);
</script>

<style scoped>
.confirm-overlay {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(31, 41, 51, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.confirm-dialog {
  width: 320px;
  max-width: calc(100vw - 32px);
  background: var(--color-panel, #ffffff);
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 12px 32px rgba(31, 41, 51, 0.25);
  text-align: center;
}

.confirm-dialog__title {
  margin: 0 0 8px;
  font-size: 18px;
  color: var(--color-text, #1f2933);
}

.confirm-dialog__message {
  margin: 0 0 20px;
  color: var(--color-muted, #7b8794);
  font-size: 14px;
  line-height: 1.6;
}

.confirm-dialog__actions {
  display: flex;
  gap: 10px;
}

.confirm-dialog__button {
  flex: 1;
  padding: 10px 0;
  border-radius: 8px;
  border: 1px solid #d9dee5;
  background: #ffffff;
  color: var(--color-text, #1f2933);
  cursor: pointer;
  font-size: 15px;
}

.confirm-dialog__button.is-cancel:hover {
  background: #f1f3f5;
}

.confirm-dialog__button.is-confirm {
  border-color: #c92a2a;
  background: #c92a2a;
  color: #ffffff;
}

.confirm-dialog__button.is-confirm:hover {
  background: #a61e1e;
}
</style>
