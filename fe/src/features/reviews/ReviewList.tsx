
import React from "react";
import { useQuery } from "@apollo/client";
import { Button, Icon, Item, Label, Segment } from "semantic-ui-react";
import { Review } from "../../models";
import { GET_REVIEWS } from "../../graphql";
import { useSelectedReview } from "../../contexts";



export default function ReviewList() {
    
const { loading, data } = useQuery(GET_REVIEWS);
const selectedReviewContext = useSelectedReview();

   if (loading) return <Segment className={loading ? 'loading' : ''}></Segment>
    return (
        <Segment className={loading ? 'loading' : ''}>
            <Item.Group divided>
                {data.getReviews.map((r: Review) => (
                    <Item key={r.id} style={{padding: '12px'}}>
                        <Item.Content>
                            <Item.Header>{`${r.author}, ${r.book}`}</Item.Header>
                            <Item.Meta>Date: {new Date(r.createdAt).toDateString()}</Item.Meta>
                            <Item.Description>
                                    <div>{r.text}</div>
                            </Item.Description>
                            <Item.Extra style={{marginTop: '17px'}}>
                                <Button floated="right" content='View' color="brown" circular onClick={()=> selectedReviewContext!.selectReview(r)}/>
                                {/* <Button labelPosition="left" onClick={()=>console.log('mark helpful')}> */}
                                    <Icon name="thumbs up outline" size="big" color="brown"/>
                                {/* </Button> */}
                                    <Label content={r.helpfulMarksCount}></Label>
                                <span style={{margin: '0 10px'}}></span>
                                {/* <Button labelPosition="left" onClick={()=>console.log('comment here  ')}> */}
                                    <Icon name="comment outline" size="big" color="brown"/>
                                {/* </Button> */}
                                    <Label content={r.commentsCount} ></Label>
                            </Item.Extra>

                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
}