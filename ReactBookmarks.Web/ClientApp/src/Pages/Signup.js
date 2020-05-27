import React from 'react';
import { produce } from 'immer';
import axios from 'axios';

class Signup extends React.Component {
    state = {
        name: '',
        email: '',
        password: ''
    }
    onTextChange = e => {
        const nextState = produce(this.state, draft => {
            draft[e.target.name] = e.target.value;
        });
        this.setState(nextState);
    }
    onFormSubmit = async e => {
        e.preventDefault();
        const { name, email, password } = this.state;
        await axios.post('/api/account/signup', { name, email, password });
        this.props.history.push('/login');
    }

        render()
        {
            const { name, email, password } = this.state;
            return (
                <div className="row">
                    <div className="col-md-6 col-md-offset-3 well">
                        <h3>Sign up for a new account</h3>
                        <form onSubmit={this.onFormSubmit}>
                            <input onChange={this.onTextChange} type="text" name="name" placeholder="Name" className="form-control" value={name} />
                            <br />
                            <input onChange={this.onTextChange} type="text" name="email" placeholder="Email" className="form-control" value={email} />
                            <br />
                            <input onChange={this.onTextChange} type="password" name="password" placeholder="Password" className="form-control" value={password} />
                            <br />
                            <button className="btn btn-primary">Signup</button>
                        </form>
                    </div>
                </div>
            );
        }
    
}

export default Signup;