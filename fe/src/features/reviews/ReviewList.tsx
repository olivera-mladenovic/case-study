
import React from "react";
import { gql, useQuery } from "@apollo/client";
import { Button, Icon, Item, Label, Segment } from "semantic-ui-react";
import { Review } from "../../models";

export default function ReviewList() {
    
    const { loading, data } = useQuery(GET_REVIEWS);
   if (loading) return <Segment className={loading ? 'loading' : ''}></Segment>
    return (
        <Segment className={loading ? 'loading' : ''}>
            <Item.Group divided>
                {data.getReviews.map((r: Review) => (
                    <Item key={r.id}>
                        <Item.Content>
                            <Item.Header>{`${r.author}, ${r.book}`}</Item.Header>
                            <Item.Meta>Date: {new Date(r.createdAt).toDateString()}</Item.Meta>
                            <Item.Description>
                                    <div>{r.text}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button floated="right" content='View' color="brown" circular onClick={()=>console.log('view review')}/>
                                <Button labelPosition="left" onClick={()=>console.log('mark helpful')}>
                                    <Icon name="thumbs up outline" size="big" color="brown"/>
                                    <Label content="x" ></Label>
                                </Button>
                                <span></span>
                                <Button labelPosition="left" onClick={()=>console.log('comment here  ')}>
                                    <Icon name="comment" size="big" color="brown"/>
                                    <Label content="x"></Label>
                                </Button>
                            </Item.Extra>

                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
}

const GET_REVIEWS = gql`
{
    getReviews {
        createdAt
        text
        book
        author
    }
   }
`;