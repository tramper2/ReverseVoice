import { AudioEngine } from './audio.js';

// Application State Enum
const State = {
  IDLE: 'IDLE',
  REC1_DONE: 'REC1_DONE',
  REC2_DONE: 'REC2_DONE',
  RESULT: 'RESULT'
};

class ReverseVoiceApp {
  constructor() {
    this.engine = new AudioEngine();
    this.currentState = State.IDLE;

    // Audio Buffers
    this.originalBuffer = null;        // Step 1
    this.firstReversedBuffer = null;   // Step 2
    this.challengeBuffer = null;       // Step 3
    this.secondReversedBuffer = null;  // Step 4 (Restored sound)

    // DOM Elements
    this.elements = {};

    // Animation frames
    this.visualizerAnimationFrame = null;
    this.confettiAnimationFrame = null;
    this.particles = [];
  }

  init() {
    this.bindDOMElements();
    this.attachEventListeners();
    this.updateUIState();
  }

  bindDOMElements() {
    // Step Cards
    this.elements.cardStep1 = document.getElementById('card-step-1');
    this.elements.cardStep2 = document.getElementById('card-step-2');
    this.elements.cardStep3 = document.getElementById('card-step-3');
    this.elements.cardStep4 = document.getElementById('card-step-4');

    // Buttons
    this.elements.btnRecord1 = document.getElementById('btn-record-1');
    this.elements.btnPlayRev1 = document.getElementById('btn-play-rev-1');
    this.elements.btnRecord2 = document.getElementById('btn-record-2');
    this.elements.btnPlayRev2 = document.getElementById('btn-play-rev-2');
    this.elements.btnSuccess = document.getElementById('btn-success');
    this.elements.btnFail = document.getElementById('btn-fail');
    this.elements.btnReset = document.getElementById('btn-reset');
    this.elements.btnModalClose = document.getElementById('btn-modal-close');

    // Visualizers
    this.elements.canvasStep1 = document.getElementById('canvas-step-1');
    this.elements.canvasStep2 = document.getElementById('canvas-step-2');
    this.elements.canvasStep3 = document.getElementById('canvas-step-3');
    this.elements.canvasStep4 = document.getElementById('canvas-step-4');

    // Status Texts
    this.elements.statusStep1 = document.getElementById('status-step-1');
    this.elements.statusStep2 = document.getElementById('status-step-2');
    this.elements.statusStep3 = document.getElementById('status-step-3');
    this.elements.statusStep4 = document.getElementById('status-step-4');

    // Result Actions Container
    this.elements.resultActions = document.getElementById('result-actions');

    // Modal & Confetti
    this.elements.modalBackdrop = document.getElementById('modal-backdrop');
    this.elements.confettiCanvas = document.getElementById('confetti-canvas');
  }

  attachEventListeners() {
    // Step 1: Record Question
    this.elements.btnRecord1.addEventListener('click', () => this.handleRecord1Toggle());

    // Step 2: Play 1st Reversed Audio
    this.elements.btnPlayRev1.addEventListener('click', () => this.handlePlayRev1());

    // Step 3: Record Challenge
    this.elements.btnRecord2.addEventListener('click', () => this.handleRecord2Toggle());

    // Step 4: Play 2nd Reversed (Restored) Audio
    this.elements.btnPlayRev2.addEventListener('click', () => this.handlePlayRev2());

    // Judgment
    this.elements.btnSuccess.addEventListener('click', () => this.handleSuccess());
    this.elements.btnFail.addEventListener('click', () => this.handleFail());

    // Reset & Modal
    this.elements.btnReset.addEventListener('click', () => this.resetGame());
    this.elements.btnModalClose.addEventListener('click', () => this.closeModal());
  }

