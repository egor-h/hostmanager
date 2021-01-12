import { Skeleton } from '@material-ui/lab';
import TreeItem from '@material-ui/lab/TreeItem';
import TreeView from '@material-ui/lab/TreeView';
import React from 'react';

export default () => {
    // const nestedTreeItem = [...Array(5).keys()].map(n => (<TreeItem key={22+n+''} nodeId={n+''} label={<Skeleton></Skeleton>}>
    // </TreeItem>))
    return (<TreeView>
        {/* <TreeItem key={21+''} nodeId={21+''} label={<Skeleton></Skeleton>}>
            {nestedTreeItem}
        </TreeItem> */}
        {[...Array(30).keys()].map(n => (<TreeItem key={n+''} nodeId={n+''} label={<Skeleton></Skeleton>}>
        </TreeItem>))}
    </TreeView>)
}