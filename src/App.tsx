import React, { useState } from "react";
import { useQuery } from "react-query";
//Components
import { LinearProgress, Grid, Drawer, Badge } from "@material-ui/core";
import { AddShoppingCart } from "@material-ui/icons";
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
	const handleAddToCart = () => null;
	const removeFromCart = () => null;

	if(isLoading) return <LinearProgress />
	if(error) return <div>Somethign went wrong!</div>

	return <div className="App">Start</div>;
};

export default App;
