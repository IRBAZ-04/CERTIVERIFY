const getBaseUrl = () => {
    let baseUrl = import.meta.env.VITE_API_URL || 'https://certiverify-backend.onrender.com/api';
    if (baseUrl.includes('localhost')) {
        if (window.location.hostname !== 'localhost') {
            baseUrl = baseUrl.replace('localhost', window.location.hostname);
        }
    }
    if (!baseUrl.startsWith('http')) {
        baseUrl = `${window.location.protocol}//${baseUrl}`;
    }
    return baseUrl.replace(/\/$/, '');
};

const isMobileDevice = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) 
        || ('ontouchstart' in window);
};

export const downloadCertificatePDF = async (certId) => {
    try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
        const token = userInfo.token || '';
        const baseUrl = getBaseUrl();
        const filename = `Certificate-${certId}.pdf`;
        const downloadUrl = `${baseUrl}/certificates/download/${certId}`;

        const headers = {};
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(downloadUrl, { headers });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `Download failed: ${response.status}`);
        }

        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            throw new Error('Certificate not found');
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);

        return { success: true };
    } catch (error) {
        console.error('Download failed:', error);
        return { 
            success: false, 
            message: error.message || 'Failed to download certificate'
        };
    }
};
