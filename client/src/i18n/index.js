import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      nav: {
        verify: 'Verify',
        aiScan: 'AI Scan',
        portfolio: 'Portfolio',
        dashboard: 'Dashboard',
        login: 'Admin Login',
        logout: 'Sign out',
        signIn: 'Sign in',
        languages: 'Languages',
        lightMode: 'Light mode',
        darkMode: 'Dark mode',
        hi: 'Hindi',
        en: 'English'
      },
      landing: {
        badge: 'Next-Gen Architecture',
        headlineMain: 'Verify credentials with',
        headlineAccent: 'absolute certainty',
        subtext: 'Secure certificate issuance and verification for learners and organizations, backed by dependable digital records.',
        ctaLaunch: 'Launch Platform',
        ctaScanner: 'Upload & Verify',
        badges: {
          secured: 'SHA-256 Secured',
          qr: 'QR Verified',
          ai: 'Trusted Verification',
          multi: 'Multi-Org'
        },
        marquee: {
          verify: 'CERTIFICATE VERIFICATION',
          fraud: 'SECURE ISSUANCE',
          qr: 'QR CODE SCANNING',
          instant: 'INSTANT RESULTS',
          multi: 'MULTI-ORG SUPPORT',
          analytics: 'SECURE RECORDS'
        },
        features: {
          badge: 'Enterprise Features',
          title: 'Built to secure everything',
          subtitle: 'A comprehensive platform designed for trust, scale, and uncompromising security.',
          items: {
            verif: {
              title: 'Instant Verification',
              desc: 'Verify credentials in milliseconds with ultra-secure validation architecture.'
            },
            fraud: {
              title: 'Secure Issuance',
              desc: 'Create certificates with reliable data validation and trusted record keeping.'
            },
            qr: {
              title: 'QR Code Validation',
              desc: 'Dynamic QR codes embedded into every certificate for instant mobile scanning.'
            },
            records: {
              title: 'Immutable Records',
              desc: 'Certificates are permanently verifiable using unique cryptographic IDs.'
            },
            access: {
              title: 'Role-based Access',
              desc: 'Dedicated highly-secure dashboards for issuers, administrators, and students.'
            },
            bulk: {
              title: 'Bulk Issuance',
              desc: 'Process and distribute thousands of certificates in seconds via Excel/CSV.'
            }
          }
        },
        ctaSection: {
          title: 'Ready to secure every certificate?',
          admin: 'Admin Dashboard',
          check: 'Check a Certificate'
        }
      },
      dashboard: {
        title: 'Dashboard',
        superAdmin: 'Global Administration Overview',
        orgDash: 'Organization Dashboard',
        analytics: {
          activity: 'Verification Activity',
          total: 'Total Issued',
          fraud: 'Fraud Attempts'
        },
        actions: {
          importTitle: 'Batch Import',
          dropText: 'Click to upload Excel',
          formats: '.xlsx or .xls files only',
          process: 'Process Certificates',
          issuanceTitle: 'Manual Issuance',
          manualTitle: 'Create Single Certificate',
          manualDesc: 'Manually input data to generate and issue a secure certificate instance.',
          newCert: 'New Certificate'
        },
        table: {
          title: 'Recent Certificates',
          id: 'Certificate ID',
          student: 'Student',
          domain: 'Course',
          validity: 'Validity',
          actions: 'Actions',
          empty: 'No certificates found',
          emptyDesc: 'Upload or create a certificate to see it here.'
        },
        modal: {
          title: 'Create New Certificate',
          certId: 'Certificate ID',
          student: 'Recipient Name',
          domain: 'Course',
          start: 'Date',
          end: 'End Date',
          cancel: 'Cancel',
          generate: 'Generate Certificate'
        },
        messages: {
          loadFail: 'Failed to load data.',
          success: 'Certificate created successfully.',
          deleted: 'Certificate deleted.',
          deleteFail: 'Delete failed.',
          uploadFail: 'Upload failed.'
        }
      },
      login: {
        welcome: 'Welcome back',
        create: 'Create account',
        welcomeSub: 'Sign in to access your dashboard.',
        createSub: 'Get started with CertiVerify.',
        email: 'Email',
        password: 'Password',
        name: 'Name',
        emailPlaceholder: 'name@organization.com',
        namePlaceholder: 'Your name',
        passPlaceholder: '••••••••',
        noAccount: "Don't have an account?",
        hasAccount: 'Already have an account?',
        signUp: 'Sign up',
        signIn: 'Sign in',
        authFail: 'Authentication failed'
      },
      verify: {
        badge: 'Public Verification Portal',
        title: 'Verify Certificate',
        subtitle: 'Enter a certificate ID to validate its authenticity.',
        placeholder: 'e.g. CERT-2026-001',
        button: 'Verify',
        verifying: 'Verifying certificate...',
        results: {
          valid: 'Verified Authentic',
          validDesc: 'This is an official certificate record.',
          holder: 'Certificate Holder',
          domain: 'Course',
          id: 'Certificate ID',
          validity: 'Validity',
          org: 'Issuing Organization',
          scan: 'Scan to Verify'
        },
        errors: {
          revoked: 'Certificate Revoked',
          notFound: 'Certificate Not Found',
          revokedDesc: 'This certificate has been revoked by the issuer.'
        }
      },
      fraud: {
        badge: 'AI Fraud Detection',
        title: 'AI Fraud Scanner',
        subtitle: 'Upload a certificate image to scan and verify its authenticity using OCR technology.',
        upload: {
          title: 'Certificate Image',
          drop: 'Drop image here or click to upload'
        },
        config: {
          title: 'Verification Config',
          certId: 'Certificate ID',
          idDesc: 'ID to cross-reference with OCR results',
          checks: 'Detection Checks',
          checkItems: {
            name: 'Name Match',
            domain: 'Domain Verification',
            id: 'ID Pattern Check',
            confidence: 'Confidence Score'
          },
          button: 'Run Analysis',
          scanning: 'Scanning...'
        },
        results: {
          authentic: 'Authenticity Confirmed',
          alert: 'Fraud Alert',
          checks: 'Verification Checks',
          nameMatch: 'Student Name Match',
          domainMatch: 'Domain Match',
          idMatch: 'Certificate ID Match',
          showOcr: 'Show OCR Text',
          hideOcr: 'Hide OCR Text'
        }
      },
      portfolio: {
        badge: 'Student Portfolio',
        title: 'Public Portfolio',
        subtitle: 'Search by student name to view all verified certificates.',
        placeholder: 'Enter student name...',
        button: 'Search',
        searching: 'Searching...',
        empty: 'No certificates found',
        emptyDesc: 'Try a different name or check spelling.',
        results: {
          countOne: 'verified certificate',
          countMany: 'verified certificates',
          achievement: 'Achievement',
          valid: 'Valid',
          copy: 'Copy Link',
          copied: 'Copied',
          verify: 'Verify'
        }
      },
      footer: {
        brand: 'CertiVerify',
        desc: 'Certificate verification and issuance platform built for trust, reliability, and modern digital credentials.',
        product: 'Product',
        legal: 'Legal',
        privacy: 'Privacy Policy',
        terms: 'Terms of Service',
        rights: 'All rights reserved.'
      }
    }
  },
  hi: {
    translation: {
      nav: {
        verify: 'सत्यापित करें',
        aiScan: 'AI स्कैन',
        portfolio: 'पोर्टफोलियो',
        dashboard: 'डैशबोर्ड',
        login: 'एडमिन लॉगिन',
        logout: 'साइन आउट',
        signIn: 'साइन इन',
        languages: 'भाषाएँ',
        lightMode: 'लाइट मोड',
        darkMode: 'डार्क मोड',
        hi: 'हिंदी',
        en: 'English'
      },
      landing: {
        badge: 'अगली पीढ़ी का आर्किटेक्चर',
        headlineMain: 'प्रमाण-पत्रों को सत्यापित करें',
        headlineAccent: 'पूर्ण निश्चितता के साथ',
        subtext: 'विश्वसनीय डिजिटल रिकॉर्ड के साथ शिक्षार्थियों और संगठनों के लिए सुरक्षित प्रमाण-पत्र जारी करना और सत्यापन।',
        ctaLaunch: 'प्लेटफॉर्म लॉन्च करें',
        ctaScanner: 'अपलोड और सत्यापित करें',
        badges: {
          secured: 'SHA-256 सुरक्षित',
          qr: 'QR सत्यापित',
          ai: 'विश्वसनीय सत्यापन',
          multi: 'मल्टी-ऑर्ग'
        },
        marquee: {
          verify: 'प्रमाण-पत्र सत्यापन',
          fraud: 'सुरक्षित जारी करना',
          qr: 'QR कोड स्कैनिंग',
          instant: 'तत्काल परिणाम',
          multi: 'मल्टी-ऑर्ग समर्थन',
          analytics: 'सुरक्षित रिकॉर्ड'
        },
        features: {
          badge: 'एंटरप्राइज विशेषताएं',
          title: 'सब कुछ सुरक्षित करने के लिए निर्मित',
          subtitle: 'विश्वास, पैमाने और अडिग सुरक्षा के लिए डिज़ाइन किया गया एक व्यापक प्लेटफॉर्म।',
          items: {
            verif: {
              title: 'तत्काल सत्यापन',
              desc: 'अल्ट्रा-सुरक्षित सत्यापन आर्किटेक्चर के साथ मिलीसेकंड में प्रमाण-पत्र सत्यापित करें।'
            },
            fraud: {
              title: 'सुरक्षित जारी करना',
              desc: 'विश्वसनीय डेटा सत्यापन और भरोसेमंद रिकॉर्ड कीपिंग के साथ प्रमाण-पत्र बनाएं।'
            },
            qr: {
              title: 'QR कोड सत्यापन',
              desc: 'तत्काल मोबाइल स्कैनिंग के लिए प्रत्येक प्रमाण-पत्र में एम्बेडेड डायनामिक QR कोड।'
            },
            records: {
              title: 'अपरिवर्तनीय रिकॉर्ड',
              desc: 'विशिष्ट क्रिप्टोग्राफ़िक ID का उपयोग करके प्रमाण-पत्र स्थायी रूप से सत्यापन योग्य हैं।'
            },
            access: {
              title: 'भूमिका-आधारित पहुंच',
              desc: 'जारीकर्ताओं, प्रशासकों और छात्रों के लिए समर्पित अत्यधिक सुरक्षित डैशबोर्ड।'
            },
            bulk: {
              title: 'थोक जारी करना',
              desc: 'Excel/CSV के माध्यम से सेकंडों में हजारों प्रमाण-पत्रों को संसाधित और वितरित करें।'
            }
          }
        },
        ctaSection: {
          title: 'हर प्रमाण-पत्र को सुरक्षित करने के लिए तैयार हैं?',
          admin: 'एडमिन डैशबोर्ड',
          check: 'प्रमाण-पत्र की जाँच करें'
        }
      },
      dashboard: {
        title: 'डैशबोर्ड',
        superAdmin: 'वैश्विक प्रशासन अवलोकन',
        orgDash: 'संगठन डैशबोर्ड',
        analytics: {
          activity: 'सत्यापन गतिविधि',
          total: 'कुल जारी',
          fraud: 'धोखाधड़ी के प्रयास'
        },
        actions: {
          importTitle: 'बैच आयात',
          dropText: 'Excel अपलोड करने के लिए क्लिक करें',
          formats: 'केवल .xlsx या .xls फाइलें',
          process: 'प्रमाण-पत्र संसाधित करें',
          issuanceTitle: 'मैनुअल जारी करना',
          manualTitle: 'एकल प्रमाण-पत्र बनाएं',
          manualDesc: 'सुरक्षित प्रमाण-पत्र जेनरेट और जारी करने के लिए मैन्युअल रूप से डेटा दर्ज करें।',
          newCert: 'नया प्रमाण-पत्र'
        },
        table: {
          title: 'हाल के प्रमाण-पत्र',
          id: 'प्रमाण-पत्र ID',
          student: 'छात्र',
          domain: 'कोर्स',
          validity: 'वैधता',
          actions: 'कार्रवाई',
          empty: 'कोई प्रमाण-पत्र नहीं मिला',
          emptyDesc: 'इसे यहाँ देखने के लिए एक प्रमाण-पत्र अपलोड करें या बनाएं।'
        },
        modal: {
          title: 'नया प्रमाण-पत्र बनाएं',
          certId: 'प्रमाण-पत्र ID',
          student: 'प्राप्तकर्ता का नाम',
          domain: 'कोर्स / डोमेन',
          start: 'आरंभ तिथि',
          end: 'समाप्ति तिथि',
          cancel: 'रद्द करें',
          generate: 'प्रमाण-पत्र जेनेरेट करें'
        },
        messages: {
          loadFail: 'डेटा लोड करने में विफल।',
          success: 'प्रमाण-पत्र सफलतापूर्वक बनाया गया।',
          deleted: 'प्रमाण-पत्र हटा दिया गया।',
          deleteFail: 'हटाना विफल रहा।',
          uploadFail: 'अपलोड विफल रहा।'
        }
      },
      login: {
        welcome: 'वापसी पर स्वागत है',
        create: 'खाता बनाएं',
        welcomeSub: 'अपने डैशबोर्ड तक पहुँचने के लिए साइन इन करें।',
        createSub: 'CertiVerify के साथ शुरुआत करें।',
        email: 'ईमेल',
        password: 'पासवर्ड',
        name: 'नाम',
        emailPlaceholder: 'name@organization.com',
        namePlaceholder: 'आपका नाम',
        passPlaceholder: '••••••••',
        noAccount: "खाता नहीं है?",
        hasAccount: 'पहले से ही खाता है?',
        signUp: 'साइन अप करें',
        signIn: 'साइन इन करें',
        authFail: 'प्रमाणीकरण विफल रहा'
      },
      verify: {
        badge: 'सार्वजनिक सत्यापन पोर्टल',
        title: 'प्रमाण-पत्र सत्यापित करें',
        subtitle: 'प्रामाणिकता की जांच के लिए प्रमाण-पत्र ID दर्ज करें।',
        placeholder: 'जैसे: CERT-2026-001',
        button: 'सत्यापित करें',
        verifying: 'प्रमाण-पत्र सत्यापित किया जा रहा है...',
        results: {
          valid: 'प्रामाणिकता की पुष्टि',
          validDesc: 'यह एक आधिकारिक प्रमाण-पत्र रिकॉर्ड है।',
          holder: 'प्रमाण-पत्र धारक',
          domain: 'कोर्स',
          id: 'प्रमाण-पत्र ID',
          validity: 'वैधता',
          org: 'जारी करने वाला संगठन',
          scan: 'सत्यापित करने के लिए स्कैन करें'
        },
        errors: {
          revoked: 'प्रमाण-पत्र रद्द',
          notFound: 'प्रमाण-पत्र नहीं मिला',
          revokedDesc: 'जारीकर्ता द्वारा यह प्रमाण-पत्र रद्द कर दिया गया है।'
        }
      },
      fraud: {
        badge: 'AI धोखाधड़ी पहचान',
        title: 'AI धोखाधड़ी स्कैनर',
        subtitle: 'OCR तकनीक का उपयोग करके प्रामाणिकता को स्कैन और सत्यापित करने के लिए प्रमाण-पत्र छवि अपलोड करें।',
        upload: {
          title: 'प्रमाण-पत्र छवि',
          drop: 'यहाँ छवि छोड़ें या अपलोड करने के लिए क्लिक करें'
        },
        config: {
          title: 'सत्यापन कॉन्फ़िगरेशन',
          certId: 'प्रमाण-पत्र ID',
          idDesc: 'OCR परिणामों के साथ क्रॉस-संदर्भ के लिए ID',
          checks: 'पहचान जाँच',
          checkItems: {
            name: 'नाम मिलान',
            domain: 'डोमेन सत्यापन',
            id: 'ID पैटर्न जाँच',
            confidence: 'कॉन्फिडेंस स्कोर'
          },
          button: 'विश्लेषण चलाएं',
          scanning: 'स्कैनिंग...'
        },
        results: {
          authentic: 'प्रामाणिकता की पुष्टि',
          alert: 'धोखाधड़ी चेतावनी',
          checks: 'सत्यापन जाँच',
          nameMatch: 'छात्र के नाम का मिलान',
          domainMatch: 'डोमेन मिलान',
          idMatch: 'प्रमाण-पत्र ID मिलान',
          showOcr: 'OCR टेक्स्ट दिखाएं',
          hideOcr: 'OCR टेक्स्ट छुपाएं'
        }
      },
      portfolio: {
        badge: 'छात्र पोर्टफोलियो',
        title: 'सार्वजनिक पोर्टफोलियो',
        subtitle: 'सभी सत्यापित प्रमाण-पत्र देखने के लिए छात्र के नाम से खोजें।',
        placeholder: 'छात्र का नाम दर्ज करें...',
        button: 'खोजें',
        searching: 'खोजा जा रहा है...',
        empty: 'कोई प्रमाण-पत्र नहीं मिला',
        emptyDesc: 'अलग नाम आज़माएँ या वर्तनी जाँचें।',
        results: {
          countOne: 'सत्यापित प्रमाण-पत्र',
          countMany: 'सत्यापित प्रमाण-पत्र',
          achievement: 'उपलब्धि',
          valid: 'वैध',
          copy: 'लिंक कॉपी करें',
          copied: 'कॉपी हो गया',
          verify: 'सत्यापित करें'
        }
      },
      footer: {
        brand: 'CertiVerify',
        desc: 'विश्वास, विश्वसनीयता, और आधुनिक डिजिटल क्रेडेंशियल के लिए निर्मित प्रमाण-पत्र सत्यापन और जारी करने वाला प्लेटफॉर्म।',
        product: 'उत्पाद',
        legal: 'कानूनी',
        privacy: 'गोपनीयता नीति',
        terms: 'सेवा की शर्तें',
        rights: 'सर्वाधिकार सुरक्षित।'
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('certiverify-lang') || 'en',
    fallbackLng: 'en',
    interpolation: { escapeValue: false }
  });

export default i18n;
