import React from 'react'
import { withRouter } from 'react-router-dom'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import messages from '../AutoDismissAlert/messages'

const PracticeOptions = ({ msgAlert, history, useMacrons, setUseMacrons,
  setPracticeMode, practiceMode, setPracticeType, practiceType, typeOneHideOthers, setTypeOneHideOthers,
  shouldPlayAudio, setShouldPlayAudio, enabledDeclensions, setEnabledDeclensions }) => {
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

  const declensions = ['1st', '2nd', '3rd', '4th', '5th']
  const declensionJsx = declensions.map(declension => (
    <Form.Check
      key={declension}
      type='checkbox'
      label={`${declension} Declension`}
      inline
      checked={enabledDeclensions.includes(declension)}
      onChange={() => {
        if (enabledDeclensions.includes(declension)) {
          setEnabledDeclensions(enabledDeclensions.filter(enabledDeclension => enabledDeclension !== declension))
        } else {
          setEnabledDeclensions([...enabledDeclensions, declension])
        }
      }}
    />
  ))

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
          {/* TODO: Re-enable after re-recording audio */}
          {/* <Form.Check
            type='checkbox'
            label='Play Audio'
            checked={shouldPlayAudio}
            onChange={() => setShouldPlayAudio(!shouldPlayAudio)}
          /> */}
          <br/>
          <h5>Type</h5>
          <Form.Check
            type='radio'
            label='Type Cases'
            inline
            checked={practiceType === 'type'}
            onChange={() => setPracticeType('type')}
          />
          <Form.Check
            type='radio'
            label='Say Cases'
            inline
            checked={practiceType === 'speak'}
            onChange={() => setPracticeType('speak')}
          />
          <br/>
          <br/>
          <h5>Declensions</h5>
          {declensionJsx}

          <h5>Mode</h5>
          <Form.Check
            type='radio'
            label='1 Case at Random'
            inline
            checked={practiceMode === 'one-case'}
            onChange={() => setPracticeMode('one-case')}
          />
          <Form.Check
            type='checkbox'
            label='Hide Other Cases'
            inline
            checked={typeOneHideOthers}
            onChange={() => setTypeOneHideOthers(!typeOneHideOthers)}
            disabled={practiceMode !== 'one-case'}
          />

          <Form.Check
            type='radio'
            label='All Cases'
            checked={practiceMode === 'all-cases'}
            onChange={() => setPracticeMode('all-cases')}
          />

          <br/>
          <Button variant="primary" type="submit">
            Start Practice
          </Button>
        </Form>
      </div>
    </div>
  )
}

export default withRouter(PracticeOptions)
