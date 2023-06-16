import { checkAccessibility } from '../accessibility';

describe('Accessibility Helper Tests', () => {
  describe('Accessibility check', () => {
    describe('Failure Path', () => {
      test('Test with null codes', async () => {
        expect(checkAccessibility(null, null)).toEqual(false);
      });

      test('Test with invalid color code', async () => {
        expect(checkAccessibility('betty', 'alphabets')).toEqual(false);
      });

      test('Test with one empty color code', async () => {
        expect(checkAccessibility('red', '')).toEqual(false);
      });

      test('Test it is false when color pass only AA', async () => {
        expect(checkAccessibility('#FF6600', '#2E2E2E', 'Failed for legend')).toEqual(false);
      });
    });
    describe('Success Path', () => {
      test('Test with accessibile color codes', async () => {
        expect(checkAccessibility('#0000FF', '#FFFFFF')).toEqual(true);
      });

      test('Test with lighter background and darker foreground', async () => {
        expect(checkAccessibility('#ffffff', '#000000')).toEqual(true);
      });

      test('Test with another set of colors', async () => {
        expect(checkAccessibility('#570101', '#f8b8b8')).toEqual(true);
      });
    });
  });
});
