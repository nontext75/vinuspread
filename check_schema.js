const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = 'https://qsdrlwqmvtcczykginoz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFzZHJsd3FtdnRjY3p5a2dpbm96Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkxNDgzNjAsImV4cCI6MjA4NDcyNDM2MH0.XzFgNoty5BRpSIBVbfzhOL56f8wp-DGM0QHkjMpHkqE';
const supabase = createClient(supabaseUrl, supabaseKey);

async function listTables() {
    console.log('Checking database tables...');

    // Try to select from a non-existent table to get a hint or look at information_schema if possible (users usually can't)
    // Instead, we'll try to insert into 'blocks' and see the specific error, or just try to select from 'projects' which worked.

    const { data, error } = await supabase.from('projects').select('id').limit(1);
    if (error) console.error('Error accessing projects:', error);
    else console.log('Projects table exists. Access successful.');

    const { data: blocksData, error: blocksError } = await supabase.from('blocks').select('id').limit(1);

    if (blocksError) {
        console.error('Error accessing blocks table:', blocksError.message);
        console.log('Hint status:', blocksError.hint);
    } else {
        console.log('Blocks table exists.');
    }
}

listTables();
