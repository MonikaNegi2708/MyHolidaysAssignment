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
		return <div>
			<h6>To Do List</h6>
			<button onClick={this.logoutHandler}>Logout</button>
			<div>
				<input placeholder="Name..." onChange={this.onChangeHandler} value={this.state.taskName} />
				{this.state.errorMessage}
				<button type="button" onClick={() => this.saveTaskHandler('addTask')} >Add Item</button>
			</div>
			{this.state.toDoList.length > 0 ?
				<ul>
					{this.state.toDoList.map((task, index) => <li key={index}>
						<div>
							{task.isEdit ? <input id="updateTask" value={task.taskName} onChange={(e) => this.onChangeHandler(e, index)} /> : <p>{task.taskName}</p>}
						</div>
						<div>
							<button type="button" onClick={() => this.saveTaskHandler('editTask', index)}>{task.isEdit ? 'Save' : 'Edit'}</button>
							<button type="button" onClick={() => this.saveTaskHandler('deleteTask', index)}>Delete</button>
						</div>
					</li>)}
				</ul>
				: <h5>No tasks yet !</h5>
			}
			<button onClick={this.clearTasksHandler} disabled={!this.state.toDoList.length}>Clear Items</button>
		</div>
	}
}

export default ToDoList;