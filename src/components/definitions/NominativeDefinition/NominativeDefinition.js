import React, { Fragment, useState } from 'react'

import Nav from 'react-bootstrap/Nav'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

const NominativeDefinition = () => {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <Fragment>
      <Nav.Link eventKey="link-nominative" onClick={handleShow}>
        nominative
      </Nav.Link>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>The Nominative Case</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card>
            <Card.Body className="blockquote w100">
              <p>
                A noun occurs in the nominative case when it is the subject of the verb.
                In the sentence
              </p>

              <p className='w100 text-center'>
                <strong>Magister dat librum discipulo.</strong>
              </p>

              <p>
                it is the nominative form of <i>magister</i> that tells you that the <i>magister</i> (teacher) is doing the giving here.
              </p>
              <footer className="blockquote-footer">
                William C. Downling in
                <a href='http://www.wcdrutgers.net/Latin.htm' target='_blank' rel="noopener noreferrer">
                  <cite title="Latin by the Dowling Method"> Latin by the Dowling Method (Second Concept)
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

export default NominativeDefinition
