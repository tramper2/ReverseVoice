# 🎙️ 리버스 보이스 (Reverse Voice)

> **거꾸로 들린 음성을 똑같이 복원하라! 🎙️🔄**  
> 사용자가 제시어를 녹음하고, 리버스(거꾸로) 재생된 음성을 들은 뒤 이를 똑같이 따라 말하여 원래 음성으로 복원시키는 모바일 퍼스트 음성 파티 게임입니다.

[![GitHub Pages Deployment](https://img.shields.io/badge/Deployment-GitHub%20Pages-brightgreen?style=flat-square&logo=github)](https://tramper2.github.io/ReverseVoice/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)

---

## 🌟 주요 특징 (Key Features)

- 📱 **모바일 최적화 UX**: 스마트폰 뷰포트(`100dvh`) 기준 1열 반응형 카드 레이아웃 및 최소 `56px` 높이의 손쉬운 터치 버튼 지원
- 🎧 **Web Audio API 오디오 엔진**: 백엔드 서버 없이 브라우저 단에서 실시간 오디오 녹음 및 채널별 음성 역순(Reverse) 연산 수행
- 💯 **0~100점 음향 유사도 자동 채점**: Step 1(원본)과 Step 4(복원) 오디오의 음색/주파수 스펙트럼 및 DTW(Dynamic Time Warping) 알고리즘 기반 100점 만점 자동 평가
- 🎨 **모던 다크 슬레이트 UI**: 시각적 몰입감을 더하는 시그니처 에셋 이미지 배치 및 AnalyserNode 기반 실시간 Audio Visualizer
- 🎯 **점수별 결과 모달**: 등급 뱃지(SSS~D) 및 맞춤형 피드백 제공, 고득점(75점 이상) 시 펼쳐지는 파티클 폭죽(Confetti) 효과
- 📖 **풍부한 SEO & 콘텐츠**: 게임 가이드(꿀팁 3선), 추천 제시어 50선 단어장, FAQ 5선, 개인정보 처리 안내문 내장
- 🔒 **100% 클라이언트 사이드 보안**: 녹음된 오디오는 서버로 전송되지 않으며 기기 메모리(RAM) 내에서만 안전하게 연산 후 자동 삭제

---

## 🕹️ 게임 플레이 방법 (How to Play)

```
[ Step 1: 문제 녹음 ] ──► [ Step 2: 1차 거꾸로 듣기 ] ──► [ Step 3: 따라하기 녹음 ] ──► [ Step 4: 2차 복원 & 100점 만점 자동 채점 ]
```

1. **Step 1 (문제 녹음)**: 출제자가 마이크에 대고 제시어(예: "안녕하세요")를 녹음합니다.
2. **Step 2 (1차 거꾸로 듣기)**: 시스템이 거꾸로 뒤집은 오디오("요세하녕안")를 들려줍니다. 도전자는 들리는 소리를 기억합니다.
3. **Step 3 (따라하기 녹음)**: 도전자는 거꾸로 들린 묘한 소리를 똑같이 흉내 내어 녹음합니다.
4. **Step 4 (2차 복원 & 자동 채점)**: 도전자의 소리를 다시 뒤집어 재생합니다! 원래 제시어처럼 복원된 음성과 원본 음성을 비교하여 **0점부터 100점까지의 유사도 점수**를 자동으로 채점받습니다!


---

## 🛠️ 기술 스택 (Tech Stack)

- **Frontend**: HTML5, Modern CSS3 (CSS Variables, Safe Area Insets), JavaScript (ES6+ Modules)
- **Audio Processing**: Web Audio API (`AudioContext`, `AudioBuffer`, `AudioBufferSourceNode`), `MediaRecorder` API
- **Hosting**: GitHub Pages (Static Web Hosting)
- **Monetization & Analytics**: Google AdSense 호환 구조 (`ads.txt` 포함)

---

## 📁 프로젝트 구조 (Directory Structure)

```text
ReversVoice/
├── index.html            # 메인 SPA 웹페이지 (게임 카드 + SEO 콘텐츠)
├── ads.txt               # 구글 애드센스 호스팅 파일
├── README.md             # 프로젝트 안내 문서
├── css/
│   └── styles.css        # 모바일 뷰포트(100dvh), 다크 슬레이트 테마, 버튼 스타일
├── js/
│   ├── audio.js          # Web Audio API 오디오 엔진 (녹음 및 리버스 알고리즘)
│   └── app.js            # UI 상태 머신, 파형 Visualizer, 축하 모달 로직
├── images/               # 디자인 이미지 에셋 5종
│   ├── herobanner.JPG
│   ├── step1-record.jfif
│   ├── step2-reverse.jfif
│   ├── step3-waveform.jfif
│   └── result-trophy.jfif
└── Doc/                  # 프로젝트 요구사항 및 사양서 (PRD, TRD, USER_FLOW 등)
```

---

## 🚀 배포 링크 (Live Demo)

- **GitHub Repository**: [https://github.com/tramper2/ReverseVoice](https://github.com/tramper2/ReverseVoice)
- **Live Demo**: [https://tramper2.github.io/ReverseVoice/](https://tramper2.github.io/ReverseVoice/)

---

## 🔒 개인정보 처리 안내 (Privacy)

본 서비스는 사용자의 음성 데이터를 포함한 어떠한 개인정보도 외부 서버로 수집하거나 전송하지 않습니다. 모든 오디오 처리는 사용자의 브라우저 메모리 상에서만 일시적으로 수행되며, 페이지 새로고침 또는 게임 리셋 시 완벽히 소멸됩니다.

---

© 2026 **Reverse Voice Game**. Released under the [MIT License](LICENSE).
