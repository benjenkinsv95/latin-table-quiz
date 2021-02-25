import React, { Fragment, useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import useSound from 'use-sound'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import './DeclensionPractice.scss'
import messages from '../AutoDismissAlert/messages'

const getGendersDipslay = genders => genders.join(', ')
const onlyVisibleOnXs = 'd-block d-sm-none'
const hiddenOnXs = 'd-none d-sm-block'

const DeclensionPractice = ({ msgAlert, history, practiceQuestion, setRandomPracticeQuestion }) => {
  const [checkedAnswers, setCheckedAnswers] = useState(false)
  const [attempts, setAttempts] = useState({})
  const [playAudio, { stop: stopAudio }] = useSound(practiceQuestion.audioUrl)

  const { word, group, type, genders, fields } = practiceQuestion
  const gender = getGendersDipslay(genders)
  const hasVocativeCase = fields.some(field => field.case === 'Vocative')

  useEffect(() => {
    const firstInput = document.querySelector('input')
    firstInput.focus()
  }, [practiceQuestion])

  useEffect(() => {
    if (checkedAnswers) {
      const nextPracticeButton = document.querySelector('.next-practice')
      nextPracticeButton.focus()
    }
  }, [checkedAnswers])

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

  const getDangerTextJsx = (attempt = '', field) => {
    return checkedAnswers && attempt.trim().toLowerCase() !== field.answer.toLowerCase() && (
      <Form.Text className="text-danger">
        Correct answer: {field.answer}
      </Form.Text>
    )
  }

  const handleCheckAnswers = event => {
    const isCorrect = fields.every(field => field.answer === (attempts[`${field.case.toLowerCase()}${field.number}`] || ''))

    setCheckedAnswers(true)

    if (isCorrect) {
      msgAlert({
        heading: 'Correct!',
        message: messages.correctAnswer,
        variant: 'success'
      })
    }
    playAudio()
  }

  const handleNextPractice = () => {
    stopAudio()
    setRandomPracticeQuestion()
    setAttempts({})
    setCheckedAnswers(false)
  }

  const handleChange = event => {
    event.persist()
    setAttempts(prevAttempts => {
      const stateChange = { ...prevAttempts, [event.target.name]: event.target.value }
      return stateChange
    })
  }

  const jsxOfFields = fields => {
    return fields.map((field, index) => (
      <div key={index} className={`${field.case.toLowerCase()}-${field.number.toLowerCase()}`}>
        <Form.Group controlId={`${field.case.toLowerCase()}${field.number}`}>
          <Form.Label className={onlyVisibleOnXs}>{field.case}</Form.Label>
          <Form.Control
            className={getInputBg(attempts[`${field.case.toLowerCase()}${field.number}`], field)}
            required
            type="text"
            name={`${field.case.toLowerCase()}${field.number}`}
            value={attempts[`${field.case.toLowerCase()}${field.number}`] || ''}
            placeholder={`Enter ${field.case} ${field.number}`}
            onChange={handleChange}
            autoComplete="off"
          />
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
        <div className={`nominative-label ${hiddenOnXs}`}><h5>nominative</h5></div>
        <div className={`genative-label ${hiddenOnXs}`}><h5>genative</h5></div>
        <div className={`dative-label ${hiddenOnXs}`}><h5>dative</h5></div>
        <div className={`ablative-label ${hiddenOnXs}`}><h5>ablative</h5></div>
        <div className={`vocative-label ${hasVocativeCase ? hiddenOnXs : 'd-none'}`}><h5>vocative</h5></div>
        <div className={`accusative-label ${hiddenOnXs}`}><h5>accusative</h5></div>

        <div className="singular-title text-center"><h5>Singular</h5></div>
        {singularFieldsJsx}

        <div className="plural-title text-center"><h5>Plural</h5></div>
        {pluralFieldsJsx}

        <div className="action-buttons">
          {!checkedAnswers &&
            <Button onClick={handleCheckAnswers} variant="primary" className='btn-block'>
              Check Answers
            </Button>
          }
          {checkedAnswers &&
            <Button onClick={handleNextPractice} variant="primary" className='btn-block next-practice'>
              Next Practice
            </Button>
          }
        </div>
      </div>
    </Fragment>
  )
}

export default withRouter(DeclensionPractice)
