import { Typography } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux"
import { RouteComponentProps, withRouter } from "react-router";
import { User, UserWithPassword } from "../../models/auth";
import { AppState } from "../../state/reducers"
import UserForm from "./UserForm"

type Props = {
    onSubmit: (user: UserWithPassword) => void;
    role: number;
} & RouteComponentProps<{userId: string}>;

export default withRouter((props: Props) => {
    let newUser = {id: 0, name: '', login: '', email: '', password: '', roles: [props.role]};
    return (<UserForm user={newUser} 
        title="Create new user"
        onSubmit={props.onSubmit}
        showDeleteButton={false}
        handleDeleteButton={user => {}}
        />)
})