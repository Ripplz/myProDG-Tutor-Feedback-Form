import React, { Component } from 'react';
import './App.css';
import InputEntry from './InputEntry';
import SelectEntry from './SelectEntry';
import MultiInputEntry from './MultiInputEntry';
import { Form } from 'react-final-form';

class App extends Component {
  constructor(props) {
		super(props);
		this.state = {
			errorMessage: '',
			loading: false,
		}
  }
  
  submitForm = values => {
		for (const value in values) {
			if (values[value] === "") {
				this.setState({
					errorMessage: 'Please fill in all fields'
				});
				return;
			}
		}

		let finalValues = {...values, date:this.makeDate()};

		this.setState(prevState => ({
			loading: true,
			errorMessage: 'Submitting...'
		}), () => {fetch('https://myprodgserver.now.sh/feedback', {
			body: JSON.stringify(finalValues),
			method: 'POST',
			headers: {
		      'content-type': 'application/json'
		    }
			})
		.then(response => response.json())
		.then(data => {
			this.setState({
				loading: false,
				errorMessage: 'Done! Go and sin no more',
			});
		})
		.catch(err => console.error(err))});
	}

	makeDate = () => {
		let date = new Date();
		return `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear().toString().substring(2)}`
	}

  render() {
    var minutes = [];
    for(var i = 1; i <= 60; i++) {
      minutes.push(i.toString());
    }
    return (
      <div className="App">
				   <div className="container">
        <Form
				   			initialValues={{ 
									 tutor: 'Stephen',
									 student: 'Oba',
									 module: '',
									 lesson: '',
									 timearrived: '10:00',
									 timeleft: '12:00',
									 conceptslearned: '',
									 projectscompleted: '',
									 tutornotes: ''
			   				 }}
				   			onSubmit={!this.state.loading ? this.submitForm : ()=>{}}
				   			render={( { values, handleSubmit, reset } ) => (
				   				<form onSubmit={handleSubmit}>
                    <SelectEntry label="Tutor" options={["Stephen", "Pegba"]} name="tutor" />
                    <SelectEntry label="Student" options={["Oba", "Ayomide", "Fehintoluwa"]} name="student" />
                    <InputEntry label="Module (I, II, III...)" type="number" name="module" />
                    <InputEntry label="Lesson (1, 2, 3 or 4)" type="number" name="lesson" />
                    <InputEntry label="Time Arrived" type="time" name="timearrived" />
                    <InputEntry label="Time Left" type="time" name="timeleft" />
                    <MultiInputEntry label='Concepts Learned (start each concept with a "-")' name="conceptslearned" />
                    <MultiInputEntry label='Projects Completed (start each project with a "-")' name="projectscompleted" />
                    <MultiInputEntry label='Tutor Notes (start each point with a "-")' name="tutornotes" />
                    <div className="buttons">
                      <button type="submit" className={`btn ${this.state.loading ? 'disabled' : 'active'}`}>Submit</button>
                    </div>
								</form>
				   			)}
			   			/>
               <p className="errorView">{this.state.errorMessage}</p>
        </div>
      </div>
    );
  }
}

export default App;