  // --- UI State Machine Controller ---
  updateUIState() {
    // Card Focus / Disabled States according to USER_FLOW.md
    switch (this.currentState) {
      case State.IDLE:
        this.setCardActive(this.elements.cardStep1, true);
        this.setCardActive(this.elements.cardStep2, false);
        this.setCardActive(this.elements.cardStep3, false);
        this.setCardActive(this.elements.cardStep4, false);

        this.setButtonState(this.elements.btnRecord1, true, '🎙️ 문제 녹음 시작');
        this.setButtonState(this.elements.btnPlayRev1, false, '▶️ 1차 거꾸로 들려주기');
        this.setButtonState(this.elements.btnRecord2, false, '🎙️ 따라하기 녹음 시작');
        this.setButtonState(this.elements.btnPlayRev2, false, '▶️ 2차 복원 음성 재생');
        this.elements.resultActions.style.display = 'none';
        break;

      case State.REC1_DONE:
        this.setCardActive(this.elements.cardStep1, true);
        this.setCardActive(this.elements.cardStep2, true);
        this.setCardActive(this.elements.cardStep3, true);
        this.setCardActive(this.elements.cardStep4, false);

        this.setButtonState(this.elements.btnRecord1, true, '🔄 문제 다시 녹음');
        this.setButtonState(this.elements.btnPlayRev1, true, '▶️ 1차 거꾸로 들려주기');
        this.setButtonState(this.elements.btnRecord2, true, '🎙️ 따라하기 녹음 시작');
        this.setButtonState(this.elements.btnPlayRev2, false, '▶️ 2차 복원 음성 재생');
        this.elements.resultActions.style.display = 'none';
        break;

      case State.REC2_DONE:
        this.setCardActive(this.elements.cardStep1, true);
        this.setCardActive(this.elements.cardStep2, true);
        this.setCardActive(this.elements.cardStep3, true);
        this.setCardActive(this.elements.cardStep4, true);

        this.setButtonState(this.elements.btnRecord1, true, '🔄 문제 다시 녹음');
        this.setButtonState(this.elements.btnPlayRev1, true, '▶️ 1차 거꾸로 들려주기');
        this.setButtonState(this.elements.btnRecord2, true, '🔄 따라하기 다시 녹음');
        this.setButtonState(this.elements.btnPlayRev2, true, '▶️ 2차 복원 음성 재생');
        this.elements.resultActions.style.display = 'grid';
        break;

      case State.RESULT:
        this.setCardActive(this.elements.cardStep1, true);
        this.setCardActive(this.elements.cardStep2, true);
        this.setCardActive(this.elements.cardStep3, true);
        this.setCardActive(this.elements.cardStep4, true);
        this.elements.resultActions.style.display = 'grid';
        break;
    }
  }

  setCardActive(cardElement, isActive) {
    if (isActive) {
      cardElement.classList.add('active');
      cardElement.classList.remove('disabled');
    } else {
      cardElement.classList.remove('active');
      cardElement.classList.add('disabled');
    }
  }

  setButtonState(button, enabled, text) {
    button.disabled = !enabled;
    button.textContent = text;
  }

  // --- Step 1: Record Question ---
  async handleRecord1Toggle() {
    if (this.engine.isRecording) {
      // Stop recording
      try {
        this.elements.statusStep1.textContent = '녹음 변환 중...';
        this.originalBuffer = await this.engine.stopRecording();
        this.firstReversedBuffer = this.engine.reverseAudioBuffer(this.originalBuffer);
        
        this.stopVisualizer();
        this.elements.statusStep1.textContent = '녹음 완료! (Step 2로 이동하세요)';
        this.elements.btnRecord1.classList.remove('btn-recording');

        this.currentState = State.REC1_DONE;
        this.updateUIState();
      } catch (err) {
        console.error(err);
        alert('녹음 처리 중 오류가 발생했습니다: ' + err.message);
        this.elements.statusStep1.textContent = '오류 발생';
      }
    } else {
      // Start recording
      try {
        await this.engine.startRecording((analyser) => {
          this.startVisualizer(this.elements.canvasStep1, analyser);
        });
        this.elements.statusStep1.textContent = '🎙️ 원본 제시어를 말하세요...';
        this.elements.btnRecord1.textContent = '⏹️ 녹음 중지';
        this.elements.btnRecord1.classList.add('btn-recording');
      } catch (err) {
        console.error(err);
        alert('마이크 접근 권한이 필요합니다. 브라우저 설정에서 마이크를 허용해 주세요.');
      }
    }
  }

  // --- Step 2: Play 1st Reversed Audio ---
  handlePlayRev1() {
    if (!this.firstReversedBuffer) return;

    if (this.engine.isPlaying) {
      this.engine.stopPlayback();
      this.stopVisualizer();
      this.elements.statusStep2.textContent = '재생 일시 중지';
      this.elements.btnPlayRev1.textContent = '▶️ 1차 거꾸로 들려주기';
    } else {
      this.elements.statusStep2.textContent = '🔊 거꾸로 재생 중... 들어보고 똑같이 따라해보세요!';
      this.elements.btnPlayRev1.textContent = '⏹️ 재생 중지';

      this.engine.playBuffer(this.firstReversedBuffer, () => {
        this.stopVisualizer();
        this.elements.statusStep2.textContent = '재생 완료!';
        this.elements.btnPlayRev1.textContent = '▶️ 1차 거꾸로 들려주기';
      });

      if (this.engine.analyser) {
        this.startVisualizer(this.elements.canvasStep2, this.engine.analyser);
      }
    }
  }

  // --- Step 3: Record Challenge ---
  async handleRecord2Toggle() {
    if (this.engine.isRecording) {
      // Stop recording challenge
      try {
        this.elements.statusStep3.textContent = '녹음 변환 중...';
        this.challengeBuffer = await this.engine.stopRecording();
        this.secondReversedBuffer = this.engine.reverseAudioBuffer(this.challengeBuffer);

        this.stopVisualizer();
        this.elements.statusStep3.textContent = '따라하기 녹음 완료! (Step 4에서 복원해 보세요)';
        this.elements.btnRecord2.classList.remove('btn-recording');

        this.currentState = State.REC2_DONE;
        this.updateUIState();
      } catch (err) {
        console.error(err);
        alert('녹음 처리 중 오류가 발생했습니다.');
        this.elements.statusStep3.textContent = '오류 발생';
      }
    } else {
      // Start recording challenge
      try {
        await this.engine.startRecording((analyser) => {
          this.startVisualizer(this.elements.canvasStep3, analyser);
        });
        this.elements.statusStep3.textContent = '🎙️ 거꾸로 들린 소리를 똑같이 따라 말하세요!';
        this.elements.btnRecord2.textContent = '⏹️ 녹음 중지';
        this.elements.btnRecord2.classList.add('btn-recording');
      } catch (err) {
        console.error(err);
        alert('마이크 접근 권한이 필요합니다.');
      }
    }
  }

