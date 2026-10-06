/**
 * Unit tests for the Pinia calculator store.
 */
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';

vi.mock('../src/api', () => ({
  calculateExpression: vi.fn(),
  fetchHistory: vi.fn(),
  deleteHistoryRecord: vi.fn(),
  clearHistory: vi.fn(),
  checkHealth: vi.fn(),
  toggleFavorite: vi.fn(),
}));

import * as api from '../src/api';
import { useCalculatorStore } from '../src/store/calculator';

describe('calculator store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.clearAllMocks();
    api.fetchHistory.mockResolvedValue({ data: { data: [], total: 0 } });
  });

  it('appends, backspaces and clears the expression', () => {
    const store = useCalculatorStore();
    store.appendInput('1');
    store.appendInput('+');
    store.appendInput('2');
    expect(store.expression).toBe('1+2');

    store.backspace();
    expect(store.expression).toBe('1+');

    store.clearExpression();
    expect(store.expression).toBe('');
  });

  it('stores the result after a successful calculation', async () => {
    const store = useCalculatorStore();
    store.setExpression('1+2');
    api.calculateExpression.mockResolvedValue({
      data: { success: true, result: 3 },
    });

    const response = await store.calculate();

    expect(response.ok).toBe(true);
    expect(store.result).toBe(3);
    expect(api.calculateExpression).toHaveBeenCalledWith('1+2');
  });

  it('rejects illegal characters before calling the API', async () => {
    const store = useCalculatorStore();
    store.setExpression('1+$2');

    const response = await store.calculate();

    expect(response.ok).toBe(false);
    expect(response.message).toBe('Expression contains illegal characters.');
    expect(api.calculateExpression).not.toHaveBeenCalled();
  });

  it('reports a network error when the request fails', async () => {
    const store = useCalculatorStore();
    store.setExpression('1+2');
    api.calculateExpression.mockRejectedValue(new Error('network'));

    const response = await store.calculate();

    expect(response.ok).toBe(false);
    expect(response.message).toBe(
      'Network error. Please check that the backend service is running.',
    );
  });

  it('shows the backend message for a 400 response', async () => {
    const store = useCalculatorStore();
    store.setExpression('1/0');
    api.calculateExpression.mockRejectedValue({
      response: { status: 400, data: { message: 'Division by zero' } },
    });

    const response = await store.calculate();

    expect(response.ok).toBe(false);
    expect(response.message).toBe('Division by zero');
  });

  it('toggles a favorite and refreshes the lists', async () => {
    const store = useCalculatorStore();
    api.toggleFavorite.mockResolvedValue({
      data: { success: true, is_favorite: true },
    });

    const response = await store.toggleFavorite(5);

    expect(response.ok).toBe(true);
    expect(api.toggleFavorite).toHaveBeenCalledWith(5);
    expect(api.fetchHistory).toHaveBeenCalled();
  });

  it('loads the favorites list from the backend', async () => {
    const store = useCalculatorStore();
    api.fetchHistory.mockResolvedValue({
      data: { data: [{ id: 1, is_favorite: true }], total: 1 },
    });

    await store.fetchFavorites();

    expect(api.fetchHistory).toHaveBeenCalledWith({
      favorite: true,
      limit: 20,
    });
    expect(store.favorites).toHaveLength(1);
    expect(store.favoritesTotal).toBe(1);
  });
});
