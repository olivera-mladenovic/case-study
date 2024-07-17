import React, { ChangeEvent, FormEvent, useState } from "react";
import { CreateReviewInput } from "../../models";
import { Button, Form } from "semantic-ui-react";
import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../contexts";

export const CreateReviewScreen: React.FC = () => {
    const [values, setValues] = useState<CreateReviewInput>({
        text: '', 
        book: '',
    });
    const navigate = useNavigate();
    const { user} = useUser();

    // if (!user) {
    //     return <h1>Unauthorized</h1>
    // }
    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [event.target.name]: event.target.value })
    }
    const [createReview, {loading}] = useMutation(CREATE_REVIEW, {
        onError(err) {
            console.log(err)
        },
        update(_, result) {
            console.log(result);   
        },
        variables: values,
    })
    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        createReview();
        navigate('/panel');
    }
    return (
        <div className="form">
            <Form onSubmit={onSubmit} className={loading ? 'loading' : ''}>
                <h1>Create review</h1>
                <Form.Input label="Text" placeholder="Text" name="text" value={values.text} onChange={onChange} type="text" />
                <Form.Input label="Book" placeholder="Book" name="book" value={values.book} onChange={onChange} type="password" />
                <Button type="submit" primary>Create</Button>
            </Form>
        </div>
    )
}

const CREATE_REVIEW = gql`
mutation createReview(
    $text: String!  
    $book: String!
) {
    createReview(createReviewInput: {text: $text, book: $book}) {
        id text book
    }
}
`