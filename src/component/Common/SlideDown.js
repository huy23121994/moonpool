import React, { useRef, useEffect } from "react";

export const SlideDownTrigger = (props) => (
  <div className={`slide-down__trigger ${props.className ? props.className : ''}`} onClick={props.toggleContent}>
    {props.children}
    <div className="slide-down__arrow"/>
  </div>
);

export function SlideDownContent(props) {
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (props.persistOnClickOutside) return;

    document.addEventListener("click", handleClickOutside, false);

    return () => {
      document.removeEventListener("click", handleClickOutside, false);
    };
  }, [props.status]); // eslint-disable-line

  function handleClickOutside(event) {
    if (props.status && wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      props.close();
    }
  }

  return (
    <div className={`slide-down__content ${props.className ? props.className : ''}`} ref={wrapperRef}>
      <div className="slide-down__fade-in">
        {props.children}
      </div>
    </div>
  )
}

const SlideDown = (props) => {
  return (
    <div className={`slide-down ${props.active ? 'slide-down--active' : ''} ${props.className ? props.className : ''}`}>
      {props.children}
    </div>
  )
};

export default SlideDown;
