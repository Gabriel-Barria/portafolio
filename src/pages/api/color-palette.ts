export async function GET() {
  const colors = Array.from({ length: 5 }, () => 
    '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')
  );
  return new Response(JSON.stringify({ palette: colors }), {
    headers: { 'Content-Type': 'application/json' }
  });
}
