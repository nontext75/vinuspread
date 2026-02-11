const { Pool } = require('pg');

// 여러 연결 방식 테스트
const connectionStrings = [
    // 1. Pooler Session Mode (Port 5432)
    'postgresql://postgres.qsdrlwqmvtcczykginoz:vIGqVNuhA4VgS6zF@aws-1-ap-south-1.pooler.supabase.com:5432/postgres',
    
    // 2. Direct Connection
    'postgresql://postgres.qsdrlwqmvtcczykginoz:vIGqVNuhA4VgS6zF@db.qsdrlwqmvtcczykginoz.supabase.co:5432/postgres',
    
    // 3. Pooler Transaction Mode (Port 6543)
    'postgresql://postgres.qsdrlwqmvtcczykginoz:vIGqVNuhA4VgS6zF@aws-1-ap-south-1.pooler.supabase.com:6543/postgres'
];

async function testAllConnections() {
    for (let i = 0; i < connectionStrings.length; i++) {
        const connectionString = connectionStrings[i];
        console.log(`\n🔌 테스트 ${i + 1}: ${connectionString.split('@')[1]}`);
        
        const pool = new Pool({ connectionString });
        
        try {
            const client = await pool.connect();
            const result = await client.query('SELECT NOW() as current_time');
            console.log(`✅ 성공! 시간: ${result.rows[0].current_time}`);
            
            client.release();
            await pool.end();
            return connectionString; // 성공한 연결문자열 반환
        } catch (err) {
            console.log(`❌ 실패: ${err.message}`);
            await pool.end();
        }
    }
    
    console.log('\n🚨 모든 연결 실패...');
    return null;
}

testAllConnections().then(successfulConnection => {
    if (successfulConnection) {
        console.log('\n🎉 성공한 연결:', successfulConnection);
        console.log('\n📝 .env.local에 이걸로 업데이트하세요:');
        console.log(`DATABASE_URI=${successfulConnection}`);
    }
});