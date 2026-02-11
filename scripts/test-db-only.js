const { Pool } = require('pg');

async function testDatabaseConnection() {
    const pool = new Pool({
        connectionString: 'postgresql://postgres.qsdrlwqmvtcczykginoz:vIGqVNuhA4VgS6zF@aws-1-ap-south-1.pooler.supabase.com:5432/postgres',
    });

    try {
        console.log('🔌 연결 시도 중...');
        const client = await pool.connect();
        const result = await client.query('SELECT NOW() as current_time');
        console.log('✅ 성공:', result.rows[0].current_time);
        
        // 테이블 목록 확인
        const tables = await client.query(`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public' 
            ORDER BY table_name
        `);
        console.log('📋 테이블 목록:', tables.rows.map(row => row.table_name));
        
        client.release();
        await pool.end();
    } catch (err) {
        console.error('❌ 연결 실패:', err.message);
        await pool.end();
    }
}

testDatabaseConnection();