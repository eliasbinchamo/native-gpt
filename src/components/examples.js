import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactLoading from "react-loading";
import Select from "react-select";
import { languages } from "../SupportedLanguages";

const Examples = () => {
  axios.defaults.baseURL = "http://localhost:3001";
  let [response, setResponse] = useState([]);
  let [prompt, setPrompt] = useState("");
  let [completionLoading, setCompletionLoading] = useState(false);
  let [submitDisabled, setSubmitDisabled] = useState(false);

  let handleInputChange = e => {
    e.preventDefault();

    setPrompt(e.target.value);
  };

  const language_options = languages;
  const algo_options = [
    { value: "text-devinci-003", label: "text-devinci-003" },
    { value: "text-devinci-002", label: "text-devinci-002" },
    { value: "text-curie-001", label: "text-curie-001" },
    { value: "text-babbage-001", label: "text-babbage-001" },
    { value: "text-ada-001", label: "text-ada-001" },
  ];

  let handleClick = e => {
    e.preventDefault();
    setPrompt("");
    setCompletionLoading(true);
    setSubmitDisabled(true);
  };
  console.log("length :" + response.length);
  console.log("length :" + response.toString());
  let getCompletion = async e => {
    e.preventDefault();

    await axios
      .get("/translate", {
        params: {
          text: prompt,
          target: "en",
        },
      })
      .then(function (res) {
        response.push({ prompt: prompt, data: res.data });
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        // always executed
      });

    setPrompt("");
    setSubmitDisabled(false);
    setCompletionLoading(false);
  };

  return (
    <div className="md:mt-4">
      <section>
        <div className="container p-4 mx-auto bg-white max-w-7xl sm:p-6 lg:p-8 dark:bg-gray-800">
          <div className="flex flex-wrap -mx-8">
            <div className="w-full px-8 lg:w-1/2">
              <div className="pb-12 mb-12 border-b lg:mb-0 lg:pb-0 lg:border-b-0">
                <h2 className="mb-4 text-3xl font-bold lg:text-4xl font-heading dark:text-white">
                  Welcome to Native GPT.
                </h2>
                <p className="mb-8 leading-loose text-gray-500 dark:text-gray-300">
                  An AI completion service built with Google Translate and
                  OpenAI. Supports all languages that Google Translate supports.
                  For best results, follow the 3 steps.
                </p>
                <div className="w-full md:w-1/3">
                  <a
                    type="button"
                    href="#prompt-input"
                    className="p-4 leading-loose text-lg bg-green-600 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200 text-white w-full transition ease-in duration-200 text-center font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                    Try Now
                  </a>
                </div>
              </div>
            </div>
            <div className="w-full px-8 lg:w-1/2">
              <ul className="space-y-12">
                <li className="flex -mx-4">
                  <div className="px-4">
                    <span className="flex items-center justify-center w-16 h-16 mx-auto text-2xl font-bold text-green-600 rounded-full font-heading bg-green-50">
                      1
                    </span>
                  </div>
                  <div className="px-4">
                    <h3 className="my-4 text-xl font-semibold dark:text-white">
                      Be specific.
                    </h3>
                    <p className="leading-loose text-gray-500 dark:text-gray-300">
                      <blockquote>“how to make pasta?” </blockquote>and{" "}
                      <blockquote>
                        “how to make Italian Ravioli? explain step by step.”{" "}
                      </blockquote>
                      produce completely different result.
                    </p>
                  </div>
                </li>
                <li className="flex -mx-4">
                  <div className="px-4">
                    <span className="flex items-center justify-center w-16 h-16 mx-auto text-2xl font-bold text-green-600 rounded-full font-heading bg-green-50">
                      2
                    </span>
                  </div>
                  <div className="px-4">
                    <h3 className="my-4 text-xl font-semibold dark:text-white">
                      Use correct punctuation.
                    </h3>
                    <p className="leading-loose text-gray-500 dark:text-gray-300">
                      An open ended sentence would confuse the system and
                      produces unusual output. or sometimes no response
                    </p>
                  </div>
                </li>
                <li className="flex -mx-4">
                  <div className="px-4">
                    <span className="flex items-center justify-center w-16 h-16 mx-auto text-2xl font-bold text-green-600 rounded-full font-heading bg-green-50">
                      3
                    </span>
                  </div>
                  <div className="px-4">
                    <h3 className="my-4 text-xl font-semibold dark:text-white">
                      Make sure your prompt produces a good English translation.
                    </h3>
                    <p className="leading-loose text-gray-500 dark:text-gray-300">
                      The AI depends on a prompt produced by Google translate.
                      make sure your prompt produces a good translation.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      {response.length > 0 && (
        <section className=" relative border whitespace-pre-line list-none mb-4 shadow-sm  rounded-md border-gray-300 p-4 mx-auto bg-white max-w-7xl sm:p-6 lg:p-8 dark:bg-gray-800 flex flex-col ">
          {response.map((data, key) => {
            return (
              <div className="m-auto flex flex-col w-full" key={key}>
                <li className=" mb-2 self-end bg-green-200 leading-loose text-gray-500 dark:bg-gray-800 rounded-3xl w-11/12 p-4 ">
                  {data.prompt}
                </li>

                <li className="self-start mb-2 border-gray-400 w-11/12">
                  <div className="bg-gray-100 text-gray-600 dark:bg-gray-800 rounded-3xl rounded-br-none flex flex-1 items-center p-4">
                    {data.data}
                  </div>
                </li>
              </div>
            );
          })}

          {completionLoading && (
            <li className=" w-auto flex items-center justify-center border-gray-400 bg-gray-100 dark:bg-gray-800 rounded-3xl rounded-br-none p-4">
              <ReactLoading
                type={"bars"}
                color={"#4b5563"}
                height={30}
                width={30}
                className="w-auto"
              />
            </li>
          )}
        </section>
      )}
      <section className="mb-4">
        <form disabled={submitDisabled} className="flex flex-col m-auto">
          <div className="max-w-7xl w-full flex m-auto py-2">
            <div className="m-auto w-full flex flex-row items-end justify-end rounded-md space-x-2 border-gray-300 bg-white dark:bg-gray-800">
              <div className=" flex flex-row items-center leading-loose text-gray-500 ">
                <span>Output: </span>
                <Select
                  defaultValue={language_options.find(
                    val => val.value === "am"
                  )}
                  options={language_options}
                  className="w-auto"
                  name="output_lang"
                />
              </div>
              <div className=" flex flex-row items-center leading-loose text-gray-500 ">
                <span>Model:</span>
                <Select
                  options={algo_options}
                  defaultValue={algo_options.find(
                    val => val.value === "text-devinci-003"
                  )}
                  name="model"
                />
              </div>
            </div>
          </div>

          <div className=" relative border  shadow-sm  rounded-md border-gray-300 p-4 mx-auto bg-white  w-full max-w-7xl sm:p-6 lg:p-8 dark:bg-gray-800 flex flex-row ">
            <input
              type="text"
              id="prompt-input"
              name="prompt"
              onChange={handleInputChange}
              className=" rounded-lg border-transparent flex-1 appearance-none  w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 text-base focus:outline-none focus:none focus:border-transparent"
              placeholder="Enter your prompt here"
              value={prompt}
            />
            <button
              type="submit"
              className="  flex items-center justify-center rounded-md  px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-50 hover:bg-gray-50 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 "
              id="options-menu"
              onClick={e => {
                handleClick(e);
                getCompletion(e);
              }}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M2.01 21L23 12L2.01 3L2 10L17 12L2 14L2.01 21Z"
                  fill="#4ECB71"
                />
              </svg>
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Examples;
