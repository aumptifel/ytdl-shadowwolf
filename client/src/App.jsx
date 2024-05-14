import axios from "axios";
import React, { useState } from "react";
import { ArrowRightIcon } from '@heroicons/react/24/solid'

const App = () => {
  const [urlValue, setUrlValue] = useState("");
  const [data, setData] = useState(null);

  const handleDownload = async () => {
    const data = await axios.get(
      `http://localhost:4000/download?url=${urlValue}`
    );
    setData(data);
    setUrlValue("");
  };

  return (
    <div className=" bg-white flex flex-col justify-center items-center min-h-screen">
      <div className="relative flex w-full max-w-106 mx-4">
        <button
          onClick={handleDownload}
          className="!absolute right-2.5 top-2.5 z-10 select-none rounded-md w-10 h-10 bg-blue-600 flex justify-center items-center hover:bg-blue-500"
        >
          <ArrowRightIcon className="size-6 text-white" />
        </button>
        <input
          type="text"
          placeholder="Paste your video link"
          value={urlValue}
          onChange={(e) => setUrlValue(e.target.value)}
          className="peer h-15 w-full pl-3 pr-15 rounded-md bg-white ring-1 ring-slate-900/10 focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm text-slate-700 placeholder-gray-500 focus:outline-0 disabled:bg-slate-100"
        />
      </div>

      <div>
        {data !== null ? (
          <div>
            <div className="my-4">
              <iframe 
                className="bg-clip-border rounded-xl"
                width="424"
                height="230"
                src={`${data.data.url}`}
                title="video"
              />
            </div>
            <div>
              {data?.data.info.map((formatName, index) => (
                <div key={index}>
                  <a
                    href={formatName.url}
                    target="_blank"
                    download
                    className=" outline-none italic underline"
                  >
                    {formatName.mimeType.split(";")[0] + "  "}
                    {formatName.hasVideo ? formatName.height + "p" : ""}
                  </a>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default App;
