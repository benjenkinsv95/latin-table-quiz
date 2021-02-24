import React, { Fragment, useState } from 'react'
import { withRouter } from 'react-router-dom'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import './DeclensionPractice.scss'
import messages from '../AutoDismissAlert/messages'

const getGendersDipslay = genders => genders.join(', ')
const onlyVisibleOnXs = 'd-block d-sm-none'
const hiddenOnXs = 'd-none d-sm-block'

const Practice = ({ msgAlert, history, practiceQuestion, chooseRandomPractice }) => {
  const [nominativeSingular, setNominativeSingular] = useState('')
  const [checkedAnswers, setCheckedAnswers] = useState(false)

  // get the background class for inputs
  const getInputBg = (attempt, practiceQuestionCase) => {
    if (!checkedAnswers) {
      return ''
    } else if (attempt.toLowerCase() === practiceQuestionCase.answer.toLowerCase()) {
      return 'bg-success text-white'
    } else {
      return 'bg-danger text-white'
    }
  }

  const getDangerTextJsx = (attempt, practiceQuestionCase) => {
    return checkedAnswers && attempt.toLowerCase() !== practiceQuestionCase.answer.toLowerCase() && (
      <Form.Text className="text-danger">
        Correct answer: {practiceQuestionCase.answer}
      </Form.Text>
    )
  }

  const handleCheckAnswers = event => {
    // TODO Add options, then set options. Options will likely be stored in App and passed down
    let isCorrect = true

    if (nominativeSingular.toLowerCase() !== practiceQuestion.nominativeSingular.answer.toLowerCase()) {
      isCorrect = false
    }

    setCheckedAnswers(true)

    if (isCorrect) {
      msgAlert({
        heading: 'Correct!',
        message: messages.correctAnswer,
        variant: 'success'
      })
    }
  }

  const handleNextPractice = () => {
    chooseRandomPractice()
    setNominativeSingular('')
    setCheckedAnswers(false)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log('something')
  }

  const { word, group, type, genders } = practiceQuestion
  const gender = getGendersDipslay(genders)

  return (
    <Fragment>
      <h3>{word}</h3>
      <h6>{group} {type}</h6>
      <h6>{gender}</h6>
      <Form onSubmit={handleSubmit} className="grid-container mt-4">
        <div className={`nominative-label ${hiddenOnXs}`}><h5>nominative</h5></div>
        <div className={`genative-label ${hiddenOnXs}`}><h5>genative</h5></div>
        <div className={`dative-label ${hiddenOnXs}`}><h5>dative</h5></div>
        <div className={`ablative-label ${hiddenOnXs}`}><h5>ablative</h5></div>
        <div className={`vocative-label ${hiddenOnXs}`}><h5>vocative</h5></div>
        <div className={`accusative-label ${hiddenOnXs}`}><h5>accusative</h5></div>

        <div className="singular-title text-center"><h5>Singular</h5></div>
        <div className="nominative-singular">
          <Form.Group controlId="nominativeSingular">
            <Form.Label className={onlyVisibleOnXs}>Nominative</Form.Label>
            <Form.Control
              className={getInputBg(nominativeSingular, practiceQuestion.nominativeSingular)}
              required
              type="text"
              name="nominativeSingular"
              value={nominativeSingular}
              placeholder="Enter Nominative Singular"
              onChange={e => setNominativeSingular(e.target.value)}
            />
            {getDangerTextJsx(nominativeSingular, practiceQuestion.nominativeSingular)}
          </Form.Group>
        </div>
        <div className="genative-singular"></div>
        <div className="dative-singular"></div>
        <div className="accusative-singular"></div>
        <div className="ablative-singular"></div>
        <div className="vocative-singular"></div>

        <div className="plural-title text-center"><h5>Plural</h5></div>
        <div className="nominative-plural"></div>
        <div className="genative-plural"></div>
        <div className="dative-plural"></div>
        <div className="accusative-plural"></div>
        <div className="ablative-plural"></div>
        <div className="vocative-plural"></div>

        <div className="action-buttons">
          {!checkedAnswers &&
            <Button onClick={handleCheckAnswers} variant="primary" className='btn-block'>
              Check Answers
            </Button>
          }
          {checkedAnswers &&
            <Button onClick={handleNextPractice} variant="primary" className='btn-block'>
              Next Practice
            </Button>
          }
        </div>
      </Form>
    </Fragment>
  )
}

export default withRouter(Practice)
