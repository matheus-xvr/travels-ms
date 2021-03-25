export interface IHttpDispatcher {
  dispatch(options: any): Promise<void>
}
