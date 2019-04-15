import React, { Component } from "react";
import Feedback from "./Feedback";

class FeedbackList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      noDataText: "No feedback yet"
    };
	}

  componentDidMount() {
    this.setState(
      prevState => {
        return {
          noDataText: "Loading..."
        };
      },
      () => {
        fetch("https://myprodgserver.now.sh/feedback", { method: "GET" })
          .then(response => response.json())
          .then(data => {
            this.setState({
              data: data.reverse(),
              noDataText: ""
            });
          })
          .catch(err => {
            this.setState({
              noDataText: "No feedback yet"
            });
            console.error(err);
          });
      }
    );
  }

  render() {
    return (
      <div className="container">
        <p>{this.state.noDataText}</p>
        {this.state.data.map((feedback, index) => <Feedback key={index} feedback={feedback} />)}
      </div>
    );
  }
}

export default FeedbackList;
