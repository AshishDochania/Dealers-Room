import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useGetMessagesQuery, useSendMessageMutation } from '../features/message/messageApi';
import io from 'socket.io-client';

const socket = io(import.meta.env.VITE_CLIENT_URL); // secure and portable

const DealChat = ({ dealId }) => {
  const { user } = useSelector((state) => state.auth);
  const [newMsg, setNewMsg] = useState('');
  const [incoming, setIncoming] = useState(null);
  const bottomRef = useRef(null);

  const { data: messages = [], refetch } = useGetMessagesQuery(dealId);
  const [sendMessage] = useSendMessageMutation();

  useEffect(() => {
    if (!dealId) return;

    socket.emit('join-room', dealId);

    socket.on('new-message', (msg) => {
      if (msg.dealId === dealId) setIncoming(msg);
    });

    return () => {
      socket.emit('leave-room', dealId);
      socket.off('new-message');
    };
  }, [dealId]);

  useEffect(() => {
    if (incoming) {
      refetch();
      setIncoming(null);
    }
  }, [incoming]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!newMsg.trim()) return;

    await sendMessage({ dealId, content: newMsg });
    setNewMsg('');
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="border rounded-lg p-4 h-[400px] bg-white flex flex-col shadow">
      <div className="flex-1 overflow-y-auto px-2 space-y-2">
        {messages.map((msg) => {
          const isMine = msg.sender._id === user._id;
          return (
            <div
              key={msg._id}
              className={`flex flex-col max-w-[75%] ${
                isMine ? 'self-end text-white bg-blue-600' : 'self-start bg-gray-200 text-black'
              } px-4 py-2 rounded-lg`}
            >
              <span className={`text-xs font-semibold mb-1 ${isMine ? 'text-white' : 'text-gray-700'}`}>
                {isMine ? 'You' : msg.sender.name || msg.sender.email}
              </span>
              <span className="text-sm break-words">{msg.content}</span>
              <span className={`text-[10px] mt-1 text-right ${isMine ? 'text-gray-200' : 'text-gray-500'}`}>
                {new Date(msg.timestamp).toLocaleTimeString()}
              </span>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={handleSend} className="mt-3 flex gap-2">
        <input
          value={newMsg}
          onChange={(e) => setNewMsg(e.target.value)}
          className="flex-1 border rounded px-3 py-1 text-sm"
          placeholder="Type your message..."
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-1 rounded">
          Send
        </button>
      </form>
    </div>
  );
};

export default DealChat;
