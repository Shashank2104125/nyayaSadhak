import { useState } from "react";
import Logo from "./assets/logo-white.png";
import { useSidebar } from "./context/SidebarContext";
import Sidebar from "./Components/Sidebar";
import Accordion from "./Components/Accordion";
function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [source, setSource] = useState([]);
  const [inputText, setInputText] = useState("");
  const { queryType, setHide, hide } = useSidebar();
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setQuestion(inputText);
      setAnswer("Searching...");
      setSource([]);
      const req = await fetch(
        `${import.meta.env.VITE_API_URL}?query=${encodeURIComponent(
          inputText
        )}&type_law=${queryType}`
      );
      if (!req.ok) {
        throw new Error(`HTTP error! Status: ${req.status}`);
      }

      const res = await req.json();
      setAnswer(res?.result?.regional_res);
      setSource(res?.result?.source_documents);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <Sidebar>
        <div>
          <div className="flex items-center pl-4 lg:pl-2 mt-4 gap-2">
            {/* navigation button */}
            <button onClick={() => setHide(!hide)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="lg:hidden w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
            <h1 className=" font-bold text-xl lg:text-3xl">{queryType}</h1>
          </div>
          <p className="pl-4  mt-2">
            Ask any query releated to {queryType}. If you want to ask about
            specific laws select from the left.
          </p>
          {question && (
            <>
              {/* user question */}
              <div className="mt-8 mb-4 ml-4 flex gap-4 content-center">
                <img
                  src="https://api.dicebear.com/7.x/fun-emoji/svg"
                  className="w-12 h-12 rounded-lg"
                />
                <p>{question && question}</p>
              </div>
              <hr className="border-b ml-4 mr-4 border-gray-200 my-4"></hr>
              {/* llm ans */}
              <div className="mt-8 mb-4 ml-4 flex gap-4 content-center">
                <img
                  src={Logo}
                  className="w-12 h-12 rounded-lg object-contain	"
                />
                <p style={{ whiteSpace: "pre-line" }}> {answer && answer}</p>
              </div>
              <div className="mx-4">
                <Accordion title="Soucrce Document 1">
                  {source[0]?.page_content}
                  <br />
                  Page : {source[0]?.metadata?.page}
                  <br />
                  Soruce: {source[0]?.metadata?.source}
                </Accordion>
                <Accordion title="Soucrce Document 2">
                  {source[0]?.page_content}
                  <br />
                  Page : {source[0]?.metadata?.page}
                  <br />
                  Soruce: {source[0]?.metadata?.source}
                </Accordion>
              </div>
            </>
          )}
          <div></div>
          <form
            onSubmit={(e) => handleSubmit(e)}
            className="fixed bottom-2 right-4 lg:right-12 left-4 lg:left-[340px] flex items-center"
          >
            <label htmlFor="voice-search" className="sr-only">
              Query
            </label>
            <div className="relative w-full">
              <input
                type="text"
                id="voice-search"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5"
                placeholder="Ask Your Query..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                required
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <button className="mr-2">
                  <svg
                    className="w-4 h-4 text-gray-500 hover:text-gray-900"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 16 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 7v3a5.006 5.006 0 0 1-5 5H6a5.006 5.006 0 0 1-5-5V7m7 9v3m-3 0h6M7 1h2a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V4a3 3 0 0 1 3-3Z"
                    />
                  </svg>
                </button>
                <button onSubmit={(e) => handleSubmit(e)} className="">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 text-blue-500 hover:text-blue-700"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </form>
        </div>
      </Sidebar>
    </>
  );
}

export default App;