// ========================================
// Calculus 1 Online - Main JavaScript
// ========================================

// Progress Tracking System
class ProgressTracker {
    constructor() {
        this.storageKey = 'calculus1_progress';
        this.progress = this.loadProgress();
    }

    loadProgress() {
        const saved = localStorage.getItem(this.storageKey);
        return saved ? JSON.parse(saved) : {
            completedTopics: [],
            lastVisited: null,
            totalTopics: 24 // Total number of topics across all chapters
        };
    }

    saveProgress() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.progress));
        this.updateProgressBar();
    }

    markTopicComplete(topicId) {
        if (!this.progress.completedTopics.includes(topicId)) {
            this.progress.completedTopics.push(topicId);
            this.saveProgress();
        }
    }

    markTopicIncomplete(topicId) {
        const index = this.progress.completedTopics.indexOf(topicId);
        if (index > -1) {
            this.progress.completedTopics.splice(index, 1);
            this.saveProgress();
        }
    }

    isTopicComplete(topicId) {
        return this.progress.completedTopics.includes(topicId);
    }

    updateProgressBar() {
        const percentage = (this.progress.completedTopics.length / this.progress.totalTopics) * 100;
        const progressFill = document.getElementById('progressFill');
        const progressText = document.getElementById('progressText');

        if (progressFill) {
            progressFill.style.width = `${percentage}%`;
        }
        if (progressText) {
            progressText.textContent = `${Math.round(percentage)}% (${this.progress.completedTopics.length}/${this.progress.totalTopics})`;
        }

        // Update checkmarks in sidebar
        this.updateSidebarCheckmarks();
    }

    updateSidebarCheckmarks() {
        const links = document.querySelectorAll('.topic-list a');
        links.forEach(link => {
            const topicId = link.getAttribute('data-topic');
            if (topicId && this.isTopicComplete(topicId)) {
                link.classList.add('completed');
            } else {
                link.classList.remove('completed');
            }
        });
    }

    getProgress() {
        return {
            completed: this.progress.completedTopics.length,
            total: this.progress.totalTopics,
            percentage: Math.round((this.progress.completedTopics.length / this.progress.totalTopics) * 100)
        };
    }
}

// Search Functionality
class SearchEngine {
    constructor() {
        this.searchInput = document.getElementById('searchInput');
        this.searchResults = document.getElementById('searchResults');
        this.searchData = this.buildSearchIndex();
        this.init();
    }

