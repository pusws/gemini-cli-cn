// 主要交互功能

document.addEventListener('DOMContentLoaded', function() {
    // 移动端菜单切换
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const quickReferencePanel = document.getElementById('quick-reference-panel');
    const quickReferenceToggle = document.getElementById('quick-reference-toggle');
    const closePanelButton = document.querySelector('.close-panel');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);
        });
    }
    
    // 快速参考面板切换
    if (quickReferenceToggle) {
        quickReferenceToggle.addEventListener('click', function() {
            quickReferencePanel.classList.add('active');
            document.body.style.overflow = 'hidden'; // 防止背景滚动
        });
    }
    
    if (closePanelButton) {
        closePanelButton.addEventListener('click', function() {
            quickReferencePanel.classList.remove('active');
            document.body.style.overflow = ''; // 恢复背景滚动
        });
    }
    
    // 点击面板外部关闭
    quickReferencePanel.addEventListener('click', function(e) {
        if (e.target === quickReferencePanel) {
            quickReferencePanel.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // 键盘快捷键
    document.addEventListener('keydown', function(e) {
        // ESC键关闭快速参考面板
        if (e.key === 'Escape') {
            if (quickReferencePanel.classList.contains('active')) {
                quickReferencePanel.classList.remove('active');
                document.body.style.overflow = '';
            }
            
            if (sidebar.classList.contains('active')) {
                sidebar.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        }
        
        // ? 键打开快速参考面板
        if (e.key === '?' && !e.ctrlKey && !e.metaKey) {
            e.preventDefault();
            quickReferencePanel.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
        
        // J/K 导航（简化实现）
        if (e.key === 'j' || e.key === 'J') {
            // 向下导航逻辑
        }
        
        if (e.key === 'k' || e.key === 'K') {
            // 向上导航逻辑
        }
    });
    
    // 左侧导航栏折叠菜单
    const navItems = document.querySelectorAll('.nav-item.has-children');
    navItems.forEach(item => {
        const link = item.querySelector('.nav-link');
        link.addEventListener('click', function(e) {
            e.preventDefault();
            item.classList.toggle('active');
        });
    });
    
    // 平滑滚动到锚点
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 右侧目录随阅读位置高亮
    const tocLinks = document.querySelectorAll('.toc-nav a');
    const sections = document.querySelectorAll('section[id]');
    
    function updateTOC() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });
        
        tocLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateTOC);
    
    // 页面加载动画
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.1}s`;
        el.classList.add('slide-up');
    });
    
    // 字体大小调整（简化实现）
    const fontSizeButtons = document.querySelectorAll('.font-size-btn');
    fontSizeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const size = this.getAttribute('data-size');
            document.body.className = `font-${size}`;
        });
    });
});