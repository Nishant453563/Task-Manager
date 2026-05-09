const bcrypt = require('bcryptjs');

async function test() {
    try {
        console.log('Testing genSalt...');
        const salt = await bcrypt.genSalt(10);
        console.log('Salt:', salt);
        console.log('Testing hash...');
        const hash = await bcrypt.hash('password', salt);
        console.log('Hash:', hash);
        console.log('Success!');
    } catch (err) {
        console.error('Error in bcrypt test:', err);
    }
}

test();
