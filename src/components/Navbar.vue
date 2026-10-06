<template>
  <nav class="navbar">
    <span class="navbar__brand">Web Calculator</span>
    <div class="navbar__links">
      <router-link class="navbar__link" to="/">Calculator</router-link>
      <router-link class="navbar__link" to="/favorites">
        Favorites
      </router-link>
    </div>
  </nav>
</template>

<script setup>
/**
 * Top navigation bar with links to the calculator and favorites pages.
 * No props or emits are needed; the router drives navigation.
 */
</script>

<style scoped>
.navbar {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: 0 auto;
  padding: 24px 0 12px;
}

.navbar__brand {
  text-align: center;
  font-size: 34px;
  font-weight: 700;
  color: var(--color-primary-dark);
}

.navbar__links {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

.navbar__link {
  padding: 6px 12px;
  border: 1px solid #d9dee5;
  border-radius: 8px;
  color: var(--color-text);
  text-decoration: none;
  font-size: 15px;
}

.navbar__link:hover {
  background: #eef1f6;
}

.navbar__link.router-link-active {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: #ffffff;
}
</style>
