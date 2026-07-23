document.addEventListener("DOMContentLoaded", () => {
  if (window.lucide) lucide.createIcons();

  const menuToggle = document.getElementById("menuToggle");
  const mobileNav = document.getElementById("mobileNav");
  menuToggle?.addEventListener("click", () => mobileNav.classList.toggle("open"));
  mobileNav?.querySelectorAll("a").forEach(a => a.addEventListener("click", () => mobileNav.classList.remove("open")));

  const searchToggle = document.getElementById("searchToggle");
  const searchClose = document.getElementById("searchClose");
  const globalSearch = document.getElementById("globalSearch");
  const globalSearchInput = document.getElementById("globalSearchInput");
  const cards = [...document.querySelectorAll(".knowledge-card")];

  function openSearch() {
    globalSearch.classList.add("open");
    setTimeout(() => globalSearchInput.focus(), 50);
  }
  function closeSearch() {
    globalSearch.classList.remove("open");
    cards.forEach(c => c.style.display = "");
  }
  searchToggle?.addEventListener("click", openSearch);
  searchClose?.addEventListener("click", closeSearch);

  globalSearchInput?.addEventListener("input", e => {
    const q = e.target.value.trim().toLowerCase();
    document.getElementById("knowledge")?.scrollIntoView({behavior:"smooth", block:"start"});
    cards.forEach(card => {
      const haystack = (card.dataset.search + " " + card.innerText).toLowerCase();
      card.style.display = !q || haystack.includes(q) ? "grid" : "none";
    });
  });

  const themeToggle = document.getElementById("themeToggle");
  themeToggle?.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    themeToggle.innerHTML = document.body.classList.contains("dark")
      ? '<i data-lucide="sun"></i>'
      : '<i data-lucide="moon"></i>';
    if (window.lucide) lucide.createIcons();
  });

  document.querySelectorAll(".topic-card").forEach(topic => {
    topic.addEventListener("click", () => {
      document.querySelectorAll(".topic-card").forEach(t => t.classList.remove("selected"));
      topic.classList.add("selected");
      globalSearchInput.value = topic.dataset.topic;
      cards.forEach(card => {
        const haystack = (card.dataset.search + " " + card.innerText).toLowerCase();
        card.style.display = haystack.includes(topic.dataset.topic.toLowerCase()) ? "grid" : "none";
      });
      document.getElementById("knowledge")?.scrollIntoView({behavior:"smooth"});
    });
  });

  document.querySelectorAll(".filter-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".filter-tab").forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      const filter = tab.dataset.filter;
      cards.forEach(card => {
        const matches = filter === "all" || card.dataset.type === filter;
        card.style.display = matches ? "grid" : "none";
      });
    });
  });

  document.querySelectorAll(".useful-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const counter = btn.querySelector(".useful-count");
      const selected = btn.classList.toggle("active");
      counter.textContent = String(Number(counter.textContent) + (selected ? 1 : -1));
      btn.querySelector("svg")?.setAttribute("fill", selected ? "currentColor" : "none");
    });
  });

  document.querySelectorAll(".save-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      btn.classList.toggle("active");
      btn.querySelector("svg")?.setAttribute("fill", btn.classList.contains("active") ? "currentColor" : "none");
    });
  });

  document.querySelectorAll(".join-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const joined = btn.classList.toggle("joined");
      btn.textContent = joined ? "✓ Joined" : "Join Community";
    });
  });

  const showMore = document.getElementById("showMoreArticles");
  showMore?.addEventListener("click", () => {
    document.querySelectorAll(".hidden-demo-card").forEach(card => {
      card.classList.remove("hidden-demo-card");
      card.style.display = "grid";
    });
    showMore.remove();
  });

  const assistantForm = document.getElementById("assistantForm");
  const assistantQuestion = document.getElementById("assistantQuestion");
  const assistantResponse = document.getElementById("assistantResponse");
  assistantForm?.addEventListener("submit", e => {
    e.preventDefault();
    const q = assistantQuestion.value.trim();
    if (!q) return;
    assistantResponse.style.display = "block";
    assistantResponse.textContent = `Demo mode: "${q}" will be answered from your professional knowledge base when the AI backend is connected.`;
  });

  document.querySelectorAll(".question-link").forEach(q => {
    q.addEventListener("click", () => {
      assistantQuestion.value = q.textContent.trim();
      assistantQuestion.focus();
    });
  });

  const modal = document.getElementById("publishModal");
  const publishButton = document.getElementById("publishButton");
  const modalClose = document.getElementById("modalClose");
  const openModal = () => {
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
  };
  const closeModal = () => {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
  };
  publishButton?.addEventListener("click", openModal);
  document.querySelector('a[href="#publish"]')?.addEventListener("click", e => {
    e.preventDefault();
    openModal();
  });
  modalClose?.addEventListener("click", closeModal);
  modal?.addEventListener("click", e => { if (e.target === modal) closeModal(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });

  document.getElementById("year").textContent = new Date().getFullYear();
});
