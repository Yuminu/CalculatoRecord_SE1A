/**
 * Component tests for the history panel favorite button.
 */
import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import HistoryPanel from '../src/components/HistoryPanel.vue';

const record = (overrides = {}) => ({
  id: 1,
  expression: '1+1',
  result: 2,
  is_favorite: false,
  created_at: '2026-01-01 00:00:00',
  ...overrides,
});

describe('HistoryPanel favorite button', () => {
  it('shows a hollow star and emits toggle-favorite when clicked', async () => {
    const wrapper = mount(HistoryPanel, {
      props: { history: [record({ id: 7 })], total: 1 },
    });

    const star = wrapper.find('.history__favorite');
    expect(star.text()).toBe('☆');

    await star.trigger('click');
    expect(wrapper.emitted('toggle-favorite')[0]).toEqual([7]);
  });

  it('shows a filled star for favorite records', () => {
    const wrapper = mount(HistoryPanel, {
      props: {
        history: [record({ id: 8, is_favorite: true })],
        total: 1,
      },
    });

    expect(wrapper.find('.history__favorite').text()).toBe('★');
  });
});
