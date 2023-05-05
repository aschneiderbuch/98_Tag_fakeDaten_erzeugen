


import React from 'react'

export const OrderItem = ({ order }) => {
    return (
        <section className=' orderItem'>
            <h1>OrderItem</h1>
            <p>Datum: {order.date} </p>
            <p>Status: {order.state} </p>
            <p>Summe: {order.sum} </p>
        </section>
    )
}
