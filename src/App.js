import React, { Component } from "react";
import "./App.css";
import InputEntry from "./InputEntry";
import MultiInputEntry from "./MultiInputEntry";
import { Form } from "react-final-form";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: "",
      loading: false,
      switchView: false,
      isCopyAllowed: false,
      feedback: {}
    };
  }

  getDate = dateMillis => {
    let date = new Date(dateMillis);
    return `${date.getDate()}/${date.getMonth() + 1}/${date
      .getFullYear()
      .toString()
      .substring(2)}`;
  };

  getLessonDuration = (arrivedMillis, leftMillis) => {
    var millis = leftMillis - arrivedMillis;
    var date = new Date(millis);
    var hours = date.getHours() - 1,
      minutes = date.getMinutes();
    var minutesPart =
      minutes > 0
        ? `, ${date.getMinutes()}${minutes === 1 ? "min" : "mins"}`
        : "";
    return `${date.getHours() - 1}${hours === 1 ? "hr" : "hrs"}${minutesPart}`;
  };

  getTime = timeMillis => {
    var date = new Date(timeMillis);
    var hours = date.getHours(),
      minutes = date.getMinutes();
    var timeOfDay = hours > 11 ? "PM" : "AM";
    if (hours > 12) hours = hours - 12;
    if (minutes < 10) minutes = "0" + minutes;
    return `${hours}:${minutes} ${timeOfDay}`;
  };

  copyEmail = () => {
    if (Object.keys(this.state.feedback).length <= 0) return;
    const feedback = this.state.feedback;
    const student = feedback.student.toLowerCase();
    const parent =
      student === "fehintoluwa" || student === "ayomide"
        ? "Mrs. Ogunlesi"
        : feedback.student.toLowerCase() === "oba"
        ? "Mr. Okojie"
        : feedback.student.toLowerCase() === "brian"
        ? "Mrs. Etomi"
        : "";
    const main =
      "Hello " +
      parent +
      ",\n\nThis is a scheduled assessment with information as provided by the tutor \
after every lesson.\n\n\nSummary:\n\nLesson " +
      feedback.lesson +
      " of 4\n\n\
Module " +
      feedback.module +
      "\n\n\n\
Lesson Duration: " +
      this.getLessonDuration(feedback.timearrived, feedback.timeleft) +
      "\n\n\
" +
      this.getTime(feedback.timearrived) +
      " - " +
      this.getTime(feedback.timeleft) +
      "\n\n\
" +
      this.getDate(feedback.date) +
      "\n\n\n\
Concepts Learned:\n\n" +
      feedback.conceptslearned +
      "\n\n\n\
Projects Completed:\n\n" +
      feedback.projectscompleted +
      "\n\n\n\
Tutor Notes:\n\n" +
      feedback.tutornotes +
      "\n\n\nKind regards.\n\nmyProDG inc.";

    var tempTextArea = document.createElement("textarea");
    tempTextArea.value = main;
    tempTextArea.setAttribute("readonly", "");
    tempTextArea.style.position = "absolute";
    tempTextArea.style.left = "-9999px";
    document.body.appendChild(tempTextArea);
    tempTextArea.select();
    document.execCommand("copy");
    document.body.removeChild(tempTextArea);
    alert("Email format copied");
  };

  submitForm = values => {
    for (const value in values) {
      if (values[value] === "") {
        this.setState({
          errorMessage: "Please fill in all fields"
        });
        return;
      }
    }

    var arrivedMillis = this.convertTimeStringToMillis(values.timearrived),
      leftMillis = this.convertTimeStringToMillis(values.timeleft);

    let finalValues = {
      ...values,
      timearrived: arrivedMillis,
      timeleft: leftMillis,
      date: this.makeDate()
    };

    this.setState(
      prevState => ({
        loading: true,
        errorMessage: "Submitting..."
      }),
      () => {
        fetch("https://myprodgserver.now.sh/feedback", {
          body: JSON.stringify(finalValues),
          method: "POST",
          headers: {
            "content-type": "application/json"
          }
        })
          .then(response => response.json())
          .then(data => {
            this.setState({
              loading: false,
              errorMessage: "",
              feedback: finalValues,
              isCopyAllowed: true
            });
          })
          .catch(err => console.error(err));
      }
    );
  };

  convertTimeStringToMillis(timeString) {
    var time = timeString.split(":"),
      hour = time[0],
      minute = time[1];
    var millis = hour * 60 * 60 * 1000 + minute * 60 * 1000;
    var date = new Date();
    var temp = new Date(date.getFullYear(), date.getMonth(), date.getDay());
    var newDate = new Date(temp.getTime() + millis);
    return newDate.getTime();
  }

  makeDate = () => {
    let date = new Date();
    return date.getTime();
  };

  render() {
    var minutes = [];
    for (var i = 1; i <= 60; i++) {
      minutes.push(i.toString());
    }
    return !this.state.switchView ? (
      <div className="App">
        <div className="container">
          <Form
            initialValues={{
              tutor: "",
              student: "",
              module: "",
              lesson: "",
              timearrived: "10:00",
              timeleft: "12:00",
              conceptslearned: "",
              projectscompleted: "",
              tutornotes: ""
            }}
            onSubmit={!this.state.loading ? this.submitForm : () => {}}
            render={({ values, handleSubmit, reset }) => (
              <form onSubmit={handleSubmit}>
                <InputEntry label="Tutor Name" type="text" name="tutor" />
                <InputEntry label="Student Name" type="text" name="student" />
                <InputEntry
                  label="Module (I, II, III...)"
                  type="number"
                  name="module"
                />
                <InputEntry
                  label="Lesson (1, 2, 3 or 4)"
                  type="number"
                  name="lesson"
                />
                <InputEntry
                  label="Time Arrived"
                  type="time"
                  name="timearrived"
                />
                <InputEntry label="Time Left" type="time" name="timeleft" />
                <MultiInputEntry
                  label='Concepts Learned (start each concept with a "- ", and on a new line)'
                  name="conceptslearned"
                />
                <MultiInputEntry
                  label='Projects Completed (start each project with a "- ", and on a new line)'
                  name="projectscompleted"
                />
                <MultiInputEntry
                  label='Tutor Notes (start each point with a "- ", and on a new line)'
                  name="tutornotes"
                />
                <div className="buttons">
                  <button
                    type="submit"
                    className={`btn ${
                      this.state.loading ? "disabled" : "active"
                    }`}
                  >
                    Submit
                  </button>
                  {this.state.isCopyAllowed && (
                    <button
                      type="button"
                      className={`btn active`}
                      onClick={this.copyEmail}
                    >
                      Click to Copy
                    </button>
                  )}
                </div>
              </form>
            )}
          />
          <p className="errorView">{this.state.errorMessage}</p>
        </div>
      </div>
    ) : (
      <div />
    );
  }
}

export default App;
