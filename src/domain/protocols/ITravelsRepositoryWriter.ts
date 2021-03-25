export interface ITravelsRepositoryWriter {
  create: (travel: any) => Promise<void>;
}
