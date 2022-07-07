import { RVAccountingProviders, RVOptions, RVReportFrequency, RVReportTypes } from '../../types';
import {
  getConfiguration,
  getOptions,
  validateReportFrequencyParams,
  validateRequiredParams,
  getFilter,
  validateBusinessServiceNameParams,
  validateDateParams,
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
      });

      describe('success path', () => {
        test('returns formatted data due to the presence of filter', async () => {
          const filter: RVFilterBankAccount = {
            reportType: RVReportTypes.BANK_ACCOUNT,
            businessName: 'businessName',
            serviceName: RVAccountingProviders.QUICKBOOKS,
          };

          expect(getFilter(filter as RVFilterAll)).toStrictEqual({
            businessName: 'businessName',
            reportType: 'bankAccounts',
            serviceName: 'quickbooks',
          });
        });
      });
    });
    describe('using object', () => {
      describe('success path', () => {
        test('returns formatted data due to the presence of filter', async () => {
          const filter: RVFilterBankAccount = {
            reportType: RVReportTypes.BANK_ACCOUNT,
            businessName: 'businessName',
            serviceName: RVAccountingProviders.QUICKBOOKS,
          };

          expect(getFilter(JSON.stringify(filter))).toStrictEqual({
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
        const filter: RVFilterBankAccount = {
          reportType: RVReportTypes.BANK_ACCOUNT,
          businessName: 'businessName',
          serviceName: RVAccountingProviders.QUICKBOOKS,
        };
        expect(validateRequiredParams(filter as RVFilterAll)).toEqual(true);
      });

      // TODO: When connection is ready on web-backend
      // test('returns true to valid params (connectionId)', async () => {
      //   const filter: RVFilterBankAccount = {
      //     reportType: RVReportTypes.BANK_ACCOUNT,
      //     // connectionId: 'connectionId',
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
          businessName: '',
          serviceName: RVAccountingProviders.QUICKBOOKS,
          reportFrequency: RVReportFrequency.MONTH,
          startDate: '2020-01-01',
          endDate: '2020-01-01',
        };
        expect(validateReportFrequencyParams(filter as RVFilterAll)).toEqual(true);
      });
    });
  });

  describe('validateBusinessServiceNameParams', () => {
    describe('failure path', () => {
      test('returns false if there is not businessName', async () => {
        const filter: RVFilterBankAccount = {
          reportType: RVReportTypes.BANK_ACCOUNT,
          businessName: '',
          serviceName: RVAccountingProviders.QUICKBOOKS,
        };
        expect(validateBusinessServiceNameParams(filter as RVFilterAll)).toEqual(false);
      });
      test('returns false if there is not businessName/serviceName', async () => {
        const filter: RVFilterBankAccount = {
          reportType: RVReportTypes.BANK_ACCOUNT,
          businessName: '',
          serviceName: undefined,
        };
        expect(validateBusinessServiceNameParams(filter as RVFilterAll)).toEqual(false);
      });
      // TODO: When connection is ready on web-backend
      // test('returns false if there is not businessName', async () => {
      //   const filter: RVFilterBankAccount = {
      //     reportType: RVReportTypes.BANK_ACCOUNT,
      //     connectionId: '',
      //   };
      //   expect(validateBusinessServiceNameParams(filter)).toEqual(false);
      // });
    });

    describe('success path', () => {
      test('returns true for businessName and serviceName', async () => {
        const filter: RVFilterBankAccount = {
          reportType: RVReportTypes.BANK_ACCOUNT,
          businessName: 'businessNames',
          serviceName: RVAccountingProviders.QUICKBOOKS,
        };
        expect(validateBusinessServiceNameParams(filter as RVFilterAll)).toEqual(true);
      });

      test('returns true for businessName with no serviceName and type BANK_ACCOUNT', async () => {
        const filter: RVFilterBankAccount = {
          reportType: RVReportTypes.BANK_ACCOUNT,
          businessName: 'businessNames',
          serviceName: undefined,
        };
        expect(validateBusinessServiceNameParams(filter as RVFilterAll)).toEqual(true);
      });

      test('returns true correct params on validateBusinessServiceNameParams', async () => {
        const filter: RVFilterBalanceSheet = {
          startDate: '2022-04-01',
          endDate: '2022-04-30',
          reportFrequency: RVReportFrequency.MONTH,
          businessName: 'QBOmanyAttachments',
          serviceName: RVAccountingProviders.QUICKBOOKS,
          reportType: RVReportTypes.BALANCE_SHEET,
        };
        expect(validateBusinessServiceNameParams(filter as RVFilterAll)).toEqual(true);
      });

      // TODO: When connection is ready on web-backend
      // test('returns true for connectionId', async () => {
      //   const filter: RVFilterBankAccount = {
      //     reportType: RVReportTypes.BANK_ACCOUNT,
      //     connectionId: 'connectionId',
      //   };
      //   expect(validateBusinessServiceNameParams(filter)).toEqual(true);
      // });
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
            businessName: 'businessName',
            serviceName: RVAccountingProviders.QUICKBOOKS,
            reportFrequency: RVReportFrequency.MONTH,
            startDate: '2020-01-01',
            endDate: '2020-01-02',
          };
          expect(getFilter(filter as RVFilterAll)).toStrictEqual({
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
  });

  describe('validateDateParams', () => {
    describe('success path', () => {
      test('returns true for correct date', async () => {
        const filter: RVFilterBalanceSheet = {
          reportType: RVReportTypes.BALANCE_SHEET,
          businessName: 'businessName',
          serviceName: RVAccountingProviders.QUICKBOOKS,
          reportFrequency: RVReportFrequency.MONTH,
          startDate: '2020-01-01',
          endDate: '2020-01-02',
        };
        expect(validateDateParams(filter as RVFilterAll)).toEqual(true);
      });

      test('returns true for other correct date', async () => {
        const filter: RVFilterBalanceSheet = {
          reportType: RVReportTypes.BALANCE_SHEET,
          businessName: 'businessName',
          serviceName: RVAccountingProviders.QUICKBOOKS,
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
          businessName: 'businessName',
          serviceName: RVAccountingProviders.QUICKBOOKS,
          reportFrequency: RVReportFrequency.MONTH,
          startDate: '2020-01-01',
          endDate: '2020-01-01',
        };
        expect(validateDateParams(filter as RVFilterAll)).toEqual(false);
      });

      test('returns false for startDate after than endDate', async () => {
        const filter: RVFilterBalanceSheet = {
          reportType: RVReportTypes.BALANCE_SHEET,
          businessName: 'businessName',
          serviceName: RVAccountingProviders.QUICKBOOKS,
          reportFrequency: RVReportFrequency.MONTH,
          startDate: '2020-01-02',
          endDate: '2020-01-01',
        };
        expect(validateDateParams(filter as RVFilterAll)).toEqual(false);
      });
    });
  });
});
