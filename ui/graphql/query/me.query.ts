import { QueryHookOptions, QueryResult, useQuery } from '@apollo/client'
import { gql } from '@apollo/client/core'

interface Data {
  me: {
    id: string
    username: string
    email: string
    roles: string[]
    onboardingCompleted: boolean
  }
}

const QUERY = gql`
  query me {
    me {
      id
      email
      roles
      username
      onboardingCompleted
    }
  }
`

export const useMeQuery = (options?: QueryHookOptions<Data, unknown>): QueryResult<Data, unknown> =>
  useQuery<Data, unknown>(QUERY, options)
