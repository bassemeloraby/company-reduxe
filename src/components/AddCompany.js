import { useState } from "react";
import { useDispatch } from "react-redux";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { createCompany } from "../features/companies/companySlice";

function AddCompany() {
  const [companyName, setCompanyName] = useState("");
  const [website, setWebsite] = useState("");

  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(createCompany({ companyName, website }));
    setCompanyName("");
  };

  return (
    <div>
      <h3>CompanyForm</h3>
      <Form onSubmit={onSubmit}>
        <Form.Label>Company</Form.Label>
        <InputGroup className="mb-3">
          <Form.Control
            type="text"
            placeholder="company name"
            aria-label="company name"
            aria-describedby="basic-addon1"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <Form.Control
            type="text"
            name="website"
            placeholder="Enter website link"
            value={website}
            autoComplete="off"
            onChange={(e) => setWebsite(e.target.value)}
          />
        </InputGroup>
        <Button variant="primary" type="submit">
          Add Company
        </Button>
      </Form>
    </div>
  );
}

export default AddCompany;
