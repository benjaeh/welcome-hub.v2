const fs = require('fs');

const translations = [
  { lang: 'en', msg: 'We couldn\'t submit your check-in right now.', heading: 'What\'s on today', btn: 'Back to Welcome Hub' },
  { lang: 'es', msg: 'No pudimos enviar tu check-in en este momento.', heading: 'Agenda de hoy', btn: 'Volver al Centro de Bienvenida' },
  { lang: 'zh', msg: '目前无法提交您的签到。', heading: '今日活动', btn: '返回欢迎中心' },
  { lang: 'de', msg: 'Dein Check-in konnte gerade nicht gesendet werden.', heading: 'Heutiges Programm', btn: 'Zurück zum Welcome Hub' },
  { lang: 'fr', msg: 'Impossible d\'envoyer votre check-in pour le moment.', heading: 'Programme du jour', btn: 'Retour au Centre d\'Accueil' },
  { lang: 'it', msg: 'Non siamo riusciti a inviare il tuo check-in ora.', heading: 'Cosa succede oggi', btn: 'Torna all\'Hub di Benvenuto' },
  { lang: 'pt', msg: 'Não conseguimos enviar seu check-in agora.', heading: 'Programação de hoje', btn: 'Voltar ao Hub de Bienvenida' },
  { lang: 'ko', msg: '지금은 체크인을 전송할 수 없습니다.', heading: '오늘의 일정', btn: '환영 허브로 돌아가기' },
  { lang: 'ja', msg: '現在チェックインを送信できません。', heading: '今日の予定', btn: 'ウェルカムハブに戻る' },
  { lang: 'hi', msg: 'अभी आपका चेक-इन सबमिट नहीं हो सका।', heading: 'आज क्या हो रहा है', btn: 'स्वागत हब पर वापस जाएं' },
  { lang: 'ne', msg: 'यो बेला चेक-इन पठाउन सकिएन।', heading: 'आजको कार्यक्रम', btn: 'स्वागत केन्द्रमा फर्किनुहोस्' }
];

const content = fs.readFileSync('./app/i18n.ts', 'utf8');
const lines = content.split('\r\n');

// Process each language
translations.forEach(t => {
  const idx = lines.findIndex(l => l.includes('formErrorSubmission:') && l.includes(t.msg));
  if (idx >= 0 && idx + 1 < lines.length && lines[idx + 1].includes('whatsOnHeading:')) {
    lines.splice(idx + 1, 0, `    btnBackToWelcome: "${t.btn}",`);
    console.log(`Added ${t.lang} translation at line ${idx + 2}`);
  } else {
    console.log(`Could not find insertion point for ${t.lang}`);
  }
});

fs.writeFileSync('./app/i18n.ts', lines.join('\r\n'), 'utf8');
console.log('All translations updated successfully!');
