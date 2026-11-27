import { MutationHookOptions, MutationTuple, useMutation } from '@apollo/client'
import { gql } from '@apollo/client/core'

export interface Data {
  user: {
    id: string
    onboardingCompleted: boolean
  }
}

export interface Variables {}

export const MUTATION = gql`
  mutation completeOnboarding {
    user: completeOnboarding {
      id
      onboardingCompleted
    }
  }

`

export const useCompleteOnboardingMutation = (
  data?: MutationHookOptions<Data, Variables>
): MutationTuple<Data, Variables> => useMutation<Data, Variables>(MUTATION, data)
