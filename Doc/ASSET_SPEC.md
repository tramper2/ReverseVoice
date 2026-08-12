# Design System & Asset Specification

## 1. Visual Theme & Color Palette (Dark Theme Base)
- **Primary Color**: `#6366F1` (Indigo - 녹음 및 액션 버튼)
- **Secondary Color**: `#EC4899` (Pink - 리버스 재생 버튼)
- **Success Color**: `#10B981` (Emerald Green - 성공 버튼)
- **Danger Color**: `#EF4444` (Red - 녹음 중 펄스 및 실패 버튼)
- **Background**: `#0F172A` (Dark Slate)
- **Card Background**: `#1E293B` (Slate)
- **Text Color**: `#F8FAFC` (Main Text), `#94A3B8` (Sub Text)

## 2. Image Assets Spec (`/images/`)
텍스트 위주의 지루함을 피하고 모바일 시각적 몰입감을 확보하기 위해 카드별 이미지를 배치합니다.

| 파일명 | 배치 위치 | 설명 및 규격 |
| :--- | :--- | :--- |
| `herobanner.JPG` | Main Header 상단 | 모바일 상단 믹스 그래픽 일러스트 (Full Width) |
| `step1-record.jfif` | Step 1 카드 내부 | 마이크에 대고 소리를 내는 음성 레코딩 일러스트 |
| `step2-reverse.jfif`| Step 2 카드 내부 | 오디오가 거꾸로 뒤집히는 리버스 웨이브 일러스트 |
| `step3-waveform.jfif`| Step 3 카드 내부 | 음성 오디오 파형 피드백 일러스트 |
| `result-trophy.jfif`| Step 4 / 성공 모달 | 게임 성공 판정 시 노출되는 승리 트로피 그래픽 |

## 3. SEO & AdSense Content Components (`index.html` 하단)
애드센스 심사 통과를 위해 게임 카드 영역 하단에 아래 HTML/텍스트 섹션을 반드시 포함합니다.

1. **`<section class="game-guide">`**: 리버스 음성 게임 규칙 및 잘 맞히는 꿀팁 (텍스트 500자 이상).
2. **`<section class="word-list">`**: 예시 제시어 단어장 (쉬움/보통/매우 어려움 카테고리별 50개 단어 배열).
3. **`<section class="faq-section">`**: 모바일 마이크 권한 허용 방법 및 자주 묻는 질문 5선.
4. **`<section class="privacy-notice">`**: "본 앱은 음성 데이터를 서버로 전송하거나 저장하지 않으며 브라우저 메모리 내에서만 연산됩니다" 개인정보 보호 안내문.