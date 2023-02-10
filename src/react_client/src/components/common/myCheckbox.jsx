import React from "react";
import "./myCheckbox.scss"

const MyCheckbox = ({checked, onHandleTickChange}) => {
    return (<div className="checkbox-wrapper">
        <label>
            <input
                type="checkbox"
                checked={checked}
                onChange={() => onHandleTickChange()}
                className={checked ? "checked" : ""}
            />
        </label>
    </div>);
};

export default MyCheckbox;
