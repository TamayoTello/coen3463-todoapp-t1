import React, { Component } from 'react';
import moment from 'moment-timezone';

class TaskOptions extends Component {
    constructor(props) 
     { 
        super(props);

        this.state = {editingTask: false};
        this.tasksDetails = this.tasksDetails.bind(this);
        this.handleEditTaskName = this.handleEditTaskName.bind(this);
        this.handleEditTaskState = this.handleEditTaskState.bind(this);
        this.handleEditTaskStatus = this.handleEditTaskStatus.bind(this);
        this.handleDeleteTask = this.handleDeleteTask.bind(this);
     }

    tasksDetails() 
     {
        const { userTask } = this.props;

        return (
            <div>
                <hr />
                    <b>
                        Task Created :&nbsp;
                    </b>
                        { moment(userTask.createdAt).tz("Asia/Manila").format("MMM DD, YYYY hh:mm A") }
                    <br/>
                    <b>
                        Task Last Updated :&nbsp;
                    </b>
                        { moment(userTask.updatedAt).tz("Asia/Manila").format("MMM DD, YYYY hh:mm A") }
            </div>
        )
     }

    handleEditTaskName(event)
     {
        event.preventDefault();

        const { user,
                userTask,
                handleEditTaskName,
              } = this.props;

        let userID = user._id;
        let taskID = userTask._id;
        let updateTask = userTask;

        updateTask.name = this.refs.taskName.value;

        handleEditTaskName(userID, taskID, updateTask);

        this.setState({editingTask: false});
     }

    handleEditTaskState(event)
     {
        event.preventDefault();

        var toggleEditingTask = !this.state.editingTask;

        this.setState({editingTask: toggleEditingTask});
     }

    handleEditTaskStatus(event)
     {
        event.preventDefault();

        const { user,
                userTask,
                handleEditTaskStatus,
              } = this.props;

        let userID = user._id;
        let taskID = userTask._id;
        let updateTask = userTask;

        updateTask.isComplete = !updateTask.isComplete;

        handleEditTaskStatus(userID, taskID, updateTask);
     }

    handleDeleteTask(event)
     {
        event.preventDefault();

        const { user,
                userTask,
                handleDeleteTask,
              } = this.props;

        let userID = user._id;
        let taskID = userTask._id;

        handleDeleteTask(userID, taskID)
     }

    render()
     {
        const { userTask } = this.props;
        const { editingTask } = this.state;
        const { tasksDetails,
                handleEditTaskState,
                handleEditTaskName,
                handleEditTaskStatus,
                handleDeleteTask
              } = this;

        return(
            <center>
                <article>
                    {
                        editingTask == false
                            ?
                            <center>
                                <div id="menu-container">
                                    <a className="site-brand">
                                        <div className="col-md-15 col-sm-15">
                                            <div className="box-content">
                                                <div className="row text-center">
                                                    {
                                                        userTask.isComplete == false ?
                                                        <h3 className="widget-title">
                                                            {userTask.name}
                                                        </h3>
                                                        :
                                                        <div>
                                                            <h3 className="widget-title">
                                                                <strike>
                                                                    {userTask.name}
                                                                </strike>
                                                            </h3>
                                                        </div>
                                                     }
                                                    <br/>
                                                    <button className="button3" onClick={handleEditTaskState}>
                                                        <i className="fa fa-edit"></i>
                                                    </button>
                                                    &nbsp;

                                                     {
                                                        userTask.isComplete == false
                                                        ?
                                                        <button className="button3" onClick={handleEditTaskStatus}>
                                                            <i className="fa fa-check"></i>
                                                        </button>
                                                        :
                                                        <button className="button3" onClick={handleEditTaskStatus}>
                                                            <i className="fa fa-times"></i>
                                                        </button>
                                                     }

                                                    &nbsp;
                                                    <button className="button3" onClick={handleDeleteTask}>
                                                        <i className="fa fa-exclamation"></i>
                                                    </button>
                                                </div>

                                                <div className="row text-center">
                                                 {
                                                    userTask.isComplete == false ?
                                                    <div>
                                                        { tasksDetails() }
                                                    </div>
                                                    :
                                                    <div>
                                                        <strike>
                                                            { tasksDetails() }
                                                        </strike>                                            
                                                    </div>
                                                 }
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </center>
                            :
                            <center>
                            <form>
                                <div id="menu-container">
                                    <a className="site-brand">
                                        <div className="col-md-15 col-sm-15">
                                            <div className="box-content">
                                                <div className="row text-center">
                                                    <h3 className="widget-title">
                                                        Task Name
                                                    </h3>
                                                    <br/>
                                                    <div className="form-group">
                                                        <input className="form-control" ref="taskName" type="text" placeholder="Task Name" defaultValue={userTask.name}/>
                                                    </div>
                                                    <br/>
                                                    <button className="button3" onClick={handleEditTaskName}>
                                                        <i className="fa fa-edit"></i>
                                                    </button>
                                                    &nbsp;
                                                    <button className="button3" onClick={handleEditTaskState}>
                                                        Cancel
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                                <br/>
                            </form>
                            </center>
                    }
                </article>
            </center>
        )
     }
}

export default TaskOptions;