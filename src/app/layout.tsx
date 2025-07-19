import './globals.css'
import Navigation from '@/components/Navigation'

export const metadata = {
  title: '我的技术Wiki',
  description: '个人技术笔记和知识分享',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className="font-sans">
        <div className="min-h-screen bg-gray-50">
          <Navigation />
          <main className="container mx-auto px-4 py-8">
            {children}
          </main>
          <footer className="bg-white border-t mt-12">
            <div className="container mx-auto px-4 py-6 text-center text-gray-600">
              <p>&copy; 2024 我的技术Wiki. 用 ❤️ 和 Next.js 构建</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}