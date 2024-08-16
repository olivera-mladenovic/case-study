
import React from "react";
import { Card, Header, Segment } from "semantic-ui-react";
import { GET_FILTERED_REVIEWS } from "../../graphql";
import { MenuBar } from "../menu";
import './styles/UserScreen.css';
import { useQuery } from "@apollo/client";
import { Review } from "../../models";
import { useParams } from 'react-router-dom';

export const  UserScreen: React.FC = () => {
    const { userId } = useParams();
    const { loading, data, error } = useQuery(GET_FILTERED_REVIEWS, {
        variables: {
            authorId: userId
        },
        onError(err) {
            console.error(err)
        }
    });
    if (error) {
        console.log(error)
    }

    return (
        <div>
            <MenuBar/>
            <div className="container">
                <Header size="huge">User: {data?.getReviews?.reviews[0]?.user?.name}</Header>
                <Segment className={loading ? 'loading' : ''}>
                    <Header size="large">Latest reviews</Header>
                    <Card.Group>
                        {
                        data?.getReviews?.reviews?.map((r:Review) => (
                            <Card key={r.id}>
                                <Card.Content>
                                    <Card.Header>{r.book}</Card.Header>
                                </Card.Content>
                            </Card>
                        ))}
                    </Card.Group>
                </Segment>
        </div>
        </div>
    )
}