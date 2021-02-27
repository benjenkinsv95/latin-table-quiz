import React, { Fragment, useState } from 'react'

import Nav from 'react-bootstrap/Nav'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

const GenitiveDefinition = () => {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <Fragment>
      <Nav.Link className='text-center  pt-0' eventKey="link-genitive" onClick={handleShow}>
        genitive<br className='d-none d-sm-block' /> <small>(possession)</small>
      </Nav.Link>

      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>The Genitive Case</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card>
            <Card.Body className="blockquote w100">
              <p>
                The genitive case in Latin usually signals some idea of possession. Somebody or something owns or possesses something else.
                Here are a couple of simple examples in English of how the genetive works:
              </p>

              <p className='w100 text-center'>
                <strong>{'The boy\'s hat was bright red.'}</strong>
              </p>
              <p className='w100 text-center'>
                <strong>{'The roof of the house was made of tile.'}</strong>
              </p>
              <p className='w100 text-center'>
                <strong>{'The teacher\'s book is large.'}</strong>
              </p>
              <p>Now look at the last of these sentences. {'I\'m'} about to give you the same sentence in Latin. Here it is:</p>
              <p className='w100 text-center'>
                <strong>{'Liber magistri magnus est.'}</strong>
              </p>

              <p>
              As always, it is the <i>form</i> of the noun that tells you what the grammatical function is.
              In technical terms, you only have to say that {'"magistri"'} in the sentence above is in the genitive case,
              and to understand what that means all you have to understand is that the book belongs to the teacher.
              </p>
              <footer className="blockquote-footer">
                William C. Downling in
                <a href='http://www.wcdrutgers.net/Latin.htm' target='_blank' rel="noopener noreferrer">
                  <cite title="Latin by the Dowling Method"> Latin by the Dowling Method (Fourth Concept)
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

export default GenitiveDefinition
