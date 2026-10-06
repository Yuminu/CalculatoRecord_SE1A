<template>
  <section class="calculator">
    <div class="calculator__display">
      <input
        class="calculator__input"
        type="text"
        :value="expression"
        placeholder="Enter an expression, e.g. (1+2)*3"
        aria-label="Expression input"
        @input="onInput"
        @keyup.enter="emit('calculate')"
      />
      <div class="calculator__result">
        <span class="calculator__result-label">Result</span>
        <span class="calculator__result-value">{{ displayResult }}</span>
      </div>
    </div>

    <div class="calculator__keys">
      <button
        v-for="key in keys"
        :key="key.label"
        type="button"
        class="calculator__key"
        :class="key.className"
        :disabled="loading && key.action === 'calculate'"
        @click="onKeyClick(key)"
      >
        {{ key.label }}
      </button>
    </div>
  </section>
</template>

<script setup>
/**
 * Calculator keypad component.
 *
 * Purely presentational: it receives the expression/result via props and
 * emits an updated expression or a calculate request. All real work is
 * done in the Pinia store and the backend.
 */
import { computed } from 'vue';

const props = defineProps({
  expression: { type: String, default: '' },
  result: { type: [Number, String], default: null },
  loading: { type: Boolean, default: false },
});

const emit = defineEmits(['update:expression', 'calculate']);

const keys = [
  { label: 'C', action: 'clear', className: 'is-function' },
  { label: 'DEL', action: 'backspace', className: 'is-function' },
  { label: '(', action: 'append', value: '(', className: 'is-function' },
  { label: ')', action: 'append', value: ')', className: 'is-function' },
  { label: '7', action: 'append', value: '7' },
  { label: '8', action: 'append', value: '8' },
  { label: '9', action: 'append', value: '9' },
  { label: '/', action: 'append', value: '/', className: 'is-operator' },
  { label: '4', action: 'append', value: '4' },
  { label: '5', action: 'append', value: '5' },
  { label: '6', action: 'append', value: '6' },
  { label: '*', action: 'append', value: '*', className: 'is-operator' },
  { label: '1', action: 'append', value: '1' },
  { label: '2', action: 'append', value: '2' },
  { label: '3', action: 'append', value: '3' },
  { label: '-', action: 'append', value: '-', className: 'is-operator' },
  { label: '0', action: 'append', value: '0' },
  { label: '.', action: 'append', value: '.' },
  { label: '+', action: 'append', value: '+', className: 'is-operator' },
  { label: '=', action: 'calculate', className: 'is-equals' },
];

const displayResult = computed(() =>
  props.result === null ? '—' : props.result,
);

const onInput = (event) => {
  emit('update:expression', event.target.value);
};

const onKeyClick = (key) => {
  if (key.action === 'clear') {
    emit('update:expression', '');
  } else if (key.action === 'backspace') {
    emit('update:expression', props.expression.slice(0, -1));
  } else if (key.action === 'append') {
    emit('update:expression', `${props.expression}${key.value}`);
  } else if (key.action === 'calculate') {
    emit('calculate');
  }
};
</script>

<style scoped>
.calculator {
  background: var(--color-panel);
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 4px 18px rgba(31, 41, 51, 0.08);
}

.calculator__display {
  margin-bottom: 12px;
}

.calculator__input {
  width: 100%;
  box-sizing: border-box;
  padding: 12px;
  font-size: 20px;
  text-align: right;
  border: 1px solid #d9dee5;
  border-radius: 8px;
  outline: none;
}

.calculator__input:focus {
  border-color: var(--color-primary);
}

.calculator__result {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 10px 12px 0;
}

.calculator__result-label {
  color: var(--color-muted);
  font-size: 13px;
}

.calculator__result-value {
  font-size: 26px;
  font-weight: 600;
  color: var(--color-primary-dark);
  word-break: break-all;
}

.calculator__keys {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
}

.calculator__key {
  padding: 14px 0;
  font-size: 18px;
  border: none;
  border-radius: 8px;
  background: #eef1f6;
  color: var(--color-text);
  cursor: pointer;
  transition: background 0.15s ease;
}

.calculator__key:hover {
  background: #e2e8f0;
}

.calculator__key.is-operator {
  background: #dbe4ff;
  color: var(--color-primary-dark);
}

.calculator__key.is-function {
  background: #e6e9ef;
  color: #52606d;
}

.calculator__key.is-equals {
  background: var(--color-primary);
  color: #ffffff;
}

.calculator__key.is-equals:hover {
  background: var(--color-primary-dark);
}

.calculator__key:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
