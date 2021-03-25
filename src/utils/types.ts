declare global {
  // eslint-disable-next-line no-unused-vars
  namespace Express {
    export interface Request {
      __trackId__: string;
    }
  }
}

export {};
