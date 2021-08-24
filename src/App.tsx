import React, { useState } from "react";
import { useQuery } from "react-query";
//Components
import { LinearProgress, Grid, Drawer, Badge } from "@material-ui/core";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import Item from "./Items/Items";
//Styles
import { Wrapper, StyledButton } from "./App.styles";

export type CartItemType = {
	id: number;
	category: string;
	description: string;
	image: string;
	price: number;
	title: string;
	amount: number;
};

const getProducts = async (): Promise<CartItemType[]> =>
	await (await fetch("https://fakestoreapi.com/products")).json();

const App = () => {
	const [cartOpen, setCartOpen] = useState(false);
	const [cartItems, setCartItems] = useState([] as CartItemType[]);
	const { data, isLoading, error } = useQuery<CartItemType[]>(
		"products",
		getProducts
	);
	const getTotalItems = (items: CartItemType[]) => items.reduce((ack: number, item) => ack + item.amount, 0);
	const handleAddToCart = (clickedItem: CartItemType) => null;
	const removeFromCart = () => null;

	if(isLoading) return <LinearProgress />
	if(error) return <div>Somethign went wrong!</div>

	return (
		<Wrapper>
			<Drawer anchor='right' open={cartOpen} onClose={() => setCartOpen(false)}>
				Cart is here
			</Drawer>
			<StyledButton onClick={() => setCartOpen(true)}>
				<Badge badgeContent={getTotalItems(cartItems)} color='error'></Badge>
				<AddShoppingCartIcon />
			</StyledButton>
			<Grid container spacing={3}>
				{data?.map(item => (
					<Grid item key={item.id} xs={12} sm={4}>
						<Item item={item} handleAddToCart={handleAddToCart} />
					</Grid>
				))}
			</Grid>
		</Wrapper>
	)
};

export default App;
