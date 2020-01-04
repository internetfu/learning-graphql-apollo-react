import React, { Component } from 'react';
import { AUTH_TOKEN } from '../constants';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

const SIGNUP_MUTATION = gql`
    mutation SignupMutation(
        $email: String!
        $password: String!
        $name: String!
    ) {
        signup(email: $email, password: $password, name: $name) {
            token
        }
    }
`;

const LGOIN_MUTATION = gql`
    mutation LoginMutation($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
        }
    }
`;

export default class Login extends Component {
    state = {
        login: true,
        email: '',
        password: '',
        name: ''
    };

    onChangeHandler = event => {
        event.preventDefault();

        const currentTarget = event && event.target;
        currentTarget &&
            currentTarget.name &&
            this.setState({ [currentTarget.name]: currentTarget.value });
    };

    render() {
        const { login, email, password, name } = this.state;

        return (
            <div>
                <h4 className="mv3">{login ? 'Login' : 'Sign up'}</h4>
                <div className="flex flex-column">
                    {!login && (
                        <input
                            type="text"
                            placeholder="Your name"
                            value={name}
                            name="name"
                            onChange={this.onChangeHandler}
                        />
                    )}
                    <input
                        type="text"
                        value={email}
                        name="email"
                        placeholder="Your email"
                        onChange={this.onChangeHandler}
                    />
                    <input
                        type="text"
                        value={password}
                        name="password"
                        placeholder="Your password"
                        onChange={this.onChangeHandler}
                    />
                    <div className="flex mt3">
                        <Mutation
                            mutation={login ? LGOIN_MUTATION : SIGNUP_MUTATION}
                            variables={{ email, password, name }}
                            onCompleted={data => this._confirm(data)}
                        >
                            {mutation => (
                                <div
                                    className="pointer mr2 button"
                                    onClick={mutation}
                                >
                                    {login ? 'login' : 'create account'}
                                </div>
                            )}
                        </Mutation>
                        <div
                            className="pointer button"
                            onClick={() => this.setState({ login: !login })}
                        >
                            {login
                                ? 'need to create an account?'
                                : 'already have an account?'}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    _confirm = async data => {
        const { token } = this.state.login ? data.login : data.signup;
        this._saveUserData(token);
        this.props.history.push('/');
    };

    _saveUserData = token => {
        localStorage.setItem(AUTH_TOKEN, token);
    };
}
