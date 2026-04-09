async function verifyDownload() {
    console.log("Verifying backend download endpoint...");
    const url = 'https://certiverify-backend.onrender.com/api';    

    
    
    // 1. Register a new admin to get a token
    let res = await fetch(`${url}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            name: 'Download Verifier', 
            email: `download_verifier_${Date.now()}@test.com`, 
            password: 'password123',
            adminPasscode: 'admin123'
        })
    });
    let adminData = await res.json();
    if (!adminData.token) {
        console.error("Failed to register admin:", adminData);
        process.exit(1);
    }
    console.log("Admin registered.");

    // 2. Create a certificate to download
    const certId = `DL-TEST-${Date.now()}`;
    res = await fetch(`${url}/certificates`, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${adminData.token}`
        },
        body: JSON.stringify({
            name: 'DL Student',
            certId: certId,
            course: 'Download Testing',
            date: '2026-04-08'
        })
    });
    if (res.status !== 201) {
        console.error("Failed to create certificate.");
        process.exit(1);
    }
    console.log(`Certificate ${certId} created.`);

    // 3. Test download endpoint
    res = await fetch(`${url}/certificates/download/${certId}`, {
        headers: { 
            'Authorization': `Bearer ${adminData.token}`
        }
    });

    if (res.status === 200) {
        const contentType = res.headers.get('content-type');
        console.log("SUCCESS: Received 200 status.");
        console.log("Content-Type:", contentType);
        if (contentType.includes('application/pdf')) {
            console.log("PASS: Response is a PDF.");
        } else {
            console.error("FAIL: Response is not a PDF.");
            process.exit(1);
        }
    } else {
        console.error("FAIL: Could not download certificate.");
        console.error("Status:", res.status);
        const err = await res.json();
        console.error("Response:", err);
        process.exit(1);
    }

    console.log("Verification Complete!");
}

verifyDownload();
