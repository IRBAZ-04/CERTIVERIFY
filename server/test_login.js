async function testLogin() {
    const url = 'http://localhost:5000/api';
    
    // Register
    let res = await fetch(`${url}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'Bob Admin', email: 'bob@test.com', password: 'password123', adminPasscode: 'admin123' })
    });
    console.log("Register:", res.status);
    
    // Login
    let loginRes = await fetch(`${url}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'bob@test.com', password: 'password123' })
    });
    console.log("Login:", loginRes.status, await loginRes.text());
}
testLogin();
