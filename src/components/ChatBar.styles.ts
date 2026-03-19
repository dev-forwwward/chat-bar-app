// AUTO-GENERATED — do not edit directly.
// Edit src/components/ChatBar.css, then run: npm run sync-styles
export const chatBarStyles = `@font-face {
  font-family: Atypbldisplay;
  src: url("https://cdn.prod.website-files.com/6850235ccb1257ecee2e0e0d/68502eb327be5eb748e80466_AtypBLDisplay-Medium.woff2") format("woff2");
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}

:root {
  --Seashell: #FDEEE9;
  --Maize: #F8EF78;
  --persian-pink: #ff99cd;
  --chat-bg: #282828;
  --bar-bg: #282828;
  --text-primary: #ececec;
  --text-secondary: #8e8ea0;
  --border: #383838;
  --input-bg: rgba(255, 255, 255, 0.05);
}

.aiBar *,
.aiBar *::before,
.aiBar *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.aiBar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 99991;
  height: 60px;
  display: flex;
  flex-direction: column;
  transition: height .5s cubic-bezier(.4, 0, .2, 1);
  overflow: hidden;
  background: var(--chat-bg);
}

.aiBar.open {
  height: 100vh;
}

.aiTopbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  flex-shrink: 0;
  background: var(--chat-bg);
  height: 0;
  overflow: hidden;
  opacity: 0;
  transition: height .3s ease, opacity .3s ease, padding .3s ease;
}

.aiBar.open .aiTopbar {
  height: 56px;
  padding: 0 24px;
  opacity: 1;
}

.aiTopbarLogo {
  font-family: Atypbldisplay, Georgia, sans-serif;
  font-size: 18px;
  font-weight: 500;
  letter-spacing: 0.5px;
  color: #fff;
  text-transform: uppercase;
}

.chatPanel {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  font-family: 'Inter', sans-serif;
  opacity: 0;
  transition: opacity .3s ease .15s;
}

.aiBar.open .chatPanel {
  opacity: 1;
}

.chatPanel,
.chatPanel * {
  font-family: 'Inter', sans-serif;
}

.chatInner {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.barStrip {
  height: 60px;
  min-height: 60px;
  flex-shrink: 0;
  background: var(--bar-bg);
  display: flex;
  align-items: center;
  padding: 0 20px;
  user-select: none;
  position: relative;
}

.aiBar.open .barStrip {
  cursor: default;
}

.auroraBlob {
  transition: opacity .5s ease;
}

.aiBar.open .auroraBlob {
  opacity: 0 !important;
}

.aiBar.open .barStrip::after {
  opacity: 0;
  transition: opacity .5s ease;
}

.barClosedContent {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  padding: 0 20px;
  z-index: 2;
  transition: opacity .25s ease;

  @media screen and (max-width: 767px) {
    justify-content: space-between;
  }
}

.aiBar.open .barClosedContent {
  opacity: 0;
  pointer-events: none;
}

.barOpenContent {
  display: flex;
  align-items: center;
  gap: 12px;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  padding: 0 20px;
  z-index: 2;
  opacity: 0;
  pointer-events: none;
  transition: opacity .3s ease .2s;
}

.aiBar.open .barOpenContent {
  opacity: 1;
  pointer-events: auto;
}

.barOpenLeft {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  margin-right: auto;
}

.barOpenName {
  color: #fff;
  font-size: 1rem;
  font-weight: 400;
  font-family: 'Inter', sans-serif;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 8px;
}

.barOnline {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 0.68rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.45);
}

.barOnlineDot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #4cde80;
  box-shadow: 0 0 6px rgba(76, 222, 128, 0.7);
  animation: onlinePulse 2.5s ease-in-out infinite;
  flex-shrink: 0;
}

@keyframes onlinePulse {

  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.5;
  }
}

.barOpenSettings {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.barStrip::after {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(10, 10, 10, 0.38);
  z-index: 1;
  pointer-events: none;
}

.neoPulse {
  width: 36px;
  height: 36px;
  flex-shrink: 0;
  z-index: 2;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.neoPulseRing {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  position: absolute;
  top: 0;
  left: 0;
  animation: orbitSpin 3s linear infinite;
}

.neoPulseRing::before {
  content: '';
  position: absolute;
  width: 9px;
  height: 9px;
  background: var(--Maize);
  border-radius: 50%;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
}

.neoPulseRing:nth-child(2) {
  animation: orbitSpin 3s linear infinite reverse;
  animation-delay: -1s;
}

.neoPulseRing:nth-child(2)::before {
  background: var(--persian-pink);
  width: 7px;
  height: 7px;
}

.neoPulseRing:nth-child(3) {
  animation: orbitSpin 4s linear infinite;
  animation-delay: -2s;
}

.neoPulseRing:nth-child(3)::before {
  background: #cbdcf4;
  width: 6px;
  height: 6px;
  top: auto;
  bottom: 0;
}

@keyframes orbitSpin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.barText {
  color: rgba(255, 255, 255, 0.9);
  font-size: 1rem;
  font-weight: 500;
  z-index: 2;
  position: relative;
  letter-spacing: 0.2px;
  display: flex;
  align-items: center;
  gap: .75rem;
}

.barTextName {
  color: #fff;
  font-weight: 400;
}

.barTextPowered {
  color: rgba(255, 255, 255, 0.45);
  font-size: 0.68rem;
  font-weight: 400;
  font-family: 'Inter', sans-serif;
}

.barTextPowered a {
  color: rgba(255, 255, 255, 0.45);
  text-decoration: none;
  transition: color .2s;
}

.barTextPowered a:hover {
  color: rgba(255, 255, 255, 0.75);
}

.barQuestions {
  position: relative;
  display: inline-block;
  vertical-align: middle;
  height: 18px;
  min-width: 240px;

  @media (max-width: 767px) {
    display: none;
  }
}

.barQ {
  position: absolute;
  left: 0;
  top: 0;
  color: rgba(255, 255, 255, 0.55);
  font-size: 0.82rem;
  white-space: nowrap;
  line-height: 18px;
  opacity: 0;
  transition: opacity 0.5s ease;
  pointer-events: none;
}

.barQ.barQActive {
  opacity: 1;
}

.neoSend {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background: var(--Maize);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  z-index: 2;
  cursor: pointer;
  /* transition: transform .15s, background .2s;
  animation: sendGlow 3s ease-in-out infinite; */
  margin-left: 20px;
}

/* .neoSend:hover {
  transform: scale(1.1);
  background: var(--Maize);
  animation: none;
  box-shadow: 0 0 0 5px rgba(248,239,120,0.35);
} */
.neoSend svg {
  width: 1.5rem;
  height: 1.5rem;
  /* animation: arrowNudge 3s ease-in-out infinite; */
}

@keyframes sendGlow {

  0%,
  100% {
    box-shadow: 0 0 0 0px rgba(248, 239, 120, 0.5);
  }

  50% {
    box-shadow: 0 0 0 5px rgba(248, 239, 120, 0);
  }
}

/* @keyframes arrowNudge {
  0%,100% { transform: translateY(0px);  }
  40%      { transform: translateY(-2px); }
  60%      { transform: translateY(-2px); }
} */

.chatHeader {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  flex-shrink: 0;
  background: var(--chat-bg);
  position: relative;
}

.chatHeader::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg,
      var(--Maize) 0%,
      var(--persian-pink) 25%,
      #cbdcf4 50%,
      #a8e1b4 75%,
      var(--Maize) 100%);
  background-size: 200% 100%;
  animation: headerLine 3s linear infinite;
}

@keyframes headerLine {
  0% {
    background-position: 0% 0%;
  }

  100% {
    background-position: 200% 0%;
  }
}

.chLeft {
  display: flex;
  align-items: center;
  gap: 10px;
}

.chRetention {
  display: flex;
  align-items: center;
  gap: 5px;
  font-family: 'Inter', sans-serif;
  white-space: nowrap;
  cursor: pointer;
  position: static;
  color: rgba(255, 255, 255, 1);
  transition: color .2s;
  user-select: none;
}

.chRetention:hover {
  color: rgba(255, 255, 255, 0.8);
}

.chRetention.active {
  color: var(--Maize);
}

.chRetention svg {
  width: 1.25rem;
  height: 1.25rem;
  flex-shrink: 0;
}

.chRetentionLabel {
  font-size: 0.7rem;
  font-weight: 400;
  letter-spacing: 0.01em;
}

.retentionPopup {
  display: none;
  position: fixed;
  bottom: 50px;
  right: 120px;
  width: 280px;
  background: #141414;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  padding: 16px 16px 13px;
  z-index: 9999;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.6);
  animation: popupIn 0.18s ease forwards;
}

.retentionPopup.open {
  display: block;
}

@keyframes popupIn {
  from {
    opacity: 0;
    transform: translateY(6px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.retentionPopupTitle {
  font-family: 'Inter', sans-serif;
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: var(--Maize);
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.retentionPopupTitle svg {
  width: 11px;
  height: 11px;
}

.retentionPopupBody {
  font-family: 'Inter', sans-serif;
  font-size: 0.69rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.48);
  line-height: 1.65;
  margin-bottom: 13px;
}

.retentionPopupBody strong {
  color: rgba(255, 255, 255, 0.72);
  font-weight: 500;
}

.retentionDeleteBtn {
  width: 100%;
  background: transparent;
  border: 1px solid rgba(255, 80, 80, 0.3);
  color: rgba(255, 110, 110, 0.65);
  border-radius: 5px;
  padding: 7px 0;
  font-family: 'Inter', sans-serif;
  font-size: 0.68rem;
  font-weight: 500;
  cursor: pointer;
  letter-spacing: 0.02em;
  transition: background .2s, color .2s, border-color .2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.retentionDeleteBtn:hover {
  background: rgba(255, 80, 80, 0.07);
  border-color: rgba(255, 80, 80, 0.55);
  color: rgba(255, 130, 130, 0.9);
}

.retentionDeleteBtn svg {
  width: 11px;
  height: 11px;
}

.retentionDeleteBtn.done {
  border-color: rgba(100, 200, 100, 0.3);
  color: rgba(120, 220, 120, 0.7);
  pointer-events: none;
}

.chName {
  color: rgba(255, 255, 255, 0.55);
  font-size: 0.75rem;
  font-weight: 400;
  font-family: 'Inter', sans-serif;
  letter-spacing: 0.01em;
}

.chModel {
  color: rgba(255, 255, 255, 0.25);
  font-size: 0.68rem;
  margin-top: 2px;
  font-family: 'Inter', sans-serif;
}

.chRight {
  display: flex;
  align-items: center;
  gap: 12px;
}

.chSettingsLabel {
  font-size: 0.65rem;
  font-weight: 500;
  font-family: 'Inter', sans-serif;
  color: rgba(255, 255, 255, 0.2);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  white-space: nowrap;
  user-select: none;
}

.chDivider {
  width: 1px;
  height: 2rem;
  background: rgba(255, 255, 255, 0.1);
  flex-shrink: 0;
}

.chBtn {
  border-radius: 2.9735rem;
  background: var(--Maize);
  display: flex;
  height: 2.5rem;
  padding: 0.75rem 1rem;
  justify-content: center;
  align-items: center;
  gap: 0.25rem;
  border: 2px solid #FFF;

  font-family: 'Inter', sans-serif;
  cursor: pointer;
  transition: border-color .2s, color .2s;
  white-space: nowrap;
}

.chBtn:hover {
  border-color: rgba(255, 255, 255, 0.25);
  background-color: var(--persian-pink);
}

.chEyeBtn {
  position: relative;
}

.chEyeBtn::after {
  content: "Private session — Once activated, your conversation will not be saved or logged on Swisscare's side.";
  position: absolute;
  bottom: calc(100% + 10px);
  right: 0;
  width: 230px;
  background: #141414;
  border: 1px solid rgba(255, 255, 255, 0.07);
  color: rgba(255, 255, 255, 0.6);
  font-family: 'Inter', sans-serif;
  font-size: 0.67rem;
  font-weight: 400;
  line-height: 1.6;
  padding: 10px 13px;
  border-radius: 6px;
  pointer-events: none;
  opacity: 0;
  transform: translateY(4px);
  transition: opacity 0.2s ease, transform 0.2s ease;
  white-space: normal;
  text-align: left;
  z-index: 9999;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.5);
}

.chEyeBtn::before {
  content: '';
  position: absolute;
  bottom: calc(100% + 4px);
  right: 10px;
  border: 5px solid transparent;
  border-top-color: rgba(255, 255, 255, 0.07);
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.2s ease;
  z-index: 9999;
}

.chEyeBtn:hover::after,
.chEyeBtn:hover::before {
  opacity: 1;
  transform: translateY(0);
  transition-delay: 1s;
}

.chEyeBtn {
  background: transparent;
  border: none;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.3);
  width: 26px;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  transition: color .2s, background .2s;
  flex-shrink: 0;
  padding: 0;
}

.chEyeBtn:hover {
  color: rgba(255, 255, 255, 0.6);
  background: rgba(255, 255, 255, 0.05);
}

.chEyeBtn.active {
  color: var(--Maize) !important;
}

.chEyeBtn.active svg {
  filter: drop-shadow(0 0 4px rgba(248, 239, 120, 0.45));
}

.chEyeBtn svg {
  width: 13px;
  height: 13px;
  flex-shrink: 0;
}

.chIconBtn {
  background: transparent;
  border: none;
  cursor: pointer;
  color: rgba(255, 255, 255, 1);
  width: 26px;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  transition: color .2s, background .2s;
  flex-shrink: 0;
  padding: 0;
}

.chIconBtn:hover {
  color: rgba(255, 255, 255, 0.8);
  background: rgba(255, 255, 255, 0.05);
}

.chIconBtn svg {
  width: 1.25rem;
  height: 1.25rem;
}

.chClose {
  width: 26px;
  height: 26px;
  border-radius: 6px;
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: background .2s;
  margin-left: 6px;
}

.chClose:hover {
  background: rgba(255, 255, 255, 0.08);
}

.chClose svg {
  width: 20px;
  height: 20px;
  stroke: rgba(255, 255, 255, 0.6);
  transition: stroke .2s;
}

.chClose:hover svg {
  stroke: rgba(255, 255, 255, 0.95);
}

.chatMessages {
  flex: 1;
  overflow-y: auto;
  padding: 24px 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
  scrollbar-width: thin;
  scrollbar-color: #333 transparent;
}

.chatMessages::-webkit-scrollbar {
  width: 4px;
}

.chatMessages::-webkit-scrollbar-thumb {
  background: #2e2e2e;
  border-radius: 2px;
}

.msgRow {
  display: flex;
  padding: 4px 0;
  animation: fadeup .25s ease;
  max-width: 700px;
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
}

@keyframes fadeup {
  from {
    opacity: 0;
    transform: translateY(5px);
  }

  to {
    opacity: 1;
  }
}

.msgRow.ai .rowContent {
  flex: 1;
  color: #ffffff;
  font-size: 0.93rem;
  line-height: 1.7;
  padding-top: 4px;
  width: 100%;
  font-family: 'Inter', sans-serif;
}

.msgRow.ai .rowContent p {
  margin-bottom: 8px;
}

.msgRow.ai .rowContent p:last-child {
  margin-bottom: 0;
}

.msgLabel {
  font-size: 0.72rem;
  font-weight: 500;
  letter-spacing: 0.02em;
  margin-bottom: 5px;
  font-family: 'Inter', sans-serif;
  color: rgba(255, 255, 255, 0.5);
  padding: 0;
}

.msgRow.user {
  flex-direction: column;
  align-items: flex-end;
  padding-right: 4px;
}

.msgRow.ai {
  flex-direction: column;
  align-items: flex-start;
}

.msgRow.ai .msgLabel {
  padding-left: 0;
  margin-left: 0;
}

.msgActions {
  display: flex;
  gap: .25rem;
  margin-top: 8px;
  align-items: center;
}

.msgAct {
  background: transparent;
  border: none;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.25);
  padding: .35rem;
  display: flex;
  align-items: center;
  transition: color .2s;
  border-radius: 6px;
}

.msgAct:hover {
  color: rgba(255, 255, 255, 0.7);
  background: rgba(255, 255, 255, 0.05);
}

.msgAct svg {
  width: 13px;
  height: 13px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.6;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.msgRow.user {
  justify-content: flex-end;
}

.msgRow.user .rowContent {
  background: var(--input-bg);
  color: #ffffff;
  font-size: 1rem;
  line-height: 1.55;
  font-weight: 400;
  max-width: 80%;
  padding: 12px 18px;
  border-radius: 1.375rem;
  font-family: 'Inter', sans-serif;
}

.typingRow {
  padding: 4px 0;
  max-width: 700px;
  width: 100%;
  margin: 0 auto;
}

.thinkingShimmer {
  display: inline-block;
  font-family: 'Inter', sans-serif;
  font-size: 0.88rem;
  font-weight: 400;
  background: linear-gradient(90deg,
      rgba(255, 255, 255, 0.15) 0%,
      rgba(255, 255, 255, 0.7) 35%,
      rgba(255, 255, 255, 0.15) 65%,
      rgba(255, 255, 255, 0.1) 100%);
  background-size: 300% 100%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: shimmerText 1.8s ease-in-out infinite;
  letter-spacing: 0.01em;
}

@keyframes shimmerText {
  0% {
    background-position: 100% 0%;
  }

  100% {
    background-position: -100% 0%;
  }
}

.chatWelcome {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  padding: 40px 20px;
  gap: 1rem;
}

.chatWelcome.sticky {
  flex: 0;
  justify-content: flex-start;
  padding: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.welcomeInputInner {
  display: flex;
  flex-flow: column;
  align-items: center;
  width: 100%;
  max-width: 34.0625rem;
  margin-top: 1.5rem;
}

.welcomeInputWrap {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.welcomeLogo {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--Maize), #e8d800);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}

.welcomeTitle {
  color: var(--Seashell);
  text-align: center;
  font-family: "SF Pro Display";
  font-size: 2.5rem;
  font-style: normal;
  font-weight: 500;
  line-height: 110%; /* 2.75rem */
  letter-spacing: -0.025rem;
  font-family: Atypbldisplay, Georgia, sans-serif !important;
}

.welcomeSub {
  width: 100%;
  max-width: 26.875rem;
  color: rgba(253, 238, 233, 0.60);
  text-align: center;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: 130%; /* 1.3rem */
  letter-spacing: -0.01rem;
  font-family: Atypbldisplay, Georgia, sans-serif !important;
}

.welcomeChips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
  max-width: 480px;
}

.chip {
  background: #2a2a2a;
  border: 1px solid var(--border);
  color: var(--text-secondary);
  border-radius: 10px;
  padding: 8px 14px;
  font-family: Atypbldisplay, Georgia, sans-serif;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all .2s;
  text-align: left;
  line-height: 1.35;
}

.chip:hover {
  background: #333;
  border-color: #4a4a4a;
  color: var(--text-primary);
}

.chatInputArea {
  flex-shrink: 0;
  padding: 12px 20px 14px;
  background: var(--chat-bg);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.inputBox {
  width: 100%;
  max-width: 34.0625rem;
  background: var(--input-bg);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 12px 14px 12px 18px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
  transition: border-color .3s ease;
  position: relative;
}

.inputBox.privateMode {
  border: 1px dashed rgba(248, 239, 120, 0.35);
  box-shadow: none;
}

.privateBadge {
  position: absolute;
  top: -11px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--Maize);
  color: #111;
  font-family: 'Inter', sans-serif;
  font-size: 0.63rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  padding: 2px 10px 2px 8px;
  border-radius: 20px;
  display: none;
  align-items: center;
  gap: 5px;
  white-space: nowrap;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.3);
}

.privateBadge svg {
  width: 9px;
  height: 9px;
  flex-shrink: 0;
}

.inputBox.privateMode .privateBadge {
  display: flex;
}

.inputBox:focus-within {
  border-color: #4a4a4a;
}

.inputBox textarea {
  flex: 1;
  width: 100%;
  background: transparent;
  border: none;
  outline: none;
  color: var(--text-primary);
  font-family: 'Inter', sans-serif;
  font-size: 0.92rem;
  line-height: 1.5;
  resize: none;
  min-height: 3rem;
  /* max-height: 200px; */
  scrollbar-width: none;
}

.inputBox textarea::-webkit-scrollbar {
  display: none;
}

.inputBox textarea::placeholder {
  color: #555;
}

.inputSend {
  width: 2rem;
  height: 2rem;
  border-radius: 2.5rem;
  flex-shrink: 0;
  background: var(--accent, var(--Maize));
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity .2s, transform .15s;
}

.inputSend:hover {
  opacity: .85;
  /* transform: scale(1.05); */
}

.inputSend:disabled {
  background: rgba(255, 255, 255, 0.20);
  cursor: not-allowed;
  transform: none;
}

.inputSend svg {
  width: 0.875rem;
  height: 0.875rem;
  stroke: #111;
}

.inputSend:disabled svg {
    stroke: rgb(248, 246, 222);
}

.msgRow.ai .rowContent p {
  margin-bottom: 8px;
  color: #ffffff;
}

.msgRow.ai .rowContent p:last-child {
  animation: wordFadeIn 0.18s ease forwards;
}

@keyframes wordFadeIn {
  from {
    opacity: 0.85;
  }

  to {
    opacity: 1;
  }
}

.inputHint {
  color: rgba(255, 255, 255, 0.2);
  font-size: 0.72rem;
  font-family: Inter, sans-serif;
  text-align: center;
  letter-spacing: 0.01em;
  width: 100%;
  display: block;
  margin-top: 8px;
}

.barTextSep {
  color: rgba(255, 255, 255, 0.2);
  margin: 0 2px;
}`
