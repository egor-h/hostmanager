import { Typography } from "@material-ui/core";
import React from "react";
import { withTranslation, WithTranslation } from "react-i18next";
import { useSelector } from "react-redux"
import { RouteComponentProps, withRouter } from "react-router";
import { User, UserWithPassword } from "../../models/auth";
import { AppState } from "../../state/reducers"
import UserForm from "./UserForm"

type Props = {
    onSubmit: (user: UserWithPassword) => void;
    role: number;
} & RouteComponentProps<{userId: string}> & WithTranslation;

export default withTranslation()(withRouter((props: Props) => {
    const { t } = props;
    let newUser = {id: 0, name: '', login: '', email: '', password: '', roles: [props.role]};
    return (<UserForm user={newUser} 
        title={t("user_page_add_new_user_header")}
        onSubmit={props.onSubmit}
        showDeleteButton={false}
        handleDeleteButton={user => {}}
        />)
}));