import { useState } from 'react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [hotlink, setHotlink] = useState('');

  const generateHotlink = async () => {
    if (!url) return alert('Enter a Koyeb URL!');
    const res = await fetch(`/api/hotlink?url=${encodeURIComponent(url)}`);
    const data = await res.json();
    if (data.hotlink) setHotlink(data.hotlink);
    else setHotlink('❌ Could not generate hotlink.');
  };

  return (
    <div style={{ padding: '50px', fontFamily: 'Arial', textAlign: 'center' }}>
      <h1>Koyeb Hotlink Generator</h1>
      <input
        type="text"
        placeholder="Paste Koyeb video URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={{ width: '400px', padding: '10px' }}
      />
      <button onClick={generateHotlink} style={{ marginLeft: '10px', padding: '10px 20px' }}>Generate</button>
      <div style={{ marginTop: '20px', wordBreak: 'break-all' }}>
        {hotlink && (
          <a href={hotlink} download target="_blank" rel="noopener noreferrer">
            {hotlink}
          </a>
        )}
      </div>
    </div>
  );
}
