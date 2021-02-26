import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'
import { v4 as uuid } from 'uuid'
import { knuthShuffle as shuffle } from 'knuth-shuffle'

import AuthenticatedRoute from './components/AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from './components/AutoDismissAlert/AutoDismissAlert'
import Header from './components/Header/Header'
import SignUp from './components/SignUp/SignUp'
import SignIn from './components/SignIn/SignIn'
import SignOut from './components/SignOut/SignOut'
import ChangePassword from './components/ChangePassword/ChangePassword'
import Home from './components/Home/Home'
import PracticeOptions from './components/PracticeOptions/PracticeOptions'
import Practice from './components/Practice/Practice'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: null,
      msgAlerts: [],
      // all of the practice questions, shuffle them originally
      practiceQuestions: shuffle([
        {
          word: 'Rose',
          type: 'Declension', // declension or adjective
          group: '1st', // 1st declension
          genders: ['Feminine'], // some types of practice will have multiple genders (male/feminine)
          singleGender: true, // Whether this word has a single gender (across different practice options) (false for adjectives)
          audioUrl: 'sounds/01 rosa 1st decl Latin Summary of Forms (Ranieri).m4a',
          fields: [
            { case: 'Nominative', number: 'Singular', answer: 'rosa' },
            { case: 'Genitive', number: 'Singular', answer: 'rosae' },
            { case: 'Dative', number: 'Singular', answer: 'rosae' },
            { case: 'Accusative', number: 'Singular', answer: 'rosam' },
            { case: 'Ablative', number: 'Singular', answer: 'rosā' },

            { case: 'Nominative', number: 'Plural', answer: 'rosae' },
            { case: 'Genitive', number: 'Plural', answer: 'rosārum' },
            { case: 'Dative', number: 'Plural', answer: 'rosīs' },
            { case: 'Accusative', number: 'Plural', answer: 'rosās' },
            { case: 'Ablative', number: 'Plural', answer: 'rosīs' }
          ]
        },
        {
          word: 'Friend',
          type: 'Declension',
          group: '2nd',
          genders: ['Masculine'],
          singleGender: true,
          audioUrl: 'sounds/02a amicus 2nd decl, Latin Summary of Forms (Ranieri).m4a',
          fields: [
            { case: 'Nominative', number: 'Singular', answer: 'amīcus' },
            { case: 'Genitive', number: 'Singular', answer: 'amīcī' },
            { case: 'Dative', number: 'Singular', answer: 'amīcō' },
            { case: 'Accusative', number: 'Singular', answer: 'amīcum' },
            { case: 'Ablative', number: 'Singular', answer: 'amīcō' },
            { case: 'Vocative', number: 'Singular', answer: 'amīce' },

            { case: 'Nominative', number: 'Plural', answer: 'amīcī' },
            { case: 'Genitive', number: 'Plural', answer: 'amīcōrum' },
            { case: 'Dative', number: 'Plural', answer: 'amīcīs' },
            { case: 'Accusative', number: 'Plural', answer: 'amīcōs' },
            { case: 'Ablative', number: 'Plural', answer: 'amīcīs' }
          ]
        },
        {
          word: 'Son',
          type: 'Declension',
          group: '2nd',
          genders: ['Masculine'],
          singleGender: true,
          audioUrl: 'sounds/02b filius 2nd decl, Latin Summary of Forms (Ranieri).m4a',
          fields: [
            { case: 'Nominative', number: 'Singular', answer: 'fīlius' },
            { case: 'Genitive', number: 'Singular', answer: 'fīliī' },
            { case: 'Dative', number: 'Singular', answer: 'fīliō' },
            { case: 'Accusative', number: 'Singular', answer: 'fīlium' },
            { case: 'Ablative', number: 'Singular', answer: 'fīliō' },
            { case: 'Vocative', number: 'Singular', answer: 'fīliī' },

            { case: 'Nominative', number: 'Plural', answer: 'fīliī' },
            { case: 'Genitive', number: 'Plural', answer: 'fīliōrum' },
            { case: 'Dative', number: 'Plural', answer: 'fīliīs' },
            { case: 'Accusative', number: 'Plural', answer: 'fīliōs' },
            { case: 'Ablative', number: 'Plural', answer: 'fīliīs' }
          ]
        },
        {
          word: 'Boy',
          type: 'Declension',
          group: '2nd',
          genders: ['Masculine'],
          singleGender: true,
          audioUrl: 'sounds/02c puer 2nd decl, Latin Summary of Forms (Ranieri).m4a',
          fields: [
            { case: 'Nominative', number: 'Singular', answer: 'puer' },
            { case: 'Genitive', number: 'Singular', answer: 'puerī' },
            { case: 'Dative', number: 'Singular', answer: 'puerō' },
            { case: 'Accusative', number: 'Singular', answer: 'puerum' },
            { case: 'Ablative', number: 'Singular', answer: 'puerō' },

            { case: 'Nominative', number: 'Plural', answer: 'puerī' },
            { case: 'Genitive', number: 'Plural', answer: 'puerōrum' },
            { case: 'Dative', number: 'Plural', answer: 'puerīs' },
            { case: 'Accusative', number: 'Plural', answer: 'puerōs' },
            { case: 'Ablative', number: 'Plural', answer: 'puerīs' }
          ]
        },
        {
          word: 'Field',
          type: 'Declension',
          group: '2nd',
          genders: ['Masculine'],
          singleGender: true,
          audioUrl: 'sounds/02d ager 2nd decl, Latin Summary of Forms (Ranieri).m4a',
          fields: [
            { case: 'Nominative', number: 'Singular', answer: 'ager' },
            { case: 'Genitive', number: 'Singular', answer: 'agrī' },
            { case: 'Dative', number: 'Singular', answer: 'agrō' },
            { case: 'Accusative', number: 'Singular', answer: 'agrum' },
            { case: 'Ablative', number: 'Singular', answer: 'agrō' },

            { case: 'Nominative', number: 'Plural', answer: 'agrī' },
            { case: 'Genitive', number: 'Plural', answer: 'agrōrum' },
            { case: 'Dative', number: 'Plural', answer: 'agrīs' },
            { case: 'Accusative', number: 'Plural', answer: 'agrōs' },
            { case: 'Ablative', number: 'Plural', answer: 'agrīs' }
          ]
        },
        {
          word: 'Gift',
          type: 'Declension',
          group: '2nd',
          genders: ['Neuter'],
          singleGender: true,
          audioUrl: 'sounds/02e donum 2nd decl, Latin Summary of Forms (Ranieri).m4a',
          fields: [
            { case: 'Nominative', number: 'Singular', answer: 'dōnum' },
            { case: 'Genitive', number: 'Singular', answer: 'dōnī' },
            { case: 'Dative', number: 'Singular', answer: 'dōnō' },
            { case: 'Accusative', number: 'Singular', answer: 'dōnum' },
            { case: 'Ablative', number: 'Singular', answer: 'dōnō' },

            { case: 'Nominative', number: 'Plural', answer: 'dōna' },
            { case: 'Genitive', number: 'Plural', answer: 'dōnōrum' },
            { case: 'Dative', number: 'Plural', answer: 'dōnīs' },
            { case: 'Accusative', number: 'Plural', answer: 'dōna' },
            { case: 'Ablative', number: 'Plural', answer: 'dōnīs' }
          ]
        },
        {
          word: 'Long',
          type: 'Adjective Comparison', // declension or adjective
          group: 'Regular', // Regular or irregular
          audioUrl: 'some/audio/path.mp3', // TODO: a real audio path later
          fields: [
            { type: 'Positive', answer: 'longus' },
            { type: 'Comparative', answer: 'longior' },
            { type: 'Superlative', answer: 'longissimus' }
          ]
        },
        {
          word: 'One',
          type: 'Number', // declension or adjective
          audioUrl: 'some/audio/path.mp3', // TODO: a real audio path later
          fields: [
            { type: 'Cardinal', answer: 'ūnus (-a, -um)' },
            { type: 'Ordinal', answer: 'prīmus' },
            { type: 'Adverbial', answer: 'semel' },
            { type: 'Distributive', answer: 'singulī • ūnī' }
          ]
        }
      ])
    }
  }

  chooseRandomPracticeQuestion = questionType => {
    const randomQuestionIndex = this.state.practiceQuestions.findIndex(question => question.type === questionType)
    const randomQuestion = this.state.practiceQuestions[randomQuestionIndex]
    // copy
    const newPracticeQuestions = [...this.state.practiceQuestions]

    // remove the element
    newPracticeQuestions.splice(randomQuestionIndex, 1)

    // push it at the end of the list
    newPracticeQuestions.push(randomQuestion)

    // update the state
    this.setState({ practiceQuestions: newPracticeQuestions })

    return randomQuestion
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  deleteAlert = (id) => {
    this.setState((state) => {
      return { msgAlerts: state.msgAlerts.filter(msg => msg.id !== id) }
    })
  }

  msgAlert = ({ heading, message, variant }) => {
    const id = uuid()
    this.setState((state) => {
      return { msgAlerts: [...state.msgAlerts, { heading, message, variant, id }] }
    })
  }

  render () {
    const { msgAlerts, user, practiceQuestions } = this.state

    return (
      <Fragment>
        <Header user={user} />
        {msgAlerts.map(msgAlert => (
          <AutoDismissAlert
            key={msgAlert.id}
            heading={msgAlert.heading}
            variant={msgAlert.variant}
            message={msgAlert.message}
            id={msgAlert.id}
            deleteAlert={this.deleteAlert}
          />
        ))}
        <main className="container">
          <Route exact path='/' render={() => (
            <Home msgAlert={this.msgAlert} />
          )} />
          <Route exact path='/practice-options' render={() => (
            <PracticeOptions msgAlert={this.msgAlert} />
          )} />
          <Route exact path='/practice' render={() => (
            <Practice msgAlert={this.msgAlert} practiceQuestions={practiceQuestions} chooseRandomPracticeQuestion={this.chooseRandomPracticeQuestion} />
          )} />
          <Route path='/sign-up' render={() => (
            <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut msgAlert={this.msgAlert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword msgAlert={this.msgAlert} user={user} />
          )} />
        </main>
      </Fragment>
    )
  }
}

export default App
