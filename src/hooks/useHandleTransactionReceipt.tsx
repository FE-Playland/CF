import { ContractTransaction } from "ethers";
import { Box, useToast } from "@chakra-ui/react";
import React from "react";

export default function useHandleTransactionReceipt(): (
	tx: Promise<ContractTransaction>
) => Promise<void> {
	const toast = useToast();
	const toastIdRef = React.useRef<string | number | undefined>();

	return React.useCallback(
		async (tx: Promise<ContractTransaction>) => {
			try {
				const receipt = await tx;
				toastIdRef.current = toast({
					status: "info",
					position: "top-right",
					isClosable: true,
					title: "Transaction Send Success",
					description: (
						<Box>
							Please wait for transaction mine.{" "}
							<a
								target="__blank"
								href={`https://bscscan.com/tx/${receipt.hash}`}
							>
								Txid
							</a>
						</Box>
					),
				});
				await receipt.wait(1);
				toast({
					status: "success",
					position: "top-right",
					isClosable: true,
					title: "Transaction Success",
				});
			} catch (e) {
				console.error(e);
				toast({
					status: "error",
					position: "top-right",
					isClosable: true,
					title: "Transaction Failed",
					description: "Tx Failed:" + e.message,
					duration: 6000,
				});
			} finally {
				if (toastIdRef.current) toast.close(toastIdRef.current!!);
			}
		},
		[toast]
	);
}
