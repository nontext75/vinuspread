require('dotenv').config({ path: '.env.local' });

const TelegramBot = require('node-telegram-bot-api');

async function debugTelegram() {
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    
    console.log('🔍 텔레그램 디버깅 시작...');
    console.log('🔑 토큰:', botToken ? botToken.substring(0, 10) + '...' : '없음');
    console.log('🆔 챗 ID:', chatId || '없음');
    
    if (!botToken) {
        console.log('❌ 토큰이 없습니다');
        return;
    }
    
    if (!chatId) {
        console.log('❌ 챗 ID가 없습니다');
        return;
    }
    
    const bot = new TelegramBot(botToken);
    
    try {
        console.log('📡 봇 정보 확인 중...');
        const botInfo = await bot.getMe();
        console.log('✅ 봇 정보:', botInfo.username);
        
        console.log('📤 테스트 메시지 전송 중...');
        const result = await bot.sendMessage(chatId, '🤖 VINUSPREAD 테스트 메시지! 🦾💋');
        console.log('✅ 메시지 전송 성공!');
        
    } catch (error) {
        console.log('❌ 에러 상세 정보:');
        console.log('에러 코드:', error.code);
        console.log('에러 메시지:', error.message);
        
        if (error.code === 'ETELEGRAM') {
            if (error.message.includes('chat not found')) {
                console.log('💡 해결책:');
                console.log('1. 봇을 초대해야 합니다');
                console.log('2. 봇에게 메시지를 먼저 보내야 합니다');
                console.log('3. 챗 ID가 올바른지 확인해야 합니다');
            }
        }
    }
}

debugTelegram();