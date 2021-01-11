export type KeyInfo = {
    withAlt: boolean;
    withCtrl: boolean;
    keyCode: number[];
    action: () => void;
}

export type KeysMap = {
    [key: string]: KeyInfo
}

export type EventsByKey = {
    [key: number]: KeyInfo & {eventName: string}
}

export type KeyEventListenerType = (e: KeyboardEvent) => void;

export const addKeyEventListener = (window: Window, thisNode: Element | Text, keys: KeysMap): KeyEventListenerType => {
    let eventsObj: EventsByKey = {};
    Object.entries(keys).map(([key, value]) => {
        value.keyCode.map(keyCode => {
            eventsObj[keyCode] = { ...value, eventName: key };
        });
        // eventsObj[value.keyCode] = { ...value, eventName: key };
    })

    let listener = (event: KeyboardEvent) => {
        let key = event.keyCode;
        
        let evt = eventsObj[key];
        if (evt === undefined) {
            return;
        }

        let ctrl = evt.withCtrl ? event.ctrlKey : true;
        let alt = evt.withAlt ? event.altKey : true;

        if (ctrl && alt) {

            thisNode.dispatchEvent(new CustomEvent(evt.eventName, {detail: {}, bubbles: true}));
        }
    }

    window.addEventListener('keydown', listener, true);

    Object.entries(keys).map(([key, value]) => thisNode.addEventListener(key, value.action));

    return listener;
}

export const removeKeyEventListener = (thisNode: Element | Text, listener: any) => {
    thisNode.removeEventListener('onkeydown', listener, true);
}