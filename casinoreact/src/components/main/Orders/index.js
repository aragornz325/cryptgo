import React, { useState, useEffect } from 'react';
import { Wrapper, Table, THead, ColHead, Row, Col, TransferBtn, TBody, Vector, HeadImg } from './styles';
import transfer from '../../../controllers/store/transfer';
import getOrders from '../../../controllers/store/getOrders';

const Order = ({ user }) => {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const a = async() => {
        const newOrders = await getOrders();
        const result = newOrders.myOrders.filter(myOrder => {
            for(let order in newOrders.orders.orders){
                if(String(myOrder.coingateOrderId) === String(newOrders.orders.orders[order].id)){
                    return true;
                }
            }
            return false;
        })
        console.log(result)
        setOrders(result);
    }
    a();
  }, [])

  const handleTransfer = async(order) => {
    const response = await transfer(user._id, order.coins, order._id); 
    console.log(response.order, response.user)
    window.location = '/';
    return false;
  }

  return (
    <Wrapper>
      <Table>
          <THead>
              <ColHead>Order Number <HeadImg src="/assets/icons/tables/order.svg"/></ColHead>
              <ColHead>Amount <HeadImg src="/assets/icons/tables/coin.png"/></ColHead>
              <ColHead>Date <HeadImg src="/assets/icons/tables/calendar.png"/></ColHead>
              <ColHead>Status <HeadImg src="/assets/icons/tables/status.png"/></ColHead>
              <ColHead>CV Coins <HeadImg src="/assets/icons/tables/cvcoin.png"/></ColHead>
          </THead>
          <TBody>
              {orders.length ? orders.map((order, index) => {
                  if(order.userId === user._id){
                    console.log('order', order)
                      return (
                          <Row key={index}>
                              <Col onClick={() => window.open(`/transaction?order=${order.coingateOrderId}`)}> <Vector src="./assets/Vector.png" alt="vector" />  #{order.coingateOrderId}</Col>
                              <Col>U$D {order.paidAmount}</Col>
                              <Col>{order.createdAt}</Col>
                              <Col>{!order.synced && <TransferBtn onClick={ async() => { handleTransfer(order); } }>Transfer</TransferBtn>}</Col>
                              {/* <Col colored={true} status={order.synced}>{order.synced ? 'Tranfered' : 'Pending'}</Col> */}
                              <Col>{order.coins}</Col>
                          </Row>
                      )
                  }
              }) : ''}
          </TBody>
      </Table>
    </Wrapper>
  )
}

export default Order;