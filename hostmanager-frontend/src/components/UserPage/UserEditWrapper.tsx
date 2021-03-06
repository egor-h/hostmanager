import { Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { withTranslation, WithTranslation } from "react-i18next";
import { useSelector } from "react-redux"
import { RouteComponentProps, withRouter } from "react-router";
import { User, UserWithPassword } from "../../models/auth";
import { AppState } from "../../state/reducers"
import { UserState } from "../../state/reducers/users";
import UserForm from "./UserForm"

type Props = {
    users: UserState;
    onSubmit: (user: UserWithPassword) => void;
    onDelete: (user: UserWithPassword) => void;
    loadUser: (id: number) => void;
} & RouteComponentProps<{userId: string}> & WithTranslation;

export default withTranslation()(withRouter((props: Props) => {
    const { t } = props;
    const userId = +props.match.params.userId;
    // const user = props.users.find(u => u.id == userId);
    useEffect(() => {
        if (props.users.singleUser.loading || props.users.singleUser.error) {
            return;
        }
        if (props.users.singleUser.data == null || props.users.singleUser.data?.id !== userId) {
            props.loadUser(userId);
        }
    })
    if (props.users.singleUser.data !== null && props.users.singleUser.data !== undefined) {
        return (<UserForm user={props.users.singleUser.data} 
            title={t("user_page_edit_user_header", {username: props.users.singleUser.data.name})} 
            onSubmit={props.onSubmit}
            showDeleteButton={true} 
            handleDeleteButton={props.onDelete} />)
    }

    return (<Typography>{t("user_page_user_not_found", {userId})}</Typography>)
}));