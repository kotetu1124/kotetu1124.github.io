document.addEventListener("DOMContentLoaded", () => {
  const tableBody = document.getElementById("match-table-body");
  const messageEl = document.getElementById("match-message");
  const seasonSelect = document.getElementById("season-select");

  if (!tableBody || !messageEl || !seasonSelect) {
    return;
  }

  fetch("../data/matches.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("試合データの取得に失敗しました。");
      }
      return response.json();
    })
    .then((matches) => {
      if (!Array.isArray(matches) || matches.length === 0) {
        messageEl.textContent = "現在、登録されている試合情報はありません。";
        return;
      }

      // シーズン一覧を作成
      const seasons = Array.from(
        new Set(
          matches
            .map((m) => m.season)
            .filter((s) => typeof s === "string" && s.trim() !== "")
        )
      ).sort();

      seasons.forEach((season) => {
        const option = document.createElement("option");
        option.value = season;
        option.textContent = season + "シーズン";
        seasonSelect.appendChild(option);
      });

      // 日付順（新しい順）にソート
      matches.sort((a, b) => {
        if (a.date === b.date) return 0;
        return a.date > b.date ? -1 : 1;
      });

      const renderTable = () => {
        const selectedSeason = seasonSelect.value;
        tableBody.innerHTML = "";

        const filtered = matches.filter((match) => {
          if (selectedSeason === "all") return true;
          return match.season === selectedSeason;
        });

        if (filtered.length === 0) {
          messageEl.textContent = "選択されたシーズンの試合情報はありません。";
          return;
        }

        messageEl.textContent = "";

        filtered.forEach((match) => {
          const tr = document.createElement("tr");

          // 日付
          const dateTd = document.createElement("td");
          const dateText = match.date || "";
          dateTd.textContent = dateText.replace(/-/g, "/");
          tr.appendChild(dateTd);

          // キックオフ
          const timeTd = document.createElement("td");
          timeTd.textContent = match.kickoffTime || "";
          tr.appendChild(timeTd);

          // 対戦相手
          const opponentTd = document.createElement("td");
          opponentTd.textContent = match.opponent || "";
          tr.appendChild(opponentTd);

          // 会場（必ずリンク化：venueUrl がなければ Google マップ検索リンクを生成）
          const venueTd = document.createElement("td");
          const venueName = match.venueName || "";
          let venueUrl = match.venueUrl || "";
          if (!venueUrl && venueName) {
            const q = encodeURIComponent(venueName);
            venueUrl = "https://www.google.com/maps/search/?api=1&query=" + q;
          }
          if (venueUrl) {
            const a = document.createElement("a");
            a.href = venueUrl;
            a.target = "_blank";
            a.rel = "noopener noreferrer";
            a.textContent = venueName || venueUrl;
            venueTd.appendChild(a);
          } else {
            venueTd.textContent = venueName;
          }
          tr.appendChild(venueTd);

          // 結果（先頭に ○ / × / △ を表示）
          const resultTd = document.createElement("td");
          const result = match.result || {};
          const status = result.status || "scheduled";
          let resultText = "";

          if (status === "finished") {
            const us = result.scoreUs;
            const them = result.scoreThem;
            if (typeof us === "number" && typeof them === "number") {
              let mark = "△";
              if (us > them) {
                mark = "○";
                resultTd.classList.add("result-win");
              } else if (us < them) {
                mark = "×";
                resultTd.classList.add("result-lose");
              }
              resultText = mark + " " + us + " - " + them;
            } else {
              resultText = "終了（スコア未入力）";
            }
          } else if (status === "cancelled") {
            resultText = "中止";
            resultTd.classList.add("result-cancelled");
          } else {
            resultText = "試合前";
            resultTd.classList.add("result-upcoming");
          }

          resultTd.textContent = resultText;
          tr.appendChild(resultTd);

          // 備考
          const noteTd = document.createElement("td");
          noteTd.textContent = result.note || "";
          tr.appendChild(noteTd);

          tableBody.appendChild(tr);
        });
      };

      seasonSelect.addEventListener("change", renderTable);

      // 初期描画
      renderTable();
    })
    .catch((error) => {
      console.error(error);
      messageEl.textContent = "現在、試合情報を取得できません。時間をおいて再度アクセスしてください。";
    });
});

