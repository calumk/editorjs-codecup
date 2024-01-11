let example_data = {
	blocks: [
		{
			type: "header",
			data: {
				text: "Example : @calumk/editorjs-codeflask ",
				level: 3,
			},
		},
		{
			type: "paragraph",
			data: {
				text: "This is an example of using EditorJs, with the @calumk/editorjs-codeflask package",
			},
		},
		{
			type: "delimiter",
		},
		{
			type: "code",
			data: {
				code: "// example\n// This is an example of codeflask!\n '// Hello World \nlet num_a = 45; \nlet num_b = 33; \n\nlet adder = (_num_a,_num_b) => {\n\treturn _num_a + _num_b; \n}\n\nlet ans = adder(num_a,num_b)'",
				language: "javascript",
				showlinenumbers: true,
			},
		},
		{
			type: "code",
			data: {
				code: "// example\n// This is an example of codeflask! \n <script>TEST</script>",
				language: "javascript",
				showlinenumbers: true,
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
				code: "// minimal example \n// This is an example of codeflask with only the code setting\n",
			},
		},
	],
};
