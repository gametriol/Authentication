import React from "react";

function Form(props){
    return(
        <div class="form-group">
                <label htmlFor={props.children.props.id}>{props.label}</label>
                {props.children}
        </div>
    );
};

export default Form;