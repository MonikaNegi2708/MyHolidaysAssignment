import React from 'react';
import history from './history';

class LoginPage extends React.Component {
	state = {
		userDetails: {
			username: '',
			password: ''
		}
	}

	onChangeHandler = (e) => {
		let userDetails = this.state.userDetails;
		userDetails[e.target.id] = e.target.value;
		this.setState({ userDetails, errorMessage: undefined })
	}

	loginHandler = () => {
		let userDetails = this.state.userDetails;
		if (userDetails.username.trim() != '' && userDetails.password.trim() != '') {
			if (userDetails.username === 'adminUser' && userDetails.password === 'adminUser@1234') {
				localStorage.setItem('isLogin', true);
				history.push('/ToDoList')
				window.location.reload();
			}
			else {
				this.setState({ errorMessage: 'Incorrect username or password!' })
			}
		}
		else {
			this.setState({ errorMessage: 'Kindly enter both username and password!' })
		}
	}

	render() {
		return <div>
			<h1>Login Form</h1>
			<label>Email or Phone</label>
			<input id="username" value={this.state.userDetails.username} onChange={this.onChangeHandler} />
			<label>Password</label>
			<input id="password" value={this.state.userDetails.password} onChange={this.onChangeHandler} />
			<h4>Forgot Password?</h4>
			<button onClick={this.loginHandler}>Login</button>
			{this.state.errorMessage}
			<h4>Not a member?</h4>
			<button>Signup now</button>
		</div>
	}
}

export default LoginPage;