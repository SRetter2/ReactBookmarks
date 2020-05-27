import React from 'react';
import { produce } from 'immer';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

class Signup extends React.Component {
    state = {
        id:'',
        email: '',
        password: '',
        isValidLogin: true
    }
    onTextChange = e => {
        const nextState = produce(this.state, draft => {
            draft[e.target.name] = e.target.value;
        });
        this.setState(nextState);
    }
    onFormSubmit = async (e, setUser) => {
        e.preventDefault();
        const { email, password } = this.state;
        const { data } = await axios.post('api/account/login', { email, password });
        const isValidLogin = !!data;
        this.setState({ isValidLogin });
        setUser(data);
        this.props.history.push(`/mybookmarks`);
    }

    render() {
        const {email, password } = this.state;
        return (
            <AuthContext.Consumer>
                {value => {
                    const { setUser } = value;
                    return   <div className="row">
                        <div className="col-md-6 col-md-offset-3 well">
                            <h3>Login to your account</h3>
                            <form onSubmit={e => this.onFormSubmit(e, setUser)}>                                
                                <input onChange={this.onTextChange} type="text" name="email" placeholder="Email" className="form-control" value={email} />
                                <br />
                                <input onChange={this.onTextChange} type="password" name="password" placeholder="Password" className="form-control" value={password} />
                                <br />
                                <button className='btn btn-primary'>Login</button>
                            </form>
                            <Link to="/signup">Sign up for a new account</Link>
                        </div>
                    </div>
                }}
            </AuthContext.Consumer>
        );
    }

}

export default Signup;