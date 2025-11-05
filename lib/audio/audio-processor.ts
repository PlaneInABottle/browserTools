/**
 * Audio Processing Utility
 * Converts audio to Whisper-compatible format: 16kHz mono Float32Array
 */

export class AudioProcessor {
  /**
   * Convert audio file to Float32Array format required by Whisper
   */
  static async processAudioFile(audioFile: Blob): Promise<Float32Array> {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();

    try {
      const arrayBuffer = await audioFile.arrayBuffer();
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

      // Convert to mono if stereo
      let audioData: Float32Array;
      if (audioBuffer.numberOfChannels === 1) {
        audioData = audioBuffer.getChannelData(0);
      } else {
        const left = audioBuffer.getChannelData(0);
        const right = audioBuffer.getChannelData(1);
        audioData = new Float32Array(left.length);
        for (let i = 0; i < left.length; i++) {
          audioData[i] = (left[i] + right[i]) / 2;
        }
      }

      // Resample to 16kHz if needed
      if (audioBuffer.sampleRate !== 16000) {
        audioData = this.resample(audioData, audioBuffer.sampleRate, 16000);
      }

      return audioData;
    } catch (error) {
      console.error('Error processing audio file:', error);
      throw new Error('Failed to process audio file');
    } finally {
      await audioContext.close();
    }
  }

  /**
   * Resample audio data to target sample rate
   */
  static resample(
    audioData: Float32Array,
    originSampleRate: number,
    targetSampleRate: number
  ): Float32Array {
    if (originSampleRate === targetSampleRate) {
      return audioData;
    }

    const sampleRateRatio = originSampleRate / targetSampleRate;
    const newLength = Math.round(audioData.length / sampleRateRatio);
    const result = new Float32Array(newLength);

    let offsetResult = 0;
    let offsetBuffer = 0;

    while (offsetResult < result.length) {
      const nextOffsetBuffer = Math.round((offsetResult + 1) * sampleRateRatio);

      let accum = 0;
      let count = 0;

      for (let i = offsetBuffer; i < nextOffsetBuffer && i < audioData.length; i++) {
        accum += audioData[i];
        count++;
      }

      result[offsetResult] = accum / count;
      offsetResult++;
      offsetBuffer = nextOffsetBuffer;
    }

    return result;
  }
}
