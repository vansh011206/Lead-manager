import { Lead } from "@prisma/client";

export interface PersonaScript {
  openerHinglish: string;
  problemStateHinglish: string;
  offerHinglish: string;
  ctaHinglish: string;
  fullScriptHinglish: string;
  objectionsHinglish: Array<{ objection: string; response: string }>;
  pitchPointsHinglish: string[];

  openerHindi: string;
  problemStateHindi: string;
  offerHindi: string;
  ctaHindi: string;
  fullScriptHindi: string;
  objectionsHindi: Array<{ objection: string; response: string }>;
  pitchPointsHindi: string[];
}

// Structured response interface supporting 3 target personas side-by-side
export interface ColdCallScriptResponse {
  niche: string;
  analysis: string;
  owner: PersonaScript;
  manager: PersonaScript;
  receptionist: PersonaScript;
  isDemo?: boolean;
}

const FORGE_WEB_CATALOG = `
Forge Web is a software production house based in Faridabad, India. We design and deliver production-grade applications, custom automation systems, and complete digital solutions for modern brands.

Core Capabilities:
1. Automation Systems: Seamless integrations utilizing WhatsApp API, automated invoicing, and messaging triggers.
2. Custom Softwares: Proprietary dashboards, CRM portals, shift rosters, and local billing structures.
3. Applications: High-speed e-commerce systems, Android/iOS apps, and customer portals.

Specialized Verticals & Products:
- For Hotels (Hotel PMS Dashboard & WhatsApp Automation):
  - Unified PMS Dashboard: Availability Grid, booking logs (OTAs + walk-ins), staff scheduling, and billing into one clean dashboard. Replaces registers/Excel, saving 6 to 8 hours daily.
  - WhatsApp Automation: Instant booking confirmations, check-in/out alerts, guest welcome flow (WiFi details/menu), post-stay feedback links, and Google Review Booster (raises reviews by 30-40%).

- For Restaurants, Cafes, Cloud Kitchens & Food Courts (FlashBill POS Product):
  - Product Name: FlashBill POS (Offline-First Billing & Business Management Software).
  - Highlights: Offline-first billing (no internet required), fast & reliable billing/invoicing, local data storage (maximum security), QR code & website orders, automated hourly email reports/analytics, and inventory/staff management.
  - Price & Modules: Modular add-ons: Inventory (₹2,499 one-time), Staff Management (₹2,999 one-time), Kitchen Management (₹1,999 one-time), QR orders (₹1,299 one-time), Printer management, Multiple devices connection (₹500/device).

- For Coaching Classes, Schools, Tuition Centers & Institutes (SMS - Student Management System Product):
  - Product Name: SMS (Student Management System).
  - Highlights: Complete center management including Teacher management, Student management, Payout calculation, Fees tracking, Test records, Feed upload, Attendance tracking, and Automated SMS notifications/updates to parents.
  - Impact: Streamlines admin operations, schedules courses/batches, auto-reminds parents for fee dues, and shares test score updates instantly.
`;

