import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import noData from "./../../../../assets/images/noData.png";
export default function DeleteConfirmation({deleteItem , deleteFunc , show , handleClose}) {

  
 
  return (
    
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Delete {deleteItem}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <img src={noData} alt="" />
            <h5 className="my-3">Delete This {deleteItem} ?</h5>
            <p className="text-muted">
              are you sure you want to delete this item ? if you are sure just
              click on delete it
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            className="bg-danger"
            onClick={deleteFunc}
          >
            Delete this {deleteItem}
          </Button>
        </Modal.Footer>
      </Modal>
  );
}
