let titles = [];
submissionsSnapshot.forEach(doc => {
  const data = doc.data();
  if (data.title) {
    titles.push(data.title);
  }
});

if (titles.length === 0) {
  return res.status(400).json({ error: 'No movie submissions found.' });
}

// Construct a creative prompt using the movie titles
const prompt = `A vibrant movie poster that creatively incorporates elements from the following films: ${titles.join(', ')}. Cinematic, imaginative, and colorful.`;

// Call the OpenAI DALL·E API
const response = await fetch('https://api.openai.com/v1/images/generations', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer YOUR_OPENAI_API_KEY`
  },
  body: JSON.stringify({
    prompt: prompt,
    n: 1,
    size: '1024x1024'
  })
});

const data = await response.json();

if (data && data.data && data.data.length > 0) {
  const imageUrl = data.data[0].url;
  return res.json({ imageUrl });
} else {
  return res.status(500).json({ error: 'Failed to generate image.' });
}
