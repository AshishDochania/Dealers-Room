import { useParams } from 'react-router-dom';
import DealChat from '../components/DealChat';

const DealDetails = () => {
  const { id } = useParams(); // dealId from URL

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Deal Room</h2>
      <DealChat dealId={id} />
    </div>
  );
};

export default DealDetails;
