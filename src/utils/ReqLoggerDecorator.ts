/* eslint-disable func-names */
/* eslint-disable no-param-reassign */
import { Inject } from '@nestjs/common';
import { CustomLogger } from '@src/infrastructure';

export function ReqLogger(origin?: string) {
  const injectLogger = Inject(CustomLogger);

  return (target: any, propertyKey: string, propertyDescriptor: PropertyDescriptor) => {
    injectLogger(target, 'logger');
    const originalMethod = propertyDescriptor.value;

    propertyDescriptor.value = async function (...args: any[]) {
      // const stringParam = args.find(el => typeof el === 'string');
      const objectParam = args.find((el) => typeof el === 'object');
      try {
        this.logger.info(`REQ BODY ${origin} => ${objectParam ? JSON.stringify(objectParam) : null}`);
        const data = await originalMethod.apply(this, args);
        this.logger.info(`RES BODY ${origin} => ${JSON.stringify(data || null)}`);
        return data;
      } catch (error) {
        this.logger.info(`RES BODY ${origin} => ${error.data ? JSON.stringify(error.data) : error.message}`);
        throw error;
      }
    };
  };
}
