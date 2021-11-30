import { Box } from "@chakra-ui/react";
import { PoolCard } from "../../components/PoolCard";
import { PoolReadyCard } from "../../components/PoolReadyCard";
import { TVLStateView } from "../../components/TVLCard";
import { useReadyPoolsStore } from "../../config/readyPools";
import { useVaultStore } from "../../config/valuts";

const Pools = () => {
	const vaultStore = useVaultStore();
	const readyStore = useReadyPoolsStore();

	return (
		<>
			<TVLStateView />
			{vaultStore.pools.map((item) => {
				return (
					<Box
						sx={{
							marginTop: "28px",
							width: "100%",
						}}
						key={item.poolName}
					>
						<PoolCard vault={item} key={item.poolName} />
					</Box>
				);
			})}

			{readyStore.pools.map((item) => {
				return (
					<Box sx={{ marginTop: "28px", width: "100%" }} key={item.poolDesc}>
						<PoolReadyCard
							tokenName={item.tokenName}
							poolDesc={item.poolDesc}
							img={item.img}
							img2={item.img2}
							key={item.poolDesc}
						/>
					</Box>
				);
			})}
		</>
	);
};

export default Pools;
