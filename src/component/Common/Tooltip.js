import React from "react";

export default function Tooltip(props) {
  function handleOnClickTrigger() {
    if (typeof props.onClick !== 'function') return;
    props.onClick();
  }

  return (
    <div className={`tooltip ${props.longText ? 'tooltip--wide' : ''}`}>
      <div className="tooltip-trigger" onClick={handleOnClickTrigger}>{props.trigger}</div>
      <div className="tooltip-content">{props.content}</div>
    </div>
  )
}