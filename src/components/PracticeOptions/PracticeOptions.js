import React from 'react'
import { withRouter } from 'react-router-dom'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import messages from '../AutoDismissAlert/messages'

const PracticeOptions = ({ msgAlert, history, useMacrons, setUseMacrons, setPracticeMode, practiceMode }) => {
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
        <h4>Options</h4>
        <Form onSubmit={onStartPractice}>
          <Form.Check
            type='checkbox'
            label='Use Macrons'
            checked={useMacrons}
            onChange={() => setUseMacrons(!useMacrons)}
          />
          <h5>Mode</h5>
          <Form.Check
            type='radio'
            label='Type 1 Case at Random'
            checked={practiceMode === 'type-one'}
            onChange={() => setPracticeMode('type-one')}
          />
          <Form.Check
            type='radio'
            label='Type All Cases'
            checked={practiceMode === 'type-all'}
            onChange={() => setPracticeMode('type-all')}
          />
          <Button variant="primary" type="submit">
            Start Practice
          </Button>
        </Form>
      </div>
    </div>
  )
}

export default withRouter(PracticeOptions)