    buildSearchIndex() {
        // In a real application, this would be loaded from a JSON file
        return [
            // Chapter 1
            { title: 'ฟังก์ชัน (Functions)', url: '/chapters/chapter1/functions.html', chapter: '1.1', keywords: 'functions โดเมน พิสัย domain range' },
            { title: 'ลิมิต (Limits)', url: '/chapters/chapter1/limits.html', chapter: '1.2', keywords: 'limits ลิมิต 0/0 infinity one-sided' },
            { title: 'ความต่อเนื่อง (Continuity)', url: '/chapters/chapter1/continuity.html', chapter: '1.3', keywords: 'continuity ความต่อเนื่อง intermediate value theorem' },

            // Chapter 2
            { title: 'ที่มาของอนุพันธ์', url: '/chapters/chapter2/derivative-intro.html', chapter: '2.1', keywords: 'derivative อนุพันธ์ rate of change อัตราการเปลี่ยนแปลง' },
            { title: 'กฎพื้นฐานของอนุพันธ์', url: '/chapters/chapter2/derivative-rules.html', chapter: '2.2', keywords: 'derivative rules product quotient chain กฎคูณ กฎหาร กฎลูกโซ่' },
            { title: 'อนุพันธ์ของฟังก์ชันมาตรฐาน', url: '/chapters/chapter2/standard-derivatives.html', chapter: '2.3', keywords: 'polynomial exponential logarithm trigonometric พหุนาม เลขชี้กำลัง ลอการิทึม ตรีโกณมิติ' },
            { title: 'อนุพันธ์ขั้นสูง', url: '/chapters/chapter2/advanced-derivatives.html', chapter: '2.4', keywords: 'higher-order implicit differentiation อนุพันธ์อันดับสูง ปริยาย' },
            { title: 'ทฤษฎีบทสำคัญ', url: '/chapters/chapter2/theorems.html', chapter: '2.5', keywords: 'mean value theorem lhospital ค่าเฉลี่ย ลอปิทาล' },

            // Chapter 3
            { title: 'เรขาคณิตและกราฟ', url: '/chapters/chapter3/geometry.html', chapter: '3.1', keywords: 'tangent normal concavity เส้นสัมผัส ความเว้าโค้ง inflection' },
            { title: 'ฟิสิกส์และการเคลื่อนที่', url: '/chapters/chapter3/physics.html', chapter: '3.2', keywords: 'velocity acceleration position ความเร็ว ความเร่ง ตำแหน่ง' },
            { title: 'ค่าสูงสุดและต่ำสุด', url: '/chapters/chapter3/extrema.html', chapter: '3.3', keywords: 'extrema maximum minimum optimization สูงสุด ต่ำสุด' },
            { title: 'การประมาณค่า', url: '/chapters/chapter3/approximation.html', chapter: '3.4', keywords: 'linear approximation differentials newton method ประมาณค่า' },

            // Chapter 4
            { title: 'ที่มาของปริพันธ์', url: '/chapters/chapter4/integral-intro.html', chapter: '4.1', keywords: 'integral ปริพันธ์ riemann sum พื้นที่' },
            { title: 'ปริพันธ์ไม่จำกัดเขต', url: '/chapters/chapter4/indefinite-integrals.html', chapter: '4.2', keywords: 'indefinite integral antiderivative ไม่จำกัดเขต' },
            { title: 'ปริพันธ์จำกัดเขต', url: '/chapters/chapter4/definite-integrals.html', chapter: '4.3', keywords: 'definite integral fundamental theorem จำกัดเขต มูลฐาน' },
            { title: 'ปริพันธ์ของฟังก์ชันมาตรฐาน', url: '/chapters/chapter4/standard-integrals.html', chapter: '4.4', keywords: 'standard integrals exponential trigonometric' },
            { title: 'การแทนค่าตัวแปร', url: '/chapters/chapter4/u-substitution.html', chapter: '4.5', keywords: 'u-substitution แทนค่า' },
            { title: 'การประยุกต์ปริพันธ์', url: '/chapters/chapter4/applications.html', chapter: '4.6', keywords: 'area between curves average value พื้นที่ ค่าเฉลี่ย' },

            // Chapter 5
            { title: 'Integration by Parts', url: '/chapters/chapter5/integration-by-parts.html', chapter: '5.1', keywords: 'integration by parts' },
            { title: 'การแยกเศษส่วนย่อย', url: '/chapters/chapter5/partial-fractions.html', chapter: '5.2', keywords: 'partial fractions เศษส่วนย่อย' },
            { title: 'ปริพันธ์ตรีโกณมิติ', url: '/chapters/chapter5/trig-integrals.html', chapter: '5.3', keywords: 'trigonometric integrals sin cos tan sec ตรีโกณมิติ' },
            { title: 'การแทนค่าตรีโกณมิติ', url: '/chapters/chapter5/trig-substitution.html', chapter: '5.4', keywords: 'trig substitution sqrt แทนค่าตรีโกณมิติ' },
            { title: 'การแทนค่าตัวแปรใหม่', url: '/chapters/chapter5/general-substitution.html', chapter: '5.5', keywords: 'general substitution แทนค่า' },
            { title: 'ปริพันธ์ไม่เหมาะสม', url: '/chapters/chapter5/improper-integrals.html', chapter: '5.6', keywords: 'improper integrals infinity ไม่เหมาะสม' }
        ];
    }

