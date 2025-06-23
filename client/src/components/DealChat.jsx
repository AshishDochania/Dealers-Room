import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useGetMessagesQuery, useSendMessageMutation } from '../features/message/messageApi';
import io from 'socket.io-client';

const socket = io(process.env.CLIENT_URL); // or use env var

const DealChat = ({ dealId }) => {
  const { user } = useSelector(state => state.auth);
  const [newMsg, setNewMsg] = useState('');
  const [incoming, setIncoming] = useState(null);
  const bottomRef = useRef(null);

  const { data: messages = [], refetch } = useGetMessagesQuery(dealId);
  const [sendMessage] = useSendMessageMutation();

  useEffect(() => {
    if (!dealId) return;

    socket.emit('join-room', dealId);

    socket.on('new-message', (msg) => {
      if (msg.dealId === dealId) {
        setIncoming(msg);
      }
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
    <div className="border rounded p-4 h-[400px] overflow-y-auto flex flex-col">
      <div className="flex-1 overflow-y-auto space-y-2 px-2">
        {messages.map((msg) => {
              const isMine = msg.sender._id === user._id;

              return (
                <div
                  key={msg._id}
                  className={`flex flex-col max-w-[70%] mb-2 p-2 rounded-lg ${
                    isMine ? 'bg-blue-500 text-white self-end' : 'bg-gray-200 self-start'
                  }`}
                >
                  <div className="text-sm font-semibold">
                    {isMine ? 'You' : msg.sender.name || msg.sender.email}
                  </div>
                  <div>{msg.content}</div>
                  <div className="text-[10px] text-right text-gray-300 mt-1">
                    {new Date(msg.timestamp).toLocaleTimeString()}
                  </div>
                </div>
              );
            })}

        <div ref={bottomRef} />
      </div>
      <form onSubmit={handleSend} className="flex gap-2">
        <input
          value={newMsg}
          onChange={(e) => setNewMsg(e.target.value)}
          className="flex-1 border rounded px-2"
          placeholder="Type a message..."
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-1 rounded">Send</button>
      </form>
    </div>
  );
};

export default DealChat;
