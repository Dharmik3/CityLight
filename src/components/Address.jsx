import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FlatTree, motion } from "framer-motion";
import { categories,states } from "../utils/data";
import Loader from "./Loader";


import { saveAddress} from "../utils/FirebaseFunctions";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
const Address = () => {
    const navigate = useNavigate();
    const [{ foodItems,user,address }, dispatch] = useStateValue();

    const [name, setName] = useState("");
    const [mobile, setMobile] = useState("");
    const [pincode, setPincode] = useState("");
    const [locality, setLocality] = useState("");
    const [addresses, setAddresses] = useState("");
    const [city, setCity] = useState("");
    const [landmark, setLandmark] = useState("");
    const [alternateMobile, setAlternateMobile] = useState("");
    const [state, setState] = useState(null);

    

  const [fields, setFields] = useState(false);
  const [alertStatus, setAlertStatus] = useState("danger");
  const [msg, setMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  

  const saveDetails = () => {
    setIsLoading(true);
    try {
      if (!name || !mobile || !addresses || !pincode || !locality||!city||!state) {
        setFields(true);
        setMsg("Required fields can't be empty");
        setAlertStatus("danger");
        setTimeout(() => {
          setFields(false);
          setIsLoading(false);
        }, 4000);
      } else {
        const data = {
            id: `${Date.now()}`,
            email:user.email,
          name,
          mobile,
            pincode,
            locality,
            address,
            city,
            state,
            landmark,
          alternateMobile
        };
          console.log(data)
          saveAddress(data);
          dispatch({
              type: actionType.SET_ADDRESS,
                  address: data
          })
        setIsLoading(false);
        setFields(true);
        setMsg("Data uploaded successfully 😊");
        setAlertStatus("success");
        clearData();
        setTimeout(() => {
            setFields(false);
            navigate("/payment", { replace: true });
        }, 4000);
        
      }
    } catch (err) {
      console.log(err);
      setFields(true);
      setMsg("Error while uploading : Try again 🙇‍♂️");
      setAlertStatus("danger");
      setTimeout(() => {
        setFields(false);
        setIsLoading(false);
      }, 4000);
    }
  };

  const clearData = () => {
    setName("");
    setMobile("");
    setAddresses("");
    setPincode("");
      setLocality("");
      setState("-- select State --");
      setCity("");
      setLandmark("");
      setAlternateMobile("");
      setState("")
  };

  
  return (
    <div className="w-full min-h-[87vh] flex items-center justify-center">
      <div className="w-[90%] md:w-[75%] border border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center gap-4">
        <h2 className=" text-xl mb-6">Address</h2>
        {fields && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`w-full p-2 rounded-lg text-center text-lg font-semibold ${
              alertStatus === "danger"
                ? "bg-red-400 text-red-800"
                : "bg-emerald-400 text-emerald-800"
            }`}
          >
            {msg}
          </motion.p>
        )}

        <div className="w-full flex flex-col md:flex-row items-center gap-3 ">
          {/* name */}
          <div className="w-full p-2  flex items-center gap-2 bg-white rounded-md">
            <input
              type="text"
              required
              placeholder="Name"
              className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          {/* mobile number */}
          <div className="w-full p-2 bg-white flex items-center gap-2 rounded-md">
            <input
              type="tel"
              required
              placeholder="Mobile Number"
              pattern="[0-9]{10}"
              maxLength="10"
              className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
          </div>
        </div>
        <div className="w-full flex flex-col md:flex-row items-center gap-3 ">
          {/* pincode */}
          <div className="w-full p-2 rounded flex items-center gap-2 bg-white">
            <input
              type="text"
              required
              pattern="[0-9]{6}"
              maxlength="6"
              placeholder="Pincode"
              className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor  focus:ring-blue-500 focus:border-blue-500"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
            />
          </div>
          {/*locality */}
          <div className="w-full p-2 bg-white rounded flex items-center gap-2">
            <input
              type="text"
              required
              placeholder="Locality"
              className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
              value={locality}
              onChange={(e) => setLocality(e.target.value)}
            />
          </div>
        </div>
        <div className="w-full p-2 h-full flex items-center gap-2 bg-white">
          <input
            type="text"
            required
            value={addresses}
            onChange={(e) => {
              setAddresses(e.target.value);
            }}
            placeholder="Address"
            className="w-full h-[60px] text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor "
          />
        </div>
        <div className="w-full flex flex-col md:flex-row items-center gap-3 ">
          {/* city/town */}
          <div className="w-full p-2 rounded flex items-center gap-2 bg-white">
            <input
              type="text"
              required
              placeholder="City/Town"
              className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor  focus:ring-blue-500 focus:border-blue-500"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          {/*state */}
          {/* <div className="w-full p-2 bg-white rounded flex items-center gap-2"> */}
          <select
            onChange={(e) => {
              setState(e.target.value);
            }}
            className="outline-none w-full h-full text-lg p-2 rounded-md cursor-pointer"
          >
            <option value="other" className="bg-white">
              -- Select State --
            </option>
            {states &&
              states.map((item) => (
                <option
                  key={item}
                  className="text-base border-0 outline-none capitalize bg-white text-headingColor"
                  value={item}
                >
                  {item}
                </option>
              ))}
          </select>
          {/* </div> */}
        </div>
        <div className="w-full flex flex-col md:flex-row items-center gap-3 ">
          {/* landmark */}
          <div className="w-full p-2 rounded flex items-center gap-2 bg-white">
            <input
              type="text"
              required
              placeholder="Landmark (Optional)"
              className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor  focus:ring-blue-500 focus:border-blue-500"
              value={landmark}
              onChange={(e) => setLandmark(e.target.value)}
            />
          </div>
          {/*alternate phone */}
          <div className="w-full p-2 bg-white rounded flex items-center gap-2">
            <input
              type="tel"
              required
              placeholder="Alternate phone number (Optional)"
              pattern="[0-9]{10}"
              className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
              value={alternateMobile}
              onChange={(e) => setAlternateMobile(e.target.value)}
            />
          </div>
        </div>

        {/* save btn */}
        <div className="flex items-center w-full justify-center">
          <button
            type="button"
            className="ml-0  w-full md:w-auto border-none outline-none bg-emerald-500 px-12 py-2 rounded-lg text-lg text-white font-semibold "
            onClick={saveDetails}
          >
            Save & Proceed
          </button>
        </div>
      </div>
    </div>
  );
};

export default Address;
