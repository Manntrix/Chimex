import { BlankCard } from '@/components/molecules/Card'

export default function PostList({ title, posts }) {
  return (
    <div className='mt-8 mb-12'>
      <h3 className='text-black text-opacity-60 text-lg font-bold uppercase my-4'>
        {title}
      </h3>

      {posts?.map((post, index) => (
        <div key={index} className='border-b mb-4'>
          <BlankCard postId={post.post} />
        </div>
      ))}
    </div>
  )
}
