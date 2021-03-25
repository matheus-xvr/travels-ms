import { HttpStatus } from '@nestjs/common';
import { Observable, throwError, timer } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { CustomLogger } from '@infrastructure/logger/CustomLogger';

const logger = new CustomLogger();

export const genericRetryStrategy = ({
  maxRetryAttempts = 3,
  scalingDuration = 3000,
}: {
  maxRetryAttempts?: number,
  scalingDuration?: number,
  excludedStatusCodes?: number[]
} = {}) => (attempts: Observable<any>) => attempts.pipe(
  mergeMap((error, i) => {
    const retryAttempt = i + 1;
    if (
      retryAttempt > maxRetryAttempts
      || (error.status >= HttpStatus.BAD_REQUEST && error.status < HttpStatus.INTERNAL_SERVER_ERROR)
    ) {
      return throwError(error);
    }
    if (retryAttempt > 2) {
      logger.info(`Attempt ${retryAttempt}: retrying in ${scalingDuration}ms`);
    }
    return timer(scalingDuration);
  }),
);
