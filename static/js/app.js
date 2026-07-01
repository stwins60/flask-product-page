const mobileMenuButton = document.getElementById("mobileMenuButton");
const navLinks = document.getElementById("navLinks");
const billingToggle = document.getElementById("billingToggle");
const billingLabels = document.querySelectorAll(".billing-label");
const prices = document.querySelectorAll("[data-monthly]");
const waitlistForm = document.getElementById("waitlistForm");
const formMessage = document.getElementById("formMessage");

mobileMenuButton.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
  });
});

billingToggle.addEventListener("click", () => {
  const yearlyEnabled = billingToggle.classList.toggle("yearly");

  billingLabels.forEach((label) => {
    label.classList.remove("active");
  });

  document
    .querySelector(`[data-plan="${yearlyEnabled ? "yearly" : "monthly"}"]`)
    .classList.add("active");

  prices.forEach((price) => {
    price.textContent = yearlyEnabled
      ? price.dataset.yearly
      : price.dataset.monthly;
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  {
    threshold: 0.12
  }
);

document.querySelectorAll(".reveal").forEach((element) => {
  observer.observe(element);
});

waitlistForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value.trim();
  const button = waitlistForm.querySelector("button");

  button.textContent = "Joining...";
  button.disabled = true;
  formMessage.textContent = "";

  try {
    const response = await fetch("/api/waitlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong.");
    }

    formMessage.textContent = data.message;
    formMessage.style.color = "#d9ffe9";
    waitlistForm.reset();
  } catch (error) {
    formMessage.textContent = error.message;
    formMessage.style.color = "#ffd4d4";
  } finally {
    button.textContent = "Join the waitlist";
    button.disabled = false;
  }
});