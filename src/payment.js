import React, { useEffect } from 'react';
import axios from 'axios';

const Payment = () => {
  useEffect(() => {
    const jquery = document.createElement("script");
    jquery.src = "http://code.jquery.com/jquery-1.12.4.min.js";
    const iamport = document.createElement("script");
    iamport.src = "http://cdn.iamport.kr/js/iamport.payment-1.1.7.js";
    document.head.appendChild(jquery);
    document.head.appendChild(iamport);
    return () => {
      document.head.removeChild(jquery);
      document.head.removeChild(iamport);
    };
  }, []);

  const fetchMerchantUid = async (exhibitId, amount) => {
    try {
      const response = await axios.post('http://127.0.0.1/payment', {
        exhibit_id: exhibitId,
        amount: amount,
      });
      return { merchantUid: response.data.merchant_uid, amount: response.data.amount };
    } catch (error) {
      console.error('merchant_uid를 가져오는 중 에러가 발생했습니다.', error);
      return null;
    }
  };

  const requestPay = async (exhibitId, amount) => {
    const orderInfo = await fetchMerchantUid(exhibitId, amount);
    alert(orderInfo.merchantUid + " " + orderInfo.amount);
    if (!orderInfo) {
      alert('결제 정보를 가져오는데 실패했습니다.');
      return;
    }

    const { IMP } = window;
    IMP.init('imp20842147');
    
    IMP.request_pay({
      pg: 'kakaopay.TC0ONETIME',
      pay_method: 'card',
      merchant_uid: orderInfo.merchantUid,
      name: '테스트 상품',
      amount: orderInfo.amount,
      buyer_email: 'test@naver.com',
      buyer_name: '코드쿡',
      buyer_tel: '010-1234-5678',
      buyer_addr: '서울특별시',
      buyer_postcode: '123-456'
    }, async (rsp) => {
      try {
        const { data } = await axios.post('http://127.0.0.1/payment/verifyIamport/' + rsp.imp_uid);
        console.log(data.verified); 
        if (data.verified) { 
          alert('결제 성공');
          const {ticket} = await axios.post('http://127.0.0.1/ticket')
        } else {
          alert('결제 실패');
        }
      } catch (error) {
        console.error('결제 검증 중 에러 발생:', error);
        alert('결제 실패');
      }
    });
  };

  return (
    <div>
      <button onClick={() => requestPay(1, 5)}>결제하기</button>
    </div>
  );
};

export default Payment;