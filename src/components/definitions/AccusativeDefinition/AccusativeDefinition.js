import React, { Fragment, useState } from 'react'

import Nav from 'react-bootstrap/Nav'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

const AccusativeDefinition = () => {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <Fragment>
      <Nav.Link eventKey="link-accusative" onClick={handleShow}>
        accusative
      </Nav.Link>

      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>The Accusative Case</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card>
            <Card.Body className="blockquote w100">
              <p className='w100 text-center'>
                <strong>Magister dat librum discipulo.</strong>
              </p>
              <p className='w100 text-center'>
                <strong>Magistri dant libros discipulis.</strong>
              </p>

              <ol>
                <li>In the first sentence, {'"librum"'} is in the <i>accusative singular.</i></li>
                <li>In the second sentence, {'"libros"'} is in the <i>accusative plural.</i></li>
              </ol>

              <p>
              Do you see {'what\'s'} going on here?
              </p>
              <p>
              The <i><strong>accusative</strong></i> is the Latin case that shows that a noun is the <i><strong>direct object</strong></i> of the verb.
              (The books are the {'"things being given"'} in these sentences.)
              </p>
              <p>
              The accusative singular shows that only one book is being given.
              The accusative plural shows that two or more books are being given.
              </p>
              <footer className="blockquote-footer">
                William C. Downling in
                <a href='http://www.wcdrutgers.net/Latin.htm' target='_blank' rel="noopener noreferrer">
                  <cite title="Latin by the Dowling Method"> Latin by the Dowling Method (Third Concept)
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

export default AccusativeDefinition
