
import './App.css';
import { useEffect, useState } from 'react';
import listPokemons from './data.json';
import styled from 'styled-components';

const Container = styled.div`
	display: flex;
	width: 100%;
	height: 100%;
	justify-content: center;
	flex-direction: column;
	justify-content: center;
	text-align: center;
`;
const Body = styled.div`
	display: flex;
	flex-wrap: wrap;
	width: 100%;
	height: 100%;
	justify-content: center;
`;

const Card = styled.div`
	display: flex;
	flex-direction: column;
	width: 250px;
	height: 300px;
	border-radius: 6px;
	border: 1px solid black;
	justify-content: center;
	text-align: center;
	padding: 12px;
	margin: 12px;
`;

function App() {
	const [data, setData] = useState([]);
	const [toShow, setToShow] = useState([]);

	const colors = {
		grass: 'green',
		poison: 'purple',
		fire: 'orange',
		flying: `linear-gradient(
      to top,
      grey 0%,
      grey 50%,
      blue 50%,
      blue 100%
    )`,
		water: 'blue',
		bug: 'green',
		normal: 'grey',
		electric: 'yellow',
		ground: 'brown',
		fairy: 'pink',
		fighting: 'brown',
		psychic: 'pink',
		rock: 'grey',
		ghost: 'blue',
		dark: 'black',
		dragon: `linear-gradient(
      to top,
      orange 0%,
      orange 50%,
      red 50%,
      red 100%
    )`,
		steel: `linear-gradient(
      to top,
      pink 0%,
      pink 50%,
      paleturquoise 50%,
      paleturquoise 100%
    )`,
	};
	useEffect(() => {
		const arrayOfPromises = [];
		listPokemons.forEach((item) => {
			arrayOfPromises.push(fetch(item.url).then((result) => result.json()));
		});
		Promise.all(arrayOfPromises).then((values) => {
			setToShow(values);
			setData(values);
		});
	}, []);
	const handler = (e) => {
		let tmp = data.filter((item) =>
			{console.log(item); return item.name.toLowerCase().includes(e.target.value.toLowerCase())},
		);
		setToShow(tmp);
	};
	return (
		<Container>
			<h2 style={{color: 'black', stroke: 'blue', strokeWidth: 2}}>Pokedex</h2>
			{!data.length && <h3>Loading pokedex...</h3>}
			<input
				onChange={handler}
				style={{
					width: 200,
					height: 30,
					border: 'none',
					display: 'flex',
					alignSelf: 'end',
					marginRight: '10%',
					borderBottom: '1px solid',
				}}
				placeholder='search'
			/>

			<Body>
				{toShow.map((item, index) => {
					return (
						<Card>
							<div style={{ width: '100%', justifyContent: 'center' }}>
								<img
									height={'200'}
									width='200'
									src={item?.sprites?.other?.dream_world?.front_default}
									alt=''
								/>
							</div>
							<div
								style={{
									textAlign: 'left',
									color: 'grey',
									fontFamily: '"Flexo-Demi",arial,sans-serif',
									fontSize: 12,
									marginBottom: 5,
								}}
							>{`Nº.${index}`}</div>
							<div
								style={{
									textTransform: 'capitalize',
									width: '100%',
									justifyContent: 'center',
									textAlign: 'left',
									fontFamily: '"Flexo-Demi",arial,sans-serif',
									fontSize: '16px',
									fontWeight: 'bold',
									marginBottom: 10,
								}}
							>
								{item.name}
							</div>
							<div style={{ display: 'flex' }}>
								{item.types.map((it) => {
									return (
										<div
											style={{
												marginRight: 10,
												padding: 4,
												borderRadius: 4,
												color: 'white',
												fontWeight: 'bold',
												textTransform: 'capitalize',
												fontSize: 10,
												background: colors[it.type.name],
												width: 50,
											}}
										>
											{it.type.name}
										</div>
									);
								})}
							</div>
						</Card>
					);
				})}
			</Body>
		</Container>
	);
}

export default App;
