# Product Requirement Document (PRD) - Reverse Voice Game

## 1. Executive Summary
사용자가 단어나 문장을 녹음하고, 리버스(거꾸로) 재생된 음성을 들은 뒤 이를 똑같이 따라 말하여 다시 원본 음성으로 복원시키는 웹 기반 레크리에이션 게임입니다. 별도의 백엔드 없이 Client-side(Web Audio API) 기술만으로 동작하며, GitHub Pages 및 커스텀 도메인 환경에 최적화하여 배포합니다.

## 2. Key Objectives & Target Audience
- **Target Audience**: 모임, 파티, 방송 스트리밍 등에서 스마트폰으로 손쉽게 즐길 수 있는 음성 파티 게임을 찾는 사용자.
- **Platform**: 모바일 웹 브라우저 최적화 (Mobile-First SPA).
- **Monetization & Approval**: 구글 애드센스(Google AdSense) '가치 없는 콘텐츠' 사유 거절을 방지하기 위해 풍부한 텍스트 가이드 및 FAQ를 내장.

## 3. Core Features & User Journey
1. **[Header & Banner]**: 브랜드 헤더 및 모바일 전용 배너 에셋 노출.
2. **[Step 1: 문제 녹음]**: 출제자가 제시어(예: "안녕하세요")를 마이크로 녹음.
3. **[Step 2: 1차 리버스 들어보기]**: 시스템이 거꾸로 뒤집은 음성("요세하녕안")을 플레이어들에게 재생.
4. **[Step 3: 따라하기 녹음]**: 도전자가 거꾸로 들린 소리("요세하녕안")를 들리는 대로 녹음.
5. **[Step 4: 2차 리버스 검증 & 판정]**: 도전자 음성을 다시 거꾸로 뒤집어 재생("안녕하세요" 복원 확인) 후 현장 플레이어가 [성공🎯] / [실패❌] 판단.
6. **[SEO/Content Section]**: 게임 가이드, 추천 제시어 50선, 마이크 사용 FAQ, 개인정보처리방침 안내.

## 4. Mobile UX & Ad Layout Rules
- **Mobile-First Layout**: 1열 세로 스크롤, 뷰포트 높이 `100dvh` 지원, 모바일 노치 영역(`safe-area-inset`) 반영.
- **Touch Targets**: 모든 터치 가능한 버튼은 최소 높이 `56px` 이상 확보.
- **Ad Slots**: 상단 헤더 하단 및 메인 게임 카드의 하단 영역에 구글 애드센스 광고용 배너 스롯 (`<div class="ad-container">`) 확보.