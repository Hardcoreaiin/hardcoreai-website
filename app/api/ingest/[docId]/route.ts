import { NextRequest, NextResponse } from 'next/server'

export async function POST(
  request: NextRequest,
  { params }: { params: { docId: string } }
) {
  const { docId } = params

  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  const apiSecret = process.env.PYTHON_API_SECRET

  if (!apiUrl || !apiSecret) {
    return NextResponse.json(
      { error: 'API URL or secret not configured' },
      { status: 500 }
    )
  }

  try {
    const response = await fetch(`${apiUrl}/ingest/${docId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiSecret}`,
      },
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`[ingest] Backend returned ${response.status}: ${errorText}`)
      return NextResponse.json(
        { error: `Backend ingestion failed with status ${response.status}` },
        { status: response.status }
      )
    }
  } catch (err) {
    // Backend may be offline during development — log but return 202 so the
    // document is still created and the UI doesn't block.
    console.error('[ingest] Could not reach FastAPI backend:', err)
  }

  return NextResponse.json({ accepted: true, docId }, { status: 202 })
}
