import React from "react";
import "./feedback.css";

const copyEmail = currentId => () => {
  var emailField = document.getElementById(currentId);
  emailField.select();
  document.execCommand("copy");
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
  const student = feedback.student.toLowerCase();
  const parent = student == "fehintoluwa" || student == "ayomide" ? "Mrs. Ogunlesi" : 
  feedback.student.toLowerCase() == "oba" ? "Mr. Okojie" : feedback.student.toLowerCase() == "brian" ? "Mrs. Etomi" : "";
  const main = "Hello " + parent +  ",\n\nThis is a scheduled assessment with information as provided by the tutor \
after every lesson.\n\n\nSummary:\n\nLesson " + feedback.lesson + " of 4\n\n\
Module " + feedback.module + "\n\n\n\
Lesson Duration: " + getLessonDuration(feedback.timearrived, feedback.timeleft) + "\n\n\
" + getTime(feedback.timearrived) + " - " + getTime(feedback.timeleft) + "\n\n\
" + getDate(feedback.date) + "\n\n\n\
Concepts Learned:\n\n" + feedback.conceptsLearned + "\n\n\n\
Projects Completed:\n\n" + feedback.projectsCompleted + "\n\n\n\
Tutor Notes:\n\n" + feedback.tutorNotes + "\n\n\nKind regards.\n\nmyProDG inc.";
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
      <textarea
        className="form-control col-12 email_format"
        id={`${feedback.tutor}${feedback.student}${feedback.lesson}`}
      >{main}
      </textarea>
    </div>
  );
};

export default Feedback;
