import { IconButton, ListItemSecondaryAction, ListSubheader, SvgIcon, TextField, Typography } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import ComputerIcon from '@material-ui/icons/Computer';
import HelpIcon from '@material-ui/icons/Help';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import NoteIcon from '@material-ui/icons/Note';
import ReceiptIcon from '@material-ui/icons/Receipt';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import React, { Component, ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { briefSearch, fullHostSearch } from '../../api/search';
import { AppState } from '../../state/reducers';
import { fullSearchClear } from '../../state/actions/fullSearch';
import { withTranslation, WithTranslation } from 'react-i18next';
import { BriefHost } from '../../models/search';
import { Note, Protocol, Tag } from '../../models/host';
import { filterSettingsKeys, findSetting } from './settingsUtils';
import { HashLink } from 'react-router-hash-link';


const baseItem = (HeaderIcon: typeof SvgIcon, ButtonIcon: typeof SvgIcon, primaryText: string, secondaryText: string, onClick: () => void, onClickSecond: undefined | (() => void)) => {
    return (<ListItem key={primaryText} button onClick={onClick}>
        <ListItemAvatar>
            <Avatar>
                <HeaderIcon />
            </Avatar>
        </ListItemAvatar>
        <ListItemText
            primary={primaryText}
            secondary={secondaryText}
        />
        {
            (onClickSecond) ? 
            (<ListItemSecondaryAction onClick={onClickSecond}>
                <IconButton edge="end" aria-label="searchitem">
                  <ButtonIcon />
                </IconButton>
              </ListItemSecondaryAction>)
              :
              ('')
        }
    </ListItem>)
}


baseItem(NoteIcon, NoteIcon, "", "", () => {}, undefined)

const hostItem = (host: BriefHost, onClick: () => void, onClickSecond: undefined | (() => void) = undefined) => {
    return baseItem(ComputerIcon, ArrowForwardIosIcon, host.name, host.address, onClick, onClickSecond);
}

const tagItem = (tag: Tag, onClick: () => void, onClickSecond: undefined | (() => void) = undefined) => {
    return baseItem(LocalOfferIcon, ArrowForwardIosIcon, tag.name, '', onClick, onClickSecond);
}

const protocolItem = (proto: Protocol, onClick: () => void, onClickSecond: undefined | (() => void) = undefined) => {
    return baseItem(ReceiptIcon, ArrowForwardIosIcon, proto.name, '', onClick, onClickSecond);
}

const noteItem = (note: Note, onClick: () => void, onClickSecond: undefined | (() => void) = undefined) => {
    return baseItem(NoteIcon, ArrowForwardIosIcon, note.title, '', onClick, onClickSecond);
}

const settingItem0 = (setting: string, onClick: () => void, onClickSecond: undefined | (() => void) = undefined) => {
    return baseItem(NoteIcon, ArrowForwardIosIcon, setting, '', onClick, onClickSecond);
}


const settingItem = (setting: string, key: string) => {
    const to = `/settings/all#${key}`
    const MyHashLink = (props: any) => <HashLink to={to} {...props}></HashLink>
    
    return (<ListItem key={setting} button component={MyHashLink}>
        <ListItemAvatar>
            <Avatar>
                <NoteIcon />
            </Avatar>
        </ListItemAvatar>
        <ListItemText
            primary={setting}
            secondary={''}
        />
    </ListItem>)
}



export default withTranslation()((props: WithTranslation) => {
    const [query, setQuery] = React.useState<string>('');
    const [settingsResults, setSettingsResults] = React.useState<string[]>([])
    const [filteredSettingsKeys, setFilteredSettingsKeys] = React.useState<{[key: string]: string}>({});
    const dispatch = useDispatch();
    const searchResults = useSelector((state: AppState) => state.search);
    const history = useHistory();
    const { t } = props;
    let filteredKeys = filterSettingsKeys('ru')


    const onSubmit = (query: string) => {
        if (query.trim() !== '') {
            dispatch(briefSearch(query));
            setSettingsResults(findSetting(filteredKeys, query));
        }
    }

    const handleFullHostSearch = () => {
        dispatch(fullHostSearch(query, 0));
        dispatch(fullSearchClear()); // clear previous results
        history.push(`/search_hosts/${query}`);
    }


    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <form noValidate autoComplete="off" onSubmit={(e) => { onSubmit(query); e.preventDefault(); }}>
                <TextField style={{ width: "50vw" }} autoFocus onChange={(e: any) => { setQuery(e.target.value) }} value={query} />
                <List dense={true}>
                    {
                        (searchResults.data.hosts.length) >= 5 ? (
                            <ListSubheader key="hosts" onClick={handleFullHostSearch}>
                                {`${t("brief_search_hosts_subheader")} - ${t("brief_search_click_all_results")}`}
                            </ListSubheader>
                        ) : (
                            <ListSubheader key="hosts" >
                                {t("brief_search_hosts_subheader")}
                            </ListSubheader>
                        )
                    }
                    {
                        searchResults.data.hosts.length !== 0 ? searchResults.data.hosts.map(h => hostItem(h, () => history.push(`/objects/info/${h.id}`), () => history.push(`/objects/table/${h.id}`))) : [] 
                    }
                    <ListSubheader key="protocols">{t("brief_search_protocols_subheader")}</ListSubheader>
                    { searchResults.data.protocols.map(p => protocolItem(p, () => history.push(`/protocols/edit/${p.id}`))) }
                    <ListSubheader key="tags">{t("brief_search_tags_subheader")}</ListSubheader>
                    { searchResults.data.tags.map(t => tagItem(t, () => history.push(`/objects/tableTag/${t.id}`), () => history.push(`/tags/edit/${t.id}`))) }
                    <ListSubheader key="notes">{t("brief_search_notes_subheader")}</ListSubheader>
                    { searchResults.data.notes.map(n => noteItem(n, () => history.push(`/notes/edit/${n.id}`))) }
                    <ListSubheader key="settings">{t("brief_search_settings_subheader")}</ListSubheader>
                    {/* { settingsResults.map(s => settingItem(s, () => history.push(`/settings/all?highlight=${filteredKeys[s]}`))) } */}
                    { settingsResults.map(s => settingItem(s, filteredKeys[s])) }
                </List>
            </form>
        </div>)
})