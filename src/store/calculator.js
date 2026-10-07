/**
 * Pinia store that holds the calculator expression, result and history.
 *
 * All calculation requests go through the backend API; the front end
 * never computes an expression locally.
 */
import { defineStore } from 'pinia';
import {
  calculateExpression,
  fetchHistory,
  deleteHistoryRecord,
  clearHistory as clearHistoryApi,
  toggleFavorite as toggleFavoriteApi,
} from '../api';

const ALLOWED_PATTERN = /^[0-9+\-*/().]*$/;

const MESSAGE = {
  network: 'Network error. Please check that the backend service is running.',
  server: 'Server error. Please try again later.',
  illegal: 'Expression contains illegal characters.',
  empty: 'Expression cannot be empty.',
  fallback: 'Request failed.',
};

export const useCalculatorStore = defineStore('calculator', {
  state: () => ({
    expression: '',
    result: null,
    history: [],
    total: 0,
    favorites: [],
    favoritesTotal: 0,
    loading: false,
  }),

  actions: {
    /** Replace the whole expression (used by the input field). */
    setExpression(value) {
      this.expression = value;
    },

    /** Append a token coming from a calculator button. */
    appendInput(token) {
      this.expression = `${this.expression}${token}`;
    },

    /** Clear the expression. */
    clearExpression() {
      this.expression = '';
    },

    /** Remove the last character of the expression. */
    backspace() {
      this.expression = this.expression.slice(0, -1);
    },

    /** Return true when the expression contains illegal characters. */
    hasIllegalCharacters() {
      return !ALLOWED_PATTERN.test(this.expression);
    },

    /** Map a failed request into a user-facing message. */
    resolveErrorMessage(error) {
      if (!error || !error.response) {
        return MESSAGE.network;
      }
      const { status, data } = error.response;
      // 502/503/504 mean the reverse proxy could not reach the backend.
      if ([502, 503, 504].includes(status)) {
        return MESSAGE.network;
      }
      if (status >= 500) {
        return MESSAGE.server;
      }
      if (data && data.message) {
        return data.message;
      }
      return MESSAGE.fallback;
    },

    /**
     * Validate locally, send the expression to the backend, then refresh
     * the history list.
     *
     * @returns {Promise<{ok: boolean, message?: string, data?: object}>}
     */
    async calculate() {
      if (this.expression.trim() === '') {
        return { ok: false, message: MESSAGE.empty };
      }
      if (this.hasIllegalCharacters()) {
        return { ok: false, message: MESSAGE.illegal };
      }
      this.loading = true;
      try {
        const { data } = await calculateExpression(this.expression);
        this.result = data.result;
        await this.fetchHistory();
        return { ok: true, data };
      } catch (error) {
        return { ok: false, message: this.resolveErrorMessage(error) };
      } finally {
        this.loading = false;
      }
    },

    /** Load the history list from the backend. */
    async fetchHistory() {
      try {
        const { data } = await fetchHistory({ limit: 20 });
        this.history = data.data;
        this.total = data.total;
      } catch (error) {
        // History refresh failures must not interrupt the user.
        this.history = [];
      }
    },

    /** Load only the favorite records from the backend. */
    async fetchFavorites() {
      try {
        const { data } = await fetchHistory({
          favorite: true,
          limit: 20,
        });
        this.favorites = data.data;
        this.favoritesTotal = data.total;
      } catch (error) {
        // Favorites refresh failures must not interrupt the user.
        this.favorites = [];
      }
    },

    /** Delete one record and refresh the list. */
    async removeHistory(id) {
      try {
        await deleteHistoryRecord(id);
        await this.fetchHistory();
        return { ok: true };
      } catch (error) {
        return { ok: false, message: this.resolveErrorMessage(error) };
      }
    },

    /** Delete every record and refresh the list. */
    async clearAllHistory() {
      try {
        await clearHistoryApi();
        await this.fetchHistory();
        return { ok: true };
      } catch (error) {
        return { ok: false, message: this.resolveErrorMessage(error) };
      }
    },

    /**
     * Toggle the favorite flag of one record and refresh both lists.
     *
     * @returns {Promise<{ok: boolean, message?: string, data?: object}>}
     */
    async toggleFavorite(id) {
      try {
        const { data } = await toggleFavoriteApi(id);
        await Promise.all([this.fetchHistory(), this.fetchFavorites()]);
        return { ok: true, data };
      } catch (error) {
        return { ok: false, message: this.resolveErrorMessage(error) };
      }
    },
  },
});
