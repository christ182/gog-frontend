import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
	:root {
    --font-size: 16px;
    --padding: 8px;
		--margin: 8px;
		--text-primary:#333;
		--primary: #2196f3;
		--secondary: #e91e63;
	}
	html,
	body #root,
	main {
			min-height: 100%;
	}
  body {
		color:var(--text-primary);
		font-weight:300;
		padding:0;
		margin:0;
		background:#00bcd4;
		font-size:var(--font-size)
	}
	button{
		font-weight:300;
		cursor:pointer;
		padding: 0.7em;
		border: 0;
	}
	a {
		cursor:pointer
	}
	.active {
		background:#fff;
	}
	.black-text{
		color:#444;
		text-shadow: none;
	}
	.white-text{
		color:#fff;
		text-shadow: none;
	}
`;

export default GlobalStyle;
