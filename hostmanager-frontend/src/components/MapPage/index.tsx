import React from 'react';
import { ForceGraph, ForceGraphNode, ForceGraphLink } from 'react-vis-force';
import { Host } from '../../models/host';



const buildTree = (host: Host) => {
    let graphNodes: any = [];
    buildTreeRecurse(host, graphNodes)
    return graphNodes;
}

const buildTreeRecurse = (host: Host, nodeStoreage: any[]) => {
    // console.log(`mapping ${host.name}`)
    nodeStoreage.push(<ForceGraphNode node={{ id: (host.id+'') }} fill="red" />);
    if (host.parentId > 1) {
        nodeStoreage.push(<ForceGraphLink link={{ source: host.parentId+'', target: host.id+'' }} />);
    }
    
    if (host.dir) {
        host.chld.map(h => buildTreeRecurse(h, nodeStoreage));
    }
}

export default (props: {tree: Host}) => {
    return (<ForceGraph zoom simulationOptions={{ height: '70vh', width: '70vw' }}>
        {buildTree(props.tree)}
        {/* <ForceGraphNode node={{ id: '1' }} fill="red" />
        <ForceGraphNode node={{ id: '2' }} fill="blue" />
        <ForceGraphNode node={{ id: '3' }} fill="yellow" />
        <ForceGraphNode node={{ id: '4' }} fill="purple" />
        <ForceGraphLink link={{ source: '1', target: '2' }} />
        <ForceGraphLink link={{ source: '1', target: '3' }} />
        <ForceGraphLink link={{ source: '3', target: '4' }} /> */}
        {/* <line x1={150} y1={0} x2={150} y2={300} stroke="green" /> */}
    </ForceGraph>);
}