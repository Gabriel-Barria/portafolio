export async function POST({ request }) {
  const { operation, a, b } = await request.json();
  let result;
  switch (operation) {
    case 'add': result = a + b; break;
    case 'subtract': result = a - b; break;
    case 'multiply': result = a * b; break;
    case 'divide': result = b !== 0 ? a / b : 'Error'; break;
    default: result = 'Invalid operation';
  }
  return new Response(JSON.stringify({ result }), {
    headers: { 'Content-Type': 'application/json' }
  });
}
