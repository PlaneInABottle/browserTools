import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Toolympics - Free Browser Utilities'
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
              fontSize: 120,
              fontWeight: 'bold',
              marginBottom: 20,
            }}
          >
            Toolympics
          </div>
          <div
            style={{
              fontSize: 40,
              opacity: 0.9,
              textAlign: 'center',
              maxWidth: 800,
            }}
          >
            Quick and simple browser utilities. All for free.
          </div>
          <div
            style={{
              fontSize: 28,
              marginTop: 40,
              opacity: 0.8,
              display: 'flex',
              alignItems: 'center',
              gap: 15,
            }}
          >
            Privacy First - Lightning Fast - 100% Free
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
