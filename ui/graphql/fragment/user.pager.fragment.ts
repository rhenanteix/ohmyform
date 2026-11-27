import { gql } from '@apollo/client/core'

export interface UserPagerFragment {
  id: string
  username: string
  roles: string[]
  verifiedEmail: boolean
  email: string
  created: string
}

export const USER_PAGER_FRAGMENT = gql`
  fragment User on User {
    id
    username
    roles
    verifiedEmail
    email
    created
  }
`
