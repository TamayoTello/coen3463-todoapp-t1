import React, { Component } from 'react';
import { connect } from 'react-refetch';
import Loading from './Loading/index';
import Error from './Error/index';
import TasksData from './TasksData/index';

class App extends Component {
    render() {
        const { userDataFetch } = this.props;

        if (userDataFetch.pending)
         {
            return <Loading />
         }
        else if (userDataFetch.rejected)
         {
            return <Error error={userDataFetch.reason} />
         }
        else if (userDataFetch.fulfilled)
         {
            const [ user ] = userDataFetch.value;
            return(
                <div>
                    <TasksData user={user} />
                </div>
            )
         }
    }
}

export default connect(() => {
    const refreshUserData = {
        userDataFetch: {
            url: `/api/user`,
            force: true,
            refreshing: true
        }
    };

    return {
        userDataFetch: `/api/user`
    }
})(App);