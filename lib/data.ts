// Arabic B2B E-commerce Mock Data

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  image: string;
  subcategories: Subcategory[];
}

export interface Subcategory {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
}

export interface Supplier {
  id: string;
  name: string;
  country: string;
  yearsInBusiness: number;
  verified: boolean;
  responseRate: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  images: string[];
  priceMin: number;
  priceMax: number;
  moq: number;
  unit: string;
  categoryId: string;
  subcategoryId: string;
  supplierId: string;
  rating: number;
  orders: number;
  freeShipping: boolean;
  readyToShip: boolean;
  origin: string;
}

export const suppliers: Supplier[] = [
  {
    id: "sup-1",
    name: "مؤسسة تهامة للتوريد",
    country: "اليمن",
    yearsInBusiness: 8,
    verified: true,
    responseRate: 98
  },
  {
    id: "sup-2",
    name: "شركة صنعاء للإلكترونيات",
    country: "اليمن",
    yearsInBusiness: 12,
    verified: true,
    responseRate: 95
  },
  {
    id: "sup-3",
    name: "مؤسسة عدن للآلات",
    country: "اليمن",
    yearsInBusiness: 15,
    verified: true,
    responseRate: 99
  },
  {
    id: "sup-4",
    name: "مصنع تعز للملابس",
    country: "اليمن",
    yearsInBusiness: 6,
    verified: true,
    responseRate: 92
  },
  {
    id: "sup-5",
    name: "شركة حضرموت للمستلزمات الطبية",
    country: "اليمن",
    yearsInBusiness: 10,
    verified: true,
    responseRate: 97
  },
  {
    id: "sup-6",
    name: "مؤسسة إب للأثاث",
    country: "اليمن",
    yearsInBusiness: 9,
    verified: false,
    responseRate: 88
  }
];

export const categories: Category[] = [
  {
    id: "cat-1",
    name: "الإلكترونيات والكهربائيات",
    slug: "electronics",
    icon: "Smartphone",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400",
    subcategories: [
      { id: "sub-1-1", name: "الهواتف المحمولة", slug: "mobile-phones", categoryId: "cat-1" },
      { id: "sub-1-2", name: "الحواسيب والأجهزة اللوحية", slug: "computers-tablets", categoryId: "cat-1" },
      { id: "sub-1-3", name: "الصوتيات والسماعات", slug: "audio-headphones", categoryId: "cat-1" },
      { id: "sub-1-4", name: "الأجهزة المنزلية", slug: "home-appliances", categoryId: "cat-1" },
      { id: "sub-1-5", name: "الكاميرات والتصوير", slug: "cameras-photography", categoryId: "cat-1" }
    ]
  },
  {
    id: "cat-2",
    name: "الآلات والمعدات الصناعية",
    slug: "machinery",
    icon: "Cog",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400",
    subcategories: [
      { id: "sub-2-1", name: "آلات التعبئة والتغليف", slug: "packaging-machines", categoryId: "cat-2" },
      { id: "sub-2-2", name: "آلات الطباعة", slug: "printing-machines", categoryId: "cat-2" },
      { id: "sub-2-3", name: "معدات البناء", slug: "construction-equipment", categoryId: "cat-2" },
      { id: "sub-2-4", name: "الأدوات الصناعية", slug: "industrial-tools", categoryId: "cat-2" }
    ]
  },
  {
    id: "cat-3",
    name: "الملابس والأزياء",
    slug: "fashion",
    icon: "Shirt",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400",
    subcategories: [
      { id: "sub-3-1", name: "ملابس رجالية", slug: "mens-clothing", categoryId: "cat-3" },
      { id: "sub-3-2", name: "ملابس نسائية", slug: "womens-clothing", categoryId: "cat-3" },
      { id: "sub-3-3", name: "ملابس أطفال", slug: "kids-clothing", categoryId: "cat-3" },
      { id: "sub-3-4", name: "الأحذية والحقائب", slug: "shoes-bags", categoryId: "cat-3" }
    ]
  },
  {
    id: "cat-4",
    name: "المنزل والحديقة",
    slug: "home-garden",
    icon: "Home",
    image: "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=400",
    subcategories: [
      { id: "sub-4-1", name: "الأثاث المنزلي", slug: "furniture", categoryId: "cat-4" },
      { id: "sub-4-2", name: "أدوات المطبخ", slug: "kitchen-tools", categoryId: "cat-4" },
      { id: "sub-4-3", name: "الإضاءة والديكور", slug: "lighting-decor", categoryId: "cat-4" },
      { id: "sub-4-4", name: "مستلزمات الحديقة", slug: "garden-supplies", categoryId: "cat-4" }
    ]
  },
  {
    id: "cat-5",
    name: "الصحة والجمال",
    slug: "health-beauty",
    icon: "Heart",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400",
    subcategories: [
      { id: "sub-5-1", name: "العناية بالبشرة", slug: "skincare", categoryId: "cat-5" },
      { id: "sub-5-2", name: "العناية بالشعر", slug: "haircare", categoryId: "cat-5" },
      { id: "sub-5-3", name: "المكياج والتجميل", slug: "makeup-cosmetics", categoryId: "cat-5" },
      { id: "sub-5-4", name: "المعدات الطبية", slug: "medical-equipment", categoryId: "cat-5" }
    ]
  },
  {
    id: "cat-6",
    name: "قطع غيار السيارات",
    slug: "automotive",
    icon: "Car",
    image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400",
    subcategories: [
      { id: "sub-6-1", name: "قطع غيار المحرك", slug: "engine-parts", categoryId: "cat-6" },
      { id: "sub-6-2", name: "إكسسوارات السيارات", slug: "car-accessories", categoryId: "cat-6" },
      { id: "sub-6-3", name: "إطارات وعجلات", slug: "tires-wheels", categoryId: "cat-6" },
      { id: "sub-6-4", name: "إلكترونيات السيارات", slug: "car-electronics", categoryId: "cat-6" }
    ]
  },
  {
    id: "cat-7",
    name: "الرياضة والترفيه",
    slug: "sports",
    icon: "Dumbbell",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400",
    subcategories: [
      { id: "sub-7-1", name: "معدات اللياقة", slug: "fitness-equipment", categoryId: "cat-7" },
      { id: "sub-7-2", name: "الرياضات الخارجية", slug: "outdoor-sports", categoryId: "cat-7" },
      { id: "sub-7-3", name: "الألعاب والهوايات", slug: "toys-hobbies", categoryId: "cat-7" },
      { id: "sub-7-4", name: "معدات التخييم", slug: "camping-equipment", categoryId: "cat-7" }
    ]
  },
  {
    id: "cat-8",
    name: "المواد الغذائية",
    slug: "food-beverage",
    icon: "Coffee",
    image: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=400",
    subcategories: [
      { id: "sub-8-1", name: "المشروبات", slug: "beverages", categoryId: "cat-8" },
      { id: "sub-8-2", name: "الوجبات الخفيفة", slug: "snacks", categoryId: "cat-8" },
      { id: "sub-8-3", name: "المكسرات والفواكه المجففة", slug: "nuts-dried-fruits", categoryId: "cat-8" },
      { id: "sub-8-4", name: "التوابل والبهارات", slug: "spices-seasonings", categoryId: "cat-8" }
    ]
  },
  {
    id: "cat-9",
    name: "مواد البناء والعقارات",
    slug: "construction",
    icon: "Building",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400",
    subcategories: [
      { id: "sub-9-1", name: "مواد البناء", slug: "building-materials", categoryId: "cat-9" },
      { id: "sub-9-2", name: "الأبواب والنوافذ", slug: "doors-windows", categoryId: "cat-9" },
      { id: "sub-9-3", name: "السباكة والصرف", slug: "plumbing", categoryId: "cat-9" },
      { id: "sub-9-4", name: "الأرضيات والبلاط", slug: "flooring-tiles", categoryId: "cat-9" }
    ]
  },
  {
    id: "cat-10",
    name: "الزراعة والمزارع",
    slug: "agriculture",
    icon: "Leaf",
    image: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=400",
    subcategories: [
      { id: "sub-10-1", name: "البذور والنباتات", slug: "seeds-plants", categoryId: "cat-10" },
      { id: "sub-10-2", name: "الأسمدة والمبيدات", slug: "fertilizers-pesticides", categoryId: "cat-10" },
      { id: "sub-10-3", name: "معدات الري", slug: "irrigation-equipment", categoryId: "cat-10" },
      { id: "sub-10-4", name: "الآلات الزراعية", slug: "farm-machinery", categoryId: "cat-10" }
    ]
  },
  {
    id: "cat-11",
    name: "التغليف والطباعة",
    slug: "packaging",
    icon: "Package",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
    subcategories: [
      { id: "sub-11-1", name: "علب وصناديق", slug: "boxes-cartons", categoryId: "cat-11" },
      { id: "sub-11-2", name: "أكياس التغليف", slug: "packaging-bags", categoryId: "cat-11" },
      { id: "sub-11-3", name: "ملصقات وشرائط", slug: "labels-tapes", categoryId: "cat-11" },
      { id: "sub-11-4", name: "مواد الطباعة", slug: "printing-supplies", categoryId: "cat-11" }
    ]
  },
  {
    id: "cat-12",
    name: "المجوهرات والساعات",
    slug: "jewelry-watches",
    icon: "Watch",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400",
    subcategories: [
      { id: "sub-12-1", name: "الساعات الذكية", slug: "smart-watches", categoryId: "cat-12" },
      { id: "sub-12-2", name: "المجوهرات الذهبية", slug: "gold-jewelry", categoryId: "cat-12" },
      { id: "sub-12-3", name: "الإكسسوارات", slug: "accessories", categoryId: "cat-12" },
      { id: "sub-12-4", name: "ساعات اليد الكلاسيكية", slug: "classic-watches", categoryId: "cat-12" }
    ]
  }
];

