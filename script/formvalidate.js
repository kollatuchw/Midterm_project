// register.js — ตรวจสอบฟอร์มสมัครงาน (logic เดียวกับตัวอย่าง manipulate.js)

const form = document.getElementById("registerForm");
const successBox = document.getElementById("successBox");
const $ = (id) => document.getElementById(id);

// ฟังก์ชันกลาง: ใส่/ลบคลาส valid-invalid และแสดง/ซ่อนข้อความ error
function validateForm(inputEl, errorEl, isValid, message) {
    if (!inputEl) return; // ป้องกันกรณี inputEl ไม่มีอยู่จริง

    if (isValid) {
        inputEl.classList.remove("invalid");
        inputEl.classList.add("valid");
        if (errorEl) errorEl.style.display = "none";
    } else {
        inputEl.classList.remove("valid");
        inputEl.classList.add("invalid");
        if (errorEl) {
            if (message) errorEl.textContent = message;
            errorEl.style.display = "block";
        }
    }
}

const phoneClean = (v) => v.replace(/[\s-]/g, "");

// แต่ละช่อง: el = ช่องที่ใส่ขอบสี, get = วิธีอ่านค่า, check = คืน "" ถ้าถูก / ข้อความ error ถ้าผิด
const fields = {
    title: {
        el: $("title"), events: ["change", "blur"],
        get: () => $("title").value,
        check: (v) => (v ? "" : "กรุณาเลือกคำนำหน้า"),
    },
    fullName: {
        el: $("fullName"), events: ["input", "blur"],
        get: () => $("fullName").value.trim(),
        // ต้องมีชื่อและนามสกุล คั่นด้วยเว้นวรรค เป็นตัวอักษรไทย/อังกฤษเท่านั้น
        check: (v) => (/^[A-Za-zก-๙.]+(\s+[A-Za-zก-๙.]+)+$/.test(v)
            ? "" : "กรุณากรอกชื่อและนามสกุล (คั่นด้วยเว้นวรรค) เป็นตัวอักษรเท่านั้น"),
    },
    phone: {
        el: $("phone"), events: ["input", "blur"],
        get: () => $("phone").value,
        // เบอร์มือถือไทย 10 หลัก ขึ้นต้น 06 / 08 / 09 (ใส่ขีดหรือเว้นวรรคได้)
        check: (v) => (/^0[689]\d{8}$/.test(phoneClean(v))
            ? "" : "กรุณากรอกเบอร์มือถือ 10 หลัก ขึ้นต้นด้วย 06, 08 หรือ 09"),
    },
    email: {
        el: $("email"), events: ["input", "blur"],
        get: () => $("email").value.trim(),
        check: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? "" : "รูปแบบอีเมลไม่ถูกต้อง เช่น example@email.com"),
    },
    address: {
        el: $("address"), events: ["input", "blur"],
        get: () => $("address").value.trim(),
        check: (v) => (v.length >= 10 ? "" : "กรุณากรอกที่อยู่ให้ครบถ้วน (อย่างน้อย 10 ตัวอักษร)"),
    },
    education: {
        el: $("education"), events: ["change", "blur"],
        get: () => $("education").value,
        check: (v) => (v ? "" : "กรุณาเลือกระดับการศึกษา"),
    },
    aiTier: {
        el: $("aiTierGroup"), events: ["change"],
        get: () => form.elements["aiTier"].value,
        check: (v) => (v ? "" : "กรุณาเลือกระดับสมรรถนะ AI ของคุณ"),
    },
    position: {
        el: $("position"), events: ["change", "blur"],
        get: () => $("position").value,
        check: (v) => (v ? "" : "กรุณาเลือกตำแหน่งงานที่ต้องการสมัคร"),
    },
    consent: {
        el: $("consentGroup"), events: ["change"],
        get: () => ($("consent").checked ? "yes" : ""),
        check: (v) => (v ? "" : "กรุณากดยินยอมการประมวลผลข้อมูลส่วนบุคคล (PDPA) ก่อนส่งใบสมัคร"),
    },
};

// ตรวจช่องเดียว (ชื่อช่อง + "Error" = id ของข้อความ error)
function validateField(key) {
    const f = fields[key];
    const message = f.check(f.get());
    validateForm(f.el, $(key + "Error"), message === "", message);
    return message === "";
}

// ตรวจแบบ real-time ตอนพิมพ์ / เปลี่ยนค่า / ออกจากช่อง
Object.keys(fields).forEach((key) => {
    fields[key].events.forEach((evt) => fields[key].el.addEventListener(evt, () => validateField(key)));
});

// กดส่งฟอร์ม: ตรวจทุกช่อง ถ้ามีช่องผิดให้เลื่อนไปที่ช่องแรกที่ผิด
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const keys = Object.keys(fields);
    const results = keys.map(validateField);
    if (results.includes(false)) {
        const bad = fields[keys[results.indexOf(false)]].el;
        (bad.matches("input, select, textarea") ? bad : bad.querySelector("input")).focus();
        return;
    }

    // ผ่านทุกช่อง: เก็บข้อมูล (ส่งต่อไป server ได้ที่นี่ เช่น fetch("/api/register", ...))
    const data = Object.fromEntries(new FormData(form));
    console.log("ข้อมูลที่ลงทะเบียน:", data);

    successBox.textContent = `ลงทะเบียนสำเร็จ! ขอบคุณคุณ ${data.fullName} · ตำแหน่ง: ${data.position} · ระดับ AI: ${data.aiTier}`;
    successBox.style.display = "block";
    form.reset();
    successBox.scrollIntoView({ behavior: "smooth", block: "center" });
});

// กดล้างข้อมูล: เอาสถานะขอบสีและข้อความ error ออกทั้งหมด
form.addEventListener("reset", () => {
    Object.keys(fields).forEach((key) => {
        fields[key].el.classList.remove("valid", "invalid");
        $(key + "Error").style.display = "none";
    });
});

// เริ่มกรอกใหม่ให้ซ่อนกล่องแจ้งผลสำเร็จ
form.addEventListener("input", () => { successBox.style.display = "none"; });
