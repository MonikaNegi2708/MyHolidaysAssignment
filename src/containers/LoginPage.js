import '../App.css';
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
		return <React.Fragment>
			<div className="login-outer-box">
				<div className="login-form-box">
					<h1>Welcome to Login</h1>
					<p className="error-message">{this.state.errorMessage}</p>
					<form>
						<div className="form-group">
							<label>Email or Phone</label>
							<input type="text" className="form-control" id="username" value={this.state.userDetails.username} onChange={this.onChangeHandler} />
						</div>
						<div className="form-group">
							<label>Password</label>
							<input type="password" className="form-control" id="password" value={this.state.userDetails.password} onChange={this.onChangeHandler} />
						</div>
						<a className="forgot-password">Forgot Password?</a>
						<button type="button" className="btn btn-primary login-btn" onClick={this.loginHandler}>Login</button>
						<p className="new-member">New Member? <a>Sign up now</a></p>
					</form>
				</div>
			</div>
		</React.Fragment>
	}
}

export default LoginPage;