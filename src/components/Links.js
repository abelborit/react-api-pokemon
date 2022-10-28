import React from "react";

export function Links(props) {
  return (
    <div>
      {props.useFetchPrevLink && (
        <button onClick={props.useFetchHandlePrev}>Prev</button>
      )}

      {props.useFetchNextLink && (
        <button onClick={props.useFetchHandleNext}>Next</button>
      )}
    </div>
  );
}
