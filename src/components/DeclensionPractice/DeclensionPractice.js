import React, { Fragment, useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import useSound from 'use-sound'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import './DeclensionPractice.scss'
import messages from '../AutoDismissAlert/messages'
import NominativeDefinition from '../definitions/NominativeDefinition/NominativeDefinition'

const getGendersDipslay = genders => genders.map((gender, index) => (
  <Fragment key={index}>
    <span className={gender.toLowerCase()}>{gender}</span>{index !== genders.length - 1 && ', '}
  </Fragment>
))

const onlyVisibleOnXs = 'd-block d-sm-none'
const hiddenOnXs = 'd-none d-sm-block'

const DeclensionPractice = ({ msgAlert, history, practiceQuestion, setRandomPracticeQuestion }) => {
  const [checkedAnswers, setCheckedAnswers] = useState(false)
  const [correct, setCorrect] = useState(false)
  const [attempts, setAttempts] = useState({})
  const [playAudio, { stop: stopAudio }] = useSound(practiceQuestion.audioUrl)

  const { word, group, type, genders, fields } = practiceQuestion
  const gender = getGendersDipslay(genders)
  const hasVocativeCase = fields.some(field => field.case === 'Vocative')

  // Whenever there is a new practice question
  useEffect(() => {
    // set the focus to the first input
    const firstInput = document.querySelector('input')
    firstInput.focus()
  }, [practiceQuestion])

  // Whenever the user has clicked "check answers"
  useEffect(() => {
    // set the focus to the next-practice button
    if (checkedAnswers && correct) {
      const nextPracticeButton = document.querySelector('.next-practice')
      nextPracticeButton.focus()
    } else if (checkedAnswers && !correct) {
      const tryAgainButton = document.querySelector('.try-again')
      tryAgainButton.focus()
    }
  }, [checkedAnswers])

  const getLabelJsx = label => {
    if (label.toLowerCase() === 'nominative') {
      return <NominativeDefinition />
    }

    return label
  }

  // get the background class for inputs
  const getInputBg = (attempt = '', field) => {
    if (!checkedAnswers) {
      return ''
    } else if (attempt.trim().toLowerCase() === field.answer.toLowerCase()) {
      return 'bg-success text-white placeholder-white'
    } else {
      return 'bg-danger text-white placeholder-white'
    }
  }

  // Get the text that shows the correct answer if the user got the question wrong, otherwise a falsy value.
  const getDangerTextJsx = (attempt = '', field) => {
    return checkedAnswers && attempt.trim().toLowerCase() !== field.answer.toLowerCase() && (
      <Form.Text className="text-danger answer-text">
        Correct answer: {field.answer}
      </Form.Text>
    )
  }

  // Handle the user asking to check answers
  const handleCheckAnswers = event => {
    // if every field is correct
    const isCorrect = fields.every(field => field.answer === (attempts[`${field.case.toLowerCase()}${field.number}`] || ''))

    // update the checkedAnswers state
    setCheckedAnswers(true)

    // show a message if folks got everything correct
    if (isCorrect) {
      msgAlert({
        heading: 'Correct!',
        message: messages.correctAnswer,
        variant: 'success'
      })
    }

    // play the audio so users can practice their pronunciation
    playAudio()

    // update the correct state
    setCorrect(isCorrect)
  }

  const resetState = () => {
    stopAudio()

    // reset state
    setAttempts({})
    setCheckedAnswers(false)
  }

  // setup for the next question
  const handleNextPractice = () => {
    setRandomPracticeQuestion()
    resetState()
  }

  // Anytime an input changes update the attempts state
  const handleChange = event => {
    event.persist()
    setAttempts(prevAttempts => {
      const stateChange = { ...prevAttempts, [event.target.name]: event.target.value }
      return stateChange
    })
  }

  // Turn the fields into an array of divs to show on the page
  const jsxOfFields = fields => {
    return fields.map((field, index) => (
      // Set the className so grid can place them on the screen ex. nominative-singular
      <div key={index} className={`${field.case.toLowerCase()}-${field.number.toLowerCase()}`}>
        <Form.Group controlId={`${field.case.toLowerCase()}${field.number}`}>
          {/* Only show the label directly above the field on xs screens */}
          <Form.Label className={onlyVisibleOnXs}><h5>{getLabelJsx(field.case)}</h5></Form.Label>
          <Form.Control
            // Add a class for the input. A danger or success color class after checking answers.
            className={getInputBg(attempts[`${field.case.toLowerCase()}${field.number}`], field)}
            required
            type="text"
            // set the name to the case followed by number ex. nominativeSingular
            name={`${field.case.toLowerCase()}${field.number}`}
            // set the value to the current attempts value. ex. attempts['nominativeSingular']
            value={attempts[`${field.case.toLowerCase()}${field.number}`] || ''}
            placeholder={`Enter ${field.case} ${field.number}`}
            onChange={handleChange}
            // turn off autocomplete, so folks have to type it each time
            autoComplete="off"
          />
          {/* Set tooltip text underneath the input to show the correct answer. */}
          {getDangerTextJsx(attempts[`${field.case.trim().toLowerCase()}${field.number}`], field)}
        </Form.Group>
      </div>
    ))
  }

  console.log(fields)
  const singularFieldsJsx = jsxOfFields(fields.filter(field => field.number === 'Singular'))
  const pluralFieldsJsx = jsxOfFields(fields.filter(field => field.number === 'Plural'))

  return (
    <Fragment>
      <h3>{word}</h3>
      <h6>{group} {type}</h6>
      <h6>{gender}</h6>
      <div className={`grid-container mt-4 ${hasVocativeCase ? 'grid-container-vocative' : ''}`}>
        <div className={`nominative-label ${hiddenOnXs}`}><h5><NominativeDefinition /></h5></div>
        <div className={`genative-label ${hiddenOnXs}`}><h5>genative</h5></div>
        <div className={`dative-label ${hiddenOnXs}`}><h5>dative</h5></div>
        <div className={`ablative-label ${hiddenOnXs}`}><h5>ablative</h5></div>
        <div className={`vocative-label ${hasVocativeCase ? hiddenOnXs : 'd-none'}`}><h5>vocative</h5></div>
        <div className={`accusative-label ${hiddenOnXs}`}><h5>accusative</h5></div>

        <div className="singular-title text-center"><h5>Singular</h5></div>
        {singularFieldsJsx}

        <div className="plural-title text-center"><h5>Plural</h5></div>
        {pluralFieldsJsx}

        <div className="left-button">
          {checkedAnswers && !correct &&
            <Button onClick={resetState} variant="secondary" className='btn-block try-again text-white mb-2'>
              Try Again
            </Button>
          }
        </div>

        <div className="right-button">
          {!checkedAnswers &&
            <Button onClick={handleCheckAnswers} variant="primary" className='btn-block'>
              Check Answers
            </Button>
          }
          {checkedAnswers &&
            <Button onClick={handleNextPractice} variant="primary" className='btn-block next-practice mb-2'>
              Next Practice
            </Button>
          }
        </div>
      </div>
    </Fragment>
  )
}

export default withRouter(DeclensionPractice)
