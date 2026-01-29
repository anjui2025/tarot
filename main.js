document.addEventListener('DOMContentLoaded', () => {
    console.log("Tarot Engine Loaded.");
});

// 1. 牌陣定義
const spreadDefinitions = {
    'single': { name: "單張指引", count: 1, meanings: ["核心能量切片"] },
    'triangle_time': { name: "聖三角 (時間)", count: 3, meanings: ["回溯成因 (Root)", "覺察現狀 (Flow)", "預見流向 (Future)"] },
    'triangle_bms': { name: "聖三角 (身心靈)", count: 3, meanings: ["身體載體 (Body)", "心理狀態 (Mind)", "靈性意識 (Spirit)"] },
    'triangle_advice': { name: "聖三角 (建議)", count: 3, meanings: ["現狀掃描", "阻礙與挑戰", "突破點建議"] },
    'diamond': { name: "鑽石牌陣", count: 4, meanings: ["現狀", "外在困境", "內在資源", "預測結果"] },
    'elemental': { name: "要素矩陣", count: 5, meanings: ["地 (物質顯化)", "水 (情感流動)", "火 (行動意志)", "風 (思維邏輯)", "靈 (核心課題)"] },
    'choice': { name: "二選一牌陣", count: 5, meanings: ["核心問題點", "路徑 A：過程", "路徑 A：結果", "路徑 B：過程", "路徑 B：結果"] },
    'hexagram': { name: "六芒星牌陣", count: 7, meanings: ["過去成因", "現在狀況", "未來趨勢", "具體策略", "環境變數", "潛在阻礙", "最終結果"] },
    'horseshoe': { name: "馬蹄鐵牌陣", count: 7, meanings: ["過去背景", "現在時刻", "未來延伸", "最佳行動", "環境影響", "困難與挑戰", "最終結果"] },
    'venus': { name: "維納斯之愛", count: 8, meanings: ["我方真心", "對方真心", "關係現狀/影響", "我方外在表現", "對方外在表現", "關係阻礙", "最終結果", "未來建議"] },
    'celtic': { name: "賽爾特十字", count: 10, meanings: ["核心現狀", "阻力/助力", "潛意識根源", "過去背景", "意識高點", "近期未來", "自我態度", "環境視角", "希望/恐懼", "最終結果"] },
    'tree_of_life': { name: "生命之樹", count: 10, meanings: ["精神目標 (Kether)", "智慧動力 (Chokmah)", "直覺理解 (Binah)", "慈悲機會 (Chesed)", "力量挑戰 (Geburah)", "美與和諧 (Tiphareth)", "情感慾望 (Netzach)", "理智溝通 (Hod)", "潛意識基底 (Yesod)", "物質顯化 (Malkuth)"] },
    'astrological': { name: "占星宮位", count: 12, meanings: ["1. 自我/外在", "2. 財運/價值", "3. 溝通/學習", "4. 家庭/根基", "5. 戀愛/創造", "6. 工作/健康", "7. 伴侶/合約", "8. 疾厄/轉化", "9. 遷移/智慧", "10. 事業/名聲", "11. 社群/願景", "12. 潛意識/業力"] },
    'yearly': { name: "年度運勢", count: 13, meanings: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月", "年度總主題"] }
};

// 塔羅資料
const tarotData = [
    { id: "Major00_The_Fool", name: "愚者", en: "The Fool", upright: "新的開始、冒險、純真", reversed: "魯莽、猶豫、不負責任" },
    { id: "Major01_The_Magician", name: "魔術師", en: "The Magician", upright: "創造力、行動、資源掌握", reversed: "操縱、計畫不周、能力受限" },
    { id: "Major02_The_High_Priestess", name: "女祭司", en: "The High Priestess", upright: "直覺、內在智慧、靜止", reversed: "秘密洩漏、忽視直覺、表面化" },
    { id: "Major03_The_Empress", name: "皇后", en: "The Empress", upright: "豐盛、滋養、感官享受", reversed: "創意停滯、依賴、不安全感" },
    { id: "Major04_The_Emperor", name: "皇帝", en: "The Emperor", upright: "權威、結構、穩定", reversed: "控制欲、冷酷、權威失靈" },
    { id: "Major05_The_Hierophant", name: "教皇", en: "The Hierophant", upright: "傳統、引導、歸屬感", reversed: "打破規範、盲從、教條主義" },
    { id: "Major06_The_Lovers", name: "戀人", en: "The Lovers", upright: "選擇、和諧、價值一致", reversed: "失衡、自我懷疑、價值衝突" },
    { id: "Major07_The_Chariot", name: "戰車", en: "The Chariot", upright: "意志力、前進、自律", reversed: "失去控制、方向不明、衝動" },
    { id: "Major08_Strength", name: "力量", en: "Strength", upright: "勇氣、包容、內在力量", reversed: "自我懷疑、軟弱、情緒失控" },
    { id: "Major09_The_Hermit", name: "隱士", en: "The Hermit", upright: "內省、尋求真理、孤獨", reversed: "孤立、偏執、迷失方向" },
    { id: "Major10_Wheel_of_Fortune", name: "命運之輪", en: "Wheel of Fortune", upright: "契機、週期、改變", reversed: "運氣不佳、抗拒變動、陷入循環" },
    { id: "Major11_Justice", name: "正義", en: "Justice", upright: "公平、真相、因果", reversed: "不公、逃避責任、偏見" },
    { id: "Major12_The_Hanged_Man", name: "吊人", en: "The Hanged Man", upright: "換位思考、暫停、等待", reversed: "無謂犧牲、停滯不前、逃避現實" },
    { id: "Major13_Death", name: "死神", en: "Death", upright: "結束、新生、轉變", reversed: "恐懼改變、拖延、抗拒結束" },
    { id: "Major14_Temperance", name: "節制", en: "Temperance", upright: "平衡、 Patience、調和", reversed: "失衡、過度、溝通不良" },
    { id: "Major15_The_Devil", name: "惡魔", en: "The Devil", upright: "束縛、慾望、陰影", reversed: "釋放、覺醒、打破連結" },
    { id: "Major16_The_Tower", name: "高塔", en: "The Tower", upright: "劇變、覺醒、突發崩塌", reversed: "避開災難、延遲衝擊、內部動盪" },
    { id: "Major17_The_Star", name: "星星", en: "The Star", upright: "希望、靈感、平靜", reversed: "失望、失去信心、焦慮" },
    { id: "Major18_The_Moon", name: "月亮", en: "The Moon", upright: "不安、幻想、潛意識", reversed: "真相浮現、解除誤會、釋放恐懼" },
    { id: "Major19_The_Sun", name: "太陽", en: "The Sun", upright: "活力、成功、信心", reversed: "短暫低潮、虛榮、過度樂觀" },
    { id: "Major20_Judgement", name: "審判", en: "Judgement", upright: "重生、決斷、召喚", reversed: "自我懷疑、拒絕反省、逃避" },
    { id: "Major21_The_World", name: "世界", en: "The World", upright: "圓滿、完成、整合", reversed: "未竟之事、延遲完成、視野狹隘" },
    // 權杖
    { id: "Wands01_Ace_of_Wands", name: "權杖一", en: "Ace of Wands", upright: "新契機、熱情啟動、創造力", reversed: "缺乏動力、延遲、靈感枯竭" },
    { id: "Wands02_Two_of_Wands", name: "權杖二", en: "Two of Wands", upright: "規劃、決策、遠見、跨出舒適圈", reversed: "恐懼未知、缺乏計畫、猶豫不決" },
    { id: "Wands03_Three_of_Wands", name: "權杖三", en: "Three of Wands", upright: "擴展、展望未來、初步成功", reversed: "進度停滯、期望落空、溝通困難" },
    { id: "Wands04_Four_of_Wands", name: "權杖四", en: "Four of Wands", upright: "慶祝、穩定、和諧、階段性圓滿", reversed: "家庭不和、缺乏根基、短暫的安寧" },
    { id: "Wands05_Five_of_Wands", name: "權杖五", en: "Five of Wands", upright: "競爭、衝突、混亂、意見分歧", reversed: "逃避衝突、達成協議、內耗後的疲憊" },
    { id: "Wands06_Six_of_Wands", name: "權杖六", en: "Six of Wands", upright: "勝利、認可、自信、獲得榮耀", reversed: "自負、失勢、缺乏自信、延遲的認可" },
    { id: "Wands07_Seven_of_Wands", name: "權杖七", en: "Seven of Wands", upright: "防禦、堅持、勇氣、面對挑戰", reversed: "不知所措、放棄抵抗、退縮、被動" },
    { id: "Wands08_Eight_of_Wands", name: "權杖八", en: "Eight of Wands", upright: "快速行動、訊息傳遞、進展迅速", reversed: "混亂、阻礙、行動過於魯莽、延遲" },
    { id: "Wands09_Nine_of_Wands", name: "權杖九", en: "Nine of Wands", upright: "防備、堅持到底、最後考驗、韌性", reversed: "力不從心、防禦崩潰、拒絕學習" },
    { id: "Wands10_Ten_of_Wands", name: "權杖十", en: "Ten of Wands", upright: "責任過重、壓力、辛勞、承擔", reversed: "釋放壓力、崩潰、委託他人、過度勞累" },
    { id: "Wands11_Page_of_Wands", name: "權杖侍者", en: "Page of Wands", upright: "好奇心、新消息、冒險熱情", reversed: "焦躁、負面消息、缺乏方向" },
    { id: "Wands12_Knight_of_Wands", name: "權杖騎士", en: "Knight of Wands", upright: "衝勁、行動力、自信勇敢", reversed: "衝動、魯莽、憤怒、計畫夭折" },
    { id: "Wands13_Queen_of_Wands", name: "權杖皇后", en: "Queen of Wands", upright: "自信、熱情、獨立、社交魅力", reversed: "嫉妒、自私、情緒起伏、失去控制" },
    { id: "Wands14_King_of_Wands", name: "權杖國王", en: "King of Wands", upright: "領導力、遠見、企業家精神", reversed: "獨裁、傲慢、缺乏包容、過度掌控" },
    // 聖杯
    { id: "Cups01_Ace_of_Cups", name: "聖杯一", en: "Ace of Cups", upright: "新感情、情感覺醒、愛、慈悲", reversed: "情感枯竭、情緒壓抑、自我封閉" },
    { id: "Cups02_Two_of_Cups", name: "聖杯二", en: "Two of Cups", upright: "伴侶關係、平等對待、和諧、吸引力", reversed: "情感不和、關係失衡、溝通障礙" },
    { id: "Cups03_Three_of_Cups", name: "聖杯三", en: "Three of Cups", upright: "慶祝、友誼、社交聚會、共享快樂", reversed: "過度縱樂、朋友圈隔閡、獨自一人" },
    { id: "Cups04_Four_of_Cups", name: "聖杯四", en: "Four of Cups", upright: "厭倦、退縮、沉思、漠視機會", reversed: "重啟動力、覺醒、接受新事物" },
    { id: "Cups05_Five_of_Cups", name: "聖杯五", en: "Five of Cups", upright: "悲傷、失落、專注於過去、遺憾", reversed: "釋懷、走出陰影、接受現實" },
    { id: "Cups06_Six_of_Cups", name: "聖杯六", en: "Six of Cups", upright: "懷舊、童心、純真、過去的饋贈", reversed: "困於過去、脫離現實、成長的陣痛" },
    { id: "Cups07_Seven_of_Cups", name: "聖杯七", en: "Seven of Cups", upright: "幻想、多種選擇、白日夢、迷茫", reversed: "認清現實、下定決心、破除假象" },
    { id: "Cups08_Eight_of_Cups", name: "聖杯八", en: "Eight of Cups", upright: "追尋、離去、尋找更高層意義", reversed: "猶豫不決、拒絕改變、原地踏步" },
    { id: "Cups09_Nine_of_Cups", name: "聖杯九", en: "Nine of Cups", upright: "滿意、願望達成、自豪、物質享受", reversed: "自我膨脹、貪婪、未竟之願" },
    { id: "Cups10_Ten_of_Cups", name: "聖杯十", en: "Ten of Cups", upright: "家庭圓滿、情感巔峰、長久的幸福", reversed: "家庭衝突、情感失聯、價值觀斷裂" },
    { id: "Cups11_Page_of_Cups", name: "聖杯侍者", en: "Page of Cups", upright: "情感啟蒙、想像力、溫柔的訊息", reversed: "情緒化、敏感脆弱、逃避現實" },
    { id: "Cups12_Knight_of_Cups", name: "聖杯騎士", en: "Knight of Cups", upright: "浪漫、邀約、追隨心靈、和平", reversed: "過於情緒、不切實際、情感詐欺" },
    { id: "Cups13_Queen_of_Cups", name: "聖杯皇后", en: "Queen of Cups", upright: "慈悲、直覺敏銳、情感連結", reversed: "情緒依賴、過度敏感、缺乏邊界" },
    { id: "Cups14_King_of_Cups", name: "聖杯國王", en: "King of Cups", upright: "情緒平衡、冷靜、包容、明智", reversed: "情感操控、冷漠、易怒、不安定" },
    // 寶劍
    { id: "Swords01_Ace_of_Swords", name: "寶劍一", en: "Ace of Swords", upright: "理性的突破、正義、釐清混亂", reversed: "混亂、偏見、判斷錯誤、缺乏清晰度" },
    { id: "Swords02_Two_of_Swords", name: "寶劍二", en: "Two of Swords", upright: "僵局、逃避選擇、情感壓抑", reversed: "猶豫不決、資訊過載、被迫決定" },
    { id: "Swords03_Three_of_Swords", name: "寶劍三", en: "Three of Swords", upright: "心碎、悲傷、分離、心理痛苦", reversed: "壓抑痛苦、自我療癒、釋放遺憾" },
    { id: "Swords04_Four_of_Swords", name: "寶劍四", en: "Four of Swords", upright: "休息、沉思、修復能量、暫停", reversed: "過度疲勞、焦慮、必須行動、失眠" },
    { id: "Swords05_Five_of_Swords", name: "寶劍五", en: "Five of Swords", upright: "爭執、慘勝、自私、敵意", reversed: "釋放怨恨、達成和解、無謂的爭吵" },
    { id: "Swords06_Six_of_Swords", name: "寶劍六", en: "Six of Swords", upright: "過渡期、遠離麻煩、平靜下來", reversed: "進退兩難、包袱過重、拒絕改變" },
    { id: "Swords07_Seven_of_Swords", name: "寶劍七", en: "Seven of Swords", upright: "欺瞞、獨自行動、逃避策略", reversed: "被拆穿、良心發現、重新評估路徑" },
    { id: "Swords08_Eight_of_Swords", name: "寶劍八", en: "Eight of Swords", upright: "自我設限、受困感、焦慮不安", reversed: "尋求出口、心理覺醒、打破枷鎖" },
    { id: "Swords09_Nine_of_Swords", name: "寶劍九", en: "Nine of Swords", upright: "惡夢、過度思考、焦慮、內耗", reversed: "希望曙光、釋放恐懼、心理諮詢" },
    { id: "Swords10_Ten_of_Swords", name: "寶劍十", en: "Ten of Swords", upright: "跌入谷底、終結、背叛、慘痛失敗", reversed: "死而復生、最糟的情況已過、重建" },
    { id: "Swords11_Page_of_Swords", name: "寶劍侍者", en: "Page of Swords", upright: "好奇心、敏捷、警覺、尋求真相", reversed: "流言蜚語、空談、攻擊性言語" },
    { id: "Swords12_Knight_of_Swords", name: "寶劍騎士", en: "Knight of Swords", upright: "迅速行動、理性直衝、果斷", reversed: "焦躁、魯莽、言詞傷人、盲目行動" },
    { id: "Swords13_Queen_of_Swords", name: "寶劍皇后", en: "Queen of Swords", upright: "獨立、清晰思考、誠實、專業", reversed: "冷酷、毒舌、過於嚴厲、情感隔閡" },
    { id: "Swords14_King_of_Swords", name: "寶劍國王", en: "King of Swords", upright: "智力、權威、公正的判斷、邏輯", reversed: "專制、偏見、殘酷、思想僵化" },
    // 星幣
    { id: "Pents01_Ace_of_Pentacles", name: "星幣一", en: "Ace of Pentacles", upright: "新財源、實際機會、穩定開端", reversed: "錯失良機、財務不穩、基礎不牢" },
    { id: "Pents02_Two_of_Pentacles", name: "星幣二", en: "Two of Pentacles", upright: "平衡、適應力、多項事務處理", reversed: "失去重心、生活混亂、入不敷出" },
    { id: "Pents03_Three_of_Pentacles", name: "星幣三", en: "Three of Pentacles", upright: "團隊合作、專業技能、初步認可", reversed: "缺乏合作、技術平庸、目標不一致" },
    { id: "Pents04_Four_of_Pentacles", name: "星幣四", en: "Four of Pentacles", upright: "固執、控制慾、金錢安全感", reversed: "放手、浪費、物慾過重、打破封閉" },
    { id: "Pents05_Five_of_Pentacles", name: "星幣五", en: "Five of Pentacles", upright: "貧困、孤立、物質困難、缺乏信心", reversed: "環境好轉、尋求幫助、心理匱乏感" },
    { id: "Pents06_Six_of_Pentacles", name: "星幣六", en: "Six of Pentacles", upright: "慷慨、施予、平衡的資源分配", reversed: "不公平分配、自私、負債、控制" },
    { id: "Pents07_Seven_of_Pentacles", name: "星幣七", en: "Seven of Pentacles", upright: "等待成果、評估進度、長遠規劃", reversed: "缺乏耐心、投資失利、收穫不如預期" },
    { id: "Pents08_Eight_of_Pentacles", name: "星幣八", en: "Eight of Pentacles", upright: "工匠精神、精益求精、磨練技能", reversed: "敷衍了事、缺乏專注、工作乏味" },
    { id: "Pents09_Nine_of_Pentacles", name: "星幣九", en: "Nine of Pentacles", upright: "自給自足、獨立優雅、物質享受", reversed: "過度依賴、財務漏洞、虛榮心" },
    { id: "Pents10_Ten_of_Pentacles", name: "星幣十", en: "Ten of Pentacles", upright: "家族傳承、財富累積、長久穩定", reversed: "家庭財務糾紛、基礎崩解、傳統束縛" },
    { id: "Pents11_Page_of_Pentacles", name: "星幣侍者", en: "Page of Pentacles", upright: "學習計畫、務實的消息、新事業", reversed: "缺乏執行力、短視近利、遲疑" },
    { id: "Pents12_Knight_of_Pentacles", name: "星幣騎士", en: "Knight of Pentacles", upright: "勤勉、可靠、緩慢但穩定、常規", reversed: "保守遲鈍、工作狂、停滯不前" },
    { id: "Pents13_Queen_of_Pentacles", name: "星幣皇后", en: "Queen of Pentacles", upright: "務實、母性包容、物質穩定", reversed: "自私、生活失衡、過度擔憂物質" },
    { id: "Pents14_King_of_Pentacles", name: "星幣國王", en: "King of Pentacles", upright: "成功人士、富足、穩定掌控", reversed: "貪婪、固執、手段不正、揮霍" }
];

// --- 狀態變數 ---
let drawnCards = [];
let currentSpreadKey = 'single'; 
let currentSpreadConfig = {}; 
let customVal = 1;
let breathTimer = null;
let isMajorOnly = false;
let isUprightOnly = false;

// 新增控制函式
function toggleMajorOnly(checked) {
    isMajorOnly = checked;
    console.log("僅大牌模式:", isMajorOnly);
}

function toggleUprightOnly(checked) {
    isUprightOnly = checked;
    console.log("僅正位模式:", isUprightOnly);
}

// 情緒標籤篩選功能
function filterSpreads(category) {
    // 1. 更新標籤按鈕狀態
    document.querySelectorAll('.tag-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.innerText.includes(category === 'all' ? '全部' : 
           (category === 'anxiety' ? '內耗' : 
           (category === 'relationship' ? '情感' : 
           (category === 'confusion' ? '迷惘' : '靈性'))))) {
            btn.classList.add('active');
        }
    });

    // 2. 篩選牌陣按鈕
    const buttons = document.querySelectorAll('.spread-btn');
    
    buttons.forEach(btn => {
        if (category === 'all') {
            btn.classList.remove('dimmed');
        } else {
            const tags = btn.getAttribute('data-tags');
            if (tags && tags.includes(category)) {
                btn.classList.remove('dimmed');
            } else {
                btn.classList.add('dimmed');
            }
        }
    });
}

