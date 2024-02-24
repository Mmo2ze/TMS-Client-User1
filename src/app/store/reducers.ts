import { createFeature, createReducer, on } from '@ngrx/store'
import { AuthStateInterface } from '../types/authStateInterface'
import { login } from './actions'
import { state } from '@angular/animations'

const initialState: AuthStateInterface = {
    phone: '',
    status: 'login',
    name: '',
    role: null,
    user: null,
    token: '',
}
const authFeature = createFeature({
    name: 'auth',
    reducer: createReducer(
        initialState,
        on(login, state => ({
            ...state,
            status: 'verify' as 'verify',
        }))
    ),
})

export const {
    name: authFeatureKey,
    reducer: authReducer,
    selectStatus,
    selectRole,
} = authFeature
