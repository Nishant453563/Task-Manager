const bcrypt = require('bcryptjs');
console.log('bcrypt type:', typeof bcrypt);
console.log('bcrypt keys:', Object.keys(bcrypt));
if (bcrypt.default) {
    console.log('bcrypt.default type:', typeof bcrypt.default);
    console.log('bcrypt.default keys:', Object.keys(bcrypt.default));
}