    init() {
        if (!this.searchInput) return;

        this.searchInput.addEventListener('input', (e) => {
            this.performSearch(e.target.value);
        });

        // Close search results when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.search-container')) {
                this.hideResults();
            }
        });
    }

    performSearch(query) {
        if (!query || query.length < 2) {
            this.hideResults();
            return;
        }

        const results = this.searchData.filter(item => {
            const searchText = `${item.title} ${item.keywords}`.toLowerCase();
            return searchText.includes(query.toLowerCase());
        });

        this.displayResults(results, query);
    }

    displayResults(results, query) {
        if (results.length === 0) {
            this.searchResults.innerHTML = '<div class="search-result-item">ไม่พบผลลัพธ์</div>';
            this.searchResults.classList.remove('hidden');
            return;
        }

        const html = results.slice(0, 10).map(result => `
            <div class="search-result-item" onclick="window.location.href='${result.url}'">
                <strong>${result.chapter}</strong> ${result.title}
            </div>
        `).join('');

        this.searchResults.innerHTML = html;
        this.searchResults.classList.remove('hidden');
    }

    hideResults() {
        if (this.searchResults) {
            this.searchResults.classList.add('hidden');
        }
    }
}

// Navigation and UI Controller
class NavigationController {
    constructor() {
        this.sidebar = document.getElementById('sidebar');
        this.menuToggle = document.getElementById('menuToggle');
        this.init();
    }

    init() {
        // Mobile menu toggle
        if (this.menuToggle) {
            this.menuToggle.addEventListener('click', () => {
                this.toggleSidebar();
            });
        }

        // Chapter accordion
        const chapterHeaders = document.querySelectorAll('.chapter-header');
        chapterHeaders.forEach(header => {
            header.addEventListener('click', () => {
                this.toggleChapter(header);
            });
        });

        // Initialize - show first chapter by default
        const firstChapter = document.querySelector('.chapter-header');
        if (firstChapter) {
            this.toggleChapter(firstChapter);
        }

        // Mark current page as active
        this.highlightCurrentPage();
    }

    toggleSidebar() {
        if (this.sidebar) {
            this.sidebar.classList.toggle('show');
        }
    }

    toggleChapter(header) {
        const chapterNum = header.getAttribute('data-chapter');
        const topicList = document.getElementById(`chapter${chapterNum}-topics`);

        if (topicList) {
            // Toggle active state
            header.classList.toggle('active');
            topicList.classList.toggle('show');
        }
    }

    highlightCurrentPage() {
        const currentPath = window.location.pathname;
        const links = document.querySelectorAll('.topic-list a');

        links.forEach(link => {
            if (link.getAttribute('href') === currentPath) {
                link.classList.add('active');

                // Expand parent chapter
                const topicList = link.closest('.topic-list');
                if (topicList) {
                    topicList.classList.add('show');
                    const chapterItem = topicList.closest('.chapter-item');
                    if (chapterItem) {
                        const chapterHeader = chapterItem.querySelector('.chapter-header');
                        if (chapterHeader) {
                            chapterHeader.classList.add('active');
                        }
                    }
                }
            }
        });
    }
}

// Solution Toggle for Examples and Exercises
class SolutionToggle {
    constructor() {
        this.init();
    }

    init() {
        const buttons = document.querySelectorAll('.btn-show-solution');
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                this.toggleSolution(button);
            });
        });
    }

    toggleSolution(button) {
        const parent = button.closest('.example, .exercise');
        if (!parent) return;

        const solution = parent.querySelector('.solution');
        if (!solution) return;

        if (solution.classList.contains('hidden')) {
            solution.classList.remove('hidden');
            button.textContent = 'ซ่อนเฉลย';
        } else {
            solution.classList.add('hidden');
            button.textContent = 'ดูเฉลย';
        }
    }
}

// Breadcrumb Generator
class BreadcrumbGenerator {
    constructor() {
        this.breadcrumb = document.getElementById('breadcrumb');
        this.generate();
    }

