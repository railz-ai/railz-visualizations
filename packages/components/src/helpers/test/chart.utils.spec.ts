import { RVAccountingProviders, RVOptions, RVReportFrequency, RVReportTypes } from '../../types';
import {
  getConfiguration,
  getOptions,
  validateReportFrequencyParams,
  validateRequiredParams,
  getFilter,
  validateBusinessServiceNameParams,
  validateDateParams,
  validateReportTypeParams,
} from '../chart.utils';
import {
  RVFilterBalanceSheet,
  RVFilterBankAccount,
  RVFilterAll,
} from '../../types/interface/filter';

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

  describe('getFilter', () => {
    describe('using non object', () => {
      describe('failure path', () => {
        test('returns undefined due to plain string passed', async () => {
          expect(getFilter('testing param')).toBeUndefined();
        });
        test('returns undefined due to no data', async () => {
          expect(getFilter(null)).toBeUndefined();
        });
      });

      describe('success path', () => {
        test('returns formatted data due to the presence of filter', async () => {
          const filter: RVFilterBankAccount = {
            reportType: RVReportTypes.BANK_ACCOUNT,
            connectionUuid: 'CON-1234',
          };

          expect(getFilter(filter as RVFilterAll)).toStrictEqual({
            reportType: 'bankAccounts',
            connectionUuid: 'CON-1234',
          });
        });
      });
    });
    describe('using object', () => {
      describe('success path', () => {
        test('returns formatted data due to the presence of filter', async () => {
          const filter: RVFilterBankAccount = {
            reportType: RVReportTypes.BANK_ACCOUNT,
            connectionUuid: 'CON-1234',
          };

          expect(getFilter(JSON.stringify(filter))).toStrictEqual({
            connectionUuid: 'CON-1234',
            reportType: 'bankAccounts',
          });
        });
      });
    });
  });

  describe('validateRequiredParams', () => {
    describe('success path', () => {
      test('returns true to valid params (businessName/serviceName)', async () => {
        const filter: RVFilterBankAccount = {
          reportType: RVReportTypes.BANK_ACCOUNT,
          connectionUuid: 'CON-1234',
        };
        expect(validateRequiredParams(filter as RVFilterAll)).toEqual(true);
      });

      // TODO: When connection is ready on web-backend
      // test('returns true to valid params (connectionUuid)', async () => {
      //   const filter: RVFilterBankAccount = {
      //     reportType: RVReportTypes.BANK_ACCOUNT,
      //     // connectionUuid: 'connectionUuid',
      //   };
      //   expect(validateRequiredParams(filter)).toEqual(true);
      // });
    });
  });

  describe('validateReportFrequencyParams', () => {
    describe('success path', () => {
      test('returns true for correct params', async () => {
        const filter: RVFilterBalanceSheet = {
          reportType: RVReportTypes.BALANCE_SHEET,
          connectionUuid: 'CON-1234',
          reportFrequency: RVReportFrequency.MONTH,
          startDate: '2020-01-01',
          endDate: '2020-01-01',
        };
        expect(validateReportFrequencyParams(filter as RVFilterAll)).toEqual(true);
      });
    });
    describe('failure path', () => {
      test('returns false for no report frequency for required report type', async () => {
        const filter: RVFilterBalanceSheet = {
          reportType: RVReportTypes.BALANCE_SHEET,
          connectionUuid: 'CON-1234',
          reportFrequency: null,
          startDate: '2020-01-01',
          endDate: '2020-01-01',
        };
        expect(validateReportFrequencyParams(filter as RVFilterAll)).toEqual(false);
      });
    });
  });
  describe('validateReportTypeParams', () => {
    describe('success path', () => {
      test('returns true for correct params', async () => {
        const filter: RVFilterBalanceSheet = {
          reportType: RVReportTypes.BALANCE_SHEET,
          connectionUuid: 'CON-1234',
          reportFrequency: RVReportFrequency.MONTH,
          startDate: '2020-01-01',
          endDate: '2020-01-01',
        };
        expect(validateReportTypeParams(filter as RVFilterAll)).toEqual(true);
      });
    });
    describe('failure path', () => {
      test('returns false for wrong report type', async () => {
        const filter: RVFilterAll = {
          reportType: 'wrongReportType',
          connectionUuid: 'CON-1234',
          reportFrequency: null,
          startDate: '2020-01-01',
          endDate: '2020-01-01',
        } as unknown as RVFilterAll;
        expect(validateReportTypeParams(filter)).toEqual(false);
      });
    });
  });

  describe('validateConnectionUuidParams', () => {
    describe('failure path', () => {
      test('returns false if there is not connectionUuid', async () => {
        const filter: RVFilterBankAccount = {
          reportType: RVReportTypes.BANK_ACCOUNT,
        };
        expect(validateBusinessServiceNameParams(filter as RVFilterAll)).toEqual(false);
      });
    });

    describe('success path', () => {
      test('returns true for businessName and serviceName', async () => {
        const filter: RVFilterBankAccount = {
          reportType: RVReportTypes.BANK_ACCOUNT,
          connectionUuid: 'CON-1234',
        };
        expect(validateBusinessServiceNameParams(filter as RVFilterAll)).toEqual(true);
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
          title: { style: {} },
        });
      });
    });
  });

  describe('getFilter', () => {
    describe('using non object', () => {
      describe('failure path', () => {
        test('returns undefined due to plain string passed', async () => {
          expect(getFilter('testing param')).toBeUndefined();
        });
      });

      describe('success path', () => {
        test('returns formatted data due to the presence of filter', async () => {
          const filter: RVFilterBalanceSheet = {
            reportType: RVReportTypes.BALANCE_SHEET,
            connectionUuid: 'CON-1234',
            reportFrequency: RVReportFrequency.MONTH,
            startDate: '2020-01-01',
            endDate: '2020-01-02',
          };
          expect(getFilter(filter as RVFilterAll)).toStrictEqual({
            connectionUuid: 'CON-1234',
            reportType: RVReportTypes.BALANCE_SHEET,
            reportFrequency: RVReportFrequency.MONTH,
            startDate: '2020-01-01',
            endDate: '2020-01-02',
          });
        });
      });
    });
  });

  describe('validateDateParams', () => {
    describe('success path', () => {
      test('returns true for correct date', async () => {
        const filter: RVFilterBalanceSheet = {
          reportType: RVReportTypes.BALANCE_SHEET,
          connectionUuid: 'CON-1234',

          reportFrequency: RVReportFrequency.MONTH,
          startDate: '2020-01-01',
          endDate: '2020-01-02',
        };
        expect(validateDateParams(filter as RVFilterAll)).toEqual(true);
      });

      test('returns true for other correct date', async () => {
        const filter: RVFilterBalanceSheet = {
          reportType: RVReportTypes.BALANCE_SHEET,
          connectionUuid: 'CON-1234',
          reportFrequency: RVReportFrequency.MONTH,
          startDate: '2020-01-01',
          endDate: '2022-01-01',
        };
        expect(validateDateParams(filter as RVFilterAll)).toEqual(true);
      });
    });

    describe('failure path', () => {
      test('returns false for the same date', async () => {
        const filter: RVFilterBalanceSheet = {
          reportType: RVReportTypes.BALANCE_SHEET,
          connectionUuid: 'CON-1234',
          reportFrequency: RVReportFrequency.MONTH,
          startDate: '2020-01-01',
          endDate: '2020-01-01',
        };
        expect(validateDateParams(filter as RVFilterAll)).toEqual(false);
      });

      test('returns false for startDate after than endDate', async () => {
        const filter: RVFilterBalanceSheet = {
          reportType: RVReportTypes.BALANCE_SHEET,
          connectionUuid: 'CON-1234',
          reportFrequency: RVReportFrequency.MONTH,
          startDate: '2020-01-02',
          endDate: '2020-01-01',
        };
        expect(validateDateParams(filter as RVFilterAll)).toEqual(false);
      });
      test('returns false if no startDate and endDate', async () => {
        const filter: RVFilterBalanceSheet = {
          reportType: RVReportTypes.BALANCE_SHEET,
          connectionUuid: 'CON-1234',
          reportFrequency: RVReportFrequency.MONTH,
          startDate: null,
          endDate: null,
        };
        expect(validateDateParams(filter as RVFilterAll)).toEqual(false);
      });
    });
  });
});
