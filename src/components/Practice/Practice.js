import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'

import DeclensionPractice from '../DeclensionPractice/DeclensionPractice'

// import messages from '../AutoDismissAlert/messages'

const Practice = ({ msgAlert, history, practiceQuestions }) => {
  const [practiceQuestion, setPracticeQuestion] = useState(null)

  const chooseRandomPractice = () => {
    // TODO: Randomize
    return practiceQuestions.find(question => question.type === 'Declension')
  }

  useEffect(() => {
    const randomPractice = chooseRandomPractice()
    setPracticeQuestion(randomPractice)
  }, [])

  let practiceTypeJsx
  if (practiceQuestion === null) {
    practiceTypeJsx = <h3>Loading...</h3>
  } else if (practiceQuestion.type === 'Declension') {
    practiceTypeJsx = <DeclensionPractice msgAlert={msgAlert} history={history} practiceQuestion={practiceQuestion} chooseRandomPractice={chooseRandomPractice} />
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
