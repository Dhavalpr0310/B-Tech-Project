import axios from "axios";
import GLOBALS from "../components/Common/Globals";

const getProperties = () => {
  return axios.get(`${GLOBALS.BASE_URL}/residency/allresd`);
};

const getPropertiesFiltered = (lat, lng) => {
  return axios.get(`${GLOBALS.BASE_URL}/residency/${id}`);
};

const getPropertiesUSRealEstate = (id) => {
  return axios.get(`${GLOBALS.BASE_URL}/residency/${id}`);
};

const getPropertyUSRealEstate = (pid) => {
  return axios.get(`${GLOBALS.BASE_URL}/propertyUSRealEstate?pid=${pid}`);
};

const PropertiesService = {
  getProperties,
  getPropertiesFiltered,
  getPropertiesUSRealEstate,
  getPropertyUSRealEstate,
};

export default PropertiesService;