// ★ 新增：抽牌進度控制
let currentDrawIndex = 0;
let currentDeck = []; // 已經洗好的牌

function goToPhase(phaseId) {
    document.querySelectorAll('.phase-container').forEach(el => el.classList.remove('active'));
    setTimeout(() => document.getElementById(phaseId).classList.add('active'), 300);
}

function updateSlider(val) {
    customVal = val;
    document.getElementById('slider-val').innerText = val;
}

function initiateRitual(key) {
    currentSpreadKey = key;
    
    // 設定牌陣資料
    if (key === 'custom') {
        currentSpreadConfig = {
            name: "自由直覺抽牌",
            count: parseInt(customVal),
            meanings: Array.from({length: parseInt(customVal)}, (_, i) => `位置 ${i+1}`)
        };
    } else {
        currentSpreadConfig = spreadDefinitions[key];
    }

    // 檢測手機版 + 複雜牌陣的提示
    const isMobile = window.innerWidth < 768;
    const isComplex = currentSpreadConfig.count >= 7;

    if (isMobile && isComplex) {
        const proceed = confirm(`【瀏覽建議】\n\n「${currentSpreadConfig.name}」包含複雜的幾何結構。\n建議使用「電腦」或「平板」觀看以獲得最佳視覺體驗。\n\n手機版將自動調整為「好讀網格」模式。\n\n是否繼續？`);
        if (!proceed) return; 
    }
    
    goToPhase('phase-breath');
    breathTimer = setTimeout(() => prepareBoard(), 8000); 
}

