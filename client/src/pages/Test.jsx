/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const CreateTest = ({ getTests }) => {
  const [duration, setDuration] = useState(0);
  const [numQuestions, setNumQuestions] = useState(0);
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const formData = {
        testDuration: duration,

        numQuestions,
      };
      const res = await axios.post("admin/test/new", formData, config);
      console.log(res);
      getTests();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-around m-4"
    >
      <label>
        Test Duration (minutes):
        <input
          type="number"
          value={duration}
          onChange={(event) => setDuration(parseInt(event.target.value))}
          className="bg-slate-200 p-1 rounded mb-1"
        />
      </label>
      <br />
      <label>
        Number of Questions:
        <input
          type="number"
          value={numQuestions}
          onChange={(event) => setNumQuestions(parseInt(event.target.value))}
          className="bg-slate-200 p-1 rounded mb-1"
        />
      </label>
      <br />
      <button
        type="submit"
        className="px-16 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 mx-2"
      >
        Create Test
      </button>
    </form>
  );
};

const Test = ({ testId, time, num }) => {
  const BaseURL = "http://localhost:5173";
  return (
    <div className="bg-slate-100 m-4 p-4">
      <div className="flex items-center justify-around">
        <Link
          to={testId}
          className="text-2xl font-bold m-4 flex flex-col items-center justify-center"
        >
          {testId}
        </Link>
        <button
          className="bg-indigo-600 text-white rounded hover:bg-indigo-700 px-4 py-2"
          onClick={() =>
            navigator.clipboard.writeText(BaseURL + "/quiz/" + testId)
          }
        >
          {" "}
          Copy Test Link
        </button>
      </div>
      <div className="flex items-center justify-around text-1xl">
        <div>Test Duration: {time} minutes</div>
        <div className="px-4 py-2 ml-36">{num} Questions</div>
      </div>
    </div>
  );
};

const Tests = () => {
  const [testList, setTest] = useState([]);
  const getTests = async () => {
    try {
      const res = await axios.post("admin/test");
      console.log(res);
      setTest(res.data.testList);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getTests();
  }, []);
  return (
    <div className="container mx-auto px-4 py-8 relative">
      <CreateTest getTests={getTests} />
      <>
        {testList.map((test) => {
          return (
            <Test
              testId={test._id}
              key={test._id}
              time={test.testDuration}
              num={test.numQuestions}
            />
          );
        })}
      </>
    </div>
  );
};

export default Tests;
