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

export const findAllDirs = (root: Host): Host[] => {
    return findInTreeByPredicate(root, (h) => h.dir);
}

export const findByTag = (root: Host, tagId: number): Host[] => {
    return findInTreeByPredicate(root, (h) => h.tags.map(t => t.id).includes(tagId));
}

export const flattenTree = <T extends unknown>(root: Host, extractor: (host: Host) => T): T[] => {
    let resultList: T[] = [];
    const applyRecurse = (host: Host, extractor: (host: Host) => T) => {
        if (! host.dir) {
            resultList.push(extractor(host));
            return;
        }
        resultList.push(extractor(host));
        host.chld.map(h => applyRecurse(h, extractor));
    }
    applyRecurse(root, extractor);
    return resultList;
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
