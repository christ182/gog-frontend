import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
	 @import url(http://fonts.googleapis.com/css?family=Roboto:400,100,300,500,700,900);
	:root {
    --font-size: 14px;
    --font-family: 'Roboto', 'sans-serif';
    --padding: 8px;
		--margin: 8px;
		--text-primary:#333;
		--primary: #2196f3;
		--secondary: #e91e63;
	}
  body {
		color:var(--text-primary);
		font-weight:300;
		font-family:  var(--font-family);
		padding:0;
		margin:0;
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
`;

export default GlobalStyle;
