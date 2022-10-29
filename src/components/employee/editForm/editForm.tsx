import { FC, useEffect, useState } from "react";
import Modal from "react-pure-modal";
import * as R from "ramda";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  closeEditEmployeesModal,
  getEditEmployeeModal,
} from "../../../reducers/uiSlice";
import {
  editEmployeeData,
  Employee,
  getEditableEmployeeId,
  getEmployees,
} from "../../../reducers/employeeSlice";

const EditEmployeeForm: FC = () => {
  const dispatch = useAppDispatch();
  const [employeeData, setEmployeeData] = useState<Employee>();

  const employeeModal = useAppSelector(getEditEmployeeModal);
  const employees = useAppSelector(getEmployees);
  const currentEmployeeId = useAppSelector(getEditableEmployeeId);

  const closeModal = () => dispatch(closeEditEmployeesModal());

  const submit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const formData = e.currentTarget;

    if (employeeData) {
      dispatch(
        editEmployeeData({
          ...employeeData,
          firstName: formData.firstName.value,
          lastName: formData.lastName.value,
          position: formData.position.value,
        })
      );
    }

    closeModal();
  };

  useEffect(() => {
    setEmployeeData(R.find(R.propEq("id", currentEmployeeId), employees));
  }, [currentEmployeeId]);

  if (!currentEmployeeId || !employeeData) return null;

  return (
    <Modal isOpen={employeeModal} scrollable={false} onClose={closeModal}>
      <form onSubmit={submit}>
        <div>
          <label>Last Name</label>
          <input
            type="text"
            defaultValue={employeeData.lastName}
            name="lastName"
          />
        </div>

        <div>
          <label>First Name</label>
          <input
            type="text"
            defaultValue={employeeData.firstName}
            name="firstName"
          />
        </div>

        <div>
          <label>Position</label>
          <input
            type="text"
            defaultValue={employeeData.position}
            name="position"
          />
        </div>

        <button type="submit">Edit Employee</button>
      </form>
    </Modal>
  );
};

export default EditEmployeeForm;
