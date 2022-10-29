import React, { FC } from "react";
import { useAppDispatch } from "../../../app/hooks";
import {
  Employee,
  selectEmployee,
  setEditableEmployeeId,
} from "../../../reducers/employeeSlice";
import { openEditEmployeesModal } from "../../../reducers/uiSlice";

interface Props extends Employee {
  isSelect?: boolean;
}

const EmployeeRow = React.forwardRef<HTMLTableRowElement, Props>(
  (props, ref) => {
    const {
      isSelect,
      id,
      lastName,
      firstName,
      position,
      companyId,
      ...restProps
    } = props;
    const dispatch = useAppDispatch();

    const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
      dispatch(selectEmployee(id));
    };

    const selectEditableEmployee = () => {
      dispatch(setEditableEmployeeId(id));
      dispatch(openEditEmployeesModal());
    };

    return (
      <tr
        ref={ref}
        data-selected={isSelect}
        onDoubleClick={selectEditableEmployee}
        {...restProps}
      >
        <td>
          <input type="checkbox" checked={isSelect} onChange={onChange} />
        </td>

        <td>{lastName}</td>

        <td>{firstName}</td>

        <td>{position}</td>
      </tr>
    );
  }
);

export default EmployeeRow;
