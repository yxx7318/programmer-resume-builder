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
          <template v-for="(field, index) in contact.form.fields" :key="index">
            <input v-if="field.type !== 'textarea'" :type="field.type" :placeholder="field.placeholder"
              :required="field.required">
            <textarea v-else :placeholder="field.placeholder" :required="field.required"></textarea>
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

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import '@/assets/css/style.css'

// ************ 响应式状态 ************
const isMenuActive = ref(false)
let cleanup = null
let overlay = null
let contentOverlay = null
let scrollProgress = null

// ************ 导航栏数据 ************
const navItems = ref([
  { id: 'home', text: '首页' },
  { id: 'about', text: '关于' },
  { id: 'skills', text: '技能' },
  { id: 'projects', text: '项目' },
  { id: 'contact', text: '联系' }
])

// ************ 页面各部分数据 ************
const hero = ref({
  name: '小明',
  title: '全栈开发工程师',
  description: '专注于创建优雅的用户体验和高效的后端解决方案',
  ctaText: '联系我'
})

const about = ref({
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
})

const skills = ref({
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
})

const projects = ref({
  title: '项目展示',
  items: [
    {
      title: '电商平台',
      description: '基于React和Node.js的现代电商解决方案',
      image: '',
      links: [
        { text: '查看演示', url: 'https://www.baidu.com' },
        { text: '源代码', url: '#' }
      ]
    },
    {
      title: '企业管理系统',
      description: '使用Vue和Spring Boot开发的管理系统',
      image: '',
      links: [
        { text: '查看演示', url: '#' },
        { text: '源代码', url: '#' }
      ]
    }
  ]
})

const contact = ref({
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
})

const footer = ref({
  copyright: '© 2024 程序员简历. All rights reserved.'
})

// ************ 工具函数 ************
const debounce = (fn, wait) => {
  let timeout
  return function (...args) {
    clearTimeout(timeout)
    timeout = setTimeout(() => fn.apply(this, args), wait)
  }
}

// ************ 方法定义 ************
const createOverlays = () => {
  overlay = document.createElement('div')
  overlay.className = 'overlay'
  document.body.appendChild(overlay)

  contentOverlay = document.createElement('div')
  contentOverlay.className = 'content-overlay'
  document.body.appendChild(contentOverlay)

  overlay.addEventListener('click', closeMenu)
}

const initCursor = () => {
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
}

const initIntersectionObserver = () => {
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
}

const initMobileCardScroll = () => {
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
}

const initScrollProgress = () => {
  scrollProgress = document.createElement('div')
  scrollProgress.className = 'scroll-progress'
  document.body.appendChild(scrollProgress)

  const updateScrollProgress = () => {
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight
    const scrolled = (window.scrollY / windowHeight) * 100
    scrollProgress.style.width = `${scrolled}%`
  }

  window.addEventListener('scroll', updateScrollProgress)
  return () => window.removeEventListener('scroll', updateScrollProgress)
}

const handleScroll = debounce(() => {
  const nav = document.querySelector('nav')
  if (window.scrollY > 50) {
    nav.classList.add('scrolled')
  } else {
    nav.classList.remove('scrolled')
  }
}, 20)

const handleResize = () => {
  if (cleanup) {
    cleanup()
  }
  cleanup = initMobileCardScroll()
}

const handleBurgerClick = () => {
  if (isMenuActive.value) {
    closeMenu()
    return
  }

  isMenuActive.value = true
  const nav = document.querySelector('.nav-links')
  const burger = document.querySelector('.burger')

  nav.classList.add('nav-active')
  overlay.classList.add('active')
  contentOverlay.classList.add('active')
  burger.classList.add('toggle')
  document.body.style.overflow = 'hidden'

  const navLinks = document.querySelectorAll('.nav-links li')
  navLinks.forEach((link, index) => {
    if (link.style.animation) {
      link.style.animation = ''
    }
    void link.offsetWidth
    link.style.animation = `navLinkFade 0.5s ease forwards ${index * 0.1}s`
  })
}

const closeMenu = () => {
  isMenuActive.value = false
  const nav = document.querySelector('.nav-links')
  const burger = document.querySelector('.burger')

  nav.classList.remove('nav-active')
  overlay.classList.remove('active')
  contentOverlay.classList.remove('active')
  burger.classList.remove('toggle')
  document.body.style.overflow = ''

  const navLinks = document.querySelectorAll('.nav-links li')
  navLinks.forEach(link => {
    link.style.animation = ''
  })
}

const handleNavClick = (e, href) => {
  e.preventDefault()

  if (isMenuActive.value) {
    closeMenu()
  }

  const targetElement = document.querySelector(href)
  if (!targetElement) return

  const navHeight = document.querySelector('nav').offsetHeight
  const targetPosition = targetElement.offsetTop - navHeight

  window.scrollTo({
    top: targetPosition,
    behavior: 'smooth'
  })
}

const handleSubmit = async (e) => {
  e.preventDefault()
  const form = e.target
  const formData = new FormData(form)

  try {
    console.log('Form submitted:', Object.fromEntries(formData))
    alert('消息已发送！')
    form.reset()
  } catch (error) {
    console.error('Form submission error:', error)
    alert('发送失败，请稍后重试')
  }
}

// ************ 生命周期钩子 ************
onMounted(() => {
  createOverlays()
  initCursor()
  initIntersectionObserver()
  initMobileCardScroll()
  cleanup = initScrollProgress()

  window.addEventListener('scroll', handleScroll)
  window.addEventListener('resize', handleResize)

  if ('ontouchstart' in window) {
    const cursor = document.querySelector('.cursor')
    if (cursor) {
      cursor.style.display = 'none'
      document.body.style.cursor = 'auto'
    }
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', handleResize)

  if (scrollProgress) {
    document.body.removeChild(scrollProgress)
  }

  if (cleanup) {
    cleanup()
  }

  if (overlay) {
    overlay.removeEventListener('click', closeMenu)
    document.body.removeChild(overlay)
  }

  if (contentOverlay) {
    document.body.removeChild(contentOverlay)
  }

  document.body.style.overflow = ''
  document.body.style.cursor = ''
})
</script>

<style scoped></style> 