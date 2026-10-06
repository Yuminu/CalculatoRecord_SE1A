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
        title: '清空全部历史',
        message: '确定要清空所有历史记录吗？',
      },
    });
    expect(wrapper.text()).toContain('确定要清空所有历史记录吗？');

    await wrapper.find('.is-confirm').trigger('click');
    expect(wrapper.emitted('confirm')).toBeTruthy();

    await wrapper.find('.is-cancel').trigger('click');
    expect(wrapper.emitted('cancel')).toBeTruthy();
  });
});
