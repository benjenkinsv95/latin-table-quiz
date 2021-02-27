import React, { Fragment, useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import useSound from 'use-sound'
import { removeMacrons } from '../../utils'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import './DeclensionPractice.scss'
import messages from '../AutoDismissAlert/messages'
import NominativeDefinition from '../definitions/NominativeDefinition/NominativeDefinition'
import GenitiveDefinition from '../definitions/GenitiveDefinition/GenitiveDefinition'
import AccusativeDefinition from '../definitions/AccusativeDefinition/AccusativeDefinition'
import DativeDefinition from '../definitions/DativeDefinition/DativeDefinition'
import AblativeDefinition from '../definitions/AblativeDefinition/AblativeDefinition'
import VocativeDefinition from '../definitions/VocativeDefinition/VocativeDefinition'

const getGendersDipslay = genders => genders.map((gender, index) => (
  <Fragment key={index}>
    <span className={gender.toLowerCase()}>{gender}</span>{index !== genders.length - 1 && ', '}
  </Fragment>
))

const onlyVisibleOnXs = 'd-block d-sm-none'
const hiddenOnXs = 'd-none d-sm-block'

const DeclensionPractice = ({ msgAlert, history, practiceQuestion, setRandomPracticeQuestion,
  useMacrons, practiceMode, practiceType, typeOneHideOthers, typeOneField, shouldPlayAudio }) => {
  const [checkedAnswers, setCheckedAnswers] = useState(false)
  const [correct, setCorrect] = useState(false)
  const [attempts, setAttempts] = useState({})
  // If all-cases, play all of the audio snippets, otherwise just the one for the specific field
  const audioUrl = practiceMode === 'one-case' && typeOneField.audioUrl ? typeOneField.audioUrl : practiceQuestion.audioUrl
  const [playAudio, { stop: stopAudio }] = useSound(audioUrl)

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const useAudioFieldUrlToPlay = () => {
    const audioFieldUrlToPlay = {}
    const urlToFieldsArrays = practiceQuestion.fields.map((field) => ([ field.audioUrl, useSound(field.audioUrl)[0] ]))
    urlToFieldsArrays.forEach(([audioUrl, play]) => {
      audioFieldUrlToPlay[audioUrl] = play
    })
    // Hack (Ugh): The rules of hooks say that you always need to call the same hooks in the same order
    // since the vocative case could cause `useSound` to be called 11 times, if we don't have a vocative case
    // call `useSound` one more time to appease react. 🙄
    if (practiceQuestion.fields.length === 10) {
      useSound(audioUrl)
    }
    return audioFieldUrlToPlay
  }
  const audioFieldUrlToPlay = useAudioFieldUrlToPlay()
  console.log(audioFieldUrlToPlay)

  const [message, setMessage] = useState('')

  const { word, group, type, genders, fields } = practiceQuestion
  const gender = getGendersDipslay(genders)
  const hasVocativeCase = fields.some(field => field.case === 'Vocative')

  // Whenever there is a new practice question
  useEffect(() => {
    if (practiceMode === 'all-cases') {
      // set the focus to the first input
      setTimeout(() => {
        const firstInput = document.querySelector('input')
        firstInput.focus()
      }, 300)
    }
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

  useEffect(() => {
    if (!checkedAnswers && practiceMode === 'one-case') {
      // fill in all of the fields except one
      const otherFields = fields.filter(field => field.case !== typeOneField.case || field.number !== typeOneField.number)
      const newAttempts = { ...attempts }

      for (const field of otherFields) {
        newAttempts[`${field.case.toLowerCase()}${field.number}`] = field.answer
      }

      setAttempts(newAttempts)

      // set focused input
      const caseNumberShishkabob = `${typeOneField.case.toLowerCase()}-${typeOneField.number.toLowerCase()}`
      setTimeout(() => {
        const fieldToTypeInput = document.querySelector(`#${caseNumberShishkabob}`)
        fieldToTypeInput.focus()
      }, 300)
    }
  }, [checkedAnswers, practiceQuestion])

  // when the component unmounts
  useEffect(() => {
    return () => {
      // TODO: Figure out how to stop audio when component unmounts
      // useSound does not make this straight forward
    }
  }, [])

  const isCorrect = (attempt = '', answer) => {
    let sanitizedAttempt = attempt.trim().toLowerCase()
    let sanitizedAnswer = answer.trim().toLowerCase()

    if (!useMacrons) {
      sanitizedAttempt = removeMacrons(sanitizedAttempt)
      sanitizedAnswer = removeMacrons(sanitizedAnswer)
    }

    return sanitizedAttempt === sanitizedAnswer
  }

  const getLabelJsx = label => {
    if (label.toLowerCase() === 'nominative') {
      return <NominativeDefinition />
    } else if (label.toLowerCase() === 'genitive') {
      return <GenitiveDefinition />
    } else if (label.toLowerCase() === 'accusative') {
      return <AccusativeDefinition />
    } else if (label.toLowerCase() === 'dative') {
      return <DativeDefinition />
    } else if (label.toLowerCase() === 'ablative') {
      return <AblativeDefinition />
    } else if (label.toLowerCase() === 'vocative') {
      return <VocativeDefinition />
    }

    return label
  }

  // get the background class for inputs
  const getInputBg = (attempt = '', field) => {
    if (!checkedAnswers) {
      return ''
    } else if (practiceType === 'speak' && (practiceMode === 'all-cases' || (typeOneField.case === field.case && typeOneField.number === field.number))) {
      return 'bg-secondary text-white placeholder-white'
    } else if (isCorrect(attempt, field.answer)) {
      return 'bg-success text-white placeholder-white'
    } else {
      return 'bg-danger text-white placeholder-white'
    }
  }

  const getCorrectAnswerTextColor = (attempt = '', field) => {
    if (!checkedAnswers) {
      return ''
    } else if (practiceType === 'speak' && (practiceMode === 'all-cases' || (typeOneField.case === field.case && typeOneField.number === field.number))) {
      return 'text-secondary'
    } else if (isCorrect(attempt, field.answer)) {
      return 'text-success'
    } else {
      return 'text-danger'
    }
  }

  // Get the text that shows the correct answer if the user got the question wrong, otherwise a falsy value.
  const getCorrectAnswerTextJsx = (attempt = '', field) => {
    const textColor = getCorrectAnswerTextColor(attempt, field)
    const handlePlayButton = () => {
      stopAudio()
      audioFieldUrlToPlay[field.audioUrl]()
    }
    return checkedAnswers && (!isCorrect(attempt, field.answer) || practiceType === 'speak') && (
      <Form.Text className={`${textColor} answer-text`}>
        Correct answer: {field.answer}{' '}
        <span className='play-button' onClick={handlePlayButton}>
          ▶️
        </span>
      </Form.Text>
    )
  }

  // Handle the user asking to check answers
  const handleCheckAnswers = event => {
    // if every field is correct
    const checkCorrect = fields.every(field => isCorrect(attempts[`${field.case.toLowerCase()}${field.number}`], field.answer))

    // update the checkedAnswers state
    setCheckedAnswers(true)

    // show a message if folks got everything correct
    if (checkCorrect) {
      setMessage(messages.correctAnswer)
      setTimeout(() => setMessage(''), 5000)
    }

    // play the audio so users can practice their pronunciation
    if (shouldPlayAudio) {
      playAudio()
    }

    // update the correct state
    setCorrect(checkCorrect)
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

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !checkedAnswers) {
      handleCheckAnswers()
    }
  }

  // Turn the fields into an array of divs to show on the page
  const jsxOfFields = fields => {
    return fields.map((field, index) => {
      const caseNumberShishkabob = `${field.case.toLowerCase()}-${field.number.toLowerCase()}`
      const caseNumberCamel = `${field.case.toLowerCase()}${field.number}`
      const typeOneHidden = practiceMode === 'one-case' && typeOneField && typeOneHideOthers && (field.case !== typeOneField.case || field.number !== typeOneField.number) && !checkedAnswers
      const typeOneHiddenClass = typeOneHidden ? 'd-none' : ''
      const placeholderLabel = practiceType === 'type' ? 'Enter' : 'Say'
      const disabled = practiceType === 'speak'
      return (
        // Set the className so grid can place them on the screen ex. nominative-singular
        <div key={index} className={caseNumberShishkabob}>
          <Form.Group className={typeOneHiddenClass}>
            {/* Only show the label directly above the field on xs screens */}
            <Form.Label className={onlyVisibleOnXs}><h5>{getLabelJsx(field.case)}</h5></Form.Label>
            <Form.Control
              // Add a class for the input. A danger or success color class after checking answers.
              className={getInputBg(attempts[caseNumberCamel], field)}
              required
              type="text"
              // set the name to the case followed by number ex. nominativeSingular
              name={caseNumberCamel}
              // set the value to the current attempts value. ex. attempts['nominativeSingular']
              value={attempts[caseNumberCamel] || ''}
              placeholder={`${placeholderLabel} ${field.case} ${field.number}`}
              onChange={handleChange}
              // turn off autocomplete, so folks have to type it each time
              autoComplete="off"
              id={caseNumberShishkabob}
              onKeyDown={handleKeyDown}
              disabled={disabled}
            />
            {/* Set tooltip text underneath the input to show the correct answer. */}
            {getCorrectAnswerTextJsx(attempts[`${field.case.trim().toLowerCase()}${field.number}`], field)}
          </Form.Group>
        </div>
      )
    })
  }

  const showNumberLabelCss = (number) => {
    const hide = practiceMode === 'one-case' && typeOneField && typeOneHideOthers && number !== typeOneField.number && !checkedAnswers
    return hide ? 'd-none' : ''
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
        <div className={`nominative-label ${hiddenOnXs}`}><h5 className='text-right'><NominativeDefinition /></h5></div>
        <div className={`genitive-label ${hiddenOnXs}`}><h5 className='text-right'><GenitiveDefinition /></h5></div>
        <div className={`dative-label ${hiddenOnXs}`}><h5 className='text-right'><DativeDefinition /></h5></div>
        <div className={`ablative-label ${hiddenOnXs}`}><h5 className='text-right'><AblativeDefinition /></h5></div>
        <div className={`vocative-label ${hasVocativeCase ? hiddenOnXs : 'd-none'}`}><h5 className='text-right'><VocativeDefinition /></h5></div>
        <div className={`accusative-label ${hiddenOnXs}`}><h5 className='text-right'><AccusativeDefinition /></h5></div>

        <div className="singular-title text-center"><h5 className={showNumberLabelCss('Singular')}>Singular</h5></div>
        {singularFieldsJsx}

        <div className="plural-title text-center"><h5 className={showNumberLabelCss('Plural')}>Plural</h5></div>
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
      <h6 className='text-center mt-2'>{message}</h6>
    </Fragment>
  )
}

export default withRouter(DeclensionPractice)
