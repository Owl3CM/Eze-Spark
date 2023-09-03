import React from "react";

type Props = {
  title: string;
  disabled?: boolean;
  varaint?: string;
  onChange?: (value: any) => void;
  value?: any;
  defaultValue?: any;
};

const Input = ({ title, disabled = false, onChange = () => {}, varaint, ...props }: Props) => {
  return <input className={`input ${varaint}`} placeholder={title} onChange={(e) => onChange(e.target.value)} {...props} />;
};

export default Input;
