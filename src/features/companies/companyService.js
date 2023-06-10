import axios from "axios";

const API_URL = "https://sore-lime-goat-tam.cyclic.app/api/companies";

// Create new goal
const createCompany = async (companyData) => {
  const response = await axios.post(API_URL, companyData);

  return response.data;
};

// get all companies
const getCompanies = async () => {
  const response = await axios.get(API_URL);

  return response.data;
};

//Delete Company
const deleteCompany = async (companyId) => {
  const response = await axios.delete(API_URL + "/" + companyId);

  return response.data;
};

const updateCompany = async ({ id, companyName }) => {
  const response = await axios.patch(API_URL + "/" + id, { companyName });
  return response.data;
};

const goalService = {
  createCompany,
  getCompanies,
  deleteCompany,
  updateCompany
};

export default goalService;
