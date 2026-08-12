# Technical Requirement Document (TRD) - Reverse Voice Game

## 1. Tech Stack & Deployment
- **Frontend**: Vanilla HTML5, Modern JavaScript (ES6+ Modules), Custom CSS3 / CSS Variables
- **Hosting**: GitHub Pages (Static Hosting) + Personal Custom Domain Connection
- **Audio Processing**: Web Audio API (`AudioContext`, `AudioBuffer`, `AudioBufferSourceNode`), `MediaRecorder` API
- **Ad & Analytics**: Google AdSense Script Integration (`ads.txt` integration)

## 2. Project Directory Structure
## 3. Audio Processing Logic
## 4. HTTPS & AdSense Setup
    getUserMedia는 보안 컨텍스트(HTTPS)에서만 동작합니다. GitHub Pages의 Enforce HTTPS 옵션을 활성화합니다.

    프로젝트 루트 경로의 ads.txt가 https://<your-custom-domain>/ads.txt로 접근 가능해야 합니다.
    