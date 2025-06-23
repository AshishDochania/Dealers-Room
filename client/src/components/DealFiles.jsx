import { useState } from 'react';
import axios from 'axios';

const DealFiles = ({ dealId, token }) => {
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);

  // ✅ Get files from the deal
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

  // 📦 Upload file to backend
  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post(`/api/files/${dealId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      setFile(null);
      alert('Uploaded ✅');
      fetchFiles(); // Refresh file list
    } catch (err) {
      console.error('❌ Upload failed:', err);
      alert('Upload failed');
    }
  };

  useEffect(() => {
    fetchFiles();
  }, [dealId]);

  return (
    <div className="mt-4 space-y-2">
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button
        onClick={handleUpload}
        className="bg-green-500 text-white px-3 py-1 rounded"
      >
        Upload File
      </button>
       {/* File List */}
      {files.length > 0 ? (
        <ul className="mt-4 space-y-2 border-t pt-4">
          {files.map((f) => (
            <li key={f.filename} className="flex justify-between items-center">
              <a
                href={f.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline break-all"
              >
                {f.filename}
              </a>
              <span className="text-xs text-gray-400">by {f.uploadedBy?.name || 'Unknown'}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-500">No files uploaded yet.</p>
      )}
    </div>
  );
};

export default DealFiles;
