import fs from 'fs';
import path from 'path';

const axios = require('axios');

// 1. قراءة ملف المنتجات JSON الخاص بك
const productsFilePath = path.join(__dirname, '../src/data/products.json'); // تأكد من المسار الصحيح للملف لديك
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

// 2. اختيار منتج عشوائي لم يتم نشره، أو اختر بناءً على ترتيب معين
const getRandomProduct = () => {
  const randomIndex = Math.floor(Math.random() * products.length);
  return products[randomIndex];
};

const publishToPinterest = async () => {
  const product = getRandomProduct();
  
  // تجهيز البيانات بناءً على الكلمات المفتاحية والسيو المجهز في موقعك
  const pinData = {
    board_id: process.env.PINTEREST_BOARD_ID, // رقم اللوحة الخاص بالتخسيس أو اليوغا
    title: `${product.name} | FitFeky Transformation`,
    description: `${product.description} Explore more fitness and yoga gears. Keywords: ${product.keywords}`,
    link: `https://www.fitfeky.com/products/${product.slug}`,
    media_source: {
      source_type: "image_url",
      url: product.image // رابط صورة التحول البصري (Before/After) المخزنة للمنتج
    }
  };

  try {
    // إرسال البيانات إلى Pinterest API
    const response = await axios.post('https://api.pinterest.com/v5/pins', pinData, {
      headers: {
        'Authorization': `Bearer ${process.env.PINTEREST_ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });
    console.log(`✅ Successfully posted Pin for: ${product.name}`);
  } catch (error) {
    console.error('❌ Error posting to Pinterest:', error);
  }
};

publishToPinterest();