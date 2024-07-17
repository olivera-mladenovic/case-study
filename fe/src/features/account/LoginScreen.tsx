import React, { ChangeEvent, FormEvent, useState } from "react";
import { LoginInput, LoginUserResponse } from "../../models";
import { Button, Form } from "semantic-ui-react";
import { gql, useMutation } from "@apollo/client";
import './styles/RegisterScreen.css'
import { useNavigate } from "react-router-dom";
import { useUser } from "../../contexts";

export const LoginScreen: React.FC = () => {
    const [values, setValues] = useState<LoginInput>({
        email: '', 
        password: '',
       
    });
    const navigate = useNavigate();
    const contextData = useUser();

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [event.target.name]: event.target.value })
    }
    const [login, {loading}] = useMutation<LoginUserResponse>(LOGIN, {
        update(_, result) {
            if (!result.data) throw new Error('Login error');
            contextData?.loginUser(result.data.login);
        },
        variables: values
    })
    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        login();
        navigate('/panel');
    }
    return (
        <div className="form">
            <Form onSubmit={onSubmit} className={loading ? 'loading' : ''}>
                <h1>Register</h1>
                <Form.Input label="Email" placeholder="Email" name="email" value={values.email} onChange={onChange} type="email" />
                <Form.Input label="Password" placeholder="Password" name="password" value={values.password} onChange={onChange} type="password" />
                <Button type="submit" primary>Login</Button>
            </Form>
        </div>
    )
}

const LOGIN = gql`
mutation login(
    $email: String!  
    $password: String!
) {
    login(loginInput: {email: $email, password: $password}) {
        id email name token
    }
}
`