// Translated bilingual multi-persona hotel mockup script
const HOTEL_DEMO_SCRIPT: ColdCallScriptResponse = {
  niche: "Hotel & Lodging",
  analysis: "Demo Mode fallback. Optimized for the hospitality sector. Focuses on saving front desk hours by replacing manual Excel sheets with our unified PMS and boosting guest ratings via WhatsApp automation.",
  
  owner: {
    openerHinglish: "Hello [Prospect Name] ji, umeed hai aapka din accha jaa raha hoga. Main Forge Web se Vanshaj baat kar raha hu. Maine [Hotel Name] ki details dekhi aur aapke front desk operations ke baare mein thodi baat karni thi. Kya meri baat owner ya managing partner se ho sakti hai?",
    problemStateHinglish: "Actually, humne dekha hai ki bohot saare hotels aaj bhi rooms register, excel sheets ya messy WhatsApp groups par manage karte hain. Isme staff ka roz ka lagbhag 6 se 8 ghanta sirf manual coordination aur booking entry mein waste ho jata hai.",
    offerHinglish: "Isiliye humne ek unified PMS Dashboard banaya hai jisme aapka occupancy calendar, OTA booking channels (jaise Booking.com), billing aur staff shifts sab ek jagah aa jata hai. Saath hi, isme WhatsApp automation hai jo check-in alerts, WiFi details aur ek Google Review Booster automatically bhejta hai jisse reviews 30% to 40% badh jaate hain.",
    ctaHinglish: "Main aapko ek 10-minute ka short visual demo dikhana chahta hu ki ye aapke team ka roz ka 6 ghanta kaise bacha sakta hai aur booking kaise badha sakta hai. Kya kal dopahar 3 baje hum ek quick Zoom call par connect kar sakte hain?",
    fullScriptHinglish: `[Representative]: Hello [Prospect Name] ji, umeed hai aapka din accha jaa raha hoga. Main Forge Web se Vanshaj baat kar raha hu. Maine [Hotel Name] ki details dekhi aur aapke front desk operations ke baare mein thodi baat karni thi. Kya meri baat owner ya managing partner se ho sakti hai?
[Prospect]: Haan, main hi owner hoon. Bataiye.
[Representative]: Great. Actually, humne dekha hai ki bohot saare hotels aaj bhi rooms register, excel sheets ya messy WhatsApp groups par manage karte hain. Isme staff ka roz ka lagbhag 6 se 8 ghanta sirf manual coordination aur booking entry mein waste ho jata hai.
[Representative]: Isiliye humne ek unified PMS Dashboard banaya hai jisme aapka occupancy calendar, OTA booking channels (jaise Booking.com), billing aur staff shifts sab ek jagah aa jata hai. Saath hi, isme WhatsApp automation hai jo check-in alerts, WiFi details aur ek Google Review Booster automatically bhejta hai jisse reviews 30% to 40% badh jaate hain.
[Representative]: Main aapko ek 10-minute ka short visual demo dikhana chahta hu ki ye aapke team ka roz ka 6 ghanta kaise bacha sakta hai aur booking kaise badha sakta hai. Kya kal dopahar 3 baje hum ek quick Zoom call par connect kar sakte hain?`,
    pitchPointsHinglish: [
      "Unified PMS Dashboard jo registers aur excel ko replace karke 6-8 ghante roz bachaata hai.",
      "WhatsApp Automation jo check-in alerts aur customer welcome flow automate karta hai.",
      "Google Review Booster jisse reviews 30-40% tak badh jaate hain."
    ],
    objectionsHinglish: [
      { objection: "Humare paas pehle se PMS software hai.", response: "Bohot badhiya! Aap kaunsa PMS use kar rahe hain? Humara WhatsApp automation modular hai, ye aapke current software ke saath integrate ho jayega taaki bina kisi change ke aapko auto check-in aur Google review booster mil sake." },
      { objection: "Details email par bhej do.", response: "Main details bilkul bhej deta hu email par. Lekin har hotel ka operations alag hota hai, toh ek 5-minute ke short Zoom call par main aapko direct WhatsApp trigger ka live demo dikha dunga, jo PDF se bohot easy samajh aayega. Kal dopahar 3 baje connect karein?" }
    ],

    openerHindi: "नमस्ते [Prospect Name] जी, आशा है आपका दिन अच्छा बीत रहा होगा। मैं फरीदाबाद से फोर्ज वेब की तरफ से वंशज बात कर रहा हूँ। मैंने [Hotel Name] की डिटेल्स देखीं और आपके फ्रंट डेस्क ऑपरेशंस के बारे में संक्षेप में बात करनी थी। क्या मेरी बात ओनर या मैनेजिंग पार्टनर से हो सकती है?",
    problemStateHindi: "दरअसल, हमने देखा है कि बहुत से होटल्स आज भी अपने कमरे मैन्युअल रजिस्टर, एक्सेल शीट्स या उलझे हुए व्हाट्सएप ग्रुप्स पर मैनेज करते हैं। इससे आपके स्टाफ का रोजाना लगभग ६ से ८ घंटा केवल मैन्युअल बुकिंग एंट्री और तालमेल बिठाने में ही बर्बाद हो जाता है।",
    offerHindi: "इसीलिए हमने एक एकीकृत पीएमएस डैशबोर्ड बनाया है जिसमें आपका ऑक्यूपेंसी कैलेंडर, ओटीए बुकिंग चैनल्स (जैसे Booking.com), बिलिंग और स्टाफ शिफ्ट्स सब एक जगह आ जाते हैं। साथ ही, इसमें व्हाट्सएप ऑटोमेशन है जो चेक-इन अलर्ट, वाई-फाई डिटेल्स और एक 'गूगल रिव्यू बूस्टर' ऑटोमेटिकली भेजता है जिससे आपके रिव्यूज ३०% से ४०% तक बढ़ जाते हैं।",
    ctaHindi: "मैं आपको एक १० मिनट का छोटा विजुअल डेमो दिखाना चाहता हूँ कि यह आपके स्टाफ का रोजाना का ६ घंटा कैसे बचा सकता है। क्या कल दोपहर ३ बजे हम एक त्वरित कॉल पर कनेक्ट कर सकते हैं?",
    fullScriptHindi: `[प्रतिनिधि]: नमस्ते [Prospect Name] जी, आशा है आपका दिन अच्छा बीत रहा होगा। मैं फरीदाबाद से फोर्ज वेब की तरफ से वंशज बात कर रहा हूँ। मैंने [Hotel Name] की डिटेल्स देखीं और आपके फ्रंट डेस्क ऑपरेशंस के बारे में संक्षेप में बात करनी थी। क्या मेरी बात ओनर या मैनेजिंग पार्टनर से हो सकती है?
[संभावित ग्राहक]: हाँ, मैं ही ओनर हूँ। बताइए क्या बात है?
[प्रतिनिधि]: बहुत बढ़िया। दरअसल, हमने देखा है कि बहुत से होटल्स आज भी अपने कमरे मैन्युअल रजिस्टर, एक्सेल शीट्स या उलझे हुए व्हाट्सएप ग्रुप्स पर मैनेज करते हैं। इससे आपके स्टाफ का रोजाना लगभग ६ से ८ घंटा केवल मैन्युअल बुकिंग एंट्री और तालमेल बिठाने में ही बर्बाद हो जाता है।
[प्रतिनिधि]: इसीलिए हमने एक एकीकृत पीएमएस डैशबोर्ड बनाया है जिसमें आपका ऑक्यूपेंसी कैलेंडर, ओटीए बुकिंग चैनल्स, बिलिंग और स्टाफ शिफ्ट्स सब एक जगह आ जाते हैं। साथ ही, इसमें व्हाट्सएप ऑटोमेशन है जो चेक-इन अलर्ट, वाई-फाई डिटेल्स और एक 'गूगल रिव्यू बूस्टर' ऑटोमेटिकली भेजता है जिससे आपके रिव्यूज ३०% से ४०% तक बढ़ जाते हैं।
[प्रतिनिधि]: मैं आपको एक १० मिनट का छोटा विजुअल डेमो दिखाना चाहता हूँ कि यह आपके स्टाफ का रोजाना का ६ घंटा कैसे बचा सकता है। क्या कल दोपहर ३ बजे हम एक त्वरित कॉल पर कनेक्ट कर सकते हैं?`,
    pitchPointsHindi: [
      "एकीकृत पीएमएस डैशबोर्ड जो रजिस्टरों और एक्सेल को हटाकर रोजाना ६-८ घंटे बचाता है।",
      "व्हाट्सएप ऑटोमेशन जो बुकिंग पुष्टि, चेक-इन अलर्ट और वाई-फाई/मेन्यू डिटेल्स अपने आप भेजता है।",
      "गूगल रिव्यू बूस्टर जो सीधे व्हाट्सएप पर रिव्यू लिंक भेजकर रेटिंग्स ३०-४०% तक बढ़ा देता है।"
    ],
    objectionsHindi: [
      { objection: "हमारे पास पहले से ही पीएमएस सॉफ्टवेयर है।", response: "बहुत बढ़िया! आप कौन सा पीएमएस उपयोग कर रहे हैं? हमारा व्हाट्सएप ऑटोमेशन मॉड्यूल के रूप में काम करता है, यह आपके वर्तमान सॉफ्टवेयर के साथ सीधे जुड़ जाएगा ताकि बिना किसी बदलाव के आपको ऑटो चेक-इन और गूगल रिव्यू बूस्टर का लाभ मिल सके।" },
      { objection: "विवरण ईमेल पर भेज दीजिए।", response: "मैं आपको ईमेल पर कैटलॉग अवश्य भेज देता हूँ। लेकिन चूंकि हर होटल की आवश्यकताएं अलग होती हैं, इसलिए ५ मिनट के छोटे से विजुअल कॉल पर मैं आपको लाइव व्हाट्सएप ट्रिगर दिखा दूंगा, जिससे इसे समझना आसान हो जाएगा। क्या कल दोपहर ३ बजे बात करें?" }
    ]
  },
  
  manager: {
    openerHinglish: "Hello [Prospect Name] ji, umeed hai aapka din accha jaa raha hoga. Main Forge Web se Vanshaj baat kar raha hu. Maine [Hotel Name] ki details dekhi aur aapke front desk operations ke baare mein baat karni thi. Kya meri baat operations head ya hotel manager se ho sakti hai?",
    problemStateHinglish: "As a manager, hum samajhte hain ki team ki shifts manage karna, room cleaning tasks assign karna aur check-in checkout ke manual bills banake sheets update karna kitna chaotic ho jata hai.",
    offerHinglish: "Humne isko solve karne ke liye ek smart PMS dashboard banaya hai jisse aapka room occupancy status, staff rosters aur inventory sab automatically update hoti hai. WhatsApp alerts ke zariye staff attendance aur guests ke auto welcome message bhi handle hote hain.",
    ctaHinglish: "Main aapko ek 5-minute ka short visual demo dikhana chahta hu jise dekhkar aap aasani se owner ko pitch kar payenge ki kaise isse team ka time aur manual stress bachega. Kya kal dopahar 3 baje hum connect karein?",
    fullScriptHinglish: `[Representative]: Hello [Prospect Name] ji, umeed hai aapka din accha jaa raha hoga. Main Forge Web se Vanshaj baat kar raha hu. Maine [Hotel Name] ki details dekhi aur aapke front desk operations ke baare mein baat karni thi. Kya meri baat operations head ya hotel manager se ho sakti hai?
[Prospect]: Haan, main hi manager hoon. Bataiye.
[Representative]: Ji, as a manager, hum samajhte hain ki team ki shifts manage karna, room cleaning tasks assign karna aur check-in checkout ke manual bills banake sheets update karna kitna chaotic ho jata hai.
[Representative]: Humne isko solve karne ke liye ek smart PMS dashboard banaya hai jisse aapka room occupancy status, staff rosters aur inventory sab automatically update hoti hai. WhatsApp alerts ke zariye staff attendance aur guests ke auto welcome message bhi handle hote hain.
[Representative]: Main aapko ek 5-minute ka short visual demo dikhana chahta hu jise dekhkar aap aasani se owner ko pitch kar payenge ki kaise isse team ka time aur manual stress bachega. Kya kal dopahar 3 baje hum connect karein?`,
    pitchPointsHinglish: [
      "Staff scheduling aur housekeeping task lists assign karna hua simple.",
      "WhatsApp automated confirmation aur automated check-in flows.",
      "Operations audit reports jo owner ko directly mail ho jaati hain."
    ],
    objectionsHinglish: [
      { objection: "Owner isme interested nahi honge.", response: "Bilkul sahi baat hai, owners tabhi interested hote hain jab unka revenue badhta hai ya cost bachti hai. Humare system se guest checkout review booster automatically run hota hai jo unki rating aur bookings badhata hai. Main aapko demo me iska proof dikha dunga." }
    ],

    openerHindi: "नमस्ते [Prospect Name] जी, आशा है आपका दिन अच्छा बीत रहा होगा। मैं फरीदाबाद से फोर्ज वेब की तरफ से वंशज बात कर रहा हूँ। मैंने [Hotel Name] की डिटेल्स देखीं और आपके फ्रंट डेस्क ऑपरेशंस के बारे में बात करनी थी। क्या मेरी बात ऑपरेशंस हेड या होटल मैनेजर से हो सकती है?",
    problemStateHindi: "एक मैनेजर के रूप में, हम जानते हैं कि स्टाफ की शिफ्ट्स मैनेज करना, हाउसकीपिंग के काम सौंपना और चेक-इन चेकआउट के मैन्युअल बिल बनाकर शीट्स अपडेट करना कितना सिरदर्द बन जाता है।",
    offerHindi: "हमने इसे सुलझाने के लिए एक स्मार्ट पीएमएस डैशबोर्ड बनाया है जिससे आपका रूम ऑक्यूपेंसी स्टेटस, स्टाफ रोस्टर और इन्वेंट्री सब अपने आप अपडेट हो जाती है। व्हाट्सएप अलर्ट्स के जरिए स्टाफ की उपस्थिति और मेहमानों के ऑटो वेलकम मैसेज भी हैंडल होते हैं।",
    ctaHindi: "मैं आपको एक ५ मिनट का छोटा विजुअल डेमो दिखाना चाहता हूँ जिसे देखकर आप आसानी से ओनर को समझा पाएंगे कि कैसे इससे टीम का समय और तनाव बचेगा। क्या कल दोपहर ३ बजे बात करें?",
    fullScriptHindi: `[प्रतिनिधि]: नमस्ते [Prospect Name] जी, आशा है आपका दिन अच्छा बीत रहा होगा। मैं फरीदाबाद से फोर्ज वेब की तरफ से वंशज बात कर रहा हूँ। मैंने [Hotel Name] की डिटेल्स देखीं और आपके फ्रंट डेस्क ऑपरेशंस के बारे में बात करनी थी। क्या मेरी बात ऑपरेशंस हेड या होटल मैनेजर से हो सकती है?
[संभावित ग्राहक]: हाँ, मैं ही होटल मैनेजर हूँ। बताइए।
[प्रतिनिधि]: जी, एक मैनेजर के रूप में, हम जानते हैं कि स्टाफ की शिफ्ट्स मैनेज करना, हाउसकीपिंग के काम सौंपना और चेक-इन चेकआउट के मैन्युअल बिल बनाकर शीट्स अपडेट करना कितना सिरदर्द बन जाता है।
[प्रतिनिधि]: हमने इसे सुलझाने के लिए एक स्मार्ट पीएमएस डैशबोर्ड बनाया है जिससे आपका रूम ऑक्यूपेंसी स्टेटस, स्टाफ रोस्टर और इन्वेंट्री सब अपने आप अपडेट हो जाती है। व्हाट्सएप अलर्ट्स के जरिए स्टाफ की उपस्थिति और मेहमानों के ऑटो वेलकम मैसेज भी हैंडल होते हैं।
[प्रतिनिधि]: मैं आपको एक ५ मिनट का छोटा विजुअल डेमो दिखाना चाहता हूँ जिसे देखकर आप आसानी से ओनर को समझा पाएंगे कि कैसे इससे टीम का समय और तनाव बचेगा। क्या कल दोपहर ३ बजे बात करें?`,
    pitchPointsHindi: [
      "स्टाफ शेड्यूलिंग और हाउसकीपिंग टास्क असाइन करना हुआ बिल्कुल आसान।",
      "व्हाट्सएप ऑटोमेटेड बुकिंग कंफर्मेशन और ऑटोमैटिक चेक-इन फ्लो।",
      "ऑपरेशंस ऑडिट रिपोर्ट्स जो सीधे ओनर को मेल हो जाती हैं।"
    ],
    objectionsHindi: [
      { objection: "ओनर इसमें रुचि नहीं लेंगे।", response: "बिल्कुल सही बात है, ओनर तभी रुचि लेते हैं जब उनका रेवेन्यू बढ़ता है या खर्च बचता है। हमारे सिस्टम से ऑटोमैटिक रिव्यू बूस्टर चलता है जो सीधे बुकिंग बढ़ाता है। मैं आपको डेमो में इसका प्रूफ दिखा दूंगा।" }
    ]
  },
  
  receptionist: {
    openerHinglish: "Hello, umeed hai aap busy nahi honge. Main Forge Web se Vanshaj baat kar raha hu. Hum hotels ke liye WhatsApp automatic billing aur reservation automation tools banate hain. Kya meri baat hotel ke manager ya owner se ho sakti hai?",
    problemStateHinglish: "Actually humne dekha hai ki front desk par phone calls attend karna, guests ko check-in ke samay manually WiFi codes, welcome menu aur reservation bills WhatsApp par manually send karne me bohot time lagta hai.",
    offerHinglish: "Humara software kya karta hai ki jaise hi guest room book karega, use WhatsApp par automatic welcome kit (WiFi, dining menu, check-in instructions) aur billing details chali jaati hain, jisse receptionist ka 80% repetitive workload khatam ho jata hai.",
    ctaHinglish: "Kya aap mujhe manager ya owner ka contact number de sakte hain, ya unka call back arrange karwa sakte hain taaki hum unhe visual system aur reviews booster dikha sakein?",
    fullScriptHinglish: `[Representative]: Hello, umeed hai aap busy nahi honge. Main Forge Web se Vanshaj baat kar raha hu. Hum hotels ke liye WhatsApp automatic billing aur reservation automation tools banate hain. Kya meri baat hotel ke manager ya owner se ho sakti hai?
[Prospect]: Wo abhi busy hain. Kya kaam tha?
[Representative]: Ji actually humne dekha hai ki front desk par phone calls attend karna, guests ko check-in ke samay manually WiFi codes, welcome menu aur reservation bills WhatsApp par manually send karne me aapka bohot time lagta hai.
[Representative]: Humara software kya karta hai ki jaise hi guest room book karega, use WhatsApp par automatic welcome kit (WiFi, dining menu, check-in instructions) aur billing details chali jaati hain, jisse receptionist ka 80% repetitive workload khatam ho jata hai.
[Representative]: Kya aap mujhe manager ya owner ka contact number de sakte hain, ya unka call back arrange karwa sakte hain taaki hum unhe visual system aur reviews booster dikha sakein?`,
    pitchPointsHinglish: [
      "Guests ko automated check-in details aur WiFi password WhatsApp par instant jana.",
      "Front desk call load aur repetitive customer query load ka 80% kam hona.",
      "Instant feedback links drop checkout par taaki rating achhi rahe."
    ],
    objectionsHinglish: [
      { objection: "Owner call back nahi karenge.", response: "Aap unhe batayiyega ki hum Faridabad se software house hain jo front desk par registers ka jhanjhat aur excel manual updates khatam karke direct WhatsApp billing chala deta hai. Unhe time aur revenue dono bachaane me maza aayega." }
    ],

    openerHindi: "नमस्ते, आशा है आप व्यस्त नहीं होंगे। मैं फोर्ज वेब की तरफ से वंशज बात कर रहा हूँ। हम होटल्स के लिए व्हाट्सएप ऑटोमैटिक बिलिंग और रिजर्वेशन ऑटोमेशन टूल्स बनाते हैं। क्या मेरी बात होटल के मैनेजर या ओनर से हो सकती है?",
    problemStateHindi: "दरअसल हमने देखा है कि फ्रंट डेस्क पर फोन कॉल उठाना, मेहमानों को वाई-फाई कोड, वेलकम मेन्यू और रूम बिल व्हाट्सएप पर मैन्युअल रूप से भेजने में आपका बहुत समय बर्बाद होता है।",
    offerHindi: "हमारा सॉफ्टवेयर क्या करता है कि जैसे ही मेहमान कमरा बुक करेगा, उसे व्हाट्सएप पर ऑटोमैटिक वेलकम किट (वाई-फाई, डाइनिंग मेन्यू, चेक-इन निर्देश) और बिल की डिटेल्स चली जाती हैं, जिससे रिसेप्शनिस्ट का ८०% काम आसान हो जाता है।",
    ctaHindi: "क्या आप मुझे मैनेजर या ओनर का संपर्क नंबर दे सकते हैं, ताकि हम उन्हें यह विजुअल सिस्टम दिखा सकें जिससे उनका काम आसान हो सके?",
    fullScriptHindi: `[प्रतिनिधि]: नमस्ते, आशा है आप व्यस्त नहीं होंगे। मैं फोर्ज वेब की तरफ से वंशज बात कर रहा हूँ। हम होटल्स के लिए व्हाट्सएप ऑटोमैटिक बिलिंग और रिजर्वेशन ऑटोमेशन टूल्स बनाते हैं। क्या मेरी बात होटल के मैनेजर या ओनर से हो सकती है?
[रिसेप्शनिस्ट]: वे अभी व्यस्त हैं। क्या काम था?
[प्रतिनिधि]: जी दरअसल हमने देखा है कि फ्रंट डेस्क पर फोन कॉल उठाना, मेहमानों को वाई-फाई कोड, वेलकम मेन्यू और रूम बिल व्हाट्सएप पर मैन्युअल रूप से भेजने में आपका बहुत समय बर्बाद होता है।
[प्रतिनिधि]: हमारा सॉफ्टवेयर क्या करता है कि जैसे ही मेहमान कमरा बुक करेगा, उसे व्हाट्सएप पर ऑटोमैटिक वेलकम किट (वाई-फाई, डाइनिंग मेन्यू, चेक-इन निर्देश) और बिल की डिटेल्स चली जाती हैं, जिससे रिसेप्शनिस्ट का ८०% काम आसान हो जाता है।
[प्रतिनिधि]: क्या आप मुझे मैनेजर या ओनर का संपर्क नंबर दे सकते हैं, ताकि हम उन्हें यह विजुअल सिस्टम दिखा सकें जिससे उनका काम आसान हो सके?`,
    pitchPointsHindi: [
      "मेहमानों को व्हाट्सएप पर ऑटोमैटिक चेक-इन डिटेल्स और वाई-फाई पासवर्ड तुरंत भेजना।",
      "फ्रंट डेस्क कॉल लोड और बार-बार पूछे जाने वाले सवालों का ८०% कम होना।",
      "चेकआउट पर तुरंत रेटिंग बढ़ाने वाले रिव्यू लिंक्स ऑटोमैटिक चले जाना।"
    ],
    objectionsHindi: [
      { objection: "ओनर कॉल बैक नहीं करेंगे।", response: "आप उन्हें बताइएगा कि हम फरीदाबाद से हैं जो रिसेप्शन पर रजिस्टरों का झंझट खत्म करके सीधे व्हाट्सएप बिलिंग सेटअप करते हैं। यह उन्हें समय और पैसा दोनों बचाने में मदद करेगा।" }
    ]
  },
  isDemo: true
};

