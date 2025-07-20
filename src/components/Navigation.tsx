'use client'

import Link from 'next/link'
import { useState } from 'react'
import SearchBar from './SearchBar'

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-black shadow-sm relative z-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
          </Link>

          {/* 搜索框 */}
          <div className="flex-1 max-w-md mx-8">
            <SearchBar />
          </div>

          {/* 桌面端菜单 */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className="text-white hover:text-gray-200 transition-colors"
            >
              首页
            </Link>
            <Link 
              href="/tags" 
              className="text-white hover:text-gray-200 transition-colors"
            >
              标签
            </Link>
            <Link 
              href="/about" 
              className="text-white hover:text-gray-200 transition-colors"
            >
              关于
            </Link>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-gray-200 transition-colors"
            >
              GitHub
            </a>
          </div>

          {/* 移动端菜单按钮 */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* 移动端菜单 */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <Link href="/" className="text-white hover:text-gray-200">
                首页
              </Link>
              <Link href="/tags" className="text-white hover:text-gray-200">
                标签
              </Link>
              <Link href="/about" className="text-white hover:text-gray-200">
                关于
              </Link>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-200"
              >
                GitHub
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}