import React, { ChangeEvent, FormEvent, useState } from "react";
import { CreatedReviewResponse, CreateReviewInput } from "../../models";
import { Form } from "semantic-ui-react";
import './styles/createReview.css'
import { useMutation } from "@apollo/client";
import { CREATE_REVIEW, GET_REVIEWS } from "../../graphql";

export const CreateReview: React.FC = () => {
    const [values, setValues] = useState<CreateReviewInput>({
        text: '', 
        book: '',
        author: ''
    });
   
    const onChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
        setValues({ ...values, [event.target.name]: event.target.value })
    }
    const [createReview, {loading}] = useMutation<CreatedReviewResponse>(CREATE_REVIEW, {
        onError(err) {
            console.log(err)
        },
        update(proxy, result) {
            proxy.updateQuery({
                query: GET_REVIEWS
            }, (data) => {
                return {
                    getReviews: [result.data?.createReview, ...(data.getReviews)]
                }
            });  
        },
        variables: values,
    })
    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        createReview();
    }
    return (
        <div className="form">
            <Form onSubmit={onSubmit} className={loading ? 'loading' : ''}>
                <Form.TextArea label="Text" placeholder="Text" name="text" value={values.text} onChange={onChange} type="text" />
                <Form.Input label="Book" placeholder="Book" name="book" value={values.book} onChange={onChange} type="text" />
                <Form.Input label="Author" placeholder="Author" name="author" value={values.author} onChange={onChange} type="text" />
                <Form.Button type="submit" primary floated="right" content="Create"/>
            </Form>
        </div>
    )
}

