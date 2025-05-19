document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footers
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) currentYearSpan.textContent = new Date().getFullYear();
    const currentYearSpanArticle = document.getElementById('currentYearArticle');
    if (currentYearSpanArticle) currentYearSpanArticle.textContent = new Date().getFullYear();

    // --- NEWS DATA (Expanded fullContent) ---
    function generateLongArticleContent(title, category, date, reportNumber = "") {
        return `
            <p><strong>Introduction to ${title} (${reportNumber ? `Report #${reportNumber}` : date}):</strong> This comprehensive report delves into the multifaceted aspects of ${title}, a topic of significant global interest within the ${category.toLowerCase()} sector. Published on ${date}, this analysis aims to provide an in-depth understanding of the current landscape, recent developments, and future implications.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <h3>Historical Context and Background</h3><p>To fully appreciate the current situation regarding ${title}, it is essential to understand its historical context...</p>
            <h3>Key Developments and Recent Events (${date})</h3><p>Several key developments have marked the period leading up to this report...</p><ul><li><strong>Major Event A:</strong> ...</li></ul>
            <h3>In-depth Analysis and Expert Opinions</h3><p>Our analysis incorporates data from various reputable sources...</p><blockquote>"...The confluence of factors..."<cite>– Dr. Placeholder Expert</cite></blockquote>
            <h3>Challenges and Obstacles</h3><p>Despite optimistic projections in some quarters, significant challenges remain...</p><ol><li><strong>Funding...</strong></li></ol>
            <h3>Future Outlook and Projections (Beyond ${new Date(date).getFullYear()})</h3><p>Looking ahead, the trajectory of ${title} will likely be shaped by several emerging trends...</p>
            <p><em>Disclaimer: The information presented in this report is for informational purposes only...</em></p>
        `;
    }

    const allNewsData = [
        {
            id: 1, title: "Global Leaders Convene for G20 Summit on Economic Stability - Feb 15, 2024", category: "International Politics", date: "February 15, 2024", imageSeed: "g20summit2024",
            snippet: "The G20 summit concluded with pledges for coordinated fiscal policies...", fullContent: generateLongArticleContent("Global Leaders Convene for G20 Summit", "International Politics", "Feb 15, 2024")
        },
        {
            id: 2, title: "Breakthrough in Quantum Computing Achieved by Tech Consortium - Mar 28, 2024", category: "Technology", date: "March 28, 2024", imageSeed: "quantum2024",
            snippet: "A joint research initiative announced a significant advancement in qubit stability...", fullContent: generateLongArticleContent("Breakthrough in Quantum Computing", "Technology", "Mar 28, 2024")
        },
        {
            id: 3, title: "Central Banks Signal Shift in Monetary Policy Amid Easing Inflation - May 10, 2024", category: "Business & Economy", date: "May 10, 2024", imageSeed: "economy2024",
            snippet: "Several major central banks indicated a potential pivot as inflation figures show signs of cooling.", fullContent: generateLongArticleContent("Central Banks Shift Monetary Policy", "Business & Economy", "May 10, 2024")
        },
        {
            id: 4, title: "AI-Powered Diagnostic Tool Receives FDA Approval for Clinical Use - June 05, 2024", category: "Health & Science", date: "June 05, 2024", imageSeed: "aihealth2024",
            snippet: "FDA granted approval for an AI-driven diagnostic tool for early-stage cancers...", fullContent: generateLongArticleContent("AI-Powered Diagnostic Tool Approved", "Health & Science", "June 05, 2024")
        },
        {
            id: 5, title: "International Accord Reached on Plastic Pollution Reduction Targets - July 18, 2024", category: "Environment", date: "July 18, 2024", imageSeed: "plasticpollution2024",
            snippet: "Over 150 countries signed a historic treaty to drastically reduce plastic waste by 2040...", fullContent: generateLongArticleContent("Accord on Plastic Pollution Reduction", "Environment", "July 18, 2024")
        },
    ];

    const initialNewsCount = allNewsData.length;
    const newsToGenerate = 500 - initialNewsCount;
    const baseTitlesForLoop = [
        "Analysis: The Shifting {Category} Landscape in {Year}", "Report: {Category} Innovation Index Sees Growth in {Year}",
        "Policy Update: New Regulations Impacting {Category} Sector - {Month} {Year}", "Emerging Trends in {Category} for {Year} and Beyond",
        "Conference Debrief: Key Takeaways from the Global {Category} Summit ({Month} {Year})", "Deep Dive: {Category} Challenges and Opportunities in {Year}",
        "Market Watch: {Category} Performance and Outlook for {Year}", "Technological Advancements Reshaping {Category} - {Month} {Year}",
        "Special Feature: The Human Impact of {Category} Developments", "Expert Panel: Future Projections for the {Category} Industry ({Year}-{YearEnd})"
    ];
    const categoriesForLoop = ["Global Affairs", "Digital Transformation", "Technology", "Business & Economy", "Economic Forecasts", "Scientific Discovery", "Health & Science", "Environment", "Sustainability Initiatives", "Cultural Exchange", "Space Exploration", "Urban Development", "Biotechnology", "Cybersecurity", "International Politics"];

    for (let i = 0; i < newsToGenerate; i++) {
        const newsId = initialNewsCount + i + 1;
        const category = categoriesForLoop[Math.floor(Math.random() * categoriesForLoop.length)];
        const start = new Date(2024, 0, 1); const end = new Date(2025, 11, 31);
        const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
        const year = randomDate.getFullYear(); const yearEnd = year + 1;
        const month = randomDate.toLocaleDateString('en-US', { month: 'long' });
        const formattedDate = randomDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
        const titleTemplate = baseTitlesForLoop[Math.floor(Math.random() * baseTitlesForLoop.length)];
        const title = titleTemplate.replace(/{Category}/g, category).replace(/{Year}/g, year).replace(/{Month}/g, month).replace(/{YearEnd}/g, yearEnd);
        allNewsData.push({
            id: newsId, title: `${title} - Update #${newsId}`, category: category, date: formattedDate, imageSeed: `genericnews${newsId}`,
            snippet: `A comprehensive overview of recent developments in ${category.toLowerCase()}. This update (ref #${newsId}) covers key events from ${formattedDate}...`,
            fullContent: generateLongArticleContent(title, category, formattedDate, newsId)
        });
    }

    // --- NEWS DISPLAY, SEARCH & CATEGORY FILTERING ---
    const newsGridContainer = document.getElementById('news-grid-container');
    const loadMoreBtn = document.getElementById('load-more-btn');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const noResultsMessage = document.getElementById('no-results-message');
    const newsSectionTitleElement = document.getElementById('news-section-title');
    const mainNavigation = document.getElementById('main-navigation');

    const itemsPerPage = 9;
    let currentPage = 1;
    let currentFilterCategory = "all";
    let currentSearchTerm = "";

    function updateCurrentNewsData() {
        let filteredData = [...allNewsData];
        if (currentFilterCategory !== "all") {
            filteredData = filteredData.filter(news => news.category.toLowerCase().includes(currentFilterCategory.toLowerCase()));
        }
        if (currentSearchTerm) {
            const searchTermLower = currentSearchTerm.toLowerCase();
            filteredData = filteredData.filter(news =>
                news.title.toLowerCase().includes(searchTermLower) ||
                news.snippet.toLowerCase().includes(searchTermLower) ||
                news.category.toLowerCase().includes(searchTermLower) ||
                news.fullContent.toLowerCase().includes(searchTermLower)
            );
        }
        return filteredData;
    }

    function displayNews(page) {
        if (!newsGridContainer) return;
        const dataToDisplay = updateCurrentNewsData();
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const newsToShow = dataToDisplay.slice(startIndex, endIndex);

        if (page === 1) newsGridContainer.innerHTML = '';

        if (newsToShow.length === 0 && page === 1) {
            if(noResultsMessage) noResultsMessage.style.display = 'block';
            if(noResultsMessage) noResultsMessage.textContent = (currentSearchTerm || currentFilterCategory !== "all") ? "No news articles found matching your criteria." : "No news articles available.";
            if(newsGridContainer) newsGridContainer.innerHTML = '';
        } else {
            if(noResultsMessage) noResultsMessage.style.display = 'none';
        }

        newsToShow.forEach(news => {
            const newsItemDiv = document.createElement('article');
            newsItemDiv.classList.add('news-item');
            newsItemDiv.innerHTML = `
                <a href="article-template.html?id=${news.id}" class="news-item-link-wrapper">
                    <img src="https://picsum.photos/seed/${escapeHTML(news.imageSeed)}/600/400" alt="${escapeHTML(news.title)}" class="news-image">
                    <div class="news-item-content">
                        <span class="article-category">${escapeHTML(news.category)}</span>
                        <h3>${escapeHTML(news.title)}</h3>
                        <p class="article-date">${escapeHTML(news.date)}</p>
                        <p class="news-snippet">${escapeHTML(news.snippet)}</p>
                        <span class="btn-read-more-lookalike">Read More <i class="fas fa-arrow-right"></i></span>
                    </div>
                </a>`;
            newsGridContainer.appendChild(newsItemDiv);
        });

        if (loadMoreBtn) {
            loadMoreBtn.style.display = (endIndex >= dataToDisplay.length) ? 'none' : 'inline-block';
        }
    }

    function updateNewsSectionTitle() {
        if (!newsSectionTitleElement) return;
        let title = "Latest News";
        if (currentFilterCategory !== "all" && currentFilterCategory) {
            title = `${currentFilterCategory.charAt(0).toUpperCase() + currentFilterCategory.slice(1)} News`;
        }
        if (currentSearchTerm) {
            title = `Search Results for "${escapeHTML(currentSearchTerm)}"`;
            if (currentFilterCategory !== "all" && currentFilterCategory) {
                title += ` in ${currentFilterCategory.charAt(0).toUpperCase() + currentFilterCategory.slice(1)}`;
            }
        }
        newsSectionTitleElement.textContent = title;
    }

    function handleSearch() {
        currentSearchTerm = searchInput.value.toLowerCase().trim();
        currentPage = 1;
        updateNewsSectionTitle();
        displayNews(currentPage);
    }
    
    function handleCategoryFilter(event) {
        event.preventDefault();
        const clickedLink = event.target.closest('a[data-category]');
        if (!clickedLink) return;
        const category = clickedLink.dataset.category;
        currentFilterCategory = category;
        currentPage = 1;
        if(mainNavigation) {
            mainNavigation.querySelectorAll('a[data-category]').forEach(link => link.classList.remove('active'));
            clickedLink.classList.add('active');
        }
        updateNewsSectionTitle();
        displayNews(currentPage);
    }

    if (searchButton) searchButton.addEventListener('click', handleSearch);
    if (searchInput) searchInput.addEventListener('keypress', e => e.key === 'Enter' && handleSearch());
    if (mainNavigation) mainNavigation.addEventListener('click', handleCategoryFilter);
    if (loadMoreBtn) loadMoreBtn.addEventListener('click', () => { currentPage++; displayNews(currentPage); });
    
    window.performSearchFromURL = handleSearch;

    if (newsGridContainer) {
        updateNewsSectionTitle();
        displayNews(currentPage);
    }

    const articleContentContainer = document.getElementById('full-article-content');
    const articlePlaceholder = document.querySelector('.article-placeholder-loading');
    if (articleContentContainer && articlePlaceholder) {
        const urlParams = new URLSearchParams(window.location.search);
        const articleIdStr = urlParams.get('id');
        if (articleIdStr) {
            const articleId = parseInt(articleIdStr);
            const article = allNewsData.find(item => item.id === articleId);
            if (article) {
                articlePlaceholder.style.display = 'none';
                document.getElementById('article-title').textContent = `${article.title} - World in News`;
                const mainTitleEl = document.createElement('h2'); mainTitleEl.id = 'article-main-title'; mainTitleEl.textContent = article.title;
                const metaDiv = document.createElement('div'); metaDiv.classList.add('article-meta');
                metaDiv.innerHTML = `<span class="article-category-tag">${escapeHTML(article.category)}</span><span>Published: ${escapeHTML(article.date)}</span> by <span>Admin</span>`;
                const imgEl = document.createElement('img'); imgEl.src = `https://picsum.photos/seed/${escapeHTML(article.imageSeed)}_large/800/450`; imgEl.alt = escapeHTML(article.title); imgEl.classList.add('full-article-image');
                const bodyContentDiv = document.createElement('div'); bodyContentDiv.id = 'article-body-content'; bodyContentDiv.innerHTML = article.fullContent;
                articleContentContainer.innerHTML = '';
                articleContentContainer.appendChild(mainTitleEl); articleContentContainer.appendChild(metaDiv); articleContentContainer.appendChild(imgEl); articleContentContainer.appendChild(bodyContentDiv);
            } else { articlePlaceholder.innerHTML = "<h2>Article not found.</h2><p>The requested article could not be loaded.</p>"; }
        } else { articlePlaceholder.innerHTML = "<h2>Invalid Article ID.</h2><p>No article ID was provided.</p>"; }
    }

    const commentForm = document.getElementById('comment-form');
    if (commentForm) {
        commentForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const nameInput = document.getElementById('comment-name'); const commentTextInput = document.getElementById('comment-text');
            const commentList = document.getElementById('comment-list');
            const name = nameInput.value.trim(); const commentText = commentTextInput.value.trim();
            if (name && commentText && commentList) {
                const newComment = document.createElement('div'); newComment.classList.add('comment');
                const commentDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });
                newComment.innerHTML = `<p class="comment-author"><strong>${escapeHTML(name)}</strong> <span class="comment-date">- ${commentDate}</span></p><p>${escapeHTML(commentText)}</p>`;
                if (commentList.firstChild) commentList.insertBefore(newComment, commentList.firstChild); else commentList.appendChild(newComment);
                commentForm.reset();
                const successMsg = document.createElement('p'); successMsg.textContent = "Comment posted successfully (locally)!";
                successMsg.style.color = "green"; successMsg.style.fontSize = "0.9em"; successMsg.style.marginTop = "10px";
                commentForm.appendChild(successMsg); setTimeout(() => successMsg.remove(), 3000);
            } else { alert("Please fill in both name and comment fields."); }
        });
    }
});

