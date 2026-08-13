import { useEffect, useState } from 'react'

interface PingResponse {
  db_time: string
}

function App() {
  const [dbTime, setDbTime] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/ping')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json() as Promise<PingResponse>
      })
      .then((data) => setDbTime(data.db_time))
      .catch((err) => setError(err instanceof Error ? err.message : String(err)))
  }, [])

  return (
    <div>
      <h1>react-rally</h1>
      {error && <p>Error: {error}</p>}
      {dbTime ? <p>Postgres says the time is: {dbTime}</p> : !error && <p>Loading...</p>}
    </div>
  )
}

export default App
