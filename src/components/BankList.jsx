import React, { useEffect, useState } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import AppNavBar from './AppNavbar';

export default function BankList() {

    const [banks, setBanks] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

        fetch('/api/banks/')
            .then(response => response.json())
            .then(data => {
                setBanks(data);
                setLoading(false);
            })
    }, []);

    const remove = async (id) => {
        await fetch(`/api/banks/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedBanks = [...banks].filter(i => i.id !== id);
            setBanks(updatedBanks);
        });
    }

    if (loading) {
        return <p>Loading...</p>;
    }

    const bankList = banks.map(bank => {
        return <tr key={bank.id}>
            <td style={{ whiteSpace: 'nowrap' }}>{bank.accountNumber}</td>
            <td>{bank.name}</td>
            <td>{bank.transactionFee}</td>
            <td>{bank.trust}</td>
            <td>
                <ButtonGroup>
                    <Button size="sm" color="primary" tag={Link} to={"/banks/" + bank.id}>Edit</Button>
                    <Button size="sm" color="danger" onClick={() => remove(bank.id)}>Delete</Button>
                </ButtonGroup>
            </td>
        </tr>
    });

    return (
        <div>
            <AppNavBar />
            <Container fluid>
                <div className="float-end">
                    <Button color="success" tag={Link} to="/banks/new">Add Bank</Button>
                </div>
                <h3>My Banks </h3>
                <Table className="mt-4">
                    <thead>
                        <tr>
                            <th width="30%">Account Number</th>
                            <th width="30%">Name</th>
                            <th width="30%">Transaction Fee</th>
                            <th width="30%">Trust</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bankList}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};