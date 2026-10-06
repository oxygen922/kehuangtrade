export type Lang = "zh" | "vi";
export const langs: Lang[] = ["vi", "zh"];

const dict = {
  zh: {
    nav: { products: "产品中心", solutions: "解决方案", about: "关于我们", inquiry: "拍照询价" },
    cta: {
      inquiry: "立即询价",
      inquiry24: "拍照询价 · 24小时报价",
      zaloNow: "加 Zalo 立即聊",
      whatsapp: "WhatsApp",
      waText: "你好，我在网站上看到，想询价工业品",
      viewAll: "查看全部",
      backHome: "返回首页",
    },
    home: {
      heroTitle: "正牌工业品，中国直接进口，不经第三方",
      heroSub: "直连中国源头工厂——设备与物料都拿源头价。拍照询价，24小时报价。",
      solutionsTitle: "按行业场景采购",
      solutionsSub: "铝材、电子、新厂、车队——看看你这行我们交付过什么",
      soon: "即将上线",
      scenes: [
        {
          slug: "aluminum",
          name: "铝材厂",
          q1: "挤压机停机等件？",
          q2: "本地买又贵又难找型号？",
          sol: "挤压模具、热电偶、液压备件——中国源头工厂直采",
          caseNote: "真实交付：停机 5天 → 2天",
        },
        {
          slug: "new-plant",
          name: "新厂筹建",
          q1: "筹建期什么都缺？",
          q2: "一家家找供应商又慢又贵？",
          sol: "整厂开荒包：照明、劳保、工具、仓储一个柜配齐",
          caseNote: "真实交付：47类物资 · 一柜到厂",
        },
        {
          slug: "electronic",
          name: "电子组装厂",
          q1: "防静电耗材月月买？",
          q2: "本地单价谈不下来？",
          sol: "固定复购价供货，价格对标中国 1688",
          caseNote: "真实交付：手套 12,000đ → 8,500đ",
        },
        {
          slug: "autoparts",
          name: "汽配与工程机械",
          q1: "货车、工程机械配件难找？",
          q2: "停机等件一天损失上万？",
          sol: "东风系列配件、工程机械易损件——原厂与优质副厂件源头直发",
          caseNote: "真实交付：复运营 25天 → 6天",
        },
        {
          slug: "agriculture",
          name: "农场与合作社",
          q1: "农机泵具本地价高？",
          q2: "雨季抢收等不起机器？",
          sol: "水泵、微耕机、烘干机——中国农机厂整机直发",
          caseNote: "真实交付：交期 45天 → 28天",
        },
      ],
      categoriesTitle: "产品品类",
      categoriesSub: "目录持续扩充，没找到的直接拍照问",
      catGroups: [
        { "key": "mro", "label": "MRO 耗材与物料" },
        { "key": "equipment", "label": "设备与备件" },
        { "key": "auto", "label": "汽配与车辆" }
      ],
      onDemand: "可代采",
      moreCats: "其他品类？拍照即采",
      trust: ["中国源头工厂直供", "24小时报价", "设备·物料一站式", "交付到厂"],
      featuredTitle: "常供示例",
      featuredSub: "以下只是示例——你要的不在列表里？直接拍照问",
      industryTitle: "选择你的行业——看看我们能如何帮助你",
      caseBadge: "真实交付",
      ctaTitle: "没找到想要的？",
      ctaSub: "拍张照片发到 Zalo 或 WhatsApp，24小时内给你报价",
      heroSteps: ["拍张照", "发 Zalo / WhatsApp", "24小时内收报价"],
      howTitle: "怎么合作",
      howSteps: ["拍照发型号", "24小时内收报价", "中国直采交付到厂"],
      howNote: "从询价到收货，全程在一个聊天窗口完成——不用注册、不用装 App。",
    },
    category: {
      notFoundTitle: "没找到想要的？",
      notFoundSub: "拍张照片或发个型号，24小时内报价",
      relatedCases: "相关案例",
      itemsUnit: "件商品",
      emptyTitle: "该品类目录整理中",
      emptySub: "我们是代采服务——拍照发型号，24小时内报价",
    },
    product: {
      paramsTitle: "核心参数",
      introTitle: "产品简介",
      trustTitle: "交付与单证",
      trustItems: ["正贸报关，Form E 原产地证", "增值税发票", "发货前验货拍照"],
      faqTitle: "常见问题",
      relatedTitle: "同品类商品",
      askAbout: "询价此商品",
    },
    about: {
      title: "关于我们",
      whoTitle: "我们是谁",
      whoBody: "广西柯煌进出口贸易有限公司，总部位于中国广西、毗邻越南边境。创始团队深耕中国 B2B 采购 10+ 年，掌握上百家工厂的直采渠道与最优价格资源。经营范围涵盖：机械设备、农业机械、涂装设备、泵及真空设备、五金、化工产品、建材涂料、纺织服装、家电日杂、汽车零配件、电动车等品类的货物进出口与进出口代理。你要的设备和物料，我们直接从中国源头工厂谈——去掉中间商，价格和品质都看得见。",
      teamTitle: "团队与资源",
      teamItems: [
        "10+ 年中国国内 B2B 采购经验",
        "上百家工厂直采直连渠道",
        "源头价格，没有中间商加价",
        "中国仓集货 + 发货前验货拍照"
      ],
      statsTitle: "为什么找我们",
      stats: [
        { "n": "10+", "l": "年中国 B2B 采购经验" },
        { "n": "100+", "l": "家直采工厂资源" },
        { "n": "24h", "l": "报价承诺" },
        { "n": "2", "l": "种语言全程服务" }
      ],
      brandsTitle: "常采品牌",
      brands: ["东风 Dongfeng", "潍柴 Weichai", "三一 SANY", "柳工 LiuGong", "徐工 XCMG", "中国重汽 HOWO", "玉柴 Yuchai", "正泰 CHINT", "德力西 DELIXI", "中联重科 Zoomlion"],
      industriesTitle: "已交付行业",
      industries: ["铝材厂", "电子组装", "新厂筹建", "仓储物流", "农业合作社", "配送车队"],
      servicesTitle: "增值服务",
      services: [
        "中国仓集货拼柜——多家供应商合单，省运费",
        "发货前验货拍照——验收标准按你厂要求定制",
        "设备选型咨询——给中国同类机型与价格对比",
        "小批量代采——MOQ 灵活，试单友好",
        "进出口代理——报关、Form E、物流一条龙代办"
      ],
      promiseTitle: "服务承诺",
      promises: ["24小时报价", "正贸报关", "Form E 原产地证", "增值税发票", "发货前验货拍照"],
      processTitle: "合作流程",
      steps: ["询价", "报价", "预付", "中国集货", "正贸清关", "越南交付"],
      docTitle: "单证样例",
      docNote: "正式票据随每一票货交付，可查验。需要走账的工厂请提前告知开票要求。",
      docs: [
        {
          "name": "报关单 Tờ khai hải quan",
          "img": "/images/docs/customs.jpg",
          "desc": "正贸进口凭证：货物合法入境、全程可追溯，随货附副本供财务与售后存档。"
        },
        {
          "name": "Form E 原产地证",
          "img": "/images/docs/form-e.jpg",
          "desc": "东盟–中国自贸区（ACFTA）优惠原产地证：凭它按协定税率征进口税，多数工业品大幅减免——正贸价优的关键一纸。"
        },
        {
          "name": "越南增值税发票",
          "img": "/images/docs/vat.jpg",
          "desc": "需要走账抵扣的工厂可开 VAT 发票，进项税可抵扣，合规无忧。"
        }
      ],
      contactTitle: "联系方式",
    },
    cases: { title: "交付案例", sub: "真实订单，客户信息已脱敏" },
    footer: {
      contact: "联系方式",
      qr: "扫码添加",
      trustLine: "中国直供 · 正品货源 · 交付到厂",
      rights: "版权所有",
    },
    breadcrumb: { home: "首页", products: "产品中心" },
    langSwitch: "中文",
    otherLang: "vi" as Lang,
  },
  vi: {
    nav: { products: "Sản phẩm", solutions: "Giải pháp", about: "Về chúng tôi", inquiry: "Hỏi giá" },
    cta: {
      inquiry: "Nhận báo giá",
      inquiry24: "Chụp ảnh hỏi giá · Báo giá trong 24h",
      zaloNow: "Chat Zalo ngay",
      whatsapp: "WhatsApp",
      waText: "Xin chào, tôi thấy website và muốn hỏi giá vật tư công nghiệp",
      viewAll: "Xem tất cả",
      backHome: "Về trang chủ",
    },
    home: {
      heroTitle: "Vật tư công nghiệp chính hãng — nhập trực tiếp từ Trung Quốc, không qua bên thứ ba",
      heroSub: "Kết nối thẳng nhà máy nguồn Trung Quốc — thiết bị & vật tư đều giá gốc. Chụp ảnh hỏi giá, báo giá trong 24 giờ.",
      solutionsTitle: "Mua theo ngành của bạn",
      solutionsSub: "Nhôm, điện tử, nhà máy mới, đội xe — xem ngành của bạn chúng tôi đã giao những gì",
      soon: "Sắp ra mắt",
      scenes: [
        {
          slug: "aluminum",
          name: "Nhà máy nhôm",
          q1: "Máy ép dừng chờ phụ tùng?",
          q2: "Mua nội địa đắt, khó đúng mã?",
          sol: "Khuôn ép, nhiệt điện cặp, thủy lực — mua thẳng nhà máy nguồn TQ",
          caseNote: "Giao thật: dừng máy 5 → 2 ngày",
        },
        {
          slug: "new-plant",
          name: "Nhà máy mới",
          q1: "Khai trương thiếu mọi thứ?",
          q2: "Tìm từng nhà cung cấp chậm và đắt?",
          sol: "Gói trọn nhà máy: đèn, bảo hộ, dụng cụ, kho — ghép nguyên container",
          caseNote: "Giao thật: 47 nhóm · 1 container",
        },
        {
          slug: "electronic",
          name: "Điện tử",
          q1: "Vật tư chống tĩnh điện mua hàng tháng?",
          q2: "Giá nội địa không xuống nổi?",
          sol: "Cung ứng giá mua lại cố định, đối chiếu 1688",
          caseNote: "Giao thật: găng 12.000đ → 8.500đ",
        },
        {
          slug: "autoparts",
          name: "Phụ tùng ô tô & máy công trình",
          q1: "Phụ tùng xe tải, máy công trình khó tìm?",
          q2: "Dừng máy mỗi ngày tổn thất lớn?",
          sol: "Phụ tùng Dongfeng, phụ tùng hao mòn máy công trình — hàng chính hãng & OEM từ nguồn",
          caseNote: "Giao thật: chạy lại 25 → 6 ngày",
        },
        {
          slug: "agriculture",
          name: "Nông trại & HTX",
          q1: "Nông máy nội địa giá cao?",
          q2: "Mùa mưa gấp rút chờ máy không nổi?",
          sol: "Máy bơm, máy cày mini, máy sấy — nguyên máy từ xưởng nông cơ TQ",
          caseNote: "Giao thật: 45 → 28 ngày",
        },
      ],
      categoriesTitle: "Ngành hàng",
      categoriesSub: "Danh mục liên tục mở rộng — không thấy thì chụp ảnh hỏi ngay",
      catGroups: [
        { "key": "mro", "label": "Vật tư MRO & tiêu hao" },
        { "key": "equipment", "label": "Thiết bị & phụ tùng" },
        { "key": "auto", "label": "Ô tô & nâng hạ" }
      ],
      onDemand: "Theo yêu cầu",
      moreCats: "Ngành khác? Chụp ảnh là có",
      trust: ["Nguồn trực tiếp nhà máy TQ", "Báo giá trong 24h", "Thiết bị & vật tư một điểm", "Giao tận xưởng"],
      featuredTitle: "Sản phẩm thường cung cấp",
      featuredSub: "Dưới đây chỉ là ví dụ — không có thứ bạn cần? Chụp ảnh hỏi ngay",
      industryTitle: "Chọn lĩnh vực của bạn — xem chúng tôi có thể giúp gì",
      caseBadge: "Giao thật",
      ctaTitle: "Không tìm thấy sản phẩm bạn cần?",
      ctaSub: "Chụp ảnh gửi qua Zalo hoặc WhatsApp — nhận báo giá trong 24 giờ",
      heroSteps: ["Chụp một tấm ảnh", "Gửi Zalo / WhatsApp", "Nhận báo giá trong 24h"],
      howTitle: "Cách hợp tác",
      howSteps: ["Chụp ảnh gửi mã hàng", "Nhận báo giá trong 24h", "Mua TQ giao tận xưởng"],
      howNote: "Từ hỏi giá đến nhận hàng, tất cả trong một cửa sổ chat — không cần đăng ký, không cần cài App.",
    },
    category: {
      notFoundTitle: "Không tìm thấy sản phẩm bạn cần?",
      notFoundSub: "Chụp ảnh hoặc gửi mã hàng, nhận báo giá trong 24 giờ",
      relatedCases: "Dự án liên quan",
      itemsUnit: "sản phẩm",
      emptyTitle: "Danh mục đang cập nhật",
      emptySub: "Chúng tôi mua theo yêu cầu — chụp ảnh hoặc gửi mã hàng, báo giá trong 24 giờ",
    },
    product: {
      paramsTitle: "Thông số chính",
      introTitle: "Giới thiệu sản phẩm",
      trustTitle: "Giao hàng & chứng từ",
      trustItems: ["Xuất chính ngạch, C/O Form E", "Hóa đơn VAT", "Kiểm hàng & chụp ảnh trước khi giao"],
      faqTitle: "Câu hỏi thường gặp",
      relatedTitle: "Sản phẩm cùng nhóm",
      askAbout: "Hỏi giá sản phẩm này",
    },
    about: {
      title: "Về chúng tôi",
      whoTitle: "Chúng tôi là ai",
      whoBody: "Công ty TNHH Thương mại Xuất nhập khẩu Kha Hoàng Quảng Tây (Trung Quốc) — trụ sở tại Quảng Tây, giáp biên giới Việt Nam. Đội ngũ sáng lập hơn 10 năm kinh nghiệm mua sắm B2B tại thị trường Trung Quốc, nắm kênh mua thẳng và nguồn giá tốt nhất từ hàng trăm nhà máy. Ngành nghề kinh doanh: thiết bị máy móc, nông nghiệp cơ khí, thiết bị sơn, máy bơm & thiết bị chân không, kim khí, hóa chất, vật liệu xây dựng & sơn, dệt may & đồng phục, gia dụng & tạp hóa, phụ tùng ô tô, xe điện… — hàng hóa xuất nhập khẩu và dịch vụ đại lý XNK. Thiết bị và vật tư bạn cần, chúng tôi đàm phán thẳng từ nhà máy nguồn Trung Quốc — không qua trung gian, giá và chất lượng đều rõ ràng.",
      teamTitle: "Đội ngũ & nguồn hàng",
      teamItems: [
        "Hơn 10 năm kinh nghiệm B2B tại Trung Quốc",
        "Kênh mua thẳng hàng trăm nhà máy",
        "Giá gốc, không cộng thêm trung gian",
        "Kho Trung Quốc gom hàng + kiểm tra chụp ảnh trước khi gửi"
      ],
      statsTitle: "Vì sao chọn chúng tôi",
      stats: [
        { "n": "10+", "l": "năm kinh nghiệm B2B Trung Quốc" },
        { "n": "100+", "l": "nhà máy nguồn trực tiếp" },
        { "n": "24h", "l": "cam kết báo giá" },
        { "n": "2", "l": "ngôn ngữ phục vụ trọn gói" }
      ],
      brandsTitle: "Thương hiệu thường mua",
      brands: ["Dongfeng", "Weichai", "SANY", "LiuGong", "XCMG", "HOWO (Sinotruk)", "Yuchai", "CHINT", "DELIXI", "Zoomlion"],
      industriesTitle: "Ngành đã giao hàng",
      industries: ["Nhà máy nhôm", "Điện tử", "Nhà máy mới", "Kho vận", "HTX nông nghiệp", "Đội xe giao hàng"],
      servicesTitle: "Dịch vụ gia tăng",
      services: [
        "Gom hàng ghép container tại kho TQ — nhiều nhà cung cấp một đơn, tiết kiệm cước",
        "Kiểm hàng & chụp ảnh trước khi gửi — tiêu chuẩn nghiệm thu theo yêu cầu xưởng bạn",
        "Tư vấn chọn thiết bị — so sánh máy & giá cùng loại tại Trung Quốc",
        "Nhỏ lẻ theo yêu cầu — MOQ linh hoạt, thân thiện đơn thử",
        "Đại lý xuất nhập khẩu — thông quan, Form E, logistics trọn gói"
      ],
      promiseTitle: "Cam kết dịch vụ",
      promises: ["Báo giá trong 24 giờ", "Xuất nhập chính ngạch", "C/O Form E", "Hóa đơn VAT", "Kiểm hàng & chụp ảnh trước khi giao"],
      processTitle: "Quy trình hợp tác",
      steps: ["Hỏi giá", "Báo giá", "Đặt cọc", "Gom hàng TQ", "Thông quan", "Giao hàng VN"],
      docTitle: "Mẫu chứng từ",
      docNote: "Chứng từ chính thức giao theo từng lô hàng, có thể kiểm tra. Nhà máy cần xuất hóa đơn vui lòng báo trước yêu cầu.",
      docs: [
        {
          "name": "Tờ khai hải quan",
          "img": "/images/docs/customs.jpg",
          "desc": "Chứng từ nhập chính ngạch: hàng nhập hợp pháp, truy vết được toàn trình, giao kèm bản sao để phòng tài chính và bảo hành lưu hồ sơ."
        },
        {
          "name": "C/O Form E (Mẫu E)",
          "img": "/images/docs/form-e.jpg",
          "desc": "Giấy chứng nhận xuất xứ ASEAN – Trung Quốc (ACFTA): thuế nhập áp thuế suất ưu đãi theo hiệp định, nhiều mặt hàng công nghiệp giảm mạnh — lý do chính ngạch rẻ hơn tiểu ngạch."
        },
        {
          "name": "Hóa đơn VAT",
          "img": "/images/docs/vat.jpg",
          "desc": "Nhà máy cần hạch toán sẽ có hóa đơn GTGT, thuế đầu vào được khấu trừ, sổ sách yên tâm."
        }
      ],
      contactTitle: "Liên hệ",
    },
    cases: { title: "Dự án thực tế", sub: "Đơn hàng thật, thông tin khách hàng đã ẩn danh" },
    footer: {
      contact: "Liên hệ",
      qr: "Quét mã để thêm",
      trustLine: "Mua thẳng Trung Quốc · Hàng chính hãng · Giao tận xưởng",
      rights: "Bản quyền",
    },
    breadcrumb: { home: "Trang chủ", products: "Sản phẩm" },
    langSwitch: "Tiếng Việt",
    otherLang: "zh" as Lang,
  },
} as const;

export type Dict = (typeof dict)["zh"];
export const t = (lang: Lang): Dict => dict[lang] as Dict;
