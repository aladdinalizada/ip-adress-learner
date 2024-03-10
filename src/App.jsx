import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [ip, setIp] = useState("");
  const [data, setData] = useState({});
  const getIP = async () => {
    const response = await fetch("https://api.ipify.org?format=json");
    const data = await response.json();
    setIp(data.ip);
  };
  const handleAboutIp = () => {
    fetch(`https://ipapi.co/${ip}/json/`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });
  };
  useEffect(() => {
    getIP();
  }, [ip]);

  return (
    <>
      <div className="w-full h-screen flex justify-center items-center">
        <div className="bg-white p-12 rounded-lg shadow-2xl flex flex-col gap-4">
          <h1 className="text-2xl font-bold text-center bg-white">
            Your IP Address
          </h1>
          <p className="text-center text-3xl font-bold bg-white">{ip}</p>

          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleAboutIp}
          >
            Get Other Inormation About Your IP
          </button>
          <div className="flex flex-col bg-white">
            {Object.keys(data).map((key) => (
              <div key={key} className="flex justify-between bg-white">
                <p className="bg-white">{key}</p>
                <p className="bg-white">{data[key]}</p>
              </div>
            ))}
          </div>

          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setData({})}
          >
            Clear
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