export const products: Product[] = [
  // Electronics
  {
    id: "prod-1",
    name: "سماعات بلوتوث لاسلكية احترافية",
    slug: "wireless-bluetooth-headphones",
    description: "سماعات بلوتوث عالية الجودة مع خاصية إلغاء الضوضاء، بطارية تدوم 40 ساعة، مثالية للاستخدام اليومي والأعمال",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600"
    ],
    priceMin: 8.50,
    priceMax: 15.00,
    moq: 50,
    unit: "قطعة",
    categoryId: "cat-1",
    subcategoryId: "sub-1-3",
    supplierId: "sup-2",
    rating: 4.8,
    orders: 15420,
    freeShipping: true,
    readyToShip: true,
    origin: "الصين"
  },
  {
    id: "prod-2",
    name: "هاتف ذكي أندرويد 6.7 بوصة",
    slug: "android-smartphone-6-7",
    description: "هاتف ذكي بشاشة AMOLED 6.7 بوصة، كاميرا 108 ميجابكسل، ذاكرة 256 جيجا، مناسب للبيع بالجملة",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400",
    images: [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600",
      "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=600"
    ],
    priceMin: 85.00,
    priceMax: 120.00,
    moq: 20,
    unit: "قطعة",
    categoryId: "cat-1",
    subcategoryId: "sub-1-1",
    supplierId: "sup-2",
    rating: 4.6,
    orders: 8750,
    freeShipping: true,
    readyToShip: true,
    origin: "الصين"
  },
  {
    id: "prod-3",
    name: "حاسوب محمول للأعمال 15.6 بوصة",
    slug: "business-laptop-15-6",
    description: "حاسوب محمول بمعالج Intel Core i7، ذاكرة 16GB RAM، تخزين SSD 512GB، مثالي للشركات",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400",
    images: [
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600",
      "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=600"
    ],
    priceMin: 320.00,
    priceMax: 450.00,
    moq: 5,
    unit: "قطعة",
    categoryId: "cat-1",
    subcategoryId: "sub-1-2",
    supplierId: "sup-2",
    rating: 4.7,
    orders: 3200,
    freeShipping: false,
    readyToShip: true,
    origin: "الصين"
  },
  {
    id: "prod-4",
    name: "كاميرا مراقبة ذكية WiFi",
    slug: "smart-wifi-security-camera",
    description: "كاميرا مراقبة 4K بتقنية الرؤية الليلية، كشف الحركة، تخزين سحابي، تطبيق جوال",
    image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400",
    images: [
      "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600"
    ],
    priceMin: 18.00,
    priceMax: 35.00,
    moq: 30,
    unit: "قطعة",
    categoryId: "cat-1",
    subcategoryId: "sub-1-5",
    supplierId: "sup-1",
    rating: 4.5,
    orders: 12300,
    freeShipping: true,
    readyToShip: true,
    origin: "الصين"
  },
  {
    id: "prod-5",
    name: "ساعة ذكية متعددة الوظائف",
    slug: "multi-function-smart-watch",
    description: "ساعة ذكية مع قياس نبضات القلب، GPS، مقاومة للماء، متوافقة مع Android و iOS",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600",
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600"
    ],
    priceMin: 12.00,
    priceMax: 25.00,
    moq: 100,
    unit: "قطعة",
    categoryId: "cat-12",
    subcategoryId: "sub-12-1",
    supplierId: "sup-2",
    rating: 4.4,
    orders: 28500,
    freeShipping: true,
    readyToShip: true,
    origin: "الصين"
  },
  // Machinery
  {
    id: "prod-6",
    name: "آلة تعبئة وتغليف أوتوماتيكية",
    slug: "automatic-packaging-machine",
    description: "آلة تعبئة سائلة ولزجة بطاقة 2000-4000 عبوة/ساعة، مناسبة للمصانع الغذائية والكيماوية",
    image: "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=400",
    images: [
      "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=600"
    ],
    priceMin: 4500.00,
    priceMax: 8500.00,
    moq: 1,
    unit: "آلة",
    categoryId: "cat-2",
    subcategoryId: "sub-2-1",
    supplierId: "sup-3",
    rating: 4.9,
    orders: 156,
    freeShipping: false,
    readyToShip: false,
    origin: "الصين"
  },
  {
    id: "prod-7",
    name: "آلة طباعة رقمية UV",
    slug: "uv-digital-printing-machine",
    description: "طابعة UV صناعية للطباعة على الخشب والزجاج والمعادن، دقة 1440 نقطة في البوصة",
    image: "https://images.unsplash.com/photo-1562408590-e32931084e23?w=400",
    images: [
      "https://images.unsplash.com/photo-1562408590-e32931084e23?w=600"
    ],
    priceMin: 12000.00,
    priceMax: 25000.00,
    moq: 1,
    unit: "آلة",
    categoryId: "cat-2",
    subcategoryId: "sub-2-2",
    supplierId: "sup-3",
    rating: 4.8,
    orders: 89,
    freeShipping: false,
    readyToShip: false,
    origin: "الصين"
  },
  {
    id: "prod-8",
    name: "خلاطة خرسانة صناعية 500 لتر",
    slug: "industrial-concrete-mixer-500l",
    description: "خلاطة خرسانة بسعة 500 لتر، محرك ديزل أو كهربائي، مثالية لمواقع البناء",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400",
    images: [
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600"
    ],
    priceMin: 2800.00,
    priceMax: 4500.00,
    moq: 1,
    unit: "آلة",
    categoryId: "cat-2",
    subcategoryId: "sub-2-3",
    supplierId: "sup-3",
    rating: 4.7,
    orders: 234,
    freeShipping: false,
    readyToShip: true,
    origin: "الصين"
  },
  // Fashion
  {
    id: "prod-9",
    name: "قميص رجالي قطن 100% للبيع بالجملة",
    slug: "mens-cotton-shirt-wholesale",
    description: "قميص رجالي أنيق من القطن الطبيعي، متوفر بجميع المقاسات والألوان، مناسب للتصدير",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400",
    images: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600",
      "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=600"
    ],
    priceMin: 4.50,
    priceMax: 8.00,
    moq: 200,
    unit: "قطعة",
    categoryId: "cat-3",
    subcategoryId: "sub-3-1",
    supplierId: "sup-4",
    rating: 4.5,
    orders: 45000,
    freeShipping: true,
    readyToShip: true,
    origin: "الصين"
  },
  {
    id: "prod-10",
    name: "فستان نسائي صيفي بالجملة",
    slug: "womens-summer-dress-wholesale",
    description: "فستان نسائي أنيق للصيف، أقمشة خفيفة ومريحة، تشكيلة ألوان متنوعة",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400",
    images: [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600",
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600"
    ],
    priceMin: 6.00,
    priceMax: 12.00,
    moq: 100,
    unit: "قطعة",
    categoryId: "cat-3",
    subcategoryId: "sub-3-2",
    supplierId: "sup-4",
    rating: 4.6,
    orders: 32000,
    freeShipping: true,
    readyToShip: true,
    origin: "الصين"
  },
  {
    id: "prod-11",
    name: "حذاء رياضي جلد صناعي",
    slug: "sports-shoes-synthetic-leather",
    description: "حذاء رياضي عصري مصنوع من الجلد الصناعي عالي الجودة، نعل مطاطي مريح",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600"
    ],
    priceMin: 8.00,
    priceMax: 18.00,
    moq: 50,
    unit: "زوج",
    categoryId: "cat-3",
    subcategoryId: "sub-3-4",
    supplierId: "sup-4",
    rating: 4.4,
    orders: 18500,
    freeShipping: true,
    readyToShip: true,
    origin: "الصين"
  },
  // Home & Garden
  {
    id: "prod-12",
    name: "طقم أريكة جلدية فاخرة",
    slug: "luxury-leather-sofa-set",
    description: "طقم جلوس مكون من 3 قطع، جلد طبيعي فاخر، تصميم عصري، ضمان 5 سنوات",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400",
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600",
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=600"
    ],
    priceMin: 450.00,
    priceMax: 850.00,
    moq: 5,
    unit: "طقم",
    categoryId: "cat-4",
    subcategoryId: "sub-4-1",
    supplierId: "sup-6",
    rating: 4.7,
    orders: 890,
    freeShipping: false,
    readyToShip: false,
    origin: "الصين"
  },
  {
    id: "prod-13",
    name: "طقم أدوات مطبخ ستانلس ستيل",
    slug: "stainless-steel-kitchen-set",
    description: "طقم أدوات مطبخ 24 قطعة من الستانلس ستيل المقاوم للصدأ، جودة مطاعم",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400",
    images: [
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600"
    ],
    priceMin: 25.00,
    priceMax: 45.00,
    moq: 50,
    unit: "طقم",
    categoryId: "cat-4",
    subcategoryId: "sub-4-2",
    supplierId: "sup-6",
    rating: 4.5,
    orders: 5600,
    freeShipping: true,
    readyToShip: true,
    origin: "الصين"
  },
  {
    id: "prod-14",
    name: "ثريا كريستال LED حديثة",
    slug: "modern-led-crystal-chandelier",
    description: "ثريا كريستال فاخرة مع إضاءة LED، تحكم عن بعد، مناسبة للفنادق والقصور",
    image: "https://images.unsplash.com/photo-1543198126-a8ad8e47fb22?w=400",
    images: [
      "https://images.unsplash.com/photo-1543198126-a8ad8e47fb22?w=600"
    ],
    priceMin: 120.00,
    priceMax: 350.00,
    moq: 10,
    unit: "قطعة",
    categoryId: "cat-4",
    subcategoryId: "sub-4-3",
    supplierId: "sup-6",
    rating: 4.8,
    orders: 2100,
    freeShipping: false,
    readyToShip: true,
    origin: "الصين"
  },
  // Health & Beauty
  {
    id: "prod-15",
    name: "مجموعة العناية بالبشرة الكورية",
    slug: "korean-skincare-set",
    description: "مجموعة كاملة للعناية بالبشرة 10 منتجات، مكونات طبيعية، مناسبة لجميع أنواع البشرة",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400",
    images: [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600",
      "https://images.unsplash.com/photo-1570194065650-d99fb4d4f87c?w=600"
    ],
    priceMin: 15.00,
    priceMax: 28.00,
    moq: 100,
    unit: "طقم",
    categoryId: "cat-5",
    subcategoryId: "sub-5-1",
    supplierId: "sup-5",
    rating: 4.6,
    orders: 25000,
    freeShipping: true,
    readyToShip: true,
    origin: "كوريا الجنوبية"
  },
  {
    id: "prod-16",
    name: "فرشاة شعر كهربائية أيونية",
    slug: "ionic-electric-hair-brush",
    description: "فرشاة تصفيف الشعر بتقنية الأيونات السالبة، تقلل التجعد وتزيد اللمعان",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400",
    images: [
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600"
    ],
    priceMin: 8.00,
    priceMax: 15.00,
    moq: 100,
    unit: "قطعة",
    categoryId: "cat-5",
    subcategoryId: "sub-5-2",
    supplierId: "sup-5",
    rating: 4.4,
    orders: 18000,
    freeShipping: true,
    readyToShip: true,
    origin: "الصين"
  },
  {
    id: "prod-17",
    name: "جهاز قياس ضغط الدم الرقمي",
    slug: "digital-blood-pressure-monitor",
    description: "جهاز قياس ضغط الدم الإلكتروني، شاشة LCD كبيرة، ذاكرة 120 قراءة، معتمد طبياً",
    image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=400",
    images: [
      "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=600"
    ],
    priceMin: 12.00,
    priceMax: 22.00,
    moq: 50,
    unit: "قطعة",
    categoryId: "cat-5",
    subcategoryId: "sub-5-4",
    supplierId: "sup-5",
    rating: 4.7,
    orders: 8900,
    freeShipping: true,
    readyToShip: true,
    origin: "الصين"
  },
  // Automotive
  {
    id: "prod-18",
    name: "فلتر زيت محرك عالي الأداء",
    slug: "high-performance-oil-filter",
    description: "فلتر زيت محرك عالي الجودة متوافق مع معظم السيارات اليابانية والأوروبية",
    image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400",
    images: [
      "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=600"
    ],
    priceMin: 1.50,
    priceMax: 4.00,
    moq: 500,
    unit: "قطعة",
    categoryId: "cat-6",
    subcategoryId: "sub-6-1",
    supplierId: "sup-1",
    rating: 4.5,
    orders: 45000,
    freeShipping: true,
    readyToShip: true,
    origin: "الصين"
  },
  {
    id: "prod-19",
    name: "كاميرا داش للسيارة 4K",
    slug: "4k-dash-camera",
    description: "كاميرا سيارة 4K مع رؤية ليلية، GPS، WiFi، تسجيل مستمر، شاشة 3 بوصة",
    image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=400",
    images: [
      "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=600"
    ],
    priceMin: 25.00,
    priceMax: 55.00,
    moq: 30,
    unit: "قطعة",
    categoryId: "cat-6",
    subcategoryId: "sub-6-4",
    supplierId: "sup-2",
    rating: 4.6,
    orders: 12500,
    freeShipping: true,
    readyToShip: true,
    origin: "الصين"
  },
  // Sports
  {
    id: "prod-20",
    name: "دراجة هوائية قابلة للطي",
    slug: "foldable-bicycle",
    description: "دراجة هوائية قابلة للطي 20 بوصة، هيكل ألمنيوم خفيف، 7 سرعات، مثالية للتنقل",
    image: "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=400",
    images: [
      "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=600"
    ],
    priceMin: 85.00,
    priceMax: 150.00,
    moq: 20,
    unit: "قطعة",
    categoryId: "cat-7",
    subcategoryId: "sub-7-2",
    supplierId: "sup-1",
    rating: 4.5,
    orders: 3200,
    freeShipping: false,
    readyToShip: true,
    origin: "الصين"
  },
  {
    id: "prod-21",
    name: "جهاز المشي الكهربائي المنزلي",
    slug: "home-electric-treadmill",
    description: "جهاز مشي كهربائي قابل للطي، سرعة حتى 16 كم/ساعة، شاشة LED، مكبرات صوت",
    image: "https://images.unsplash.com/photo-1576678927484-cc907957088c?w=400",
    images: [
      "https://images.unsplash.com/photo-1576678927484-cc907957088c?w=600"
    ],
    priceMin: 180.00,
    priceMax: 350.00,
    moq: 5,
    unit: "قطعة",
    categoryId: "cat-7",
    subcategoryId: "sub-7-1",
    supplierId: "sup-1",
    rating: 4.4,
    orders: 1800,
    freeShipping: false,
    readyToShip: true,
    origin: "الصين"
  },
  {
    id: "prod-22",
    name: "خيمة تخييم عائلية 6 أشخاص",
    slug: "family-camping-tent-6p",
    description: "خيمة تخييم مقاومة للماء، سهلة التركيب، تتسع لـ 6 أشخاص، نوافذ شبكية",
    image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=400",
    images: [
      "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600"
    ],
    priceMin: 45.00,
    priceMax: 85.00,
    moq: 20,
    unit: "قطعة",
    categoryId: "cat-7",
    subcategoryId: "sub-7-4",
    supplierId: "sup-1",
    rating: 4.6,
    orders: 4500,
    freeShipping: false,
    readyToShip: true,
    origin: "الصين"
  },
  // Food & Beverage
  {
    id: "prod-23",
    name: "شاي أخضر صيني عضوي",
    slug: "organic-chinese-green-tea",
    description: "شاي أخضر عضوي من جبال الصين، غني بمضادات الأكسدة، تعبئة 500 جرام",
    image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400",
    images: [
      "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=600"
    ],
    priceMin: 8.00,
    priceMax: 15.00,
    moq: 100,
    unit: "كيلوجرام",
    categoryId: "cat-8",
    subcategoryId: "sub-8-1",
    supplierId: "sup-1",
    rating: 4.8,
    orders: 15000,
    freeShipping: true,
    readyToShip: true,
    origin: "الصين"
  },
  {
    id: "prod-24",
    name: "مكسرات مشكلة فاخرة",
    slug: "premium-mixed-nuts",
    description: "خليط مكسرات فاخرة: لوز، كاجو، فستق، جوز، محمصة طبيعياً بدون ملح",
    image: "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=400",
    images: [
      "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=600"
    ],
    priceMin: 12.00,
    priceMax: 20.00,
    moq: 50,
    unit: "كيلوجرام",
    categoryId: "cat-8",
    subcategoryId: "sub-8-3",
    supplierId: "sup-1",
    rating: 4.7,
    orders: 8500,
    freeShipping: true,
    readyToShip: true,
    origin: "تركيا"
  },
  // Construction
  {
    id: "prod-25",
    name: "بلاط سيراميك أرضيات 60×60",
    slug: "ceramic-floor-tiles-60x60",
    description: "بلاط سيراميك عالي الجودة للأرضيات، مقاوم للخدش والماء، متعدد التصاميم",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400",
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600"
    ],
    priceMin: 5.00,
    priceMax: 12.00,
    moq: 500,
    unit: "متر مربع",
    categoryId: "cat-9",
    subcategoryId: "sub-9-4",
    supplierId: "sup-3",
    rating: 4.5,
    orders: 25000,
    freeShipping: false,
    readyToShip: true,
    origin: "الصين"
  },
  {
    id: "prod-26",
    name: "باب خشبي صلب داخلي",
    slug: "solid-wood-interior-door",
    description: "باب خشبي صلب للاستخدام الداخلي، تشطيب عالي الجودة، متوفر بعدة ألوان",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600"
    ],
    priceMin: 45.00,
    priceMax: 120.00,
    moq: 20,
    unit: "قطعة",
    categoryId: "cat-9",
    subcategoryId: "sub-9-2",
    supplierId: "sup-6",
    rating: 4.6,
    orders: 3200,
    freeShipping: false,
    readyToShip: true,
    origin: "الصين"
  },
  // Agriculture
  {
    id: "prod-27",
    name: "نظام ري بالتنقيط الآلي",
    slug: "automatic-drip-irrigation-system",
    description: "نظام ري بالتنقيط ذكي مع مؤقت رقمي، يغطي حتى 1000 متر مربع",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400",
    images: [
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600"
    ],
    priceMin: 150.00,
    priceMax: 350.00,
    moq: 10,
    unit: "طقم",
    categoryId: "cat-10",
    subcategoryId: "sub-10-3",
    supplierId: "sup-3",
    rating: 4.7,
    orders: 1200,
    freeShipping: false,
    readyToShip: true,
    origin: "الصين"
  },
  {
    id: "prod-28",
    name: "سماد عضوي NPK",
    slug: "organic-npk-fertilizer",
    description: "سماد عضوي متوازن NPK 15-15-15، يعزز نمو النباتات والمحاصيل الزراعية",
    image: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=400",
    images: [
      "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=600"
    ],
    priceMin: 0.30,
    priceMax: 0.60,
    moq: 5000,
    unit: "كيلوجرام",
    categoryId: "cat-10",
    subcategoryId: "sub-10-2",
    supplierId: "sup-3",
    rating: 4.5,
    orders: 85000,
    freeShipping: false,
    readyToShip: true,
    origin: "الصين"
  },
  // Packaging
  {
    id: "prod-29",
    name: "صناديق كرتون مضلعة للشحن",
    slug: "corrugated-shipping-boxes",
    description: "صناديق كرتون مضلعة بثلاث طبقات، أحجام متعددة، مثالية للشحن والتخزين",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600"
    ],
    priceMin: 0.25,
    priceMax: 0.80,
    moq: 1000,
    unit: "قطعة",
    categoryId: "cat-11",
    subcategoryId: "sub-11-1",
    supplierId: "sup-3",
    rating: 4.4,
    orders: 150000,
    freeShipping: true,
    readyToShip: true,
    origin: "الصين"
  },
  {
    id: "prod-30",
    name: "أكياس تغليف بلاستيك قابلة للغلق",
    slug: "resealable-plastic-packaging-bags",
    description: "أكياس بلاستيكية شفافة قابلة للغلق المتكرر، صالحة للأغذية، أحجام متنوعة",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600"
    ],
    priceMin: 0.02,
    priceMax: 0.08,
    moq: 10000,
    unit: "قطعة",
    categoryId: "cat-11",
    subcategoryId: "sub-11-2",
    supplierId: "sup-3",
    rating: 4.5,
    orders: 500000,
    freeShipping: true,
    readyToShip: true,
    origin: "الصين"
  },
  // Jewelry & Watches
  {
    id: "prod-31",
    name: "طقم مجوهرات فضة 925",
    slug: "925-silver-jewelry-set",
    description: "طقم مجوهرات من الفضة الخالصة 925، قلادة وأقراط وسوار، تصميم أنيق",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400",
    images: [
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600"
    ],
    priceMin: 18.00,
    priceMax: 45.00,
    moq: 50,
    unit: "طقم",
    categoryId: "cat-12",
    subcategoryId: "sub-12-2",
    supplierId: "sup-1",
    rating: 4.6,
    orders: 8500,
    freeShipping: true,
    readyToShip: true,
    origin: "الصين"
  },
  {
    id: "prod-32",
    name: "ساعة يد رجالية أوتوماتيكية",
    slug: "mens-automatic-wristwatch",
    description: "ساعة يد رجالية ميكانيكية أوتوماتيكية، هيكل ستانلس ستيل، مقاومة للماء",
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400",
    images: [
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600"
    ],
    priceMin: 25.00,
    priceMax: 65.00,
    moq: 30,
    unit: "قطعة",
    categoryId: "cat-12",
    subcategoryId: "sub-12-4",
    supplierId: "sup-1",
    rating: 4.5,
    orders: 5600,
    freeShipping: true,
    readyToShip: true,
    origin: "الصين"
  },
  // More Electronics
  {
    id: "prod-33",
    name: "شاحن لاسلكي سريع 15W",
    slug: "fast-wireless-charger-15w",
    description: "شاحن لاسلكي سريع 15 واط متوافق مع جميع الهواتف الذكية، تصميم أنيق ومضغوط",
    image: "https://images.unsplash.com/photo-1591815302525-756a9bcc3425?w=400",
    images: [
      "https://images.unsplash.com/photo-1591815302525-756a9bcc3425?w=600"
    ],
    priceMin: 3.50,
    priceMax: 8.00,
    moq: 100,
    unit: "قطعة",
    categoryId: "cat-1",
    subcategoryId: "sub-1-1",
    supplierId: "sup-2",
    rating: 4.5,
    orders: 35000,
    freeShipping: true,
    readyToShip: true,
    origin: "الصين"
  },
  {
    id: "prod-34",
    name: "مكنسة كهربائية روبوت ذكية",
    slug: "smart-robot-vacuum-cleaner",
    description: "مكنسة روبوت ذكية بتقنية الليزر، تنظيف ومسح، تحكم عبر التطبيق",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600"
    ],
    priceMin: 85.00,
    priceMax: 180.00,
    moq: 10,
    unit: "قطعة",
    categoryId: "cat-1",
    subcategoryId: "sub-1-4",
    supplierId: "sup-2",
    rating: 4.6,
    orders: 4200,
    freeShipping: false,
    readyToShip: true,
    origin: "الصين"
  },
  // More Fashion
  {
    id: "prod-35",
    name: "بدلة رجالية رسمية كاملة",
    slug: "mens-formal-suit-complete",
    description: "بدلة رجالية رسمية من قماش صوف عالي الجودة، جاكيت وبنطلون، متوفرة بعدة ألوان",
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400",
    images: [
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600"
    ],
    priceMin: 45.00,
    priceMax: 95.00,
    moq: 30,
    unit: "طقم",
    categoryId: "cat-3",
    subcategoryId: "sub-3-1",
    supplierId: "sup-4",
    rating: 4.7,
    orders: 6800,
    freeShipping: true,
    readyToShip: true,
    origin: "الصين"
  },
  {
    id: "prod-36",
    name: "حقيبة يد نسائية جلد طبيعي",
    slug: "womens-genuine-leather-handbag",
    description: "حقيبة يد نسائية فاخرة من الجلد الطبيعي، تصميم كلاسيكي، سعة كبيرة",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400",
    images: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600"
    ],
    priceMin: 25.00,
    priceMax: 55.00,
    moq: 30,
    unit: "قطعة",
    categoryId: "cat-3",
    subcategoryId: "sub-3-4",
    supplierId: "sup-4",
    rating: 4.6,
    orders: 12000,
    freeShipping: true,
    readyToShip: true,
    origin: "الصين"
  },
  // More Home
  {
    id: "prod-37",
    name: "طقم فراش فندقي فاخر",
    slug: "luxury-hotel-bedding-set",
    description: "طقم فراش فندقي 6 قطع، قطن مصري 400 خيط، أبيض ناصع، ملمس حريري",
    image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400",
    images: [
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600"
    ],
    priceMin: 35.00,
    priceMax: 75.00,
    moq: 50,
    unit: "طقم",
    categoryId: "cat-4",
    subcategoryId: "sub-4-1",
    supplierId: "sup-6",
    rating: 4.8,
    orders: 9500,
    freeShipping: true,
    readyToShip: true,
    origin: "الصين"
  },
  {
    id: "prod-38",
    name: "مجموعة أواني طهي سيراميك",
    slug: "ceramic-cookware-set",
    description: "مجموعة أواني طهي سيراميك 10 قطع، طبقة غير لاصقة، صحية وآمنة",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400",
    images: [
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600"
    ],
    priceMin: 55.00,
    priceMax: 120.00,
    moq: 20,
    unit: "طقم",
    categoryId: "cat-4",
    subcategoryId: "sub-4-2",
    supplierId: "sup-6",
    rating: 4.7,
    orders: 3800,
    freeShipping: false,
    readyToShip: true,
    origin: "الصين"
  },
  // More Health & Beauty
  {
    id: "prod-39",
    name: "جهاز مساج كهربائي للرقبة والظهر",
    slug: "electric-neck-back-massager",
    description: "جهاز مساج كهربائي متعدد الوظائف للرقبة والظهر، حرارة وذبذبات، تحكم عن بعد",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400",
    images: [
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600"
    ],
    priceMin: 18.00,
    priceMax: 45.00,
    moq: 30,
    unit: "قطعة",
    categoryId: "cat-5",
    subcategoryId: "sub-5-4",
    supplierId: "sup-5",
    rating: 4.5,
    orders: 15000,
    freeShipping: true,
    readyToShip: true,
    origin: "الصين"
  },
  {
    id: "prod-40",
    name: "طقم مكياج احترافي كامل",
    slug: "professional-makeup-kit-complete",
    description: "طقم مكياج احترافي 50 قطعة، ألوان متنوعة، جودة عالية، مناسب للمحترفين",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400",
    images: [
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600"
    ],
    priceMin: 25.00,
    priceMax: 55.00,
    moq: 50,
    unit: "طقم",
    categoryId: "cat-5",
    subcategoryId: "sub-5-3",
    supplierId: "sup-5",
    rating: 4.6,
    orders: 8200,
    freeShipping: true,
    readyToShip: true,
    origin: "الصين"
  },
  // More Machinery
  {
    id: "prod-41",
    name: "مولد كهرباء ديزل 50 كيلوواط",
    slug: "diesel-generator-50kw",
    description: "مولد كهرباء ديزل صامت 50 كيلوواط، موثوق للاستخدام التجاري والصناعي",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400",
    images: [
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600"
    ],
    priceMin: 3500.00,
    priceMax: 6500.00,
    moq: 1,
    unit: "آلة",
    categoryId: "cat-2",
    subcategoryId: "sub-2-4",
    supplierId: "sup-3",
    rating: 4.8,
    orders: 320,
    freeShipping: false,
    readyToShip: false,
    origin: "الصين"
  },
  {
    id: "prod-42",
    name: "ماكينة لحام كهربائية احترافية",
    slug: "professional-electric-welding-machine",
    description: "ماكينة لحام MIG/MAG احترافية 300 أمبير، مناسبة للورش والمصانع",
    image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400",
    images: [
      "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600"
    ],
    priceMin: 280.00,
    priceMax: 550.00,
    moq: 5,
    unit: "آلة",
    categoryId: "cat-2",
    subcategoryId: "sub-2-4",
    supplierId: "sup-3",
    rating: 4.7,
    orders: 850,
    freeShipping: false,
    readyToShip: true,
    origin: "الصين"
  },
  // More Automotive
  {
    id: "prod-43",
    name: "غطاء مقاعد سيارة جلد فاخر",
    slug: "luxury-leather-car-seat-covers",
    description: "أغطية مقاعد سيارة من الجلد الصناعي الفاخر، طقم كامل 5 مقاعد، متعدد الألوان",
    image: "https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=400",
    images: [
      "https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=600"
    ],
    priceMin: 45.00,
    priceMax: 95.00,
    moq: 20,
    unit: "طقم",
    categoryId: "cat-6",
    subcategoryId: "sub-6-2",
    supplierId: "sup-1",
    rating: 4.5,
    orders: 6500,
    freeShipping: true,
    readyToShip: true,
    origin: "الصين"
  },
  {
    id: "prod-44",
    name: "إطارات سيارات 205/55R16",
    slug: "car-tires-205-55-r16",
    description: "إطارات سيارات عالية الجودة مقاس 205/55R16، مناسبة لجميع الفصول",
    image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=400",
    images: [
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600"
    ],
    priceMin: 35.00,
    priceMax: 65.00,
    moq: 100,
    unit: "قطعة",
    categoryId: "cat-6",
    subcategoryId: "sub-6-3",
    supplierId: "sup-1",
    rating: 4.4,
    orders: 25000,
    freeShipping: false,
    readyToShip: true,
    origin: "الصين"
  },
  // Additional Products
  {
    id: "prod-45",
    name: "طابلت أندرويد 10 بوصة للتعليم",
    slug: "android-tablet-10-inch-education",
    description: "طابلت أندرويد 10 بوصة، 4GB RAM، 64GB تخزين، مثالي للتعليم والأعمال",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400",
    images: [
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600"
    ],
    priceMin: 55.00,
    priceMax: 95.00,
    moq: 50,
    unit: "قطعة",
    categoryId: "cat-1",
    subcategoryId: "sub-1-2",
    supplierId: "sup-2",
    rating: 4.4,
    orders: 12000,
    freeShipping: true,
    readyToShip: true,
    origin: "الصين"
  },
  {
    id: "prod-46",
    name: "سبيكر بلوتوث مقاوم للماء",
    slug: "waterproof-bluetooth-speaker",
    description: "سبيكر بلوتوث محمول مقاوم للماء IPX7، صوت ستيريو قوي، بطارية 12 ساعة",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400",
    images: [
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600"
    ],
    priceMin: 8.00,
    priceMax: 18.00,
    moq: 100,
    unit: "قطعة",
    categoryId: "cat-1",
    subcategoryId: "sub-1-3",
    supplierId: "sup-2",
    rating: 4.5,
    orders: 28000,
    freeShipping: true,
    readyToShip: true,
    origin: "الصين"
  },
  {
    id: "prod-47",
    name: "ملابس رياضية طقم كامل للرجال",
    slug: "mens-sportswear-complete-set",
    description: "طقم رياضي رجالي كامل، قميص وبنطلون، قماش سريع الجفاف، متعدد الألوان",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400",
    images: [
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600"
    ],
    priceMin: 12.00,
    priceMax: 25.00,
    moq: 100,
    unit: "طقم",
    categoryId: "cat-3",
    subcategoryId: "sub-3-1",
    supplierId: "sup-4",
    rating: 4.5,
    orders: 18500,
    freeShipping: true,
    readyToShip: true,
    origin: "الصين"
  },
  {
    id: "prod-48",
    name: "ملابس أطفال قطنية طقم صيفي",
    slug: "kids-cotton-summer-set",
    description: "طقم ملابس أطفال صيفي من القطن الطبيعي 100%، ناعم على البشرة، ألوان زاهية",
    image: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=400",
    images: [
      "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=600"
    ],
    priceMin: 5.00,
    priceMax: 12.00,
    moq: 200,
    unit: "طقم",
    categoryId: "cat-3",
    subcategoryId: "sub-3-3",
    supplierId: "sup-4",
    rating: 4.6,
    orders: 35000,
    freeShipping: true,
    readyToShip: true,
    origin: "الصين"
  },
  {
    id: "prod-49",
    name: "مرآة حمام LED ذكية",
    slug: "smart-led-bathroom-mirror",
    description: "مرآة حمام بإضاءة LED، خاصية مقاومة الضباب، مستشعر لمس، أحجام متعددة",
    image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=400",
    images: [
      "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600"
    ],
    priceMin: 45.00,
    priceMax: 120.00,
    moq: 20,
    unit: "قطعة",
    categoryId: "cat-4",
    subcategoryId: "sub-4-3",
    supplierId: "sup-6",
    rating: 4.6,
    orders: 4200,
    freeShipping: false,
    readyToShip: true,
    origin: "الصين"
  },
  {
    id: "prod-50",
    name: "أدوات حديقة طقم 12 قطعة",
    slug: "garden-tools-set-12-pieces",
    description: "طقم أدوات حديقة احترافي 12 قطعة، ستانلس ستيل مقاوم للصدأ، مقابض مريحة",
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400",
    images: [
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600"
    ],
    priceMin: 18.00,
    priceMax: 35.00,
    moq: 50,
    unit: "طقم",
    categoryId: "cat-4",
    subcategoryId: "sub-4-4",
    supplierId: "sup-6",
    rating: 4.5,
    orders: 7800,
    freeShipping: true,
    readyToShip: true,
    origin: "الصين"
  }
];

