import React from "react";
import classNames from "classnames";
import "./button.scss";

export const Button: React.FC<{
  className?: string;
  tabIndex?: number;
  onClickEnter?: () => void;
}> = ({ children, onClickEnter, tabIndex, className }) => (
  <React.Fragment>
    <button
      tabIndex={tabIndex}
      onClick={onClickEnter}
      className={classNames("button px-4", className)}
    >
      {children}
    </button>
  </React.Fragment>
);
