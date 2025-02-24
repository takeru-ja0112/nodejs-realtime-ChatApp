"use client";

import { useState } from 'react';
import io from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';

const generateId = () => uuidv4();
const socket = io("http://localhost:5000");

export default function Home() {
  const [message, setMessage] = useState("");
  const [list, setList] = useState<{ message: string; chatId: string }[]>([]);

  const handleSendMessage = () => {
    socket.emit("send_message", { message: message, cahtId: generateId() });
    setMessage("");
  };

  // サーバーから受信
  socket.on('received_message', (date) => {
    console.log(date);
    setList([...list, date]);
    console.log(date.message);
  })

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div>
        <div className='text-center  mb-4 bg-gray-100 w-full py-2 '>
          <h1>チャットアプリ</h1>
        </div>
        <input type="text" placeholder='チャットを入力' onChange={(e) => setMessage(e.target.value)} className='px-1 py-1 border mx-2'
          value={message}
        />
        <button onClick={() => handleSendMessage()} className='py-1 px-2 bg-blue-400 text-white rounded '>送信</button>
      </div>
      <ul className=' w-full'>
        {list.map((chat) => (
          <li key={chat.chatId} className='bg-gray-100 w-full py-2 my-1 border-2 border text-center'>
            {chat.message}
          </li>
        ))}
      </ul>
    </div>
  );
}
