export interface ITravelsRepositoryReader {
  getById: (txid: string) => Promise<any>;
}
