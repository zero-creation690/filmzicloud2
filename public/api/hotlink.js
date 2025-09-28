import axios from 'axios';

export default async function handler(req, res) {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: 'No URL provided' });

  try {
    const response = await axios.get(url);
    const html = response.data;

    // Extract video src from <video> or <source>
    const match = html.match(/<source\s+src="([^"]+)"\s+type="video\/mp4">/i);
    if (match && match[1]) {
      return res.status(200).json({ hotlink: match[1] });
    } else {
      return res.status(404).json({ error: 'Video URL not found' });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to fetch URL' });
  }
}
