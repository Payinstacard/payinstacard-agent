export const customStyles = {
  table: {
    style: {
      backgroundColor: "transparent",
    },
  },
  subHeader: {
    style: {
      backgroundColor: "transparent",
      minHeight: "auto",
    },
  },
  headRow: {
    style: {
      backgroundColor: "#F9FCFF",
      minHeight: "52px",
      borderRadius: "8px",
      borderWidth: "1px",
      borderColor: "#E1E2E9",
      borderStyle: "solid",
    },
    denseStyle: {
      minHeight: "32px",
    },
  },
  rows: {
    style: {
      fontSize: "16px",

      fontWeight: 400,
      marginTop: "10px",
      borderRadius: "8px",
      borderBottomColor: "#E1E2E9",
      borderBottomWidth: "1px",
      borderBottomStyle: "solid",
      backgroundColor: "#FFFFFF",
      "&:not(:last-of-type)": {
        borderBottomStyle: "solid",
        borderBottomWidth: "1px",
        borderBottomColor: "#E1E2E9",
      },
    },
  },
  headCells: {
    style: {
      fontSize: "16px",
      fontWeight: "bold",
      overflow: "auto",
      padding: "10px 5px",
      whiteSpace: "unset",
    },
  },
  cells: {
    style: {
      padding: "10px 5px",
      margin: "auto",
    },
  },
};

export const dummyCustomerData = [
  {
    Customer_data: {
      Customer_id: "Manikanta Putta",
      Email: "manikanta@gmail.com",
      Beneficiaries: 1,
    },
    mobile: "9876543210",
    created_At: "2023-07-31T11:51:49.892Z",
    transactions: [
      { OrderPaymentStatus: "200" },
      { OrderPaymentStatus: "201" },
      // Add more transaction objects as needed
    ],
  },
  {
    Customer_data: {
      Customer_id: "Cust2",
      Email: "customer2@example.com",
      Beneficiaries: 2,
    },
    mobile: "9876543210",
    created_At: "2023-08-01T14:22:33.456Z",
    transactions: [
      { OrderPaymentStatus: "200" },
      // Add more transaction objects as needed
    ],
  },
  // Add more objects for testing
];
