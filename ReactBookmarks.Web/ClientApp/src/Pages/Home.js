import React from 'react'
import axios from 'axios';

class Home extends React.Component {

    state = {
        topBookmarks: []
    }
    componentDidMount = async () => {
        const { data } = await axios.get('/api/account/gettop5bookmarks');
        this.setState({ topBookmarks: data });
    }

    render() {
        return (
            <div>
                <div>
                    <h2>Top 5 bookmarked pages:</h2>
                </div>
                <div>
                    <ul>
                        {this.state.topBookmarks.map(b => <li>
                            <a href={b.bookmark.url}>{b.bookmark.title}   </a>
                              Amount of users bookmarked:({b.amount})</li>)};
                </ul>
                </div>
            </div>
        );
    }

}

export default Home;