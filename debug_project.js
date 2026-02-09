const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://qsdrlwqmvtcczykginoz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFzZHJsd3FtdnRjY3p5a2dpbm96Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkxNDgzNjAsImV4cCI6MjA4NDcyNDM2MH0.XzFgNoty5BRpSIBVbfzhOL56f8wp-DGM0QHkjMpHkqE';
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkProject(id) {
    console.log(`Checking project with ID: ${id}`);
    const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error('Error:', error.message);
    } else {
        console.log('Success! Project found:');
        console.log('Title:', data.title);
        console.log('Version:', data.reference_version);
        console.log('Content length:', data.content?.length || 0);
    }
}

// Check with one of the IDs from the logs
checkProject('cb450aea-a101-4af4-8385-7870492bf94d');
