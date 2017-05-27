import React from 'react';
import SocketMixin from './SocketMixin';
import './Trivia.css';
import DebugHelper from './../DebugHelper';


const TriviaPlayer = (props) => {
	let {triviaProblem} = props;
	return (
		<div>
			<div>question: {triviaProblem.question}</div>
			<div>options: {triviaProblem.options.join(', ')}</div>
			<div>answer: {triviaProblem.answer}</div>
			<button onClick={props.onNext}>next prob</button>
		</div>
	);
}



class Trivia extends React.Component  {

	constructor(props) {
		super(props)
		Object.assign(this, SocketMixin);
		Object.assign(this, props);
		Object.assign(this, _.get(props, 'location.state', {}));
		this.state = {
			currentProblemIndex: 0
		}
	}

	componentWillUnmount() {
		this.callOffFuncs();
	}

	//generate on the server
	get triviaProblems() {
		return DebugHelper.getTriviaProblems();
	}

	get currentProblem() {
		return this.triviaProblems[this.state.currentProblemIndex];
	}

	onNext() {
		this.setState({
			currentProblemIndex: this.state.currentProblemIndex + 1
		})
	}

	render() {
		return (
			<div>
				<TriviaPlayer triviaProblem={this.currentProblem} onNext={this.onNext.bind(this)}/>
			</div>
		)
	}
};

export default Trivia;