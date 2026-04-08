async function runFlow() {
    console.log("Starting Flow Check...");
    const url = 'https://certiverify-backend.onrender.com/api';    

    
    // 1. Clear DB (using a hacky way since we don't have a direct clear endpoint, but wait, we can't easily clear the DB via HTTP. The first user might not be admin if the DB isn't empty! Let's just create a mock user and see what role we get, or just test login if they exist)
    // Actually, I can just connect to Mongoose and clear the DB here for a pristine test!
    
    const mongoose = require('mongoose');
    const dotenv = require('dotenv');
    dotenv.config();
    await mongoose.connect(process.env.MONGO_URI);
    await mongoose.connection.db.dropDatabase();
    console.log("Database cleared for testing.");

    // 2. Register Admin
    let res = await fetch(`${url}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'Admin Flow', email: 'adminflow@test.com', password: 'password123' })
    });
    let adminData = await res.json();
    console.log("Admin Register:", adminData.role === 'admin' ? "PASS" : "FAIL", adminData);
    
    // 3. Register Normal User
    res = await fetch(`${url}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'User Flow', email: 'userflow@test.com', password: 'password123' })
    });
    let userData = await res.json();
    console.log("User Register:", userData.role === 'user' ? "PASS" : "FAIL", userData);
    
    // 4. Admin creates Certificate
    res = await fetch(`${url}/certificates`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${adminData.token}` },
        body: JSON.stringify({ name: 'John Test', certId: 'FLOW-101', course: 'Flow Testing', date: '2026-04-06' })
    });
    console.log("Admin Create Cert status:", res.status === 201 ? "PASS" : "FAIL", res.status);
    
    // 5. User tries to create Certificate (Should Fail)
    res = await fetch(`${url}/certificates`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${userData.token}` },
        body: JSON.stringify({ name: 'Hacker', certId: 'FAIL-101', course: 'Hacking', date: '2026-04-06' })
    });
    console.log("User Create Cert (Forbidden) status:", res.status === 403 ? "PASS" : "FAIL", res.status);

    // 6. User Verify Certificate
    res = await fetch(`${url}/certificates/verify/FLOW-101`, {
        headers: { 'Authorization': `Bearer ${userData.token}` }
    });
    let verifyData = await res.json();
    console.log("User Verify Cert status:", verifyData.valid ? "PASS" : "FAIL", verifyData.cert ? verifyData.cert.name : null);
    
    // 7. Download PDF
    res = await fetch(`${url}/certificates/download/FLOW-101`, {
        headers: { 'Authorization': `Bearer ${userData.token}` }
    });
    console.log("User Download PDF status:", res.status === 200 ? "PASS" : "FAIL", res.headers.get('content-type'));

    mongoose.disconnect();
    console.log("Flow Check Complete!");
}

runFlow();
