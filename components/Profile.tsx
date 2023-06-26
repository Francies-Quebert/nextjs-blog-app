import React from 'react'
import PromptCard from './PromptCard';
import { allPostType } from '@/types/typing';

interface ProfileProps {
  name: string | null,
  desc: string,
  data: any[],
  handleEdit?: (post:allPostType) => void,
  handleDelete?: (post:allPostType) => void
}

function Profile({ name, desc, data, handleEdit, handleDelete }:ProfileProps) {
  return (
    <section className='w-full'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>{name} Profile</span>
      </h1>
      <p className='desc text-left'>{desc}</p>

      <div className='mt-10 prompt_layout'>
        {data.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            handleEdit={() => handleEdit && handleEdit(post)}
            handleDelete={() => handleDelete && handleDelete(post)}
          />
        ))}
      </div>
    </section>
  );
}

export default Profile