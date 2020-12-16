import { Host } from "../../models/host";
import { HOST_TREE, HOST_TREE_FAILED, HOST_TREE_SUCCEDED } from "../constants";

export const hostsTree = () => ({
    type: HOST_TREE
});

export const hostsTreeSucceeded = (tree: Host) => ({
    type: HOST_TREE_SUCCEDED,
    tree: tree
});

export const hostsTreeFailed = () => ({
    type: HOST_TREE_FAILED
});