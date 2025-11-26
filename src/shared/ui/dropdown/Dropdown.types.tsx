export type Option = {
  value: string;
  label: string;
  disabled?: boolean;
};

export type DropdownProps = {
  label?: string;
  placeholder?: string;
  options: Option[];
  value?: string | string[] | null;
  onChange?: (v: string | string[] | null) => void;
  multi?: boolean;
  fullWidth?: boolean;
  searchable?: boolean;
  className?: string;
  onBlur?: () => void;
  disabled?: boolean;
};