// Translated bilingual multi-persona generic / Restaurant mockup script promoting FlashBill POS
const GENERIC_DEMO_SCRIPT: ColdCallScriptResponse = {
  niche: "Restaurant & Cafe / FlashBill POS",
  analysis: "Demo Mode fallback. Optimized for restaurants, cafes, cloud kitchens and retail stores. Specifically promotes FlashBill POS product detailing offline-first billing and QR order options.",
  
  owner: {
    openerHinglish: "Hello [Prospect Name] ji, umeed hai aap acche honge. Main Forge Web se Vanshaj baat kar raha hu. Maine [Company Name] ki details dekhi. Humne restaurants aur cafes ke liye ek special software banaya hai FlashBill POS. Kya meri baat owner ya managing partner se ho sakti hai?",
    problemStateHinglish: "Actually, humne dekha hai ki restaurants me internet slow hone par billing ruk jaati hai ya menu management, customer tables aur QR orders ko alag-alag apps me manage karne me bohot chaos hota hai.",
    offerHinglish: "Isiliye humne **FlashBill POS** banaya hai jo ek complete **Offline-First Billing** software hai. Internet na hone par bhi billing nonstop chalti hai aur data locally safe rehta hai. Isme menu, tables, kitchen management (KOT), QR-code ordering aur automated hourly email reports sab ek hi system me integrated hain.",
    ctaHinglish: "Iska price bohot modular hai, basic features free hain aur modules jaise inventory (₹2,499) ya staff management (₹2,999) aap one-time fee par le sakte hain. Main kal dopahar 12 baje ek short demo dikhau zoom par?",
    fullScriptHinglish: `[Representative]: Hello [Prospect Name] ji, umeed hai aap acche honge. Main Forge Web se Vanshaj baat kar raha hu. Maine [Company Name] ki details dekhi. Humne restaurants aur cafes ke liye ek special software banaya hai FlashBill POS. Kya meri baat owner ya managing partner se ho sakti hai?
[Prospect]: Haan, main hi owner hoon. Bataiye kya product hai?
[Representative]: Great. Actually, humne dekha hai ki restaurants me internet slow hone par billing ruk jaati hai ya menu management, customer tables aur QR orders ko alag-alag apps me manage karne me bohot chaos hota hai.
[Representative]: Isiliye humne **FlashBill POS** banaya hai jo ek complete **Offline-First Billing** software hai. Internet na hone par bhi billing nonstop chalti hai aur data locally safe rehta hai. Isme menu, tables, kitchen management (KOT), QR-code ordering aur automated hourly email reports sab ek hi system me integrated hain.
[Representative]: Iska price bohot modular hai, basic features free hain aur modules jaise inventory (₹2,499) ya staff management (₹2,999) aap one-time fee par le sakte hain. Main kal dopahar 12 baje ek short demo dikhau zoom par?`,
    pitchPointsHinglish: [
      "FlashBill POS: Offline-First billing jisme internet bina bhi continuous billing chalti hai.",
      "Direct QR code orders aur table bookings system ke saath sync.",
      "Modular Pricing: One-time payment (Inventory ₹2,499, Staff ₹2,999, KOT ₹1,999) - no monthly subscription."
    ],
    objectionsHinglish: [
      { objection: "Hum pehle se dusra POS use kar rahe hain.", response: "Bohot badhiya! Par kya aapko usme har month subscription deni padti hai? FlashBill POS modular one-time payment par hai, aur offline billing deta hai, jisse aapka monthly billing software ka kharch zero ho jayega." }
    ],

    openerHindi: "नमस्ते [Prospect Name] जी, आशा है आप अच्छे होंगे। मैं फोर्ज वेब की तरफ से वंशज बात कर रहा हूँ। मैंने [Company Name] की डिटेल्स देखीं। हमने रेस्टोरेंट्स और कैफेस के लिए एक विशेष सॉफ्टवेयर 'फ़्लैशबिल पीओएस' (FlashBill POS) बनाया है। क्या मेरी बात ओनर से हो सकती है?",
    problemStateHindi: "दरअसल, हमने देखा है कि रेस्टोरेंट्स में इंटरनेट धीमा होने पर बिलिंग रुक जाती है या मेन्यू मैनेजमेंट, टेबल्स और क्यूआर ऑर्डर्स को अलग-अलग ऐप्स में मैनेज करने में बहुत परेशानी होती है।",
    offerHindi: "इसीलिए हमने **FlashBill POS** बनाया है जो एक **ऑफ़लाइन-फर्स्ट बिलिंग** सॉफ्टवेयर है। इंटरनेट न होने पर भी बिलिंग नॉनस्टॉप चलती है। इसमें मेन्यू, टेबल, किचन मैनेजमेंट (KOT), क्यूआर-कोड ऑर्डरिंग और ऑटोमैटिक ईमेल रिपोर्ट्स सब एक ही सिस्टम में शामिल हैं।",
    ctaHindi: "इसकी कीमत बहुत ही मॉड्यूलर है, बेसिक फीचर्स शामिल हैं और इन्वेंट्री (₹2,499) या स्टाफ मैनेजमेंट (₹2,999) जैसे मॉड्यूल्स आप वन-टाइम फीस पर ले सकते हैं। क्या कल दोपहर १२ बजे हम एक विजुअल डेमो देख सकते हैं?",
    fullScriptHindi: `[प्रतिनिधि]: नमस्ते [Prospect Name] जी, आशा है आप अच्छे होंगे। मैं फोर्ज वेब की तरफ से वंशज बात कर रहा हूँ। मैंने [Company Name] की डिटेल्स देखीं। हमने रेस्टोरेंट्स और कैफेस के लिए एक विशेष सॉफ्टवेयर 'फ़्लैशबिल पीओएस' बनाया है। क्या मेरी बात ओनर से हो सकती है?
[संभावित ग्राहक]: हाँ, मैं ही ओनर हूँ। बताइए क्या प्रोडक्ट है?
[प्रतिनिधि]: जी। दरअसल, हमने देखा है कि रेस्टोरेंट्स में इंटरनेट धीमा होने पर बिलिंग रुक जाती है या मेन्यू मैनेजमेंट, टेबल्स और क्यूआर ऑर्डर्स को अलग-अलग ऐप्स में मैनेज करने में बहुत परेशानी होती है।
[प्रतिनिधि]: इसीलिए हमने **FlashBill POS** बनाया है जो एक **ऑफ़लाइन-फर्स्ट बिलिंग** सॉफ्टवेयर है। इंटरनेट न होने पर भी बिलिंग नॉनस्टॉप चलती है। इसमें मेन्यू, टेबल, किचन मैनेजमेंट (KOT), क्यूआर-कोड ऑर्डरिंग और ऑटोमैटिक ईमेल रिपोर्ट्स सब एक ही सिस्टम में शामिल हैं।
[प्रतिनिधि]: इसकी कीमत बहुत ही मॉड्यूलर है, बेसिक फीचर्स शामिल हैं और इन्वेंट्री (₹2,499) या स्टाफ मैनेजमेंट (₹2,999) जैसे मॉड्यूल्स आप वन-टाइम फीस पर ले सकते हैं। क्या कल दोपहर १२ बजे हम एक विजुअल डेमो देख सकते हैं?`,
    pitchPointsHindi: [
      "फ़्लैशबिल पीओएस: ऑफ़लाइन-फर्स्ट बिलिंग जिससे बिना इंटरनेट भी बिलिंग नॉनस्टॉप चलती है।",
      "टेबल से सीधे क्यूआर कोड ऑर्डर्स और किचन मैनेजमेंट सिस्टम (KOT) इंटीग्रेशन।",
      "मॉड्यूलर प्राइसिंग: वन-टाइम पेमेंट (इन्वेंट्री ₹2,499, स्टाफ ₹2,999, किचन ₹1,999) - कोई मासिक शुल्क नहीं।"
    ],
    objectionsHindi: [
      { objection: "हम पहले से ही दूसरा पीओएस उपयोग कर रहे हैं।", response: "बहुत बढ़िया! लेकिन क्या आपको उसमें हर महीने चार्ज देना पड़ता है? फ़्लैशबिल पीओएस वन-टाइम पेमेंट पर काम करता है और ऑफ़लाइन बिलिंग देता है, जिससे आपका मासिक खर्च बिल्कुल खत्म हो जाएगा।" }
    ]
  },
  
  manager: {
    openerHinglish: "Hello [Prospect Name] ji, umeed hai aapka din accha jaa raha hoga. Main Forge Web se Vanshaj baat kar raha hu. Humne restaurants ke liye FlashBill POS software banaya hai. Kya meri baat restaurant manager se ho sakti hai?",
    problemStateHinglish: "As a manager, peak hours me kitchen (KOT) aur billing system ke beech mismatch hona aur internet glitch hone par queue lag jana bohot badi headache ban jati hai.",
    offerHinglish: "FlashBill POS modular offline billing software hai jo local network par kitchen orders print kar deta hai bina kisi active internet ke. Aap isme tables order status live track kar sakte hain aur staff performance checklist bhi check kar sakte hain.",
    ctaHinglish: "Main aapko ek 5-minute ka short visual flow dikhana chahta hu jise dekhkar aap owner ko suggest kar sakein ki kaise ye restaurant operations ko automate karega. Kal subah 11 baje connect karein?",
    fullScriptHinglish: `[Representative]: Hello [Prospect Name] ji, umeed hai aapka din accha jaa raha hoga. Main Forge Web se Vanshaj baat kar raha hu. Humne restaurants ke liye FlashBill POS software banaya hai. Kya meri baat restaurant manager se ho sakti hai?
[Prospect]: Haan, main hi manager hoon. Bataiye.
[Representative]: Ji, as a manager, peak hours me kitchen (KOT) aur billing system ke beech mismatch hona aur internet glitch hone par queue lag jana bohot badi headache ban jati hai.
[Representative]: FlashBill POS modular offline billing software hai jo local network par kitchen orders print kar deta hai bina kisi active internet ke. Aap isme tables order status live track kar sakte hain aur staff performance checklist bhi check kar sakte hain.
[Representative]: Main aapko ek 5-minute ka short visual flow dikhana chahta hu jise dekhkar aap owner ko suggest kar sakein ki kaise ye restaurant operations ko automate karega. Kal subah 11 baje connect karein?`,
    pitchPointsHinglish: [
      "KOT kitchen management local network par automatic order routing.",
      "Hourly automatic email summaries expense aur sales tracking ke liye.",
      "Staff shifting, local data billing system."
    ],
    objectionsHinglish: [
      { objection: "Owner change nahi chahte.", response: "Sahi baat hai, par humare setup me data migration hum khud karke dete hain aur training bhi. Isse unke multiple outlets ka data ek central dashboard me live reports me dikhega. Unka fayda hi hoga isme." }
    ],

    openerHindi: "नमस्ते [Prospect Name] जी, आशा है आपका दिन अच्छा बीत रहा होगा। मैं फरीदाबाद से फोर्ज वेब की तरफ से वंशज बात कर रहा हूँ। हमने रेस्टोरेंट्स के लिए फ़्लैशबिल पीओएस बनाया है। क्या मेरी बात रेस्टोरेंट मैनेजर से हो सकती है?",
    problemStateHindi: "एक मैनेजर के रूप में, रश आवर्स में किचन (KOT) और बिलिंग सिस्टम के बीच तालमेल न बैठना और इंटरनेट की खराबी के कारण ग्राहकों की कतार लग जाना बहुत बड़ी समस्या होती है।",
    offerHindi: "फ़्लैशबिल पीओएस एक मॉड्यूल आधारित ऑफ़लाइन बिलिंग सॉफ्टवेयर है जो बिना इंटरनेट के भी लोकल नेटवर्क पर किचन ऑर्डर्स (KOT) प्रिंट कर देता है। आप इसमें टेबल्स के ऑर्डर्स का लाइव स्टेटस देख सकते हैं और स्टाफ शिफ्ट्स मैनेज कर सकते हैं।",
    ctaHindi: "मैं आपको एक ५ मिनट का छोटा विजुअल फ्लो दिखाना चाहता हूँ जिसे देखकर आप ओनर को समझा सकें कि कैसे यह रेस्टोरेंट ऑपरेशंस को आसान करेगा। क्या कल सुबह ११ बजे बात करें?",
    fullScriptHindi: `[प्रतिनिधि]: नमस्ते [Prospect Name] जी, आशा है आपका दिन अच्छा बीत रहा होगा। मैं फरीदाबाद से फोर्ज वेब की तरफ से वंशज बात कर रहा हूँ। हमने रेस्टोरेंट्स के लिए फ़्लैशबिल पीओएस बनाया है। क्या मेरी बात रेस्टोरेंट मैनेजर से हो सकती है?
[संभावित ग्राहक]: हाँ, मैं ही मैनेजर हूँ। बताइए।
[प्रतिनिधि]: जी, रश आवर्स में किचन (KOT) और बिलिंग सिस्टम के बीच तालमेल न बैठना और इंटरनेट की खराबी के कारण ग्राहकों की कतार लग जाना बहुत बड़ी समस्या होती है।
[प्रतिनिधि]: फ़्लैशबिल पीओएस एक मॉड्यूल आधारित ऑफ़लाइन बिलिंग सॉफ्टवेयर है जो बिना इंटरनेट के भी लोकल नेटवर्क पर किचन ऑर्डर्स (KOT) प्रिंट कर देता है। आप इसमें टेबल्स के ऑर्डर्स का लाइव स्टेटस देख सकते हैं और स्टाफ शिफ्ट्स मैनेज कर सकते हैं।
[प्रतिनिधि]: मैं आपको एक ५ मिनट का छोटा विजुअल फ्लो दिखाना चाहता हूँ जिसे देखकर आप ओनर को समझा सकें कि कैसे यह रेस्टोरेंट ऑपरेशंस को आसान करेगा। क्या कल सुबह ११ बजे बात करें?`,
    pitchPointsHindi: [
      "किचन मैनेजमेंट (KOT) लोकल नेटवर्क पर ऑटोमैटिक ऑर्डर प्रिंटिंग के साथ।",
      "खर्च और बिक्री को ट्रैक करने के लिए हर घंटे ऑटोमैटिक ईमेल रिपोर्ट्स।",
      "स्टाफ मैनेजमेंट और लोकल डाटा बिलिंग सिस्टम।"
    ],
    objectionsHindi: [
      { objection: "ओनर बदलाव नहीं चाहते।", response: "सही बात है, लेकिन डेटा माइग्रेशन और ट्रेनिंग हम खुद प्रदान करते हैं। इससे उनके अलग-अलग आउटलेट्स का डेटा एक ही सेंट्रल डैशबोर्ड पर लाइव दिखाई देगा, जो ओनर के लिए भी फायदेमंद होगा।" }
    ]
  },
  
  receptionist: {
    openerHinglish: "Hello, umeed hai aap busy nahi honge. Main Forge Web se Vanshaj baat kar raha hu. Humne restaurants ke liye FlashBill POS automatic billing system banaya hai. Kya meri baat owner ya manager se ho sakti hai?",
    problemStateHinglish: "Actually, jab peak hours me customer bill maangte hain aur slow internet ki wajah se server lag karta hai, toh front desk aur cash counter par kaafi crowd iktha ho jata hai.",
    offerHinglish: "FlashBill POS ek offline-first billing app hai. Isse instant billing bina internet ke chalti hai aur billing counter par delay zero ho jata hai. Saath hi tables par direct QR code order lagane se tables automatic billing me sync ho jaati hain.",
    ctaHinglish: "Kya aap mujhe owner ya manager ka contact number share kar sakte hain taaki hum unhe automatic offline billing aur QR demo arrange karwa sakein?",
    fullScriptHinglish: `[Representative]: Hello, umeed hai aap busy nahi honge. Main Forge Web se Vanshaj baat kar raha hu. Humne restaurants ke liye FlashBill POS automatic billing system banaya hai. Kya meri baat owner ya manager se ho sakti hai?
[Prospect]: Wo busy hain counter par.
[Representative]: Oh, no problem. Actually, jab peak hours me customer bill maangte hain aur slow internet ki wajah se server lag karta hai, toh front desk aur cash counter par kaafi crowd iktha ho jata hai.
[Representative]: FlashBill POS ek offline-first billing app hai. Isse instant billing bina internet ke chalti hai aur billing counter par delay zero ho jata hai. Saath hi tables par direct QR code order lagane se tables automatic billing me sync ho jaati hain.
[Representative]: Kya aap mujhe owner ya manager ka contact number share kar sakte hain taaki hum unhe automatic offline billing aur QR demo arrange karwa sakein?`,
    pitchPointsHinglish: [
      "Offline-first billing jisse counter par queue clear karna fast ho jata hai.",
      "Customer bill automatic print aur table bills integration.",
      "WhatsApp digital billing options checkout par."
    ],
    objectionsHinglish: [
      { objection: "Hum online billing software use kar rahe hain.", response: "Bohot achha hai, par jab net chala jata hai tab manually bills banane padte hain. FlashBill POS me net hone par data sync hota hai aur net na hone par offline billing chalti rehti hai." }
    ],

    openerHindi: "नमस्ते, आशा है आप व्यस्त नहीं होंगे। मैं फोर्ज वेब की तरफ से वंशज बात कर रहा हूँ। हमने रेस्टोरेंट्स के लिए फ़्लैशबिल पीओएस ऑटोमैटिक बिलिंग सिस्टम बनाया है। क्या मेरी बात ओनर या मैनेजर से हो सकती है?",
    problemStateHindi: "दरअसल, जब रश आवर्स में ग्राहक बिल मांगते हैं और धीमे इंटरनेट के कारण बिलिंग सॉफ्टवेयर लोड लेता है, तो कैश काउंटर पर काफी भीड़ जमा हो जाती है।",
    offerHindi: "फ़्लैशबिल पीओएस एक ऑफ़लाइन-फर्स्ट बिलिंग ऐप है। इससे इंटरनेट के बिना भी तुरंत बिलिंग होती है और काउंटर पर बिलिंग में देरी शून्य हो जाती है। साथ ही टेबल पर लगे क्यूआर कोड से सीधे ऑर्डर्स बिलिंग में आ जाते हैं।",
    ctaHindi: "क्या आप मुझे ओनर या मैनेजर का नंबर दे सकते हैं ताकि हम उन्हें यह ऑफ़लाइन बिलिंग और क्यूआर डेमो दिखा सकें जिससे आपका काम आसान हो सके?",
    fullScriptHindi: `[प्रतिनिधि]: नमस्ते, आशा है आप व्यस्त नहीं होंगे। मैं फोर्ज वेब की तरफ से वंशज बात कर रहा हूँ। हमने रेस्टोरेंट्स के लिए फ़्लैशबिल पीओएस ऑटोमैटिक बिलिंग सिस्टम बनाया है। क्या मेरी बात ओनर या मैनेजर से हो सकती है?
[रिसेप्शनिस्ट]: वे अभी काउंटर पर व्यस्त हैं।
[प्रतिनिधि]: ओहो, कोई बात नहीं। दरअसल, जब रश आवर्स में ग्राहक बिल मांगते हैं और धीमे इंटरनेट के कारण बिलिंग सॉफ्टवेयर लोड लेता है, तो कैश काउंटर पर काफी भीड़ जमा हो जाती है।
[प्रतिनिधि]: फ़्लैशबिल पीओएस एक ऑफ़लाइन-फर्स्ट बिलिंग ऐप है। इससे इंटरनेट के बिना भी तुरंत बिलिंग होती है और काउंटर पर बिलिंग में देरी शून्य हो जाती है। साथ ही टेबल पर लगे क्यूआर कोड से सीधे ऑर्डर्स बिलिंग में आ जाते हैं।
[प्रतिनिधि]: क्या आप मुझे ओनर या मैनेजर का नंबर दे सकते हैं ताकि हम उन्हें यह ऑफ़लाइन बिलिंग और क्यूआर डेमो दिखा सकें जिससे आपका काम आसान हो सके?`,
    pitchPointsHindi: [
      "ऑफ़लाइन-फर्स्ट बिलिंग जिससे काउंटर पर बिल बनाना बहुत तेज़ हो जाता है।",
      "ग्राहक का डिजिटल बिल और टेबल बिल इंटीग्रेशन।",
      "चेकआउट पर व्हाट्सएप के जरिए सीधे डिजिटल रसीद भेजने की सुविधा।"
    ],
    objectionsHindi: [
      { objection: "हम ऑनलाइन बिलिंग सॉफ्टवेयर का उपयोग कर रहे हैं।", response: "बहुत अच्छा है, लेकिन जब नेट चला जाता है तब आपको मैन्युअल बिल बनाने पड़ते हैं। फ़्लैशबिल पीओएस में नेट रहने पर डेटा सिंक होता है और नेट न रहने पर भी बिलिंग बिना रुके चलती रहती है।" }
    ]
  },
  isDemo: true
};

