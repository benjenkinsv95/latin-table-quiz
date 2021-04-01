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
import { loadBooleanOption, saveBooleanOption } from './utils'

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
            { case: 'Nominative', number: 'Singular', answer: 'rosa', audioUrl: 'sounds/01 rosa 1st decl word rosa Latin Summary of Forms (Ranieri) (mp3cut.net).m4a' },
            { case: 'Genitive', number: 'Singular', answer: 'rosae', audioUrl: 'sounds/01 rosa 1st decl word rosae Latin Summary of Forms (Ranieri) (mp3cut.net).m4a' },
            { case: 'Dative', number: 'Singular', answer: 'rosae', audioUrl: 'sounds/01 rosa 1st decl word rosae Latin Summary of Forms (Ranieri) (mp3cut.net).m4a' },
            { case: 'Accusative', number: 'Singular', answer: 'rosam', audioUrl: 'sounds/01 rosa 1st decl word rosam Latin Summary of Forms (Ranieri) (mp3cut.net).m4a' },
            { case: 'Ablative', number: 'Singular', answer: 'rosā', audioUrl: 'sounds/01 rosa 1st decl word rosā Latin Summary of Forms (Ranieri) (mp3cut.net).m4a' },

            { case: 'Nominative', number: 'Plural', answer: 'rosae', audioUrl: 'sounds/01 rosa 1st decl word rosae Latin Summary of Forms (Ranieri) (mp3cut.net).m4a' },
            { case: 'Genitive', number: 'Plural', answer: 'rosārum', audioUrl: 'sounds/01 rosa 1st decl word rosārum Latin Summary of Forms (Ranieri) (mp3cut.net).m4a' },
            { case: 'Dative', number: 'Plural', answer: 'rosīs', audioUrl: 'sounds/01 rosa 1st decl word rosīs Latin Summary of Forms (Ranieri) (mp3cut.net).m4a' },
            { case: 'Accusative', number: 'Plural', answer: 'rosās', audioUrl: 'sounds/01 rosa 1st decl word rosās Latin Summary of Forms (Ranieri) (mp3cut.net).m4a' },
            { case: 'Ablative', number: 'Plural', answer: 'rosīs', audioUrl: 'sounds/01 rosa 1st decl word rosīs Latin Summary of Forms (Ranieri) (mp3cut.net).m4a' }
          ]
        },
        {
          'word': 'Friend',
          'type': 'Declension',
          'group': '2nd',
          'genders': [
            'Masculine'
          ],
          'singleGender': true,
          'audioUrl': 'sounds/02a amicus 2nd decl, Latin Summary of Forms (Ranieri).m4a',
          'fields': [
            {
              'case': 'Nominative',
              'number': 'Singular',
              'answer': 'amīcus',
              'audioUrl': 'sounds/02a amicus 2nd decl word amīcus, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Genitive',
              'number': 'Singular',
              'answer': 'amīcī',
              'audioUrl': 'sounds/02a amicus 2nd decl word amīcī, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Dative',
              'number': 'Singular',
              'answer': 'amīcō',
              'audioUrl': 'sounds/02a amicus 2nd decl word amīcō, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Accusative',
              'number': 'Singular',
              'answer': 'amīcum',
              'audioUrl': 'sounds/02a amicus 2nd decl word amīcum, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Ablative',
              'number': 'Singular',
              'answer': 'amīcō',
              'audioUrl': 'sounds/02a amicus 2nd decl word amīcō, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Vocative',
              'number': 'Singular',
              'answer': 'amīce',
              'audioUrl': 'sounds/02a amicus 2nd decl word amīce, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Nominative',
              'number': 'Plural',
              'answer': 'amīcī',
              'audioUrl': 'sounds/02a amicus 2nd decl word amīcī, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Genitive',
              'number': 'Plural',
              'answer': 'amīcōrum',
              'audioUrl': 'sounds/02a amicus 2nd decl word amīcōrum, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Dative',
              'number': 'Plural',
              'answer': 'amīcīs',
              'audioUrl': 'sounds/02a amicus 2nd decl word amīcīs, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Accusative',
              'number': 'Plural',
              'answer': 'amīcōs',
              'audioUrl': 'sounds/02a amicus 2nd decl word amīcōs, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Ablative',
              'number': 'Plural',
              'answer': 'amīcīs',
              'audioUrl': 'sounds/02a amicus 2nd decl word amīcīs, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            }
          ]
        },
        {
          'word': 'Son',
          'type': 'Declension',
          'group': '2nd',
          'genders': [
            'Masculine'
          ],
          'singleGender': true,
          'audioUrl': 'sounds/02b filius 2nd decl, Latin Summary of Forms (Ranieri).m4a',
          'fields': [
            {
              'case': 'Nominative',
              'number': 'Singular',
              'answer': 'fīlius',
              'audioUrl': 'sounds/02b filius 2nd decl word fīlius, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Genitive',
              'number': 'Singular',
              'answer': 'fīliī',
              'audioUrl': 'sounds/02b filius 2nd decl word fīliī, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Dative',
              'number': 'Singular',
              'answer': 'fīliō',
              'audioUrl': 'sounds/02b filius 2nd decl word fīliō, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Accusative',
              'number': 'Singular',
              'answer': 'fīlium',
              'audioUrl': 'sounds/02b filius 2nd decl word fīlium, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Ablative',
              'number': 'Singular',
              'answer': 'fīliō',
              'audioUrl': 'sounds/02b filius 2nd decl word fīliō, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Vocative',
              'number': 'Singular',
              'answer': 'fīlī',
              'audioUrl': 'sounds/02b filius 2nd decl word fīlī, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Nominative',
              'number': 'Plural',
              'answer': 'fīliī',
              'audioUrl': 'sounds/02b filius 2nd decl word fīliī, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Genitive',
              'number': 'Plural',
              'answer': 'fīliōrum',
              'audioUrl': 'sounds/02b filius 2nd decl word fīliōrum, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Dative',
              'number': 'Plural',
              'answer': 'fīliīs',
              'audioUrl': 'sounds/02b filius 2nd decl word fīliīs, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Accusative',
              'number': 'Plural',
              'answer': 'fīliōs',
              'audioUrl': 'sounds/02b filius 2nd decl word fīliōs, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Ablative',
              'number': 'Plural',
              'answer': 'fīliīs',
              'audioUrl': 'sounds/02b filius 2nd decl word fīliīs, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            }
          ]
        },
        {
          'word': 'Boy',
          'type': 'Declension',
          'group': '2nd',
          'genders': [
            'Masculine'
          ],
          'singleGender': true,
          'audioUrl': 'sounds/02c puer 2nd decl, Latin Summary of Forms (Ranieri).m4a',
          'fields': [
            {
              'case': 'Nominative',
              'number': 'Singular',
              'answer': 'puer',
              'audioUrl': 'sounds/02c puer 2nd decl word puer, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Genitive',
              'number': 'Singular',
              'answer': 'puerī',
              'audioUrl': 'sounds/02c puer 2nd decl word puerī, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Dative',
              'number': 'Singular',
              'answer': 'puerō',
              'audioUrl': 'sounds/02c puer 2nd decl word puerō, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Accusative',
              'number': 'Singular',
              'answer': 'puerum',
              'audioUrl': 'sounds/02c puer 2nd decl word puerum, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Ablative',
              'number': 'Singular',
              'answer': 'puerō',
              'audioUrl': 'sounds/02c puer 2nd decl word puerō, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Nominative',
              'number': 'Plural',
              'answer': 'puerī',
              'audioUrl': 'sounds/02c puer 2nd decl word puerī, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Genitive',
              'number': 'Plural',
              'answer': 'puerōrum',
              'audioUrl': 'sounds/02c puer 2nd decl word puerōrum, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Dative',
              'number': 'Plural',
              'answer': 'puerīs',
              'audioUrl': 'sounds/02c puer 2nd decl word puerīs, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Accusative',
              'number': 'Plural',
              'answer': 'puerōs',
              'audioUrl': 'sounds/02c puer 2nd decl word puerōs, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Ablative',
              'number': 'Plural',
              'answer': 'puerīs',
              'audioUrl': 'sounds/02c puer 2nd decl word puerīs, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            }
          ]
        },
        {
          'word': 'Field',
          'type': 'Declension',
          'group': '2nd',
          'genders': [
            'Masculine'
          ],
          'singleGender': true,
          'audioUrl': 'sounds/02d ager 2nd decl, Latin Summary of Forms (Ranieri).m4a',
          'fields': [
            {
              'case': 'Nominative',
              'number': 'Singular',
              'answer': 'ager',
              'audioUrl': 'sounds/02d ager 2nd decl word ager, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Genitive',
              'number': 'Singular',
              'answer': 'agrī',
              'audioUrl': 'sounds/02d ager 2nd decl word agrī, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Dative',
              'number': 'Singular',
              'answer': 'agrō',
              'audioUrl': 'sounds/02d ager 2nd decl word agrō, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Accusative',
              'number': 'Singular',
              'answer': 'agrum',
              'audioUrl': 'sounds/02d ager 2nd decl word agrum, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Ablative',
              'number': 'Singular',
              'answer': 'agrō',
              'audioUrl': 'sounds/02d ager 2nd decl word agrō, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Nominative',
              'number': 'Plural',
              'answer': 'agrī',
              'audioUrl': 'sounds/02d ager 2nd decl word agrī, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Genitive',
              'number': 'Plural',
              'answer': 'agrōrum',
              'audioUrl': 'sounds/02d ager 2nd decl word agrōrum, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Dative',
              'number': 'Plural',
              'answer': 'agrīs',
              'audioUrl': 'sounds/02d ager 2nd decl word agrīs, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Accusative',
              'number': 'Plural',
              'answer': 'agrōs',
              'audioUrl': 'sounds/02d ager 2nd decl word agrōs, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Ablative',
              'number': 'Plural',
              'answer': 'agrīs',
              'audioUrl': 'sounds/02d ager 2nd decl word agrīs, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            }
          ]
        },
        {
          'word': 'Gift',
          'type': 'Declension',
          'group': '2nd',
          'genders': [
            'Neuter'
          ],
          'singleGender': true,
          'audioUrl': 'sounds/02e donum 2nd decl, Latin Summary of Forms (Ranieri).m4a',
          'fields': [
            {
              'case': 'Nominative',
              'number': 'Singular',
              'answer': 'dōnum',
              'audioUrl': 'sounds/02e donum 2nd decl word dōnum, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Genitive',
              'number': 'Singular',
              'answer': 'dōnī',
              'audioUrl': 'sounds/02e donum 2nd decl word dōnī, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Dative',
              'number': 'Singular',
              'answer': 'dōnō',
              'audioUrl': 'sounds/02e donum 2nd decl word dōnō, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Accusative',
              'number': 'Singular',
              'answer': 'dōnum',
              'audioUrl': 'sounds/02e donum 2nd decl word dōnum, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Ablative',
              'number': 'Singular',
              'answer': 'dōnō',
              'audioUrl': 'sounds/02e donum 2nd decl word dōnō, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Nominative',
              'number': 'Plural',
              'answer': 'dōna',
              'audioUrl': 'sounds/02e donum 2nd decl word dōna, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Genitive',
              'number': 'Plural',
              'answer': 'dōnōrum',
              'audioUrl': 'sounds/02e donum 2nd decl word dōnōrum, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Dative',
              'number': 'Plural',
              'answer': 'dōnīs',
              'audioUrl': 'sounds/02e donum 2nd decl word dōnīs, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Accusative',
              'number': 'Plural',
              'answer': 'dōna',
              'audioUrl': 'sounds/02e donum 2nd decl word dōna, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Ablative',
              'number': 'Plural',
              'answer': 'dōnīs',
              'audioUrl': 'sounds/02e donum 2nd decl word dōnīs, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            }
          ]
        },
        {
          'word': 'King',
          'type': 'Declension',
          'group': '3rd',
          'genders': [
            'Masculine'
          ],
          'singleGender': true,
          'audioUrl': 'sounds/03a rex 3rd decl, Latin Summary of Forms (Ranieri).m4a',
          'fields': [
            {
              'case': 'Nominative',
              'number': 'Singular',
              'answer': 'rēx',
              'audioUrl': 'sounds/03a rex 3rd decl word rēx, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Genitive',
              'number': 'Singular',
              'answer': 'rēgis',
              'audioUrl': 'sounds/03a rex 3rd decl word rēgis, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Dative',
              'number': 'Singular',
              'answer': 'rēgī',
              'audioUrl': 'sounds/03a rex 3rd decl word rēgī, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Accusative',
              'number': 'Singular',
              'answer': 'rēgem',
              'audioUrl': 'sounds/03a rex 3rd decl word rēgem, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Ablative',
              'number': 'Singular',
              'answer': 'rēge',
              'audioUrl': 'sounds/03a rex 3rd decl word rēge, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Nominative',
              'number': 'Plural',
              'answer': 'rēgēs',
              'audioUrl': 'sounds/03a rex 3rd decl word rēgēs, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Genitive',
              'number': 'Plural',
              'answer': 'rēgum',
              'audioUrl': 'sounds/03a rex 3rd decl word rēgum, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Dative',
              'number': 'Plural',
              'answer': 'rēgībus',
              'audioUrl': 'sounds/03a rex 3rd decl word rēgībus, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Accusative',
              'number': 'Plural',
              'answer': 'rēgēs',
              'audioUrl': 'sounds/03a rex 3rd decl word rēgēs, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Ablative',
              'number': 'Plural',
              'answer': 'rēgībus',
              'audioUrl': 'sounds/03a rex 3rd decl word rēgībus, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            }
          ]
        },
        {
          'word': 'Body',
          'type': 'Declension',
          'group': '3rd',
          'genders': [
            'Neuter'
          ],
          'singleGender': true,
          'audioUrl': 'sounds/03b corpus 3rd decl, Latin Summary of Forms (Ranieri).m4a',
          'fields': [
            {
              'case': 'Nominative',
              'number': 'Singular',
              'answer': 'corpus',
              'audioUrl': 'sounds/03b corpus 3rd decl word corpus, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Genitive',
              'number': 'Singular',
              'answer': 'corporis',
              'audioUrl': 'sounds/03b corpus 3rd decl word corporis, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Dative',
              'number': 'Singular',
              'answer': 'corporī',
              'audioUrl': 'sounds/03b corpus 3rd decl word corporī, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Accusative',
              'number': 'Singular',
              'answer': 'corpus',
              'audioUrl': 'sounds/03b corpus 3rd decl word corpus, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Ablative',
              'number': 'Singular',
              'answer': 'corpore',
              'audioUrl': 'sounds/03b corpus 3rd decl word corpore, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Nominative',
              'number': 'Plural',
              'answer': 'corpora',
              'audioUrl': 'sounds/03b corpus 3rd decl word corpora, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Genitive',
              'number': 'Plural',
              'answer': 'corporum',
              'audioUrl': 'sounds/03b corpus 3rd decl word corporum, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Dative',
              'number': 'Plural',
              'answer': 'corporibus',
              'audioUrl': 'sounds/03b corpus 3rd decl word corporibus, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Accusative',
              'number': 'Plural',
              'answer': 'corpora',
              'audioUrl': 'sounds/03b corpus 3rd decl word corpora, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Ablative',
              'number': 'Plural',
              'answer': 'corporibus',
              'audioUrl': 'sounds/03b corpus 3rd decl word corporibus, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            }
          ]
        },
        {
          'word': 'Sheep',
          'type': 'Declension',
          'group': '3rd',
          'genders': [
            'Feminine'
          ],
          'singleGender': true,
          'audioUrl': 'sounds/03c ovis 3rd decl, Latin Summary of Forms (Ranieri).m4a',
          'fields': [
            {
              'case': 'Nominative',
              'number': 'Singular',
              'answer': 'ovis',
              'audioUrl': 'sounds/03c ovis 3rd decl word ovis, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Genitive',
              'number': 'Singular',
              'answer': 'ovis',
              'audioUrl': 'sounds/03c ovis 3rd decl word ovis, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Dative',
              'number': 'Singular',
              'answer': 'ovī',
              'audioUrl': 'sounds/03c ovis 3rd decl word ovī, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Accusative',
              'number': 'Singular',
              'answer': 'ovem',
              'audioUrl': 'sounds/03c ovis 3rd decl word ovem, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Ablative',
              'number': 'Singular',
              'answer': 'ove',
              'audioUrl': 'sounds/03c ovis 3rd decl word ove, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Nominative',
              'number': 'Plural',
              'answer': 'ovēs',
              'audioUrl': 'sounds/03c ovis 3rd decl word ovēs, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Genitive',
              'number': 'Plural',
              'answer': 'ovium',
              'audioUrl': 'sounds/03c ovis 3rd decl word ovium, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Dative',
              'number': 'Plural',
              'answer': 'ovibus',
              'audioUrl': 'sounds/03c ovis 3rd decl word ovibus, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Accusative',
              'number': 'Plural',
              'answer': 'ovīs/ovēs',
              'audioUrl': 'sounds/03c ovis 3rd decl word ovīs or ovēs, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Ablative',
              'number': 'Plural',
              'answer': 'ovibus',
              'audioUrl': 'sounds/03c ovis 3rd decl word ovibus, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            }
          ]
        },
        {
          'word': 'City',
          'type': 'Declension',
          'group': '3rd',
          'genders': [
            'Feminine'
          ],
          'singleGender': true,
          'audioUrl': 'sounds/03d urbs 3rd decl, Latin Summary of Forms (Ranieri).m4a',
          'fields': [
            {
              'case': 'Nominative',
              'number': 'Singular',
              'answer': 'urbs',
              'audioUrl': 'sounds/03d urbs 3rd decl word urbs, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Genitive',
              'number': 'Singular',
              'answer': 'urbis',
              'audioUrl': 'sounds/03d urbs 3rd decl word urbis, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Dative',
              'number': 'Singular',
              'answer': 'urbī',
              'audioUrl': 'sounds/03d urbs 3rd decl word urbī, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Accusative',
              'number': 'Singular',
              'answer': 'urbem',
              'audioUrl': 'sounds/03d urbs 3rd decl word urbem, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Ablative',
              'number': 'Singular',
              'answer': 'urbe',
              'audioUrl': 'sounds/03d urbs 3rd decl word urbe, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Nominative',
              'number': 'Plural',
              'answer': 'urbēs',
              'audioUrl': 'sounds/03d urbs 3rd decl word urbēs, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Genitive',
              'number': 'Plural',
              'answer': 'urbium',
              'audioUrl': 'sounds/03d urbs 3rd decl word urbium, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Dative',
              'number': 'Plural',
              'answer': 'urbibus',
              'audioUrl': 'sounds/03d urbs 3rd decl word urbibus, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Accusative',
              'number': 'Plural',
              'answer': 'urbīs/urbēs',
              'audioUrl': 'sounds/03d urbs 3rd decl word urbīs or urbēs, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Ablative',
              'number': 'Plural',
              'answer': 'urbibus',
              'audioUrl': 'sounds/03d urbs 3rd decl word urbibus, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            }
          ]
        },
        {
          'word': 'Sea',
          'type': 'Declension',
          'group': '3rd',
          'genders': [
            'Neuter'
          ],
          'singleGender': true,
          'audioUrl': 'sounds/03e mare 3rd decl, Latin Summary of Forms (Ranieri).m4a',
          'fields': [
            {
              'case': 'Nominative',
              'number': 'Singular',
              'answer': 'mare',
              'audioUrl': 'sounds/03e mare 3rd decl word mare, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Genitive',
              'number': 'Singular',
              'answer': 'maris',
              'audioUrl': 'sounds/03e mare 3rd decl word maris, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Dative',
              'number': 'Singular',
              'answer': 'marī',
              'audioUrl': 'sounds/03e mare 3rd decl word marī, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Accusative',
              'number': 'Singular',
              'answer': 'mare',
              'audioUrl': 'sounds/03e mare 3rd decl word mare, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Ablative',
              'number': 'Singular',
              'answer': 'marī',
              'audioUrl': 'sounds/03e mare 3rd decl word marī, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Nominative',
              'number': 'Plural',
              'answer': 'maria',
              'audioUrl': 'sounds/03e mare 3rd decl word maria, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Genitive',
              'number': 'Plural',
              'answer': 'marium',
              'audioUrl': 'sounds/03e mare 3rd decl word marium, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Dative',
              'number': 'Plural',
              'answer': 'maribus',
              'audioUrl': 'sounds/03e mare 3rd decl word maribus, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Accusative',
              'number': 'Plural',
              'answer': 'maria',
              'audioUrl': 'sounds/03e mare 3rd decl word maria, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Ablative',
              'number': 'Plural',
              'answer': 'maribus',
              'audioUrl': 'sounds/03e mare 3rd decl word maribus, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            }
          ]
        },
        {
          'word': 'Force',
          'type': 'Declension',
          'group': '3rd',
          'genders': [
            'Feminine'
          ],
          'singleGender': true,
          'audioUrl': 'sounds/03f vis 3rd decl, Latin Summary of Forms (Ranieri).m4a',
          'fields': [
            {
              'case': 'Nominative',
              'number': 'Singular',
              'answer': 'vīs',
              'audioUrl': 'sounds/03f vis 3rd decl word vīs, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Genitive',
              'number': 'Singular',
              'answer': 'vīs',
              'audioUrl': 'sounds/03f vis 3rd decl word vīs, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Dative',
              'number': 'Singular',
              'answer': 'vī',
              'audioUrl': 'sounds/03f vis 3rd decl word vī, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Accusative',
              'number': 'Singular',
              'answer': 'vim',
              'audioUrl': 'sounds/03f vis 3rd decl word vim, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Ablative',
              'number': 'Singular',
              'answer': 'vī',
              'audioUrl': 'sounds/03f vis 3rd decl word vī, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Nominative',
              'number': 'Plural',
              'answer': 'vīrēs',
              'audioUrl': 'sounds/03f vis 3rd decl word vīrēs, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Genitive',
              'number': 'Plural',
              'answer': 'vīrium',
              'audioUrl': 'sounds/03f vis 3rd decl word vīrium, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Dative',
              'number': 'Plural',
              'answer': 'vīribus',
              'audioUrl': 'sounds/03f vis 3rd decl word vīribus, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Accusative',
              'number': 'Plural',
              'answer': 'vīrīs/vīrēs',
              'audioUrl': 'sounds/03f vis 3rd decl word vīrīs or vīrēs, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Ablative',
              'number': 'Plural',
              'answer': 'vīribus',
              'audioUrl': 'sounds/03f vis 3rd decl word vīribus, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            }
          ]
        },
        {
          'word': 'Fruit',
          'type': 'Declension',
          'group': '4th',
          'genders': [
            'Masculine'
          ],
          'singleGender': true,
          'audioUrl': 'sounds/04a fructus 4th decl, Latin Summary of Forms (Ranieri).m4a',
          'fields': [
            {
              'case': 'Nominative',
              'number': 'Singular',
              'answer': 'frūctus',
              'audioUrl': 'sounds/04a fructus 4th decl word frūctus, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Genitive',
              'number': 'Singular',
              'answer': 'frūctūs',
              'audioUrl': 'sounds/04a fructus 4th decl word frūctūs, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Dative',
              'number': 'Singular',
              'answer': 'frūctuī',
              'audioUrl': 'sounds/04a fructus 4th decl word frūctuī, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Accusative',
              'number': 'Singular',
              'answer': 'frūctum',
              'audioUrl': 'sounds/04a fructus 4th decl word frūctum, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Ablative',
              'number': 'Singular',
              'answer': 'frūctū',
              'audioUrl': 'sounds/04a fructus 4th decl word frūctū, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Nominative',
              'number': 'Plural',
              'answer': 'frūctūs',
              'audioUrl': 'sounds/04a fructus 4th decl word frūctūs, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Genitive',
              'number': 'Plural',
              'answer': 'frūctuum',
              'audioUrl': 'sounds/04a fructus 4th decl word frūctuum, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Dative',
              'number': 'Plural',
              'answer': 'frūctibus',
              'audioUrl': 'sounds/04a fructus 4th decl word frūctibus, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Accusative',
              'number': 'Plural',
              'answer': 'frūctūs',
              'audioUrl': 'sounds/04a fructus 4th decl word frūctūs, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Ablative',
              'number': 'Plural',
              'answer': 'frūctibus',
              'audioUrl': 'sounds/04a fructus 4th decl word frūctibus, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            }
          ]
        },
        {
          'word': 'Knee',
          'type': 'Declension',
          'group': '4th',
          'genders': [
            'Neuter'
          ],
          'singleGender': true,
          'audioUrl': 'sounds/04b genu 4th decl, Latin Summary of Forms (Ranieri).m4a',
          'fields': [
            {
              'case': 'Nominative',
              'number': 'Singular',
              'answer': 'genū',
              'audioUrl': 'sounds/04b genu 4th decl word genū, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Genitive',
              'number': 'Singular',
              'answer': 'genūs',
              'audioUrl': 'sounds/04b genu 4th decl word genūs, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Dative',
              'number': 'Singular',
              'answer': 'genuī/genū',
              'audioUrl': 'sounds/04b genu 4th decl word genuī/genū, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Accusative',
              'number': 'Singular',
              'answer': 'genū',
              'audioUrl': 'sounds/04b genu 4th decl word genū, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Ablative',
              'number': 'Singular',
              'answer': 'genū',
              'audioUrl': 'sounds/04b genu 4th decl word genū, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Nominative',
              'number': 'Plural',
              'answer': 'genua',
              'audioUrl': 'sounds/04b genu 4th decl word genua, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Genitive',
              'number': 'Plural',
              'answer': 'genuum',
              'audioUrl': 'sounds/04b genu 4th decl word genuum, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Dative',
              'number': 'Plural',
              'answer': 'genibus',
              'audioUrl': 'sounds/04b genu 4th decl word genibus, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Accusative',
              'number': 'Plural',
              'answer': 'genua',
              'audioUrl': 'sounds/04b genu 4th decl word genua, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Ablative',
              'number': 'Plural',
              'answer': 'genibus',
              'audioUrl': 'sounds/04b genu 4th decl word genibus, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            }
          ]
        },
        {
          'word': 'Day',
          'type': 'Declension',
          'group': '5th',
          'genders': [
            'Masculine',
            'Feminine'
          ],
          'singleGender': true,
          'audioUrl': 'sounds/05a dies 5th decl, Latin Summary of Forms (Ranieri).m4a',
          'fields': [
            {
              'case': 'Nominative',
              'number': 'Singular',
              'answer': 'diēs',
              'audioUrl': 'sounds/05a dies 5th decl word diēs, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Genitive',
              'number': 'Singular',
              'answer': 'diēī',
              'audioUrl': 'sounds/05a dies 5th decl word diēī, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Dative',
              'number': 'Singular',
              'answer': 'diēī',
              'audioUrl': 'sounds/05a dies 5th decl word diēī, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Accusative',
              'number': 'Singular',
              'answer': 'diem',
              'audioUrl': 'sounds/05a dies 5th decl word diem, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Ablative',
              'number': 'Singular',
              'answer': 'diē',
              'audioUrl': 'sounds/05a dies 5th decl word diē, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Nominative',
              'number': 'Plural',
              'answer': 'diēs',
              'audioUrl': 'sounds/05a dies 5th decl word diēs, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Genitive',
              'number': 'Plural',
              'answer': 'diērum',
              'audioUrl': 'sounds/05a dies 5th decl word diērum, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Dative',
              'number': 'Plural',
              'answer': 'diēbus',
              'audioUrl': 'sounds/05a dies 5th decl word diēbus, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Accusative',
              'number': 'Plural',
              'answer': 'diēs',
              'audioUrl': 'sounds/05a dies 5th decl word diēs, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Ablative',
              'number': 'Plural',
              'answer': 'diēbus',
              'audioUrl': 'sounds/05a dies 5th decl word diēbus, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            }
          ]
        },
        {
          'word': 'Thing',
          'type': 'Declension',
          'group': '5th',
          'genders': [
            'Feminine'
          ],
          'singleGender': true,
          'audioUrl': 'sounds/05b res 5th decl, Latin Summary of Forms (Ranieri).m4a',
          'fields': [
            {
              'case': 'Nominative',
              'number': 'Singular',
              'answer': 'rēs',
              'audioUrl': 'sounds/05b res 5th decl word rēs, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Genitive',
              'number': 'Singular',
              'answer': 'reī',
              'audioUrl': 'sounds/05b res 5th decl word reī, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Dative',
              'number': 'Singular',
              'answer': 'reī',
              'audioUrl': 'sounds/05b res 5th decl word reī, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Accusative',
              'number': 'Singular',
              'answer': 'rem',
              'audioUrl': 'sounds/05b res 5th decl word rem, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Ablative',
              'number': 'Singular',
              'answer': 'rē',
              'audioUrl': 'sounds/05b res 5th decl word rē, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Nominative',
              'number': 'Plural',
              'answer': 'rēs',
              'audioUrl': 'sounds/05b res 5th decl word rēs, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Genitive',
              'number': 'Plural',
              'answer': 'rērum',
              'audioUrl': 'sounds/05b res 5th decl word rērum, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Dative',
              'number': 'Plural',
              'answer': 'rēbus',
              'audioUrl': 'sounds/05b res 5th decl word rēbus, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Accusative',
              'number': 'Plural',
              'answer': 'rēs',
              'audioUrl': 'sounds/05b res 5th decl word rēs, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            },
            {
              'case': 'Ablative',
              'number': 'Plural',
              'answer': 'rēbus',
              'audioUrl': 'sounds/05b res 5th decl word rēbus, Latin Summary of Forms (Ranieri) (mp3cut.net).m4a'
            }
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
      ]),
      filteredQuestions: [],
      useMacrons: loadBooleanOption('useMacrons', true),
      // practice all-cases or one-case
      practiceMode: localStorage.getItem('practiceMode') || 'all-cases',
      // should one-case hide the other inputs or fill them in
      typeOneHideOthers: loadBooleanOption('typeOneHideOthers', true),
      // type or speak
      practiceType: localStorage.getItem('practiceType') || 'type',
      // Should play audio when answer correct
      shouldPlayAudio: loadBooleanOption('shouldPlayAudio', true),
      enabledDeclensions: JSON.parse(localStorage.getItem('enabledDeclensions') || '[]')
    }
  }

  setUseMacrons = useMacrons => {
    this.setState({ useMacrons })
    saveBooleanOption('useMacrons', useMacrons)
  }

  setPracticeMode = practiceMode => {
    this.setState({ practiceMode })
    localStorage.setItem('practiceMode', practiceMode)
  }

  setTypeOneHideOthers = typeOneHideOthers => {
    this.setState({ typeOneHideOthers })
    saveBooleanOption('typeOneHideOthers', typeOneHideOthers)
  }

  setPracticeType = practiceType => {
    this.setState({ practiceType })
    localStorage.setItem('practiceType', practiceType)
  }

  setShouldPlayAudio = shouldPlayAudio => {
    this.setState({ shouldPlayAudio })
    saveBooleanOption('shouldPlayAudio', shouldPlayAudio)
  }

  setEnabledDeclensions = enabledDeclensions => {
    this.setState({ enabledDeclensions })
    localStorage.setItem('enabledDeclensions', JSON.stringify(enabledDeclensions))
  }

  chooseRandomPracticeQuestion = questionType => {
    const enabledDeclensions = this.state.enabledDeclensions.length > 0 ? this.state.enabledDeclensions : ['1st']
    const filteredQuestions = this.state.practiceQuestions.filter(question => question.type === questionType && enabledDeclensions.includes(question.group))

    if (filteredQuestions.length === 0) {
      return
    }

    const randomQuestionIndex = this.state.practiceQuestions.findIndex(question => question === filteredQuestions[0])
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
    const { msgAlerts, user, practiceQuestions, useMacrons,
      practiceMode, practiceType, typeOneHideOthers, shouldPlayAudio, enabledDeclensions } = this.state

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
            <PracticeOptions
              msgAlert={this.msgAlert}
              useMacrons={useMacrons}
              setUseMacrons={this.setUseMacrons}
              setPracticeMode={this.setPracticeMode}
              practiceMode={practiceMode}
              setPracticeType={this.setPracticeType}
              practiceType={practiceType}
              typeOneHideOthers={typeOneHideOthers}
              setTypeOneHideOthers={this.setTypeOneHideOthers}
              shouldPlayAudio={shouldPlayAudio}
              setShouldPlayAudio={this.setShouldPlayAudio}
              enabledDeclensions={enabledDeclensions}
              setEnabledDeclensions={this.setEnabledDeclensions}
            />
          )} />
          <Route exact path='/practice' render={() => (
            <Practice
              msgAlert={this.msgAlert}
              practiceQuestions={practiceQuestions}
              chooseRandomPracticeQuestion={this.chooseRandomPracticeQuestion}
              useMacrons={useMacrons}
              practiceMode={practiceMode}
              typeOneHideOthers={typeOneHideOthers}
              practiceType={practiceType}
              shouldPlayAudio={shouldPlayAudio}
            />
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
