import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, RouteComponentProps, Switch, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { fetchUsers, fullUser, saveUser, createUser, deleteUser } from '../../api/user';
import { User } from '../../models/auth';
import { AppState } from '../../state/reducers';
import { UserState } from '../../state/reducers/users';
import NewUserWrapper from './NewUserWrapper';
import UserEditWrapper from './UserEditWrapper';
import UsersList from './UsersList';

type PropsType = {
    users: UserState;
    loadUsers: typeof fetchUsers;
    fullUser: typeof fullUser;
    saveUser: typeof saveUser;
    newUser: typeof createUser;
    deleteUser: typeof deleteUser;
    currentUser: User | undefined;
} & RouteComponentProps;

const mapStateToProps = (state: AppState) => ({
    users: state.users,
    currentUser: state.auth.data?.user
})

const mapDispatchToProps = (dispatch: any) => ({
    loadUsers: bindActionCreators(fetchUsers, dispatch),
    fullUser: bindActionCreators(fullUser, dispatch),
    saveUser: bindActionCreators(saveUser, dispatch),
    newUser: bindActionCreators(createUser, dispatch),
    deleteUser: bindActionCreators(deleteUser, dispatch)
})

class UserPage extends React.Component<PropsType> {
    constructor(props: any) {
        super(props);
    }

    componentDidMount() {
        this.props.loadUsers();
    }

    render() {
        return (<Switch>
            <Route exact path="/users/all">
                <UsersList users={this.props.users}></UsersList>
            </Route>
            <Route exact path="/users/edit/:userId">
                <UserEditWrapper users={this.props.users} 
                    onSubmit={this.props.saveUser} 
                    onDelete={user => this.props.deleteUser(user.id)}
                    loadUser={this.props.fullUser}/>
            </Route>
            <Route exact path="/users/new">
                <NewUserWrapper role={this.props.currentUser?.roles[0]} 
                onSubmit={this.props.newUser} />
            </Route>
            <Route exact path="/users">
                <Redirect to="/users/all" />
            </Route>
        </Switch>)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UserPage));