// ==================== 网站配置 ====================
const siteConfig = {
    name: '李释佛器',
    tagline: '匠心铸就 · 庄严殊胜',
    description: '专业供奉佛像、法器、香道用品',
    footer: '李释佛器 · 广结善缘',
    copyrightYear: 2026,
    contact: {
        phone: '13627947766',
        address: '江西省抚州市东乡区经济开发区'
    }
};

// ==================== 分类配置 ====================
const categories = [
    { id: 'foxiang', name: '佛像', imageCount: 15 },
    { id: 'tongzhong', name: '铜钟', imageCount: 4 },
    { id: 'xianglu', name: '香炉', imageCount: 4 },
    { id: 'baoding', name: '宝鼎', imageCount: 3 },
    { id: 'paibian', name: '牌匾', imageCount: 3 },
    { id: 'muyu', name: '木鱼', imageCount: 1 },
    { id: 'nianzhu', name: '念珠', imageCount: 1 },
];

// ==================== 产品数据生成 ====================
const products = [];
let productId = 1;

categories.forEach(category => {
    for (let i = 1; i <= category.imageCount; i++) {
        products.push({
            id: productId++,
            category: category.id,
            image: `images/${category.id}/${i}.png`
        });
    }
});

// ==================== DOM 元素 ====================
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const categoryTabs = document.getElementById('categoryTabs');
const productGrid = document.getElementById('productGrid');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');
const lightboxCaption = document.getElementById('lightboxCaption');
const musicControl = document.getElementById('musicControl');
const bgMusic = document.getElementById('bgMusic');

// ==================== 状态变量 ====================
let currentImageIndex = 0;
let currentCategoryImages = [];
let isMusicPlaying = false;
let musicInitialized = false;

// ==================== 导航功能 ====================
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// ==================== 分类标签渲染 ====================
function renderCategoryTabs() {
    categoryTabs.innerHTML = `
        <button class="tab-btn active" data-category="all">全部</button>
        ${categories.map(c => `<button class="tab-btn" data-category="${c.id}">${c.name}</button>`).join('')}
    `;
}

// ==================== 产品渲染 ====================
function getCategoryName(categoryId) {
    return categories.find(c => c.id === categoryId)?.name || '';
}

function renderProducts(category = 'all') {
    const filtered = category === 'all' ? products : products.filter(p => p.category === category);

    productGrid.innerHTML = filtered.map((product, index) => {
        const name = getCategoryName(product.category);
        return `
        <div class="product-card">
            <div class="product-image">
                <img src="${product.image}" alt="${name}" loading="lazy" 
                     onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22150%22%3E%3Crect fill=%22%23ddd%22 width=%22200%22 height=%22150%22/%3E%3C/svg%3E'">
            </div>
            <div class="product-name">${name}</div>
        </div>
    `;
    }).join('');

    // 绑定图片点击事件
    productGrid.querySelectorAll('.product-card img').forEach((img, idx) => {
        img.addEventListener('click', () => {
            currentCategoryImages = filtered;
            currentImageIndex = idx;
            showLightbox(idx);
        });
    });
}

// ==================== 图片放大功能 ====================
function showLightbox(index) {
    const product = currentCategoryImages[index];
    const name = getCategoryName(product.category);
    lightboxImg.src = product.image;
    lightboxImg.alt = name;
    lightboxCaption.textContent = name;
    lightbox.classList.add('active');
    updateNavButtons();
}

function updateNavButtons() {
    lightboxPrev.style.opacity = currentImageIndex === 0 ? '0.3' : '1';
    lightboxNext.style.opacity = currentImageIndex === currentCategoryImages.length - 1 ? '0.3' : '1';
}

function showPrev() {
    if (currentImageIndex > 0) {
        currentImageIndex--;
        showLightbox(currentImageIndex);
    }
}

function showNext() {
    if (currentImageIndex < currentCategoryImages.length - 1) {
        currentImageIndex++;
        showLightbox(currentImageIndex);
    }
}

lightboxPrev.addEventListener('click', (e) => {
    e.stopPropagation();
    showPrev();
});

lightboxNext.addEventListener('click', (e) => {
    e.stopPropagation();
    showNext();
});

categoryTabs.addEventListener('click', (e) => {
    if (e.target.classList.contains('tab-btn')) {
        categoryTabs.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        renderProducts(e.target.dataset.category);
    }
});

lightboxClose.addEventListener('click', () => {
    lightbox.classList.remove('active');
});

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.classList.remove('active');
    }
});

document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'ArrowLeft') showPrev();
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'Escape') lightbox.classList.remove('active');
});

// ==================== 背景音乐功能 ====================
function toggleMusic() {
    if (!bgMusic) return;

    if (isMusicPlaying) {
        bgMusic.pause();
        musicControl.classList.add('paused');
        musicControl.title = '播放背景音乐';
    } else {
        bgMusic.volume = 0.5;
        bgMusic.play().then(() => {
            musicControl.classList.remove('paused');
            musicControl.title = '暂停背景音乐';
        }).catch(err => console.log('音乐播放失败:', err));
    }
    isMusicPlaying = !isMusicPlaying;
}

musicControl.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMusic();
});

// 自动播放音乐
function initMusic() {
    if (musicInitialized || !bgMusic) return;
    musicInitialized = true;

    bgMusic.volume = 0.3;
    bgMusic.play().then(() => {
        isMusicPlaying = true;
        musicControl.classList.remove('paused');
        musicControl.title = '暂停背景音乐';
    }).catch(err => console.log('自动播放被阻止'));
}

// 页面加载后延迟播放
window.addEventListener('load', () => {
    setTimeout(() => initMusic(), 500);
});

// 用户交互触发播放
['click', 'keydown', 'touchstart', 'scroll'].forEach(event => {
    document.addEventListener(event, initMusic, { once: true });
});

// 音乐循环播放
if (bgMusic) {
    bgMusic.addEventListener('ended', () => {
        bgMusic.currentTime = 0;
        bgMusic.play();
    });
}

// ==================== 平滑滚动 ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ==================== 应用网站配置 ====================
function applySiteConfig() {
    const elements = {
        siteTitle: `${siteConfig.name} - 佛像法器精品展示`,
        navBrand: siteConfig.name,
        siteName: siteConfig.name,
        siteTagline: siteConfig.tagline,
        siteDescription: siteConfig.description,
        siteFooter: siteConfig.footer,
        siteCopyright: `© ${siteConfig.copyrightYear} ${siteConfig.name} 版权所有`,
        contactPhone: siteConfig.contact.phone,
        contactAddress: siteConfig.contact.address
    };

    Object.entries(elements).forEach(([id, text]) => {
        const el = document.getElementById(id);
        if (el) el.textContent = text;
    });
}

// ==================== 初始化 ====================
applySiteConfig();
renderCategoryTabs();
renderProducts();

console.log(`${siteConfig.name}网站已加载`);
