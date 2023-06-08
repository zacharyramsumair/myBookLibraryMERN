import React from "react";
import { Container, Grid, List, ListItem, Typography } from "@mui/material";
import FramingLeft from "../BlockFraming/FramingLeft";
import FramingRight from "../BlockFraming/FramingRight";
import FramingRightTopBand from "../BlockFraming/FramingRightTopBand";

type Props = {};

const DashboardComponent = (props: Props) => {
	return (
		<Container
			maxWidth="xl"
			sx={{
				backgroundColor: "#fff",
				borderRadius: 2,
				boxShadow:
					"0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
				minHeight: 200,
				maxHeight: "90vh",
				margin: 3,
				padding: "0 !important",
			}}

		>
			<Grid container>
				<FramingLeft />

				<FramingRight>
					<Grid
						className="hideScrollbar"
						item
						xs={12}
						md={10}
						sx={{
							backgroundColor: "lightgray",
							height: "90vh",
							overflow: "hidden",
							overflowY: "scroll",
							borderTopLeftRadius: { xs: 10, md: 0 },
							borderBottomLeftRadius: { xs: 10, md: 0 },
							borderTopRightRadius: 10,
							borderBottomRightRadius: 10,
						}}
					>

						<FramingRightTopBand/>
						<Typography variant="body1">
							Lorem ipsum, dolor sit amet consectetur adipisicing elit.
							Sunt, praesentium adipisci, fugit voluptates pariatur harum
							eveniet ullam vitae rerum tempora laboriosam dolorem
							necessitatibus? Natus vel dolore in debitis. Id perferendis
							ipsum, voluptatibus consequatur cumque quod vel quae
							pariatur, earum eveniet ab sequi. Ut dolores nihil
							molestias necessitatibus excepturi natus blanditiis, cum
							porro facilis error sapiente recusandae, consectetur vitae!
							Debitis aliquam similique iste nesciunt. Aspernatur
							voluptate porro optio quae veritatis animi. Molestiae
							veritatis repellendus nam. Vel ipsa facere, laudantium
							impedit laborum animi amet, nobis hic tempore quibusdam
							corrupti quos aliquam veritatis. Beatae itaque maiores aut,
							eaque deleniti ratione voluptatibus, eum libero voluptates,
							accusamus provident sed debitis nulla illo id suscipit
							molestiae numquam nemo quam quo pariatur consequatur
							officiis. Et magnam voluptas, est neque in aperiam illum
							inventore sed, velit, consequatur exercitationem tempore
							iure fugit facere beatae? Necessitatibus impedit
							distinctio, non similique rerum ratione itaque explicabo
							quisquam ad debitis! Tempora sed fugit vel ex enim quisquam
							facere, esse unde corporis obcaecati blanditiis error
							explicabo impedit saepe culpa ullam. Suscipit rem dolorem
							optio laboriosam incidunt pariatur at odio debitis nemo
							libero dicta, excepturi ipsa corrupti aliquid veniam iusto
							deleniti ad, praesentium magni animi quis eos iure? Qui,
							quibusdam accusantium eligendi rem vero cupiditate autem
							tempore enim, nemo exercitationem optio odio? Ad dolor
							nulla consequatur temporibus, error non, dolorem ea
							exercitationem fugiat in eos illum ipsam tenetur suscipit
							commodi, amet aliquam sapiente soluta quam incidunt. Atque
							voluptas distinctio doloribus blanditiis eos recusandae sed
							dolorem earum quibusdam cum odit beatae aliquid, ex enim!
							Recusandae, neque amet! Voluptatum iste distinctio
							praesentium sed, velit rem quae vitae minus aliquam id
							officiis quaerat accusantium sequi doloremque ipsum odit
							nam vel magni unde voluptates quam, aspernatur veniam
							saepe. Repellendus, laboriosam voluptatum quasi rem, omnis
							cumque a odit eligendi reprehenderit quas cupiditate?
							Asperiores, beatae, vel recusandae quia at ea numquam harum
							sequi provident nihil odio deserunt similique molestiae
							fugit voluptate magni ex amet voluptatibus! Error hic esse
							et sequi exercitationem voluptate atque id quis saepe.
							Consequuntur, explicabo veritatis, dolorum est eos porro ad
							ducimus fuga architecto minus illo magnam asperiores? Sit
							enim pariatur perferendis quae ex exercitationem suscipit
							tempora? Hic consequatur amet modi, error magni a
							exercitationem adipisci facilis fugit! Illo dolorem ad
							vitae, provident voluptates illum itaque quia nesciunt
							tenetur, optio repellendus possimus vel assumenda. Beatae,
							facilis voluptatibus? Sunt distinctio, modi soluta a harum
							itaque quo necessitatibus asperiores cum natus dignissimos.
							Et sequi id voluptate consectetur impedit tempore, cumque,
							ex ullam dicta ad officia corrupti? Quos labore similique
							accusantium harum tenetur accusamus illo aliquam cumque
							facilis neque architecto corrupti doloremque culpa deserunt
							nihil iusto, aspernatur sint. Fuga nam repellendus,
							corporis voluptas quam tempore reiciendis suscipit ipsum
							minus autem expedita, ullam eos beatae vero explicabo
							doloribus molestiae quaerat laudantium itaque dolores
							magnam quas eligendi aspernatur eum! Quis vel, accusantium
							perspiciatis recusandae cupiditate quos maiores doloribus
							consequatur, pariatur aliquam amet nisi vero ratione
							numquam consectetur rerum natus nulla praesentium labore
							quae! Nihil doloremque provident repellat. Quis unde,
							quibusdam natus nemo impedit est recusandae quasi dolore!
							Consequatur molestiae asperiores voluptates nihil harum!
							Lorem ipsum, dolor sit amet consectetur adipisicing elit.
							Sunt, praesentium adipisci, fugit voluptates pariatur harum
							eveniet ullam vitae rerum tempora laboriosam dolorem
							necessitatibus? Natus vel dolore in debitis. Id perferendis
							ipsum, voluptatibus consequatur cumque quod vel quae
							pariatur, earum eveniet ab sequi. Ut dolores nihil
							molestias necessitatibus excepturi natus blanditiis, cum
							porro facilis error sapiente recusandae, consectetur vitae!
							Debitis aliquam similique iste nesciunt. Aspernatur
							voluptate porro optio quae veritatis animi. Molestiae
							veritatis repellendus nam. Vel ipsa facere, laudantium
							impedit laborum animi amet, nobis hic tempore quibusdam
							corrupti quos aliquam veritatis. Beatae itaque maiores aut,
							eaque deleniti ratione voluptatibus, eum libero voluptates,
							accusamus provident sed debitis nulla illo id suscipit
							molestiae numquam nemo quam quo pariatur consequatur
							officiis. Et magnam voluptas, est neque in aperiam illum
							inventore sed, velit, consequatur exercitationem tempore
							iure fugit facere beatae? Necessitatibus impedit
							distinctio, non similique rerum ratione itaque explicabo
							quisquam ad debitis! Tempora sed fugit vel ex enim quisquam
							facere, esse unde corporis obcaecati blanditiis error
							explicabo impedit saepe culpa ullam. Suscipit rem dolorem
							optio laboriosam incidunt pariatur at odio debitis nemo
							libero dicta, excepturi ipsa corrupti aliquid veniam iusto
							deleniti ad, praesentium magni animi quis eos iure? Qui,
							quibusdam accusantium eligendi rem vero cupiditate autem
							tempore enim, nemo exercitationem optio odio? Ad dolor
							nulla consequatur temporibus, error non, dolorem ea
							exercitationem fugiat in eos illum ipsam tenetur suscipit
							commodi, amet aliquam sapiente soluta quam incidunt. Atque
							voluptas distinctio doloribus blanditiis eos recusandae sed
							dolorem earum quibusdam cum odit beatae aliquid, ex enim!
							Recusandae, neque amet! Voluptatum iste distinctio
							praesentium sed, velit rem quae vitae minus aliquam id
							officiis quaerat accusantium sequi doloremque ipsum odit
							nam vel magni unde voluptates quam, aspernatur veniam
							saepe. Repellendus, laboriosam voluptatum quasi rem, omnis
							cumque a odit eligendi reprehenderit quas cupiditate?
							Asperiores, beatae, vel recusandae quia at ea numquam harum
							sequi provident nihil odio deserunt similique molestiae
							fugit voluptate magni ex amet voluptatibus! Error hic esse
							et sequi exercitationem voluptate atque id quis saepe.
							Consequuntur, explicabo veritatis, dolorum est eos porro ad
							ducimus fuga architecto minus illo magnam asperiores? Sit
							enim pariatur perferendis quae ex exercitationem suscipit
							tempora? Hic consequatur amet modi, error magni a
							exercitationem adipisci facilis fugit! Illo dolorem ad
							vitae, provident voluptates illum itaque quia nesciunt
							tenetur, optio repellendus possimus vel assumenda. Beatae,
							facilis voluptatibus? Sunt distinctio, modi soluta a harum
							itaque quo necessitatibus asperiores cum natus dignissimos.
							Et sequi id voluptate consectetur impedit tempore, cumque,
							ex ullam dicta ad officia corrupti? Quos labore similique
							accusantium harum tenetur accusamus illo aliquam cumque
							facilis neque architecto corrupti doloremque culpa deserunt
							nihil iusto, aspernatur sint. Fuga nam repellendus,
							corporis voluptas quam tempore reiciendis suscipit ipsum
							minus autem expedita, ullam eos beatae vero explicabo
							doloribus molestiae quaerat laudantium itaque dolores
							magnam quas eligendi aspernatur eum! Quis vel, accusantium
							perspiciatis recusandae cupiditate quos maiores doloribus
							consequatur, pariatur aliquam amet nisi vero ratione
							numquam consectetur rerum natus nulla praesentium labore
							quae! Nihil doloremque provident repellat. Quis unde,
							quibusdam natus nemo impedit est recusandae quasi dolore!
							Consequatur molestiae asperiores voluptates nihil harum!
							Lorem ipsum, dolor sit amet consectetur adipisicing elit.
							Sunt, praesentium adipisci, fugit voluptates pariatur harum
							eveniet ullam vitae rerum tempora laboriosam dolorem
							necessitatibus? Natus vel dolore in debitis. Id perferendis
							ipsum, voluptatibus consequatur cumque quod vel quae
							pariatur, earum eveniet ab sequi. Ut dolores nihil
							molestias necessitatibus excepturi natus blanditiis, cum
							porro facilis error sapiente recusandae, consectetur vitae!
							Debitis aliquam similique iste nesciunt. Aspernatur
							voluptate porro optio quae veritatis animi. Molestiae
							veritatis repellendus nam. Vel ipsa facere, laudantium
							impedit laborum animi amet, nobis hic tempore quibusdam
							corrupti quos aliquam veritatis. Beatae itaque maiores aut,
							eaque deleniti ratione voluptatibus, eum libero voluptates,
							accusamus provident sed debitis nulla illo id suscipit
							molestiae numquam nemo quam quo pariatur consequatur
							officiis. Et magnam voluptas, est neque in aperiam illum
							inventore sed, velit, consequatur exercitationem tempore
							iure fugit facere beatae? Necessitatibus impedit
							distinctio, non similique rerum ratione itaque explicabo
							quisquam ad debitis! Tempora sed fugit vel ex enim quisquam
							facere, esse unde corporis obcaecati blanditiis error
							explicabo impedit saepe culpa ullam. Suscipit rem dolorem
							optio laboriosam incidunt pariatur at odio debitis nemo
							libero dicta, excepturi ipsa corrupti aliquid veniam iusto
							deleniti ad, praesentium magni animi quis eos iure? Qui,
							quibusdam accusantium eligendi rem vero cupiditate autem
							tempore enim, nemo exercitationem optio odio? Ad dolor
							nulla consequatur temporibus, error non, dolorem ea
							exercitationem fugiat in eos illum ipsam tenetur suscipit
							commodi, amet aliquam sapiente soluta quam incidunt. Atque
							voluptas distinctio doloribus blanditiis eos recusandae sed
							dolorem earum quibusdam cum odit beatae aliquid, ex enim!
							Recusandae, neque amet! Voluptatum iste distinctio
							praesentium sed, velit rem quae vitae minus aliquam id
							officiis quaerat accusantium sequi doloremque ipsum odit
							nam vel magni unde voluptates quam, aspernatur veniam
							saepe. Repellendus, laboriosam voluptatum quasi rem, omnis
							cumque a odit eligendi reprehenderit quas cupiditate?
							Asperiores, beatae, vel recusandae quia at ea numquam harum
							sequi provident nihil odio deserunt similique molestiae
							fugit voluptate magni ex amet voluptatibus! Error hic esse
							et sequi exercitationem voluptate atque id quis saepe.
							Consequuntur, explicabo veritatis, dolorum est eos porro ad
							ducimus fuga architecto minus illo magnam asperiores? Sit
							enim pariatur perferendis quae ex exercitationem suscipit
							tempora? Hic consequatur amet modi, error magni a
							exercitationem adipisci facilis fugit! Illo dolorem ad
							vitae, provident voluptates illum itaque quia nesciunt
							tenetur, optio repellendus possimus vel assumenda. Beatae,
							facilis voluptatibus? Sunt distinctio, modi soluta a harum
							itaque quo necessitatibus asperiores cum natus dignissimos.
							Et sequi id voluptate consectetur impedit tempore, cumque,
							ex ullam dicta ad officia corrupti? Quos labore similique
							accusantium harum tenetur accusamus illo aliquam cumque
							facilis neque architecto corrupti doloremque culpa deserunt
							nihil iusto, aspernatur sint. Fuga nam repellendus,
							corporis voluptas quam tempore reiciendis suscipit ipsum
							minus autem expedita, ullam eos beatae vero explicabo
							doloribus molestiae quaerat laudantium itaque dolores
							magnam quas eligendi aspernatur eum! Quis vel, accusantium
							perspiciatis recusandae cupiditate quos maiores doloribus
							consequatur, pariatur aliquam amet nisi vero ratione
							numquam consectetur rerum natus nulla praesentium labore
							quae! Nihil doloremque provident repellat. Quis unde,
							quibusdam natus nemo impedit est recusandae quasi dolore!
							Consequatur molestiae asperiores voluptates nihil harum!
						</Typography>
					</Grid>
				</FramingRight>
			</Grid>
			;
		</Container>
	);
};

export default DashboardComponent;
