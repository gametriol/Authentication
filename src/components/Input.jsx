import React from "react";

function Input(props) {
  return (
    <div>
      <input
        type={props.type}
        id={props.id}
        name={props.name}
        required={true}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
      ></input>
    </div>
  );
}

export default Input;
