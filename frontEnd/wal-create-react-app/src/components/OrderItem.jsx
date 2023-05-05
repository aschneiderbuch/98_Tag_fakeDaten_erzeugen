


import React from 'react'

import '../components/Orderitem.scss'

export const OrderItem = ({ order }) => {
    return (
        <section className='orderItem'>
            <h1>OrderItem</h1>
            <p>Datum: {order.date} </p>
            <p>Status: {order.state} </p>
            <p>Summe: {order.sum} </p>
            <p >Products: {order.products.map((product, index) => {
               return <p style={{display:"flex", flex:''}} key={index}>{product}</p>
            })}
            </p>
        </section>
    )
}
// css 