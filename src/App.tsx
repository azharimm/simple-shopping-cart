import React, { useState } from "react";
import { useQuery } from "react-query";
//Components
import { LinearProgress, Grid, Drawer, Badge } from "@material-ui/core";
import { AddShoppingCart } from "@material-ui/icons";
import Item from "./Items/Items";
//Styles
import { Wrapper } from "./App.styles";

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
	const { data, isLoading, error } = useQuery<CartItemType[]>(
		"products",
		getProducts
	);
	const getTotalItems = () => null;
	const handleAddToCart = (clickedItem: CartItemType) => null;
	const removeFromCart = () => null;

	if(isLoading) return <LinearProgress />
	if(error) return <div>Somethign went wrong!</div>

	return (
		<Wrapper>
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
