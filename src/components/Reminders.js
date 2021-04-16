import React, { useEffect, useState } from "react";

import firebase from "../firebase";
import "firebase/firestore";
import "firebase/auth";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/dist/sweetalert2.css";

import { toast } from "react-toastify";

import "../styles/reminder.css";
import ReminderForm from "./ReminderForm";
const auth = firebase.auth();

const Reminders = () => {
  const [Reminders, setReminders] = useState([]);
  const [CurrentId, setCurrentId] = useState("");
  const { uid, displayName } = auth.currentUser;
  const query = firebase.firestore().collection(uid);

  const addOrEditReminders = async (reminderObject) => {
    if (CurrentId === "") {
      await query.doc().set(reminderObject);
      toast("New Reminder Created", { type: "success", autoClose: 2000 });
    } else {
      await query.doc(CurrentId).update(reminderObject);
      toast("Reminder Updated Succesfully", { type: "info", autoClose: 2000 });
      setCurrentId("");
    }
  };

  const onDeleteReminder = (id) => {
    Swal.fire({
      title: "<h3>Are You Sure You Want To Delete This Reminder?</h3>",
      html:
        '<p class="alertText">Once the reminder is deleted, you will not be able to recover it.</p>',
      confirmButtonText: "Delete",
      grow: "row",
      background: "rgba(0, 0, 0, 0.8)",
      backdrop: true,
      allowOutsideClick: true,
      allowEscapeKey: false,
      allowEnterKey: false,
      showConfirmButton: true,
      confirmButtonColor: "#b10012",
      confirmButtonAriaLabel: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        query.doc(id).delete();
        toast("Reminder Removed Successfully", {
          type: "error",
          autoClose: 2000,
        });
      }
    });
  };

  const getReminders = async () => {
    await query.onSnapshot((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      setReminders(docs);
    });
  };

  useEffect(() => {
    getReminders();
  }, []);

  return (
    <div className="container p-4">
      <div className="row d-flex justify-content-center">
        <div className="col-lg-6 col-12 mb-5">
          <ReminderForm {...{ addOrEditReminders, CurrentId, Reminders }} />
        </div>
        <div className="col-lg-6 col-12">
          <h2 className="titleNameUser">Reminders of {displayName}</h2>
          {Reminders.map((reminder) => (
            <div className="linkContainer mb-3" key={reminder.id}>
              <h3>{reminder.name}</h3>
              <h4>{reminder.description}</h4>
              <div className="d-flex justify-content-around">
                <button
                  className="text-info"
                  onClick={() => setCurrentId(reminder.id)}
                >
                  Edit <i class="fas fa-edit"></i>
                </button>
                <button
                  className="text-danger"
                  onClick={() => onDeleteReminder(reminder.id)}
                >
                  Delete
                  <i className="fas fa-trash-alt"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reminders;
