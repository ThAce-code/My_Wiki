'use client'

import { getAllPosts } from '@/lib/posts'
import ArticleCard from '@/components/ArticleCard'
import SearchBar from '@/components/SearchBar'
import { useEffect, useState } from 'react'

export default function Home() {
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadPosts = async () => {
      const postsData = await getAllPosts()
      setPosts(postsData)
      setLoading(false)
    }
    loadPosts()
  }, [])

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            我的技术Wiki 📚
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            记录学习过程，分享技术心得
          </p>
          <SearchBar />
        </div>
        <div className="animate-pulse">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-gray-200 rounded-lg p-6 h-24"></div>
            <div className="bg-gray-200 rounded-lg p-6 h-24"></div>
            <div className="bg-gray-200 rounded-lg p-6 h-24"></div>
          </div>
          <div className="space-y-6">
            <div className="bg-gray-200 rounded-lg h-32"></div>
            <div className="bg-gray-200 rounded-lg h-32"></div>
            <div className="bg-gray-200 rounded-lg h-32"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* 头部介绍 */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          我的技术Wiki 📚
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          记录学习过程，分享技术心得
        </p>
        <SearchBar />
      </div>

      {/* 统计信息 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <div className="text-2xl font-bold text-blue-600">{posts.length}</div>
          <div className="text-gray-600">技术文章</div>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <div className="text-2xl font-bold text-green-600">
            {new Set(posts.flatMap(post => post.tags)).size}
          </div>
          <div className="text-gray-600">技术标签</div>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-sm border">
          <div className="text-2xl font-bold text-purple-600">
            {posts.reduce((total, post) => total + (post.readTime || 5), 0)}
          </div>
          <div className="text-gray-600">总阅读时间(分钟)</div>
        </div>
      </div>

      {/* 文章列表 */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          最新文章
        </h2>
        {posts.length > 0 ? (
          <div className="grid gap-6">
            {posts.map((post) => (
              <ArticleCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg mb-4">📝</div>
            <p className="text-gray-600">
              还没有文章，开始写你的第一篇技术笔记吧！
            </p>
            <p className="text-sm text-gray-500 mt-2">
              在 <code className="bg-gray-100 px-2 py-1 rounded">content/</code> 目录下创建 Markdown 文件
            </p>
          </div>
        )}
      </div>
    </div>
  )
}