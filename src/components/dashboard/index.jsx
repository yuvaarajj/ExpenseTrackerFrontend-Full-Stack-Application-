import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import "./index.css";

const Dashboard = () => {
  const [cookies, removeCookie] = useCookies(["jwt_token"]);
  const [item, setItem] = useState([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [payment, setpayment] = useState("");
  const [finalL, setfinalL] = useState([]);
  const navigate = useNavigate();

  const onLogout = () => {
    removeCookie("jwt_token", { path: "/" });
    setTimeout(() => {
      navigate("/login");
    }, 500);
  };

  const totalList = async () => {
    const totalUrl = "http://localhost:5000/allItems";
    const options = {
      method: "GET",
    };
    const response = await fetch(totalUrl, options);
    const rdata = await response.json();
    console.log(response);
    console.log(rdata);
    setfinalL(rdata);
  };

  const add = async () => {
    const newItem = { title, amount, category, date, payment };
    setItem([...item, newItem]);
    await expenseListInsert(newItem);
    totalList();
  };

  const getTitle = (event) => {
    setTitle(event.target.value);
  };

  const getAmount = (event) => {
    setAmount(event.target.value);
  };

  const getCat = (event) => {
    setCategory(event.target.value);
  };

  const getdate = (event) => {
    setDate(event.target.value);
  };

  const getPayment = (event) => {
    setpayment(event.target.value);
  };

  const expenseListInsert = async ({
    title,
    amount,
    category,
    date,
    payment,
  }) => {
    try {
      const litems = { title, amount, category, date, payment };
      const elurl = "http://localhost:5000/ExpenseList";
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(litems),
      };
      const response = await fetch(elurl, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const ldata = await response.json();
      console.log(response);
      console.log(ldata);
    } catch (e) {
      console.error("error inserting expense:", e);
    }
  };

  useEffect(() => {
    if (!cookies.jwt_token) {
      navigate("/login");
    }
  }, [cookies.jwt_token, navigate]);

  useEffect(() => {
    totalList();
  }, []);

  return (
    <div className="dashMain">
      <h1>
        <img className="logoDash" src="/expenseTrackerLOGO.jpg" alt="logo" />
        List of Expense
      </h1>

      <form action="">
        <label htmlFor="title">Title</label>
        <input type="text" name="title" id="title" onChange={getTitle} />
        <label htmlFor="amount">Amount</label>
        <input type="text" name="amount" id="amount" onChange={getAmount} />
        <label htmlFor="category">category</label>
        <select name="" id="" onChange={getCat}>
          <option value="food">Food</option>
          <option value="transport">transport</option>
          <option value="shopping">Shopping</option>
          <option value="bills">Bills</option>
          <option value="others">Others</option>
        </select>
        <label htmlFor="date">Date</label>
        <input type="date" name="date" id="date" onChange={getdate} />
        <select name="payment" id="payment" onChange={getPayment}>
          <option value="cash">cash</option>
          <option value="card">card</option>
          <option value="online">online</option>
        </select>
      </form>

      <button onClick={add}>Add</button>
      <div>
        <div key="e1.title" className="miniBox">
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Amount</th>
                  <th>Category</th>
                  <th>Date</th>
                  <th>Payment</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {finalL.map((e1, index) => (
                  <tr key={index}>
                    <td>{e1.title}</td>
                    <td>₹{e1.amount}</td>
                    <td>{e1.category}</td>
                    <td>{e1.date}</td>
                    <td>{e1.payment}</td>
                    <td>
                      <button className="delete-btn">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <button onClick={onLogout}>logout</button>
    </div>
  );
};

export default Dashboard;
