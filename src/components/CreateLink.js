import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

const POST_MUTATION = gql`
    mutation PostMutation($description: String!, $url: String!) {
        post(description: $description, url: $url) {
            id
            createdAt
            url
            description
        }
    }
`;

class CreateLink extends Component {
    state = {
        description: '',
        url: ''
    };

    onChangeHandler = event => {
        event.preventDefault();
        const currentTarget = event && event.target;
        currentTarget &&
            currentTarget.name &&
            this.setState({ [currentTarget.name]: currentTarget.value });
    };

    render() {
        const { description, url } = this.state;

        return (
            <div>
                <div className="flex flex-column mt3">
                    <input
                        className="mb2"
                        value={description}
                        name="description"
                        onChange={this.onChangeHandler}
                        type="text"
                        placeholder="A description for the link"
                    />
                    <input
                        type="text"
                        className="mb2"
                        value={url}
                        name="url"
                        onChange={this.onChangeHandler}
                        placeholder="The URL for the link"
                    />
                </div>
                <Mutation
                    mutation={POST_MUTATION}
                    variables={{ description, url }}
                    onCompleted={() => this.props.history.push('/')}
                >
                    {postMutation => (
                        <button onClick={postMutation}>Submit</button>
                    )}
                </Mutation>
            </div>
        );
    }
}

export default CreateLink;
