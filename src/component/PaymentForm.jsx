import React, { Component } from 'react'
import axios from "axios"
import { injectStripe, CardNumberElement, CardExpiryElement, CardCVCElement  } from "react-stripe-elements"
import { getAuthHeaders } from "../modules/auth";
import { Segment, Menu, Form, Button } from "semantic-ui-react"

class PaymentForm extends Component {
  state = {
    renderForm: false,
    message: null
  }

  payWithStripe = async (event) => {
    event.preventDefault()
    let stripeResponse = await this.props.stripe.createToken()
    debugger
    stripeResponse.token && (
      this.performPayment(stripeResponse.token.id)
    )
  }

  performPayment = async (stripeToken) => {
    debugger
    let headers = await getAuthHeaders()
    let response = await axios.post("/subscriptions", {
      stripeToken: stripeToken
    }, {
      headers: headers 
    })

    if (response.data.paid === true) {
      this.props.userIsSubscriber()
    }
  }
  
  render() {
   
    let form = this.state.renderForm ? (
    <Segment inverted floated="right" compact>
    <Menu inverted pointing secondary>
      <Menu.Menu position="right">
      <Form inverted  style={{ marginTop:'4em'}}onSubmit={this.payWithStripe} id="payment-form">
      <Form.Field>
        <label id='label'>Card number</label>
        <CardNumberElement />
        </Form.Field>
        <Form.Field>
        <label id='label'>Expiry Date</label>
        <CardExpiryElement />
        </Form.Field>
        <Form.Field>
        <label id='label'>CVC</label>
        <CardCVCElement />
        </Form.Field>
        <Form.Field>
        <Button color='black' id="submit-payment" type="submit">
          Submit
        </Button>
        </Form.Field>
      </Form>
      </Menu.Menu>
        </Menu>
      </Segment>
    ) : (
      <Segment inverted>
        <Menu inverted pointing secondary>
        
          <Menu.Menu position="right">
            <Menu.Item as="h4">
            <Button inverted='black'
        id="become-subscriber"
        onClick={() => this.setState({ renderForm: true })}
      >
        Become a subscriber
      </Button>
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </Segment>
     
    );

    let message 

    this.state.message && (
      message = <p id="payment-message">{this.state.message}</p>
    )

    return (
      <div>
        {form}
        {message}
      </div>
    )
  }
}
export default injectStripe(PaymentForm)