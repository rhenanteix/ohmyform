import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { withAuth } from '../../components/with.auth'
import Onboarding from '../../components/onboarding/onboarding'
import { useMeQuery } from '../../graphql/query/me.query'

const OnboardingPage: React.FC = () => {
  const router = useRouter()
  const { data, loading } = useMeQuery()

  useEffect(() => {
    if (!loading && data?.me?.onboardingCompleted) {
      void router.replace('/admin')
    }
  }, [
    loading,
    data,
    router,
  ])

  if (loading) return null

  return (
    <Onboarding />
  )
}

export default withAuth(OnboardingPage, ['admin'])
