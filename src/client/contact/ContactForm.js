import React from 'react'
import styled from 'styled-components'
import recompact from 'recompact'
import theme from 'style/theme'
import { connect } from 'react-redux'
import { Control, Form, Errors, actions } from 'react-redux-form'
import { required } from 'modules/validators'
import * as components from 'modules/components'

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  padding: 20px;
  width: 100%;
  margin: '0 auto';
`

const FormGroup = styled.div`
  display: flex;
  flex: 1 0 auto;
  flex-direction: column;
  margin: 10px;
`

const Label = styled.label`
  margin-bottom: 5px;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-weight: 600;
`

const FormRow = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  margin: 0 -10px;
  @media (min-width: ${theme.medias.phablet}) {
    flex-direction: row;
  }
`

const StyledErrors = styled(Errors)`
  color: ${theme.colors.danger};
  font-size: 14px;
  margin: 10px 0;
`

const AlertMessage = connect(state => ({
  status: state.forms.forms.contact.$form.pending
    ? 'PENDING'
    : state.forms.forms.contact.$form.errors === true
      ? 'ERROR'
      : state.forms.forms.contact.$form.validity === true ? 'SUCCESS' : null,
}))(({ status }) => {
  switch (status) {
    case 'ERROR':
      return (
        <components.Alert ui="danger">
          Erreur, veuillez rééessayer.
        </components.Alert>
      )
    case 'SUCCESS':
      return (
        <components.Alert ui="success">
          Merci, nous vous répondrons dans les plus brefs délais !
        </components.Alert>
      )
    default:
      return null
  }
})

const mapProps = {
  error: props => props.fieldValue.touched && !props.fieldValue.valid,
}

const errorMessages = {
  required: 'Ce champs est requis',
  typeMismatch: 'Email invalide',
}

const ContactForm = ({ className, onSubmit }) =>
  <StyledForm className={className} onSubmit={onSubmit} model="forms.contact">
    <AlertMessage />
    <FormRow>
      <FormGroup>
        <Label htmlFor="name">
          Nom
        </Label>
        <Control
          component={components.Input}
          model=".name"
          id="name"
          validators={{ required }}
          mapProps={mapProps}
        />
        <StyledErrors show="touched" model=".name" messages={errorMessages} />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="company">
          Société
        </Label>
        <Control
          component={components.Input}
          model=".company"
          id="company"
          mapProps={mapProps}
        />
        <StyledErrors
          show="touched"
          model=".company"
          messages={errorMessages}
        />
      </FormGroup>
    </FormRow>
    <FormRow>
      <FormGroup>
        <Label htmlFor="email">
          Email
        </Label>
        <Control
          type="email"
          component={components.Input}
          model=".email"
          id="email"
          mapProps={mapProps}
          validators={{ required }}
        />
        <StyledErrors show="touched" model=".email" messages={errorMessages} />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="phone">
          Téléphone
        </Label>
        <Control
          component={components.Input}
          model=".phone"
          id="phone"
          mapProps={mapProps}
        />
        <StyledErrors show="touched" model=".phone" messages={errorMessages} />
      </FormGroup>
    </FormRow>
    <FormRow>
      <FormGroup>
        <Label htmlFor="message">
          Message
        </Label>
        <Control
          component={components.Textarea}
          model=".message"
          id="message"
          rows={5}
          mapProps={mapProps}
          validators={{ required }}
        />
        <StyledErrors
          show="touched"
          model=".message"
          messages={errorMessages}
        />
      </FormGroup>
    </FormRow>
    <components.Button type="submit">Envoyer</components.Button>
  </StyledForm>

const fetchContact = async values => {
  try {
    const result = await fetch('/api/contact', {
      method: 'post',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(values),
    })
    if (result.statusCode !== 200) {
      throw new Error('Error while fetching contact')
    }
  } catch (error) {
    return Promise.reject(false)
  }

  return true
}

export default recompact.compose(
  connect(
    state => ({ form: state.forms.contact }),
    dispatch => ({
      onResetForm() {
        dispatch(actions.reset('forms.contact'))
      },
      onSubmit(values) {
        dispatch(actions.submit('forms.contact', fetchContact(values)))
      },
    }),
  ),
  recompact.lifecycle({
    componentWillMount() {
      this.props.onResetForm()
    },
  }),
)(ContactForm)