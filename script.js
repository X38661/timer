// 等待DOM完全加载
document.addEventListener('DOMContentLoaded', function() {
    // 导航菜单活动状态与滚动监听
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // 滚动监听函数
    function scrollSpy() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    }
    
    // 监听滚动事件
    window.addEventListener('scroll', scrollSpy);
    
    // 移动端菜单切换
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    
    menuToggle?.addEventListener('click', function() {
        nav.classList.toggle('mobile-active');
        menuToggle.classList.toggle('active');
    });
    
    // 菜单链接点击后关闭移动菜单
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('mobile-active');
            menuToggle.classList.remove('active');
        });
    });
    
    // 资源中心标签页切换
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 移除所有按钮的active类
            tabButtons.forEach(btn => btn.classList.remove('active'));
            // 给当前点击的按钮添加active类
            button.classList.add('active');
            
            // 获取对应的内容区域ID
            const tabId = button.getAttribute('data-tab') + '-content';
            
            // 隐藏所有内容区域
            tabContents.forEach(content => {
                content.classList.remove('active');
            });
            
            // 显示当前选中的内容区域
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // 客户评价轮播
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    
    // 切换到指定轮播图
    function showSlide(index) {
        testimonialSlides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        testimonialSlides[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    }
    
    // 点击指示点切换轮播图
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });
    
    // 自动轮播
    function autoSlide() {
        currentSlide = (currentSlide + 1) % testimonialSlides.length;
        showSlide(currentSlide);
    }
    
    // 每5秒切换一次
    let slideInterval = setInterval(autoSlide, 5000);
    
    // 鼠标悬停时暂停自动轮播
    const testimonialSlider = document.querySelector('.testimonial-slider');
    
    testimonialSlider?.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    testimonialSlider?.addEventListener('mouseleave', () => {
        slideInterval = setInterval(autoSlide, 5000);
    });
    
    // 表单提交处理
    const form = document.getElementById('contact-form');
    
    form?.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        const formValues = Object.fromEntries(formData.entries());
        
        // 这里可以添加表单验证逻辑
        
        // 模拟表单提交成功
        alert('感谢您的咨询！我们将尽快与您联系。');
        form.reset();
    });
    
    // 滚动动画效果
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.feature-card, .course-card, .solution-card, .digital-human-card, .training-card, .tool-card, .report-card, .news-card, .info-item');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('animate');
            }
        });
    }
    
    window.addEventListener('scroll', animateOnScroll);
    
    // 初始调用一次，确保页面加载时已显示的元素有动画
    animateOnScroll();
    
    // 初始调用一次确保导航激活状态正确
    scrollSpy();
});
