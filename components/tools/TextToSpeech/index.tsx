'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { Volume2, Download, Loader2, AlertCircle, Play, Pause } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'

const VOICE_OPTIONS = [
  { value: 'af_heart', label: '🎤 Female (Heart) - Best Quality', lang: 'en-US' },
  { value: 'af_bella', label: '🎤 Female (Bella)', lang: 'en-US' },
  { value: 'bf_emma', label: '🎤 Female (Emma) - British', lang: 'en-GB' },
  { value: 'am_michael', label: '🎤 Male (Michael)', lang: 'en-US' },
  { value: 'am_fenrir', label: '🎤 Male (Fenrir)', lang: 'en-US' },
  { value: 'bm_george', label: '🎤 Male (George) - British', lang: 'en-GB' },
]

const MAX_CHARACTERS = 500
const WORDS_PER_SECOND = 2.5

export function TextToSpeechConverter() {
  const [text, setText] = useState('')
  const [voice, setVoice] = useState('af_heart')
  const [isLoadingModel, setIsLoadingModel] = useState(false)
  const [loadingProgress, setLoadingProgress] = useState<string | null>(null)
  const [modelError, setModelError] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [processingTime, setProcessingTime] = useState<string | null>(null)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ttsRef = useRef<any>(null)
  const isLoadingRef = useRef(false)

  // Cleanup audio URL when component unmounts
  useEffect(() => {
    return () => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl)
      }
    }
  }, [audioUrl])

  // Setup and cleanup audio event listeners
  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !audioUrl) return

    const handleEnded = () => setIsPlaying(false)
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime)
    const handleLoadedMetadata = () => {
      setDuration(audio.duration)
    }
    const handleError = (e: Event) => {
      console.error('Audio error:', e)
      const error = audio.error
      if (error) {
        const errorMessage = `Audio error: ${error.message || `Code ${error.code}`}`
        console.error(errorMessage)
        toast.error(errorMessage)
      }
    }

    audio.addEventListener('ended', handleEnded)
    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('loadedmetadata', handleLoadedMetadata)
    audio.addEventListener('error', handleError)

    // Trigger load
    audio.load()

    return () => {
      audio.removeEventListener('ended', handleEnded)
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
      audio.removeEventListener('error', handleError)
    }
  }, [audioUrl])

  const loadModel = useCallback(async () => {
    // Prevent multiple simultaneous loading attempts
    if (ttsRef.current || isLoadingRef.current) {
      return
    }

    isLoadingRef.current = true
    setIsLoadingModel(true)
    setLoadingProgress('Downloading model...')
    setModelError(null)

    try {
      const { KokoroTTS } = await import('kokoro-js')

      setLoadingProgress('Loading ONNX model...')
      ttsRef.current = await KokoroTTS.from_pretrained(
        'onnx-community/Kokoro-82M-v1.0-ONNX',
        {
          dtype: 'q8',
          device: 'wasm',
          progress_callback: (progress: {
            status: string
            progress?: number
          }) => {
            const percentComplete = Math.round(progress.progress || 0)

            if (progress.status === 'downloading') {
              setLoadingProgress(`Downloading: ${percentComplete}%`)
            } else if (progress.status === 'progress') {
              setLoadingProgress(`Loading: ${percentComplete}%`)
            }
          }
        }
      )

      setLoadingProgress('Model ready!')
      toast.success('TTS model loaded successfully')
      setTimeout(() => setLoadingProgress(null), 1000)
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to load TTS model'
      setModelError(message)
      toast.error(message)
      setLoadingProgress(null)
      ttsRef.current = null
    } finally {
      setIsLoadingModel(false)
      isLoadingRef.current = false
    }
  }, [])

  const handleGenerate = useCallback(async () => {
    if (!text.trim()) {
      toast.error('Please enter some text')
      return
    }

    // Load model if not already loaded
    if (!ttsRef.current) {
      await loadModel()
      // If model failed to load, return
      if (!ttsRef.current) {
        return
      }
    }

    setIsGenerating(true)
    setAudioUrl(null)
    setProcessingTime(null)
    setCurrentTime(0)
    setDuration(0)

    try {
      const startTime = performance.now()
      const audio = await ttsRef.current.generate(text.trim(), {
        voice
      })
      const processingTimeMs = ((performance.now() - startTime) / 1000).toFixed(2)

      // Use toBlob() method as per kokoro-js documentation
      const blob = audio.toBlob()
      
      // Debug: Log blob details
      console.log('Generated blob:', {
        type: blob.type,
        size: blob.size,
        hasType: !!blob.type
      })

      // Validate blob
      if (!blob || blob.size === 0) {
        throw new Error('Generated audio blob is empty')
      }

      if (!blob.type || blob.type === '') {
        console.warn('Blob has no MIME type, this may cause playback issues')
      }

      const url = URL.createObjectURL(blob)

      setAudioUrl(url)
      setProcessingTime(processingTimeMs)
      toast.success(`Speech generated in ${processingTimeMs}s`)
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to generate speech'
      toast.error(`Error: ${message}`)
    } finally {
      setIsGenerating(false)
    }
  }, [text, voice, loadModel])

  const handleDownload = useCallback(() => {
    if (!audioUrl) return

    const link = document.createElement('a')
    link.href = audioUrl
    link.download = `tts_${Date.now()}.wav`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    toast.success('Audio downloaded')
  }, [audioUrl])

  const handlePlayPause = useCallback(async () => {
    if (!audioRef.current) return

    try {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else {
        await audioRef.current.play()
        setIsPlaying(true)
      }
    } catch (error) {
      console.error('Playback failed:', error)
      toast.error('Failed to play audio. Please try again.')
      setIsPlaying(false)
    }
  }, [isPlaying])

  const handleProgressClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!audioRef.current || duration === 0) return

      const rect = e.currentTarget.getBoundingClientRect()
      const clickX = e.clientX - rect.left
      const percentage = clickX / rect.width
      const newTime = Math.max(0, Math.min(percentage * duration, duration))

      audioRef.current.currentTime = newTime
      setCurrentTime(newTime)
    },
    [duration]
  )

  const estimatedDuration = text.trim()
    ? Math.ceil(text.split(/\s+/).length / WORDS_PER_SECOND)
    : 0

  return (
    <div className="space-y-6">
      {/* Text Input Section */}
      <Card>
        <CardHeader>
          <CardTitle>Text Input</CardTitle>
          <CardDescription>Enter the text you want to convert to speech</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value.slice(0, MAX_CHARACTERS))}
            placeholder="Enter your text here... (maximum 500 characters)"
            rows={6}
            className="resize-none"
          />
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">
              {text.length} / {MAX_CHARACTERS} characters
            </p>
            {estimatedDuration > 0 && (
              <Badge variant="secondary">
                ~{estimatedDuration}s estimated duration
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Voice Selection & Generation */}
      <Card>
        <CardHeader>
          <CardTitle>Settings</CardTitle>
          <CardDescription>Choose a voice and generate speech</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {modelError && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="flex items-center justify-between">
                <span>{modelError}</span>
                <Button
                  onClick={() => {
                    setModelError(null)
                    loadModel()
                  }}
                  variant="outline"
                  size="sm"
                  className="ml-2"
                >
                  Retry
                </Button>
              </AlertDescription>
            </Alert>
          )}
          <div>
            <label className="text-sm font-medium mb-2 block">Voice</label>
            <Select value={voice} onValueChange={setVoice} disabled={isLoadingModel || isGenerating}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {VOICE_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground mt-2">
              {VOICE_OPTIONS.find((v) => v.value === voice)?.label || 'Select a voice'}
            </p>
          </div>

          <Button
            onClick={handleGenerate}
            disabled={isLoadingModel || isGenerating || !text.trim()}
            className="w-full"
            size="lg"
          >
            {isLoadingModel ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                {loadingProgress || 'Loading Model...'}
              </>
            ) : isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Generating Speech...
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4 mr-2" />
                Generate Speech
              </>
            )}
          </Button>

          {loadingProgress && !isLoadingModel && (
            <p className="text-xs text-muted-foreground text-center">
              {loadingProgress}
            </p>
          )}

          {processingTime && (
            <p className="text-xs text-muted-foreground text-center">
              Generated in {processingTime}s
            </p>
          )}
        </CardContent>
      </Card>

      {/* Audio Player & Download */}
      {audioUrl && (
        <Card>
          <CardHeader>
            <CardTitle>Playback</CardTitle>
            <CardDescription>Listen to or download your generated audio</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Hidden audio element */}
            <audio
              ref={audioRef}
              src={audioUrl || ''}
              preload="metadata"
              aria-label="Generated text-to-speech audio"
              className="hidden"
            />

            {/* Custom audio player */}
            <div className="flex gap-2">
              <Button
                onClick={handlePlayPause}
                variant="outline"
                size="lg"
                className="flex-1"
                aria-label={isPlaying ? 'Pause audio' : 'Play audio'}
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-4 h-4 mr-2" />
                    Pause
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Play
                  </>
                )}
              </Button>

              <Button
                onClick={handleDownload}
                variant="outline"
                size="lg"
                className="flex-1"
                aria-label="Download audio as WAV file"
              >
                <Download className="w-4 h-4 mr-2" />
                Download WAV
              </Button>
            </div>

            {/* Progress bar and duration */}
            <div className="space-y-2">
              <div
                className="w-full bg-muted rounded-full h-2 cursor-pointer hover:h-3 transition-all"
                onClick={handleProgressClick}
                role="slider"
                aria-label="Audio progress"
                aria-valuemin={0}
                aria-valuemax={Math.ceil(duration)}
                aria-valuenow={Math.ceil(currentTime)}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (!audioRef.current || duration === 0) return
                  if (e.key === 'ArrowLeft') {
                    audioRef.current.currentTime = Math.max(0, currentTime - 5)
                  } else if (e.key === 'ArrowRight') {
                    audioRef.current.currentTime = Math.min(duration, currentTime + 5)
                  }
                }}
              >
                <div
                  className="bg-primary h-full rounded-full transition-all duration-200"
                  style={{
                    width: duration > 0 ? `${(currentTime / duration) * 100}%` : '0%'
                  }}
                />
              </div>
              {duration > 0 && (
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{Math.floor(currentTime)}s</span>
                  <span>{Math.floor(duration)}s</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Information Alert */}
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Your text and generated audio are processed entirely in your browser. No data is sent to any server.
          The TTS model is cached locally after first load for faster generation on subsequent uses.
        </AlertDescription>
      </Alert>
    </div>
  )
}
