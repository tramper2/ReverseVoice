/**
 * Web Audio API & MediaRecorder Engine for Reverse Voice Game
 */

export class AudioEngine {
  constructor() {
    this.audioCtx = null;
    this.mediaRecorder = null;
    this.audioChunks = [];
    this.stream = null;
    this.currentSourceNode = null;
    this.analyser = null;
    this.isRecording = false;
    this.isPlaying = false;
  }

  /**
   * Initialize AudioContext on user action (to satisfy browser autoplay policy)
   */
  initContext() {
    if (!this.audioCtx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.audioCtx = new AudioCtx();
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  /**
   * Request microphone stream and setup analyser
   */
  async requestMicStream() {
    this.initContext();
    if (!this.stream) {
      this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    }
    return this.stream;
  }

  /**
   * Start recording microphone input
   * @param {Function} onDataAvailableCallback 
   */
  async startRecording(onStreamConnected) {
    this.initContext();
    const stream = await this.requestMicStream();

    // Attach analyser for visualizer
    const source = this.audioCtx.createMediaStreamSource(stream);
    this.analyser = this.audioCtx.createAnalyser();
    this.analyser.fftSize = 256;
    source.connect(this.analyser);

    if (onStreamConnected) {
      onStreamConnected(this.analyser);
    }

    this.audioChunks = [];
    this.mediaRecorder = new MediaRecorder(stream);

    this.mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        this.audioChunks.push(event.data);
      }
    };

    this.mediaRecorder.start(100);
    this.isRecording = true;
  }

  /**
   * Stop recording and return decoded AudioBuffer
   * @returns {Promise<AudioBuffer>}
   */
  async stopRecording() {
    return new Promise((resolve, reject) => {
      if (!this.mediaRecorder || !this.isRecording) {
        return reject(new Error('Recorder is not active'));
      }

      this.mediaRecorder.onstop = async () => {
        this.isRecording = false;
        try {
          const audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' });
          const arrayBuffer = await audioBlob.arrayBuffer();
          const audioBuffer = await this.audioCtx.decodeAudioData(arrayBuffer);
          resolve(audioBuffer);
        } catch (err) {
          reject(err);
        }
      };

      this.mediaRecorder.stop();
    });
  }

  /**
   * Reverse an AudioBuffer algorithmically
   * @param {AudioBuffer} buffer 
   * @returns {AudioBuffer} reversed AudioBuffer
   */
  reverseAudioBuffer(buffer) {
    if (!buffer || !this.audioCtx) return null;

    const numChannels = buffer.numberOfChannels;
    const length = buffer.length;
    const sampleRate = buffer.sampleRate;

    const reversedBuffer = this.audioCtx.createBuffer(numChannels, length, sampleRate);

    for (let c = 0; c < numChannels; c++) {
      const srcChannel = buffer.getChannelData(c);
      const destChannel = reversedBuffer.getChannelData(c);
      for (let i = 0; i < length; i++) {
        destChannel[i] = srcChannel[length - 1 - i];
      }
    }

    return reversedBuffer;
  }

  /**
   * Play AudioBuffer through AudioContext destination
   * @param {AudioBuffer} buffer 
   * @param {Function} onEnded 
   */
  playBuffer(buffer, onEnded) {
    this.initContext();
    this.stopPlayback(); // Stop any ongoing sound

    if (!buffer) return;

    this.currentSourceNode = this.audioCtx.createBufferSource();
    this.currentSourceNode.buffer = buffer;

    // Attach analyser for playback visualizer
    this.analyser = this.audioCtx.createAnalyser();
    this.analyser.fftSize = 256;

    this.currentSourceNode.connect(this.analyser);
    this.analyser.connect(this.audioCtx.destination);

    this.currentSourceNode.onended = () => {
      this.isPlaying = false;
      this.currentSourceNode = null;
      if (onEnded) onEnded();
    };

    this.currentSourceNode.start(0);
    this.isPlaying = true;
  }

  /**
   * Stop current audio playback
   */
  stopPlayback() {
    if (this.currentSourceNode) {
      try {
        this.currentSourceNode.stop();
      } catch (e) {
        // Ignored if already stopped
      }
      this.currentSourceNode = null;
    }
    this.isPlaying = false;
  }
}
