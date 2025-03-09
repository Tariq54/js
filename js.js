const net = require('net');
const JSONStream = require('JSONStream'); // لتحليل البيانات المرسلة من Stratum
const {
    Buffer
} = require('buffer');

// بيانات الاتصال بـ Antpool
const POOL_HOST = 'stratum+tcp://stratum-ethw.antpool.com:8009';
const POOL_PORT = 8009;
const USERNAME = 'ali1wael'; // استبدل بـ اسم المستخدم الخاص بك
const PASSWORD = 'x'; // استبدل بـ كلمة المرور
const WALLET_ADDRESS = '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa'; // استبدل بـ عنوان المحفظة الخاص بك

// إنشاء اتصال TCP مع خادم Stratum
const client = new net.Socket();

// الاتصال بالخادم
client.connect(POOL_PORT, POOL_HOST, function () {
    console.log('تم الاتصال بـ Antpool بنجاح!');

    // إرسال طلب الاشتراك
    const subscribeMessage = {
        id: 1,
        method: "mining.subscribe",
        params: []
    };
    client.write(JSON.stringify(subscribeMessage) + '\n'); // إرسال الطلب عبر TCP

    // إرسال طلب التفويض
    const authorizeMessage = {
        id: 2,
        method: "mining.authorize",
        params: [USERNAME, PASSWORD]
    };
    client.write(JSON.stringify(authorizeMessage) + '\n'); // إرسال الطلب عبر TCP
});

// استلام الردود
client.on('data', function (data) {
    console.log('الرد: ' + data.toString());
});

// التعامل مع الأخطاء
client.on('error', function (err) {
    console.error('خطأ في الاتصال: ', err.message);
});

// إغلاق الاتصال عند الانتهاء
client.on('close', function () {
    console.log('تم إغلاق الاتصال.');
});
