import { CardBody, CardHeader, User, Card } from '@nextui-org/react'
import React from 'react'
import { Rating } from './index'


export default function Review({ user, key, rating, comment, createdAt }) {
  return (
    <Card key={key} className='w-full'>
      <CardHeader>
        <User
          name={user.fullname}
          description={`@${user.username}`}
          avatarProps={{ src: user.avatar }}
        />
      </CardHeader>
      <CardBody className='flex flex-col gap-1'>
        <span className='flex items-center gap-2'>
          <Rating rating={rating} />
          <p>{new Date(createdAt).getDay() > 0 ? `${new Date(createdAt).getDay()} days ago` : `${new Date(createdAt).getHours()} hours ago`}</p>
        </span>
        <p>{comment}</p>
      </CardBody>
    </Card>
  )
}
