import React from "react";
import {  PDFDownloadLink } from "@react-pdf/renderer";
import Invoice from "./report/Invoice";
import { useStateValue } from "../context/StateProvider";
import { GiConfirmed } from "react-icons/gi";
import { motion } from "framer-motion";
import { actionType } from "../context/reducer";
// import invoiceData from "./data/invoice-data
import { Link } from "react-router-dom";



const Bill = () => {
  const [{ cartItems, user },dispatch] = useStateValue();
  const fileName = "Invoice.pdf";
// const handleClear = () => {
//   localStorage.removeItem("cartItems");
//   const cartInfo = fetchCart();
//   dispatch({
//     type: actionType.SET_CART_ITEMS,
//     cartItems: cartInfo,
//   });
// };
  let items = [];
  items = cartItems.map((item) => {
    const itemTemp = {};
    itemTemp["sno"] = item.id;
    itemTemp["desc"] = item.title;
    itemTemp["qty"] = item.qty;
    itemTemp["rate"] = item.price;
    return itemTemp;
  });
  const invoiceData = {
    trans_date: new Date().toLocaleString("en-IN", "Asia/Delhi"),
    items,
  };


   
  return (
    <div className="w-full h-[87vh] flex justify-center items-center flex-col">
      {/* <PDFViewer width="1000" height="600" className="app w-full" fileName={fileName}>
        <Invoice invoice={invoiceData} user={user} />
      </PDFViewer> */}
      <div className="flex  justify-center gap-3 mb-5">
        <GiConfirmed className="text-4xl text-green-700" />
        <h2 className="flex  text-green-800 text-2xl">
          Your order is confirmed!
        </h2>
      </div>
      <div className="flex-col flex items-center justify-center gap-4 w-full md:flex-row">
        <motion.div
          whileTap={{ scale: 0.8 }}
          className="w-[300px] p-2 rounded-full bg-gradient-to-tr from-blue-500 to-blue-700 text-gray-50 text-lg my-2 hover:shadow-lg transition-all duration-150 ease-out font-semibold cursor-pointer text-center"
        >
          <PDFDownloadLink
            document={<Invoice invoice={invoiceData} user={user} />}
            fileName={fileName}
          >
            {({ blob, url, loading, error }) =>
              loading ? "Loading..." : "Download Invoice"
            }
          </PDFDownloadLink>
        </motion.div>
        <Link to='/'>
          <motion.button
            whileTap={{ scale: 0.8 }}
            type="button"
            className="w-[300px] p-2 rounded-full bg-gradient-to-tr from-orange-400 to-yellow-600 text-gray-50 text-lg my-2 hover:shadow-lg transition-all duration-150 ease-out"
          >
            Continue Shopping
          </motion.button>
        </Link>
      </div>
    </div>
  );
};


export default Bill;
