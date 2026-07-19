// ==========================
// Nexvora JavaScript
// ==========================


// Current year in footer
const year = document.getElementById("year");
if (year) {
  year.textContent = new Date().getFullYear();
}

// Highlight active navigation link
const currentPage = location.pathname.split("/").pop() || "index.html";

document.querySelectorAll("nav a").forEach(link => {
  const href = link.getAttribute("href");
  if (href === currentPage) {
    link.classList.add("active");
  } else {
    link.classList.remove("active");
  }
});

// Smooth button animation
document.querySelectorAll(".btn").forEach(btn => {
  btn.addEventListener("mouseenter", () => {
    btn.style.transform = "translateY(-3px)";
  });

  btn.addEventListener("mouseleave", () => {
    btn.style.transform = "translateY(0)";
  });
});

console.log("Nexvora Loaded Successfully");

// ==========================
// Blog Render + Search
// ==========================

const blogPosts = document.getElementById("blog-posts");
const searchInput = document.getElementById("article-search");

function renderArticles(list) {

  if (!blogPosts) return;
  if (list.length === 0) {
  blogPosts.innerHTML = `
    <div class="card" style="text-align:center;">
      <h3>No articles found</h3>
      <p>Try searching with a different keyword or category.</p>
    </div>
  `;
  return;
}
  blogPosts.innerHTML = list.map(article => `
    <div class="card">

  <img
    src="${article.image}"
    alt="${article.title}"
    loading="lazy"
    class="blog-card-image">

  <h3>${article.title}</h3>

  <p>${article.description}</p>

  <p class="article-info">
    <span class="category-badge">${article.category}</span>
<span class="article-readtime">${article.readTime}</span>
</p>

<p class="article-meta-card">
    By ${article.author} • ${article.date}
</p>
  <a href="${article.url}" class="btn">
    Read Article →
  </a>

</div>
  `).join("");

}

if (blogPosts && typeof articles !== "undefined") {

  // Show all articles first
  renderArticles(articles);

  // Live Search
  if (searchInput) {

    searchInput.addEventListener("input", () => {

      const keyword = searchInput.value.toLowerCase().trim();

      const filtered = articles.filter(article =>

        article.title.toLowerCase().includes(keyword) ||
        article.category.toLowerCase().includes(keyword) ||
        article.description.toLowerCase().includes(keyword)

      );

      renderArticles(filtered);

    });

  }

}
// ==========================
// Home Latest Articles
// ==========================

const homeBlogPosts = document.getElementById("home-blog-posts");

if (homeBlogPosts && typeof articles !== "undefined") {

  const latestArticles = articles.slice(-3).reverse();

  homeBlogPosts.innerHTML = latestArticles.map(article => `
    <div class="card">

      <img
        src="${article.image}"
        alt="${article.title}"
        loading="lazy"
        class="blog-card-image">

      <h3>${article.title}</h3>

      <p>${article.description}</p>

      <p class="article-info">
        <span class="category-badge">${article.category}</span>
        <span class="article-readtime">${article.readTime}</span>
      </p>

      <p class="article-meta-card">
        By ${article.author} • ${article.date}
      </p>

      <a href="${article.url}" class="btn">
        Read Article →
      </a>

    </div>
  `).join("");

}
// ==========================
// Category Filter
// ==========================

document.querySelectorAll("[data-category]").forEach(card => {

  card.style.cursor = "pointer";

  card.addEventListener("click", () => {

    const category = card.dataset.category;

    const filtered = articles.filter(article =>
      article.category === category
    );

    renderArticles(filtered);

    // Search box එක clear කරන්න
    if (searchInput) {
      searchInput.value = "";
    }

    // Latest Articles section එකට scroll කරන්න
    blogPosts.scrollIntoView({
      behavior: "smooth"
    });

  });

});
const toggle = document.getElementById("theme-toggle");

if (toggle) {

    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark");
        toggle.textContent = "☀️";
    }

    toggle.addEventListener("click", () => {

        document.body.classList.toggle("dark");

        if (document.body.classList.contains("dark")) {
            localStorage.setItem("theme", "dark");
            toggle.textContent = "☀️";
        } else {
            localStorage.setItem("theme", "light");
            toggle.textContent = "🌙";
        }

    });

}
// ==========================
// Show All Articles
// ==========================

const showAllBtn = document.getElementById("show-all-articles");

if (showAllBtn) {
  showAllBtn.addEventListener("click", () => {

    renderArticles(articles);

    if (searchInput) {
      searchInput.value = "";
    }

    blogPosts.scrollIntoView({
      behavior: "smooth"
    });

  });
}
// ==========================
// Reading Progress Bar
// ==========================

const progressBar = document.getElementById("reading-progress");

if (progressBar) {

  window.addEventListener("scroll", () => {

    const scrollTop = window.scrollY;

    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;

    const progress =
      docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    progressBar.style.width = progress + "%";

  });

}
// ==========================
// Copy Article Link
// ==========================

const copyArticleLink = document.getElementById("copy-article-link");

if (copyArticleLink) {

  copyArticleLink.addEventListener("click", async () => {

    try {

      await navigator.clipboard.writeText(window.location.href);

      copyArticleLink.textContent = "✓ Link Copied";

      setTimeout(() => {
        copyArticleLink.textContent = "Copy Link";
      }, 2000);

    } catch (error) {

      alert("Unable to copy the link.");

    }

  });

}
/* =========================
SCROLL TO TOP BUTTON
========================= */

document.addEventListener("DOMContentLoaded", function () {
  const scrollTopButton =
    document.getElementById("scroll-top");

  if (!scrollTopButton) return;

  function toggleScrollTopButton() {
    if (window.scrollY > 300) {
      scrollTopButton.classList.add("show");
    } else {
      scrollTopButton.classList.remove("show");
    }
  }

  window.addEventListener(
    "scroll",
    toggleScrollTopButton,
    { passive: true }
  );

  scrollTopButton.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

  toggleScrollTopButton();
});
