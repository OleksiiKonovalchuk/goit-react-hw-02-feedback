import React, { Component } from 'react';
import css from './App.module.css';
import FeedbackOptions from './feedback/FeedbackOptions';
import Statistics from './statistics/Statistics';
import Section from './section/Section';
import Notification from './notification/Notification';
class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };
  feedbackInput = e => {
    e.preventDefault();
    const value = e.target.name;
    return this.setState({ [value]: this.state[value] + 1 });
  };
  countTotalFeedback = () => {
    const { good, neutral, bad } = this.state;
    return good + neutral + bad;
  };
  countPositiveFeedbackPercentage = () => {
    const { good, neutral, bad } = this.state;
    const result = good ? (good / (good + neutral + bad)) * 100 : 0;
    return Number(result.toFixed());
  };

  render() {
    const { good, neutral, bad } = this.state;
    const states = Object.keys(this.state);
    return (
      <div className={css.App}>
        <Section title={'Please leave feedback'}>
          <FeedbackOptions
            options={states}
            onLeaveFeedback={this.feedbackInput}
          />
        </Section>
        <Section title={'Statistics'}>
          {this.countTotalFeedback() === 0 ? (
            <Notification message="There is no feedback"></Notification>
          ) : (
            <Statistics
              good={good}
              neutral={neutral}
              bad={bad}
              total={this.countTotalFeedback()}
              positivePercentage={this.countPositiveFeedbackPercentage()}
            />
          )}
        </Section>
      </div>
    );
  }
}
export default App;
