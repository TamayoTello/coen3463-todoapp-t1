import React, { Component } from 'react';
import { connect, PromiseState } from 'react-refetch';
import Loading from '../Loading/index';
import Error from '../Error/index';
import TaskOptions from './taskOptions';

class TasksData extends Component {
    constructor(props)
     {
        super(props);

        this.state = {tasksFilter: 'allTasks'};
        this.handleTasksFilter = this.handleTasksFilter.bind(this);
        this.handleAddTask = this.handleAddTask.bind(this);
        this.handleEditTaskName = this.handleEditTaskName.bind(this);
        this.handleEditTaskStatus = this.handleEditTaskStatus.bind(this);
        this.handleDeleteTask = this.handleDeleteTask.bind(this);
        this.handleDeleteFinishedTask = this.handleDeleteFinishedTask.bind(this);
        
     }
    handleTasksFilter(event)
     {
        event.preventDefault();
        this.setState({tasksFilter: event.target.value});
     }

    handleAddTask(event)
     {
        event.preventDefault();
        const { user, addTask } = this.props;
        addTask(user._id);
     }

    handleEditTaskName(userID, taskID, updateTask)
     {
        const { editTask } = this.props;
        editTask(userID, taskID, updateTask);
     }

    handleEditTaskStatus(userID, taskID, updateTask)
     {
        const { editTask } = this.props;
        editTask(userID, taskID, updateTask);
     }

    handleDeleteTask(userID, taskID)
     {
        const { deleteTask } = this.props;
        deleteTask(userID, taskID);
     }

    handleDeleteFinishedTask(event)
     {
        event.preventDefault();
        const { user, deleteFinishedTasks } = this.props;
        deleteFinishedTasks(user._id);
     }

    render()
     {
        const { userTasksDataFetch } = this.props;
        const allUserTasksDataFetch = PromiseState.all([userTasksDataFetch]);

        if (allUserTasksDataFetch.pending)
         {
            return (
                <article style={{padding: "50px"}}>
                    <Loading />
                </article>
            );
         }
        else if (allUserTasksDataFetch.rejected)
         {
            return <Error error={allUserTasksDataFetch.reason} />
         }
        else if (allUserTasksDataFetch.fulfilled)
         {
            const [ userTasksData ] = allUserTasksDataFetch.value;
            const userTasks = userTasksData.userTasks;
            const { user } = this.props;
            const { tasksFilter } = this.state;
            const { handleTasksFilter,
                    handleAddTask,
                    handleDeleteFinishedTask,
                    handleEditTaskName,
                    handleEditTaskStatus,
                    handleDeleteTask
                 } = this;

            return(
                <center>
                    <div>
                        <article>
                            <form>
                                <header>
                                    <div className="text-box">
                                        <p className="main-text">
                                            { userTasks.tasks.filter(userTask => userTask.isComplete == true).length } &nbsp; 

                                            {
                                               userTasks.tasks.filter(userTask => userTask.isComplete == true).length > 1 ? "Tasks" : "Task"
                                            }

                                            &nbsp; Completed
                                        </p>
                                        <p className="text-muted">
                                            { userTasks.tasks.length - userTasks.tasks.filter(userTask => userTask.isComplete == true).length}
                                              &nbsp;
                                              Remaining
                                              &nbsp;
                                              ( &nbsp; { userTasks.tasks.length } &nbsp; Total &nbsp;)
                                        </p>
                                    </div>
                                    <br/>
                                    <div className = "text-box">
                                        <div className = "main-text">
                                            <div>
                                                <select className = "form-control" value={tasksFilter} onChange={handleTasksFilter}>
                                                    <option value="allTasks">All Tasks</option>
                                                    <option value="openTasks">Open Tasks</option>
                                                    <option value="completedTasks">Completed Tasks</option>
                                                </select>
                                            </div>

                                            <br/>
                                        
                                            <div>
                                                <button className="btn btn-edit" onClick={handleAddTask}>
                                                   <i className="fa fa-pencil"></i> Add New Task
                                                </button>

                                                &nbsp;

                                                {
                                                    tasksFilter == 'openTasks' || userTasks.tasks.filter(userTask =>userTask.isComplete == true).length == 0 ? ""
                                                    : <button className="btn btn-danger" onClick={handleDeleteFinishedTask}>
                                                    <i className="fa fa-times"></i>&nbsp;<i className="fa fa-reorder"></i> Delete Finished Tasks
                                                    </button>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </header>
                            </form>
                        <br/>
                        <hr/>
                        <br/>
                        </article>
                        {
                            tasksFilter == 'allTasks'
                                ?
                                userTasks.tasks.map(userTask =>
                                    <TaskOptions
                                        key={userTask._id}
                                        user={user}
                                        userTask={userTask}
                                        handleEditTaskName={handleEditTaskName}
                                        handleEditTaskStatus={handleEditTaskStatus}
                                        handleDeleteTask={handleDeleteTask}
                                    />
                                )
                                :
                                tasksFilter == 'completedTasks'
                                    ?
                                    userTasks.tasks.filter(userTask =>
                                        userTask.isComplete == true
                                    ).map(userTask =>
                                        <TaskOptions
                                            key={userTask._id}
                                            user={user}
                                            userTask={userTask}
                                            handleEditTaskName={handleEditTaskName}
                                            handleEditTaskStatus={handleEditTaskStatus}
                                            handleDeleteTask={handleDeleteTask}
                                        />
                                    )
                                    :
                                    userTasks.tasks.filter(userTask =>
                                        userTask.isComplete == false
                                    ).map(userTask =>
                                        <TaskOptions
                                            key={userTask._id}
                                            user={user}
                                            userTask={userTask}
                                            handleEditTaskName={handleEditTaskName}
                                            handleEditTaskStatus={handleEditTaskStatus}
                                            handleDeleteTask={handleDeleteTask}
                                        />
                                    )
                        }
                    </div>
                </center>
             )
         }
     }
 }

export default connect((props) => {
    const refreshUserTasksData = {
        userTasksDataFetch: {
            url: `/api/${props.user._id}/tasks`,
            force: true,
            refreshing: true
        }
    };

    return {
        userTasksDataFetch: `/api/${props.user._id}/tasks`,
        addTask: (userID) => ({
            addTaskFetch: {
                url: `/api/${userID}/tasks/start`,
                method: 'POST',
                force: true,
                refreshing: true,
                andThen: () => (refreshUserTasksData)
            }
        }),
        editTask: (userID, taskID, updateTask) => ({
            editTaskFetch: {
                url: `/api/${userID}/task/${taskID}`,
                method: 'PATCH',
                force: true,
                refreshing: true,
                body: JSON.stringify(updateTask),
                andThen: () => (refreshUserTasksData)
            }
        }),
        deleteTask: (userID, taskID) => ({
            deleteTaskFetch: {
                url: `/api/${userID}/task/${taskID}`,
                method: 'DELETE',
                force: true,
                refreshing: true,
                andThen: () => (refreshUserTasksData)
            }
        }),
        deleteFinishedTasks: (userID) => ({
            deleteFinishedTasksFetch: {
                url: `/api/${userID}/tasks`,
                method: 'DELETE',
                force: true,
                refreshing: true,
                andThen: () => (refreshUserTasksData)
            }
        })
    }
})(TasksData);