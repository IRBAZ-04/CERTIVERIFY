import API from '../services/api';

/**
 * Downloads a certificate PDF for a given certificate ID.
 */
export const downloadCertificatePDF = async (certId) => {
    try {
        const response = await API.get(`/certificates/download/${certId}`, {
            responseType: 'blob'
        });
        
        // Create blob link to download
        const url = window.URL.createObjectURL(
            new Blob([response.data], { type: 'application/pdf' })
        );
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `Certificate-${certId}.pdf`);
        
        // Append to html link element page
        document.body.appendChild(link);
        
        // Start download
        link.click();
        
        // Clean up and remove the link
        link.parentNode.removeChild(link);
        window.URL.revokeObjectURL(url);
        
        return { success: true };
    } catch (error) {
        console.error('Download failed:', error);
        return { 
            success: false, 
            message: error.response?.data?.message || 'Failed to download certificate' 
        };
    }
};
