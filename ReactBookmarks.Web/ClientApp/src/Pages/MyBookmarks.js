import React from 'react';
import BookmarkRow from '../Components/BookmarkRow';
import axios from 'axios';
import { produce } from 'immer';

class MyBookmarks extends React.Component {
    state = {
        bookmark: {
            title: '',
            url: ''
        },       
        bookmarks: [],
        editMode: false,
        editTitle:''
       
    }
    componentDidMount = async () => {
        await this.refreshBookmarks();
    }
    refreshBookmarks = async () => {
        const { data } = await axios.get('/api/bookmark/getbookmarks');
        return this.setState({ bookmarks: data });
    }
    onTextChange = e => {
        const nextState = produce(this.state, draft => {
            draft.bookmark[e.target.name] = e.target.value;
        });
        this.setState(nextState);
    }
    onAddSubmit = async e => {
        e.preventDefault();
        const { title, url } = this.state.bookmark;
        await axios.post('/api/bookmark/addbookmark', { title, url });
        const nextState = produce(this.state, draft => {
            draft.bookmark.title = '';
            draft.bookmark.url = '';
        });
        this.setState(nextState);
        await this.refreshBookmarks();
    }

    onDeleteClick = async bookmarkId => {
        await axios.post('/api/bookmark/deletebookmark', { id: bookmarkId });
        await this.refreshBookmarks();
    }
    onEditClick = id => {
        const { editMode } = this.setState;
        this.setState({ editMode: !editMode });
    }
    onUpdateClick = async (id, url) => {
        const { editTitle } = this.state;
        await axios.post('/api/bookmark/editbookmark', { id, title : editTitle, url})
        this.setState({ editMode: false });
        await this.refreshBookmarks();
    }

    onUpdateTextChange = e => {
        const nextState = produce(this.state, draft => {
            draft.editTitle = e.target.value;
        });
        this.setState(nextState);
    }

    render() {
        const { title, url } = this.state.bookmark;
        return (
            <div>
                <h2>Bookmarks</h2>
                <div className='row'>
                    <h3>Add a bookmark</h3>
                    <form onSubmit={this.onAddSubmit}>
                        <div className='col-md-3'>
                            <input type='text' name='title' value={title} placeholder='Title' className='form-control' onChange={this.onTextChange} />
                        </div>
                        <div className='col-md-3'>
                            <input type='text' name='url' value={url} placeholder='URL' className='form-control' onChange={this.onTextChange} />
                        </div>
                        <div className='col-md-3'>
                            <button className='btn btn-success'>Add</button>
                        </div>
                    </form>
                </div>
                <table className='table table-hover table-striped table-bordered'>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>URL</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.bookmarks.map(b =>
                            <BookmarkRow
                                key={b.id}
                                bookmark={b}
                                editMode={this.state.editMode}
                                editTitle={this.state.editTitle}
                                onDeleteClick={() => this.onDeleteClick(b.id)}
                                onEditClick={() => this.onEditClick(b.id)}
                                onUpdateClick={() => this.onUpdateClick(b.id, b.url)}
                                onUpdateTextChange={e =>this.onUpdateTextChange(e)}
                            />)}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default MyBookmarks;