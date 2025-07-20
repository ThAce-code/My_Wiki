// ❌ 不要写 'use client'，让它默认是 Server Component
import { getAllPosts } from '@/lib/posts'
import ArticleCard from '@/components/ArticleCard'
import ParticlesInit from '@/components/ParticlesInit'
import SearchBar from '@/components/SearchBar'
import ScrollEffects from '@/components/ScrollEffects'

export default async function Home() {
  // 服务端直接跑 getAllPosts，用 Node.js 的 fs 没问题
  const posts = await getAllPosts()

  return (
    <>
      <ScrollEffects />
      {/* 导航元素 - 移到黑框外面 */}
      <div className="fixed top-0 left-0 right-0 z-50 pt-6">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            {/* 搜索框居中 */}
            <div className="flex-1 flex justify-center">
              <div className="max-w-md w-full">
                <SearchBar />
              </div>
            </div>

            {/* 右侧菜单 - 绝对定位 */}
            <div className="absolute right-6 flex items-center space-x-12 text-white text-lg">
              <a href="/" className="hover:text-gray-300 transition-colors py-2">
                首页
              </a>
              <a href="/tags" className="hover:text-gray-300 transition-colors py-2">
                标签
              </a>
              <a href="/about" className="hover:text-gray-300 transition-colors py-2">
                关于
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300 transition-colors py-2"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-container-wrapper">
        {/* 头部介绍 - 全宽黑框 */}
        <div className="hero-container">
          <div id="particles-js" className="particles-container"></div>
          <ParticlesInit />
          
          <div className="text-center flex flex-col justify-center h-full relative z-10 -mt-32">
            <h1 className="text-7xl font-bold text-white mb-6 tracking-wide title-glow">
              ThAce的wiki
            </h1>
            <p className="text-2xl text-gray-300 font-light">
              记录学习过程，分享技术心得
            </p>
          </div>
        </div>
        
        <div className="max-w-4xl mx-auto mt-24">
          {/* 统计信息 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-lg p-6 shadow-sm border scroll-animate article-card-hover" style={{transitionDelay: '0.1s'}}>
              <div className="text-2xl font-bold text-blue-600">{posts.length}</div>
              <div className="text-gray-600">技术文章</div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm border scroll-animate article-card-hover" style={{transitionDelay: '0.2s'}}>
              <div className="text-2xl font-bold text-green-600">
                {new Set(posts.flatMap(post => post.tags)).size}
              </div>
              <div className="text-gray-600">技术标签</div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-sm border scroll-animate article-card-hover" style={{transitionDelay: '0.3s'}}>
              <div className="text-2xl font-bold text-purple-600">
                {posts.reduce((total, post) => total + (post.readTime || 5), 0)}
              </div>
              <div className="text-gray-600">总阅读时间(分钟)</div>
            </div>
          </div>

          {/* 文章列表 */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 scroll-animate">
              最新文章
            </h2>
            {posts.length > 0 ? (
              <div className="grid gap-16">
                {posts.map((post, index) => (
                  <div key={post.slug} className="scroll-animate article-card-hover" style={{transitionDelay: `${index * 0.1}s`}}>
                    <ArticleCard post={post} />
                  </div>
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
      </div>
    </>
  )
}
