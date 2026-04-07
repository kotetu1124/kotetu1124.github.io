document.addEventListener("DOMContentLoaded", () => {
  const listEl = document.getElementById("shinnyusei-feed-list");
  const messageEl = document.getElementById("shinnyusei-feed-message");

  if (!listEl || !messageEl) {
    return;
  }

  const fallbackHtml =
    '<p class="shinnyusei-feed-fallback">お知らせ一覧を読み込めませんでした。最新情報は <a href="https://www.instagram.com/blasters_recruit/" rel="noopener noreferrer" target="_blank">Instagram（@blasters_recruit）</a> でもご確認ください。</p>';

  fetch("../data/shinnyusei-feed.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("feed fetch failed");
      }
      return response.json();
    })
    .then((items) => {
      if (!Array.isArray(items) || items.length === 0) {
        messageEl.innerHTML = fallbackHtml;
        return;
      }

      const sorted = [...items].sort((a, b) => {
        const da = typeof a.date === "string" ? a.date : "";
        const db = typeof b.date === "string" ? b.date : "";
        if (da === db) return 0;
        return da > db ? -1 : 1;
      });

      listEl.innerHTML = "";
      messageEl.textContent = "";

      sorted.forEach((item) => {
        const date = typeof item.date === "string" ? item.date : "";
        const url = typeof item.url === "string" ? item.url : "#";
        const typeLabel = typeof item.type === "string" ? item.type : "";
        const headline =
          typeof item.title === "string" && item.title.trim() !== ""
            ? item.title
            : typeof item.caption === "string"
              ? item.caption
              : "";
        const caption =
          typeof item.title === "string" &&
          item.title.trim() !== "" &&
          typeof item.caption === "string" &&
          item.caption.trim() !== "" &&
          item.caption !== item.title
            ? item.caption
            : "";

        const li = document.createElement("li");
        li.className = "shinnyusei-feed-item";

        const meta = document.createElement("div");
        meta.className = "shinnyusei-feed-meta";
        meta.textContent = [date.replace(/-/g, "/"), typeLabel].filter(Boolean).join(" · ");

        const link = document.createElement("a");
        link.className = "shinnyusei-feed-link";
        link.href = url;
        link.rel = "noopener noreferrer";
        link.target = "_blank";
        link.textContent = headline || "リンクを開く";

        li.appendChild(meta);
        li.appendChild(link);

        if (caption) {
          const p = document.createElement("p");
          p.className = "shinnyusei-feed-caption";
          p.textContent = caption;
          li.appendChild(p);
        }

        listEl.appendChild(li);
      });
    })
    .catch(() => {
      messageEl.innerHTML = fallbackHtml;
    });
});
