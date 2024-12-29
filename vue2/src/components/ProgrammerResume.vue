<template>
  <div>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <div class="cursor"></div>

    <!-- 导航栏 -->
    <nav>
      <div class="nav-logo">Portfolio</div>
      <ul class="nav-links" :class="{ 'nav-active': isMenuActive }">
        <li v-for="(item, index) in navItems" :key="index"
          :style="isMenuActive ? `animation: navLinkFade 0.5s ease forwards ${index * 0.1}s` : ''"
          :class="{ fade: isMenuActive }">
          <a @click="handleNavClick($event, '#' + item.id)">{{ item.text }}</a>
        </li>
      </ul>
      <div class="burger" :class="{ toggle: isMenuActive }" @click="handleBurgerClick">
        <div class="line1"></div>
        <div class="line2"></div>
        <div class="line3"></div>
      </div>
    </nav>

    <!-- 首页 -->
    <section id="home" class="hero">
      <div class="hero-content">
        <h1>你好，我是<span class="highlight">{{ hero.name }}</span></h1>
        <h2>{{ hero.title }}</h2>
        <p>{{ hero.description }}</p>
        <a @click="handleNavClick($event, '#contact')" class="cta-button">{{ hero.ctaText }}</a>
      </div>
      <div class="hero-image">
        <div class="gradient-circle"></div>
      </div>
    </section>

    <!-- 关于 -->
    <section id="about" class="about">
      <h2 class="section-title">{{ about.title }}</h2>
      <div class="about-content">
        <div class="about-text">
          <p v-for="(text, index) in about.description" :key="index">{{ text }}</p>
        </div>
        <div class="about-stats">
          <div class="stat" v-for="(stat, index) in about.stats" :key="index">
            <h3>{{ stat.number }}</h3>
            <p>{{ stat.text }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 技能 -->
    <section id="skills" class="skills">
      <h2 class="section-title">{{ skills.title }}</h2>
      <div class="skills-container">
        <div class="skill-card fade-in" v-for="(skill, index) in skills.items" :key="index">
          <i :class="skill.icon"></i>
          <h3>{{ skill.title }}</h3>
          <p v-for="(item, idx) in skill.skills" :key="idx">{{ item }}</p>
        </div>
      </div>
    </section>

    <!-- 项目 -->
    <section id="projects" class="projects">
      <h2 class="section-title">{{ projects.title }}</h2>
      <div class="projects-grid">
        <div class="project-card fade-in" v-for="(project, index) in projects.items" :key="index">
          <div class="project-image" :style="project.image ? `background-image: url(${project.image})` : ''"></div>
          <h3>{{ project.title }}</h3>
          <p>{{ project.description }}</p>
          <div class="project-links">
            <a v-for="(link, idx) in project.links" :key="idx" :href="link.url" target="_blank"
              rel="noopener noreferrer" class="project-link">{{ link.text }}</a>
          </div>
        </div>
      </div>
    </section>

    <!-- 联系 -->
    <section id="contact" class="contact">
      <h2 class="section-title">{{ contact.title }}</h2>
      <div class="contact-container">
        <form id="contact-form" @submit.prevent="handleSubmit">
          <template v-for="(field, index) in contact.form.fields">
            <input v-if="field.type !== 'textarea'" :key="index" :type="field.type" :placeholder="field.placeholder"
              :required="field.required">
            <textarea v-else :key="index" :placeholder="field.placeholder" :required="field.required"></textarea>
          </template>
          <button type="submit" class="submit-btn">{{ contact.form.submitText }}</button>
        </form>
        <div class="contact-info">
          <div class="info-item" v-for="(item, index) in contact.info" :key="index">
            <i :class="item.icon"></i>
            <p>{{ item.text }}</p>
          </div>
          <div class="social-links">
            <a v-for="(social, index) in contact.social" :key="index" :href="social.url" target="_blank"
              rel="noopener noreferrer">
              <i :class="social.icon"></i>
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- 页脚 -->
    <footer>
      <p>{{ footer.copyright }}</p>
    </footer>
  </div>
</template>

<script>
import '@/assets/css/style.css'

export default {
  name: 'ProgrammerResume',

  data() {
    return {
      // ************ 全局配置 ************
      isMenuActive: false,
      cleanup: null,
      overlay: null,
      contentOverlay: null,

      // ************ 导航栏 ************
      navItems: [
        { id: 'home', text: '首页' },
        { id: 'about', text: '关于' },
        { id: 'skills', text: '技能' },
        { id: 'projects', text: '项目' },
        { id: 'contact', text: '联系' }
      ],

      // ************ 首页 ************
      hero: {
        name: '小明',
        title: '全栈开发工程师',
        description: '专注于创建优雅的用户体验和高效的后端解决方案',
        ctaText: '联系我'
      },

      // ************ 关于 ************
      about: {
        title: '关于我',
        description: [
          '我是一名充满激情的全栈开发者，拥有5年的开发经验。我热爱创造能够改善用户生活的产品。',
          '在我的职业生涯中，我参与过多个大型项目的开发，包括电商平台、企业管理系统等。'
        ],
        stats: [
          { number: '5+', text: '年开发经验' },
          { number: '50+', text: '完成项目' },
          { number: '30+', text: '客户好评' }
        ]
      },

      // ************ 技能 ************
      skills: {
        title: '技能专长',
        items: [
          {
            icon: 'fas fa-code',
            title: '前端开发',
            skills: ['HTML5, CSS3, JavaScript', 'React, Vue, Angular']
          },
          {
            icon: 'fas fa-server',
            title: '后端开发',
            skills: ['Node.js, Python, Java', 'Express, Django, Spring']
          },
          {
            icon: 'fas fa-database',
            title: '数据库',
            skills: ['MySQL, MongoDB', 'Redis, PostgreSQL']
          }
        ]
      },

      // ************ 项目 ************
      projects: {
        title: '项目展示',
        items: [
          {
            title: '电商平台',
            description: '基于React和Node.js的现代电商解决方案',
            image: '', // 可以添加图片路径
            links: [
              { text: '查看演示', url: 'https://www.baidu.com' },
              { text: '源代码', url: '#' }
            ]
          },
          {
            title: '企业管理系统',
            description: '使用Vue和Spring Boot开发的管理系统',
            image: '', // 可以添加图片路径
            links: [
              { text: '查看演示', url: '#' },
              { text: '源代码', url: '#' }
            ]
          }
        ]
      },

      // ************ 联系 ************
      contact: {
        title: '联系我',
        form: {
          fields: [
            { type: 'text', placeholder: '您的姓名', required: true },
            { type: 'email', placeholder: '您的邮箱', required: true },
            { type: 'textarea', placeholder: '您的留言', required: true }
          ],
          submitText: '发送消息'
        },
        info: [
          { icon: 'fas fa-envelope', text: 'example@email.com' },
          { icon: 'fas fa-phone', text: '+86 123 4567 8900' }
        ],
        social: [
          { icon: 'fab fa-github', url: '#' },
          { icon: 'fab fa-linkedin', url: '#' },
          { icon: 'fab fa-twitter', url: '#' }
        ]
      },

      // ************ 页脚 ************
      footer: {
        copyright: '© 2024 程序员简历. All rights reserved.'
      },

      // 添加事件监听器引用
      scrollHandler: null,
      resizeHandler: null,

      // 添加进度条引用
      scrollProgress: null
    }
  },

  mounted() {
    this.createOverlays()

    this.initCursor()
    this.initIntersectionObserver()
    this.initMobileCardScroll()
    this.initScrollProgress()

    // 使用箭头函数绑定 this
    this.scrollHandler = () => this.handleScroll()
    this.resizeHandler = () => this.handleResize()

    window.addEventListener('scroll', this.scrollHandler)
    window.addEventListener('resize', this.resizeHandler)

    // 移动端检测移到 created 生命周期
    if ('ontouchstart' in window) {
      const cursor = document.querySelector('.cursor')
      if (cursor) {
        cursor.style.display = 'none'
        document.body.style.cursor = 'auto'
      }
    }
  },

  beforeDestroy() {
    // 移除所有事件监听器
    window.removeEventListener('scroll', this.scrollHandler)
    window.removeEventListener('resize', this.resizeHandler)

    // 移除滚动进度条的事件监听器
    if (this.scrollProgress) {
      window.removeEventListener('scroll', this.updateScrollProgress)
      document.body.removeChild(this.scrollProgress)
    }

    if (this.cleanup) {
      this.cleanup()
    }

    if (this.overlay) {
      this.overlay.removeEventListener('click', this.closeMenu)
      document.body.removeChild(this.overlay)
    }

    if (this.contentOverlay) {
      document.body.removeChild(this.contentOverlay)
    }

    // 恢复 body 样式
    document.body.style.overflow = ''
    document.body.style.cursor = ''
  },

  methods: {
    createOverlays() {
      this.overlay = document.createElement('div')
      this.overlay.className = 'overlay'
      document.body.appendChild(this.overlay)

      this.contentOverlay = document.createElement('div')
      this.contentOverlay.className = 'content-overlay'
      document.body.appendChild(this.contentOverlay)

      this.overlay.addEventListener('click', this.closeMenu)
    },

    initCursor() {
      const cursor = document.querySelector('.cursor')
      if (!cursor) return

      document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px'
        cursor.style.top = e.clientY + 'px'
        document.body.style.cursor = 'none'
      })

      document.querySelectorAll('a, button, .skill-card, .project-card').forEach(elem => {
        elem.addEventListener('mouseenter', () => {
          cursor.style.transform = 'scale(1.5)'
          cursor.style.mixBlendMode = 'difference'
        })

        elem.addEventListener('mouseleave', () => {
          cursor.style.transform = 'scale(1)'
          cursor.style.mixBlendMode = 'normal'
        })
      })
    },

    initIntersectionObserver() {
      const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          } else {
            entry.target.classList.remove('visible')
          }
        })
      }, observerOptions)

      document.querySelectorAll('.section-title, .stat, .skill-card, .project-card, .about-text').forEach(element => {
        observer.observe(element)
      })
    },

    initMobileCardScroll() {
      if (window.innerWidth > 768) return

      const statsContainer = document.querySelector('.about-stats')
      if (!statsContainer) return

      const track = document.createElement('div')
      track.className = 'stats-track'

      const stats = Array.from(statsContainer.querySelectorAll('.stat'))
      stats.forEach((stat, index) => {
        stat.style.transitionDelay = `${index * 0.1}s`
        track.appendChild(stat)
      })

      statsContainer.appendChild(track)
    },

    initScrollProgress() {
      this.scrollProgress = document.createElement('div')
      this.scrollProgress.className = 'scroll-progress'
      document.body.appendChild(this.scrollProgress)

      // 将滚动处理函数提取出来
      this.updateScrollProgress = () => {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight
        const scrolled = (window.scrollY / windowHeight) * 100
        this.scrollProgress.style.width = `${scrolled}%`
      }

      window.addEventListener('scroll', this.updateScrollProgress)
    },

    handleScroll: debounce(function () {
      const nav = document.querySelector('nav')
      if (window.scrollY > 50) {
        nav.classList.add('scrolled')
      } else {
        nav.classList.remove('scrolled')
      }
    }, 20),

    handleResize() {
      if (this.cleanup) {
        this.cleanup()
      }
      this.cleanup = this.initMobileCardScroll()
    },

    handleBurgerClick() {
      const nav = document.querySelector('.nav-links')
      const burger = document.querySelector('.burger')

      if (this.isMenuActive) {
        this.closeMenu()
        return
      }

      this.isMenuActive = true
      nav.classList.add('nav-active')
      this.overlay.classList.add('active')
      this.contentOverlay.classList.add('active')
      burger.classList.add('toggle')
      document.body.style.overflow = 'hidden'

      // 重置动画
      const navLinks = document.querySelectorAll('.nav-links li')
      navLinks.forEach((link, index) => {
        if (link.style.animation) {
          link.style.animation = ''
        }
        // 强制重绘以确保动画重新触发
        void link.offsetWidth
        link.style.animation = `navLinkFade 0.5s ease forwards ${index * 0.1}s`
      })
    },

    closeMenu() {
      this.isMenuActive = false
      const nav = document.querySelector('.nav-links')
      const burger = document.querySelector('.burger')

      nav.classList.remove('nav-active')
      this.overlay.classList.remove('active')
      this.contentOverlay.classList.remove('active')
      burger.classList.remove('toggle')
      document.body.style.overflow = ''

      // 清除动画
      const navLinks = document.querySelectorAll('.nav-links li')
      navLinks.forEach(link => {
        link.style.animation = ''
      })
    },

    handleNavClick(e, href) {
      e.preventDefault()

      if (this.isMenuActive) {
        this.closeMenu()
      }

      const targetElement = document.querySelector(href)
      if (!targetElement) return

      const navHeight = document.querySelector('nav').offsetHeight
      const targetPosition = targetElement.offsetTop - navHeight

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      })
    },

    // 优化表单提交方法
    async handleSubmit(e) {
      e.preventDefault()
      const form = e.target
      const formData = new FormData(form)

      try {
        // 这里添加你的表单提交逻辑
        console.log('Form submitted:', Object.fromEntries(formData))
        alert('消息已发送！')
        form.reset()
      } catch (error) {
        console.error('Form submission error:', error)
        alert('发送失败，请稍后重试')
      }
    }
  }
}

function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func.apply(this, args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}
</script>

<style scoped></style>
