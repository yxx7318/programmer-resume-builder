// 自定义光标效果
const cursor = document.querySelector('.cursor');

document.addEventListener('mousemove', (e) => {
    // 直接设置光标位置，移除平滑动画
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    document.body.style.cursor = 'none';
});

// 添加光标悬浮效果
document.querySelectorAll('a, button, .skill-card, .project-card').forEach(elem => {
    elem.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(1.5)';
        cursor.style.mixBlendMode = 'difference';
    });
    
    elem.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursor.style.mixBlendMode = 'normal';
    });
});

// 移动端检测
if ('ontouchstart' in window) {
    cursor.style.display = 'none';
    document.body.style.cursor = 'auto';
}

// 导航栏滚动效果
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// 汉堡菜单
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');
const overlay = document.createElement('div');
overlay.className = 'overlay';
document.body.appendChild(overlay);

// 在文件开头添加新的常量
const contentOverlay = document.createElement('div');
contentOverlay.className = 'content-overlay';
document.body.appendChild(contentOverlay);

// 关闭菜单的函数
function closeMenu() {
    nav.classList.remove('nav-active');
    overlay.classList.remove('active');
    burger.classList.remove('toggle');
    contentOverlay.classList.remove('active');
    document.body.style.overflow = '';
    
    navLinks.forEach(link => {
        link.style.animation = '';
        link.classList.remove('fade');
    });
}

burger.addEventListener('click', () => {
    // 切换导航菜单
    nav.classList.toggle('nav-active');
    overlay.classList.toggle('active');
    contentOverlay.classList.toggle('active');
    
    // 切换页面滚动
    document.body.style.overflow = nav.classList.contains('nav-active') ? 'hidden' : '';
    
    // 动画链接
    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
            link.classList.remove('fade');
        } else {
            link.style.animation = `navLinkFade 0.3s ease forwards ${index * 0.1}s`;
            link.classList.add('fade');
        }
    });
    
    // 汉堡按钮动画
    burger.classList.toggle('toggle');
});

// 点击链接后自动关闭菜单
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const href = link.querySelector('a').getAttribute('href');
        
        // 先关闭菜单
        closeMenu();
        
        // 获取目标元素
        const targetElement = document.querySelector(href);
        
        // 计算目标位置，考虑导航栏高度
        const navHeight = document.querySelector('nav').offsetHeight;
        const targetPosition = targetElement.offsetTop - navHeight;
        
        // 使用 setTimeout 确保菜单动画完成后再滚动
        setTimeout(() => {
            // 直接使用 scrollTo 而不是 scrollIntoView
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // 临时禁用动画
            targetElement.style.transition = 'none';
            
            // 确保元素可见
            setTimeout(() => {
                targetElement.style.transition = '';
            }, 500); // 等待滚动完成
        }, 300);
    });
});

// 点击遮罩层关闭菜单
overlay.addEventListener('click', closeMenu);

// 表单提交处理
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    
    try {
        // 这里添加表单提交逻辑
        console.log('Form submitted:', Object.fromEntries(formData));
        alert('消息已发送！');
        form.reset();
    } catch (error) {
        console.error('Form submission error:', error);
        alert('发送失败，请稍后重试');
    }
});

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetElement = document.querySelector(this.getAttribute('href'));
        const navHeight = document.querySelector('nav').offsetHeight;
        const targetPosition = targetElement.offsetTop - navHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
        
        // 临时禁用动画
        targetElement.style.transition = 'none';
        setTimeout(() => {
            targetElement.style.transition = '';
        }, 500);
    });
});

// 技能卡片动画
const skillCards = document.querySelectorAll('.skill-card');
skillCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// 项目卡片动画
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// 添加滚动进度条
const scrollProgress = document.createElement('div');
scrollProgress.className = 'scroll-progress';
document.body.appendChild(scrollProgress);

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    scrollProgress.style.width = `${scrolled}%`;
});

// 优化滚动观察器
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

// 创建观察器实例
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        // 当元素进入视口时
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        } else {
            // 当元素离开视口时，移除动画类，这样下次进入时会重新触发动画
            entry.target.classList.remove('visible');
        }
    });
}, observerOptions);

// 页面加载时初始化观察器
document.addEventListener('DOMContentLoaded', () => {
    // 观察所有标题
    document.querySelectorAll('.section-title').forEach(title => {
        observer.observe(title);
    });

    // 观察所有卡片
    document.querySelectorAll('.stat, .skill-card, .project-card').forEach(card => {
        observer.observe(card);
    });

    // 观察文本内容
    document.querySelectorAll('.about-text').forEach(text => {
        observer.observe(text);
    });

    // 初始化移动端卡片滚动
    initMobileCardScroll();
});

// 移动端卡片滚动功能
function initMobileCardScroll() {
    if (window.innerWidth > 768) return;

    const statsContainer = document.querySelector('.about-stats');
    if (!statsContainer) return;

    const track = document.createElement('div');
    track.className = 'stats-track';

    // 获取并移动卡片，同时添加动画类
    const stats = Array.from(statsContainer.querySelectorAll('.stat'));
    stats.forEach((stat, index) => {
        stat.style.transitionDelay = `${index * 0.1}s`; // 添加延迟，创造级联效果
        track.appendChild(stat);
        observer.observe(stat); // 观察每个卡片
    });

    statsContainer.appendChild(track);
}

// 性能优化：防抖函数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 优化滚动事件
const handleScroll = debounce(() => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
}, 20);

window.addEventListener('scroll', handleScroll);

window.addEventListener('resize', () => {
    if (cleanup) {
        cleanup();
    }
    cleanup = initMobileCardScroll();
}); 