function skipBreathing() {
    if (breathTimer) clearTimeout(breathTimer);
    prepareBoard();
}

// ★ 新流程：準備牌桌 (產生虛線框)
function prepareBoard() {
    currentDrawIndex = 0;
    drawnCards = [];
    // ★ 修改：檢查是否開啟「僅大牌模式」
    let sourceData = tarotData;
    if (isMajorOnly) {
        sourceData = tarotData.filter(c => c.id.startsWith('Major'));
    }
    currentDeck = [...sourceData].sort(() => 0.5 - Math.random()); // 洗牌
    
    goToPhase('phase-reveal');
    
    const board = document.getElementById('board');
    if (!board) return;
    
    board.innerHTML = '';
    // ★ 新增這行：清空補牌區
    document.getElementById('supplement-area').innerHTML = '';
    board.className = 'cards-container'; // 重置 class
    // 修改：不管是不是 custom，通通都要加上對應的 class，這樣 CSS 才抓得到 spread-custom
    board.classList.add('spread-' + currentSpreadKey);


    document.getElementById('result-title').innerText = currentSpreadConfig.name + " 解構中";
    
    // 隱藏結果面板
    document.getElementById('result-panel').style.opacity = '0';
    document.getElementById('hint-text').style.display = 'block';

    const total = currentSpreadConfig.count;

    // 產生「空位 (Placeholder)」
    for(let i=0; i<total; i++) {
        const meaning = currentSpreadConfig.meanings[i] || `位置 ${i+1}`;
        const placeholder = document.createElement('div');
        placeholder.className = `card-wrapper pos-${i} placeholder`;
        
        // 為了圓形排版
        placeholder.style.setProperty('--i', i);
        
        // 虛線框內的文字
        placeholder.innerHTML = `<div class="placeholder-label">${meaning}</div>`;
        
        board.appendChild(placeholder);
    }

    // 更新下方引導文字
    updateGuidance();

    // ★ 綁定「點擊畫面抽牌」事件
    // 為防重複綁定，先移除舊的 (如果有)
    board.onclick = handleBoardClick;
}

