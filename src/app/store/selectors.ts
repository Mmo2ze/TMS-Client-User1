import { AuthStateInterface } from '../types/authStateInterface'
import { createSelector } from '@ngrx/store'

export const selectFeature = (state: { auth: AuthStateInterface }) => state.auth

export const selectAuth = createSelector(
    selectFeature,
    (state: AuthStateInterface) => state
)
