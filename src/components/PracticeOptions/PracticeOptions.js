import React from 'react'
import { withRouter } from 'react-router-dom'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import messages from '../AutoDismissAlert/messages'

const PracticeOptions = ({ msgAlert, history }) => {
  const onStartPractice = event => {
    event.preventDefault()

    // TODO Add options, then set options. Options will likely be stored in App and passed down

    history.push('/practice')
    msgAlert({
      heading: 'Starting Practice',
      message: messages.startPracticeSuccess,
      variant: 'success'
    })
  }

  return (
    <div className="row">
      <div className="col-sm-10 col-md-8 mx-auto mt-5">
        <h3>Practice</h3>
        <h5>Options</h5>
        <Form onSubmit={onStartPractice}>
          <Button variant="primary" type="submit">
            Start Practice
          </Button>
        </Form>
      </div>
    </div>
  )
}

export default withRouter(PracticeOptions)