function escapeHTML(str) {
    if (str === null || str === undefined) return '';
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(String(str)));
    return div.innerHTML;
}

const searchInputArticlePage = document.getElementById('search-input-article');
const searchButtonArticlePage = document.getElementById('search-button-article');
if (searchInputArticlePage && searchButtonArticlePage) {
    function performArticlePageSearch() {
        const searchTerm = searchInputArticlePage.value.trim();
        if (searchTerm) window.location.href = `index.html?search=${encodeURIComponent(searchTerm)}`;
    }
    searchButtonArticlePage.addEventListener('click', performArticlePageSearch);
    searchInputArticlePage.addEventListener('keypress', e => e.key === 'Enter' && performArticlePageSearch());
}

window.addEventListener('load', () => {
    const currentPath = window.location.pathname;
    const searchInputOnPage = document.getElementById('search-input'); 
    if (currentPath.endsWith('index.html') || currentPath === '/' || currentPath.endsWith('/')) {
        const urlParams = new URLSearchParams(window.location.search);
        const searchQuery = urlParams.get('search');
        if (searchQuery && searchInputOnPage) {
            searchInputOnPage.value = searchQuery;
            if (typeof window.performSearchFromURL === 'function') window.performSearchFromURL();
            else { const searchButton = document.getElementById('search-button'); if(searchButton) searchButton.click(); }
        }
    }
});