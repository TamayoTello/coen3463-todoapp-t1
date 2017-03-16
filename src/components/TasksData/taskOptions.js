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
                                <div className="col-md-6 col-sm-6">
                                    <div className="panel panel-default">
                                        <div className="panel-body">
                                            <div className="panel panel-default">
                                                <div className="panel-body">
                                                    <section>
                                                        <header>
                                                         {
                                                            userTask.isComplete == false ?
                                                                <h3>
                                                                    {userTask.name}
                                                                </h3>
                                                                :
                                                                <div>
                                                                    <h3>
                                                                        <strike>
                                                                            {userTask.name}
                                                                        </strike>
                                                                    </h3>
                                                                </div>
                                                         }
                                                        <br/>
                                                            <button className="btn btn-edit" onClick={handleEditTaskState}>
                                                                <i className="fa fa-edit"></i> Edit Task
                                                            </button>
                                                            &nbsp;

                                                             {
                                                                userTask.isComplete == false
                                                                ?
                                                                <button className="btn btn-success" onClick={handleEditTaskStatus}>
                                                                    <i className="fa fa-check"></i> Finished
                                                                </button>
                                                                :
                                                                <button className="btn btn-warning" onClick={handleEditTaskStatus}>
                                                                    <i className="fa fa-times"></i> Unfinished
                                                                </button>
                                                             }

                                                            &nbsp;
                                                            <button className="btn btn-danger" onClick={handleDeleteTask}>
                                                                    <i className="fa fa-exclamation"></i> Delete Task
                                                            </button>
                                                        </header>
                                                    </section>
                                                </div>
                                            </div> 

                                            <div className = "row">
                                                <div className = "col-md-12">
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
                                    </div>
                                    <br/>
                                    <br/>
                                </div>
                            </center>
                            :
                            <center>
                            <form>
                                <div className="col-md-6 col-sm-6">
                                    <div className="panel panel-default">
                                        <div className="panel-body">
                                            <div className="panel panel-default">
                                                <div className="panel-body">
                                                    <section>
                                                        <header>
                                                            <h4><strong>Enter New Task Name</strong></h4>
                                                            <br/>
                                                            <input className="form-controlv2" ref="taskName" type="text" placeholder="Task Name" defaultValue={userTask.name}/>
                                                            <br/>
                                                            <button className="btn btn-edit" onClick={handleEditTaskName}>
                                                                    <i className="fa fa-edit"></i> Update Task
                                                            </button>
                                                            &nbsp;
                                                            <button className="btn btn-default" onClick={handleEditTaskState}>
                                                                 Cancel
                                                            </button>
                                                        </header>
                                                    </section>
                                                </div>
                                            </div>
                                        </div> 
                                    </div>  
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