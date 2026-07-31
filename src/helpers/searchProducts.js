import ss from 'string-similarity'

export default (products, query) => {
	return products.filter(item => {
		if (
			ss.compareTwoStrings(item.name, query) > 0.25 ||
      ss.compareTwoStrings(item.brand, query) > 0.25
		) {
			return item
		}
		return null
	})
}
