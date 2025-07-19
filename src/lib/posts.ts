import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkHtml from 'remark-html'
// import remarkPrism from 'remark-prism'

const postsDirectory = path.join(process.cwd(), 'content')

export interface Post {
  slug: string
  title: string
  date: string
  excerpt: string
  content: string
  tags: string[]
  readTime?: number
}

// 确保content目录存在
function ensureContentDirectory() {
  if (!fs.existsSync(postsDirectory)) {
    fs.mkdirSync(postsDirectory, { recursive: true })
  }
}

// 获取所有文章
export async function getAllPosts(): Promise<Post[]> {
  ensureContentDirectory()
  
  try {
    const fileNames = fs.readdirSync(postsDirectory)
    const markdownFiles = fileNames.filter(name => name.endsWith('.md'))
    
    if (markdownFiles.length === 0) {
      return []
    }

    const allPostsData = await Promise.all(
      markdownFiles.map(async (fileName) => {
        const slug = fileName.replace(/\.md$/, '')
        return await getPostBySlug(slug)
      })
    )

    // 按日期排序
    return allPostsData
      .filter(post => post !== null)
      .sort((a, b) => (a!.date < b!.date ? 1 : -1)) as Post[]
  } catch (error) {
    console.error('Error reading posts:', error)
    return []
  }
}

// 根据slug获取文章
export async function getPostBySlug(slug: string): Promise<Post | null> {
  ensureContentDirectory()
  
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`)
    
    if (!fs.existsSync(fullPath)) {
      return null
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    // 处理Markdown内容
    const processedContent = await remark()
      .use(remarkHtml, { sanitize: false })
      .process(content)
    
    const contentHtml = processedContent.toString()

    // 计算阅读时间（假设每分钟200字）
    const readTime = Math.ceil(content.length / 200)

    return {
      slug,
      title: data.title || slug,
      date: data.date || new Date().toISOString(),
      excerpt: data.excerpt || content.substring(0, 150) + '...',
      content: contentHtml,
      tags: data.tags || [],
      readTime,
    }
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error)
    return null
  }
}

// 获取所有标签
export async function getAllTags(): Promise<string[]> {
  const posts = await getAllPosts()
  const tags = posts.flatMap(post => post.tags)
  return Array.from(new Set(tags)).sort()
}

// 根据标签获取文章
export async function getPostsByTag(tag: string): Promise<Post[]> {
  const posts = await getAllPosts()
  return posts.filter(post => post.tags.includes(tag))
}

// 搜索文章
export async function searchPosts(query: string): Promise<Post[]> {
  const posts = await getAllPosts()
  const lowercaseQuery = query.toLowerCase()
  
  return posts.filter(post => 
    post.title.toLowerCase().includes(lowercaseQuery) ||
    post.excerpt.toLowerCase().includes(lowercaseQuery) ||
    post.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  )
}