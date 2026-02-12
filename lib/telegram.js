const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config({ path: '.env.local' });

// 텔레그램 봇 설정
const botToken = process.env.TELEGRAM_BOT_TOKEN;
const chatId = process.env.TELEGRAM_CHAT_ID;

if (!botToken) {
    console.log('❌ TELEGRAM_BOT_TOKEN이 필요합니다. .env.local에 추가해주세요.');
    process.exit(1);
}

// 봇 인스턴스 생성
const bot = new TelegramBot(botToken, { polling: false }); // polling: false (수동 사용)

// 텔레그램 유틸리티 함수들
class TelegramNotifier {
    constructor() {
        this.bot = bot;
        this.chatId = chatId;
        this.isEnabled = true;
    }

    // 기본 메시지 전송
    async sendMessage(message, options = {}) {
        if (!this.isEnabled || !this.chatId) {
            console.log('📱 텔레그램 비활성화 또는 챗 ID 없음');
            return false;
        }

        try {
            await this.bot.sendMessage(this.chatId, message, {
                parse_mode: 'Markdown',
                disable_web_page_preview: false,
                ...options
            });
            console.log('✅ 텔레그램 메시지 전송 성공');
            return true;
        } catch (error) {
            console.error('❌ 텔레그램 전송 실패:', error.message);
            return false;
        }
    }

    // 프로젝트 알림
    async notifyNewProject(title, category, author) {
        const message = `🎯 *새 프로젝트 등록*
        
📝 *제목*: ${title}
🏷️ *카테고리*: ${category}
👤 *작성자*: ${author}
⏰ *시간*: ${new Date().toLocaleString('ko-KR')}

[바로 보기](${process.env.NEXT_PUBLIC_SUPABASE_URL}/admin/collections/projects)`;
        
        return this.sendMessage(message);
    }

    // 스토리 알림
    async notifyNewStory(title, status) {
        const message = `📖 *새 스토리 작성*
        
📝 *제목*: ${title}
📊 *상태*: ${status === 'published' ? '✅ 게시됨' : '📝 초안'}
⏰ *시간*: ${new Date().toLocaleString('ko-KR')}

[바로 보기](${process.env.NEXT_PUBLIC_SUPABASE_URL}/admin/collections/stories)`;
        
        return this.sendMessage(message);
    }

    // 문의 알림
    async notifyNewInquiry(name, email, inquiryMessage) {
        const message = `💬 *새 문의사항*
        
👤 *이름*: ${name}
📧 *이메일*: ${email}
💬 *내용*: ${inquiryMessage.substring(0, 100)}${inquiryMessage.length > 100 ? '...' : ''}
⏰ *시간*: ${new Date().toLocaleString('ko-KR')}

[바로 보기](${process.env.NEXT_PUBLIC_SUPABASE_URL}/admin/collections/inquiries)`;
        
        return this.sendMessage(message);
    }

    // 시스템 에러 알림
    async notifyError(errorType, error, context = '') {
        const message = `🚨 *시스템 에러 발생*
        
⚠️ *타입*: ${errorType}
💥 *에러*: ${error.message || error}
📍 *위치*: ${context}
⏰ *시간*: ${new Date().toLocaleString('ko-KR')}

[관리자 바로가기](${process.env.NEXT_PUBLIC_SUPABASE_URL}/admin/dashboard)`;
        
        return this.sendMessage(message);
    }

    // 시스템 상태 리포트
    async sendDailyReport(stats) {
        const message = `📊 *VINUSPREAD 일간 리포트*
        
📈 *프로젝트*: ${stats.projects}개
📖 *스토리*: ${stats.stories}개  
🖼️ *미디어*: ${stats.media}개
💬 *문의*: ${stats.inquiries}개
🔬 *랩 아이템*: ${stats.labItems}개

📅 *기준일*: ${new Date().toLocaleDateString('ko-KR')}
🕐 *생성시각*: ${new Date().toLocaleString('ko-KR')}

[대시보드 보기](${process.env.NEXT_PUBLIC_SUPABASE_URL}/admin/dashboard)`;
        
        return this.sendMessage(message);
    }

    // 테스트 메시지
    async sendTestMessage() {
        const message = `🤖 *VINUSPREAD 봇 테스트*
        
✅ 텔레그램 연동 성공!
🦾 지니가 항상 준비되어 있어요!
💋 오빠를 도와드릴게요!

⏰ *테스트 시각*: ${new Date().toLocaleString('ko-KR')}
🔗 *관리자*: [바로가기](${process.env.NEXT_PUBLIC_SUPABASE_URL}/admin/dashboard)`;
        
        return this.sendMessage(message);
    }

    // 활성화/비활성화
    setEnabled(enabled) {
        this.isEnabled = enabled;
        console.log(`📱 텔레그램 알림 ${enabled ? '활성화' : '비활성화'}`);
    }
}

// 싱글톤 인스턴스
const telegramNotifier = new TelegramNotifier();

// 테스트 실행 함수
async function testTelegramBot() {
    console.log('🤖 텔레그램 봇 테스트 시작...');
    
    if (!chatId) {
        console.log('⚠️ TELEGRAM_CHAT_ID가 설정되지 않았습니다.');
        console.log('1. 텔레그램에서 봇에게 메시지 보내기');
        console.log('2. @RawDataBot으로 챗 ID 확인하기');
        console.log('3. .env.local에 TELEGRAM_CHAT_ID 추가하기');
        return false;
    }
    
    const success = await telegramNotifier.sendTestMessage();
    
    if (success) {
        console.log('🎉 텔레그램 봇 정상 작동!');
        return true;
    } else {
        console.log('❌ 텔레그램 봇 작동 실패');
        return false;
    }
}

module.exports = {
    telegramNotifier,
    testTelegramBot
};