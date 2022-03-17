import {
  RVAccountingProviders,
  RVDateFilters,
  RVFilter,
  RVOptions,
  RVReportFrequency,
  RVReportTypes,
} from '../../types';
import {
  getConfiguration,
  getDateFilter,
  parseFilter,
  getOptions,
  validateBusinessParams,
  validateReportFrequencyParams,
  validateRequiredParams,
} from '../chart.utils';

describe('Chart Utils Helper', () => {
  describe('getConfiguration', () => {
    describe('using non object', () => {
      describe('failure path', () => {
        test('returns undefined due to integer passed in string', async () => {
          expect(getConfiguration('1')).toBeUndefined();
        });

        test('returns undefined due to plain string passed', async () => {
          expect(getConfiguration('testing param')).toBeUndefined();
        });

        test('returns undefined due to empty stringified array with passed', async () => {
          expect(getConfiguration('[]')).toBeUndefined();
        });

        test('returns undefined due to stringified array passed', async () => {
          expect(getConfiguration('["data"]')).toBeUndefined();
        });

        test('returns undefined due to empty stringified object passed', async () => {
          expect(getConfiguration('{}')).toBeUndefined();
        });

        test('returns undefined due to stringified object passed without configuration', async () => {
          expect(getConfiguration('{"tom": "works"}')).toBeUndefined();
        });

        test('returns undefined due to stringified object passed with empty configuration', async () => {
          expect(getConfiguration('{"configuration": ""}')).toBeUndefined();
        });
      });
      describe('success path', () => {
        test('returns formatted data due to the presence of configuration', async () => {
          expect(getConfiguration('{"token": "er2"}')).toStrictEqual({ token: 'er2' });
        });
      });
    });
    describe('using object', () => {
      describe('failure path', () => {
        test('returns undefined due to empty configuration', async () => {
          expect(getConfiguration({ token: '' })).toBeUndefined();
        });
      });
      describe('success path', () => {
        test('returns formatted data due to the presence of configuration', async () => {
          expect(getConfiguration({ token: 'er2' })).toStrictEqual({ token: 'er2' });
        });
      });
    });
  });

  describe('parseFilter', () => {
    describe('using non object', () => {
      describe('failure path', () => {
        test('returns undefined due to integer passed in string', async () => {
          expect(parseFilter('1')).toBeUndefined();
        });

        test('returns undefined due to plain string passed', async () => {
          expect(parseFilter('testing param')).toBeUndefined();
        });

        test('returns undefined due to empty stringified array with passed', async () => {
          expect(parseFilter('[]')).toBeUndefined();
        });

        test('returns undefined due to stringified array passed', async () => {
          expect(parseFilter('["data"]')).toBeUndefined();
        });

        test('returns undefined due to empty stringified object passed', async () => {
          expect(parseFilter('{}')).toBeUndefined();
        });

        test('returns undefined due to stringified object passed without filter', async () => {
          expect(parseFilter('{"tom": "works"}')).toBeUndefined();
        });
      });

      describe('success path', () => {
        test('returns formatted data due to the presence of filter', async () => {
          const filter: RVFilter = {
            reportType: RVReportTypes.BANK_ACCOUNT,
            businessName: 'businessName',
            serviceName: RVAccountingProviders.QUICKBOOKS,
          };

          expect(parseFilter(filter)).toStrictEqual({
            businessName: 'businessName',
            reportType: 'bankAccounts',
            serviceName: 'quickbooks',
          });
        });
      });
    });
    describe('using object', () => {
      describe('failure path', () => {
        test('returns undefined due to stringified object passed without businessName', async () => {
          const filter: RVFilter = {
            reportType: RVReportTypes.BANK_ACCOUNT,
            businessName: '',
            serviceName: RVAccountingProviders.QUICKBOOKS,
          };

          expect(parseFilter(JSON.stringify(filter))).toBeUndefined();
        });
      });

      describe('success path', () => {
        test('returns formatted data due to the presence of filter', async () => {
          const filter: RVFilter = {
            reportType: RVReportTypes.BANK_ACCOUNT,
            businessName: 'businessName',
            serviceName: RVAccountingProviders.QUICKBOOKS,
          };

          expect(parseFilter(JSON.stringify(filter))).toStrictEqual({
            businessName: 'businessName',
            reportType: 'bankAccounts',
            serviceName: 'quickbooks',
          });
        });
      });
    });
  });

  describe('validateRequiredParams', () => {
    describe('success path', () => {
      test('returns true to valid params (businessName/serviceName)', async () => {
        const filter: RVFilter = {
          reportType: RVReportTypes.BANK_ACCOUNT,
          businessName: 'businessName',
          serviceName: RVAccountingProviders.QUICKBOOKS,
        };
        expect(validateRequiredParams(filter)).toEqual(true);
      });

      test('returns true to valid params (connectionId)', async () => {
        const filter: RVFilter = {
          reportType: RVReportTypes.BANK_ACCOUNT,
          connectionId: 'connectionId',
        };
        expect(validateRequiredParams(filter)).toEqual(true);
      });
    });
  });

  describe('validateReportFrequencyParams', () => {
    describe('success path', () => {
      test('returns true for correct params', async () => {
        const filter: RVFilter = {
          reportType: RVReportTypes.BALANCE_SHEET,
          businessName: '',
          serviceName: RVAccountingProviders.QUICKBOOKS,
          reportFrequency: RVReportFrequency.MONTH,
          startDate: '2020-01-01',
          endDate: '2020-01-01',
        };
        expect(validateReportFrequencyParams(filter)).toEqual(true);
      });
    });
  });

  describe('validateBusinessParams', () => {
    describe('failure path', () => {
      test('returns false if there is not businessName', async () => {
        const filter: RVFilter = {
          reportType: RVReportTypes.BANK_ACCOUNT,
          businessName: '',
          serviceName: RVAccountingProviders.QUICKBOOKS,
        };
        expect(validateBusinessParams(filter)).toEqual(false);
      });
      test('returns false if there is not businessName', async () => {
        const filter: RVFilter = {
          reportType: RVReportTypes.BANK_ACCOUNT,
          connectionId: '',
        };
        expect(validateBusinessParams(filter)).toEqual(false);
      });
    });

    describe('success path', () => {
      test('returns true for businessName and serviceName', async () => {
        const filter: RVFilter = {
          reportType: RVReportTypes.BANK_ACCOUNT,
          businessName: 'businessNames',
          serviceName: RVAccountingProviders.QUICKBOOKS,
        };
        expect(validateBusinessParams(filter)).toEqual(true);
      });

      test('returns true for connectionId', async () => {
        const filter: RVFilter = {
          reportType: RVReportTypes.BANK_ACCOUNT,
          connectionId: 'connectionId',
        };
        expect(validateBusinessParams(filter)).toEqual(true);
      });
    });
  });

  describe('getOptions', () => {
    describe('failure path', () => {
      test('returns undefined due to plain string passed', async () => {
        expect(getOptions('testing param')).toBeUndefined();
      });
    });

    describe('success path', () => {
      test('returns formatted data due to the presence of filter', async () => {
        const options: RVOptions = {
          container: {
            style: {},
          },
          title: {
            text: 'title',
            style: {},
          },
          chart: {},
          bar: {},
          loadingIndicator: {},
          errorIndicator: {},
        };
        expect(getOptions(options)).toEqual({
          bar: {},
          chart: {},
          container: { style: {} },
          errorIndicator: {},
          loadingIndicator: {},
          title: { style: {}, text: 'title' },
        });
      });
    });
  });

  describe('getDateFilter', () => {
    describe('using non object', () => {
      describe('failure path', () => {
        test('returns undefined due to integer passed in string', async () => {
          expect(getDateFilter('1')).toBeUndefined();
        });

        test('returns undefined due to plain string passed', async () => {
          expect(getDateFilter('testing param')).toBeUndefined();
        });

        test('returns undefined due to empty stringified array with passed', async () => {
          expect(getDateFilter('[]')).toBeUndefined();
        });

        test('returns undefined due to stringified array passed', async () => {
          expect(getDateFilter('["data"]')).toBeUndefined();
        });

        test('returns undefined due to empty stringified object passed', async () => {
          expect(getDateFilter('{}')).toBeUndefined();
        });

        test('returns undefined due to stringified object passed without filter', async () => {
          expect(getDateFilter('{"tom": "works"}')).toBeUndefined();
        });

        test('returns undefined for the same date', async () => {
          const filter: RVDateFilters = {
            reportType: RVReportTypes.BALANCE_SHEET,
            businessName: 'businessName',
            serviceName: RVAccountingProviders.QUICKBOOKS,
            reportFrequency: RVReportFrequency.MONTH,
            startDate: '2020-01-01',
            endDate: '2020-01-01',
          };
          expect(getDateFilter(filter)).toBeUndefined();
        });

        test('returns undefined for startDate after than endDate', async () => {
          const filter: RVDateFilters = {
            reportType: RVReportTypes.BALANCE_SHEET,
            businessName: 'businessName',
            serviceName: RVAccountingProviders.QUICKBOOKS,
            reportFrequency: RVReportFrequency.MONTH,
            startDate: '2020-01-02',
            endDate: '2020-01-01',
          };
          expect(getDateFilter(filter)).toBeUndefined();
        });
      });

      describe('success path', () => {
        test('returns formatted data due to the presence of filter', async () => {
          const filter: RVDateFilters = {
            reportType: RVReportTypes.BALANCE_SHEET,
            businessName: 'businessName',
            serviceName: RVAccountingProviders.QUICKBOOKS,
            reportFrequency: RVReportFrequency.MONTH,
            startDate: '2020-01-01',
            endDate: '2020-01-02',
          };
          expect(getDateFilter(filter)).toStrictEqual({
            businessName: 'businessName',
            reportType: RVReportTypes.BALANCE_SHEET,
            serviceName: 'quickbooks',
            reportFrequency: RVReportFrequency.MONTH,
            startDate: '2020-01-01',
            endDate: '2020-01-02',
          });
        });
      });
    });
    describe('using object', () => {
      describe('failure path', () => {
        test('returns undefined due to stringified object passed without businessName', async () => {
          // const filter: RVFilter = {
          //   reportType: RVReportTypes.BANK_ACCOUNT,
          //   businessName: '',
          //   serviceName: RVAccountingProviders.QUICKBOOKS,
          // };
          // expect(parseFilter(JSON.stringify(filter))).toBeUndefined();
        });
      });

      describe('success path', () => {
        test('returns formatted data due to the presence of filter', async () => {
          // const filter: RVFilter = {
          //   reportType: RVReportTypes.BANK_ACCOUNT,
          //   businessName: 'businessName',
          //   serviceName: RVAccountingProviders.QUICKBOOKS,
          // };
          // expect(parseFilter(JSON.stringify(filter))).toStrictEqual({
          //   businessName: 'businessName',
          //   reportType: 'bankAccounts',
          //   serviceName: 'quickbooks',
          // });
        });
      });
    });
  });
});
