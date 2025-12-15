"use strict";

// -------------------------
// 1. Function chạy sau khi load
// -------------------------
function initPage() {
  console.log("Trang đã load xong!");
}

// -------------------------
// 2. Function xử lý khi submit form
// -------------------------
async function handleFormSubmit(e) {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  console.log("🚀 ~ handleFormSubmit ~ data:", data);

  const {
    name: name,
    confirm: confirm,
    phone: phone,
    guest_number: guest_number,
  } = data;
  console.log("🚀 ~ handleFormSubmit 2~ data:", data);

  // Thông báo khi bắt đầu gửi
  Swal.fire({
    title: "Đang gửi ...",
    text: "Vui lòng chờ trong giây lát.",
    icon: "info",
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });

  const url =
    "https://script.google.com/macros/s/AKfycbzc8RUVKFGJFsZ1y8VhnZI2YMnc1yJFHSII0rNPUNef7eR3xnEJQcMotw21yDGbazM/exec?sheet=confirm";

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        name,
        confirm,
        phone,
        guest_number,
      }),
    });

    const result = await res.json().catch(() => ({}));
    console.log("Server response:", result);

    form.reset();

    // Thông báo thành công
    Swal.fire({
      title: "Thành công!",
      text: "Cảm ơn bạn đã gửi phản hồi, thông tin đã được gửi đến dâu rể rồi nha.",
      icon: "success",
      confirmButtonText: "OK",
    });
  } catch (error) {
    console.error("Error:", error);

    // Thông báo lỗi
    Swal.fire({
      title: "Lỗi!",
      text: "OPPS! Đã xảy ra lỗi: " + error.message,
      icon: "error",
      confirmButtonText: "Thử lại",
    });
  }
}

gsap.registerPlugin(ScrollTrigger);

function gsapFlipIn(selector) {
    gsap.utils.toArray(selector).forEach((el) => {
        gsap.to(el, {
        rotateY: 0,
        scale: 1,
        filter: "brightness(1)",
        opacity: 1,
        duration: 1.4,
        ease: "back.out(1.5)",
        scrollTrigger: {
            trigger: el,
            start: "top 80%",
            toggleActions: "play none none reverse",
        },
        });
    });
}

// -------------------------
// 3. Gắn sự kiện khi DOM ready
// -------------------------
document.addEventListener("DOMContentLoaded", () => {
  initPage();

  gsapFlipIn(".animate-flip");

  const form = document.forms["rsvp-form"];
  if (form) {
    form.addEventListener("submit", handleFormSubmit);
  }
});
