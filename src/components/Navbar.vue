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
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  padding: 16px 0;
}

.navbar__brand {
  font-size: 20px;
  font-weight: 600;
  color: var(--color-primary-dark);
}

.navbar__links {
  display: flex;
  gap: 8px;
}

.navbar__link {
  padding: 6px 12px;
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
  color: #ffffff;
}
</style>
