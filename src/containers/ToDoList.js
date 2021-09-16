import '../App.css';
import React from 'react';
import history from './history';

class ToDoList extends React.Component {
	state = {
		taskName: '',
		toDoList: localStorage.toDoList ? JSON.parse(localStorage.toDoList) : []
	}

	onChangeHandler = (e, index) => {
		if (e.target.id === "updateTask") {
			let toDoList = JSON.parse(JSON.stringify(this.state.toDoList));
			toDoList[index].taskName = e.target.value;
			localStorage.toDoList = JSON.stringify(toDoList)
			this.setState({ toDoList })
		}
		else {
			this.setState({ taskName: e.target.value, errorMessage: '' })
		}
	}

	saveTaskHandler = (calledFor, index) => {
		let toDoList = JSON.parse(JSON.stringify(this.state.toDoList));
		let errorMessage = '';
		let taskName = this.state.taskName;

		switch (calledFor) {
			case 'addTask':
				if (this.state.taskName.trim() === '') {
					errorMessage = 'Task name can not be empty!'
				}
				else {
					toDoList.push({ 'taskName': this.state.taskName, 'isEdit': false })
					taskName = '';
				}
				break;
			case 'deleteTask':
				toDoList = toDoList.filter((el, i) => i !== index);
				break;
			case 'editTask':
				toDoList[index]['isEdit'] = !toDoList[index]['isEdit'] ? true : false;
				break;
		}
		localStorage.toDoList = JSON.stringify(toDoList);
		this.setState({ toDoList, errorMessage, taskName })
	}

	clearTasksHandler = () => {
		let toDoList = [];
		localStorage.toDoList = JSON.stringify(toDoList);
		this.setState({ toDoList })
	}

	logoutHandler = () => {
		localStorage.removeItem('isLogin');
		history.push('/')
		window.location.reload();
	}

	render() {
		return <React.Fragment>
			<div className="to-do-list-box">
				<div className="list-box">
					<button onClick={this.logoutHandler} type="button" className="btn btn-primary mr-1 log-out"><i className="fa fa-sign-out mr-1"></i>Logout</button>
					<h1>To Do List</h1>
					<form>
						<div className="input-group mt-3">
							<input type="text" className="form-control" placeholder="Name..." onChange={this.onChangeHandler} value={this.state.taskName} />
							<div className="input-group-append">
								<button type="button" className="btn btn-primary mr-1" onClick={() => this.saveTaskHandler('addTask')}><i className="fa fa-plus"></i> Add Item</button>
							</div>
						</div>
						<p className="error-message text-left" >{this.state.errorMessage}</p>
					</form>
					<div className="task-box">
						{this.state.toDoList.length > 0 ?
							<ul className="task-list">
								{this.state.toDoList.map((task, index) => <li key={index}>
									<div className="d-flex">
										{task.isEdit ? <input id="updateTask" value={task.taskName} onChange={(e) => this.onChangeHandler(e, index)} /> : <p className="input-container">{task.taskName}</p>}
									</div>
									<div className="d-flex">
										<button type="button" className="btn btn-primary" onClick={() => this.saveTaskHandler('editTask', index)}><i className={task.isEdit ? "fa fa-check" : "fa fa-pen"}></i></button>
										<button type="button" className="btn btn-danger" onClick={() => this.saveTaskHandler('deleteTask', index)}><i className="fa fa-trash"></i></button>
									</div>
								</li>
								)}
							</ul>
							: <h3>No item added yet !</h3>
						}
					</div>
					<button type="button" onClick={this.clearTasksHandler} disabled={!this.state.toDoList.length} className="btn btn-primary clear-button">Clear Items</button>
				</div>
			</div>
		</React.Fragment>
	}
}

export default ToDoList;