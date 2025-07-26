import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";

const MCFform = () => {

  const [name, setName] = useState();
  const [title, setTitle] = useState();
  const [phone, setPhone] = useState();
  const [category, setCategory] = useState();
  const [address, setAddress] = useState();
  const [problem, setProblem] = useState();
  const [image, setImage] = useState(null);
  const [email, setEmail] = useState("");
  const [url, setUrl] = useState("");
  const navigate = useNavigate();
  let id;
  const { type } = useParams();

  useEffect(() => {
    if (type === "MCF") {
      setEmail("https://mail.google.com/mail/?view=cm&fs=1&to=cmc-faridabad@ulbharyana.gov.in");
      setUrl("https://ulbharyana.gov.in/Faridabad/407");
      setCategory("MCF");
    } else if (type === "health") {
      setEmail("https://mail.google.com/mail/?view=cm&fs=1&to=dhs.dghs@hry.nic.in");
      setUrl("https://pgportal.gov.in/");
      setCategory("Health");
    }
    else if (type === "police") {
      setEmail("https://mail.google.com/mail/?view=cm&fs=1&to=cp.fbd@hry.nic.in");
      setUrl("https://www.haryanapolice.gov.in/");
      setCategory("Police");
    }
    else if (type === "cyber") {
      setEmail("https://mail.google.com/mail/?view=cm&fs=1&to=cp.fbd@hry.nic.in");
      setUrl("https://www.haryanapolice.gov.in/");
      setCategory("Cyber");
    }
    else if (type == "electricity") {
      setEmail("https://mail.google.com/mail/?view=cm&fs=1&to=1912@dhbvn.org.in");
      setCategory("Electricity");
    }
    else {
      setEmail("https://mail.google.com/mail/?view=cm&fs=1&to=cmc-faridabad@ulbharyana.gov.in");
      setUrl("https://ulbharyana.gov.in/Faridabad/407");
      setCategory("Environment and Sanitation");
    }
  }, [type]);

  const registerComplaint = async (e) => {
    e.preventDefault();
    console.log(name, phone, category, address, problem);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("title", title);
    formData.append("phone", phone);
    formData.append("category", category);
    formData.append("address", address);
    formData.append("problemDesc", problem);
    formData.append("status", "pending");
    formData.append("user_id", localStorage.getItem("id"));
    formData.append("image", image);
    let result = await fetch('https://sahaay2.onrender.com/complaint', {
      method: "POST",
      //body: JSON.stringify({ name, title, phone, category, address, problemDesc: problem, status: "pending", user_id: localStorage.getItem("id"), image }),
      body: formData,
    });

    result = await result.json();

    if (result.name != null) {
      alert("Complaint Registered Successfully!");
      navigate("/menu");
    }
    console.log(result);
  }

  return (
    <div className="min-h-screen w-full bg-gray-100 flex justify-center items-center p-6 mt-20">
      <div className="flex flex-col md:flex-row w-full max-w-6xl bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Form Section (70%) */}
        <div className="w-full md:w-2/3 p-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Submit a Complaint</h2>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Enter your name..."
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
            <input
              type="text"
              placeholder="Enter title..."
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
            <input
              type="tel"
              placeholder="Enter your phone number..."
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />

            <input
              type="text"
              value={category}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />


            <textarea
              placeholder="Enter your address..."
              rows="3"
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring focus:ring-blue-200"
            ></textarea>
            <textarea
              placeholder="Explain your problem..."
              rows="4"
              onChange={e => setProblem(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring focus:ring-blue-200"
            ></textarea>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
            <button
              type="submit"
              onClick={(e) => registerComplaint(e)}
              className="w-full py-2 rounded-md hover:bg-blue-700 transition button3 text-white"
            >
              Submit
            </button>
          </form>
        </div>

        {/* Links Section (30%) */}
        <div className="w-full md:w-1/3 bg-gray-50 border-l border-gray-200 p-8 flex flex-col justify-center">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Quick Access</h3>
          <ul className="space-y-4">
            <li>
              <Link to={url}
                className="text-base text-blue-700 hover:underline transition"
              >
                ➤ Register on Government Official Site
              </Link>
            </li>
            <li>
              <a
                href={email}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base text-blue-700 hover:underline transition"
              >
                ➤ Mail to the Working Authority
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MCFform;
