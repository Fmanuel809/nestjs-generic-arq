import { IResponse } from './response.interface';

export interface IDropdownResponse extends IResponse<IDropdown> {}

export interface IDropdown {
  value: unknown;
  label: string;
}
