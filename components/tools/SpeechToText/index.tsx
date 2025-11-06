'use client'

import { useState, useEffect, useRef } from 'react'
import { AudioProcessor } from '@/lib/audio/audio-processor'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Textarea } from '@/components/ui/textarea'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface WorkerMessage {
  type: string
  data?: any
  error?: string
}

interface ModelConfig {
  id: string
  name: string
  description: string
  size: string
  speed: 'Fast' | 'Medium' | 'Slow'
  accuracy: 'Good' | 'Better' | 'Best'
}

const AVAILABLE_MODELS: ModelConfig[] = [
  {
    id: 'Xenova/whisper-tiny.en',
    name: 'Whisper Tiny',
    description: 'Fastest & lightweight',
    size: '~150MB',
    speed: 'Fast',
    accuracy: 'Good'
  },
  {
    id: 'Xenova/whisper-base.en',
    name: 'Whisper Base',
    description: 'Balanced accuracy & speed',
    size: '~290MB',
    speed: 'Medium',
    accuracy: 'Better'
  },
  {
    id: 'Xenova/whisper-small.en',
    name: 'Whisper Small',
    description: 'High accuracy',
    size: '~970MB',
    speed: 'Slow',
    accuracy: 'Best'
  }
]

export default function SpeechToTextTool() {
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [isModelLoaded, setIsModelLoaded] = useState(false)
  const [statusMessage, setStatusMessage] = useState('')
  const [showStatus, setShowStatus] = useState(false)
  const [transcription, setTranscription] = useState('')
  const [showOutput, setShowOutput] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [selectedModel, setSelectedModel] = useState<string>(AVAILABLE_MODELS[0].id)
  const [currentLoadedModel, setCurrentLoadedModel] = useState<string | null>(null)

  const workerRef = useRef<Worker | undefined>(undefined)
  const mediaRecorderRef = useRef<MediaRecorder | undefined>(undefined)
  const audioChunksRef = useRef<Blob[]>([])
  const recordingTimerRef = useRef<NodeJS.Timeout | undefined>(undefined)
  const recordingStartTimeRef = useRef<number>(0)
  const currentAudioDataRef = useRef<Float32Array | null>(null)
  const lastProgressUpdateRef = useRef<number>(0)
  const downloadProgressRef = useRef<{ [key: string]: { loaded: number, total: number } }>({})

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
        setCurrentLoadedModel(data?.model || selectedModel)
        console.log('Model loaded:', data?.model)
        if (currentAudioDataRef.current) {
          // Show transcribing immediately instead of hiding status
          showStatusMessage('Transcribing...')
          transcribe()
        } else {
          hideStatus()
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

      // Track progress per file
      const fileName = data.file || 'unknown'
      downloadProgressRef.current[fileName] = {
        loaded: data.loaded || 0,
        total: data.total || 0
      }

      // Calculate cumulative progress across all files
      let totalLoaded = 0
      let totalSize = 0
      Object.values(downloadProgressRef.current).forEach(({ loaded, total }) => {
        totalLoaded += loaded
        totalSize += total
      })

      const loadedMB = (totalLoaded / (1024 * 1024)).toFixed(1)
      const totalMB = (totalSize / (1024 * 1024)).toFixed(1)
      const percentage = totalSize > 0 ? Math.round((totalLoaded / totalSize) * 100) : 0

      // Use the model from the worker message, or fall back to selectedModel
      const modelId = data.model || selectedModel
      const modelConfig = getModelConfig(modelId)
      const modelName = modelConfig ? modelConfig.name : 'Model'
      setStatusMessage(`Downloading ${modelName}... ${loadedMB}/${totalMB} MB (${percentage}%)`)
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
      setIsProcessing(true)
      setIsUploading(true)
      showStatusMessage('Processing audio file...')

      currentAudioDataRef.current = await AudioProcessor.processAudioFile(blob)
      console.log('Audio processed, samples:', currentAudioDataRef.current.length)

      setIsUploading(false)

      // Check if we need to load a different model
      if (!isModelLoaded || currentLoadedModel !== selectedModel) {
        loadModel()
      } else {
        transcribe()
      }
    } catch (error) {
      console.error('Error processing audio:', error)
      alert('Error: Failed to process audio')
      setIsProcessing(false)
      setIsUploading(false)
      hideStatus()
    }
  }

  const loadModel = (modelId?: string) => {
    const modelToLoad = modelId || selectedModel
    const modelConfig = getModelConfig(modelToLoad)
    const modelName = modelConfig ? modelConfig.name : 'Model'

    // Reset download progress tracking
    downloadProgressRef.current = {}

    showStatusMessage(`Loading ${modelName}...`)
    workerRef.current?.postMessage({
      type: 'load',
      data: { model: modelToLoad }
    })
  }

  const handleModelChange = (modelId: string) => {
    setSelectedModel(modelId)
    // Reset model loaded state when changing models
    if (currentLoadedModel && currentLoadedModel !== modelId) {
      setIsModelLoaded(false)
    }
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
    setIsProcessing(false)
    setIsUploading(false)
    currentAudioDataRef.current = null
    // Keep the loaded model for next transcription
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(transcription)
      alert('Transcription copied to clipboard!')
    } catch (error) {
      console.error('Failed to copy:', error)
      alert('Failed to copy to clipboard')
    }
  }

  const downloadTranscription = () => {
    const blob = new Blob([transcription], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `transcription-${new Date().toISOString().slice(0, 10)}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
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

  const getModelConfig = (modelId: string): ModelConfig | undefined => {
    return AVAILABLE_MODELS.find(m => m.id === modelId)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Model Selection Section */}
      {!isProcessing && !showOutput && (
        <Card>
          <CardHeader>
            <CardTitle>Model Selection</CardTitle>
            <CardDescription>Choose a model based on your speed and accuracy needs</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Select value={selectedModel} onValueChange={handleModelChange}>
              <SelectTrigger className="w-full h-auto min-h-[3rem] py-2">
                <SelectValue placeholder="Select a model">
                  {(() => {
                    const model = getModelConfig(selectedModel)
                    return model ? (
                      <div className="flex flex-col items-start gap-1 text-left">
                        <div className="font-semibold leading-none">{model.name}</div>
                        <div className="text-xs text-muted-foreground leading-tight font-normal">{model.description}</div>
                      </div>
                    ) : 'Select a model'
                  })()}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {AVAILABLE_MODELS.map((model) => (
                  <SelectItem key={model.id} value={model.id} className="h-auto py-4">
                    <div className="flex flex-col items-start gap-1">
                      <div className="font-semibold leading-none">{model.name}</div>
                      <div className="text-xs text-muted-foreground leading-tight">{model.description}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Model Info Display */}
            {(() => {
              const modelConfig = getModelConfig(selectedModel)
              return modelConfig ? (
                <div className="grid grid-cols-3 gap-4 pt-2">
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground mb-1">Size</div>
                    <Badge variant="outline">{modelConfig.size}</Badge>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground mb-1">Speed</div>
                    <Badge variant="outline">{modelConfig.speed}</Badge>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground mb-1">Accuracy</div>
                    <Badge variant="outline">{modelConfig.accuracy}</Badge>
                  </div>
                </div>
              ) : null
            })()}

            {currentLoadedModel && currentLoadedModel !== selectedModel && (
              <Alert>
                <AlertDescription className="text-sm">
                  Note: A different model is currently loaded. The selected model will be downloaded when you start recording or upload audio.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      )}

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
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Transcription</CardTitle>
                <CardDescription>Your audio has been converted to text</CardDescription>
              </div>
              {currentLoadedModel && (() => {
                const modelConfig = getModelConfig(currentLoadedModel)
                return modelConfig ? (
                  <Badge variant="secondary" className="ml-2">
                    {modelConfig.name}
                  </Badge>
                ) : null
              })()}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={transcription}
              readOnly
              className="min-h-[200px] font-mono text-base resize-none"
              placeholder="Your transcription will appear here..."
            />
            <div className="flex flex-wrap gap-2">
              <Button
                onClick={copyToClipboard}
                variant="default"
              >
                📋 Copy
              </Button>
              <Button
                onClick={downloadTranscription}
                variant="default"
              >
                💾 Download
              </Button>
              <Button
                onClick={clearAll}
                variant="outline"
                className="ml-auto"
              >
                ✨ Transcribe New Audio
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recording Section */}
      {!isProcessing && !showOutput && (
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
      )}

      {/* File Upload Section */}
      {!isProcessing && !showOutput && (
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
              className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${isDragging
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
      )}
    </div>
  )
}
