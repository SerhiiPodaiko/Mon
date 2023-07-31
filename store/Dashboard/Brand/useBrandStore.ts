import {create} from "zustand"

import {getCards} from "@lib/api/Dashboard/brand/billing/getCards"
import {Card} from "@lib/api/Dashboard/brand/billing/models"


export interface IBrandStore {
	loading: boolean
	loadingCards: boolean
	brandCards: Card[]

	getBrandCards: () => void
}


const useBrandStore = create<IBrandStore>()((set) => ({
	loading: true,
	loadingCards: true,
	brandCards: [],

	getBrandCards: async () => {
		const res = await getCards()

		if (res) {
			set(() => ({
				loadingCards: false,
				brandCards: res
			}))
		}
	}
}))

export default useBrandStore