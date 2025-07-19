import Link from 'next/link'
import { format } from 'date-fns'
import { zhCN } from 'date-fns/locale'

interface Post {
  slug: string
  title: string
  excerpt: string
  date: string
  tags: string[]
  readTime?: number
}

interface ArticleCardProps {
  post: Post
}

export default function ArticleCard({ post }: ArticleCardProps) {
  return (
    <article className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
      <div className="p-6">
        {/* 标题 */}
        <h2 className="text-xl font-semibold mb-3">
          <Link 
            href={`/${post.slug}`}
            className="text-gray-900 hover:text-blue-600 transition-colors"
          >
            {post.title}
          </Link>
        </h2>

        {/* 摘要 */}
        <p className="text-gray-600 mb-4 line-clamp-3">
          {post.excerpt}
        </p>

        {/* 标签 */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* 元信息 */}
        <div className="flex items-center justify-between text-sm text-gray-500">
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
      </div>
    </article>
  )
}