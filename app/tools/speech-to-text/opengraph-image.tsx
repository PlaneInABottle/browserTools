import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Speech to Text Converter - Free and Private'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
          fontFamily: 'system-ui',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
          }}
        >
          <div
            style={{
              fontSize: 80,
              fontWeight: 'bold',
              marginBottom: 20,
              textAlign: 'center',
            }}
          >
            Speech to Text
          </div>
          <div
            style={{
              fontSize: 36,
              opacity: 0.9,
              textAlign: 'center',
              maxWidth: 900,
              marginBottom: 30,
            }}
          >
            Convert audio to text instantly with AI
          </div>
          <div
            style={{
              fontSize: 28,
              opacity: 0.8,
              display: 'flex',
              alignItems: 'center',
              gap: 15,
            }}
          >
            Free - Private - Powered by Whisper AI
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
