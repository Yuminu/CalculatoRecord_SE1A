/**
 * Component tests for the in-page confirmation dialog.
 */
import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import ConfirmDialog from '../src/components/ConfirmDialog.vue';

describe('ConfirmDialog component', () => {
  it('renders nothing when not visible', () => {
    const wrapper = mount(ConfirmDialog, { props: { visible: false } });
    expect(wrapper.find('.confirm-dialog').exists()).toBe(false);
  });

  it('shows the message and emits confirm / cancel', async () => {
    const wrapper = mount(ConfirmDialog, {
      props: {
        visible: true,
        title: 'Clear All History',
        message: 'Are you sure you want to clear all history?',
      },
    });
    expect(wrapper.text()).toContain(
      'Are you sure you want to clear all history?',
    );

    await wrapper.find('.is-confirm').trigger('click');
    expect(wrapper.emitted('confirm')).toBeTruthy();

    await wrapper.find('.is-cancel').trigger('click');
    expect(wrapper.emitted('cancel')).toBeTruthy();
  });
});
