'use client'

import { useEffect } from 'react'

export default function ScrollEffects() {
  useEffect(() => {
    // 滚动效果初始化
    function initScrollEffects() {
      const heroContainer = document.querySelector('.hero-container')
      
      window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset

        // 黑框透明度变化
        if (heroContainer) {
          (heroContainer as HTMLElement).style.opacity = Math.max(0.3, 1 - scrollTop / 500).toString()
        }
        
        // 滚动时显示元素动画
        animateOnScroll()
      })
    }

    // 滚动时的动画效果
    function animateOnScroll() {
      const elements = document.querySelectorAll('.scroll-animate')
      
      elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top
        const elementBottom = element.getBoundingClientRect().bottom
        const elementVisible = 100
        
        // 元素在视口内时添加动画
        if (elementTop < window.innerHeight - elementVisible && elementBottom > elementVisible) {
          element.classList.add('fade-in-up')
        } 
        // 元素离开视口时移除动画
        else if (elementTop > window.innerHeight + 50 || elementBottom < -50) {
          element.classList.remove('fade-in-up')
        }
      })
    }

    // 初始化
    initScrollEffects()
    
    // 页面加载时检查一次
    setTimeout(animateOnScroll, 100)
    
    // 清理函数
    return () => {
      window.removeEventListener('scroll', initScrollEffects)
    }
  }, [])

  return null
}