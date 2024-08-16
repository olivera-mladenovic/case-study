
import React from "react";
import { Card, Header, Segment } from "semantic-ui-react";
import { GET_FILTERED_REVIEWS, GET_USERS_COMMENTS } from "../../graphql";
import { MenuBar } from "../menu";
import './styles/UserScreen.css';
import { useQuery } from "@apollo/client";
import { Review } from "../../models";
import { useParams } from 'react-router-dom';

export const  UserScreen: React.FC = () => {
    const { userId } = useParams();
    const { loading: reviewsLoading, data: reviewsData, error: reviewsError } = useQuery(GET_FILTERED_REVIEWS, {
        variables: {
            authorId: userId
        },
        onError(err) {
            console.error(err)
        }
    });
    if (reviewsError) {
        console.log(reviewsError)
    }

    const {loading: commentsLoading, data: commentsData, error: commentsError} = useQuery(GET_USERS_COMMENTS, {
        variables: {
            authorId: userId
        },
        onError(err) {
            console.error(err)
        }
    })
    if (commentsError) {
        console.log(commentsError)
    }

    return (
        <div>
            <MenuBar/>
            <div className="container">
                <Header size="huge">User: {reviewsData?.getReviews?.reviews[0]?.user?.name}</Header>
                <Segment className={reviewsLoading ? 'loading' : ''}>
                    <Header size="large">Latest reviews</Header>
                    <Card.Group>
                        {
                        reviewsData?.getReviews?.reviews?.map((r:Review) => (
                            <Card key={r.id}>
                                <Card.Content>
                                    <Card.Header>{r.book}</Card.Header>
                                </Card.Content>
                            </Card>
                        ))}
                    </Card.Group>
                </Segment>
                <Segment className={commentsLoading ? 'loading' : ''}>
                    <Header size="large">Latest comments</Header>
                    <Card.Group>
                        {
                        commentsData?.getCommentsByAuthor?.comments?.map((r: any) => (
                            <Card key={r.id}>
                                <Card.Content>
                                    <Card.Header>{r.text}</Card.Header>
                                </Card.Content>
                            </Card>
                        ))}
                    </Card.Group>
                </Segment>
        </div>
        </div>
    )
}