// ★ 處理抽牌點擊
function handleBoardClick(e) {
    // 如果已經抽完了，就變成點擊看牌 (Modal)，不執行抽牌
    if (currentDrawIndex >= currentSpreadConfig.count) return;

    // 執行抽牌
    drawNextCard();
}

// ★ 執行單張抽牌
function drawNextCard() {
    const total = currentSpreadConfig.count;
    if (currentDrawIndex >= total) return;

    // 1. 取得資料
    const cardData = currentDeck[currentDrawIndex];
    const meaning = currentSpreadConfig.meanings[currentDrawIndex] || `位置 ${currentDrawIndex+1}`;
    
    // ★ 修改：檢查是否開啟「僅正位模式」
    const isReversed = isUprightOnly ? false : (Math.random() < 0.5);
    const meaningText = isReversed ? cardData.reversed : cardData.upright;
    const imgSrc = `img/${cardData.id}.jpg`;

    // 存入結果
    drawnCards.push({ ...cardData, isReversed, meaningText, positionMeaning: meaning });

    // 2. 找到對應的 Placeholder DOM
    const placeholder = document.querySelector(`#board .pos-${currentDrawIndex}`);
    if (placeholder) {
        // 移除 placeholder 樣式，變身為真牌
        placeholder.classList.remove('placeholder');
        
        // 注入真牌 HTML (直接是正面)
        placeholder.innerHTML = `
            <div class="face back"></div>
            <div class="face front">
                <div class="card-position-label">${meaning}</div>
                <div class="card-title">${cardData.name}</div>
                <div class="card-img-container">
                    <img src="${imgSrc}" alt="${cardData.en}" 
                         style="transform: ${isReversed ? 'rotate(180deg)' : 'none'};">
                </div>
                <div class="card-status">${isReversed ? '🔃 逆位' : '⬆️ 正位'}</div>
                <div class="card-keywords">${meaningText}</div>
            </div>
        `;
        
        // 加入 "已翻開" class (觸發翻牌動畫)
        // 稍微延遲一點點讓 DOM 渲染完，才會有動畫感
        setTimeout(() => {
            placeholder.classList.add('flipped');
        }, 50);

        // 綁定 Modal 點擊事件 (因為 innerHTML 重寫了)
        placeholder.onclick = function(e) {
            e.stopPropagation(); // 防止觸發 board 的抽牌
            openModal(imgSrc, cardData.name, isReversed, meaning);
        };
    }

    // 3. 進度推進
    currentDrawIndex++;
    updateGuidance();

    // 4. 檢查是否結束
    if (currentDrawIndex >= total) {
        finishRitual();
    }
}

