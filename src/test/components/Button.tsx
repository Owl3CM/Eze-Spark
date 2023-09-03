import React from "react";

type Props = {
  title: string;
  disabled?: boolean;
  selected?: boolean;
  varaint?: string;
  onClick?: (e: any) => void;
};

const Button = ({ title, disabled = false, selected = false, onClick = () => {}, varaint }: Props) => {
  return (
    <div data-selected={`${!!selected}`} data-disabled={`${!!disabled}`} onClick={onClick} className={`button min-w-max ${varaint}`}>
      {title}
    </div>
  );
};

export default Button;
