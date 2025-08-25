export interface FormFieldProps {
  label?: string;
  error?: string;
  touched?: boolean;
}

export interface MaskedInputProps extends FormFieldProps {
  mask: (value: string) => string;
  unmask: (value: string) => string | number;
  onValueChange: (value: string | number) => void;
  value: string | number;
  placeholder?: string;
}
