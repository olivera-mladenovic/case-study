import React, { ChangeEvent, useEffect, useState } from 'react';
import { Button, Card, Icon, Item, Label, Segment, Form } from 'semantic-ui-react';
import { useSelectedReview } from '../../contexts';
import './styles/reviewDetails.css';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_COMMENT, DELETE_COMMENT, DELETE_REVIEW, GET_REVIEWS, GET_SINGLE_REVIEW, MARK_HELPFUL } from '../../graphql';
import { CreatedCommentResponse, DeletedCommentResponse, markHelpfulResponse, Review, SingleReview, SingleReviewResponse } from '../../models';
import { Link } from 'react-router-dom';

export const ReviewDetails: React.FC = () => {
    const selectedReviewContext = useSelectedReview();
    const [commentText, setCommentText] = useState<string>('');
    const [additionalInfoLatest, setAdditionalInfoLatest] = useState<SingleReview | null>(null);
    const [isCommentsShown, setIsCommentsShown] = useState(false);

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


    const [markHelpfulReview, { error: markHelpfulReviewError }] = useMutation<markHelpfulResponse>(MARK_HELPFUL, {
        onError(e) {
            console.log(e.message);
        },
        update(_, result) {
            if (selectedReviewContext?.selectedReview && result.data) {
                if (selectedReviewContext?.selectedReview && result.data) {
                    const selectedReviewUpdated = {
                        ...selectedReviewContext.selectedReview,
                        helpfulMarksCount: result.data.markHelpful.helpfulMarksCount
                    };
                    selectedReviewContext.selectReview(selectedReviewUpdated);
                    const additionalInfoLatestUpdated = {
                        ...additionalInfoLatest,
                        helpfulMarksCount: result.data.markHelpful.helpfulMarksCount
                    };
                    setAdditionalInfoLatest(additionalInfoLatestUpdated);
                }
            }
        },
        variables: { id: selectedReviewContext?.selectedReview?.id },
    });

    const onLike = async () => {
        await markHelpfulReview()
    };

    const [deleteReview, { loading, error }] = useMutation<boolean>(DELETE_REVIEW, {
        onError(e) {
            console.log(e);
        },
        update(proxy) {
            proxy.updateQuery({ query: GET_REVIEWS }, (data) => {
                const filteredReviews = data.getReviews.filter((r: Review) => r.id !== selectedReviewContext?.selectedReview?.id);
                return {
                    getReviews: filteredReviews
                };
            });
        }
    });

    const [createComment, { error: createCommentError }] = useMutation<CreatedCommentResponse>(CREATE_COMMENT, {
        onError(e) {
            console.log('Comment Text:', commentText);
            console.log('Selected Review ID:', selectedReviewContext?.selectedReview?.id);
            console.log('Error Message:', e.message);
        },
        update(_, result) {
            if (selectedReviewContext?.selectedReview && result.data) {
                const selectedReviewUpdated = {
                    ...selectedReviewContext.selectedReview,
                    commentsCount: selectedReviewContext.selectedReview.commentsCount + 1
                };
                selectedReviewContext.selectReview(selectedReviewUpdated);
                const additionalInfoLatestUpdated = {
                    ...additionalInfoLatest,
                    comments: result.data.createComment.comments
                };
                setAdditionalInfoLatest(additionalInfoLatestUpdated);
                setCommentText('');
            }
        }
    });

    const [deleteComment, { error: deleteCommentError }] = useMutation<DeletedCommentResponse>(DELETE_COMMENT, {
        onError(e) {
            console.log('Error Message:', e.message);
        },
        update(_, result) {
            if (selectedReviewContext?.selectedReview && result.data) {
                const selectedReviewUpdated = {
                    ...selectedReviewContext.selectedReview,
                    commentsCount: selectedReviewContext.selectedReview.commentsCount - 1
                };
                selectedReviewContext.selectReview(selectedReviewUpdated);
                const additionalInfoLatestUpdated = {
                    ...additionalInfoLatest,
                    comments: result.data.deleteComment.comments
                };
                setAdditionalInfoLatest(additionalInfoLatestUpdated);
            }
        }
    });

    if (markHelpfulReviewError) console.log(markHelpfulReviewError.message);
    if (createCommentError) console.log(createCommentError.message, createCommentError.graphQLErrors);
    if (deleteCommentError) console.log(deleteCommentError.message);
    if (additionalError) console.log(additionalError.message);

    if (!selectedReviewContext) return <></>;

    const selectedReview = selectedReviewContext.selectedReview;
    const onCancel = () => selectedReviewContext.cancelSelectedReview();

    const onDelete = () => {
        deleteReview({ variables: { id: selectedReview?.id } });
        selectedReviewContext.cancelSelectedReview();
        if (error) console.log(error.message);
    };
    const onCommentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setCommentText(event.target.value);
    }

    const onCommentCreate = () => {
        createComment({ variables: { reviewId: selectedReview?.id, text: commentText } });
        if (error) console.log(error.message);
    };

    const onCommentsShow = () => {
        setIsCommentsShown(!isCommentsShown);
    };

    const onCommentDelete = (commentId: string) => {
        deleteComment({
            variables: {
                reviewId: selectedReview?.id,
                commentId
            }
        });
    };

    return (
        selectedReview && <div className='reviewContainer'>
            <Segment>
                <Item style={{ padding: '12px' }}>
                    <Item.Content>
                        <Item.Header>{selectedReview.author}</Item.Header>
                        <Item.Meta>
                            <span className='date'>Date: {new Date(selectedReview.createdAt).toDateString()}. Time: {new Date(selectedReview.createdAt).toLocaleTimeString()}</span>
                        </Item.Meta>
                        Written by: <Item.Meta as={Link} to={`/user/${additionalInfo?.getReview?.user?.id}`} >
                            <span className='date'>{additionalInfo?.getReview.user?.name}</span>
                        </Item.Meta>
                        <Item.Description>
                            {selectedReview.text}
                        </Item.Description>
                    </Item.Content>
                    <div className='buttonsDetails'>
                        <Button labelPosition="left" onClick={onLike}>
                            <Icon name="thumbs up outline" color="brown" />
                        </Button>
                        <Label content={additionalInfoLatest?.helpfulMarksCount} size='small'></Label>
                        <span style={{ margin: '0 10px' }}></span>
                        <Button labelPosition="left" onClick={onCommentsShow}>
                            <Icon name="comment outline" color="brown" />
                        </Button>
                        <Label content={additionalInfoLatest?.comments?.length} size='small'></Label>
                        <span style={{ margin: '0 10%' }}></span>
                        <Button positive content='Cancel' onClick={onCancel} />
                        <Button content='Delete' onClick={onDelete} loading={loading} />
                    </div>

                    {
                        isCommentsShown && (
                            <>
                                <Form onSubmit={onCommentCreate}>
                                    <Form.TextArea label="Text" placeholder="Text" name="text" value={commentText} onChange={onCommentChange} type="text" required />
                                    <Form.Button type="submit" floated="right" content="Comment" color="orange" disabled={!commentText} />
                                </Form>

                                {additionalInfoLatest?.comments?.map(comment => (
                                    <Card fluid key={comment.id}>
                                        <Card.Content>
                                            <Card.Header>
                                                {comment.authorName}
                                                <span>
                                                    <Button content="Delete" floated='right' onClick={() => onCommentDelete(comment.id)} />
                                                </span>
                                            </Card.Header>
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
    );
};
