import { Host } from "../models/host";

const findInTreeByPredicate = (root: Host, predicate: (element: Host) => boolean): Host[] => {
    let found: Host[] = [];
    const findHostRecurse = (root: Host, predicate: (element: Host) => boolean , found: Host[]) => {
        if (predicate(root)) {
            found.push(root);
        }
        if (root.dir) {
            for (const e of root.chld) {
                findHostRecurse(e, predicate, found);
            }
        }
    }
    findHostRecurse(root, predicate, found);
    return found;
}

export const findByTag = (root: Host, tagId: number): Host[] => {
    return findInTreeByPredicate(root, (h) => h.tags.map(t => t.id).includes(tagId));
}

export const findHostById = (root: Host, id: number): Host | null => {
    let found: Host[] = [];
    const findHostRecurse = (root: Host, id: number, found: Host[]) => {
        if (root.id === id) {
            found.push(root);
            return
        } else if (root.dir) {
            for (const e of root.chld) {
                if (!e.dir) continue;
                findHostRecurse(e, id, found);
            }
        }
    }
    findHostRecurse(root, id, found);
    return (found.length > 0) ? found[0] : null
}

export const findExactHostById = (root: Host, id: number): Host | null => {
    let found: Host[] = [];
    const findHostRecurse = (root: Host, id: number, found: Host[]) => {
        if (root.id === id) {
            found.push(root);
            return
        } else if (root.dir) {
            for (const e of root.chld) {
                findHostRecurse(e, id, found);
            }
        }
    }
    findHostRecurse(root, id, found);
    return (found.length > 0) ? found[0] : null
}
