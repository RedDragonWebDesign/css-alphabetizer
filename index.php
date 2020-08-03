<!DOCTYPE html>

<html lang="en-us">

<head>
	<meta charset="utf-8">
	<title>CSS Alphabetizer</title>
	<link rel="stylesheet" href="style.css" />
	<script type="module" src="css-alphabetizer.js"></script>
</head>

<body>
	<h1>
	CSS Alphabetizer
	</h1>
	
	<p>
	Beautify your CSS. Sort your selectors alphabetically (which groups together #id's, .classes, and elements), and sort your declarations alphabetically too. Declarations are nested within braces, so those aren't easy to sort with a normal A-Z sort.
	</p>
	
	<p>
	<textarea id="css">body {
	background-color: #999999;
	margin-bottom: 0;
}

#page-container {
	background-color: #DFDFDF;
	width: 1150px;
	margin: 12px auto 0 auto;
}

#page-container2 {
	padding: 12px 12px 0 12px;
}

header {
	background-color: white;
}

.category {
	display: inline-block;
	padding: 18px 25px;
	font-family: sans-serif;
}

.category:hover {
	background-color: #059BD8;
}</textarea>
	</p>
	
	<p>
	<button id="alphabetize">Alphabetize</button>
	</p>
	
	<p>
	Want to report a bug or request a feature? <a href="https://github.com/RedDragonWebDesign/css-alphabetizer/issues">Create an issue</a> on our GitHub.
	</p>
</body>

</html>