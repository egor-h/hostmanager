import { Breadcrumbs } from '@material-ui/core';
import MaterialLink from '@material-ui/core/Link';
import React from 'react';
import { Link } from "react-router-dom";
import { Host } from '../../models/host';
import { findHostById } from '../../util/tree';

type BreadCrumbProps = {
    links: { title: string, url: string, id: number }[];
    setSelected: (selcted: string) => void
}

const resolveBreadcrumbs = (selected: number, tree: Host) => {
    let found = findHostById(tree, selected);
    if (found === null) {
        return [{title: `Host ${selected} not found`, url: `/objects/table`,  id: 0}];
    }
    let locationsList = [];
    locationsList.push({title: found.name, url: `/objects/table/${found.id}`, id: found.id});
    while (found.parentId !== 0) { 
        found = findHostById(tree, found.parentId);
        if (found === null) {
            break;
        }
        locationsList.push({title: found.name, url: `/objects/table/${found.id}`, id: found.id});
    }
    return locationsList.reverse();
}

export default (props: BreadCrumbProps) => {
    return (<Breadcrumbs aria-label="breadcrumb">
        {props.links.map(link => (<MaterialLink key={link.title} component={Link} to={link.url} onClick={() => props.setSelected(link.id+'')} color="inherit" >{link.title}</MaterialLink>))}
    </Breadcrumbs>)
}
