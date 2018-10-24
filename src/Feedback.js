import React from "react";
import "./feedback.css";
import MultiInputEntry from "./MultiInputEntry";

const copyEmail = (currentId) => () => {
    console.log(currentId);
    var emailField = document.getElementById(currentId);
    var tempTextArea = document.createElement('textarea');
    tempTextArea.value = emailField.innerHTML;
    tempTextArea.setAttribute('readonly', '');
    tempTextArea.style.position = 'absolute';
    tempTextArea.style.left = '-9999px';
    document.body.appendChild(tempTextArea);
    tempTextArea.select();
    document.execCommand('copy');
    document.body.removeChild(tempTextArea);
    alert("Email format copied");
};

const Feedback = ({ feedback }) => {
  return (
    <div className="jumbotron">
      <p>
        {feedback.tutor} - {feedback.student} - Lesson {feedback.lesson} -
        Module {feedback.module} - {feedback.date}
      </p>
      <div className="buttons">
        <button
        onClick={copyEmail(`${feedback.tutor}${feedback.student}${feedback.lesson}`)}
          className={`btn active`}
        >
          Click to copy
        </button>
      </div>
      <p className="email_format" id={`${feedback.tutor}${feedback.student}${feedback.lesson}`}>
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
        <span className="title">Lesson Duration:</span>
        <br />
        <br />
        {feedback.timearrived} - {feedback.timeleft}
        <br />
        <br />
        {feedback.date}
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