// Helper functions
export const getProductsByCategory = (categoryId: string): Product[] => {
  return products.filter(p => p.categoryId === categoryId);
};

export const getProductsBySubcategory = (subcategoryId: string): Product[] => {
  return products.filter(p => p.subcategoryId === subcategoryId);
};

export const getProductById = (id: string): Product | undefined => {
  return products.find(p => p.id === id);
};

export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find(p => p.slug === slug);
};

export const getCategoryBySlug = (slug: string): Category | undefined => {
  return categories.find(c => c.slug === slug);
};

export const getSupplierById = (id: string): Supplier | undefined => {
  return suppliers.find(s => s.id === id);
};

export const getProductsBySupplier = (supplierId: string): Product[] => {
  return products.filter(product => product.supplierId === supplierId);
};

export const searchProducts = (query: string): Product[] => {
  const lowerQuery = query.toLowerCase();
  return products.filter(p => 
    p.name.toLowerCase().includes(lowerQuery) || 
    p.description.toLowerCase().includes(lowerQuery)
  );
};

export const filterProducts = (
  categoryId?: string,
  subcategoryId?: string,
  minPrice?: number,
  maxPrice?: number,
  freeShipping?: boolean,
  readyToShip?: boolean
): Product[] => {
  return products.filter(p => {
    if (categoryId && p.categoryId !== categoryId) return false;
    if (subcategoryId && p.subcategoryId !== subcategoryId) return false;
    if (minPrice !== undefined && p.priceMin < minPrice) return false;
    if (maxPrice !== undefined && p.priceMax > maxPrice) return false;
    if (freeShipping && !p.freeShipping) return false;
    if (readyToShip && !p.readyToShip) return false;
    return true;
  });
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(p => p.orders > 10000).slice(0, 8);
};

export const getTopRatedProducts = (): Product[] => {
  return [...products].sort((a, b) => b.rating - a.rating).slice(0, 8);
};

export const heroSlides = [
  {
    id: 1,
    title: "عروض حصرية على الإلكترونيات",
    subtitle: "خصومات تصل إلى 50% على أحدث المنتجات",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=1200",
    buttonText: "تسوق الآن",
    link: "/category/electronics"
  },
  {
    id: 2,
    title: "موردون موثوقون من حول العالم",
    subtitle: "أكثر من 10,000 مورد معتمد",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200",
    buttonText: "اكتشف الموردين",
    link: "/category/machinery"
  },
  {
    id: 3,
    title: "أحدث صيحات الموضة بالجملة",
    subtitle: "تشكيلة واسعة من الملابس والأزياء",
    image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1200",
    buttonText: "عرض المجموعة",
    link: "/category/fashion"
  },
  {
    id: 4,
    title: "معدات صناعية بأسعار المصنع",
    subtitle: "آلات ومعدات للمصانع والورش",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200",
    buttonText: "استكشف المعدات",
    link: "/category/machinery"
  }
];
