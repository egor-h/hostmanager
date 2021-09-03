import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { AppState } from '../../state/reducers';
import NoteForm from './NoteForm';
import { FullNoteState } from '../../state/reducers/notes';
import CircleLoading from '../CircleLoading';
import { createNote, deleteNote, fetchFullNote, saveNote } from '../../api/note';
import { findExactHostById, flattenTree } from '../../util/tree';
import { TreeState } from '../../state/reducers/hostsBrowser';
import { Host } from '../../models/host';

type EditWrapperProps = {
    fullNote: FullNoteState;
    tree: TreeState;

    fetchNote: (id: number, onSuccess?: () => void) => void;
    saveNote: typeof saveNote;
    deleteNote: typeof deleteNote
} & RouteComponentProps<{notesId: string}>;

type EditWrapperState = {
    hostList: {id: number, name: string}[];
    hostsWithNote: Host[];
    ready: boolean;
}

const mapStateToProps = (state: AppState) => ({
    fullNote: state.notes.fullNote,
    tree: state.hostsBrowser.tree
})

const mapDispatchToProps = (dispatch: any) => ({
    fetchNote: bindActionCreators(fetchFullNote, dispatch),
    saveNote: bindActionCreators(saveNote, dispatch),
    deleteNote: bindActionCreators(deleteNote, dispatch)
})

class EditNoteWrapper extends React.Component<EditWrapperProps, EditWrapperState> {
    constructor(props: EditWrapperProps) {
        super(props)

        this.state = {
            ready: false,
            hostList: [],
            hostsWithNote: []
        }
    }

    componentDidMount() {
        let foundHosts: Host[] = [];
        this.props.fetchNote(+this.props.match.params.notesId, () => {
            for (let noteHost of this.props.fullNote.data.hosts) {
                console.log(`Finding ${noteHost}`);
                let found = findExactHostById(this.props.tree.tree, noteHost);
                console.log(found);
                if (found !== null) {
                    foundHosts.push(found);
                }
            }
            this.setState({hostsWithNote: foundHosts});
            console.log("did mount")
            console.log(this.state);
        });
        this.setState({hostList: flattenTree(this.props.tree.tree, h => ({id: h.id, name: h.name})), hostsWithNote: foundHosts, ready: true});
    }

    render() {
        if (this.props.fullNote.loading || !this.state.ready) {
            return (<CircleLoading />);
        }
        if (this.props.fullNote.error) {
            return (<p>Error</p>);
        }
        return (<NoteForm title={'Edit note'} 
            note={this.props.fullNote.data} 
            preAddedHosts={this.state.hostsWithNote} 
            allHosts={this.state.hostList} 
            onSubmit={(note) => {
                this.props.saveNote(note.id, {...note, hosts: note.hosts})
            }} 
            showDeleteButton={true} 
            onDelete={(noteId) => {
                this.props.deleteNote(noteId)
            }}  />);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditNoteWrapper));
