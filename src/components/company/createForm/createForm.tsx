import { FC } from "react";
import Modal from "react-pure-modal";
import { createCompany } from "../../../reducers/companySlice";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  closeCreateCompanyModal,
  getCreateCompanyModal,
} from "../../../reducers/uiSlice";
import { getRandomNumber } from "../../../utils";

const CreateCompanyForm: FC = () => {
  const dispatch = useAppDispatch();

  const companyModal = useAppSelector(getCreateCompanyModal);

  const closeModal = () => dispatch(closeCreateCompanyModal());

  const submit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const formData = e.currentTarget;

    dispatch(
      createCompany({
        id: getRandomNumber(2100, 3000),
        employeeIds: [],
        name: formData.companyName.value,
        address: formData.companyAddress.value,
      })
    );

    closeModal();
  };

  return (
    <Modal isOpen={companyModal} scrollable={false} onClose={closeModal}>
      <form onSubmit={submit}>
        <div>
          <label>Company Name</label>
          <input type="text" name="companyName" required />
        </div>

        <div>
          <label>Company Address</label>
          <input type="text" name="companyAddress" required />
        </div>

        <button type="submit">Create</button>
      </form>
    </Modal>
  );
};

export default CreateCompanyForm;
