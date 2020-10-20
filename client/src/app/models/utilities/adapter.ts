// Base class used to translate objects received from API to our models
export interface Adapter<T> {
  adapt(obj: any): T;
}
