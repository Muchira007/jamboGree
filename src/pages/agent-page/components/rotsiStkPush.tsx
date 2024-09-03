import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Tabs, Tab } from 'react-bootstrap';
import { TextField, Typography, Card, CardContent } from '@mui/material';
import axios from 'axios';

const PaymentProcess: React.FC = () => {
  const [key, setKey] = useState<string>('card');
  const [phone, setPhone] = useState<string>('');
  const [amount, setAmount] = useState<string>('');

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const makePayment = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    if (!amount) {
      alert('Please enter amount');
      return;
    }
    if (!phone) {
      alert('Please enter phone number');
      return;
    }

    const data = {
      amount,
      phone,
      username: "Riddick"
    };

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': '3d9f65289e1b96f9b25f5f20da3ecea5'
      }
    };

    axios.post('https://api.rotsi.co.ke/payments/stkPush/v1', data, config)
      .then((response) => {
        // console.log(response);
        // Redirect to success page
        alert('Success');
        window.location.href = '/success';
      })
      .catch((error) => {
        console.error(error);
        alert('Error');
        // Handle error
        // Show error message to the user
      });
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div" gutterBottom>
                Payment Process
              </Typography>
              <Tabs
                id="payment-method-tabs"
                activeKey={key}
                onSelect={(k: string | null) => setKey(k!)}
                className="mb-3"
              >
                <Tab eventKey="card" title="Credit/Debit Card">
                  <Form>
                    <Form.Group controlId="formCardNumber">
                      <TextField
                        label="Card Number"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        required
                      />
                    </Form.Group>

                    <Form.Group controlId="formCardName">
                      <TextField
                        label="Card Holder Name"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        required
                      />
                    </Form.Group>

                    <Form.Group controlId="formExpiryDate">
                      <TextField
                        label="Expiry Date"
                        type="month"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        required
                      />
                    </Form.Group>

                    <Form.Group controlId="formCVC">
                      <TextField
                        label="CVC"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        required
                      />
                    </Form.Group>

                    <Button variant="primary" type="submit" className="mt-3">
                      Submit Payment
                    </Button>
                  </Form>
                </Tab>
                <Tab eventKey="mpesa" title="M-Pesa">
                  <Form>
                    <Form.Group controlId="formMpesaNumber">
                      <TextField
                        label="M-Pesa Number"
                        variant="outlined"
                        fullWidth
                        onChange={handlePhoneChange}
                        margin="normal"
                        required
                      />
                    </Form.Group>

                    <Form.Group controlId="formMpesaCode">
                      <TextField
                        label="M-Pesa Amount"
                        variant="outlined"
                        fullWidth
                        onChange={handleAmountChange}
                        margin="normal"
                        required
                      />
                    </Form.Group>

                    <Button variant="primary" onClick={makePayment} className="mt-3">
                      Submit Payment
                    </Button>
                  </Form>
                </Tab>
              </Tabs>
            </CardContent>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PaymentProcess;