  // --- Step 4: Play 2nd Reversed (Restored) Audio ---
  handlePlayRev2() {
    if (!this.secondReversedBuffer) return;

    if (this.engine.isPlaying) {
      this.engine.stopPlayback();
      this.stopVisualizer();
      this.elements.statusStep4.textContent = '재생 중지';
      this.elements.btnPlayRev2.textContent = '▶️ 2차 복원 음성 재생';
    } else {
      this.elements.statusStep4.textContent = '🔊 복원 음성 재생 중... 원래 단어로 들리는지 확인하세요!';
      this.elements.btnPlayRev2.textContent = '⏹️ 재생 중지';

      this.engine.playBuffer(this.secondReversedBuffer, () => {
        this.stopVisualizer();
        this.elements.statusStep4.textContent = '재생 완료! 성공 / 실패를 판정해 주세요.';
        this.elements.btnPlayRev2.textContent = '▶️ 2차 복원 음성 재생';
      });

      if (this.engine.analyser) {
        this.startVisualizer(this.elements.canvasStep4, this.engine.analyser);
      }
    }
  }

  // --- Judgment ---
  handleSuccess() {
    this.currentState = State.RESULT;
    this.showModal(true);
    this.startConfetti();
  }

  handleFail() {
    alert('아쉽네요! 도전자가 거꾸로 따라하기를 다시 시도하거나 새로운 문제로 도전해보세요! 🔁');
  }

  showModal() {
    this.elements.modalBackdrop.classList.add('show');
  }

  closeModal() {
    this.elements.modalBackdrop.classList.remove('show');
    this.stopConfetti();
  }

  resetGame() {
    this.engine.stopPlayback();
    this.stopVisualizer();
    this.stopConfetti();
    this.closeModal();

    this.originalBuffer = null;
    this.firstReversedBuffer = null;
    this.challengeBuffer = null;
    this.secondReversedBuffer = null;

    this.currentState = State.IDLE;
    this.updateUIState();

    this.elements.statusStep1.textContent = '준비 됨';
    this.elements.statusStep2.textContent = '대기 중';
    this.elements.statusStep3.textContent = '대기 중';
    this.elements.statusStep4.textContent = '대기 중';
  }

  // --- Audio Visualizer ---
  startVisualizer(canvas, analyser) {
    this.stopVisualizer();
    if (!canvas || !analyser) return;

    const ctx = canvas.getContext('2d');
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      this.visualizerAnimationFrame = requestAnimationFrame(draw);
      analyser.getByteFrequencyData(dataArray);

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const barWidth = (canvas.width / bufferLength) * 2.5;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const barHeight = (dataArray[i] / 255) * canvas.height;
        ctx.fillStyle = `hsl(${i * 4 + 220}, 80%, 60%)`;
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
        x += barWidth + 1;
      }
    };

    draw();
  }

  stopVisualizer() {
    if (this.visualizerAnimationFrame) {
      cancelAnimationFrame(this.visualizerAnimationFrame);
      this.visualizerAnimationFrame = null;
    }
  }

  // --- Confetti Celebration ---
  startConfetti() {
    const canvas = this.elements.confettiCanvas;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ['#6366f1', '#ec4899', '#10b981', '#f59e0b', '#3b82f6'];
    this.particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      speedY: Math.random() * 3 + 2,
      speedX: Math.random() * 2 - 1,
      rotation: Math.random() * 360,
      rotSpeed: Math.random() * 10 - 5
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      this.particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.rotation += p.rotSpeed;

        if (p.y > canvas.height) {
          p.y = -10;
          p.x = Math.random() * canvas.width;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      });

      this.confettiAnimationFrame = requestAnimationFrame(render);
    };

    render();
  }

  stopConfetti() {
    if (this.confettiAnimationFrame) {
      cancelAnimationFrame(this.confettiAnimationFrame);
      this.confettiAnimationFrame = null;
    }
    if (this.elements.confettiCanvas) {
      const ctx = this.elements.confettiCanvas.getContext('2d');
      ctx.clearRect(0, 0, this.elements.confettiCanvas.width, this.elements.confettiCanvas.height);
    }
  }
}

// Instantiate on DOM Loaded
document.addEventListener('DOMContentLoaded', () => {
  const app = new ReverseVoiceApp();
  app.init();
});
