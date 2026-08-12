# User Flow & UI State Machine

## 1. Mobile User Journey Flow
[ 접속 & 마이크 권한 승인 ]
│
▼
[ STEP 1: 문제 녹음 ] ──(녹음 버튼 클릭)──► [ 원본 발성 ] ──(중지)──► [ 녹음 완료 ]
│
▼
[ STEP 2: 1차 거꾸로 듣기 ] ──(재생 버튼 클릭)──► [ 리버스 음성 재생 ]
│
▼
[ STEP 3: 따라하기 녹음 ] ──(녹음 버튼 클릭)──► [ 1차 리버스 들린대로 발성 ] ──(중지)
│
▼
[ STEP 4: 2차 리버스 검증 ] ──(재생 버튼 클릭)──► [ 복원 음성 재생 ]
│
├─► [ 성공 🎯 ] ──► 축하 애니메이션 & 트로피 모달
└─► [ 실패 ❌ ] ──► 재시도 안내

## 2. UI Card Focus & Button States
모바일 화면 스크롤 시 현재 진행 중인 스텝 카드에 포커스가 맞춰지며, 비활성화 단계는 Opacity 및 pointer-events 제어가 적용됩니다.

| State | Focused Card | Record Btn 1 | Play Rev 1 | Record Btn 2 | Play Rev 2 | Result Btns |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `IDLE` | Step 1 Card | 활성화 (56px) | 비활성화 | 비활성화 | 비활성화 | 숨김 |
| `REC1_DONE` | Step 1/2 Card | 활성화 (재녹음)| 활성화 (56px) | 활성화 (56px) | 비활성화 | 숨김 |
| `REC2_DONE` | Step 3/4 Card | 활성화 | 활성화 | 활성화 (재녹음)| 활성화 (56px) | 표시 |
| `RESULT` | Step 4 Card | 활성화 | 활성화 | 활성화 | 활성화 | 표시 (모달) |