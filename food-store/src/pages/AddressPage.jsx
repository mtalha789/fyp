import React from 'react'
import { RestaurantAddressForm } from '../components/forms'
import { useParams } from 'react-router-dom'

export default function AddressPage() {
    const { id } = useParams();
  return (
    <div>
        <RestaurantAddressForm resId={id} />
    </div>
  )
}
