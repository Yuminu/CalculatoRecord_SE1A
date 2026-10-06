<template>
  <section class="favorites">
    <header class="favorites__header">
      <h1 class="favorites__title">Favorites</h1>
      <span class="favorites__count">
        {{ store.favoritesTotal }} records
      </span>
    </header>

    <p v-if="store.favorites.length === 0" class="favorites__empty">
      No favorites yet
    </p>

    <ul v-else class="favorites__list">
      <li
        v-for="item in store.favorites"
        :key="item.id"
        class="favorites__item"
      >
        <div class="favorites__content">
          <span class="favorites__expression">{{ item.expression }}</span>
          <span class="favorites__result">= {{ item.result }}</span>
          <span class="favorites__time">{{ item.created_at }}</span>
        </div>
        <button
          type="button"
          class="favorites__star"
          title="Remove from favorites"
          @click="onToggleFavorite(item.id)"
        >
          ★
        </button>
      </li>
    </ul>
  </section>
</template>

<script setup>
/**
 * Favorites page: lists every record flagged as a favorite and lets the
 * user remove the flag by clicking the star.
 */
import { onMounted } from 'vue';
import { useCalculatorStore } from '../store/calculator';

const store = useCalculatorStore();

const onToggleFavorite = async (id) => {
  const response = await store.toggleFavorite(id);
  if (!response.ok) {
    window.alert(response.message);
  }
};

onMounted(() => {
  store.fetchFavorites();
});
</script>

<style scoped>
.favorites {
  background: var(--color-panel);
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 4px 18px rgba(31, 41, 51, 0.08);
}

.favorites__header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 12px;
}

.favorites__title {
  margin: 0;
  font-size: 20px;
}

.favorites__count {
  color: var(--color-muted);
  font-size: 13px;
}

.favorites__empty {
  color: var(--color-muted);
  text-align: center;
  padding: 32px 0;
}

.favorites__list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.favorites__item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  padding: 10px 0;
  border-bottom: 1px solid #eef1f6;
}

.favorites__content {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.favorites__expression {
  font-size: 15px;
  color: var(--color-text);
  word-break: break-all;
}

.favorites__result {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-primary-dark);
}

.favorites__time {
  font-size: 12px;
  color: var(--color-muted);
}

.favorites__star {
  border: none;
  border-radius: 6px;
  padding: 6px 10px;
  font-size: 16px;
  cursor: pointer;
  background: #fff9db;
  color: #f59f00;
}

.favorites__star:hover {
  background: #ffec99;
}
</style>
