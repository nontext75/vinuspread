require('dotenv').config({ path: '.env.local' });

const TelegramBot = require('node-telegram-bot-api');

async function checkConnection() {
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    
    console.log('🔍 연결 상태 재확인...');
    console.log('🔑 토큰:', botToken ? '있음' : '없음');
    console.log('🆔 챗 ID:', chatId ? chatId : '없음');
    
    if (!botToken || !chatId) {
        console.log('❌ 설정 정보 부족');
        return;
    }
    
    try {
        const bot = new TelegramBot(botToken);
        
        // 1. 봇 정보 확인
        const botInfo = await bot.getMe();
        console.log('✅ 봇:', botInfo.username);
        
        // 2. 챗에 메시지 보내기
        console.log('📤 메시지 재전송...');
        
        // 다양한 형식으로 메시지 시도
        const messages = [
            '🤖 VINUSPREAD 봇 다시 테스트!',
            '✅ 텔레그램 연동 확인!',
            '🦾 지니 여기 있어요! 💋'
        ];
        
        for (const msg of messages) {
            try {
                await bot.sendMessage(chatId, msg);
                console.log('✅ 메시지 전송 성공:', msg);
                break;
            } catch (error) {
                console.log('❌ 실패:', msg, error.message);
            }
        }
        
    } catch (error) {
        console.log('❌ 전체 에러:', error.message);
        
        if (error.response) {
            console.log('에러 응답:', error.response.body);
        }
    }
}

checkConnection();