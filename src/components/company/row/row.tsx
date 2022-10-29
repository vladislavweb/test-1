import React from "react";
import { useAppDispatch } from "../../../app/hooks";
import {
  Company,
  selectCompany,
  setEditableCompanyId,
} from "../../../reducers/companySlice";
import { openEditCompanyModal } from "../../../reducers/uiSlice";

interface Props extends Company {
  isSelect?: boolean;
}

const CompanyRow = React.forwardRef<HTMLTableRowElement, Props>(
  (props, ref) => {
    const { isSelect = false, id, name, employeeIds, address } = props;
    const dispatch = useAppDispatch();

    const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
      dispatch(selectCompany(id));
    };

    const selectEditableCompany = () => {
      dispatch(setEditableCompanyId(id));
      dispatch(openEditCompanyModal());
    };

    return (
      <tr
        data-selected={isSelect}
        onDoubleClick={selectEditableCompany}
        ref={ref}
      >
        <td>
          <input type="checkbox" checked={isSelect} onChange={onChange} />
        </td>

        <td>{name}</td>

        <td>{employeeIds.length}</td>

        <td>{address}</td>
      </tr>
    );
  }
);

export default CompanyRow;
