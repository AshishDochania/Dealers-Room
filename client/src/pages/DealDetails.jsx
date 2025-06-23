import { useParams } from 'react-router-dom';
import DealChat from '../components/DealChat';
import DealFiles from '../components/DealFiles';
import Header from '../components/Header';

const DealDetails = () => {
  const { id } = useParams(); // dealId from URL

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6">
    <Header />
      <h2 className="text-3xl font-bold mb-6">💬 Deal Room</h2>

      {/* Chat Section */}
      <div className="bg-white p-6 rounded-xl shadow mb-6">
        <h3 className="text-xl font-semibold mb-4">Messages</h3>
        <DealChat dealId={id} />
      </div>

      {/* File Upload Section */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-xl font-semibold mb-4">Documents</h3>
        <DealFiles dealId={id} />
      </div>
    </div>
  );
};

export default DealDetails;
