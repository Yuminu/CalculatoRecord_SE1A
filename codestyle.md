This code style is based on: Airbnb JavaScript Style Guide and Vue.js Official Style Guide (https://github.com/airbnb/javascript , https://vuejs.org/style-guide/)

# Front-end Code Style (Vue 3 / JavaScript)

The code in this repository follows the
[Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript) and
the [Vue.js Official Style Guide](https://vuejs.org/style-guide/),
combined with the project practices below.

## 1. Variables and Functions

- Use `const` / `let`; `var` is **forbidden**.
- Use arrow functions for callbacks.
- Function and variable names use `camelCase` (e.g. `fetchHistory`).
- Constants use `UPPER_SNAKE_CASE` (e.g. `ALLOWED_PATTERN`).

## 2. Naming and Files

- Component names use `PascalCase` (e.g. `Calculator.vue`).
- Plain JS files use `kebab-case` / lowercase (e.g. `keyMapping.js` as
  required by the specification).
- Vue components prefer the `<script setup>` Composition API.

## 3. Component Conventions

- Every component must declare clear `props` and `emits`.
- Use `defineProps` / `defineEmits` to declare interfaces and types
  explicitly.
- Component styles use `<style scoped>`; global variables are defined in
  `:root`.

## 4. API Requests

- Always use the Axios instance wrapped in `src/api/index.js`; never
  import bare `axios` inside a component.
- Environment-specific configuration is injected through `VITE_`-prefixed
  environment variables.

## 5. Formatting

- Use 2 spaces for indentation.
- End statements with a semicolon.
- Use single quotes for strings.
- Keep trailing commas at the end of objects and arrays (multi-line).
- No line longer than 100 characters.

## 6. Security

- The front end performs **no** expression calculation; everything is
  handled by the backend.
- It is **forbidden** to use `eval` / `new Function` on user input in the
  front end.
- User-facing errors should use clear wording, with distinct network and
  server error messages.
