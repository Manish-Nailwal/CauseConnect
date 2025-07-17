import { createContext, useContext, useEffect, useRef, useState } from "react";
import { mockFunds } from "../data/mockData";
import { backendDomain } from "../App";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "./AuthContext";

export const FundContext = createContext();

function FundProvider(props) {
  const [funds, setFunds] = useState(mockFunds);
  const notify = useRef(false);
  const { verifyUser } = useContext(AuthContext);
  const [serverStatus, setServerStatus] = useState(false); 
  const updateFunds = async () => {
    try {
      await axios.get(`${backendDomain}/campaign`).then((res) => {
        if (notify.current) {
          toast.info("Server is back online.");
          notify.current = false;
          verifyUser();
        }
        setFunds(res.data);
        setServerStatus(true);
      });
    } catch (err) {
      if (err.message === "Network Error") {
        if (!notify.current) {
          notify.current = true;
          toast.info("Server is getting ready. Please wait...");
        }
        setTimeout(() => {
          updateFunds();
        }, 20000);
      } else {
        console.warn(err);
      }
    }
  };

  useEffect(() => {
    updateFunds();
  }, []);

  const value = {
    funds,
    setFunds,
    updateFunds,
    serverStatus
  };
  return (
    <FundContext.Provider value={value}>{props.children}</FundContext.Provider>
  );
}

export default FundProvider;
