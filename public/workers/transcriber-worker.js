/**
 * Web Worker for Speech-to-Text Transcription
 */

import { pipeline, env } from 'https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.7.5';

env.allowLocalModels = false;
env.allowRemoteModels = true;

class TranscriberSingleton {
  static model = 'Xenova/whisper-tiny.en';
  static instance = null;
  static isLoading = false;

  static async getInstance(progressCallback) {
    if (this.instance === null && !this.isLoading) {
      this.isLoading = true;

      try {
        this.instance = await pipeline(
          'automatic-speech-recognition',
          this.model,
          {
            device: 'wasm',
            dtype: 'q8',
            progress_callback: progressCallback
          }
        );

        this.isLoading = false;
        return this.instance;
      } catch (error) {
        this.isLoading = false;
        throw error;
      }
    }

    return this.instance;
  }
}

self.addEventListener('message', async (event) => {
  const { type, data } = event.data;

  try {
    switch (type) {
      case 'load':
        await handleLoad();
        break;

      case 'transcribe':
        await handleTranscribe(data);
        break;

      default:
        self.postMessage({
          type: 'error',
          error: `Unknown message type: ${type}`
        });
    }
  } catch (error) {
    self.postMessage({
      type: 'error',
      error: error.message || 'Unknown error occurred'
    });
  }
});

async function handleLoad() {
  try {
    await TranscriberSingleton.getInstance((progress) => {
      if (progress.status === 'progress') {
        self.postMessage({
          type: 'download-progress',
          data: {
            file: progress.file,
            loaded: progress.loaded || 0,
            total: progress.total || 0
          }
        });
      }
    });

    self.postMessage({ type: 'load-complete' });
  } catch (error) {
    self.postMessage({
      type: 'error',
      error: `Failed to load model: ${error.message}`
    });
  }
}

async function handleTranscribe(data) {
  try {
    const { audioData } = data;
    const pipeline = await TranscriberSingleton.getInstance();

    if (!pipeline) {
      throw new Error('Model not loaded');
    }

    self.postMessage({ type: 'transcription-start' });

    const startTime = performance.now();
    const result = await pipeline(audioData, {
      return_timestamps: false,
      chunk_length_s: 30,
      stride_length_s: 5
    });

    const processingTime = ((performance.now() - startTime) / 1000).toFixed(2);

    self.postMessage({
      type: 'transcription-complete',
      data: {
        text: result.text,
        processingTime: processingTime
      }
    });
  } catch (error) {
    self.postMessage({
      type: 'error',
      error: `Transcription failed: ${error.message}`
    });
  }
}

console.log('Transcriber worker initialized');
