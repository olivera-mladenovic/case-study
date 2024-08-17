
import React from "react";
import { Card, Grid, Header, Segment } from "semantic-ui-react";
import { GET_FILTERED_REVIEWS, GET_USERS_COMMENTS } from "../../graphql";
import { MenuBar } from "../menu";
import './styles/UserScreen.css';
import { useQuery } from "@apollo/client";
import { Review } from "../../models";
import { useParams } from 'react-router-dom';
import moment from 'moment';

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
            <Grid>
            <Card
    image='/profile/man.jpg'
    header={reviewsData?.getReviews?.reviews[0]?.user?.name}
    meta='Reviewer'
    description='Elliot is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat.'
    style={{"marginRight": '20px'}}
  />
                
                <Segment className={reviewsLoading ? 'loading' : 'removeMargin'}>
                    <Header size="large">Latest reviews:</Header>
                    <Card.Group>
                        {
                        reviewsData?.getReviews?.reviews?.map((r:Review) => (
                            <Card key={r.id}>
                                <Card.Content>
                                    <Card.Header>{`${r.book}, ${r.author}`}</Card.Header>
                                    <Card.Meta>{moment().to(r.createdAt)}</Card.Meta>
                                    <Card.Content>{r.text}</Card.Content>
                                </Card.Content>
                            </Card>
                        ))}
                    </Card.Group>

                    <Header size="large">Latest comments:</Header>
                    <Card.Group className={commentsLoading ? 'loading' : ''}>
                        {
                        commentsData?.getCommentsByAuthor?.comments?.map((r: any) => (
                            <Card key={r.id}>
                                <Card.Content>
                                    <Card.Header>{`${r.book}, ${r.author}`}</Card.Header>
                                    <Card.Meta>{moment().to(r.createdAt)}</Card.Meta>
                                    <Card.Content>{r.text}</Card.Content>
                                </Card.Content>
                            </Card>
                        ))}
                    </Card.Group>
                    <Header size="large">Total Reviews: {reviewsData?.getReviews?.total}</Header>
                    <Header size="large">Total Comments: {commentsData?.getCommentsByAuthor?.total}</Header>
                </Segment>
                
            </Grid>
        </div>
        </div>
    )
}