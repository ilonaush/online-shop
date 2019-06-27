import axios, {AxiosError, AxiosResponse, AxiosInstance} from "axios";

export class RequestService implements IRequestService {
  private static _instance: RequestService | null;
  public service!: AxiosInstance;

  constructor() {
    const service = axios.create({
      baseURL: "http://localhost:5000",
    });
    service.interceptors.response.use(this.handleSuccess, this.handleError);
    this.service = service;
  }

  static get instance() {
    if (!this._instance) {
      this._instance = new RequestService();
    }
    return this._instance;
  }

  handleSuccess(response: AxiosResponse) {
    return response;
  }

  handleError = (error: AxiosError) => {
    if (error && error.response && error.response.status && document) {
      switch (error.response.status) {
        case 401:
          this.redirectTo(document, "/");
          break;
        case 404:
          this.redirectTo(document, "/404");
          break;
        default:
          this.redirectTo(document, "/500");
          break;
      }
    }
    return Promise.reject(error);
  }

  redirectTo = (document: Document, path: string) => {
    document.location.pathname = path;
  }

  get(path: string, params = "") {
    return this.service.get(path, {
      params,
    });
  }

  patch(path: string, payload: object) {
    return this.service.request({
      method: "patch",
      url: path,
      responseType: "json",
      data: payload,
    });
  }

  post(path: string, payload: object) {
    return this.service.request({
      method: "post",
      url: path,
      responseType: "json",
      data: payload,
    });
  }
}

export default RequestService;
