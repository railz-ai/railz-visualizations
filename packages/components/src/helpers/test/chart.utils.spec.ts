import {getConfiguration} from "../chart.utils";

// TODO: complete tests
describe('Chart Utils Helper', () => {
  describe('getConfiguration', () => {
    describe('getConfiguration using non object', () => {
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
      })
      describe('success path', () => {
        test('returns formatted data due to the presence of configuration', async () => {
          expect(getConfiguration('{"token": "er2"}')).toStrictEqual({"token": "er2"});
        });
      })
    });
    describe('getConfiguration using object', () => {
      describe('failure path', () => {
        test('returns undefined due to empty configuration', async () => {
          expect(getConfiguration({"token": ""})).toBeUndefined();
        });
      })
      describe('success path', () => {
        test('returns formatted data due to the presence of configuration', async () => {
          expect(getConfiguration({"token": "er2"})).toStrictEqual({"token": "er2"});
        });
      })
    });
  });
});
