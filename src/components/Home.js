import React from 'react';
import "../App.css";
import AppNavBar from './AppNavbar';
import { Link } from 'react-router-dom';
import {Button, Container} from "reactstrap";

export default function Home() {
    return (
        <div>
            <AppNavBar />
            <Container fluid>
                <Button color="link"><Link to="/banks/list">Manage Banks</Link></Button>
            </Container>
        </div>
    );
}