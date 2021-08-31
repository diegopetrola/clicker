export default function Layout({ children }) {
  return (
    <div className="relative py-3 sm:max-w-xl sm:mx-auto">
      <div className="relative px-4 py-10 bg-blue-100 shadow-lg sm:rounded-3xl sm:p-20">
        {children}
      </div>
    </div>
  )
}