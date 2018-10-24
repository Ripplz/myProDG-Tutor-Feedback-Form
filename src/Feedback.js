import React from "react";
import "./feedback.css";

const copyEmail = currentId => () => {
  var emailField = document.getElementById(currentId);
  var tempTextArea = document.createElement("textarea");
  tempTextArea.value = emailField.innerHTML;
  tempTextArea.setAttribute("readonly", "");
  tempTextArea.style.position = "absolute";
  tempTextArea.style.left = "-9999px";
  document.body.appendChild(tempTextArea);
  tempTextArea.select();
  document.execCommand("copy");
  document.body.removeChild(tempTextArea);
  alert("Email format copied");
};

const getDate = dateMillis => {
  let date = new Date(dateMillis);
  return `${date.getDate()}/${date.getMonth() + 1}/${date
    .getFullYear()
    .toString()
    .substring(2)}`;
};

const getLessonDuration = (arrivedMillis, leftMillis) => {
  var millis = leftMillis - arrivedMillis;
  var date = new Date(millis);
  var hours = date.getHours() - 1, minutes = date.getMinutes();
  var minutesPart = minutes > 0 ? `, ${date.getMinutes()}${minutes === 1 ? 'min' : 'mins'}` : '';
  return `${date.getHours() - 1}${hours === 1 ? 'hr' : 'hrs'}${minutesPart}`;
};

const getTime = timeMillis => {
  var date = new Date(timeMillis);
  var hours = date.getHours(),
    minutes = date.getMinutes();
  var timeOfDay = hours > 11 ? "PM" : "AM";
  if (hours > 12) hours = hours - 12;
  if (minutes < 10) minutes = '0' + minutes;
  return `${hours}:${minutes} ${timeOfDay}`;
};

const Feedback = ({ feedback }) => {
  return (
    <div className="jumbotron">
      <p>
        {feedback.tutor} - {feedback.student} - Lesson {feedback.lesson} -
        Module {feedback.module} - {getDate(feedback.date)}
      </p>
      <div className="buttons">
        <button
          onClick={copyEmail(
            `${feedback.tutor}${feedback.student}${feedback.lesson}`
          )}
          className={`btn active`}
        >
          Click to copy
        </button>
      </div>
      <p
        className="email_format"
        id={`${feedback.tutor}${feedback.student}${feedback.lesson}`}
      >
        This is a scheduled assessment with information as provided by the tutor
        after every lesson.
        <br />
        <br />
        <br />
        <span className="title">Summary:</span>
        <br />
        <br />
        Lesson {feedback.lesson} of 4<br />
        <br />
        Module {feedback.module}
        <br />
        <br />
        <br />
        <span className="title">Lesson Duration:</span> {getLessonDuration(feedback.timearrived, feedback.timeleft)}
        <br />
        <br />
        {getTime(feedback.timearrived)} - {getTime(feedback.timeleft)}
        <br />
        <br />
        {getDate(feedback.date)}
        <br />
        <br />
        <br />
        <span className="title">Concepts Learned:</span>
        <br />
        <br />
        {feedback.conceptsLearned}
        <br />
        <br />
        <br />
        <span className="title">Projects Completed:</span>
        <br />
        <br />
        {feedback.projectsCompleted}
        <br />
        <br />
        <br />
        <span className="title">Tutor Notes:</span>
        <br />
        <br />
        {feedback.tutorNotes}
        <br />
        <br />
        <br />
        <br />
        Kind regards.
        <br />
        <br />
        myProDG inc.
      </p>
    </div>
  );
};

export default Feedback;
