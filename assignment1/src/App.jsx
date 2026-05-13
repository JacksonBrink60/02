import { useEffect, useState } from "react";

function App() {
	const [display, setDisplay] = useState(null);
	const [date, setDate] = useState("2026-05-04");

	async function getDisplay() {
		const response = await fetch(
			`https://site.api.espn.com/apis/site/v2/sports/baseball/mlb/scoreboard?dates=${date.replaceAll("-", "")}`,
			{
				headers: {
					Accept: "application/json",
				},
			},
		);
		const data = await response.json();
		return data;
	}

	useEffect(() => {
		async function updateDisplay() {
			setDisplay("");
			const data = await getDisplay();
			if (data.events.length > 0) {
				setDisplay(data);
				console.log(data);
			} else {
				setDisplay("Information DNE");
			}
		}
		updateDisplay();
	}, [date]);

	return (
		<>
			<input
				type="date"
				id="date"
				onChange={(event) => setDate(event.target.value)}
				value={date}
			></input>
			<p>{JSON.stringify(display)}</p>
		</>
	);
}

export default App;
