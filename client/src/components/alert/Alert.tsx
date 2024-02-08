import Loading from "./Loading";
import Toast from "./Toast";
import { useSelector } from "react-redux";
import { RootStore } from "../../utils/TypeScript";

const Alert = () => {
  const loading = useSelector((state: RootStore) => state.alert.loading);
  const success = useSelector((state: RootStore) => state.alert.success);
  const errors = useSelector((state: RootStore) => state.alert.errors);

  return (
    <>
      {loading && <Loading />}
      {success && <Toast title="Success" body={success} bgColor="bg-success" />}
      {errors && <Toast title="Errors" body={errors} bgColor="bg-danger" />}
    </>
  );
};

export default Alert;
