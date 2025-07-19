import { notFound } from 'next/navigation'
import { format } from 'date-fns'
import { zhCN } from 'date-fns/locale'
import { getPostBySlug, getAllPosts } from '@/lib/posts'
import MarkdownRenderer from '@/components/MarkdownRenderer'
import Link from 'next/link'

interface PageProps {
  params: {
    slug: string
  }
}

// 生成静态路径
export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

// 生成元数据
export async function generateMetadata({ params }: PageProps) {
  const post = await getPostBySlug(params.slug)
  
  if (!post) {
    return {
      title: '文章未找到',
    }
  }

  return {
    title: `${post.title} | 我的技术Wiki`,
    description: post.excerpt,
  }
}

export default async function PostPage({ params }: PageProps) {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* 返回按钮 */}
      <div className="mb-8">
        <Link 
          href="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          返回首页
        </Link>
      </div>

      {/* 文章头部 */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {post.title}
        </h1>
        
        <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-6">
          <time dateTime={post.date}>
            {format(new Date(post.date), 'yyyy年MM月dd日', { locale: zhCN })}
          </time>
          {post.readTime && (
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {post.readTime} 分钟阅读
            </span>
          )}
        </div>

        {/* 标签 */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag) => (
              <Link
                key={tag}
                href={`/tags/${tag}`}
                className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full hover:bg-blue-200 transition-colors"
              >
                #{tag}
              </Link>
            ))}
          </div>
        )}
      </header>

      {/* 文章内容 */}
      <article className="bg-white rounded-lg shadow-sm border p-8">
        <MarkdownRenderer content={post.content} />
      </article>

      {/* 分享按钮 */}
      <div className="mt-8 p-6 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">分享这篇文章</h3>
        <div className="flex gap-4">
          <button
            onClick={() => {
              if (typeof window !== 'undefined') {
                navigator.clipboard.writeText(window.location.href)
                alert('链接已复制到剪贴板！')
              }
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            复制链接
          </button>
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=https://my-wiki-thace-code.vercel.app/${post.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-blue-400 text-white rounded hover:bg-blue-500 transition-colors"
          >
            分享到 Twitter
          </a>
        </div>
      </div>
    </div>
  )
}