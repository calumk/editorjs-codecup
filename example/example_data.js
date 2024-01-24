let example_data = {
	blocks: [
		{
			type: "header",
			data: {
				text: "Example : @calumk/editorjs-codecup ",
				level: 3,
			},
		},
		{
			type: "paragraph",
			data: {
				text: "This is an example of using EditorJs, with the @calumk/editorjs-codecup package",
			},
		},
		{
			type: "delimiter",
		},
		{
			type: "code",
			data: {
				code: "// example\n// This is an example of codecup!\n '// Hello World \nlet num_a = 45; \nlet num_b = 33; \n\nlet adder = (_num_a,_num_b) => {\n\treturn _num_a + _num_b; \n}\n\nlet ans = adder(num_a,num_b)'",
				language: "javascript",
				showlinenumbers: true,
			},
		},
		{
			type: "code",
			data: {
				code: "\n<!-- this editor has the copy button disabled --> \n\n",
				language: "html",
				showlinenumbers: true,
				showCopyButton: false,
			},
		},
		{
			type: "code",
			data: {
				code: "// example\n// This is an example of codecup! \n <script>TEST</script> \n <div> Hello World </div>",
				language: "javascript",
				showlinenumbers: true,
				showCopyButton: true,
			},
		},
		{
			type: "code",
			data: {
				code: "// example\n%Q0.0 := TRUE;\n",
				language: "iecst",
				showlinenumbers: false,
			},
		},
		{
			type: "code",
			data: {
				code: "// minimal example \n// This is an example of codecup with only the code setting\n",
			},
		},
	],
};
