const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

async function testUpload() {
    const url = 'https://certiverify-backend.onrender.com/api';
    
    // Connect and clear certs for clean test
    await mongoose.connect(process.env.MONGO_URI);
    await mongoose.connection.db.collection('certificates').deleteMany({});
    console.log("Cleared certificates collection.");

    // Register/login admin
    try { await (await fetch(`${url}/auth/register`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: 'TestAdmin', email: 'uploadtest@test.com', password: 'password123', adminPasscode: 'admin123' }) })).json(); } catch {}
    const loginRes = await fetch(`${url}/auth/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: 'uploadtest@test.com', password: 'password123' }) });
    const { token } = await loginRes.json();
    console.log("Admin token acquired.");

    // Test 1: Create cert with provided ID
    let res = await fetch(`${url}/certificates`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ name: 'Alice', certId: 'MANUAL-001', course: 'React', date: '2026-04-09' })
    });
    let data = await res.json();
    console.log("Test 1 - Manual ID:", res.status === 201 ? "PASS" : "FAIL", data.certId);

    // Test 2: Create duplicate ID (should fail)
    res = await fetch(`${url}/certificates`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ name: 'Bob', certId: 'MANUAL-001', course: 'Vue', date: '2026-04-09' })
    });
    console.log("Test 2 - Duplicate rejection:", res.status === 400 ? "PASS" : "FAIL", res.status);

    // Test 3: Verify the cert
    res = await fetch(`${url}/certificates/verify/MANUAL-001`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    data = await res.json();
    console.log("Test 3 - Verify cert:", data.valid ? "PASS" : "FAIL");

    // Test 4: Download PDF
    res = await fetch(`${url}/certificates/download/MANUAL-001`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    console.log("Test 4 - Download PDF:", res.status === 200 && res.headers.get('content-type') === 'application/pdf' ? "PASS" : "FAIL");

    // Test 5: Get certificates list
    res = await fetch(`${url}/certificates?page=1&limit=10`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    data = await res.json();
    console.log("Test 5 - List certs:", data.certificates?.length > 0 ? "PASS" : "FAIL", `(${data.total} total)`);

    await mongoose.disconnect();
    console.log("\nAll tests complete!");
}

testUpload().catch(console.error);
