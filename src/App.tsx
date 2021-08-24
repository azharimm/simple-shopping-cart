import React, { useState } from "react";
import { useQuery } from "react-query";
//Components
import { LinearProgress, Grid, Drawer, Badge } from "@material-ui/core";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import Item from "./Items/Items";
import Cart from "./Cart/Cart";
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
	const getTotalItems = (items: CartItemType[]) =>
		items.reduce((ack: number, item) => ack + item.amount, 0);
	const handleAddToCart = (clickedItem: CartItemType) => {
		setCartItems((prev) => {
			//1. check if the items exist in the cart
			const isItemInCart = prev.find(
				(item) => item.id === clickedItem.id
			);
			if (isItemInCart) {
				return prev.map((item) =>
					item.id === clickedItem.id
						? { ...item, amount: item.amount + 1 }
						: item
				);
			}
			//2. check if first time
			return [...prev, { ...clickedItem, amount: 1 }];
		});
	};
	const removeFromCart = (id: number) => {
		setCartItems(prev => (
			prev.reduce((ack, item) => {
				if(item.id === id) {
					//1. check if amount === 1
					if(item.amount === 1) return ack;
					return [...ack, {...item, amount: item.amount - 1}];
				}else {
					return [...ack, item];
				}
			}, [] as CartItemType[])
		))
	};

	if (isLoading) return <LinearProgress />;
	if (error) return <div>Somethign went wrong!</div>;

	return (
		<Wrapper>
			<Drawer
				anchor="right"
				open={cartOpen}
				onClose={() => setCartOpen(false)}
			>
				<Cart
					cartItems={cartItems}
					addToCart={handleAddToCart}
					removeFromCart={removeFromCart}
				/>
			</Drawer>
			<StyledButton onClick={() => setCartOpen(true)}>
				<Badge
					badgeContent={getTotalItems(cartItems)}
					color="error"
				></Badge>
				<AddShoppingCartIcon />
			</StyledButton>
			<Grid container spacing={3}>
				{data?.map((item) => (
					<Grid item key={item.id} xs={12} sm={4}>
						<Item item={item} handleAddToCart={handleAddToCart} />
					</Grid>
				))}
			</Grid>
		</Wrapper>
	);
};

export default App;
