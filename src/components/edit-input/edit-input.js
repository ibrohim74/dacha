import React, { useState } from "react";
import { Icons } from "../../assets/icons/icons";

const EditInput = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(props.value);

  const handleChange = (e) => {
    setValue(e.target.value);
    if (props.onChange) {
      props.onChange(e);
    }
  };

  return (
    <div className={props.className}>
      {!isEditing ? (
        <>
          <span style={{ color: "black" }}>{value}</span>
          <Icons.Pencil
            style={{ width: "20px", cursor: "pointer" }}
            onClick={() => setIsEditing(true)}
          />
        </>
      ) : (
        <input
          value={value}
          onChange={handleChange}
          onBlur={() => setIsEditing(false)}
          style={{ width: "100%" }}
          autoFocus
        />
      )}
    </div>
  );
};

export default EditInput;
