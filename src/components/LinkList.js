import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Link from './Link';

export const FEED_QUERY = gql`
    {
        feed {
            links {
                id
                createdAt
                url
                description
                postedBy {
                    id
                    name
                }
                votes {
                    id
                    user {
                        id
                    }
                }
            }
        }
    }
`;

export default class LinkList extends Component {
    render() {
        return (
            <Query query={FEED_QUERY}>
                {({ loading, error, data }) => {
                    if (loading) return <div>Fetching</div>;
                    if (error) return <div>Error</div>;

                    const linksToRender = data.feed.links;

                    return (
                        <div>
                            {linksToRender.map((link, index) => (
                                <Link
                                    key={link.id}
                                    link={link}
                                    index={index}
                                    updateCacheAfterVote={
                                        this._updateCacheAfterVote
                                    }
                                />
                            ))}
                        </div>
                    );
                }}
            </Query>
        );
    }

    _updateCacheAfterVote(inMemoryCache, createdVote, currentLinkId) {
        const feedCache = inMemoryCache.readQuery({ query: FEED_QUERY });

        const votedLink = feedCache.feed.links.find(
            link => link.id === currentLinkId
        );
        votedLink.votes = createdVote.link.votes;

        inMemoryCache.writeQuery({ query: FEED_QUERY, feedCache });
    }
}
