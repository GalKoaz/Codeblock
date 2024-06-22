import { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

/*
  Modal component description:
  This component creates a modal dialog box that can be used to display content on top of the current page.
  It accepts props for open, children, and onClose.
  The open prop determines whether the modal is visible or not.
*/

export default function Modal({ open, children, onClose }) {
  const dialog = useRef();

  useEffect(() => {
    if (open) {
      dialog.current.showModal();
    } else {
      dialog.current.close();
    }
  }, [open]);

  return createPortal(
    <dialog className="modal" ref={dialog} onClose={onClose}>
      {open ? children : null}
    </dialog>,
    document.getElementById('modal')
  );
}
