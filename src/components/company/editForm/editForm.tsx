import { FC, useEffect, useState } from "react";
import Modal from "react-pure-modal";
import * as R from "ramda";
import {
  Company,
  editCompanyData,
  getCompanies,
  getEditableCompanyId,
} from "../../../reducers/companySlice";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  closeEditCompanyModal,
  getEditCompanyModal,
} from "../../../reducers/uiSlice";

const EditCompanyForm: FC = () => {
  const dispatch = useAppDispatch();
  const [companyData, setCompanyData] = useState<Company>();

  const companyModal = useAppSelector(getEditCompanyModal);
  const companies = useAppSelector(getCompanies);
  const currentCompanyId = useAppSelector(getEditableCompanyId);

  const closeModal = () => dispatch(closeEditCompanyModal());

  const submit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const formData = e.currentTarget;

    if (companyData) {
      dispatch(
        editCompanyData({
          ...companyData,
          name: formData.companyName.value,
          address: formData.companyAddress.value,
        })
      );
    }

    closeModal();
  };

  useEffect(() => {
    setCompanyData(R.find(R.propEq("id", currentCompanyId), companies));
  }, [currentCompanyId]);

  if (!currentCompanyId || !companyData) return null;

  return (
    <Modal isOpen={companyModal} scrollable={false} onClose={closeModal}>
      <form onSubmit={submit}>
        <div>
          <label>Company Name</label>
          <input
            type="text"
            defaultValue={companyData.name}
            name="companyName"
            required
          />
        </div>

        <div>
          <label>Address</label>
          <input
            type="text"
            defaultValue={companyData.address}
            name="companyAddress"
            required
          />
        </div>

        <button type="submit">Edit Company</button>
      </form>
    </Modal>
  );
};

export default EditCompanyForm;
