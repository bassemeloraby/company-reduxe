import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import {
  getCompanies,
  reset,
  updateCompany
} from "../features/companies/companySlice";
import Spinner from "./Spinner";

function CompanyCard() {
  const [companyName, setCompanyName] = useState("");
  const { companies, isLoading, isError, message } = useSelector(
    (state) => state.companies
  );

  const { id } = useParams();

  const dispatch = useDispatch();
  const nvigate = useNavigate();

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    dispatch(getCompanies());

    return () => {
      dispatch(reset());
    };
  }, [isError, message, dispatch]);

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(updateCompany({ id: id, companyName }));
    setCompanyName("");
    nvigate("/");
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <h3>Company update form</h3>
      {companies
        .filter((company) => company._id === id)
        .map((company) => (
          <div key={company._id}>
            <Form onSubmit={onSubmit}>
              <Form.Label>Company</Form.Label>
              <InputGroup className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="company name"
                  aria-label="company name"
                  aria-describedby="basic-addon1"
                  defaultValue={company.companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
              </InputGroup>
              <Button variant="primary" type="submit">
                update Company
              </Button>
            </Form>
          </div>
        ))}
    </div>
  );
}
export default CompanyCard;
