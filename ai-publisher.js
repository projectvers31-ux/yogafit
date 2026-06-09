import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// إعداد المسارات بناءً على Master Prompt وهيكلية Monorepo
const PRODUCTS_FILE = path.resolve(__dirname, 'products.json'); 
const PUBLISHED_DIR = path.resolve(__dirname, 'content/blog'); // الحفظ داخل المجلد الصحيح لحماية المحتوى
const AMAZON_STORE_ID = '233232122-20'; 

if (!fs.existsSync(PUBLISHED_DIR)) {
    fs.mkdirSync(PUBLISHED_DIR, { recursive: true });
}

// مصفوفة أنواع المحتوى لضمان التدوير التلقائي وعدم التكرار
const contentTypes = [
    "How-To Guide", "Beginner Guide", "Comparison Article", 
    "Mistake Article", "FAQ Article", "Weight Loss Guide", 
    "Walking Guide", "Yoga Guide", "Nutrition Guide", "Healthy Lifestyle Guide"
];

async function generateArticles() {
    if (!fs.existsSync(PRODUCTS_FILE)) {
        console.error("❌ Error: products.json file not found!");
        return;
    }
    
    const rawData = fs.readFileSync(PRODUCTS_FILE, 'utf-8');
    let products = JSON.parse(rawData);

    if (products.length < 1) {
        console.log("⚠️ Warning: No products left inside products.json.");
        return;
    }

    const selectedProducts = products.splice(0, 1); 
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
        console.error("❌ Error: GEMINI_API_KEY is missing!");
        return;
    }

    // اختيار نوع المقال عشوائياً لتنويع المحتوى تلقائياً
    const chosenType = contentTypes[Math.floor(Math.random() * contentTypes.length)];

    for (const product of selectedProducts) {
        let rawUrl = product["Product URL"] || product.url || "";
        let affiliateUrl = rawUrl;
        if (rawUrl.includes("amazon.com")) {
            const separator = rawUrl.includes("?") ? "&" : "?";
            affiliateUrl = `${rawUrl}${separator}tag=${AMAZON_STORE_ID}`;
        }

        console.log(`🚀 Processing Product: ${product["Product Name"]} using Formatter: ${chosenType}`);
        
        const prompt = `You are a Senior SEO Strategist, Content Architect, and Affiliate Marketing Expert for FitFeky—a premium website specializing in Yoga, Weight Loss, and Healthy Aging for Women aged 35-60.
        
        Write a deep, comprehensive, and highly engaging article in English about a core topic related to this product:
        - Product Name: ${product["Product Name"]}
        - Price: ${product["Price (USD)"]} USD
        - Original Link: ${affiliateUrl}
        
        Article Format Style: ${chosenType}
        Length Requirement: Minimum 2000 words, Maximum 3500 words. Must feel 100% human-written, beginner-friendly, and authoritative (EEAT focused).
        
        The output MUST be strictly raw Markdown format. Include this Frontmatter block at the very top:
        ---
        title: "[Create an attractive, clickable SEO title targeting fitness, yoga, or weight loss for women over 40]"
        description: "[Compelling Meta Description rich with NLP entities]"
        date: "${new Date().toISOString().split('T')[0]}"
        image: "${product["Product Image"] || '/images/blog-placeholder.jpg'}"
        slug: "[SEO-friendly slug, e.g., best-walking-pad-for-women-over-40]"
        category: "Fitness"
        tags: ["Weight Loss", "Women Health", "Yoga", "Healthy Aging"]
        featured: false
        ---
        
        Structure Guidelines:
        1. H1 Title & Captivating Introduction solving a real health challenge first.
        2. "Why This Matters" Section focusing on women 40+ metabolism, hormone balancing, and fat loss.
        3. "Main Guide Section" & "Practical Tips" (In-depth, rich, detailed, giving deep actionable advice).
        4. "Common Mistakes" & "Frequently Asked Questions" (Include FAQ rich snippets format).
        5. "Related Calculators" Section: You MUST naturally insert Markdown internal links to at least 3 of these exact paths:
           - /calculators/calorie-calculator
           - /calculators/bmi-calculator
           - /calculators/protein-calculator
           - /calculators/water-intake-calculator
           - /calculators/tdee-calculator
           - /calculators/body-fat-calculator
        6. "Related Articles" Section: Recommend 3 relevant internal layout topic suggestions.
        7. "Recommended Product" & "Final CTA": Introduce the product naturally near the end as the ultimate supportive tool for this routine. Use a markdown link with rel="nofollow sponsored" to [${affiliateUrl}].
        8. "Pinterest Optimization Block" at the very bottom:
           - Pinterest Title: [Text]
           - Pinterest Description: [Text]
           - Pinterest Keywords: [Keywords]
           - Pinterest Text Overlay Example: [Text]
           - Suggested Vertical Image Concept (1000x1500 description)
        
        Do not include any extra chat or markdown code block wrappers (\`\`\`markdown). Output only the raw markdown content text starting immediately with the frontmatter.`;

        try {
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${apiKey}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
            });

            const data = await response.json();
            if (!data.candidates || !data.candidates[0]) {
                console.error("❌ Gemini API didn't return content.");
                continue;
            }

            const articleContent = data.candidates[0].content.parts[0].text;
            
            // استخراج الـ slug المقترح من المحتوى لتسمية الملف بطريقة احترافية
            const slugMatch = articleContent.match(/slug:\s*["']?([^"'\n]+)["']?/);
            const cleanTitle = slugMatch ? slugMatch[1].trim() : (product["Product Name"] || 'fitness-article').toLowerCase().replace(/[^a-z0-9]+/g, '-').substring(0, 50);
                
            const fileName = `${cleanTitle}.md`;
            fs.writeFileSync(path.join(PUBLISHED_DIR, fileName), articleContent);
            console.log(`✅ Saved Premium Long-Form Blog: ${fileName}`);

        } catch (error) {
            console.error("❌ Error with Gemini API:", error);
        }
    }

    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2));
    console.log("📊 Updated products.json queue successfully.");
}

generateArticles();
