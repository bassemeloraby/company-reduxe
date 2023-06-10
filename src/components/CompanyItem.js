import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

function CompanyItem({ deleteCompany, companies, dispatch }) {
  const navigate = useNavigate();

  const editHandler = (_id) => {
    console.log(_id);
    navigate(`/companyCard/${_id}`);
  };
  return (
    <>
      {companies.map((company) => (
        <tr key={company._id}>
          <td>{company.companyName}</td>
          <td>
            <a
              href={company.website}
              rel="noreferrer"
              target="_blank"
              style={{ textDecoration: "underline" }}
            >
              {company.companyName}
            </a>
          </td>
          <td>
            <Button
              variant="danger"
              onClick={() => dispatch(deleteCompany(company._id))}
            >
              Delete
            </Button>
            <Button
              variant="warning"
              className="ms-2"
              onClick={() => editHandler(company._id)}
            >
              Edit
            </Button>{" "}
          </td>
        </tr>
      ))}
    </>
  );
}
export default CompanyItem;
