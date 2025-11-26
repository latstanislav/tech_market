export interface ButtonProps {
  type?: "button" | "submit" | "reset";
  textColor?: string;
  label: string;
  padding?: string;
  buttonWidth?: string;
  onClick?: () => void;
  loading?: boolean;
  icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>> | string;
  secondClass?: "primary" | "secondary" | "tertiary";
  disabled?: boolean;
  className?: string;
  iconPosition?: 'left' | 'right';
}

