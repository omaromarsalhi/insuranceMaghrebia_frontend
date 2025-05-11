
export interface MyFormFieldDto {
  javaRegex?: string;
  label: string;
  order?: number;
  placeholder?: string;
  rangeEnd?: number;
  rangeStart?: number;
  rangeValid?: boolean;
  regex?: string;
  regexErrorMessage?: string;
  required?: boolean;
  selectOptions?: Array<string>;
  type: string;
  step?: number;
  controleName: string;
  min?:number,
  max?:number,
}