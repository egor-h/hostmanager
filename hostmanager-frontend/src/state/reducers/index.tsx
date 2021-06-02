import { local, LocalState } from './localState';
import { home, HomeState } from './home';
import { hostsBrowser, HostsBrowserState } from './hostsBrowser';
import { tags, TagState } from './tags';
import { protocols, ProtocolState } from './protocols';
import { notes, NoteState } from './notes';
import { search, SearchState } from './search';
import { fullSearch, FullSearchState } from './fullSearch';
import { stat, StatState } from './stat';
import { auth, AuthState } from './auth';
import { users, UserState } from './users';

export type AppState = {
    local: LocalState;
    home: HomeState;
    tags: TagState;
    protocols: ProtocolState;
    notes: NoteState;
    hostsBrowser: HostsBrowserState;
    search: SearchState;
    fullSearch: FullSearchState;
    stat: StatState;
    auth: AuthState;
    users: UserState;
}

export {
    local,
    home,
    tags,
    protocols,
    notes,
    search,
    fullSearch,
    stat,
    auth,
    hostsBrowser,
    users
}
