import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const DealFiles = ({ dealId }) => {
  const { user, token } = useSelector((state) => state.auth);
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);

  // ✅ Fetch files
  const fetchFiles = async () => {
    try {
      const res = await axios.get(`/api/deals/${dealId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFiles(res.data.files || []);
    } catch (err) {
      console.error('❌ Failed to fetch files:', err);
    }
  };

  // 📤 Upload file
  const handleUpload = async () => {
    if (!file) return alert('Please select a file first.');
    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post(`/api/files/${dealId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      alert('📁 File uploaded!');
      setFile(null);
      fileInputRef.current.value = null;
      fetchFiles();
    } catch (err) {
      console.error('❌ Upload failed:', err);
      alert('Upload failed');
    }
  };

  useEffect(() => {
    fetchFiles();
  }, [dealId]);

  return (
    <div className="mt-6 bg-white p-4 rounded shadow border">
      <h3 className="text-lg font-semibold mb-2">📂 Deal Files</h3>

      <div className="flex items-center gap-2 mb-4">
        <input
          ref={fileInputRef}
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="border border-gray-300 rounded px-2 py-1 text-sm"
        />
        <button
          onClick={handleUpload}
          className="bg-green-600 text-white px-3 py-1 text-sm rounded hover:bg-green-700 transition"
        >
          Upload
        </button>
      </div>

      {files.length > 0 ? (
        <ul className="space-y-3">
          {files.map((f) => (
            <li
              key={f.filename}
              className="flex justify-between items-center border-b pb-2"
            >
              <a
                href={f.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline break-all text-sm"
              >
                {f.filename}
              </a>
              <span className="text-xs text-gray-500">
                uploaded by {f.uploadedBy?.name || 'Unknown'}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-500 italic">No files uploaded yet.</p>
      )}
    </div>
  );
};

export default DealFiles;
