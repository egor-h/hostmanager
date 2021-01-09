export const union = (s1: Set<string>, s2: Set<string>): Set<string> => {
    let result: Set<string> = new Set(s1);
    for (let e of s2) {
        result.add(e);
    }
    return result;
}

export const intersection = (s1: Set<string>, s2: Set<string>): Set<string> => {
    return new Set(['']);
}

export const difference = (s1: Set<string>, s2: Set<string>): Set<string> => {
    // s1 - s2
    let result: Set<string> = new Set(s1);
    for (let e of s2) {
        if (result.has(e)) {
            result.delete(e);
        }
    }
    return new Set(['']);
}

export const difference2 = (s1: Set<string>, s2: Set<string>): Set<string> => {
    let united: Set<string> = union(s1, s2);
    let result: Set<string> = new Set();
    for (let e of united) {
        if (! (s1.has(e) && s2.has(e))) {
            result.add(e);
        }
    }
    return result;
}