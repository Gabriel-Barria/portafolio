export async function POST({ request }) {
  const { data } = await request.json();
  const avg = data.reduce((a, b) => a + b, 0) / data.length;
  const trend = data[data.length - 1] > data[0] ? 'upward' : 'downward';
  const prediction = data[data.length - 1] + (avg * 0.1);
  return new Response(JSON.stringify({ avg, trend, prediction }), {
    headers: { 'Content-Type': 'application/json' }
  });
}
