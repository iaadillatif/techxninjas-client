import React, { useRef, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const ResumeBuilderPage: React.FC = () => {
  const resumeRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    education: "",
    experience: "",
    skills: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const downloadPDF = async () => {
    if (!resumeRef.current) return;
    const canvas = await html2canvas(resumeRef.current);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const width = pdf.internal.pageSize.getWidth();
    const height = (canvas.height * width) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, width, height);
    pdf.save(`${formData.name || "resume"}.pdf`);
  };

  return (
    <div className="flex flex-col md:flex-row justify-center gap-10 p-8 text-gray-900 dark:text-white">
      {/* Form Section */}
      <div className="w-full md:w-1/2 bg-white dark:bg-gray-800 shadow-xl p-6 rounded-2xl">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
          Resume Builder
        </h2>
        <div className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-xl 
                       bg-white dark:bg-gray-900 text-gray-900 dark:text-white
                       focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-xl 
                       bg-white dark:bg-gray-900 text-gray-900 dark:text-white
                       focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-xl 
                       bg-white dark:bg-gray-900 text-gray-900 dark:text-white
                       focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <textarea
            name="education"
            placeholder="Education"
            value={formData.education}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-xl 
                       h-24 bg-white dark:bg-gray-900 text-gray-900 dark:text-white
                       focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <textarea
            name="experience"
            placeholder="Experience"
            value={formData.experience}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-xl 
                       h-24 bg-white dark:bg-gray-900 text-gray-900 dark:text-white
                       focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <textarea
            name="skills"
            placeholder="Skills"
            value={formData.skills}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-xl 
                       h-20 bg-white dark:bg-gray-900 text-gray-900 dark:text-white
                       focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <button
          onClick={downloadPDF}
          className="mt-6 w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition"
        >
          Download PDF
        </button>
      </div>

      {/* Resume Preview */}
      <div
        ref={resumeRef}
        className="w-full md:w-1/2 bg-gray-50 dark:bg-gray-800 p-6 shadow-lg rounded-2xl text-gray-900 dark:text-white"
      >
        <h1 className="text-3xl font-bold mb-2">
          {formData.name || "Your Name"}
        </h1>
        <p>{formData.email || "you@example.com"}</p>
        <p className="mb-4">{formData.phone || "+91 9876543210"}</p>

        <h2 className="text-xl font-semibold mt-4 mb-1">Education</h2>
        <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
          {formData.education || "Your education details..."}
        </p>

        <h2 className="text-xl font-semibold mt-4 mb-1">Experience</h2>
        <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
          {formData.experience || "Your experience details..."}
        </p>

        <h2 className="text-xl font-semibold mt-4 mb-1">Skills</h2>
        <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
          {formData.skills || "List your skills..."}
        </p>
      </div>
    </div>
  );
};

export default ResumeBuilderPage;
