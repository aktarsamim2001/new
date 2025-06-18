import axios from "axios";
import { authHeader } from "../_helper/auth-header";

const rootUrl = `http://localhost:3000/`;

// api/signin

async function signin(payload) {
  return axios.post(rootUrl + "api/signin", payload);
}

export const service = {
  signin,
};
