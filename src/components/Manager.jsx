import React, { useEffect } from "react";
import { useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const ref = useRef();
  const passwordref = useRef();
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  useEffect(() => {
    let storedPasswords = localStorage.getItem("password");
    if (storedPasswords) {
      setPasswordArray(JSON.parse(storedPasswords));
    }
  }, []);

  const showPassword = () => {
    if (ref.current.src.includes("icon/heye.png")) {
      ref.current.src = "./public/icon/eye.png";
      passwordref.current.type = "password";
    } else {
      ref.current.src = "./public/icon/heye.png";
      passwordref.current.type = "text";
    }
  };

  const savePassword = () => {
    const updatedPasswords = [...passwordArray, { ...form, id: uuidv4() }];
    setPasswordArray(updatedPasswords);
    localStorage.setItem("password", JSON.stringify(updatedPasswords));
    setForm({ site: "", username: "", password: "" });
    toast("Password Saved!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    toast("Copied to clipboard!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const deletePassword = (id) => {
    const updatedPasswords = passwordArray.filter((item) => item.id !== id);
    setPasswordArray(updatedPasswords);
    localStorage.setItem("password", JSON.stringify(updatedPasswords));
    toast("Password Deleted!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const editPassword = (id) => {
    const passwordToEdit = passwordArray.find((i) => i.id === id);
    setForm(passwordToEdit);
    deletePassword(id);
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div>
      </div>
      <div className="mycontainer">
        <h1 className="text-4xl font-bold text-center">
          <span className="text-green-500">&lt;</span>
          Pass
          <span className="text-green-500">OP/&gt;</span>
        </h1>
        <p className="text-green-700 text-lg text-center">
          Your own Password Manager
        </p>
        <div className="flex flex-col p-4 gap-3 items-center">
          <input
            value={form.site}
            onChange={handleChange}
            placeholder="Enter Website URL"
            className="rounded-full border border-green-500 w-full pl-4"
            type="text"
            name="site"
          />
          <div className="flex w-full gap-8">
            <input
              value={form.username}
              onChange={handleChange}
              placeholder="Enter Username"
              className="rounded-full border border-green-500 w-full pl-4"
              type="text"
              name="username"
            />

            <div className="relative">
              <input
                ref={passwordref}
                value={form.password}
                onChange={handleChange}
                placeholder="Enter Password"
                className="rounded-full border border-green-500 w-full pl-4"
                type="password"
                name="password"
              />
              <span
                className="absolute right-[3px] cursor-pointer"
                onClick={showPassword}
              >
                <img
                  ref={ref}
                  className="p-1"
                  width={26}
                  src="./public/icon/eye.png"
                  alt=""
                />
              </span>
            </div>
          </div>
          <button
            onClick={savePassword}
            className="flex my-7 justify-center items-center bg-green-500 rounded-full w-fit hover:bg-green-400 px-8 py-1 font-semibold gap-1"
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
              style={{ width: "20px", height: "20px" }}
            ></lord-icon>
            Save
          </button>
        </div>
        <div className="passwords">
          <h2 className="text-2xl font-bold py-4">Your Passwords</h2>
          {passwordArray.length === 0 && <div>No Passwords</div>}
          {passwordArray.length !== 0 && (
            <table className="table-auto w-full overflow-hidden rounded-md">
              <thead className="bg-green-800 text-white">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Action</th>
                </tr>
              </thead>
              <tbody className="bg-green-100">
                {passwordArray.map((item) => (
                  <tr key={item.id}>
                    <td className="border border-white py-2 text-center ">
                      <div className="flex justify-center items-center">
                        <a href={item.site} target="_blank">
                          <span>{item.site}</span>
                        </a>
                        <div
                          className="lordiconcopy size-7 cursor-pointer"
                          onClick={() => {
                            copyText(item.site);
                          }}
                        >
                          <lord-icon
                            style={{
                              width: "25px",
                              height: "25px",
                              paddingTop: "3px",
                              paddingLeft: "3px",
                            }}
                            src="https://cdn.lordicon.com/iykgtsbt.json"
                            trigger="hover"
                          ></lord-icon>
                        </div>
                      </div>
                    </td>
                    <td className="border border-white py-2 text-center">
                      <div className="flex justify-center items-center">
                        <span>{item.username} </span>
                        <div
                          className="lordiconcopy size-7 cursor-pointer"
                          onClick={() => {
                            copyText(item.username);
                          }}
                        >
                          <lord-icon
                            style={{
                              width: "25px",
                              height: "25px",
                              paddingTop: "3px",
                              paddingLeft: "3px",
                            }}
                            src="https://cdn.lordicon.com/iykgtsbt.json"
                            trigger="hover"
                          ></lord-icon>
                        </div>
                      </div>
                    </td>
                    <td className="border border-white py-2 text-center">
                      <div className="flex justify-center items-center">
                        <span>{item.password}</span>
                        <div
                          className="lordiconcopy size-7 cursor-pointer"
                          onClick={() => {
                            copyText(item.password);
                          }}
                        >
                          <lord-icon
                            style={{
                              width: "25px",
                              height: "25px",
                              paddingTop: "3px",
                              paddingLeft: "3px",
                            }}
                            src="https://cdn.lordicon.com/iykgtsbt.json"
                            trigger="hover"
                          ></lord-icon>
                        </div>
                      </div>
                    </td>
                    <td className="border border-white py-2 text-center">
                      <span
                        className="cursor-pointer mx-1"
                        onClick={() => {
                          editPassword(item.id);
                        }}
                      >
                        <lord-icon
                          src="https://cdn.lordicon.com/gwlusjdu.json"
                          trigger="hover"
                          style={{ width: "25px", height: "25px" }}
                        ></lord-icon>
                      </span>
                      <span
                        className="cursor-pointer mx-1"
                        onClick={() => {
                          deletePassword(item.id);
                        }}
                      >
                        <lord-icon
                          src="https://cdn.lordicon.com/skkahier.json"
                          trigger="hover"
                          style={{ width: "25px", height: "25px" }}
                        ></lord-icon>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
