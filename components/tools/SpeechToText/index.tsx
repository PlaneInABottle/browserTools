'use client'

import { useState, useEffect, useRef } from 'react'
import { AudioProcessor } from '@/lib/audio/audio-processor'

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

  const workerRef = useRef<Worker>()
  const mediaRecorderRef = useRef<MediaRecorder>()
  const audioChunksRef = useRef<Blob[]>([])
  const recordingTimerRef = useRef<NodeJS.Timeout>()
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

  return (
    <div className="max-w-4xl mx-auto">
      {/* Recording Section */}
      <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-6">
        <div className="text-center">
          <div className="flex gap-4 justify-center items-center flex-wrap mb-4">
            <button
              onClick={startRecording}
              disabled={isRecording}
              className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Start Recording
            </button>
            <button
              onClick={stopRecording}
              disabled={!isRecording}
              className="px-8 py-4 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Stop Recording
            </button>
            <span className="text-2xl font-bold text-blue-600 font-mono min-w-[60px]">
              {formatTime(recordingTime)}
            </span>
          </div>

          {isRecording && (
            <div className="flex items-center justify-center gap-2 text-red-600 font-semibold">
              <span className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></span>
              Recording...
            </div>
          )}
        </div>
      </section>

      {/* Status Section */}
      {showStatus && (
        <section className="bg-gray-50 rounded-xl border border-gray-200 p-8 text-center mb-6">
          <div className="text-lg text-blue-600 font-semibold mb-4">{statusMessage}</div>
          <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
        </section>
      )}

      {/* Output Section */}
      {showOutput && (
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">Transcription</h2>
          <div className="bg-gray-50 rounded-lg p-6 mb-4 min-h-[100px] whitespace-pre-wrap text-left">
            {transcription}
          </div>
          <button
            onClick={clearAll}
            className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Clear
          </button>
        </section>
      )}
    </div>
  )
}
