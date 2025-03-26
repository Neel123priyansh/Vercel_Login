import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const Form = () => {
  const [formData, setFormData] = useState({
    program: '',
    name: '',
    phone: '',
    email: '',
    city: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePhoneChange = (value) => {
    setFormData({ ...formData, phone: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    try {
      const response = await fetch('https://vercel-login-backend.vercel.app/',data, { 
        method: "POST",
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData) 
      });
      const data = await response.json();
      console.log("Response from server:", data);
      if (response.ok) {
        alert("Form submitted successfully!");
        setFormData({ program: "", name: "", phone: "", email: "", city: "" });
      } else {
        alert("Failed to submit form. Please try again.");
      }
    } catch (error) {
      console.error("Error during form submission:", error);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col font items-center justify-center bg-gray-100 p-4">
      <p className="font-bold text-3xl mb-5">SRM-IST Delhi-NCR Campus</p>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md flex flex-col items-start">
        <label className="block mb-2 text-left w-full">
          <span className="block text-left">Program *</span>
          <select name="program" value={formData.program} onChange={handleChange} className="w-full p-2 border rounded mt-1" required>
            <option value="">Select a program</option>
            <option value="B.tech - Computer Science and Engineering">B.tech - Computer Science and Engineering</option>
            <option value="B.tech - Computer Science and Engineering - AIML">B.tech - Computer Science and Engineering w/s Artificial Intelligence and Machine Learning</option>
            <option value="B.tech - Computer Science and Engineering(Data Science)">B.tech - Computer Science and Engineering (Data Science)</option>
            <option value="B.tech - Computer Science and Engineering w/s Cyber Security">B.tech - Computer Science and Engineering w/s Cyber Security</option>
            <option value="B.tech - Computer Science and Engineering w/s Cloud Computing">B.tech - Computer Science and Engineering w/s Cloud Computing</option>
            <option value="B.Tech - Electronics and Communication Engineering">B.Tech - Electronics and Communication Engineering </option>
            <option value="B.Tech - Electronics and Communication Engineering w/s Data Science">B.Tech - Electronics and Communication Engineering w/s Data Science</option>
            <option value="B.Tech - Mechanical Engineering w/s Artificial Intelligence and Machine Learning">B.Tech - Mechanical Engineering w/s Artificial Intelligence and Machine Learning</option>
            <option value="B.Tech - Mechanical Engineering">B.Tech - Mechanical Engineering</option>
            <option value="M.Tech in Computer Science and Engineering">M.Tech in Computer Science and Engineering</option>
            <option value="M.Sc. Chemistry">M.Sc. Chemistry</option>
            <option value="Ph.D in Engineering and Technology">Ph.D in Engineering and Technology</option>

          </select>
        </label>
        <label className="block mb-2 text-left w-full">
          Name *
        <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-2 border rounded mt-1" required/>
        </label>
        <label className="block mb-2 text-left w-full">
          Phone *
          <PhoneInput country={'in'} value={formData.phone} onChange={handlePhoneChange} inputClass="w-full p-2 border border-black rounded mt-1" required/>
        </label>
        <label className="block mb-2 text-left w-full">
          Email *
          <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-2 border rounded mt-1" required/>
        </label>
        <label className="block mb-2 text-left w-full">
          City *
          <input type="text" name="city" value={formData.city} onChange={handleChange} className="w-full p-2 border rounded mt-1" required/>
        </label>

        <div className="flex justify-between mt-4 w-full">
          <button type="reset" className="bg-gray-500 text-white p-2 rounded" onClick={() => setFormData({ program: "", name: "", phone: "", email: "", city: "" })}>
            Reset
          </button>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Submit
          </button>
        </div>
      </form>
      <p className="font-bold text-xs mt-5 font-mono">Made by Orton.ai</p>
    </div>
  );
};

export default Form;
