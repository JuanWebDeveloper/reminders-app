import React, { useState, useEffect } from "react";

import firebase from "../firebase";
import "firebase/firestore";

import "../styles/reminderForm.css";

const ReminderForm = (props) => {
  const initialStateValues = {
    name: "",
    description: "",
  };

  const [values, setValues] = useState(initialStateValues);
  const query = firebase.firestore().collection(props.userDate.id);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    props.addOrEditReminders(values);
    setValues({ ...initialStateValues });
  };

  const getReminderById = async (id) => {
    const doc = await query.doc(id).get();
    setValues({ ...doc.data() });
  };

  useEffect(() => {
    if (props.CurrentId === "") {
      setValues({ ...initialStateValues });
    } else {
      getReminderById(props.CurrentId);
    }
  }, [props.CurrentId]);

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>Add Reminders</h2>
      <div className="form-group input-group">
        <div className="input-group-text icon">
          <i className="fas fa-sticky-note"></i>
        </div>
        <input
          type="text"
          className="form-control"
          name="name"
          placeholder="Reminder Name"
          onChange={handleInputChange}
          value={values.name}
        />
      </div>

      <div className="form-group">
        <textarea
          className="form-control"
          name="description"
          placeholder="Reminder description"
          onChange={handleInputChange}
          value={values.description}
        ></textarea>
      </div>

      <button className="btn btn-block">
        {props.CurrentId === "" ? "Save" : "Update"}
      </button>
    </form>
  );
};

export default ReminderForm;
