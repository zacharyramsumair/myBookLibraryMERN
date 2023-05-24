import { AxiosError,AxiosResponse  } from "axios";

export default interface ErrorWithResponse<T = any> extends AxiosError<T> {
    response?: AxiosResponse<T>;
  }