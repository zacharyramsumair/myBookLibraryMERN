import {
	Box,
	Container,
	Typography,
	Grid,
	useMediaQuery,
	Theme,
} from "@mui/material";
import React from "react";
import FAQItem from "./FAQItem";

type Props = {};

const FAQ = (props: Props) => {
	const isSmallScreen = useMediaQuery((theme: Theme) =>
		theme.breakpoints.down("md")
	);

	return (
		<Box sx={{ py: 10, overflow: "hidden" }}>
			<Container maxWidth="lg" sx={{ overflow: "hidden" }}>
				<Typography
					variant={isSmallScreen ? "h5" : "h3"}
					component="h2"
					sx={{ py: 2 }}
				>
					Frequently Asked Questions
				</Typography>

				<Typography variant="body1" component="p">
					If you have any further questions, please contact us.
				</Typography>

				<Box sx={{ py: 4 }}>
					<Grid container spacing={2}>
						<Grid item xs={12} md={6} lg={6}>
							<FAQItem
								question="Do I need to pay to read?"
								answer="No. There are many free blocks available. However, there are some paid ones."
							/>
						</Grid>
						<Grid
							item
							xs={12}
							md={6}
							lg={6}
							style={{ gridRow: "span 2" }}
						>
							<FAQItem
								question="How do I buy blocks?"
								answer="You purchase them using gems? You could buy gems from the store or get gems every month when you sign up to our Standard or Premium tier"
							/>
						</Grid>
						<Grid item xs={12} md={6} lg={6}>
							<FAQItem
								question="Should I get the Standard or Premium Tier?"
								answer="If you are just here to read, get the Standard tier. If you also want to write and make money from your work, get the Premium tier. The Premium tier allows you to create as many paid Blocks as you like, where normally you have to pay to create a paid post."
							/>
						</Grid>
						<Grid item xs={12} md={6} lg={6}>
							<FAQItem
								question="Why Blocks?"
								answer="We call them Blocks because with every book, article, summary you read you are building upon yourself and hopefully moving towards the person you want to be."
							/>
						</Grid>
						<Grid item xs={12} md={6} lg={6}>
							<FAQItem
								question="How you could make money?"
                answer={`When people buy your paid blocks, the number of gems it cost them translates to money for you.\nExample: If 20 people buy your 5 gem block, you make $1.00.`}
                />
						</Grid>
						<Grid item xs={12} md={6} lg={6}>
							<FAQItem
								question="Coming soon"
								answer="• Comments • Followers • Direct Messages • Tags Page • Google Login • Updated Dashboard with more Recommendations "
							/>
						</Grid>
					</Grid>
				</Box>
			</Container>
		</Box>
	);
};
export default FAQ;
