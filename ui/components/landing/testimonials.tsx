import React from 'react'
import { useTranslation } from 'react-i18next'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper'
import styled from 'styled-components'
import { Avatar } from 'antd'
import 'swiper/css'
import 'swiper/css/pagination'

const Wrap = styled.section`padding:80px 24px;`
const Title = styled.h2`font-size:clamp(28px,4vw,44px);font-weight:800;text-align:center;margin-bottom:40px;`
const Card = styled.div`padding:32px;border:1px solid #e2e8f0;border-radius:16px;background:#fff;`

export const Testimonials = () => {
  const { t } = useTranslation('landing')
  const items = [
    1, 2, 3,
  ]
  return (
    <Wrap>
      <Title>{t('testimonials.title')}</Title>
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 4000 }}
        pagination={{ clickable: true }}
        spaceBetween={24}
        slidesPerView={1}
        breakpoints={{ 768: { slidesPerView: 2 } }}
      >
        {items.map((i) => (
          <SwiperSlide key={i}>
            <Card>
              <p style={{ color: '#475569' }}>&ldquo;{t(`testimonials.q${i}`)}&rdquo;</p>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginTop: 16 }}>
                <Avatar>{t(`testimonials.n${i}`).charAt(0)}</Avatar>
                <div>
                  <strong>{t(`testimonials.n${i}`)}</strong>
                  <div style={{ color: '#64748b', fontSize: 13 }}>{t(`testimonials.r${i}`)}</div>
                </div>
              </div>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </Wrap>
  )
}
export default Testimonials
