const fs = require('fs');

const translationUpdates = {
  en: "Back to Welcome Hub",
  es: "Volver al Centro de Bienvenida",
  zh: "返回欢迎中心",
  de: "Zurück zum Welcome Hub",
  fr: "Retour au Centre d'Accueil",
  it: "Torna all'Hub di Benvenuto",
  pt: "Voltar ao Hub de Bienvenida",
  ko: "환영 허브로 돌아가기",
  ja: "ウェルカムハブに戻る",
  hi: "स्वागत हब पर वापस जाएं",
  ne: "स्वागत केन्द्रमा फर्किनुहोस्"
};

const errorMessages = {
  en: "We couldn't submit your check-in right now.",
  es: "No pudimos enviar tu check-in en este momento.",
  zh: "目前无法提交您的签到。",
  de: "Dein Check-in konnte gerade nicht gesendet werden.",
  fr: "Impossible d'envoyer votre check-in pour le moment.",
  it: "Non siamo riusciti a inviare il tuo check-in ora.",
  pt: "Não conseguimos enviar seu check-in agora.",
  ko: "지금은 체크인을 전송할 수 없습니다.",
  ja: "現在チェックインを送信できません。",
  hi: "अभी आपका चेक-इन सबमिट नहीं हो सका।",
  ne: "यो बेला चेक-इन पठाउन सकिएन।"
};

const headings = {
  en: "What's on today",
  es: "Agenda de hoy",
  zh: "今日活动",
  de: "Heutiges Programm",
  fr: "Programme du jour",
  it: "Cosa succede oggi",
  pt: "Programação de hoje",
  ko: "오늘의 일정",
  ja: "今日の予定",
  hi: "आज क्या हो रहा है",
  ne: "आजको कार्यक्रम"
};

let content = fs.readFileSync('./app/i18n.ts', 'utf8');

// Process each language
Object.keys(translationUpdates).forEach(lang => {
  const errorMsg = errorMessages[lang];
  const newKey = `btnBackToWelcome: "${translationUpdates[lang]}"`;
  const heading = headings[lang];
  
  const oldPattern = `formErrorSubmission: "${errorMsg.replace(/"/g, '\\"')}",\r\n    whatsOnHeading: "${heading.replace(/"/g, '\\"')}"`;
  const newPattern = `formErrorSubmission: "${errorMsg.replace(/"/g, '\\"')}",\r\n    ${newKey},\r\n    whatsOnHeading: "${heading.replace(/"/g, '\\"')}"`;
  
  content = content.replace(oldPattern, newPattern);
});

fs.writeFileSync('./app/i18n.ts', content, 'utf8');
console.log('All translations updated successfully!');
