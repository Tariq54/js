const dgram = require('dgram');
const { exec } = require('child_process');

// إعدادات التعدين
const POOL_URL = "stratum+tcp://ss.antpool.com:3333";
const WALLET_ADDRESS = "bc1qu5tm5mwrl45v8sr4ayrrce6rnzspv3xmtvet0l";
const WORKER_NAME = "ali1wael";
const XMRIG_PATH = "C:\\Users\\deval\\Desktop\\xmrig-6.22.2\\xmrig.exe";

// إعدادات خادم VoIP
const VOIP_SERVER_IP = "0.0.0.0";
const VOIP_PORT = 5060;
const VOIP_USERNAME = "1001";
const VOIP_PASSWORD = "100";
const VOIP_DOMAIN = "200.0.57.114";

// تشغيل التعدين
function startMining() {
    console.log("[+] بدء التعدين عبر TCP:", POOL_URL);
    const miningCommand = "${XMRIG_PATH}" -o ${POOL_URL} -u ${WALLET_ADDRESS}.${WORKER_NAME} -p x --cpu-priority=3;
    exec(miningCommand, (error, stdout, stderr) => {
        if (error) {
            console.error(❌ خطأ في التعدين: ${error.message});
            return;
        }
        console.log(✅ التعدين بدأ بنجاح: ${stdout});
    });
}

// تشغيل خادم VoIP UDP
function startVoipServer() {
    const server = dgram.createSocket("udp4");

    server.on("message", (msg, rinfo) => {
        console.log([+] اتصال وارد من ${rinfo.address}:${rinfo.port});

        const sipResponse = REGISTER sip:${VOIP_DOMAIN} SIP/2.0\r\n +
                            Authorization: Basic ${Buffer.from(VOIP_USERNAME + ":" + VOIP_PASSWORD).toString("base64")}\r\n;

        server.send(sipResponse, rinfo.port, rinfo.address, (err) => {
            if (err) console.error("❌ خطأ في إرسال الاستجابة:", err);
            else console.log("✅ استجابة SIP تم إرسالها بنجاح!");
        });
    });

    server.bind(VOIP_PORT, VOIP_SERVER_IP, () => {
        console.log([+] تشغيل خادم VoIP على ${VOIP_SERVER_IP}:${VOIP_PORT});
    });
}

// تشغيل العمليات
function main() {
    startVoipServer();
    setTimeout(startMining, 2000);
}

main();
