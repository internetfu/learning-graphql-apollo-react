import React, { Component } from 'react';
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import Link from './Link';

const FEED_SEARCH_QUERY = gql`
    query Feed_Search($filter: String!) {
        feed(filter: $filter) {
            links {
                id
                createdAt
                description
                url
                postedBy {
                    id
                    name
                }
                votes {
                    id
                    user {
                        id
                        name
                    }
                }
            }
        }
    }
`;

class Search extends Component {
    state = {
        links: [],
        filter: ''
    };

    render() {
        const { links, filter } = this.state;

        return (
            <div>
                <div>
                    Search
                    <input
                        type="text"
                        value={filter}
                        onChange={e =>
                            this.setState({ filter: e.target.value })
                        }
                    />
                    <button onClick={() => this._executeSearch()}>OK</button>
                </div>
                {links.map((link, index) => (
                    <Link key={link.id} link={link} index={index} />
                ))}
            </div>
        );
    }

    _executeSearch = async () => {
        const { filter } = this.state;
        const result = await this.props.client.query({
            query: FEED_SEARCH_QUERY,
            variables: { filter }
        });

        const links = result.data.feed.links;
        this.setState({ links });
        this.setState({ filter: '' });
    };
}

export default withApollo(Search);
