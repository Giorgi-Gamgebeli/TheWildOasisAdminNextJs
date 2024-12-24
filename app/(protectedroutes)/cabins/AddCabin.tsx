"use client";

import Button from "../../_components/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../_components/Modal";

function AddCabin() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="cabin-form">
          <Button ariaLabel="Add cabin">Add new cabin</Button>
        </Modal.Open>
        <Modal.Window name="cabin-form">
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

// function AddCabin() {
//   const [isOpenModal, setIsOpenModal] = useState(false);

//   return (
//     <div>
//       <Button onClick={() => setIsOpenModal((show) => !show)}>
//         Add new cabins
//       </Button>
//       {isOpenModal && (
//         <Modal onClose={() => setIsOpenModal(false)}>
//           <CreateCabinForm onCloseModal={() => setIsOpenModal(false)} />
//         </Modal>
//       )}
//     </div>
//   );
// }

export default AddCabin;
