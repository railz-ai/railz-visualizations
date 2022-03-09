import { getTitleByReportType } from '../utils';
import { RVReportTypes } from '../../types';
import Translations from '../../config/translations/en.json';

// TODO: write more tests
describe('Utils Helper Tests', () => {
  describe('getTitleByReportType', () => {
    describe('failure path', () => {
      test('returns empty due to unknown report type', async () => {
        expect(getTitleByReportType('balance' as unknown as RVReportTypes)).toEqual('');
      });
    });
    describe('success path', () => {
      test('returns value with correct report type', async () => {
        expect(getTitleByReportType(RVReportTypes.INCOME_STATEMENTS)).toEqual(
          Translations.INCOME_STATEMENTS,
        );
      });
    });
  });
});
