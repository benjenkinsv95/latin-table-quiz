import React, { Fragment, useState } from 'react'

import Nav from 'react-bootstrap/Nav'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

const AblativeDefinition = () => {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <Fragment>
      <Nav.Link className='text-center  pt-0' eventKey="link-ablative" onClick={handleShow}>
        ablative<br className='d-none d-sm-block' /> <small>(prepositions)</small>
      </Nav.Link>

      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>The Ablative Case</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card>
            <Card.Body className="blockquote w100">
              <p>
              In Latin, the <i><strong>ablative</strong></i> tends to do the work that we do in English with common <i><strong>prepositions</strong></i> (<i>of, on, with, by, for, etc</i>).
              </p>

              <p>
              Each of these little words signals some sort of relation between the noun and something else. For instance, you can say
              </p>
              <p className='w100 text-center'>
                <strong>The teacher puts the book on the table.</strong>
              </p>
              <p>
                Here, the relation signalled by the preposition on is spatial: when the action is complete, one object (a book) is on top of another object (a table) as a result.
              </p>
              <p>
                This is exactly what happens with the ablative in Latin. {'Here\'s the same sentence in Latin with "table"'} (mensa) in the ablative:
              </p>
              <p className='w100 text-center'>
                <strong>Magister librum in mensa ponit.</strong>
              </p>

              <p>
              The key is this: when you see an ablative in a Latin sentence, ask yourself what relation it is trying to signal
              between the noun in the ablative case and everything else in the sentence.
              Then you will figure out its meaning {'"intuitively."'}
              </p>
              <footer className="blockquote-footer">
                William C. Downling in
                <a href='http://www.wcdrutgers.net/Latin.htm' target='_blank' rel="noopener noreferrer">
                  <cite title="Latin by the Dowling Method"> Latin by the Dowling Method (Fifth Concept)
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

export default AblativeDefinition
