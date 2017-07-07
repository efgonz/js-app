import { Ranges } from './ranges.interface';

export interface Attribute {
  name: string;
  description: string;
  deviceResourceType: string;
  defaultValue: string;
  dataType: string;
  format: string;
  enumerations: any;
  category: string;
  ranges?: Ranges;
  id?: string;
}
