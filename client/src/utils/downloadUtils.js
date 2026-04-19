export const downloadCertificatePDF = (certId) => {
    let baseUrl = import.meta.env.VITE_API_URL || 'https://certiverify-backend.onrender.com/api';

    if (baseUrl.includes('localhost')) {
        if (window.location.hostname !== 'localhost') {
            baseUrl = baseUrl.replace('localhost', window.location.hostname);
        }
    }

    if (!baseUrl.startsWith('http')) {
        baseUrl = `${window.location.protocol}//${baseUrl}`;
    }

    if (baseUrl.endsWith('/')) {
        baseUrl = baseUrl.slice(0, -1);
    }

    // Token is stored at its own key by AuthContext (not inside userInfo)
    const token = localStorage.getItem('token');

    let downloadUrl = `${baseUrl}/certificates/download/${certId}`;
    if (token) {
        downloadUrl += `?token=${token}`;
    }

    const link = document.createElement('a');
    link.href = downloadUrl;
    link.target = '_blank';
    link.download = `Certificate-${certId}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
