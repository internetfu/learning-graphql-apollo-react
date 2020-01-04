import React, { Component } from 'react';
import { AUTH_TOKEN } from '../constants';
import { timeDifferenceForDate } from '../utils/index';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

const VOTE_MUTATION = gql`
    mutation VoteMutation($linkId: ID!) {
        vote(linkId: $linkId) {
            id
            link {
                id
                votes {
                    id
                    user {
                        id
                    }
                }
            }
            user {
                id
            }
        }
    }
`;

export default class Link extends Component {
    render() {
        const authToken = localStorage.getItem(AUTH_TOKEN);

        return (
            <div className="flex mt2 items-start">
                <div className="flex items-center">
                    <span className="gray">{this.props.index + 1}</span>
                    {authToken && (
                        <Mutation
                            mutation={VOTE_MUTATION}
                            variables={{ linkId: this.props.link.id }}
                            update={(inMemoryCache, { data: { vote } }) => {
                                this.props.updateCacheAfterVote(
                                    inMemoryCache,
                                    vote,
                                    this.props.link.id
                                );
                            }}
                        >
                            {voteMutation => (
                                <div
                                    className="ml1 gray f11"
                                    onClick={voteMutation}
                                >
                                    ▲
                                </div>
                            )}
                        </Mutation>
                    )}
                </div>

                <div className="ml1">
                    <div>
                        {this.props.link.description}({this.props.url})
                    </div>
                    <div className="f6 lh-copy gray">
                        {this.props.link.votes.length} votes | by{' '}
                        {this.props.link.postedBy
                            ? this.props.link.postedBy.name
                            : 'Unknown'}{' '}
                        {timeDifferenceForDate(this.props.link.createdAt)}
                    </div>
                </div>
            </div>
        );
    }

    _voteForLink = () => {};
}
