const { createClient } = require('@supabase/supabase-js');
const { Pool } = require('pg');

console.log('🔍 연결 테스트 시작...');
console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log('DB URI 접두사:', process.env.DATABASE_URI ? process.env.DATABASE_URI.split('@')[0] + '@***' : 'undefined');

// Supabase REST API 테스트
async function testSupabaseRest() {
  try {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
    
    console.log('\n📡 Supabase REST API 테스트...');
    const { data, error } = await supabase.from('projects').select('count').limit(1);
    
    if (error) {
      console.error('❌ REST API 오류:', error.message);
      return false;
    }
    
    console.log('✅ REST API 연동 성공');
    return true;
  } catch (err) {
    console.error('❌ REST API 연결 실패:', err.message);
    return false;
  }
}

// PostgreSQL Direct Connection 테스트
async function testPostgresDirect() {
  try {
    console.log('\n🐘 PostgreSQL Direct Connection 테스트...');
    
    const pool = new Pool({
      connectionString: process.env.DATABASE_URI,
    });
    
    const client = await pool.connect();
    const result = await client.query('SELECT NOW() as current_time');
    client.release();
    await pool.end();
    
    console.log('✅ Direct DB 연결 성공:', result.rows[0].current_time);
    return true;
  } catch (err) {
    console.error('❌ Direct DB 연결 실패:', err.message);
    return false;
  }
}

// 테이블 구조 확인
async function checkTables() {
  try {
    console.log('\n📋 테이블 구조 확인...');
    
    const pool = new Pool({
      connectionString: process.env.DATABASE_URI,
    });
    
    const client = await pool.connect();
    
    const tables = ['projects', 'stories', 'media', 'lab_items', 'inquiries', 'users', 'blocks'];
    
    for (const table of tables) {
      try {
        const result = await client.query(`SELECT COUNT(*) FROM ${table}`);
        console.log(`✅ ${table}: ${result.rows[0].count}개 데이터`);
      } catch (err) {
        console.log(`⚠️ ${table}: 테이블 없음 또는 접근 오류 (${err.message})`);
      }
    }
    
    client.release();
    await pool.end();
  } catch (err) {
    console.error('❌ 테이블 확인 실패:', err.message);
  }
}

// 메인 실행
async function main() {
  console.log('🚀 바이너스프레드 DB 진단 시작...\n');
  
  const restOk = await testSupabaseRest();
  const dbOk = await testPostgresDirect();
  
  if (restOk && dbOk) {
    console.log('\n🎉 모든 연결 상태 양호!');
    await checkTables();
  } else {
    console.log('\n⚠️ 연결 문제 있음 - DEVELOPER_NOTES.md 확인 필요');
  }
}

main().catch(console.error);