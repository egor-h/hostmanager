import { local, LocalState } from './localState';
import { home, HomeState } from './home';
import { hostsBrowser, HostsBrowserState } from './hostsBrowser';
import { tags, TagState } from './tags';
import { protocols, ProtocolState } from './protocols';
import { notes, NoteState } from './notes';
import { search, SearchState } from './search';
import { stat, StatState } from './stat';
import { auth, AuthState } from './auth';

export type AppState = {
    local: LocalState;
    home: HomeState;
    tags: TagState;
    protocols: ProtocolState;
    notes: NoteState;
    hostsBrowser: HostsBrowserState;
    search: SearchState;
    stat: StatState;
    auth: AuthState;
}

export {
    local,
    home,
    tags,
    protocols,
    notes,
    search,
    stat,
    auth,
    hostsBrowser
}
