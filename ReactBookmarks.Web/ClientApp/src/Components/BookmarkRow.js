import React from 'react';

const BookmarkRow = (props) => {

    const { title, url,} = props.bookmark;
    const { editMode, onEditClick, onUpdateClick, onDeleteClick, onUpdateTextChange} = props;
    return (
        <tr>
            <td>
                {!editMode && title}
                {editMode && <input type='text' defaultValue={title} name='editTitle' className='form-control' onChange={onUpdateTextChange}/>}
            </td>
            <td>
                <a href={url}>{url}</a>
            </td>
            <td>
                {!editMode && <button className='btn btn-primary' onClick={onEditClick}>Edit</button>}
                {editMode && <button className='btn btn-primary' onClick={onUpdateClick}>Update</button>}
            </td>
            <td>
                <button className='btn btn-danger' onClick={onDeleteClick}>Delete</button>
            </td>
        </tr>
        );

}

export default BookmarkRow;