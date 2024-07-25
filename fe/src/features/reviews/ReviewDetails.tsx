import React, { ChangeEvent, useEffect, useState } from 'react';
import { Button, Card, Icon, Item, Label, Segment, Form } from 'semantic-ui-react';
import { useSelectedReview, useUser } from '../../contexts';
import './styles/reviewDetails.css'
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_COMMENT, DELETE_REVIEW, GET_REVIEWS, GET_SINGLE_REVIEW, MARK_HELPFUL } from '../../graphql';
import { CreatedCommentResponse, markHelpfulResponse, Review, SingleReview, SingleReviewResponse } from '../../models';
import { Link } from 'react-router-dom';

export const ReviewDetails: React.FC = () => {
    const selectedReviewContext = useSelectedReview();
    const userContext = useUser();
    const [commentText, setCommentText] = useState<string>('');
    const [additionalInfoLatest, setAdditionalInfoLatest] = useState<SingleReview | null>(null);

    const { data: additionalInfo, error: additionalError } = useQuery<SingleReviewResponse>(GET_SINGLE_REVIEW, {
        variables: { id: selectedReviewContext?.selectedReview?.id },
        skip: !selectedReviewContext?.selectedReview?.id,
        fetchPolicy: 'no-cache'
    });
    useEffect(() => {
        if (additionalInfo) {
          setAdditionalInfoLatest(additionalInfo.getReview);
        }
      }, [additionalInfo]);

    const onCommentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setCommentText(event.target.value);
    }

    const isCommentButtonEnabled = () => !!commentText;

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
    const [isCommentsShown, setIsCommentsShown] = useState(false);


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

    const [createComment, {error: createCommentError}] = useMutation<CreatedCommentResponse>(CREATE_COMMENT, {
        onError(e) {
            console.log('Comment Text:', commentText);
            console.log('Selected Review ID:', selectedReview?.id);
            console.log('Error Message:', e.message);
        },
        update(_, result) {
            if (selectedReview && result.data) {
                const selectedReviewUpdated = {
                    ...selectedReview,
                    commentsCount: selectedReview.commentsCount + 1
                }
                selectedReviewContext?.selectReview(selectedReviewUpdated);
                const additionalInfoLatestUpdated = {
                    ...additionalInfoLatest,
                    comments: result.data.createComment.comments
                };
                setAdditionalInfoLatest(additionalInfoLatestUpdated);
                setCommentText('');
            }
        },
        variables: { reviewId: selectedReviewContext?.selectedReview?.id, text: commentText}
    })
    if (markHelpfulReviewError) console.log(markHelpfulReviewError.message);

    if (createCommentError) console.log(createCommentError.message);

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

    const onCommentCreate = () => {
        createComment({variables: {id: selectedReview?.id, text: commentText}});
        if (error) console.log(error.message);   
    }

    const onCommentsShow = () => {
        setIsCommentsShown(!isCommentsShown);
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
                        <Item.Meta as={Link} to={`/user/${additionalInfo?.getReview?.user?.id}`} >
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
                        <Button labelPosition="left" onClick={onCommentsShow}>
                            <Icon name="comment outline" color="brown"/>
                        </Button>
                        <Label content={additionalInfoLatest?.comments.length} size='small'></Label>
                        <span style={{margin: '0 10%'}}></span>
                        <Button positive content='Cancel' onClick={onCancel} />
                        <Button content='Delete' onClick={onDelete} loading={loading}/>
                    </div>
                        
                        {
                            isCommentsShown && (
                                <>
                                    <Form onSubmit={onCommentCreate}>
                            <Form.TextArea label="Text" placeholder="Text" name="text" value={commentText} onChange={onCommentChange} type="text" required />
                            <Form.Button type="submit" floated="right" content="Comment" color="orange" disabled={!isCommentButtonEnabled()} />
                         </Form>
                        
                    
                         {additionalInfoLatest?.comments.map(comment => (
                            <Card fluid>
                                <Card.Content>
                                    <Card.Header>{comment.authorName}</Card.Header>
                                    <Card.Description>{comment.text}</Card.Description>
                                </Card.Content>
                            </Card>
                        ))}
                                </>
                            )
                        }
                    
                </Item>
            </Segment>
    </div>
    )
}