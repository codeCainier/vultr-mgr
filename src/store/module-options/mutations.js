import { LocalStorage } from 'quasar'

export function SET_REGIONS (state, value) {
    state.regions = value
    LocalStorage.set('regions', value)
}
