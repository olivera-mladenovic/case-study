import React from 'react';
import { Button, Icon, Item, Segment } from 'semantic-ui-react';
import { useSelectedReview } from '../../contexts';
import './styles/reviewDetails.css'
import { useMutation } from '@apollo/client';
import { DELETE_REVIEW, GET_REVIEWS } from '../../graphql';
import { Review } from '../../models';

export const ReviewDetails: React.FC = () => {
    const selectedReviewContext = useSelectedReview();

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

    if (!selectedReviewContext) return <></>

    const selectedReview = selectedReviewContext.selectedReview;
    const onCancel = () => selectedReviewContext.cancelSelectedReview();
   
    const onDelete = () => {   
        deleteReview({variables: {id: selectedReview?.id}})
        selectedReviewContext.cancelSelectedReview();
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
                     <Item.Description>
                        {selectedReview.text}
                    </Item.Description>
                </Item.Content>
        <Item.Content extra> 
            <Icon name='user' />
        </Item.Content>
        
        <div className='buttonsDetails'>
        <Button positive content='Cancel' onClick={onCancel} />
        <Button content='Delete' onClick={onDelete} loading={loading}/>
        </div>
        
        </Item>
            </Segment>
    </div>
    
    )
}