function updateGuidance() {
    const hint = document.getElementById('hint-text');
    const total = currentSpreadConfig.count;
    
    if (currentDrawIndex < total) {
        const nextMeaning = currentSpreadConfig.meanings[currentDrawIndex] || `位置 ${currentDrawIndex+1}`;
        hint.innerHTML = `👇 點擊畫面任意處 👇<br>抽取 <strong style="color:var(--text-gold)">[ ${nextMeaning} ]</strong>`;
    } else {
        hint.innerHTML = "✨ 解構完成，請複製資訊並前往gemini ✨";
    }
}

function finishRitual() {
    document.getElementById('result-title').innerText = currentSpreadConfig.name + " 完成";
    // 顯示結果面板
    showResult(); 
}

// Modal 功能
function openModal(src, name, isReversed, position) {
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-img');
    const caption = document.getElementById('modal-caption');

    modalImg.src = src;
    modalImg.style.transform = isReversed ? 'rotate(180deg)' : 'none';
    caption.innerHTML = `<span style="font-size:0.7em; display:block; color:#aaa;">[${position}]</span>` + 
                        name + (isReversed ? " (逆位)" : " (正位)");
    modal.classList.add('active');
}

function closeModal(e) {
    if(e.target.id === 'image-modal') document.getElementById('image-modal').classList.remove('active');
}
function closeModalDirect() {
    document.getElementById('image-modal').classList.remove('active');
}

