export async function POST({ request }) {
  const { text } = await request.json();
  const chars = text.length;
  const words = text.trim().split(/\s+/).length;
  const sentences = text.split(/[.!?]+/).filter(Boolean).length;
  const readingTime = Math.ceil(words / 200);
  return new Response(JSON.stringify({ chars, words, sentences, readingTime }), {
    headers: { 'Content-Type': 'application/json' }
  });
}