const COACHING_DEMO_SCRIPT: ColdCallScriptResponse = {
  niche: "Coaching Classes & Institutes / SMS",
  analysis: "Demo Mode fallback. Optimized for schools, tuition centers, academies, and coaching institutes. Promotes Student Management System (SMS) to track teachers, students, fee collections, test scores, and automate parent updates.",
  
  owner: {
    openerHinglish: "Hello [Prospect Name] ji, umeed hai aapka din accha jaa raha hoga. Main Forge Web se Vanshaj baat kar raha hu. Maine [Company Name] ki details dekhi. Humne coaching classes aur educational institutes ke liye ek specialized dashboard aur automatic messaging flow taiyar kiya hai jise hum Student Management System (SMS) kehte hain. Kya meri baat owner ya managing director se ho sakti hai?",
    problemStateHinglish: "Actually, humne dekha hai ki tuition aur coaching centers me manual operations me bohot time lagta hai - jaise teachers ki payouts calculate karna, student attendance, dynamic batch schedules manage karna, fee reminders, aur test scores parents tak manually message karna. Isme admin staff ka roz ka 3-4 hours chala jata hai aur confusion bana rehta hai.",
    offerHinglish: "Isiliye humara **SMS (Student Management System)** in sabhi chijo ko ek central dashboard me le aata hai. Isme aap teacher management, payouts tracking, student records, fee collection, attendance, aur test scores manage kar sakte hain. Aur automatic SMS notifications parents ko direct attendance update, fee dues, aur test results bhej dete hain bina kisi manual intervention ke.",
    ctaHinglish: "Main aapko is dashboard aur portal ka ek 10-minute ka quick visual demo zoom call par dikhana chahta hu, jisse aap dekh sakein ki isse admin stress kaise khatam hoga aur payouts streamline honge. Kya kal dopahar 3 baje hum connect kar sakte hain?",
    fullScriptHinglish: `[Representative]: Hello [Prospect Name] ji, umeed hai aapka din accha jaa raha hoga. Main Forge Web se Vanshaj baat kar raha hu. Maine [Company Name] ki details dekhi. Humne coaching classes aur educational institutes ke liye ek specialized dashboard aur automatic messaging flow taiyar kiya hai jise hum Student Management System (SMS) kehte hain. Kya meri baat owner ya managing director se ho sakti hai?
[Prospect]: Haan, main hi owner hoon. Bataiye kya platform hai ye?
[Representative]: Great. Actually, humne dekha hai ki tuition aur coaching centers me manual operations me bohot time lagta hai - jaise teachers ki payouts calculate karna, student attendance, dynamic batch schedules manage karna, fee reminders, aur test scores parents tak manually message karna. Isme admin staff ka roz ka 3-4 hours chala jata hai aur confusion bana rehta hai.
[Representative]: Isiliye humara **SMS (Student Management System)** in sabhi chijo ko ek central dashboard me le aata hai. Isme aap teacher management, payouts tracking, student records, fee collection, attendance, aur test scores manage kar sakte hain. Aur automatic SMS notifications parents ko direct attendance update, fee dues, aur test results bhej dete hain bina kisi manual intervention ke.
[Representative]: Main aapko is dashboard aur portal ka ek 10-minute ka quick visual demo zoom call par dikhana chahta hu, jisse aap dekh sakein ki isse admin stress kaise khatam hoga aur payouts streamline honge. Kya kal dopahar 3 baje hum connect kar sakte hain?`,
    pitchPointsHinglish: [
      "Center management system jo teachers, students, fees, attendance aur test results ko compile karta hai.",
      "Automated SMS alerts jo parents ko fee reminders, attendance notification aur test scores instantly bhejte hain.",
      "Payouts module jo teachers ki billing aur payouts scheduling ko automate karta hai."
    ],
    objectionsHinglish: [
      { objection: "Hum pehle se Excel aur WhatsApp group use kar rahe hain.", response: "Excel me history maintain karna aur data safety unstable hoti hai, aur WhatsApp groups par parents message dhyan nahi dete. Humare SMS system me individual progress report aur automatic fee reminder directly parents ke private messages par jaate hain, jisse collections 40% tak fast ho jaate hain." }
    ],

    openerHindi: "नमस्ते [Prospect Name] जी, आशा है आपका दिन अच्छा बीत रहा होगा। मैं फरीदाबाद से फोर्ज वेब की तरफ से वंशज बात कर रहा हूँ। मैंने [Company Name] की डिटेल्स देखीं। हमने कोचिंग क्लासेस और शिक्षण संस्थानों के लिए एक विशेष डैशबोर्ड और ऑटोमैटिक पैरेंट अपडेट सिस्टम तैयार किया है जिसे हम 'स्टूडेंट मैनेजमेंट सिस्टम' (SMS) कहते हैं। क्या मेरी बात ओनर से हो सकती है?",
    problemStateHindi: "दरअसल, हमने देखा है कि कोचिंग और ट्यूशन सेंटर्स में मैन्युअल कामों में बहुत समय खर्च होता है - जैसे टीचर्स के पेआउट की गणना करना, छात्रों की उपस्थिति, बैच शेड्यूल बनाना, फीस रिमाइंडर भेजना और टेस्ट के मार्क्स पेरेंट्स को मैन्युअल रूप से भेजना। इसमें रोज का ३-४ घंटा बर्बाद हो जाता है।",
    offerHindi: "इसीलिए हमारा **SMS (Student Management System)** इन सभी चीजों को एक सेंट्रल डैशबोर्ड में लाता है। इसमें आप टीचर मैनेजमेंट, पेआउट कैलकुलेशन, स्टूडेंट रिकॉर्ड्स, फीस कलेक्शन, अटेंडेंस और टेस्ट स्कोर्स एक ही जगह मैनेज कर सकते हैं। साथ ही, बच्चों की हाजिरी और परीक्षा के नंबर ऑटोमैटिक एसएमएस (SMS) के जरिए पेरेंट्स को तुरंत चले जाते हैं।",
    ctaHindi: "मैं आपको इस एडमिन पोर्टल का एक १० मिनट का विजुअल डेमो दिखाना चाहता हूँ जिससे आप देख सकें कि आपके कोचिंग के ऑपरेशंस कैसे आसान होंगे। क्या कल दोपहर ३ बजे बात कर सकते हैं?",
    fullScriptHindi: `[प्रतिनिधि]: नमस्ते [Prospect Name] जी, आशा है आपका दिन अच्छा बीत रहा होगा। मैं फरीदाबाद से फोर्ज वेब की तरफ से वंशज बात कर रहा हूँ। मैंने [Company Name] की डिटेल्स देखीं। हमने कोचिंग क्लासेस और शिक्षण संस्थानों के लिए एक विशेष डैशबोर्ड और ऑटोमैटिक पैरेंट अपडेट सिस्टम तैयार किया है जिसे हम 'स्टूडेंट मैनेजमेंट सिस्टम' (SMS) कहते हैं। क्या मेरी बात ओनर से हो सकती है?
[संभावित ग्राहक]: हाँ, मैं ही ओनर हूँ। बताइए।
[प्रतिनिधि]: जी। दरअसल, हमने देखा है कि कोचिंग और ट्यूशन सेंटर्स में मैन्युअल कामों में बहुत समय खर्च होता है - जैसे टीचर्स के पेआउट की गणना करना, छात्रों की उपस्थिति, बैच शेड्यूल बनाना, फीस रिमाइंडर भेजना और टेस्ट के मार्क्स पेरेंट्स को मैन्युअल रूप से भेजना। इसमें रोज का ३-४ घंटा बर्बाद हो जाता है।
[प्रतिनिधि]: इसीलिए हमारा **SMS (Student Management System)** इन सभी चीजों को एक सेंट्रल डैशबोर्ड में लाता है। इसमें आप टीचर मैनेजमेंट, पेआउट कैलकुलेशन, स्टूडेंट रिकॉर्ड्स, फीस कलेक्शन, अटेंडेंस और टेस्ट स्कोर्स एक ही जगह मैनेज कर सकते हैं। साथ ही, बच्चों की हाजिरी और परीक्षा के नंबर ऑटोमैटिक एसएमएस (SMS) के जरिए पेरेंट्स को तुरंत चले जाते हैं।
[प्रतिनिधि]: मैं आपको इस एडमिन पोर्टल का एक १० मिनट का विजुअल डेमो दिखाना चाहता हूँ जिससे आप देख सकें कि आपके कोचिंग के ऑपरेशंस कैसे आसान होंगे। क्या कल दोपहर ३ बजे बात कर सकते हैं?`,
    pitchPointsHindi: [
      "कोचिंग एडमिन सिस्टम जिससे टीचर, स्टूडेंट, फीस, हाजिरी और टेस्ट रिकॉर्ड्स एक जगह आ जाते हैं।",
      "ऑटोमैटिक पैरेंट अपडेट्स (SMS/WhatsApp) जिससे अटेंडेंस और टेस्ट स्कोर्स तुरंत पेरेंट्स के पास चले जाते हैं।",
      "टीचर पेआउट्स गणना जो प्रति-क्लास या प्रति-छात्र दर के आधार पर अपने आप हो जाती है।"
    ],
    objectionsHindi: [
      { objection: "हम व्हाट्सऐप ग्रुप से सब मैनेज कर लेते हैं।", response: "बहुत बढ़िया, लेकिन व्हाट्सऐप ग्रुप में पुरानी रिपोर्ट्स खोजना मुश्किल होता है और माता-पिता मैसेज इग्नोर कर देते हैं। हमारे सिस्टम से पर्सनलाइज्ड रिपोर्ट्स और फीस रिमाइंडर पेरेंट्स के फोन पर सीधे जाते हैं, जिससे समय पर फीस कलेक्शन ३५-४०% बढ़ जाता है।" }
    ]
  },

  manager: {
    openerHinglish: "Hello [Prospect Name] ji, umeed hai aapka din accha jaa raha hoga. Main Forge Web se Vanshaj baat kar raha hu. Maine [Company Name] ki details dekhi. Hum educational institutes ke liye admin systems banate hain. Kya meri baat center manager ya administrator se ho sakti hai?",
    problemStateHinglish: "As a manager, roz ki attendance registers check karna, teachers ki dynamic classes count karke payouts banana aur har test ke baad marksheets banake upload karna kaafi exhausting aur chaotic ho jata hai.",
    offerHinglish: "Humara Student Management System (SMS) center manager ke liye class rosters, auto teacher checkout reports, automatic fee due templates aur test logs generate karne ko super easy bana deta hai. Bas aap dashboard me list update kijiye, automated messages parents ko chale jaate hain.",
    ctaHinglish: "Main aapko ek short 5-minute ka visual layout dikhana chahta hu jisse aap evaluate kar sakein ki isse center coordinating kitni easy ho jayegi aur aap owner ko suggest kar sakein. Kya kal subah 11 baje hum connect karein?",
    fullScriptHinglish: `[Representative]: Hello [Prospect Name] ji, umeed hai aapka din accha jaa raha hoga. Main Forge Web se Vanshaj baat kar raha hu. Maine [Company Name] ki details dekhi. Hum educational institutes ke liye admin systems banate hain. Kya meri baat center manager ya administrator se ho sakti hai?
[Prospect]: Haan, main hi center manager hoon. Bataiye.
[Representative]: Ji, as a manager, roz ki attendance registers check karna, teachers ki dynamic classes count karke payouts banana aur har test ke baad marksheets banake upload karna kaafi exhausting aur chaotic ho jata hai.
[Representative]: Humara Student Management System (SMS) center manager ke liye class rosters, auto teacher checkout reports, automatic fee due templates aur test logs generate karne ko super easy bana deta hai. Bas aap dashboard me list update kijiye, automated messages parents ko chale jaate hain.
[Representative]: Main aapko ek short 5-minute ka visual layout dikhana chahta hu jisse aap evaluate kar sakein ki isse center coordinating kitni easy ho jayegi aur aap owner ko suggest kar sakein. Kya kal subah 11 baje hum connect karein?`,
    pitchPointsHinglish: [
      "Center management dashboards jisse single panel me admin tasks align ho sakein.",
      "Teachers class-wise details aur payouts logs automatically tracking.",
      "Automatic notifications alerts dashboard feedback update."
    ],
    objectionsHinglish: [
      { objection: "Humari team ko training leni padegi.", response: "Humara interface basic WhatsApp jitna easy hai, aur software installation ke saath pure staff ki complete offline/online training aur handholding humari team handle karegi." }
    ],

    openerHindi: "नमस्ते [Prospect Name] जी, आशा है आपका दिन अच्छा बीत रहा होगा। मैं फरीदाबाद से फोर्ज वेब की तरफ से वंशज बात कर रहा हूँ। हम शिक्षण संस्थानों के लिए एडमिनिस्ट्रेशन टूल्स बनाते हैं। क्या मेरी बात सेंटर मैनेजर या एडमिनिस्ट्रेटर से हो सकती है?",
    problemStateHindi: "एक मैनेजर के रूप में, रोज की अटेंडेंस रजिस्टर्स संभालना, टीचर्स के अलग-अलग क्लासेस काउंट करके पेआउट्स की गणना करना और टेस्ट के बाद छात्रों के रिपोर्ट कार्ड्स बनाना बहुत थकाऊ और जटिल काम हो जाता है।",
    offerHindi: "हमारा स्टूडेंट मैनेजमेंट सिस्टम (SMS) क्लास रोस्टर्स, ऑटोमैटिक टीचर पेआउट रिपोर्ट्स, फीस ड्यू टेम्पलेट्स और टेस्ट लॉग्स जनरेट करना बहुत आसान बना देता है। बस आप डैशबोर्ड में विवरण अपडेट करते हैं, और पेरेंट्स को ऑटोमैटिक एसएमएस चले जाते हैं।",
    ctaHindi: "मैं आपको ५ मिनट का विजुअल लेआउट दिखाना चाहता हूँ जिससे आप देख सकें कि इससे सेंटर का काम कितना आसान हो जाएगा और आप ओनर को सुझाव दे सकें। क्या कल सुबह ११ बजे बात करें?",
    fullScriptHindi: `[प्रतिनिधि]: नमस्ते [Prospect Name] जी, आशा है आपका दिन अच्छा बीत रहा होगा। मैं फरीदाबाद से फोर्ज वेब की तरफ से वंशज बात कर रहा हूँ। हम शिक्षण संस्थानों के लिए एडमिनिस्ट्रेशन टूल्स बनाते हैं। क्या मेरी बात सेंटर मैनेजर या एडमिनिस्ट्रेटर से हो सकती है?
[संभावित ग्राहक]: हाँ, मैं ही सेंटर मैनेजर हूँ। बताइए।
[प्रतिनिधि]: जी, एक मैनेजर के रूप में, रोज की अटेंडेंस रजिस्टर्स संभालना, टीचर्स के अलग-अलग क्लासेस काउंट करके पेआउट्स की गणना करना और टेस्ट के बाद छात्रों के रिपोर्ट कार्ड्स बनाना बहुत थकाऊ और जटिल काम हो जाता है।
[प्रतिनिधि]: हमारा स्टूडेंट मैनेजमेंट सिस्टम (SMS) क्लास रोस्टर्स, ऑटोमैटिक टीचर पेआउट रिपोर्ट्स, फीस ड्यू टेम्पलेट्स और टेस्ट लॉग्स जनरेट करना बहुत आसान बना देता है। बस आप डैशबोर्ड में विवरण अपडेट करते हैं, और पेरेंट्स को ऑटोमैटिक एसएमएस चले जाते हैं।
[प्रतिनिधि]: मैं आपको ५ मिनट का विजुअल लेआउट दिखाना चाहता हूँ जिससे आप देख सकें कि इससे सेंटर का काम कितना आसान हो जाएगा और आप ओनर को सुझाव दे सकें। क्या कल सुबह ११ बजे बात करें?`,
    pitchPointsHindi: [
      "सेंटर मैनेजमेंट डैशबोर्ड जिससे एक ही पैनल में एडमिन के सारे कार्य व्यवस्थित हो जाते हैं।",
      "टीचर्स की क्लास-वार डिटेल्स और पेआउट लॉग्स का ऑटोमैटिक हिसाब-किताब।",
      "हाजिरी, टेस्ट स्कोर्स और फीस के लिए पैरेंट्स को जाने वाले ऑटोमैटिक नोटिफिकेशन।"
    ],
    objectionsHindi: [
      { objection: "हमारी टीम को इसे सीखने में समय लगेगा।", response: "हमारा सॉफ्टवेयर व्हाट्सएप की तरह बेहद आसान है, और सेटअप के साथ पूरे स्टाफ की ट्रेनिंग और सपोर्ट हमारी जिम्मेदारी है।" }
    ]
  },

  receptionist: {
    openerHinglish: "Hello, umeed hai aap busy nahi honge. Main Forge Web se Vanshaj baat kar raha hu. Hum educational institutes ke liye admin messaging aur parent automation systems banate hain. Kya meri baat owner ya administrator se ho sakti hai?",
    problemStateHinglish: "Actually humne dekha hai ki front desk par student queries handle karna, unki daily attendance sheets manually update karna, aur test records print karke file karne me reception par kafi load rehta hai.",
    offerHinglish: "Humara Student Management System (SMS) kya karta hai ki class ke aate hi front desk se attendance register click karte hi parents ke phone par dynamic SMS notification chala jata hai. Isme teacher payout aur fees data automatically update hote hain, jisse repetitive data typing aur parent verification calls 80% kam ho jaate hain.",
    ctaHinglish: "Kya aap mujhe owner ya manager ka contact details share kar sakte hain taaki hum unhe visual system live dikha sakein aur unka call sync kar sakein?",
    fullScriptHinglish: `[Representative]: Hello, umeed hai aap busy nahi honge. Main Forge Web se Vanshaj baat kar raha hu. Hum educational institutes ke liye admin messaging aur parent automation systems banate hain. Kya meri baat owner ya administrator se ho sakti hai?
[Prospect]: Wo abhi classroom me hain class le rahe hain.
[Representative]: Oh okay, no problem. Actually humne dekha hai ki front desk par student queries handle karna, unki daily attendance sheets manually update karna, aur test records print karke file karne me reception par kafi load rehta hai.
[Representative]: Humara Student Management System (SMS) kya karta hai ki class ke aate hi front desk se attendance register click karte hi parents ke phone par dynamic SMS notification chala jata hai. Isme teacher payout aur fees data automatically update hote hain, jisse repetitive data typing aur parent verification calls 80% kam ho jaate hain.
[Representative]: Kya aap mujhe owner ya manager ka contact details share kar sakte hain taaki hum unhe visual system live dikha sakein aur unka call sync kar sakein?`,
    pitchPointsHinglish: [
      "Daily registration inquiry automatic tracking aur management.",
      "Front desk manual billing receipts aur parent reports digital formats me.",
      "Single-click attendance alert parent sms triggers."
    ],
    objectionsHinglish: [
      { objection: "Main number nahi de sakti.", response: "Samajh sakta hu, aap unhe bata dijiyega ki Forge Web se Vanshaj ka phone aaya tha jo coaching center ka billing aur teachers payout automated dashboard setup karte hain. Main email bhej raha hu, jab wo free honge tab aapse number lekar call sync karenge." }
    ],

    openerHindi: "नमस्ते, आशा है आप व्यस्त नहीं होंगे। मैं फोर्ज वेब की तरफ से वंशज बात कर रहा हूँ। हम शिक्षण संस्थानों के लिए एडमिन ऑटोमेशन और पैरेंट अपडेट सिस्टम बनाते हैं। क्या मेरी बात ओनर या एडमिनिस्ट्रेटर से हो सकती है?",
    problemStateHindi: "दरअसल हमने देखा है कि फ्रंट डेस्क पर छात्र-छात्राओं की पूछताछ संभालना, उनकी दैनिक उपस्थिति रजिस्टर्स में चढ़ाना, और टेस्ट रिकॉर्ड्स फाइल करने में फ्रंट डेस्क पर बहुत दबाव रहता है।",
    offerHindi: "हमारा स्टूडेंट मैनेजमेंट सिस्टम (SMS) क्या करता है कि उपस्थिति दर्ज करते ही पैरेंट्स के फोन पर हाजिरी का मैसेज खुद-ब-खुद चला जाता है। साथ ही फीस और टीचर पेआउट की गणना भी अपने आप हो जाती है, जिससे रिसेप्शनिस्ट का ८०% मैन्युअल काम खत्म हो जाता है।",
    ctaHindi: "क्या आप मुझे ओनर या मैनेजर का नंबर दे सकते हैं ताकि हम उन्हें यह विजुअल सिस्टम दिखा सकें जिससे रिसेप्शन का लोड कम हो सके?",
    fullScriptHindi: `[प्रतिनिधि]: नमस्ते, आशा है आप व्यस्त नहीं होंगे। मैं फोर्ज वेब की तरफ से वंशज बात कर रहा हूँ। हम शिक्षण संस्थानों के लिए एडमिन ऑटोमेशन और पैरेंट अपडेट सिस्टम बनाते हैं। क्या मेरी बात ओनर या एडमिनिस्ट्रेटर से हो सकती है?
[रिसेप्शनिस्ट]: वे अभी क्लास ले रहे हैं।
[प्रतिनिधि]: जी कोई बात नहीं। दरअसल हमने देखा है कि फ्रंट डेस्क पर छात्र-छात्राओं की पूछताछ संभालना, उनकी दैनिक उपस्थिति रजिस्टर्स में चढ़ाना, और टेस्ट रिकॉर्ड्स फाइल करने में फ्रंट डेस्क पर बहुत दबाव रहता है।
[प्रतिनिधि]: हमारा स्टूडेंट मैनेजमेंट सिस्टम (SMS) क्या करता है कि उपस्थिति दर्ज करते ही पैरेंट्स के फोन पर हाजिरी का मैसेज खुद-ब-खुद चला जाता है। साथ ही फीस और टीचर पेआउट की गणना भी अपने आप हो जाती है, जिससे रिसेप्शनिस्ट का ८०% मैन्युअल काम खत्म हो जाता है।
[प्रतिनिधि]: क्या आप मुझे ओनर या मैनेजर का नंबर दे सकते हैं ताकि हम उन्हें यह विजुअल सिस्टम दिखा सकें जिससे रिसेप्शन का लोड कम हो सके?`,
    pitchPointsHindi: [
      "डेली रजिस्ट्रेशन इंक्वायरी का ऑटोमैटिक मैनेजमेंट और ट्रैकिंग।",
      "मैन्युअल रसीदों और रिपोर्ट कार्ड्स का डिजिटल फॉर्मेट में जनरेशन।",
      "सिंगल-क्लिक हाजिरी मार्क होते ही पैरेंट्स को ऑटोमैटिक अलर्ट जाना।"
    ],
    objectionsHindi: [
      { objection: "मैं ओनर का नंबर नहीं दे सकती।", response: "मैं समझ सकता हूँ। आप उन्हें बता दीजिएगा कि फोर्ज वेब से वंशज का फोन आया था जो कोचिंग सेंटर्स के बिलिंग और पेआउट्स को ऑटोमैटिक करने में मदद करते हैं। मैं आपको विवरण भेज देता हूँ, आप उन्हें दिखा दीजिएगा।" }
    ]
  },
  isDemo: true
};

