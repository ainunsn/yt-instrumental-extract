'use client'
import { useEffect, useState } from "react"

const statusStyles = {
  PENDING:
    "bg-yellow-100 text-yellow-700",
  PROCESSING:
    "bg-blue-100 text-blue-700",
  COMPLETED:
    "bg-green-100 text-green-700",
  FAILED:
    "bg-red-100 text-red-700",
};

interface AudioJob {
  id: string;
  youtubeUrl: string;
  youtubeTitle: string | null;
  status:
  | "PENDING"
  | "PROCESSING"
  | "COMPLETED"
  | "FAILED";

  audioPath: string | null;
  vocalsPath: string | null;
  instrumentalPath: string | null;
  error: string | null;

  createdAt: string;
  updatedAt: string;

  userId: string;
}

export default function ProcessedList() {

  const [items, setItems] = useState<AudioJob[]>([])

  const fetchList = async () => {
    const response = await fetch(
      '/api/jobs',
      {
        method: 'GET',
        headers: {
          'Content-Type':
            'application/json',
        }
      }
    )

    setItems(await response.json())
  }

  useEffect(() => {
    fetchList()
  }, [])

  return (
    <div className="rounded-3xl bg-white p-6 shadow">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          Processed Audio
        </h2>

        <span className="text-sm text-slate-500">
          {items.length} jobs
        </span>
      </div>

      <div className="space-y-4">
        {items.map((item) => {
          const vocalsUrl = item.vocalsPath ? new URL(item.vocalsPath, window.location.origin).href : ''
          const audioUrl = item.audioPath ? new URL(item.audioPath, window.location.origin).href : ''

          const instrumentalUrl = item.instrumentalPath ? new URL(item.instrumentalPath, window.location.origin).href : ''

          return (
            <div
              key={item.id}
              className="rounded-2xl border border-violet-100 p-5"
            >
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div className="flex-1">
                  <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-400">
                    Youtube URL
                  </p>

                  <a href={item.youtubeUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-violet-600 hover:underline">
                    {item.youtubeTitle}
                  </a>
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${statusStyles[
                    item.status as keyof typeof statusStyles
                  ]
                    }`}
                >
                  {item.status}
                </span>
              </div>

              <div className="mt-4 text-sm text-slate-500">
                Created:
                {" "}
                {new Date(
                  item.createdAt
                ).toLocaleString()}
              </div>

              {item.error && (
                <div className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-600">
                  {item.error}
                </div>
              )}

              {item.status === "COMPLETED" && (
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <div className="rounded-xl bg-violet-50 p-4">
                    <h3 className="mb-3 font-semibold text-violet-700">
                      Audio
                    </h3>

                    <audio
                      controls
                      className="w-full"
                    >
                      <source
                        src={audioUrl}
                        type="audio/mpeg"
                      />
                    </audio>

                    <a
                      href={audioUrl}
                      download
                      className="mt-3 inline-block text-sm text-violet-600 hover:underline"
                    >
                      Download Audio
                    </a>
                  </div>

                  <div className="rounded-xl bg-violet-50 p-4">
                    <h3 className="mb-3 font-semibold text-violet-700">
                      Instrumental
                    </h3>

                    <audio
                      controls
                      className="w-full"
                    >
                      <source
                        src={instrumentalUrl}
                        type="audio/mpeg"
                      />
                    </audio>

                    <a
                      href={instrumentalUrl}
                      download
                      className="mt-3 inline-block text-sm text-violet-600 hover:underline"
                    >
                      Download Instrumental
                    </a>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  )
}