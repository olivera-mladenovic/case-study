import React, { useEffect, useState } from 'react';
import { Button, Icon, Item, Label, Segment } from 'semantic-ui-react';
import { useSelectedReview, useUser } from '../../contexts';
import './styles/reviewDetails.css'
import { useMutation, useQuery } from '@apollo/client';
import { DELETE_REVIEW, GET_REVIEWS, GET_SINGLE_REVIEW, MARK_HELPFUL } from '../../graphql';
import { markHelpfulResponse, Review, SingleReviewResponse } from '../../models';
import { Link } from 'react-router-dom';

export const ReviewDetails: React.FC = () => {
    const selectedReviewContext = useSelectedReview();
    const userContext = useUser();
    const { data: additionalInfo, error: additionalError } = useQuery<SingleReviewResponse>(GET_SINGLE_REVIEW, {
        variables: { id: selectedReviewContext?.selectedReview?.id },
        skip: !selectedReviewContext?.selectedReview?.id
    });

    if (additionalError) console.log(additionalError.message);

    const [deleteReview, {loading, error}] = useMutation<boolean>(DELETE_REVIEW, {
        onError(e) {
            console.log(e);
        },
        update(proxy) {
            proxy.updateQuery({query: GET_REVIEWS}, (data) => {
                console.log(data);
                const filteredReviews = data.getReviews.filter((r: Review)=> r.id !== selectedReview?.id);
                return {
                    getReviews: filteredReviews
                }
            })
        }
    })
    const [isLiked, setLiked] = useState(false);
const [localLikeChange, setLocalLikeChange] = useState(false);

useEffect(() => {
  if (!localLikeChange && additionalInfo?.getReview.helpfulMarks && userContext?.user?.id) {
    const found = additionalInfo.getReview.helpfulMarks.some(
      (m) => m.authorId === userContext.user?.id
    );
    setLiked(found);
  }
}, [additionalInfo?.getReview.helpfulMarks, userContext?.user?.id, selectedReviewContext?.selectedReview, localLikeChange]);


    const [markHelpfulReview, {error: markHelpfulReviewError}] = useMutation<markHelpfulResponse>(MARK_HELPFUL, {
        onError(e) {
            console.log(e.message);
        },
        update(_, result) {
            if (selectedReview && result.data) {
                const selectedReviewUpdated = {
                    ...selectedReview,
                    helpfulMarksCount: result.data.markHelpful.helpfulMarksCount
                }
                selectedReviewContext?.selectReview(selectedReviewUpdated);
            }
        },
        variables: { id: selectedReviewContext?.selectedReview?.id },
    })
    if (markHelpfulReviewError) console.log(markHelpfulReviewError.message);

    if (!selectedReviewContext) return <></>

    const selectedReview = selectedReviewContext.selectedReview;
    const onCancel = () => selectedReviewContext.cancelSelectedReview();
   
    const onDelete = () => {   
        deleteReview({variables: {id: selectedReview?.id}})
        selectedReviewContext.cancelSelectedReview();
        if (error) console.log(error.message);   
    }

    const onLike = () => {
        markHelpfulReview({ variables: { id: selectedReview?.id } });
        setLiked(!isLiked);
        setLocalLikeChange(true);
        if (error) console.log(error.message);
      }
    
    return (
        selectedReview && <div className='reviewContainer'>
            <Segment>
            <Item style={{padding: '12px'}}>
                <Item.Content>
                <Item.Header>{selectedReview.author}</Item.Header>
                    <Item.Meta>
                        <span className='date'>Date: {new Date(selectedReview.createdAt).toDateString()}. Time: {new Date(selectedReview.createdAt).toLocaleTimeString()}</span>
                    </Item.Meta>
                    <Item.Meta as={Link} to={`/user/${additionalInfo?.getReview.user.id}`} >
                        <span className='date'>Written by: {additionalInfo?.getReview.user?.name}</span>
                    </Item.Meta>
                     <Item.Description>
                        {selectedReview.text}
                    </Item.Description>
                </Item.Content>
        
        <div className='buttonsDetails'>
            <Button labelPosition="left" onClick={onLike}>
                <Icon name={isLiked ? "thumbs up" : "thumbs up outline"} color="brown"/>
            </Button>
            <Label content={selectedReview.helpfulMarksCount} size='small'></Label>
            <span style={{margin: '0 10px'}}></span>
            <Button labelPosition="left" onClick={()=>console.log('comment here  ')}>
                <Icon name="comment outline" color="brown"/>
            </Button>
                <Label content={selectedReview.commentsCount} size='small'></Label>
            <span style={{margin: '0 10%'}}></span>


            <Button positive content='Cancel' onClick={onCancel} />
            <Button content='Delete' onClick={onDelete} loading={loading}/>
        </div>
        
        </Item>
            </Segment>
    </div>
    
    )
}