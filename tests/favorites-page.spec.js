/**
 * Tests for the favorites page.
 */
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { flushPromises, mount } from '@vue/test-utils';

vi.mock('../src/api', () => ({
  calculateExpression: vi.fn(),
  fetchHistory: vi.fn(),
  deleteHistoryRecord: vi.fn(),
  clearHistory: vi.fn(),
  checkHealth: vi.fn(),
  toggleFavorite: vi.fn(),
}));

import * as api from '../src/api';
import FavoritesPage from '../src/views/FavoritesPage.vue';

describe('FavoritesPage', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.clearAllMocks();
  });

  it('shows an empty state when there are no favorites', async () => {
    api.fetchHistory.mockResolvedValue({ data: { data: [], total: 0 } });

    const wrapper = mount(FavoritesPage);
    await flushPromises();

    expect(wrapper.text()).toContain('No favorites yet');
  });

  it('renders the favorite records', async () => {
    api.fetchHistory.mockResolvedValue({
      data: {
        data: [
          {
            id: 1,
            expression: '1+2',
            result: 3,
            is_favorite: true,
            created_at: '2026-01-01 00:00:00',
          },
        ],
        total: 1,
      },
    });

    const wrapper = mount(FavoritesPage);
    await flushPromises();

    expect(wrapper.text()).toContain('1+2');
    expect(wrapper.find('.favorites__star').text()).toBe('★');
  });
});
