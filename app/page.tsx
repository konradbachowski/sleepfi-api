export default function Home() {
  return (
    <pre style={{ fontFamily: 'monospace', padding: 24 }}>
      {JSON.stringify({ name: 'SleepFi API', version: '1.0.0', status: 'ok' }, null, 2)}
    </pre>
  );
}
