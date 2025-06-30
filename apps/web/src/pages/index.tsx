import Head from 'next/head';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

export default function Home() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<string[]>([]);
  const [socket, setSocket] = useState<any>(null);

  useEffect(() => {
    const newSocket = io(process.env.NEXT_PUBLIC_WS_URL || 'http://localhost:3000');
    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    newSocket.on('message', (msg: string) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (socket && message) {
      socket.emit('message', message);
      setMessage('');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>StoryForge - Collaborative Story Studio</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold text-blue-600">
          Welcome to StoryForge!
        </h1>

        <p className="mt-3 text-2xl">
          Start your magical journey of co-creation.
        </p>

        <div className="mt-6 flex flex-col items-center">
          <input
            type="text"
            className="border p-2 rounded text-black"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message to the real-time canvas..."
          />
          <button
            className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={sendMessage}
          >
            Send to Canvas
          </button>
        </div>

        <div className="mt-8 w-full max-w-md bg-gray-100 p-4 rounded shadow-md text-left text-black">
          <h2 className="text-xl font-semibold mb-2">Live Canvas Messages:</h2>
          <ul className="list-disc pl-5">
            {messages.map((msg, index) => (
              <li key={index}>{msg}</li>
            ))}
          </ul>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <a
            href="#ai-canvas"
            className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600"
          >
            <h3 className="text-2xl font-bold">AI-Assisted Canvas &rarr;</h3>
            <p className="mt-4 text-xl">
              Draw, voice note, drag-and-drop. AI weaves the narrative.
            </p>
          </a>

          <a
            href="#editorial-tools"
            className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600"
          >
            <h3 className="text-2xl font-bold">Smart Editorial Tools &rarr;</h3>
            <p className="mt-4 text-xl">
              Refine, re-generate, enhance vocabulary and plot coherence.
            </p>
          </a>

          <a
            href="#living-storybook"
            className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600"
          >
            <h3 className="text-2xl font-bold">Living Storybook &rarr;</h3>
            <p className="mt-4 text-xl">
              Create evolving stories with character continuity.
            </p>
          </a>
        </div>
      </main>

      <footer className="flex items-center justify-center w-full h-24 border-t">
        Powered by StoryForge
      </footer>
    </div>
  );
}
