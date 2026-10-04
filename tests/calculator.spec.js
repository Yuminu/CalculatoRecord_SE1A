/**
 * Component tests for the Calculator keypad.
 */
import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import Calculator from '../src/components/Calculator.vue';

const findButton = (wrapper, label) =>
  wrapper.findAll('button').find((button) => button.text() === label);

describe('Calculator component', () => {
  it('renders the current expression and result', () => {
    const wrapper = mount(Calculator, {
      props: { expression: '1+2', result: 3 },
    });
    expect(wrapper.find('input').element.value).toBe('1+2');
    expect(wrapper.text()).toContain('3');
  });

  it('emits calculate when the equals key is clicked', async () => {
    const wrapper = mount(Calculator, { props: { expression: '1+2' } });
    await findButton(wrapper, '=').trigger('click');
    expect(wrapper.emitted('calculate')).toBeTruthy();
  });

  it('appends a token when a digit key is clicked', async () => {
    const wrapper = mount(Calculator, { props: { expression: '1' } });
    await findButton(wrapper, '7').trigger('click');
    expect(wrapper.emitted('update:expression')[0]).toEqual(['17']);
  });

  it('clears the expression when C is clicked', async () => {
    const wrapper = mount(Calculator, { props: { expression: '12+3' } });
    await findButton(wrapper, 'C').trigger('click');
    expect(wrapper.emitted('update:expression')[0]).toEqual(['']);
  });
});
