import React, { FC, ReactNode } from "react";
import "./button.scss";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
}

const Button: FC<Props> = ({ children, ...props }) => {
  return (
    <button className="btn" {...props}>
      <span>{children}</span>
    </button>
  );
};

export default Button;
