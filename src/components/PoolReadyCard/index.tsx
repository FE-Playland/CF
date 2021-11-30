import { Box } from "@chakra-ui/layout";

import "./style.css";
export interface IPoolReadyCard {
	tokenName: string;
	poolDesc: string;
	img: string;
	img2?: string;
}

export const PoolReadyCard: React.FunctionComponent<IPoolReadyCard> = (
	props
) => {
	return (
		<Box className="poolcard-container-ready">
			<Box
				sx={{
					gridArea: "icon",
					placeSelf: "center start",
					display: "flex",
				}}
			>
				<img src={props.img} width="35px" alt="logo" />
				{props.img2 ? (
					<img src={props.img2} width="35px" alt="sencondary logo" />
				) : null}
			</Box>
			<Box
				sx={{
					gridArea: "label",
					placeSelf: "center start",
					display: "flex",
					alignSelf: "center",
					flexDirection: "column",
					marginLeft: "8px",
				}}
			>
				<span
					style={{
						fontSize: "16px",
						fontWeight: "bolder",
						color: "#ec6998",
					}}
				>
					{props.tokenName.toUpperCase()}
				</span>
				<span
					style={{
						fontSize: "13px",
						fontWeight: "bolder",
						color: "#f087ad",
					}}
				>
					{props.poolDesc}
				</span>
			</Box>
			<Box
				sx={{
					gridArea: "return",
					alignItems: "center",
					placeSelf: "center",
					display: "flex",
					flexDirection: "column",
				}}
			>
				<Box className="poolcard-detail-apy">Coming Soon</Box>
			</Box>
		</Box>
	);
};
