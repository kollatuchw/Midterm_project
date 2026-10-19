const courses = [
    {
        title: "AWS Certified Machine Learning – Specialty Preparation",
        shortDesc: "เตรียมความพร้อมสอบใบรับรอง AWS ML Specialty และสร้างระบบ Machine Learning บนระบบ Cloud",
        fullDesc: "เรียนรู้การออกแบบ พัฒนา และดูแลรักษาโมเดล Machine Learning บนระบบ AWS ตั้งแต่การเตรียมข้อมูล Data Engineering, EDA ไปจนถึงการจัดทำ MLOps ด้วย Amazon SageMaker",
        duration: "30 ชั่วโมง (4 วัน)",
        req: "มีความรู้พื้นฐาน Python และ Cloud Computing เบื้องต้น",
        price: "12,500 บาท",
        img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80",
        link: "register.html"
    },
    {
        title: "Microsoft Certified: Azure AI Engineer Associate (AI-102)",
        shortDesc: "พัฒนาโซลูชัน AI ระดับองค์กรด้วย Microsoft Azure Cognitive Services และ Azure OpenAI",
        fullDesc: "สร้าง รัน และจัดการโซลูชัน AI ด้วยการใช้งาน Azure AI Services, Azure Machine Learning และการประยุกต์ใช้ Generative AI / Copilot ในแอปพลิเคชันเชิงธุรกิจ",
        duration: "24 ชั่วโมง (3 วัน)",
        req: "มีความเข้าใจเบื้องต้นเกี่ยวกับ REST API และการเขียนโปรแกรม",
        price: "10,900 บาท",
        img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=80",
        link: "register.html"
    },
    {
        title: "Generative AI & LLM Engineering with RAG Architecture",
        shortDesc: "พัฒนาและประยุกต์ใช้ Large Language Models (LLMs), Prompt Engineering และระบบ RAG",
        fullDesc: "เจาะลึกการ Fine-tuning โมเดลภาษาขนาดใหญ่ (LLMs), การใช้งาน LangChain, LlamaIndex และการออกแบบระบบ Retrieval-Augmented Generation (RAG) สำหรับเชื่อมฐานข้อมูลองค์กรเข้ากับ AI",
        duration: "24 ชั่วโมง (3 วัน)",
        req: "เขียนโปรแกรมภาษา Python ได้ในระดับปานกลาง",
        price: "11,500 บาท",
        img: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&auto=format&fit=crop&q=80",
        link: "register.html"
    },
    {
        title: "TensorFlow Developer Certificate Program",
        shortDesc: "สร้างและฝึกฝนโมเดล Deep Learning ด้วย TensorFlow และ Keras สำหรับงาน Vision และ NLP",
        fullDesc: "เตรียมตัวสำหรับการสอบใบรับรอง TensorFlow Developer Certificate เรียนรู้การสร้าง Neural Networks, Convolutional Neural Networks (CNNs) และ Natural Language Processing (NLP)",
        duration: "30 ชั่วโมง (4 วัน)",
        req: "เข้าใจการเขียนโปรแกรม Python และคณิตศาสตร์พื้นฐานสำหรับ ML",
        price: "9,900 บาท",
        img: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80",
        link: "register.html"
    },
    {
        title: "AI Data Engineer & Vector Database Certification",
        shortDesc: "จัดการ Big Data สำหรับ AI และออกแบบ Data Pipeline ด้วย Vector Databases (Pinecone/Chroma)",
        fullDesc: "เรียนรู้การออกแบบ Data Pipeline สำหรับ AI/ML, การแปลงข้อมูลเป็น Embeddings และการบริหารจัดการ Vector Databases เพื่อสนับสนุนระบบ Search และความจำของ LLMs",
        duration: "24 ชั่วโมง (3 วัน)",
        req: "มีความรู้พื้นฐาน SQL และ Python",
        price: "10,500 บาท",
        img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&auto=format&fit=crop&q=80",
        link: "register.html"
    },
    {
        title: "Applied Computer Vision & Image Processing with PyTorch",
        shortDesc: "ประมวลผลภาพและวิดีโอด้วย AI สำหรับระบบตรวจจับวัตถุ จดจำใบหน้า และระบบอัตโนมัติ",
        fullDesc: "สร้างแอปพลิเคชัน Computer Vision ด้วย PyTorch และ OpenCV เรียนรู้โมเดล YOLO, Object Detection, Image Segmentation และเทคนิคการ Deploy โมเดลลงอุปกรณ์ Edge Devices",
        duration: "24 ชั่วโมง (3 วัน)",
        req: "มีความรู้พื้นฐานการเขียนโปรแกรม Python",
        price: "9,500 บาท",
        img: "https://images.unsplash.com/photo-1507146426996-ef05306b995a?w=600&auto=format&fit=crop&q=80",
        link: "register.html"
    }
];
const container = document.getElementById('course-container');

container.innerHTML = courses
    // [Step 2] วนลูปแปลง Array เป็นโครงสร้าง HTML การ์ดด้วย .map()
    .map((item, index) => `
        <div class="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 flex flex-col justify-between p-6">
            <div>
                <div class="h-40 -mx-6 -mt-6 mb-4 overflow-hidden">
                    <img src="${item.img}" alt="${item.title}" class="w-full h-full object-cover" />
                </div>
                <h3 class="text-lg font-bold text-gray-800 mb-2">${item.title}</h3>
                <p class="text-gray-600 text-sm mb-6 leading-relaxed line-clamp-3">${item.shortDesc}</p>
            </div>
            <div>
                <button onclick="openCourseModal(${index})" class="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
                    ดูรายละเอียด
                </button>
            </div>
        </div>
    `)
    // [Step 3] เชื่อมข้อความ HTML ทุกการ์ดเข้าด้วยกัน ปิดท้ายวงเล็บของ map
    .join('');

// 3. ฟังก์ชันเปิด Modal และแสดงข้อมูลตาม Index คอร์สที่ถูกคลิก
function openCourseModal(index) {
    const course = courses[index];
    document.getElementById('modal-title').innerText = course.title;
    document.getElementById('modal-desc').innerText = course.fullDesc;
    document.getElementById('modal-duration').innerText = course.duration;
    document.getElementById('modal-req').innerText = course.req;
    document.getElementById('modal-price').innerText = course.price;
    document.getElementById('modal-img').src = course.img;
    document.getElementById('modal-register-btn').href = course.link;

    document.getElementById('course-modal').showModal();
}