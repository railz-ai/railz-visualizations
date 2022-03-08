import * as contrast from 'get-contrast';

import { isEmpty } from 'lodash-es';

import { errorLog, warnLog } from '../services/logger';
import Translations from '../config/translations/en.json';

/**
 * Check if colors passed are accessibility friendly
 * @param backgroundColor: background color
 * @param foregroundColor: foreground color
 * @param message: extra message if needed to describe the warning if any
 */
export const checkAccessibility = (
  backgroundColor: string,
  foregroundColor: string,
  message?: string,
): boolean => {
  let accessible = true;
  if (!isEmpty(backgroundColor) && !isEmpty(foregroundColor)) {
    try {
      const score = contrast.score(backgroundColor, foregroundColor);
      if (!['AA', 'AAA'].includes(score)) {
        accessible = false;
        warnLog(
          message,
          { backgroundColor, foregroundColor },
          Translations.RV_ACCESSIBILITY_FAILED_AA_AAA,
        );
      } else if (!['AAA'].includes(score)) {
        accessible = false;
        warnLog(
          message,
          { backgroundColor, foregroundColor },
          Translations.RV_ACCESSIBILITY_FAILED_AAA,
        );
      }
    } catch (e) {
      accessible = false;
      errorLog(
        message,
        { backgroundColor, foregroundColor },
        Translations.RV_ACCESSIBILITY_CHECK_FAILED,
      );
    }
  } else {
    accessible = false;
  }
  return accessible;
};
