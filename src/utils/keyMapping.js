/**
 * Keyboard shortcut mapping (reserved for a future feature).
 *
 * Requirements section 6.5 / 14 reserve this file. The global keyboard
 * listener is intentionally not wired up yet; once implemented it will
 * translate key presses into calculator actions using this map.
 */
export const keyMapping = {
  0: { action: 'append', value: '0' },
  1: { action: 'append', value: '1' },
  2: { action: 'append', value: '2' },
  3: { action: 'append', value: '3' },
  4: { action: 'append', value: '4' },
  5: { action: 'append', value: '5' },
  6: { action: 'append', value: '6' },
  7: { action: 'append', value: '7' },
  8: { action: 'append', value: '8' },
  9: { action: 'append', value: '9' },
  '.': { action: 'append', value: '.' },
  '+': { action: 'append', value: '+' },
  '-': { action: 'append', value: '-' },
  '*': { action: 'append', value: '*' },
  '/': { action: 'append', value: '/' },
  '(': { action: 'append', value: '(' },
  ')': { action: 'append', value: ')' },
  Enter: { action: 'calculate' },
  Escape: { action: 'clear' },
  Backspace: { action: 'backspace' },
};

export default keyMapping;
