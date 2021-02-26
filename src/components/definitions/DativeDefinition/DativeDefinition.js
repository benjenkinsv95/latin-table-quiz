import React, { Fragment, useState } from 'react'

import Nav from 'react-bootstrap/Nav'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

const DativeDefinition = () => {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <Fragment>
      <Nav.Link eventKey="link-dative" onClick={handleShow}>
        dative
      </Nav.Link>

      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>The Dative Case</Modal.Title>
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
                <li>In the first sentence, {'"discipulo"'} is in the <i>dative singular.</i></li>
                <li>In the second sentence, {'"discipulis"'} is in the <i>dative plural.</i></li>
              </ol>

              <p>
              Do you see {'what\'s'} going on here?
              </p>
              <p>
              The <i><strong>dative</strong></i> is the Latin case that shows that a noun is the <i><strong>indirect object</strong></i> of the verb.
              (The students are the ones {'"to whom the books are being given"'} in both sentences.)
              </p>
              <p>
              The dative singular shows that only one student is getting or receiving the book.
              The dative plural shows that two or more students are getting the books.
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

export default DativeDefinition
