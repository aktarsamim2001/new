import { toast } from "react-toastify";

export const errorHandler = (res) => {
  if (res.status === 502) {
    toast.error("Bad Gateway: The server is down or being upgraded.");
    window.location.href = "/server_crashed";
  }
};

export const successHandler = (msg) => {
  toast.success(msg);
};