    generate() {
        if (!this.breadcrumb) return;

        const path = window.location.pathname;
        const parts = path.split('/').filter(p => p);

        if (parts.length === 0) return;

        let breadcrumbHTML = '<a href="/">หน้าแรก</a>';
        let currentPath = '';

        // Chapter mapping
        const chapterNames = {
            'chapter1': 'บทที่ 1: ฟังก์ชัน ลิมิต และความต่อเนื่อง',
            'chapter2': 'บทที่ 2: อนุพันธ์',
            'chapter3': 'บทที่ 3: การประยุกต์อนุพันธ์',
            'chapter4': 'บทที่ 4: ปริพันธ์และปริพันธ์จำกัดเขต',
            'chapter5': 'บทที่ 5: เทคนิคการหาปริพันธ์'
        };

        parts.forEach((part, index) => {
            currentPath += '/' + part;

            if (part.startsWith('chapter')) {
                breadcrumbHTML += `<a href="${currentPath}/">${chapterNames[part] || part}</a>`;
            } else if (index === parts.length - 1) {
                // Last part - don't make it a link
                const pageName = this.getPageName(part);
                breadcrumbHTML += `<span>${pageName}</span>`;
            }
        });

        this.breadcrumb.innerHTML = breadcrumbHTML;
    }

    getPageName(filename) {
        // Remove .html extension
        const name = filename.replace('.html', '');

        // Simple mapping - in production this would be more comprehensive
        const nameMap = {
            'functions': 'ฟังก์ชัน',
            'limits': 'ลิมิต',
            'continuity': 'ความต่อเนื่อง',
            'derivative-intro': 'ที่มาของอนุพันธ์',
            'derivative-rules': 'กฎพื้นฐานของอนุพันธ์'
            // Add more mappings as needed
        };

        return nameMap[name] || name;
    }
}

// Topic Completion Checkbox
class TopicCompletion {
    constructor(progressTracker) {
        this.progressTracker = progressTracker;
        this.init();
    }

    init() {
        // Add completion checkbox to content pages
        const contentWrapper = document.querySelector('.content-wrapper');
        if (!contentWrapper || window.location.pathname === '/') return;

        const topicId = this.getCurrentTopicId();
        if (!topicId) return;

        const isComplete = this.progressTracker.isTopicComplete(topicId);

        const checkboxHTML = `
            <div class="topic-completion" style="position: fixed; bottom: 20px; right: 20px; background: white; padding: 15px; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); z-index: 1000;">
                <label style="display: flex; align-items: center; gap: 10px; cursor: pointer;">
                    <input type="checkbox" id="topicCompleteCheckbox" ${isComplete ? 'checked' : ''} style="width: 20px; height: 20px; cursor: pointer;">
                    <span style="font-weight: 500;">เรียนจบหัวข้อนี้แล้ว</span>
                </label>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', checkboxHTML);

        const checkbox = document.getElementById('topicCompleteCheckbox');
        if (checkbox) {
            checkbox.addEventListener('change', (e) => {
                if (e.target.checked) {
                    this.progressTracker.markTopicComplete(topicId);
                } else {
                    this.progressTracker.markTopicIncomplete(topicId);
                }
            });
        }
    }

    getCurrentTopicId() {
        // Try to get from current page link in sidebar
        const activeLink = document.querySelector('.topic-list a.active');
        if (activeLink) {
            return activeLink.getAttribute('data-topic');
        }

        // Fallback: parse from URL
        const path = window.location.pathname;
        const match = path.match(/chapter(\d+)\/([\w-]+)/);
        if (match) {
            const chapterNum = match[1];
            // This would need a more sophisticated mapping in production
            return `${chapterNum}.1`; // Simplified
        }

        return null;
    }
}

// Initialize all components when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize core systems
    const progressTracker = new ProgressTracker();
    const searchEngine = new SearchEngine();
    const navigationController = new NavigationController();
    const solutionToggle = new SolutionToggle();
    const breadcrumbGenerator = new BreadcrumbGenerator();
    const topicCompletion = new TopicCompletion(progressTracker);

    // Update progress bar on load
    progressTracker.updateProgressBar();

    // Make progressTracker globally accessible for debugging
    window.progressTracker = progressTracker;

    console.log('Calculus 1 Online initialized successfully');
});

// PWA Service Worker Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('Service Worker registered successfully:', registration.scope);
            })
            .catch(error => {
                console.log('Service Worker registration failed:', error);
            });
    });
}
