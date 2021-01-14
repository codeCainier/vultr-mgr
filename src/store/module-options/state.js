import { LocalStorage } from 'quasar'

export default function () {
    return {
        regions: LocalStorage.getItem('regions') || []
    }
}
