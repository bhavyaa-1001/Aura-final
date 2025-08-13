import { useState } from 'react';

const TestUpload = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [department, setDepartment] = useState('general');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setUploadResult(null);
    
    if (!file || !title || !description) {
      setError('Please fill all required fields');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('department', department);

    setIsUploading(true);

    try {
      const response = await fetch('/api/documents', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Upload failed');
      }

      setUploadResult(data);
      // Reset form
      setFile(null);
      setTitle('');
      setDescription('');
      setDepartment('general');
      // Reset file input
      document.getElementById('file-input').value = '';
    } catch (err) {
      setError(err.message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Test Document Upload</h1>
      
      <form onSubmit={handleSubmit} className="mb-6 p-4 border rounded">
        <div className="mb-4">
          <label className="block mb-2">Title:</label>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            className="w-full p-2 border rounded"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block mb-2">Description:</label>
          <textarea 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            className="w-full p-2 border rounded"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block mb-2">Department:</label>
          <select 
            value={department} 
            onChange={(e) => setDepartment(e.target.value)} 
            className="w-full p-2 border rounded"
          >
            <option value="general">General</option>
            <option value="mcd">MCD</option>
            <option value="dfs">DFS</option>
            <option value="dpcc-cte">DPCC-CTE</option>
          </select>
        </div>
        
        <div className="mb-4">
          <label className="block mb-2">File:</label>
          <input 
            id="file-input"
            type="file" 
            onChange={handleFileChange} 
            className="w-full p-2 border rounded"
            required
          />
        </div>
        
        <button 
          type="submit" 
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
          disabled={isUploading}
        >
          {isUploading ? 'Uploading...' : 'Upload Document'}
        </button>
      </form>
      
      {error && (
        <div className="p-4 mb-4 bg-red-100 border border-red-400 text-red-700 rounded">
          Error: {error}
        </div>
      )}
      
      {uploadResult && (
        <div className="p-4 bg-green-100 border border-green-400 text-green-700 rounded">
          <h2 className="text-xl font-bold mb-2">Upload Successful!</h2>
          <pre className="bg-gray-100 p-2 rounded overflow-auto">
            {JSON.stringify(uploadResult, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default TestUpload;