/**
 * Detects if a lead's business is in a specific sector:
 * - Hotel
 * - Restaurant (promoting FlashBill POS)
 * - Coaching/Institute (promoting SMS)
 */
function getBusinessNiche(lead: Lead): "hotel" | "restaurant" | "coaching" | "general" {
  const name = (lead.businessName || "").toLowerCase();
  const naics = (lead.businessNaicsDescription || "").toLowerCase();
  
  const hotelKeywords = ["hotel", "resort", "motel", "inn", "stay", "accommodation", "lodging", "villa", "suites"];
  const restaurantKeywords = ["restaurant", "cafe", "dhaba", "canteen", "kitchen", "food", "dining", "bakery", "sweets", "bistro", "pizza", "burger", "outlet"];
  const coachingKeywords = ["coaching", "institute", "school", "academy", "tutorial", "classes", "education", "college", "tuition", "training", "center"];

  if (hotelKeywords.some(kw => name.includes(kw) || naics.includes(kw))) {
    return "hotel";
  }
  if (restaurantKeywords.some(kw => name.includes(kw) || naics.includes(kw))) {
    return "restaurant";
  }
  if (coachingKeywords.some(kw => name.includes(kw) || naics.includes(kw))) {
    return "coaching";
  }
  
  return "general";
}

