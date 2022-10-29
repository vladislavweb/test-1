import { FC } from "react";
import Modal from "react-pure-modal";
import { v4 } from "uuid";
import { getCompanies } from "../../../reducers/companySlice";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  closeCreateEmployeeModal,
  getCreateEmployeeModal,
} from "../../../reducers/uiSlice";
import { createEmployee } from "../../../reducers/employeeSlice";

const CreateEmployeeForm: FC = () => {
  const dispatch = useAppDispatch();

  const companies = useAppSelector(getCompanies);
  const companyModal = useAppSelector(getCreateEmployeeModal);

  const closeModal = () => dispatch(closeCreateEmployeeModal());

  const submit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const formData = e.currentTarget;

    dispatch(
      createEmployee({
        id: v4(),
        companyId: Number(formData.companyId.value),
        firstName: formData.firstName.value,
        lastName: formData.lastName.value,
        position: formData.position.value,
      })
    );

    closeModal();
  };

  return (
    <Modal isOpen={companyModal} scrollable={false} onClose={closeModal}>
      <form onSubmit={submit}>
        <div>
          <label>Company Name</label>
          <select name="companyId">
            {companies.map((company) => (
              <option key={company.id} value={company.id}>
                {company.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>First Name</label>
          <input type="text" name="firstName" required />
        </div>

        <div>
          <label>Last Name</label>
          <input type="text" name="lastName" required />
        </div>

        <div>
          <label>Position</label>
          <input type="text" name="position" required />
        </div>

        <button type="submit">Create Employee</button>
      </form>
    </Modal>
  );
};

export default CreateEmployeeForm;
