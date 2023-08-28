import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';
import validator from 'validator';

export default function BankEdit() {
    const initialFormState = {
        accountNumber: '',
        name: '',
        trust: 0,
        transactionFee: 0
    };
    const [bank, setBank] = useState(initialFormState);
    const [disabled, setDisabled] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id !== 'new') {
            fetch(`/api/banks/${id}`)
                .then(response => response.json())
                .then(data => setBank(data));
            setDisabled(true);
        }
    }, [id, setBank]);

    const handleChange = (event) => {
        const { name, value } = event.target

        setBank({ ...bank, [name]: value })
    }

    const handleChangeInt = (event) => {
        const { name, value } = event.target
        if (validator.isInt(value)) {
            setBank({ ...bank, [name]: value })
        }
    }

    const handleChangeFloat = (event) => {
        const { name, value } = event.target
        if (validator.isFloat(value)) {
            setBank({ ...bank, [name]: value })
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        let method = id !== 'new' ? 'PUT' : 'POST';
        await fetch("/api/banks/", {
            method: method,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bank)
        });
        setBank(initialFormState);
        navigate('/banks');
    }

    const title = <h2>{bank.id ? 'Edit Bank' : 'Add Bank'}</h2>;

    return (<div>
        <AppNavbar />
        <Container>
            {title}
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label for="accountNumber">Account Number</Label>
                    <Input disabled={disabled} type="text" name="accountNumber" id="name" value={bank.accountNumber || ''}
                        onChange={handleChange} autoComplete="accountNumber" />
                </FormGroup>
                <FormGroup>
                    <Label for="name">Name</Label>
                    <Input type="text" name="name" id="name" value={bank.name || ''}
                        onChange={handleChange} autoComplete="name" />
                </FormGroup>
                <FormGroup>
                    <Label for="trust">Trust</Label>
                    <Input type="text" name="trust" id="trust" value={bank.trust || 0}
                        onChange={handleChangeFloat} autoComplete="trust" />
                </FormGroup>
                <FormGroup>
                    <Label for="transactionFee">Transaction Fee</Label>
                    <Input type="text" name="transactionFee" id="transactionFee" value={bank.transactionFee || 0}
                        onChange={handleChangeInt} autoComplete="transactionFee" />
                </FormGroup>
                <FormGroup>
                    <Button color="primary" type="submit">Save</Button>{' '}
                    <Button color="secondary" tag={Link} to="/banks/">Cancel</Button>
                </FormGroup>
            </Form>
        </Container>
    </div>
    )
};
