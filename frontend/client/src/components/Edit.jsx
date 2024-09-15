import MaxWidthWrapper from "./MaxWidthWrapper";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudUploadAlt, faFile } from "@fortawesome/free-solid-svg-icons";

function Edit() {
  const [file, setFile] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  console.log(success);

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      if (file.name.endsWith(".jtl")) {
        setFile(file);
        setError(null);
      } else {
        setFile(null);
        setError("Unsupported file type. Only .jtl files are allowed.");
      }
    } else {
      setFile(null);
      setError("No file selected");
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(null);
    setError(null);
    setLoading(true);
    if (!file) {
      setError("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const data = response.data;
      if (response.status === 200) {
        setLoading(false);
        setSuccess(data.message);
        setError(null);
      } else {
        throw new Error("File upload failed");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDownload = () => {
    // URL ของ endpoint สำหรับดาวน์โหลด
    const downloadUrl = "http://127.0.0.1:5000/api/download";
    // เปิด URL สำหรับดาวน์โหลดในแท็บใหม่
    window.open(downloadUrl, "_blank");
  };

  return (
    <div className="w-full h-screen bg-[radial-gradient(circle_at_center,_#150c24_10%,_#0d0718_40%,_#000000_90%)] text-white">
      <MaxWidthWrapper>
        <div className="flex flex-col justify-center items-center h-4/5">
          <h1 className="text-7xl font-bold">Report Performance Test</h1>
          <p className="text-[#7c7c7c] w-[800px] text-center my-10">
            The performance test report using JMeter is a document that
            summarizes the results of system testing to evaluate its capability
            to handle load, system response time, and stability. It includes key
            information such as response times, success rates, and graphical
            representations of the data.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <div
              {...getRootProps()}
              className={`border border-dashed p-10 w-[500px] h-[200px] ${
                isDragActive ? "border-purple-700" : "border-purple-500"
              }`}
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <p className="h-full w-full flex items-center justify-center font-semibold text-xl">
                  Drop the files here ...
                </p>
              ) : file ? (
                <div className="flex flex-col items-center justify-center h-full">
                  <FontAwesomeIcon
                    icon={faFile}
                    style={{ color: "#ffffff", fontSize: "5rem" }}
                  />
                  <p className="w-full h-20 overflow-hidden mt-4 text-center">
                    {file.name}
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full">
                  <FontAwesomeIcon
                    icon={faCloudUploadAlt}
                    style={{ color: "#ffffff", fontSize: "5rem" }}
                  />
                  <p className="mt-4 text-center">
                    Drag and Drop some files here <br />
                    (or click to select files)
                  </p>
                </div>
              )}
            </div>
            <button
              type="submit"
              className="rotate-180 btn_hover2 mt-4 py-4 px-4 w-full"
            >
              <h1 className="rotate-180">Convert</h1>
            </button>

            {success && (
              <button
                onClick={handleDownload}
                className="mt-4 py-4 px-4 btn_hover2 text-white w-full"
              >
                Download
              </button>
            )}
          </form>

          {error && (
            <div className="mt-4 text-red-500">
              <h1>{error}</h1>
            </div>
          )}

          {success && (
            <div className="mt-4 text-green-500">
              <h1>{success}</h1>
            </div>
          )}
          {loading && (
            <div className="mt-4 text-white">
              <h1>Loading....</h1>
            </div>
          )}

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
            <h1 className="font-extrabold text-3xl">UI FLOW</h1>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}

export default Edit;