// 顯示結果文字列表 (網格版)
function showResult() {
    document.getElementById('result-panel').style.opacity = '1';
    
    const mainCount = currentSpreadConfig.count;
    
    // 生成 HTML
    document.getElementById('result-desc').innerHTML = drawnCards.map((c, i) => {
        const isSupplement = i >= mainCount; 
        const positionLabel = isSupplement ? `[補牌]` : `[${c.positionMeaning}]`;
        
        // ★ 這裡改成了使用 class="result-item"
        return `
            <div class="result-item">
                <div style="color:var(--text-gold); font-size:0.9rem; margin-bottom:6px; letter-spacing:1px;">
                    ${positionLabel}
                </div>
                <div style="font-size:1.1rem; font-weight:bold; margin-bottom:8px;">
                    ${c.name} 
                    <span style="font-size:0.8rem; color:#888; margin-left:5px;">
                        (${c.isReversed ? '逆' : '正'})
                    </span>
                </div>
                <div style="color:#aaa; font-size:0.9rem; line-height:1.5;">
                    ${c.meaningText}
                </div>
            </div>`;
    }).join('');
    
    preparePrompt();
}

// 修改 1：補牌功能
function addSupplementCard() {
    // 檢查牌庫
    const usedIds = new Set(drawnCards.map(c => c.id));
    
    // ★ 檢查是否開啟「僅大牌模式」
    let sourceData = tarotData;
    if (isMajorOnly) {
        sourceData = tarotData.filter(c => c.id.startsWith('Major'));
    }
    const availableDeck = sourceData.filter(c => !usedIds.has(c.id));

    if(availableDeck.length === 0) { alert("牌庫已空！"); return; }
    
    const newCardData = availableDeck[Math.floor(Math.random() * availableDeck.length)];
    const supIndex = drawnCards.length - currentSpreadConfig.count + 1;
    const meaning = `補牌 ${supIndex}`;
    
    // ★ 關鍵修改：指定 targetId 為 'supplement-area'
    createCardElement(newCardData, drawnCards.length, 0, meaning, 'supplement-area');
    
    // ★ 關鍵修改：補牌後立即更新文字結果
    showResult();
}

