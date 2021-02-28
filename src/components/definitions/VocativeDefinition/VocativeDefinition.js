import React, { Fragment, useState } from 'react'

import Nav from 'react-bootstrap/Nav'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

const VocativeDefinition = () => {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <Fragment>
      <Nav.Link className='text-center  pt-0' eventKey="link-vocative" onClick={handleShow}>
        vocative<br className='d-none d-sm-block' /> <small>(being&nbsp;addressed)</small>
      </Nav.Link>

      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>The Vocative Case</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card>
            <Card.Body className="blockquote w100">
              <p>
              In Latin, the <i><strong>vocative</strong></i> case is the grammatical case which is used for a noun that identifies a person (animal, object, etc.) being addressed
              </p>

              <p>
              For example, in the sentence {'"I don\'t know, John,"'} John is a vocative expression that indicates the party being addressed,
              as opposed to the sentence {'"I don\'t know John" in which "John" is the direct object of the verb "know"'}.
              </p>

              <p>1) In Latin, the form of the vocative case of a noun is often the same as the nominative.</p>
              <p className='w100 text-center'>
                <strong>Salve, Livia!</strong>
              </p>

              <p>2) Nouns that end in -ius end with -ī. Thus, Julius becomes Julī and filius becomes filī.</p>
              <p className='w100 text-center'>
                <strong>Salve, Julī!</strong>
              </p>

              <p>3) Other second declension singular nouns that end in -us end with -e. Thus, Brutus becomes Brute and Amīcus becomes Amīce.</p>
              <p className='w100 text-center'>
                <strong>Et tu, Brute?</strong>
              </p>

              <footer className="blockquote-footer">
                Wikipedia Contributors in the
                <a href='https://en.wikipedia.org/wiki/Vocative_case' target='_blank' rel="noopener noreferrer">
                  <cite title="Vocative Case"> Vocative Case
                  </cite>
                </a>
              </footer>
            </Card.Body>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  )
}

export default VocativeDefinition
