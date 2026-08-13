# 📋 리버스 보이스 (Reverse Voice) 향후 개발 과제 (TODO List)

본 문서는 서비스 운영 후 기능 고도화 및 품질 개선을 위해 나중에 반영할 과제와 가이드를 정리한 리스트입니다.

---

## 1. 🎙️ 주변 소음 개선 및 오디오 필터링 (Noise Reduction)

주변 소음이 심한 야외, 파티룸, 엠티(MT) 장소에서 녹음 및 채점 정확도를 높이기 위한 개선 방안입니다.

### A. MediaTrackConstraints 브라우저 노이즈 억제 칩셋 활용
- `js/audio.js` 마이크 스트림 요청 시 브라우저 내장 하드웨어 노이즈 캔슬링 옵션 지정:
  ```javascript
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: {
      echoCancellation: true,  // 에코(울림) 제거
      noiseSuppression: true,  // 주변 잡음 억제 (Noise Suppression)
      autoGainControl: true    // 자동 입력 볼륨 이득 제어
    }
  });
  ```

### B. 사람 음성 대역 통과 필터 (BiquadFilterNode Bandpass)
- 인간의 목소리 주파수 대역(약 80Hz ~ 3,500Hz) 이외의 고주파 바람 소리나 저주파 기계 웅웅거림을 컷팅하는 Web Audio API 필터 연결:
  ```javascript
  const biquadFilter = this.audioCtx.createBiquadFilter();
  biquadFilter.type = "bandpass";
  biquadFilter.frequency.value = 1000; // 1kHz 중심 주파수
  biquadFilter.Q.value = 0.5;          // 음성 대역폭 지정
  ```

### C. 노이즈 게이트 & 동적 임계값 (Noise Gate)
- `js/scorer.js`의 `trimSilence` 알고리즘에 마이크 노이즈 Floor 측정 기능을 도입하여 일정 소음 레벨 이하의 백그라운드 잡음을 자동으로 0(무음)으로 깎아내는 처리 추가.

### D. 주변 소음 감지 경고 UI (Noise Warning Banner)
- 녹음 시작 직후 주변 소음 레벨을 감지하여 노이즈가 과도하게 클 경우 경고 문구 노출:
  - `"⚠️ 주변 소음이 큽니다! 스마트폰 마이크에 입을 가깝게 대고 말씀하세요."`

---

## 2. 📢 구글 애드센스 광고 연동 현황 (AdSense Integration)

- **게시자 ID**: `pub-3819448456075603` 연동 완료 (`index.html`, `ads.txt`)
- **상세 운용 가이드**: 자세한 서브도메인 등록 방법 및 향후 절차는 [ADSENSE_GUIDE.md](file:///home/tramp/Projects/ReversVoice/Doc/ADSENSE_GUIDE.md) 문서를 참고하세요.
- **다음 할 일**:
  1. `artractive.pe.kr` 메인 도메인 애드센스 심사 통과 (초록색 '준비됨' 상태 확인)
  2. 애드센스 콘솔 > [사이트] > [artractive.pe.kr] > [서브도메인 세부정보]에서 `rv.artractive.pe.kr` 등록


---

## 3. 📲 SNS 공유 & 결과 자랑 기능 (Social Share)

- 채점 완료 모달에서 점수(예: `SSS등급 95점`)와 함께 결과 이미지 및 링크 공유 기능 추가.
- 카카오톡 공유 API 및 Web Share API (`navigator.share`) 연동.

---

## 4. 🌐 커스텀 도메인 & HTTPS 연결

- 개인 커스텀 도메인 연결 시 GitHub Pages Repository `Settings > Pages`에서 CNAME 설정.
- Enforce HTTPS 옵션 켜짐 상태 확인 (마이크 권한 확보 필수).
