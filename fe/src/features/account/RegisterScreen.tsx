import React, { ChangeEvent, FormEvent, useState } from "react";
import { RegisterInput } from "../../models";
import { Button, Form } from "semantic-ui-react";
import { gql, useMutation } from "@apollo/client";
import './styles/RegisterScreen.css'
import { useNavigate } from "react-router-dom";

export const RegisterScreen: React.FC = () => {
    const [values, setValues] = useState<RegisterInput>({
        email: '',
        name: '',
        password: '',
        confirmPassword: ''
    });
    const navigate = useNavigate();
    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [event.target.name]: event.target.value })
    }
    const [register, {loading}] = useMutation(REGISTER, {
        update(_, result) {
            console.log(result);
        },
        variables: values
    })
    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        register();
        navigate('/panel');
    }
    return (
        <div className="form">
            <Form onSubmit={onSubmit} className={loading ? 'loading' : ''}>
                <h1>Register</h1>
                <Form.Input label="Email" placeholder="Email" name="email" value={values.email} onChange={onChange} type="email" />
                <Form.Input label="Name" placeholder="Name" name="name" value={values.name} onChange={onChange} type="text" />
                <Form.Input label="Password" placeholder="Password" name="password" value={values.password} onChange={onChange} type="password" />
                <Form.Input label="Confirm password" placeholder="Confirm password" name="confirmPassword" value={values.confirmPassword} onChange={onChange} type="password" />
                <Button type="submit" primary>Register</Button>
            </Form>
        </div>
    )
}

const REGISTER = gql`
mutation register(
    $email: String!
    $name: String!
    $password: String!
    $confirmPassword: String!
) {
    register(registerInput: {email: $email, name: $name, password: $password, confirmPassword: $confirmPassword}) {
        id email name token
    }
}
`