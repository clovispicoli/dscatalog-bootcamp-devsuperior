import React from 'react';
import { Route, Switch } from 'react-router-dom';

const Users = () => {
    return (
        <div>
            <Switch>
                <Route path="/admin/users" exact>
                    <h1>List</h1>
                </Route>
                <Route path="/admin/users/:userId">
                    <h1>Form</h1>
                </Route>
            </Switch>
        </div>
    );
}

export default Users;