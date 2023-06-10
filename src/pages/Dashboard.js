import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import AddCompany from "../components/AddCompany";
import Spinner from "../components/Spinner";
import {
  getCompanies,
  deleteCompany,
  reset
} from "../features/companies/companySlice";

import Table from "react-bootstrap/Table";
import CompanyItem from "../components/CompanyItem";

function Dashboard() {
  const dispatch = useDispatch();

  const { companies, isLoading, isError, message } = useSelector(
    (state) => state.companies
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    dispatch(getCompanies());

    return () => {
      dispatch(reset());
    };
  }, [isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      {" "}
      <h1>Dashboard</h1>
      <AddCompany />
      {/*-------start company show-------*/}
      <section className="col">
        <Table striped bordered hover>
          <thead>
            <tr style={{ backgroundColor: "orange" }}>
              <th>Company</th>
              <th>Website</th>
            </tr>
          </thead>
          <tbody>
            <CompanyItem
              companies={companies}
              deleteCompany={deleteCompany}
              dispatch={dispatch}
            />
          </tbody>
        </Table>
      </section>
      {/*-------end company show-------*/}
    </div>
  );
}

export default Dashboard;
