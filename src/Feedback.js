import React from 'react';
import './feedback.css';
import MultiInputEntry from './MultiInputEntry';

const Feedback = ( {feedback} ) => {
    var email = `Summary:\n\nLesson ${feedback.lesson} of 4\n\nModule ${feedback.module}\n\nLesson Duration: ${feedback.timearrived} - ${feedback.timeleft}\n\n${feedback.date}\n\nConcepts Learned:\n\n${feedback.conceptsLearned}\n\nProjects Completed:\n\n${feedback.projectsCompleted}\n\nTutor Notes:\n\n${feedback.tutorNotes}\n\nKind regards.\n\nmyProDG inc.`;
    return (
        <div className="jumbotron">
        <p>{feedback.tutor} - {feedback.student} - Lesson {feedback.lesson} - Module {feedback.module} - {feedback.date}</p>
        <textarea className="email" rows="20">{email}</textarea>
        </div>
    );
};

export default Feedback