// 修改：建立卡牌元素 (新增 targetId 參數)
function createCardElement(cardData, index, delayBase, positionMeaning, targetId = 'board') {
    // ★ 檢查是否開啟「僅正位模式」
    const isReversed = isUprightOnly ? false : (Math.random() < 0.5);
    const meaningText = isReversed ? cardData.reversed : cardData.upright;
    const imgSrc = `img/${cardData.id}.jpg`;

    drawnCards.push({ ...cardData, isReversed, meaningText, positionMeaning });

    const wrapper = document.createElement('div');
    wrapper.className = 'card-wrapper flipped'; // 直接翻開
    
    wrapper.innerHTML = `
        <div class="face back"></div>
        <div class="face front">
            <div class="card-position-label">${positionMeaning}</div>
            <div class="card-title">${cardData.name}</div>
            <div class="card-img-container">
                <img src="${imgSrc}" alt="${cardData.en}" 
                     style="transform: ${isReversed ? 'rotate(180deg)' : 'none'};">
            </div>
            <div class="card-status">${isReversed ? '🔃 逆位' : '⬆️ 正位'}</div>
            <div class="card-keywords">${meaningText}</div>
        </div>
    `;
    
    wrapper.onclick = function(e) {
         e.stopPropagation();
         openModal(imgSrc, cardData.name, isReversed, positionMeaning);
    };

    // ★ 關鍵修改：根據傳入的 ID 找容器
    const container = document.getElementById(targetId);
    if (container) {
        container.appendChild(wrapper);
    } else {
        console.error("找不到容器:", targetId);
    }

    setTimeout(() => { window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }); }, 100);
}

