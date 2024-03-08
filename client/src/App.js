import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [newIssue, setNewIssue] = useState({
    id: '',
    title: '',
    description: '',
  });
  const [issueId, setIssueId] = useState('');
  const [response, setResponse] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewIssue({ ...newIssue, [name]: value });
  };

  const createIssue = async () => {
    newIssue.id = parseInt(issueId);
    console.log(newIssue);

    const response = await axios.post(
      'http://localhost:8000/api/issues',
      newIssue
    );
    setResponse(JSON.stringify(response.data));
  };

  const readIssue = async () => {
    const response = await axios.get(
      `http://localhost:8000/api/issues/${issueId}`
    );
    setResponse(JSON.stringify(response.data));
  };

  const updateIssue = async () => {
    newIssue.id = parseInt(issueId);
    const response = await axios.put(
      `http://localhost:8000/api/issues/${issueId}`,
      newIssue
    );
    setResponse(JSON.stringify(response.data));
  };

  const deleteIssue = async () => {
    const response = await axios.delete(
      `http://localhost:8000/api/issues/${issueId}`
    );
    setResponse(JSON.stringify(response.data));
  };

  return (
    <div className="bg-info-subtle containerStyle">
      <div>
        <h1 className="mb-4">Issues Tracker</h1>

        <div>
          <div>
            <div>
              <label className="fw-medium">Issue ID: </label>
              <input
                type="text"
                name="issueId"
                onChange={(e) => setIssueId(e.target.value)}
                className="border border-1 rounded mx-3 p-1"
              />
            </div>
            <div className="my-2">
              <label className="fw-medium">Title: </label>
              <input
                type="text"
                name="title"
                onChange={handleInputChange}
                className="border border-1 rounded mx-3 p-1"
              />
            </div>
            <div className="my-2">
              <label className="fw-medium">Description: </label>
              <input
                type="text"
                name="description"
                onChange={handleInputChange}
                className="border border-1 rounded mx-3 p-1"
              />
              <button
                onClick={createIssue}
                className="border border-1 rounded bg-danger-subtle p-1 fw-medium mx-1"
              >
                Create
              </button>
            </div>
          </div>
          <div className="my-2">
            <label className="fw-medium">Issue ID: </label>
            <input
              type="text"
              name="issueId"
              onChange={(e) => setIssueId(e.target.value)}
              className="border border-1 rounded mx-3 p-1"
            />
            <button
              onClick={readIssue}
              className="border border-1 rounded bg-danger-subtle p-1 fw-medium mx-1"
            >
              Read
            </button>
            <button
              onClick={updateIssue}
              className="border border-1 rounded bg-danger-subtle p-1 fw-medium mx-1"
            >
              Update
            </button>
            <button
              onClick={deleteIssue}
              className="border border-1 rounded bg-danger-subtle p-1 fw-medium mx-1"
            >
              Delete
            </button>
          </div>
        </div>

        <div>
          <h2 className="mt-4">Response:</h2>
          <pre>{response}</pre>
        </div>
      </div>
    </div>
  );
}

export default App;
