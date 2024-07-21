import React, { ChangeEvent, FormEvent, useState } from "react";
import { RegisterInput,  RegisterUserResponse } from "../../models";
import { Button, Form } from "semantic-ui-react";
import { useMutation } from "@apollo/client";
import './styles/RegisterScreen.css'
import { useNavigate } from "react-router-dom";
import { useUser } from "../../contexts";
import { REGISTER } from "../../graphql";

export const RegisterScreen: React.FC = () => {
    const [values, setValues] = useState<RegisterInput>({
        email: '',
        name: '',
        password: '',
        confirmPassword: ''
    });
    const navigate = useNavigate();
    const contextData = useUser();
    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [event.target.name]: event.target.value })
    }
    const isButtonEnabled = () => Boolean(values.email && values.password && values.name && values.confirmPassword);
    const [register, {loading}] = useMutation<RegisterUserResponse>(REGISTER, {
        update(_, result) {
            if (!result.data) throw new Error('Register error');
            contextData?.loginUser(result.data.register);
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
                <Button type="submit" color="orange" disabled={!isButtonEnabled()} style={{width: '100%', marginTop: '15px'}}>Register</Button>
            </Form>
        </div>
    )
}