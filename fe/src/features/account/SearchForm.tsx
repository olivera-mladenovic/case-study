import React, { ChangeEvent, FormEvent, useState } from "react";
import { SearchInput } from "../../models";
import { Form } from "semantic-ui-react";
import { useMutation } from "@apollo/client";
import { CREATE_REVIEW, GET_ALL_REVIEWS } from "../../graphql";

export const SearchForm: React.FC = () => {
    const [values, setValues] = useState<SearchInput>({
       query: ''
    });
   
    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValues({query: event.target.value });
    }
    
    // const [createReview, { loading, error }] = useMutation<CreatedReviewResponse>(CREATE_REVIEW, {
    //     onError(err) {
    //         console.log('Mutation error', err);
    //     },
    //     update(proxy, result) {
    //         if (!result.data?.createReview) return;
    //         const newestReview = {...result.data.createReview};
    //         newestReview.helpfulMarksCount = 0;
    //         newestReview.commentsCount = 0;
    //         proxy.updateQuery({
    //             query: GET_ALL_REVIEWS
    //         }, (data) => {
    //             return {
    //                 getReviews: {
    //                     reviews: [newestReview, ...(data.getReviews.reviews)]
    //                 }
    //             }
    //         });
    //         setValues({
    //             text: '', 
    //             book: '',
    //             author: ''
    //         });
    //     },
    //     variables: values,
    // });

    // if (error) console.log('Mutation error outside', error.message);
    
    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        //createReview();
    }

    const isButtonEnabled = (): boolean => Boolean(values.query);

    return (
        <div className="form">
            <Form onSubmit={onSubmit} className={true ? 'loading' : ''}>
                <Form.Input label="Search" placeholder="Search query" name="query" value={values.query} onChange={onChange} type="text" required />
                <Form.Button type="submit" floated="right" content="Create" color="orange" disabled={!isButtonEnabled()} />
            </Form>
        </div>
    )
}
