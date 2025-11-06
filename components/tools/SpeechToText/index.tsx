'use client'

import { useState, useEffect, useRef } from 'react'
import { AudioProcessor } from '@/lib/audio/audio-processor'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Textarea } from '@/components/ui/textarea'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'

interface WorkerMessage {
  type: string
  data?: any
  error?: string
}

export default function SpeechToTextTool() {
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [isModelLoaded, setIsModelLoaded] = useState(false)
  const [statusMessage, setStatusMessage] = useState('')
  const [showStatus, setShowStatus] = useState(false)
  const [transcription, setTranscription] = useState('')
  const [showOutput, setShowOutput] = useState(false)

  const workerRef = useRef<Worker | undefined>(undefined)
  const mediaRecorderRef = useRef<MediaRecorder | undefined>(undefined)
  const audioChunksRef = useRef<Blob[]>([])
  const recordingTimerRef = useRef<NodeJS.Timeout | undefined>(undefined)
  const recordingStartTimeRef = useRef<number>(0)
  const currentAudioDataRef = useRef<Float32Array | null>(null)
  const lastProgressUpdateRef = useRef<number>(0)

  useEffect(() => {
    // Initialize worker only in browser
    if (typeof window !== 'undefined') {
      workerRef.current = new Worker('/workers/transcriber-worker.js', { type: 'module' })

      workerRef.current.addEventListener('message', handleWorkerMessage)

      return () => {
        workerRef.current?.terminate()
      }
    }
  }, [])

  const handleWorkerMessage = (event: MessageEvent<WorkerMessage>) => {
    const { type, data, error } = event.data

    switch (type) {
      case 'load-complete':
        setIsModelLoaded(true)
        console.log('Model loaded')
        hideStatus()
        if (currentAudioDataRef.current) {
          transcribe()
        }
        break

      case 'download-progress':
        handleDownloadProgress(data)
        break

      case 'transcription-start':
        showStatusMessage('Transcribing...')
        break

      case 'transcription-complete':
        hideStatus()
        setTranscription(data.text)
        setShowOutput(true)
        console.log('Transcription completed')
        break

      case 'error':
        alert(`Error: ${error}`)
        hideStatus()
        break
    }
  }

  const handleDownloadProgress = (data: any) => {
    if (data.total > 0) {
      const now = Date.now()
      if (lastProgressUpdateRef.current && now - lastProgressUpdateRef.current < 100) {
        return
      }
      lastProgressUpdateRef.current = now

      const loadedMB = (data.loaded / (1024 * 1024)).toFixed(1)
      const totalMB = (data.total / (1024 * 1024)).toFixed(1)
      setStatusMessage(`Downloading model... ${loadedMB}/${totalMB} MB`)
    }
  }

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      mediaRecorderRef.current = new MediaRecorder(stream)
      audioChunksRef.current = []

      mediaRecorderRef.current.addEventListener('dataavailable', (event) => {
        audioChunksRef.current.push(event.data)
      })

      mediaRecorderRef.current.addEventListener('stop', async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' })
        await handleAudioBlob(audioBlob)
        stream.getTracks().forEach(track => track.stop())
      })

      mediaRecorderRef.current.start()
      setIsRecording(true)

      recordingStartTimeRef.current = Date.now()
      recordingTimerRef.current = setInterval(() => {
        const elapsed = Math.floor((Date.now() - recordingStartTimeRef.current) / 1000)
        setRecordingTime(elapsed)
      }, 1000)
    } catch (error) {
      console.error('Error accessing microphone:', error)
      alert('Could not access microphone')
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
      clearInterval(recordingTimerRef.current)
      setRecordingTime(0)
    }
  }

  const handleAudioBlob = async (blob: Blob) => {
    try {
      currentAudioDataRef.current = await AudioProcessor.processAudioFile(blob)
      console.log('Audio processed, samples:', currentAudioDataRef.current.length)

      if (!isModelLoaded) {
        loadModel()
      } else {
        transcribe()
      }
    } catch (error) {
      console.error('Error processing audio:', error)
      alert('Error: Failed to process audio')
    }
  }

  const loadModel = () => {
    showStatusMessage('Loading model...')
    workerRef.current?.postMessage({ type: 'load' })
  }

  const transcribe = () => {
    if (!currentAudioDataRef.current) return

    workerRef.current?.postMessage({
      type: 'transcribe',
      data: { audioData: currentAudioDataRef.current }
    })
  }

  const showStatusMessage = (message: string) => {
    setShowStatus(true)
    setStatusMessage(message)
  }

  const hideStatus = () => {
    setShowStatus(false)
  }

  const clearAll = () => {
    setTranscription('')
    setShowOutput(false)
    currentAudioDataRef.current = null
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0')
    const secs = (seconds % 60).toString().padStart(2, '0')
    return `${mins}:${secs}`
  }

  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const files = Array.from(e.dataTransfer.files)
    const audioFile = files.find(file => file.type.startsWith('audio/'))

    if (audioFile) {
      await handleAudioBlob(audioFile)
    } else {
      alert('Please drop an audio file')
    }
  }

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      await handleAudioBlob(file)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Status Section */}
      {showStatus && (
        <Alert>
          <AlertDescription className="text-center space-y-4">
            <div className="text-lg font-semibold">{statusMessage}</div>
            <div className="flex justify-center">
              <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* Output Section */}
      {showOutput && (
        <Card>
          <CardHeader>
            <CardTitle>Transcription</CardTitle>
            <CardDescription>Your audio has been converted to text</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={transcription}
              readOnly
              className="min-h-[200px] font-mono text-base resize-none"
              placeholder="Your transcription will appear here..."
            />
            <Button
              onClick={clearAll}
              variant="secondary"
            >
              Clear
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Recording Section */}
      <Card>
        <CardHeader>
          <CardTitle>Record Audio</CardTitle>
          <CardDescription>Click start to begin recording your voice</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <div className="flex gap-4 justify-center items-center flex-wrap">
              <Button
                onClick={startRecording}
                disabled={isRecording}
                size="lg"
                className="px-8"
              >
                Start Recording
              </Button>
              <Button
                onClick={stopRecording}
                disabled={!isRecording}
                variant="destructive"
                size="lg"
                className="px-8"
              >
                Stop Recording
              </Button>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-lg px-4 py-2">
                  {formatTime(recordingTime)}
                </Badge>
              </div>
            </div>

            {isRecording && (
              <Alert className="border-destructive/50 bg-destructive/10 flex justify-center">
                <div className="flex items-center justify-center gap-2">
                  <span className="relative inline-flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-destructive"></span>
                  </span>
                  <AlertDescription className="font-semibold">
                    Recording in progress...
                  </AlertDescription>
                </div>
              </Alert>
            )}
          </div>
        </CardContent>
      </Card>

      {/* File Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle>Or Upload Audio File</CardTitle>
          <CardDescription>Drag and drop or choose an audio file from your computer</CardDescription>
        </CardHeader>
        <CardContent>
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
              isDragging
                ? 'border-primary bg-primary/5'
                : 'border-muted-foreground/25 hover:border-primary/50'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="audio/*"
              onChange={handleFileSelect}
              className="hidden"
            />
            <div className="space-y-4">
              <div className="text-6xl">🎵</div>
              <div>
                <p className="text-lg font-semibold mb-2">
                  {isDragging ? 'Drop your audio file here' : 'Drag and drop your audio file'}
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                  Supports MP3, WAV, M4A, WebM, and other audio formats
                </p>
              </div>
              <Button
                onClick={() => fileInputRef.current?.click()}
                variant="secondary"
                size="lg"
              >
                Choose File
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
