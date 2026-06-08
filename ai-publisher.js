import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// 1. حل مشكلة غياب __dirname في نظام الـ ES Modules الحديث ليتوافق مع جيت هب
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 2. ضبط وتصحيح المسارات بناءً على هيكلية مشروعك (Monorepo setup)
const PRODUCTS_FILE = path.resolve(__dirname, 'products.json'); 
const PUBLISHED_DIR = path.resolve(__dirname, 'frontend/public/content/published');
const AMAZON_STORE_ID = '233232122-20'; // Your Amazon Tracking ID

// تأمين المجلد حتى لا يفشل خادم Linux جيت هب إذا لم يجد المسار
if (!fs.existsSync(PUBLISHED_DIR)) {
    fs.mkdirSync(PUBLISHED_DIR, { recursive: true });
}

async function generateArticles() {
    if (!fs.existsSync(PRODUCTS_FILE)) {
        console.error("❌ Error: products.json file not found in your project root!");
        return;
    }
    
    const rawData = fs.readFileSync(PRODUCTS_FILE, 'utf-8');
    let products = JSON.parse(rawData);

    if (products.length < 1) {
        console.log("⚠️ Warning: No products left inside products.json to publish.");
        return;
    }

    // اقتطاع منتج واحد فقط لكل دورة تشغيل (3 مرات يومياً)
    const selectedProducts = products.splice(0, 1); 
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
        console.error("❌ Error: GEMINI_API_KEY is missing in your GitHub Secrets!");
        return;
    }

    for (const product of selectedProducts) {
        let rawUrl = product["Product URL"] || product.url || "";
        let affiliateUrl = rawUrl;
        if (rawUrl.includes("amazon.com")) {
            const separator = rawUrl.includes("?") ? "&" : "?";
            affiliateUrl = `${rawUrl}${separator}tag=${AMAZON_STORE_ID}`;
        }

        console.log(`🚀 Processing Product: ${product["Product Name"] || 'Product'}`);
        
        const prompt = `Act as an expert SEO blog writer, fitness coach, and wellness expert for FitFeky—a premium website specializing in Yoga and Weight Loss. 
        Write a high-quality, engaging, and professional article in English about this product:
        - Name: ${product["Product Name"]}
        - Price: ${product["Price (USD)"]} USD
        - Original Link: ${affiliateUrl}
        
        The output MUST be strictly raw Markdown format. Include this Frontmatter block at the very top:
        ---
        title: "[Create an attractive, clickable SEO title targeting fitness, yoga, or weight loss searchers]"
        date: "${new Date().toISOString().split('T')[0]}"
        image: "${product["Product Image"] || '/images/blog-placeholder.jpg'}"
        buyLink: "${affiliateUrl}"
        ---
        
        Content Guidelines:
        1. Write an engaging introduction focusing on the health, fitness, or weight loss challenges that this specific product solves, linking it beautifully to a healthy lifestyle (and yoga, if applicable).
        2. Create dedicated sections using headings (##) for:
           - "Key Features and Specifications"
           - "Health, Fitness, & Weight Loss Benefits" (Explain how it helps burn calories, improve flexibility, boost metabolism, or tone the body).
        3. Include a practical section detailing a "Healthy Daily Routine or Transformation Scenario" showing how incorporating this product accelerates fitness goals.
        4. Provide a highly persuasive call-to-action (CTA) paragraph at the end with a markdown link using the URL [${affiliateUrl}] to check it out on Amazon.
        5. Do not include any extra chat or markdown code block wrappers (\`\`\`markdown). Just output raw markdown text.`;

        try {
            // استخدام الـ fetch المدمج المستقر في Node 24 بدون حزم خارجية
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
            });

            const data = await response.json();
            
            if (!data.candidates || !data.candidates[0]) {
                console.error("❌ Gemini API didn't return content. Full response:", JSON.stringify(data));
                continue;
            }

            const articleContent = data.candidates[0].content.parts[0].text;

            const cleanTitle = (product["Product Name"] || 'fitness-article')
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .substring(0, 50);
                
            const fileName = `${cleanTitle}-${Date.now()}.md`;
            fs.writeFileSync(path.join(PUBLISHED_DIR, fileName), articleContent);
            console.log(`✅ Saved Fitness/Yoga Blog: ${fileName}`);

        } catch (error) {
            console.error("❌ Error with Gemini API:", error);
        }
    }

    // حفظ التحديث بعد إزالة المنتج لعدم التكرار في المرة القادمة
    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2));
    console.log("📊 Updated products.json queue successfully.");
}

generateArticles();
