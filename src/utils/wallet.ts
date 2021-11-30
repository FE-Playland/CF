export const formattedAddress = (address: string, preCount: number = 4) => {
	if (!address || address.length < 5) {
		return "";
	}
	const prefix = address.substr(0, preCount);
	const suffix = address.substr(-4);

	return `${prefix}...${suffix}`;
};