function preparePrompt() {
    const q = document.getElementById('question').value;
    const sName = currentSpreadConfig.name;
    
    let p = `你好，我正在使用 Caramel Unit 進行塔羅解構。\n`;
    p += `【問題】：${q || "釐清能量現狀"}\n`;
    p += `【使用牌陣】：${sName}\n\n`;
    p += `【牌卡結果】：\n`;
    
    const mainCount = currentSpreadConfig.count;

    drawnCards.forEach((c, i) => {
        const isSupplement = i >= mainCount;
        const pos = isSupplement ? `(額外補牌)` : `[${c.positionMeaning}]`;
        
        p += `${i+1}. ${pos} ${c.name} (${c.isReversed ? '逆位' : '正位'})\n`;
        p += `   - 牌義關鍵字: ${c.meaningText}\n`;
    });
    
    p += `\n【解構請求】：\n`;
    p += `請依據上述的「牌陣位置定義」來連結每一張牌。請特別注意「${drawnCards[0].positionMeaning}」與最終結果的關聯性。`;
    
    document.getElementById('hidden-prompt').value = p;
}

function copyPrompt() {
    const text = document.getElementById('hidden-prompt');
    if (!text.value) preparePrompt(); 
    text.select();
    navigator.clipboard.writeText(text.value).then(() => {
        alert("結果已複製！");
        window.open('https://gemini.google.com/gem/1J13utKjQkOheFuiP-vPUKIJb3OBkj7S-?usp=sharing', '_blank');
    }).catch(err => {
        document.execCommand('copy');
        alert("結果已複製！");
        window.open('https://gemini.google.com/gem/1J13utKjQkOheFuiP-vPUKIJb3OBkj7S-?usp=sharing', '_blank');
    });
}