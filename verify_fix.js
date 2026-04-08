async function verifyFix() {
    console.log("Verifying fix for flexible certificate issuance...");
    const url = 'https://certiverify-backend.onrender.com/api';    

    
    // 1. Register a new admin (using admin passcode)
    let res = await fetch(`${url}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            name: 'Fix Verifier', 
            email: `fix_verifier_${Date.now()}@test.com`, 
            password: 'password123',
            adminPasscode: 'admin123'
        })
    });
    let adminData = await res.json();
    if (!adminData.token) {
        console.error("Failed to register admin:", adminData);
        process.exit(1);
    }
    console.log("Admin registered successfully.");

    // 2. Test with the names the frontend was sending (studentName, certificateId, domain, startDate)
    const payload = {
        studentName: 'Test Student',
        certificateId: `FIX-TEST-${Date.now()}`,
        domain: 'Fix Verification',
        startDate: '2026-04-08'
    };

    console.log("Testing with payload:", payload);

    res = await fetch(`${url}/certificates`, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${adminData.token}`
        },
        body: JSON.stringify(payload)
    });

    const result = await res.json();
    if (res.status === 201) {
        console.log("SUCCESS: Certificate created with flexible fields!");
        console.log("Result:", result);
    } else {
        console.error("FAIL: Could not create certificate with flexible fields.");
        console.error("Status:", res.status);
        console.error("Response:", result);
        process.exit(1);
    }

    console.log("Verification Complete!");
}

verifyFix();