/**
 * Generates a tailored cold call script in Hinglish & Hindi for 3 personas.
 */
export async function generateColdCallScript(
  lead: Lead,
  userInstructions?: string
): Promise<ColdCallScriptResponse> {
  const apiKey = process.env.GEMINI_API_KEY;
  const niche = getBusinessNiche(lead);

  // If apiKey is missing, return offline fallbacks
  if (!apiKey || apiKey.trim() === "") {
    let baseScript: ColdCallScriptResponse;
    if (niche === "hotel") {
      baseScript = JSON.parse(JSON.stringify(HOTEL_DEMO_SCRIPT));
    } else if (niche === "coaching") {
      baseScript = JSON.parse(JSON.stringify(COACHING_DEMO_SCRIPT));
    } else {
      baseScript = JSON.parse(JSON.stringify(GENERIC_DEMO_SCRIPT));
    }

    const pName = lead.prospectFullName || "there";
    const bName = lead.businessName || (niche === "hotel" ? "your hotel" : "your business");

    const personas: Array<"owner" | "manager" | "receptionist"> = ["owner", "manager", "receptionist"];
    personas.forEach(p => {
      baseScript[p].openerHinglish = baseScript[p].openerHinglish
        .replace("[Prospect Name]", pName)
        .replace("[Hotel Name]", bName)
        .replace("[Company Name]", bName);
      baseScript[p].fullScriptHinglish = baseScript[p].fullScriptHinglish
        .replace(/\[Prospect Name\]/g, pName)
        .replace(/\[Hotel Name\]/g, bName)
        .replace(/\[Company Name\]/g, bName);

      baseScript[p].openerHindi = baseScript[p].openerHindi
        .replace("[Prospect Name]", pName)
        .replace("[Hotel Name]", bName)
        .replace("[Company Name]", bName);
      baseScript[p].fullScriptHindi = baseScript[p].fullScriptHindi
        .replace(/\[Prospect Name\]/g, pName)
        .replace(/\[Hotel Name\]/g, bName)
        .replace(/\[Company Name\]/g, bName);
    });

    if (userInstructions) {
      baseScript.analysis = `Demo Mode (Tuned with instructions: "${userInstructions}"). Live API key is missing.`;
    }
    
    return baseScript;
  }

  // Guidelines depending on the niche
  let productGuidelines = "";
  if (niche === "hotel") {
    productGuidelines = `
Target Product: Hotel PMS Dashboard & WhatsApp Automation.
- Focus on Room booking calendar, OTA channel manager, staff rosters.
- WhatsApp auto check-in receipts, guest welcome info, Google Review Booster (increases reviews by 30-40%).
- Replaces Excel sheets and registers, saving 6-8 hours daily.
`;
  } else if (niche === "restaurant") {
    productGuidelines = `
Target Product: FlashBill POS (Offline-First Billing & Business Management Software).
- MUST promote FlashBill POS!
- Focus on Offline-first billing (no internet required), local data storage, menu/table bookings, QR code orders, KOT kitchen routing, and hourly automated email reports.
- Emphasize modular one-time pricing structure: Inventory module (₹2,499), Staff module (₹2,999), Kitchen module (₹1,999), QR orders (₹1,299), and multiple devices (₹500/device).
`;
  } else if (niche === "coaching") {
    productGuidelines = `
Target Product: SMS (Student Management System).
- MUST promote Student Management System (SMS)!
- Focus on managing everything in one dashboard: Teacher payouts, Student fees records, Course/batch scheduling, Attendance, Feed updates, Test scores.
- Emphasize automated SMS notifications/reminders sent to parents automatically for fee dues, test scores, or attendance.
`;
  } else {
    productGuidelines = `
Target Product: Forge Web custom software and WhatsApp API triggers.
- Focus on tailored CRM systems, e-commerce apps, automated invoicing, and messaging triggers.
`;
  }

  const prompt = `
You are an expert sales trainer and copywriter. Generate a highly effective, natural, conversational cold call script in BOTH Hinglish (conversational Hindi transliterated in the Roman script) and pure Hindi (Devanagari script) for a sales representative at Forge Web calling a prospect lead.

Prospect Lead Details:
- Prospect Full Name: ${lead.prospectFullName}
- Job Title: ${lead.prospectJobTitle || "N/A"}
- Company Name: ${lead.businessName || "their company"}
- Website: ${lead.businessWebsite || "N/A"}
- Industry/Niche: ${lead.businessNaicsDescription || "N/A"}
- Location: ${[lead.businessRegion, lead.businessCountry].filter(Boolean).join(", ") || "N/A"}

Company Pitching: Forge Web (Software Production House)
${FORGE_WEB_CATALOG}

Niche-Specific Product Requirements for this Lead:
${productGuidelines}

Persona Customization Instructions:
You must generate THREE distinct scripts, one for each target persona we speak to:
1. "owner": Direct pitch focused on ROI, growth, saving business cost/time, and booking a demo.
2. "manager": Focused on streamlining operations, shifts, KOT/staff management, automated reports, and empowering them to pitch this idea to the owner to reduce workload.
3. "receptionist": Gatekeeper pitch. Focused on how the software makes front-desk repetitive tasks incredibly easy (automated WhatsApp receipts/welcome info, no manual typing) so they don't get bogged down. The goal is to get the owner/manager contact info or call back.

Output your response as a valid JSON object matching the following structure:
{
  "niche": "Identified niche name (e.g. Hotel, Restaurant, Coaching, Custom Software)",
  "analysis": "A brief 1-2 sentence explanation of the customization angle for this lead.",
  "owner": {
    "openerHinglish": "Greeting and hook in HINGLISH",
    "problemStateHinglish": "Industry problems in HINGLISH",
    "offerHinglish": "Forge Web pitch in HINGLISH",
    "ctaHinglish": "CTA demo booking in HINGLISH",
    "fullScriptHinglish": "Full script dialogue flow in HINGLISH. Use [Representative] and [Prospect] tags.",
    "objectionsHinglish": [
      { "objection": "Objection 1", "response": "Response 1" }
    ],
    "pitchPointsHinglish": ["Benefit 1", "Benefit 2"],
    
    "openerHindi": "Greeting in Devanagari HINDI",
    "problemStateHindi": "Problems in Devanagari HINDI",
    "offerHindi": "Pitch in Devanagari HINDI",
    "ctaHindi": "CTA in Devanagari HINDI",
    "fullScriptHindi": "Full script dialogue flow in Devanagari HINDI. Use [प्रतिनिधि] and [संभावित ग्राहक] tags.",
    "objectionsHindi": [
      { "objection": "ऑब्जेक्शन 1", "response": "उत्तर 1" }
    ],
    "pitchPointsHindi": ["लाभ 1", "लाभ 2"]
  },
  "manager": {
    // Same structure as owner above containing Hinglish and Hindi properties
  },
  "receptionist": {
    // Same structure as owner above containing Hinglish and Hindi properties
  }
}

${userInstructions ? `Additional request from user (incorporate this in the script style/focus): "${userInstructions}"` : ""}

IMPORTANT: Return ONLY the raw JSON object. Do not include markdown code block syntax (like \`\`\`json) or any other text. Output parseable JSON.
`;

  try {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${apiKey}`;
    
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
        generationConfig: {
          responseMimeType: "application/json",
          temperature: 0.2,
        },
      }),
    });

    if (!res.ok) {
      throw new Error(`Gemini API error: ${res.statusText}`);
    }

    const data = await res.json();
    const textResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!textResponse) {
      throw new Error("Empty response received from Gemini API");
    }

    const parsed: ColdCallScriptResponse = JSON.parse(textResponse.trim());
    return {
      ...parsed,
      isDemo: false
    };
  } catch (error: any) {
    console.error("Error generating multi-persona script:", error);
    // Degrade to fallbacks
    const baseScript = JSON.parse(JSON.stringify(niche === "hotel" ? HOTEL_DEMO_SCRIPT : (niche === "coaching" ? COACHING_DEMO_SCRIPT : GENERIC_DEMO_SCRIPT)));
    const pName = lead.prospectFullName || "there";
    const bName = lead.businessName || (niche === "hotel" ? "your hotel" : "your business");

    const personas: Array<"owner" | "manager" | "receptionist"> = ["owner", "manager", "receptionist"];
    personas.forEach(p => {
      baseScript[p].openerHinglish = baseScript[p].openerHinglish.replace("[Prospect Name]", pName).replace("[Hotel Name]", bName).replace("[Company Name]", bName);
      baseScript[p].fullScriptHinglish = baseScript[p].fullScriptHinglish.replace(/\[Prospect Name\]/g, pName).replace(/\[Hotel Name\]/g, bName).replace(/\[Company Name\]/g, bName);
      baseScript[p].openerHindi = baseScript[p].openerHindi.replace("[Prospect Name]", pName).replace("[Hotel Name]", bName).replace("[Company Name]", bName);
      baseScript[p].fullScriptHindi = baseScript[p].fullScriptHindi.replace(/\[Prospect Name\]/g, pName).replace(/\[Hotel Name\]/g, bName).replace(/\[Company Name\]/g, bName);
    });

    baseScript.analysis = `Notice: Live generation error (${error.message || "Parse Error"}). Displaying bilingual fallback script.`;
    return baseScript;
  }
}
