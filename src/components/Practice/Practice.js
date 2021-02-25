import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'

import DeclensionPractice from '../DeclensionPractice/DeclensionPractice'

// import messages from '../AutoDismissAlert/messages'

const Practice = ({ msgAlert, history, practiceQuestions, chooseRandomPracticeQuestion }) => {
  const [practiceQuestion, setPracticeQuestion] = useState(null)

  const setRandomPracticeQuestion = () => {
    const randomPractice = chooseRandomPracticeQuestion('Declension')
    setPracticeQuestion(randomPractice)
  }

  useEffect(() => {
    setRandomPracticeQuestion()
  }, [])

  let practiceTypeJsx
  if (practiceQuestion === null) {
    practiceTypeJsx = <h3>Loading...</h3>
  } else if (practiceQuestion.type === 'Declension') {
    practiceTypeJsx = <DeclensionPractice msgAlert={msgAlert} history={history} practiceQuestion={practiceQuestion} setRandomPracticeQuestion={setRandomPracticeQuestion} />
  }

  return (
    <div className="row">
      <div className="col-sm-10 col-md-8 mx-auto mt-5">
        {practiceTypeJsx}
      </div>
    </div>
  )
}

export default withRouter(Practice)
